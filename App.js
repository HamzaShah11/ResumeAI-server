const express = require('express');
const app = express();
const cors = require('cors');

const Moviequestions = require("./controllers/MoviesQuiz")
const bodyParser = require('body-parser');


app.use(bodyParser.json());
app.use(cors());


app.use((req, res, next) => {
    res.header('Access-control-Allow-Origin', '*')
    res.header('Access-control-Allow-Origin', '*',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if (req.method === 'OPTIONS') {
        res.header('Access-control-Allow-Methods', 'PUT', 'POST', 'PATCH', 'DELETE', 'GET')
        return res.status(200).json({});
    }
    next();
})

app.use('/Movies', Moviequestions)


app.use((req, res, next) => {
    const error = new Error('not found')
    error.status = 400;
    next(error)
})
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    })
})

module.exports = app;