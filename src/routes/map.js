import { Router } from 'express'
const map = require('../controllers/map.controller')
const router = Router()
const passport = require('passport')
const authenticator = passport.authenticate('jwt', { session: false })

router.post('/', authenticator, map.doGetLatLong)

export default router
