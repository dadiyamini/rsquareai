const oracledb = require('oracledb');

async function initialize() {
    try {
        await oracledb.createPool({
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            connectString: process.env.DB_CONNECT_STRING,
            poolMax: 10,
            poolMin: 1,
            poolIncrement: 1,
            queueTimeout: 120000 
        });
        console.log('Database connected');
    } catch (error) {
        console.error('Error connecting to Oracle DB', error);
    }
}

module.exports = { initialize, oracledb };
