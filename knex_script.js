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
.where('first_name', myArg[0])
.orWhere('last_name', myArg[0])
.asCallback(function(err, result){
    return getResult(result);
});

function getResult(result) {
    for (index in result) {
        let data = result[index];
        let date = data.birthdate;
        console.log("- " + (Number(index)+1) + ': ' + data.first_name + " " + data.last_name + ', ' + 'born ' + (date.getFullYear() + '-' + date.getDate() + '-' + (date.getMonth() + 1)));
    }
    knex.destroy();
};