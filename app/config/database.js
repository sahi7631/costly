const { Client } = require('pg'); 
const config = require('../config/config');
const client = new Client({
    connectionString: config.connectionString,
    ssl: false,
});
client.connect().then(res => {
    console.log(res);
});
module.exports = client;