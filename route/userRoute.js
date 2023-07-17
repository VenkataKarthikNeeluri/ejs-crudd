const userRoute = require('express').Router()
const userController = require('../controller/userController')

// route.request(path, controller)

// all other views (render controller) can be accesses only by GET request
userRoute.get(`/`, userController.index)
userRoute.get(`/create`, userController.new)
userRoute.get(`/edit`, userController.edit)

// create new user - post route
userRoute.post(`/api/user/new`, userController.newUser)

// to read stored user data -> get api route
userRoute.get(`/api/user/all`, userController.readUser)

// to read single user data
userRoute.get(`/api/user/:id`, userController.readSingleUser)

userRoute.patch(`/api/user/:id`, userController.updateUser)

   // request method -> all -> only assigned to default route
userRoute.all(`**`, userController.pnf)

module.exports = userRoute