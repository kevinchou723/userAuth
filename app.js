var express = require('express');
var app = express();
var path = require('path');

var httpProxy = require('http-proxy');

//set up proxy server
//this proxy crud request to the api server
const apiProxy = httpProxy.createProxyServer({
	target: "http://localhost:3001"
});

//endpoints with /api will be redirected to proxy
app.use('/api', function (req, res) {
	apiProxy.web(req, res);
});

//middleware to define folder for static files
app.use(express.static(path.join(__dirname, 'public')));
// //use index.html as react template
app.get('*', function (req, res) {
	res.sendFile(path.resolve(__dirname, 'public', 'index.html'))
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});

// error handler
app.use(function(err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render('error');
});

module.exports = app;
