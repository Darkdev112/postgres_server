const { Sequelize } = require('sequelize');
const logger = require('../../config/logger');
const config = require('../../config/config');

const sequel = new Sequelize({
    dialect: config.db_dialect,
    host: config.db_host,
    port: config.db_port,
    username: config.db_username,
    password: config.db_password,
    database: config.db_database,
});

const connectSQL=async()=>{
  try {
      if(sequel){
        await sequel.authenticate();
        logger.info('SQL Database Connected');
      }
    
  } catch (error) {
    logger.error(`SQL Database Connection error:- ${error}`);
  }
}


module.exports = {sequel,connectSQL};
