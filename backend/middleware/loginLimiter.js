const rateLimit = require('express-rate-limit')
const { options } = require('../routes/root')
const { logEvents } = require('./logger')

const loginLimiter = rateLimit({
    windowMs: 60*1000,
    max: 5,
    message:
    {message: 'Too many login attemps from this IP, Please try again after a minute pause'},
    handler: (req, res, next, options)  => {
        logEvents(`Too many Requests: ${options.message.message}\t${req.method}\t${req.url}\t${req.headers.origin}`,'errLog.log')
        res.status(options.statusCode).send(options.message)
    },
    standardHeaders: true,
    legacyHeaders: false,
})

module.exports = loginLimiter