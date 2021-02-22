const express = require('express');
const app = express();
const { exec } = require('child_process');
const mysql = require('mysql');


const pool = mysql.createPool({
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  host: process.env.HOST
  });
  
  pool.getConnection((err, connection) => {
  if (err) {
  console.log(err);
  } else {
  connection.query('SELECT * FROM users', (_err, data) => console.log(data));
  }
  });

app.get('/list', (req, res) => {
  pool.getConnection(function (err,con) {
    if (err) {
      console.log(err)
    } else {
      let sql = "select * from users";
      con.query(sql, function (error, result) {
        if (error) {
          console.log("asdad")
        };
        console.log(result);
        res.json(result)
      });
    }

  });
})
app.post('/create', (req, res) => {
  //res.json([{fname:"lahasya", lname:"KR"}])
  pool.getConnection(function (err,con) {
    if (err) {
      console.log(err)
    } else {
      let sql = "INSERT INTO users (fname, lname) VALUES ('lahasya','KR')";
      // let sql = "INSERT INTO users (fname, lname) VALUES ('"+req.body.fname+"','"+req.body.lname+"')";
      con.query(sql, function (error, result) {
        if (error) {
          console.log("asdad")
        };
        console.log(result);
      });
    }

  });
})


app.use(express.static('client/build'));
app.use(express.static('public'));

app.listen(process.env.PORT, () => {
  console.log("server is up and running")
  if (process.env.NODE_ENV !== 'development') {
    exec('npm install --prefix client', err =>
      console.log(err ? 'error in building react application;' : 'react application is up and running;'));
  }
});