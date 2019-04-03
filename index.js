const express = require('express'); 
const mongoose = require('mongoose');
const router = require('../examenNode/routers/router');

var app = express(); 
mongoose.connect('mongodb://localhost:27017/examen',{useNewUrlParser: true }) 
.then(()=>console.log('mongodb is connected'))
.catch((err)=>console.log('error in connection with mongo:',err.name));

app.use(express.json()); 
app.use('/api',router);
const port = process.env.port||3200 ; 
app.listen(port);
console.log(`app listening on ${port}`);