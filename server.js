const mongoose = require('mongoose');
require('dotenv').config();
const roleInit = require('./config/role')

process.on('uncaughtException', err => {
  console.log('UNCAUGHT EXCEPTION!!! shutting down...');
  console.log(err.name, err.message);
  process.exit(1);
});

const app = require('./app');

const database = process.env.DATABASE
try {
    // Connect to the MongoDB cluster
     mongoose.connect(
        database,
        { 
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: false,
            useUnifiedTopology: true,
            user: process.env.DATABASE_USERNAME, // IMPORTANT TO HAVE IT HERE AND NOT IN CONNECTION STRING
            pass: process.env.DATABASE_PASSWORD, // IMPORTANT TO HAVE IT HERE AND NOT IN CONNECTION STRING
            dbName: process.env.DATABASE_NAME
         },
      () =>{ 
        console.log(" Mongoose is connected")
        roleInit.initial()
      }
    );

  } catch (e) {
    console.log("could not connect to database");
  }
// Start the server
const port = process.env.PORT || 8031;
app.listen(port, () => {
  console.log(`Application is running on port ${port}`);
});

process.on('unhandledRejection', err => {
  console.log('UNHANDLED REJECTION!!!  shutting down ...');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});