const pg = require("pg");
const settings = require("./settings"); // settings.json

const client = new pg.Client({
    user: settings.user,
    password: settings.password,
    database: settings.database,
    host: settings.hostname,
    port: settings.port,
    ssl: settings.ssl
});

var myArg = process.argv.slice(2);

client.connect((err) => {
    if (err) {
        return console.error("Connection Error", err);
    }
    client.query("SELECT first_name, last_name, birthdate FROM famous_people WHERE first_name = ($1) OR last_name =($1)", myArg, (err, result) => {
        if (err) {
            return console.error("error running query", err);
        } else {
            return getResult(result);
        };
    });
});

function getResult(result) {
    for (index in result.rows) {
        let data = result.rows[index];
        let date = data.birthdate;
        console.log("- " + (Number(index)+1) + ': ' + data.first_name + " " + data.last_name + ', ' + 'born ' + (date.getFullYear() + '-' + date.getDate() + '-' + (date.getMonth() + 1)));
    }
    client.end();
};