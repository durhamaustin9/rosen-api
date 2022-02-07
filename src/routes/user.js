import { Router } from 'express'
const user = require('../controllers/user.controller')
const router = Router()
const passport = require('passport')
const authenticator = passport.authenticate('jwt', { session: false })

router.post('/login', user.userLogin)

router.get('/', authenticator, user.getUsers)

router.get('/:id', authenticator, user.getUserByID)

router.post('/create', user.createUser)

router.delete('/delete/:id', authenticator, user.deleteUser)

router.put('/update/:id', authenticator, user.updateUser)

export default router
