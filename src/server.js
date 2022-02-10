import 'dotenv/config'
import express from 'express'
import morgan from 'morgan'
import helmet from 'helmet'
import routes from './routes'
const passport = require('./auth/passport')
const cors = require('cors')

const app = express()

app.use(helmet())
app.use(morgan('combined'))
app.use(express.json({}))
app.use(express.urlencoded({ extended: true }))
app.use(passport.initialize())
app.use(cors({
  origin: '*', optionsSuccessStatus: 200
}))

app.use('/user', routes.user)
app.use('/contact', routes.contact)
app.use('/map', routes.map)

app.use((request, response) => {
  response.status(301).send('404 - Page not found')
})

app.listen(4000, () => {
  console.log('app is listing')
})
