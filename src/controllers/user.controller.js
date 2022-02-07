const bcrypt = require('bcrypt')
const models = require('../models').models
const User = models.user
const jwt = require('jsonwebtoken')
const Contact = require('../routes/contact')

exports.userLogin = async (request, response) => {
  const user = await User.findOne({ where: { email: request.body.email } })
  if (user) {
    const passwordValid = await bcrypt.compare(request.body.password, user.password)
    if (passwordValid) {
      const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET)

      response.status(200).json({ token: token })
    } else {
      response.status(400).json({ error: 'password incorrect' })
    }
  } else {
    response.status(404).json({ error: 'user does not exist' })
  }
}

exports.getUsers = async (request, response) => {
  await User.findAll({}).then(users => {
    if (users.length < 1) {
      return response.status(204).json({ message: 'no users found' })
    } else {
      return response.status(200).json(users)
    }
  }).catch(error => {
    return response.status(500).json({ error: error.message })
  })
}

exports.getUserByID = async (request, response) => {
  const { id } = request.params

  User.findOne({
    where: {
      id: id
    }
  }).then(user => {
    if (!user) {
      return response.status(204).json()
    } else {
      return response.status(200).json(user)
    }
  }).catch(error => {
    return response.status(500).json({ error: error.message })
  })
}

exports.createUser = async (request, response) => {
  const firstName = request.body.firstName
  const lastName = request.body.lastName
  const email = request.body.email
  const password = bcrypt.hashSync(request.body.password, 8)

  const userExists = await User.findOne({
    where: {
      email
    }
  })

  if (userExists) {
    return response.status(400).json({ message: 'user already exists' })
  }

  User.create({
    firstName,
    lastName,
    email,
    password
  }).then(user => {
    return response.status(200).json({ message: 'user created' })
  }).catch(error => {
    return response.status(500).json({ error: error.message })
  })
}

exports.deleteUser = async (request, response) => {
  const userID = request.user.id
  const { id } = request.params

  if (userID.toString() !== id) {
    return response.status(401).json({ message: 'unauthorized' })
  }

  await User.destroy({
    where: {
      id: id
    }
  }).then((user) => {
    if (!user) {
      return response.status(404).json({ message: 'user does not exist' })
    } else {
      return response.status(200).json({ message: 'user deleted' })
    }
  }).catch(error => {
    return response.status(500).json({ error: error.message })
  })
}

exports.updateUser = async (request, response) => {
  const { id } = request.params
  const userInfo = {
    firstName: request.body.firstName,
    lastName: request.body.lastName,
    email: request.body.email
  }

  // This check has to be separate because bcrypt can't encrypt a null/undefined
  if (request.body.password) {
    userInfo.password = bcrypt.hashSync(request.body.password, 8)
  }

  // Checks for all valid request body params
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
    return User
      .findOne({ where: condition })
      .then(function (obj) {
        if (obj) { return obj.update(values) }

        return response.status(404).json({ message: 'user not found' })
      }).catch(error => {
        response.status(500).json({ error: error.message })
      })
  }

  upsert(userInfo, { id: id }).then(function (result) {
    response.status(200).send({ success: true })
  })
}
