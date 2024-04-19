const express  = require('express')
const app = express()
const bodyParser = require('body-parser')
const { createProxyMiddleware } = require('http-proxy-middleware')
const Fantasy  = require('./app/fantasy/index')
const fantasy = new Fantasy()
require('./cron')

app.use(express.static('public'));
app.use(bodyParser.json())

app.get('/',(req,res) =>{
    const data = {
        message: 'Hello it works'
      };
    res.json(data);
})

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

app.listen(3001, () =>{
    console.log('alive 3001 port')
})