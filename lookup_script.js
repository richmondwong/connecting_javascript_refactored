const pg = require("pg");
const settings = require("./settings"); // settings.json
const client = new pg.Client({
  user     : settings.user,
  password : settings.password,
  database : settings.database,
  host     : settings.hostname,
  port     : settings.port,
  ssl      : settings.ssl
});
const input = process.argv.slice(2).toString()

client.connect((err) => {
  if (err) {
    return console.error("Connection Error", err);
  }
  client.query(`SELECT * FROM famous_people WHERE first_name = '${input}'`, (err, result) => {
    if (err) {
      return console.error("error running query", err);
    }
    console.log('Searching ...');
    console.log('Found ' + result.rowCount + ' person(s) by the name of ' + input);
    var counter = 1;
    for (var x in result.rows){
      console.log("- " + counter + ": " + result.rows[x]['first_name'] + " " + result.rows[x]['last_name'] + ", born " + result.rows[x]['birthdate'].toString().substring(0,15));
      counter++
    }
    client.end();
  });
});
