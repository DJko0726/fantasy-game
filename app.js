const express  = require('express')
const app = express()
const path = require('path');
const bodyParser = require('body-parser')
const { createProxyMiddleware } = require('http-proxy-middleware')
const Fantasy  = require('./app/fantasy/index')
const fantasy = new Fantasy()
require('./cron')

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json())

// 將根路由指向 public/index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

//update player data into db
app.post('/player-update', async(req,res) =>{
    try {
        const request = req.body
        if (!request || !request.hasOwnProperty('season_year')) {
            throw new Error('Request season year is missing')
        }
        const result = await fantasy.playerUpdate(request.season_year)
        res.status(200).json({ message: 'player-update request received successfully', result})
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})
//get one player data by years
app.post('/player-get', async(req,res) =>{
    try {
        const request = req.body
        if (!request || !request.hasOwnProperty('player') || !request.hasOwnProperty('season')) {
            throw new Error('Request player or season is missing')
        }
        const result = await fantasy.playerGet(request.player,request.season)
        res.status(200).json({ message: 'player-get request received successfully', result})
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})
//get player list
app.get('/player-list', async(req,res) =>{
    try {
        const result = await fantasy.playerList()
        res.status(200).json({ message: 'player-list request received successfully', result})
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})
//get season list
app.get('/season-list', async(req,res) =>{
    try {
        const result = await fantasy.seasonList()
        res.status(200).json({ message: 'season-list request received successfully', result})
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

app.listen(3000, () =>{
    console.log('alive 3000 port')
})