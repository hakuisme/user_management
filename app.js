const express = require('express')
const cors = require('cors')
const routes = require('./routes')
const AppError = require('./utils/errorHandler')
const app = express()
const globalErrHandler = require('./controllers/error.controller')

// Allow Cross-Origin requests
app.use(cors())


// Body parser, reading data from body into req.body
app.use(express.json({
  //limit: '15kb'
  limit: '20000kb'
}))

app.use(express.urlencoded({limit:'50mb', extended: true }))


// Routes
// const route = express.Router()
// app.use(checkInKey)
app.get('', (req,res) => {
  let user_ip

  if(req.headers['cf-connecting-ip'] && req.headers['cf-connecting-ip'].split(', ').length) {
      let first = req.headers['cf-connecting-ip'].split(', ');
      user_ip = first[0];
  } else {
      user_ip = req.headers['x-forwarded-for'] || req.headers['x-real-ip'] || req.connection.remoteAddress || req.socket.remoteAddress || req.connection.socket.remoteAddress;
  }
})
app.use('/', routes)

// handle undefined Routes
app.use('*', (req, res, next) => {
    const err = new AppError(404, false, 'undefined route')
    next(err, req, res, next)
});

app.use(globalErrHandler)
module.exports = app