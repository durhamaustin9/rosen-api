require('dotenv/config')
module.exports = {
  development: {
    databases: {
      rest: {
        database: process.env.DATABASE,
        username: process.env.USER,
        password: process.env.PASSWORD,
        host: process.env.HOST,
        port: process.env.PORT,
        dialect: 'mysql'
      }
    }
  }
}
