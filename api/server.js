const express = require('express')
const setupMiddleware = require('./setupMiddleware.js')
const apiController = require('../controllers/apiController.js');

const server = express();

//middleware
setupMiddleware(server)

//routes
server.use('/api/projects', apiController)


module.exports= server;