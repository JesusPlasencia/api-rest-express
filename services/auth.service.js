const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

const { config } = require('../config/config');
const { sequelize } = require('../libs/sequelize');

//User Services
const UserService = require('./user.service');
const service = new UserService();

class AuthService {
  constructor() {}
  //
  async getUser(email, password) {
    const user = await service.findByEmail(email);
    if (!user) {
      throw boom.unauthorized();
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw boom.unauthorized();
    }
    delete user.dataValues.password;
    return user;
  }

  signToken(user) {
    const payload = {
      id: user.id,
      role: user.role,
    };
    const token = jwt.sign(payload, config.apiSecret, {
      expiresIn: '1h',
    });
    return { token };
  }

  async sendRecovery(email) {
    ///
    const user = await service.findByEmail(email);
    if (!user) {
      throw boom.unauthorized();
    }
    ///
    const customer = await sequelize.models.Customer.findOne({
      where: {
        userId: user.id,
      },
    });
    if (!customer) {
      throw boom.notFound('Customer Not Found');
    }
    ///
    const payload = { id: user.id };
    const token = jwt.sign(payload, config.apiSecretRecovery, {
      expiresIn: '15min',
    });
    const link = `http://localhost:3000/recovery?token=${token}`;
    await service.update(user.id, { recoveryToken: token });
    ///
    const mail = {
      from: config.userGmail, // sender address
      to: `${user.email}`, // list of receivers
      subject: `Hello ${customer.name} ${customer.lastName} 🔑`, // Subject line
      // text: '', // plain text body
      html: `<i><b>Go To: ${link} to reset your password.</b></i>
             <br/>
             <p>Email to recover your password. This link expires in 15 min.</p>`, // html body
    };
    const rta = await this.sendEmail(mail);
    return rta;
  }

  async sendEmail(infoMail) {
    let transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      secure: true,
      port: 465,
      auth: {
        user: config.userGmail,
        pass: config.passGmail,
      },
    });
    //
    await transporter.sendMail(infoMail);
    //
    return { message: 'Message sent' };
  }

  async changePassword(token, newPassword) {
    //
    try {
      //
      const payload = jwt.verify(token, config.apiSecretRecovery);
      const user = await service.findOne(payload.id);
      if (user.recoveryToken !== token) {
        throw boom.unauthorized();
      }
      const passHash = await bcrypt.hash(newPassword, 10);
      await service.update(user.id, {
        recoveryToken: null,
        password: passHash,
      });
      return { message: 'Password changed successfully' };
    } catch (err) {
      throw boom.unauthorized();
    }
  }
}

module.exports = AuthService;
