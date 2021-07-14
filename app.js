const express = require('express')
const cors = require('cors')
const routes = require('./routes')
const AppError = require('./utils/errorHandler')
const app = express()
const globalErrHandler = require('./controllers/error.controller')

const swaggerJsdoc = require("swagger-jsdoc"),
  swaggerUi = require("swagger-ui-express");

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

const swaggerOptions = require('./config/swagger').swopt;
const specs = swaggerJsdoc(swaggerOptions);
// console.log(specs)

app.get('', (req,res) => {
  let user_ip

  if(req.headers['cf-connecting-ip'] && req.headers['cf-connecting-ip'].split(', ').length) {
      let first = req.headers['cf-connecting-ip'].split(', ');
      user_ip = first[0];
  } else {
      user_ip = req.headers['x-forwarded-for'] || req.headers['x-real-ip'] || req.connection.remoteAddress || req.socket.remoteAddress || req.connection.socket.remoteAddress;
  }
})
app.use('/v1/auth/', routes)
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(specs, { explorer: true })
);

// handle undefined Routes
app.use('*', (req, res, next) => {
    const err = new AppError(404, false, 'undefined route')
    next(err, req, res, next)
});

app.use(globalErrHandler)
module.exports = app