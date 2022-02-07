require('dotenv').config()
const fs = require('fs')
const path = require('path')
const Sequelize = require('sequelize')
const basename = path.basename(__filename)
const env = process.env.NODE_ENV || 'development'
const config = require(__dirname + '../../config/config.js')[env]

const db = {
  rest: new Sequelize({
    database: process.env.DATABASE,
    username: process.env.USERNAME,
    password: process.env.PASSWORD,
    host: process.env.HOST,
    port: process.env.PORT,
    dialect: 'mysql'
  })
}

const models = {
  user: require(path.join(process.cwd(), 'src/models/rest/User'))(db.rest, Sequelize.DataTypes),
  contact: require(path.join(process.cwd(), 'src/models/rest/Contact'))(db.rest, Sequelize.DataTypes)
}

module.exports = { db, models }
