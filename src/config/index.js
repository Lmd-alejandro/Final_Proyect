const {config}=require('dotenv')
config()
const Config = {
    port: process.env.PORT || 3000,
    hostDB: process.env.HOST_DB,
    userDB: process.env.USER_DB,
    passwordDB: process.env.PASSWORD_DB,
    nameDB: process.env.NAME_DB,
    keyToken: process.env.KEY_TOKEN
};

module.exports = Config;