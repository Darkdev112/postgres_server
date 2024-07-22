const express = require('express')
const config = require('./config/config')
const logger = require('./config/logger')


const {postgresDB} = require('./api/db')
const appLoader=require("./app")


async function startServer(){
    const app = express();

    await appLoader(app)
    await postgresDB.connectSQL()
    await postgresDB.sequel.sync({alter : true})

    const server = app.listen(config.port, () => {
        logger.info(`Servers up on port ${config.port}`);
    })

    const unexpectedErrorHandler = async (error) => {
        logger.error(error)
        if (server) {
            server.close(() => {
                logger.info("Server closed")
                process.exit(1)
            })
        }
        else {
            process.exit(1)
        }
    }

    process.on("uncaughtException", unexpectedErrorHandler)
    process.on("unhandledRejection", unexpectedErrorHandler)
    process.on("SIGTERM", unexpectedErrorHandler);
    process.on("SIGINT", unexpectedErrorHandler);

}

startServer()

