const express  = require('express');
const app = express(); 
const bodyParser = require('body-parser');
const { createProxyMiddleware } = require('http-proxy-middleware');
const Fantasy  = require('./app/fantasy/index');
const fantasy = new Fantasy();

app.use(bodyParser.json());

app.get('/',(req,res) =>{
    res.send('hello123')
})

app.post('/player-update', async(req,res) =>{
    try {
        const request = req.body;
        if (!request || !request.hasOwnProperty('season_year')) {
            throw new Error('Request season year is missing');
        }
        const result = await fantasy.playerUpdate(request.season_year);
        res.status(200).json({ message: 'POST request received successfully', result});
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})

app.listen(3000, () =>{
    console.log('alive 3000 port')
})