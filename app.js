const express  = require('express');
const app = express(); 
const { createProxyMiddleware } = require('http-proxy-middleware');
const Fantasy  = require('./app/fantasy/index');
const fantasy = new Fantasy();



app.get('/',(req,res) =>{
    res.send('hello123')
})

app.get('/player-update',(req,res) =>{
    try {
        const request = req.body;
        fantasy.playerUpdate(request);
        res.status(200).json({ message: 'POST request received successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})

app.listen(3000, () =>{
    console.log('alive 3000 port')
})