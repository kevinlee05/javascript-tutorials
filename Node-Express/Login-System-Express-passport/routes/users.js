var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/usermodel');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/register', function(req, res, next) {
	res.render('register', {
		'title':'Register'
	});
});

router.get('/login', function(req, res, next) {
	res.render('login', {
		'title':'Login'
	});
});

router.post('/register', function(req, res, next) {
	// get form values
	var name = req.body.name;
	var email = req.body.email;
	var username = req.body.username;
	var password = req.body.password;
	var password2 = req.body.password2;

	//check for image
	if(req.body.profileimage) {
		console.log('uploading image');

		//image data
		var profileImageOriginalName 	= req.files.profileimage.originalname;
		var profileImageName 			= req.files.profileimage.name;
		var profileImageMime 			= req.files.profileimage.mimetype;
		var profileImagePath 			= req.files.profileimage.path;
		var profileImageExt 			= req.files.profileimage.extension;
		var profileImageSize 			= req.files.profileimage.size;

	} else {
		// set profile image to default
		var profileImageName = 'noimage.png';
	}

	//form validation
	req.checkBody('name','Name is required').notEmpty();
	req.checkBody('email','Email is required').notEmpty();
	req.checkBody('email','Email not valid').isEmail();
	req.checkBody('username','username is required').notEmpty();
	req.checkBody('password','password is required').notEmpty();
	req.checkBody('password2','passwords do not match').equals(req.body.password);

	var errors = req.validationErrors();

	if(errors){
		res.render('register', {
			errors: errors,
			name: name,
			email: email,
			username: username,
			password: password,
			password2: password2
		});
	} else {
		var newUser = new User({
			errors: errors,
			name: name,
			email: email,
			username: username,
			password: password,
			profileimage: profileImageName
		});

		// create user
		User.createUser(newUser, function(error, user){
			if(error) throw error;
			console.log(user);
		});

		//success message
		req.flash('success', 'you are now registered you may log in');

		res.location('/');
		res.redirect('/');
	}


});

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.getUserById(id, function(err, user) {
    done(err, user);
  });
});

passport.use(new LocalStrategy(
	function(username, password, done){
		User.getUserByUsername(username, function(err, user){
			if (err) throw err;
			if (!user){
				console.log('unknown user');
				return(null,false, {message:'unknown user'});
			}

			User.comparePassword(password, user.password, function(err, isMatch){
				if(err) throw err;
				if(isMatch) {
					return done(null, user);
				} else {
					console.log('invalid password');
					return done(null, false, {message:'invalid password'});
				}
			})
		})
	})
)


router.post('/login', passport.authenticate('local',{
		// successRedirect: '/',
		failureRedirect: '/users/login',
		failureFlash: 'invalid username or password',
	}), function(req, res, next) {
		console.log('authentication successful');
		req.flash('success', 'you have logged in successfully');
		res.redirect('/');
	}
);

router.get('/logout', function(req,res,next){
	// req.session.destroy(function(err){
	// 	req.redirect('/users/login');
	// });
	req.logout();
	req.flash('success','You have logged out. See you again soon');
	res.redirect('/users/login');
})




module.exports = router;
