const path = require('path');
const dotenv = require('dotenv').config({ path: path.join(__dirname, '../../.env') });

if (dotenv.error) {
    throw new Error('No .env File Found');
}

module.exports = {
    mode: process.env.NODE_ENV,
    port: parseInt(process.env.PORT, 10),
    mongo_url: process.env.NODE_ENV === "test" ? `${process.env.MONGO_URL}-${process.env.NODE_ENV}` : process.env.MONGO_URL,
    client_url: process.env.CLIENT_URL,
    jwt_secret: process.env.JWT_SECRET,
    db_dialect: process.env.DB_DIALECT,
    db_host: process.env.DB_HOST,
    db_port: parseInt(process.env.DB_PORT, 10),
    db_username: process.env.DB_USERNAME,
    db_password: process.env.DB_PASSWORD,
    db_database: process.env.DB_DATABASE,
};
