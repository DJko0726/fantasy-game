const cron = require('node-cron')
const axios = require('axios')

cron.schedule('* * */1 * *', async () => {
    try {
        const currentYear = new Date().getFullYear()
        const response = await axios.post('http://127.0.0.1:3000/player-update', {
            season_year: currentYear.toString() // 使用當前年份
        })
        console.log('Player update API called successfully')
    } catch (error) {
        console.error('Error calling player update API:', error)
    }
});