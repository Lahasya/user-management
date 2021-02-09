const express = require('express');
const app = express();
const {exec} = require('child_process');

app.get('/list', (req, res) => {
    res.json([{fname:"lahasya", lname:"KR"}])
})

app.use(express.static('client/build'));
app.use(express.static('public'));

app.listen(process.env.PORT,()=>{
    console.log("server is up and running")
    if(process.env.NODE_ENV !== 'development'){
        exec('npm install --prefix client', err => 
        console.log(err ? 'error in building react application;' : 'react application is up and running;'));
    }
});