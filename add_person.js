const pg = require("pg");
const settings = require("./settings"); // settings.json


var myArg = process.argv.slice(2);

var knex = require('knex')({
    client: 'pg',
    connection: {
      host : settings.hostname,
      user : settings.user,
      password : settings.password,
      database : settings.database
    }
  });



knex('famous_people')
.insert({first_name: myArg[0], 
last_name: myArg[1], 
birthdate: myArg[2]})
.asCallback(function(err, result) {
    if (err) {
        return console.log(err)
    }
    knex.destroy();
})

