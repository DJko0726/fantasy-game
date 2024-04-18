const axios = require('axios')
const cheerio = require('cheerio')
const puppeteer = require('puppeteer')
const Basketball = require('./../db/index')
const basketball = new Basketball()
const { v4 : uuidv4, v6 : uuidv6 }  = require('uuid')

class Fantasy{
    constructor() {
        this.apiUrl = 'https://fantasydata.com/NBA_FantasyStats/FantasyStats_Read'
    }

    async test(){
        const data = {
            name: 'John',
            age: 30,
            address: {
              street: '123 Main St',
              city: 'Anytown',
              zip: '12345'
            },
            hobbies: ['reading', 'sports', 'cooking']
          }
        
        console.dir(data)
        process.exit()

    }

    // async getData() {

    //     let browser = await puppeteer.launch({headless:false,args: ["--disable-notifications"]})
    //     let page = await browser.newPage()
    
    //     await page.goto('https://fantasydata.com/nba/fantasy-basketball-leaders')
    //     let html = await page.content()
    //     let $ = cheerio.load(html)
    //     // console.log($('body').html())
    //     await browser.close()
    // }
    
    async playerUpdate(season_year) {
        let requestBody = {
            sort: 'FantasyPoints-desc',
            group: '',
            filter: '',
            'filters.scope': 1,
            'filters.subscope': '',
            'filters.season': season_year,
            'filters.seasontype': 1,
            'filters.team': '',
            'filters.conference': 1,
            'filters.position': '',
            'filters.searchtext': '',
            'filters.scoringsystem': '',
            'filters.exportType': '',
            'filters.date': '',
            'filters.dfsoperator': '',
            'filters.dfsslateid': '',
            'filters.dfsslategameid': '',
            'filters.dfsrosterslot': '',
            'filters.showfavs': '',
            'filters.teamkey': '',
            'filters.oddsstate': '',
            'filters.showall': ''
        };
    
        let response = await axios.post(this.apiUrl,requestBody)
    
        let responseData = [response.data]

        for (let dataObject of responseData) {
            for (let item of dataObject.Data) {

                let qWhere = { 'name': item.Name ,'season': item.Season}
                let playerCheck = await basketball.selectOneWithSeason(qWhere)
                if(playerCheck.length === 0){
                    await basketball.insert(item)
                }else{
                    await basketball.update(item,qWhere)
                }      
            }
        }
        return [`${season_year} updated` ]
    }

    async playerGet(player) {
        let qWhere = { 'name': player }
        let player_data = await basketball.selectOne(qWhere)
        if(player_data.length === 0){
            return ['please search currect player name']
        }
        let player_result = []
        player_data.forEach(function(player){
            player_result.push({
                name: player.name,
                season: player.season,
                average_fantasy_point:player.average_fantasy_point,
                position: player.position,
                game_played: player.game_played,
                point:player.point,
                rebounds:player.rebounds,
                assists:player.assists,
                blocked:player.blocked,
                steals:player.steals,
                turnovers:player.turnovers,
                fg_percentage:player.fg_percentage,
                ft_percentage:player.ft_percentage,
                three_point:player.three_point,
                three_point_percentage:player.three_point_percentage,
                dd:player.dd
            });
        })
        return player_result
    }


    async playerList() {
        let player_list = await basketball.selectAllPlayer()
        const player_list_Array = player_list.map(item => item.name)
        const player_list_Object = { player_name: player_list_Array }
        return player_list_Object
    }

    async seasonList() {
        let season_list = await basketball.selectAllSeasonYear()
        const season_list_Array = season_list.map(item => item.season)
        const season_list_Object = { season_year: season_list_Array }
        return season_list_Object
    }

}
module.exports = Fantasy
