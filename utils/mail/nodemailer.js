// 'use strict';
// const { config } = require('../../config/config');
// const nodemailer = require('nodemailer');

// // async..await is not allowed in global scope, must use a wrapper
// async function main() {
//   // create reusable transporter object using the default SMTP transport
//   let transporter = nodemailer.createTransport({
//     host: 'smtp.gmail.com',
//     secure: true,
//     port: 465,
//     auth: {
//       user: config.userGmail,
//       pass: config.passGmail,
//     },
//   });

//   // send mail with defined transport object
//   let info = await transporter.sendMail({
//     from: config.api, // sender address
//     to: 'sedrick.kiehn25@ethereal.email', // list of receivers
//     subject: 'Hello 😉😎', // Subject line
//     text: 'Hello Node', // plain text body
//     html: '<b>Hack?</b>', // html body
//   });

//   console.log('Message sent: %s', info.messageId);
//   // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

//   // Preview only available when sending through an Ethereal account
//   console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
//   // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
// }

// main().catch(console.error);
