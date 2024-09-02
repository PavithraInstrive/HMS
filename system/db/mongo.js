/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
const mongoose = require('mongoose');
const { exit } = require('process');

let dbConn = {};

if (process.env.MONGO_CONN_STRING && process.env.MONGO_DB_NAME) {
    dbConn = mongoose.createConnection(
        `${process.env.MONGO_CONN_STRING}${process.env.MONGO_DB_NAME}`, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        },
    );

    dbConn.on('connected', () => {
        console.log('MongoDB connection successfully established');
    });

} else {
    console.log('ERROR: DB CONNECTION NOT INITIALISED');
}

function closeDbConn() {
    dbConn.close(() => {
        console.log('Closing mongo connection and exiting process');
        process.exit(0);
    });
}

module.exports = {
    dbConn,
    closeDbConn,
};
