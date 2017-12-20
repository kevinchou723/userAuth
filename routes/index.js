var express = require('express');
var router = express.Router();
var User = require('../models/User');

//use index.html as react template
router.get('/', function (req, res) {
	res.sendFile(path.resolve(__dirname, 'public', 'index.html'))
});

//signup user
router.post('/signup', function (req, res) {
	var email = req.body.email;
	User.findOne({ 'email': email }, function (err, user) {
		//return done incase of errors
		if (err) {
			console.log('error in signup:', err);
			return res.json(err);
		}

		//user already exist
		if (user) {
			console.log('user email already exist');
			return res.json({ success: false, message: 'User already exist' });
		} else {
			//set new users credentials
			var newUserData = {
				email: email,
				firstname: req.body.firstname,
				lastname: req.body.lastname,
				password: req.body.password
			};

			//create the user
			User.create(newUserData, function (err, user) {
				if (err) {
					console.log('error is saving user');
					throw err;
				}
				console.log('User created!');
				req.session.userId = user._id;
				return res.json({ success: true, user: user });
			});
		}
	});
});

//login user
router.post('/login', function (req, res) {
	var email = req.body.email;
	var password = req.body.password;
	//if there's email and password
	if (email && password) {
		//authenticate the user
		User.authenticate(email, password, function (err, user) {
			if (err) {
				console.log('error is logging in user');
				throw err;
			} else if (!user) {
				return res.json({ success: false, message: 'user not found' });
			} else {
				req.session.userId = user._id;
				return res.json({ success: true, user: user });
			}
		})
	}
});

//get user profile
router.get('/me', function (req, res) {
	//user the session userid to find out if user is loggedin
	User.findById(req.session.userId)
	.exec(function (err, user) {
		if (err) {
			return res.json({ success: false, message: 'user not authenticated' });
		} else {
			return res.json({ success: true, message: 'user authenticated!' });
		}
	});
});

//logout user
router.get('/logout', function (req, res) {
	//if session exist
	if (req.session) {
		//destory it
		req.session.destroy(function (err) {
			if (err) {
				return res.json({ success: false, message: 'error logging out' });
			} else {
				return res.json({ success: true, message: 'user logged out' });
			}
		})
	}
});

module.exports = router;
