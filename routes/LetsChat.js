const http = require('http');
const router = require('router');
const express = require('express');

router.get('/', function(request, response){
    response.render('LetsChat')
});

module.exports = router;
