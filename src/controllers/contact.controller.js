const bcrypt = require('bcrypt')
const models = require('../models').models
const Contact = models.contact

exports.getContacts = async (request, response) => {
  const userId = request.user.id

  await Contact.findAll({ where: { userId: userId } }).then(contacts => {
    return response.status(200).json(contacts)
  }).catch(error => {
    return response.status(500).json({ error: error.message })
  })
}

exports.getContactById = async (request, response) => {
  const userId = request.user.id
  const { id } = request.params

  Contact.findOne({
    where: {
      userId: userId,
      id: id
    }
  }).then(contact => {
    if (!contact) {
      return response.status(200).json({ message: 'no contact found' })
    } else {
      return response.status(200).json(contact)
    }
  }).catch(error => {
    return response.status(500).json({ error: error.message })
  })
}

exports.createContact = async (request, response) => {
  const userId = request.user.id
  const firstName = request.body.firstName
  const lastName = request.body.lastName
  const email = request.body.email
  const phone = request.body.phone
  const streetAddress = request.body.streetAddress
  const city = request.body.city
  const zip = request.body.zip
  const state = request.body.state
  const notes = request.body.notes

  Contact.create({
    userId,
    firstName,
    lastName,
    email,
    phone,
    streetAddress,
    city,
    zip,
    state,
    notes
  }).then(() => {
    return response.status(200).json({ message: 'contact created' })
  }).catch(error => {
    return response.status(500).json({ error: error.message })
  })
}

exports.updateContact = async (request, response) => {
  const userId = request.user.id
  const { id } = request.params
  const userInfo = {
    firstName: request.body.firstName,
    lastName: request.body.lastName,
    email: request.body.email,
    phone: request.body.phone,
    streetAddress: request.body.streetAddress,
    city: request.body.city,
    zip: request.body.zip,
    state: request.body.state,
    notes: request.body.notes
  }

  function clean (obj) {
    for (const propName in obj) {
      if (obj[propName] === null || obj[propName] === undefined) {
        delete obj[propName]
      }
    }
    return obj
  }

  clean(userInfo)

  function upsert (values, condition) {
    return Contact
      .findOne({ where: condition })
      .then(function (obj) {
        if (obj) { return obj.update(values) }
        return response.status(404).json({ message: 'contact not found' })
      }).catch(() => {
        response.status(500).send({ message: 'unauthorized' })
      })
  }

  upsert(userInfo, { id: id, userId: userId }).then(function (result) {
    response.status(200).send({ success: true })
  }).catch(error => {
    response.status(500).send({ error: error.message })
  })
}

exports.deleteContact = async (request, response) => {
  const userId = request.user.id
  const { id } = request.params

  await Contact.destroy({
    where: {
      userId: userId,
      id: id
    }
  }).then((contact) => {
    if (!contact) {
      return response.status(404).json({ message: 'contact not found' })
    } else {
      return response.status(200).json({ message: 'contact deleted' })
    }
  }).catch(error => {
    return response.status(500).json({ error: error.message })
  })
}
