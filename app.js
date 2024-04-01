const express  = require('express');
const app = express(); 
const { createProxyMiddleware } = require('http-proxy-middleware');
// const fantasy = require('./fantasy/index');

app.get('/',(req,res) =>{
    res.send('hello123')
})

app.get('/player-update',(req,res) =>{
    // const request = req.body
    // fantasy.playerUpdate(request)
    res.send('playerUpdate')
})

app.listen(3000, () =>{
    console.log('alive 3000 port')
})