const { Pool } = require('pg'); 
const global = require('./config');
const  pool = new Pool({
    user: global.config.user,
    database: global.config.database,
    password: global.config.password,
    host: global.config.host,
    port: global.config.port,
    max: global.config.max,
    idleTimeoutMillis: global.config.idleTimeoutMillis,
    ssl: true,
});
module.exports = pool;