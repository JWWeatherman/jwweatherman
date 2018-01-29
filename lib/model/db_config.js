const mongoose = require('mongoose')
mongoose.Promise = require('bluebird')

// Connection to database
mongoose.connect('mongodb://localhost:27017/jwweatherman')
mongoose.connection.on('error', function (error) {
  console.log('MONGODB CONNECTION ERROR ----> ', error)
})
mongoose.connection.on('open', function () {
  console.log('MONODB CONNECTED')
})

module.exports = mongoose
