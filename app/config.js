module.exports = {
    serverPort: process.env.SERVERPORT,
    mysql: {
        host     : process.env.HOST,
        user     : process.env.USER,
        password : process.env.PASSWORD,
        database : process.env.DATABASE,
        options: {
            host: 'localhost',
            dialect: 'mysql'
        }
    },
    jwt_secret: process.env.JWT_SECRET
};