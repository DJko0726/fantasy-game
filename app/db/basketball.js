const { Client } = require('pg');

const client = new Client()
 
async function test(){
    await client.connect()
    const result = await client.query('SELECT * from basketball')
    console.log(123)
}
(async () => {
    // await main();
    // await getData()
    await test()
})()
