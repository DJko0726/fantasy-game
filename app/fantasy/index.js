const axios = require('axios');
const cheerio = require('cheerio');
const puppeteer = require('puppeteer');
const Utility = require('./../utils/Utility');
const Basketball = require('./../db/index');
const basketball = new Basketball();
const { v4 : uuidv4, v6 : uuidv6 }  = require('uuid');

class Fantasy{
    constructor() {
        this.apiUrl = 'https://fantasydata.com/NBA_FantasyStats/FantasyStats_Read'
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
                let qWhere = [item.Name,item.Season]
                let playerCheck = await basketball.selectOneWithSeason(qWhere)
                if(playerCheck.length === 0){
                    await basketball.insert(item);
                }else{
                    await basketball.update(item,qWhere);
                }      
            }
        }
        return [`${season_year} updated` ];
    }

    async playerGet(player) {
        let qWhere = { 'name': player }
        let player_data = await basketball.selectOne(qWhere);
        let player_result = []
        player_data.forEach(function(player){
            player_result.push({
                name: player.name,
                season: player.season
            });
        })
        console.log(player_data)
        process.exit()
        return player_data
    }
}
module.exports = Fantasy;
