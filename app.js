var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser')
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//CORS bypass
app.use(function(req, res, next) {
    //must be included these first two
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    next();
});
app.use(cookieParser());


if(process.env.NODE_ENV === 'poduction'){
   app.use(express.static('client/build'));
   app.get('/', function(req, res){
       res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
   });
}

app.use('/', indexRouter);
app.use('/users', usersRouter);

// // catch 404 and forward to error handler hwen cant read the page
// app.use(function(req, res, next) {
//     next(createError(404));
// });

//function for error handler
app.use(function(err, req, res, next) {
    res.locals.message = err.message;

    // render the error page on the 500 
    res.status(err.status || 500);
    res.render('error');
});


const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));