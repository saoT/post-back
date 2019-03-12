// je vais chercher le driver sqlite3 dans node_modules
const fs = require('fs');
const sqlite3 = require('sqlite3').verbose();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const dbFile = 'test.db';
const db = new sqlite3.Database(dbFile);

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get('/students', function (request, response) {
  db.all('SELECT * FROM students', function (error, data) {
     response.send(data);
  });
  //response.send(data);
});

// COTE BACK
// Cree la route
app.post('/students', function (request, response) {

  // J'utilise request.body pour recupere la valeur envoye par le front et l'insere ds ma BDD
  db.run('INSERT INTO students (student_name) VALUES (?)', // Defini la requete SQL
    request.body.tomate, // Je defini les valeurs envoyée a la BDD
    function (error, data) { // Defini une fonction qui renvoie ma reponse au front
      response.send(request.body.student_name);
  });

});

app.listen(4000, function (error) {
  if (!error) console.log('app listening port 4000');
});
