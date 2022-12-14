require('dotenv').config();

const config = {
  env: process.env.NODE_ENV || 'dev',
  isProd: process.env.NODE_ENV === 'production',
  port: process.env.PORT || 3000,
  dbUser: process.env.DB_USER,
  dbPassword: process.env.DB_PASSWORD,
  dbHost: process.env.DB_HOST,
  dbName: process.env.DB_NAME,
  dbPort: process.env.DB_PORT,
  dbUrl: process.env.DATABASE_URL,
  apiKey: process.env.API_KEY,
  apiSecret: process.env.API_SECRET,
  apiSecretRecovery: process.env.API_SECRET_RESET,
  userGmail: process.env.USER_GMAIL,
  passGmail: process.env.PASS_GMAIL,
};

module.exports = { config };
