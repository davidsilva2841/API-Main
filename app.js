const createError = require('http-errors');
const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

require("./startup/routes")(app);

// --------------------------------------------------------------------------------------------------


app.get('/', (req, res) => {
	res.send('GET / success')
});


app.get('/test', (req, res) => {
	res.send('GET /test success')
});

// --------------------------------------------------------------------------------------------------

// Catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// Error handler
app.use(function (err, req, res, next) {
    // Set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    console.log(err.status);
    res.sendStatus(err.status || 500);
});

module.exports = app;
