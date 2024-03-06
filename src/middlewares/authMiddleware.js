const jwt = require('jsonwebtoken');
const fs = require("fs");
const config = require("../config/index");

const loadData = () => JSON.parse(fs.readFileSync("data.json", "utf-8"));

module.exports = (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) {
        return res.status(401).json({ error: 'Access denied. Token not provided.' });
    }

    try {
        const decoded = jwt.verify(token, config.KEYTOKEN); 
        const { email } = decoded;
        const { users } = loadData();
        const user = users.find((u) => u.email === email);

        if (!user) {
            throw new Error();
        }

        req.user = user;
        next();
    } catch (error) {
        res.status(401).json({ error: 'Access denied. Invalid token.' });
    }
};
