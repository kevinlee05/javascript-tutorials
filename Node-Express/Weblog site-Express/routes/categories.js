var express = require('express');
var router = express.Router();
var mongo = require('mongodb');
var db = require('monk')('localhost/nodeblog');
var multer = require('multer');
var upload = multer({dest: './public/images/uploads'});


/* GET posts page. */
router.get('/add', function(req, res, next) {
	res.render('addcategory', {
		"title": "Add Category"
	});
});

router.get('/show/:category', function(req, res, next){
	// var db = req.db;
	var posts = db.get( 'posts');
	posts.find({category: req.params.category},{}, function(err, posts){
		res.render('index', {
			"title": req.params.category,
			"posts": posts
		});
	});
})

router.post('/add', upload.single('mainimage'), function(req, res, next) {
	//get form values
	var title 		= req.body.title;

	//Form Validation
	req.checkBody('title','Title field is required').notEmpty();

	// check errors
	var errors = req.validationErrors();

	if(errors){
		res.render('addcategory',{
			'errors': errors,
			'title': title
		});
	} else {
		var categories = db.get('categories');

		// submit to DB
		categories.insert({
			"title": title
		}, function(err, category){
			if(err){
				res. send('there was an issue submitting the category');
			} else {
				req.flash('success','category successfully added');
				res.location('/');
				res.redirect('/');
			}
		});
	}

});


module.exports = router;