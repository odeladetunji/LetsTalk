//Entry point of the nodejs application!
require('dotenv').config();
const express = require('express');
const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io').listen(server);
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const dotenv = require('dotenv');
const multer = require('multer');
const fs = require('fs');

// Difined Routes!
const LetsChat = require('./routes/LetsChat');

// express static set up
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false })); // urlencoded form parser
app.use(bodyParser.json())  // json parser
app.use(cors());

// route pointer
app.use('/', LetsChat);

// Database Connection using dotenv
const db = mysql.createConnection({
    host     : process.env.DB_HOST,
    port     : process.env.DB_PORT,
    user     : process.env.DB_USER,
    password : process.env.DB_PASSWORD,
    database : process.env.DB_NAME
});

io.on('connection', function(socket){
          console.log('LetsChat SomeOne connected!!');

          socket.emit('everyone', {hello: 'this is from socket.io'});

          socket.on('setting emails and sockets', function(data, callback){
                callback(data);
                personalSocketX = data.sendersEmail;
                Object.defineProperty(socketUsersX,
                                      personalSocketX, {
                                                          value: socket,
                                                          writable: true,
                                                          enumerable: true,
                                                          configurable: true
                                                       });
          });
});

io.on('disconnection', function(socket){
   console.log('someone just disconnected from Lets Chat')
})

server.listen(9000, function(){
	console.log('LetsChat Server is Running  ::: port ::: 9000');
});

module.exports = app;

//minimalistic application set up
