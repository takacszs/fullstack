const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

// 
usersRouter.get('/', async (_request, response) => {
  const users = await User.find({}).populate('blogs',{id:1, title:1, author:1})
  response.json(users)
})

// 4.15
usersRouter.post('/', async (request, response) => {
    const { username, name, password } = request.body
  
    if (!username) {
      return response.status(400).json({
        error: 'username missing'
      })
    }
    if (!password) {
      return response.status(400).json({
        error: 'password missing'
      })
    }
    else if (username.length < 3) {
        return response.status(400).json({
          error: 'username is less than 3 chars'
        })
      }
    else if (password.length < 3) {
      return response.status(400).json({
        error: 'password is less than 3 chars'
      })
    }
  
    const existingUser = await User.findOne({username})
    if (existingUser) {
      return response.status(400).json({
        error: 'username already exists'
      })
    }

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)
  
    const user = new User({
      username,
      name,
      passwordHash,
    })
  
    const savedUser = await user.save()
  
    response.status(201).json(savedUser)
})

module.exports = usersRouter