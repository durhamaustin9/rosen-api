import { Router } from 'express'
const contact = require('../controllers/contact.controller')
const router = Router()
const passport = require('passport')
const authenticator = passport.authenticate('jwt', { session: false })

router.get('/', authenticator, contact.getContacts)

router.get('/:id', authenticator, contact.getContactByID)

router.post('/create', authenticator, contact.createContact)

router.put('/update/:id', authenticator, contact.updateContact)

router.delete('/delete/:id', authenticator, contact.deleteContact)

export default router
