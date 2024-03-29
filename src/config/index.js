const { config } = require('dotenv');
const result = config();

const Config = {
    port: process.env.PORT || 3000,
    hostDB: process.env.HOST_DB,
    userDB: process.env.USER_DB,
    passwordDB: process.env.PASSWORD_DB,
    nameDB: process.env.NAME_DB,
    keyToken: process.env.KEY_TOKEN,
    portDB: process.env.PORT_DB,
};

module.exports = Config;