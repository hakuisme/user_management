const db = require("./../models");
const Role = db.role;

function initial() {
    Role.estimatedDocumentCount((err, count) => {
      if (!err && count === 0) {
        new Role({
          name: "user"
        }).save(err => {
          if (err) {
            console.log("error", err);
          }
        });
  
        new Role({
          name: "admin"
        }).save(err => {
          if (err) {
            console.log("error", err);
          }
        });
  
        new Role({
          name: "superadmin"
        }).save(err => {
          if (err) {
            console.log("error", err);
          }
        });
      }
    });
  }

  module.exports = {initial}