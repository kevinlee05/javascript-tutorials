var express = require('express');
var router = express.Router();
var mongo = require('mongodb');
var db = require('monk')('localhost/nodeblog');
var multer = require('multer');
var upload = multer({dest: './public/images/uploads'});


/* GET posts page. */
router.get('/show/:postid', function(req, res, next) {
	var posts = db.get('posts');
	posts.findById(req.params.postid, function(err, post){
		res.render('show', {
			"post": post
		});
	});
});

router.get('/add', function(req, res, next) {
	var categories = db.get('categories');
	categories.find({},{}, function(err, categories){
		res.render('addpost',{
			'title': "Add Post",
			'categories': categories
		});

	});
});

router.post('/add', upload.single('mainimage'), function(req, res, next) {
	//get form values
	var title 		= req.body.title;
	var category 	= req.body.category;
	var body 		= req.body.body;
	var author 		= req.body.author;
	var date 		= new Date();

	if(req.file){
		console.log(req.file)
		var mainImageOriginalName 	= req.file.originalname;
		var mainImageEncoding		= req.file.encoding;
		var mainImageName 			= req.file.filename;
		var mainImageMime 			= req.file.mimetype;
		var mainImagePath 			= req.file.path;
		var mainImageSize 			= req.file.size;
	} else {
		var mainImageName = 'noimage.png';
	}

	//Form Validation
	req.checkBody('title','Title field is required').notEmpty();
	req.checkBody('body', 'Body field is required').notEmpty();

	// check errors
	var errors = req.validationErrors();

	if(errors){
		res.render('addpost',{
			'errors': errors,
			'title': title,
			'body': body
		});
	} else {
		var posts = db.get('posts');

		// submit to DB
		posts.insert({
			"title": title,
			"body": body,
			"category": category,
			"date": date,
			"author": author,
			"mainimage": mainImageName
		}, function(err, post){
			if(err){
				res.send('there was an issue submitting the post');
			} else {
				req.flash('success','post successfully submitted');
				res.location('/');
				res.redirect('/');
			}
		});
	}
});

router.post('/addcomment', function(req, res, next) {
	//get form values
	var name 		= req.body.name;
	var email 		= req.body.email;
	var commentBody = req.body.commentBody;
	var postid 		= req.body.postid;
	var commentDate = new Date();

	//Form Validation
	req.checkBody('name','Name is required').notEmpty();
	req.checkBody('email','Email is required').notEmpty();
	req.checkBody('email','Email not valid').isEmail();
	req.checkBody('commentBody', 'Body field is required').notEmpty();

	// check errors
	var errors = req.validationErrors();

	if(errors){
		var posts = db.get('posts');
		posts.findById(postid, function(err,post){
			res.render('show',{
				'errors': errors,
				'post': post,
				'name': name,
				'email': email,
				'commentBody': commentBody,
		});

		})
	} else {
		var posts = db.get('posts');

		var comment = {
			'name': name,
			'email': email,
			'commentBody': commentBody,	
			'commentDate': commentDate
		}

		// submit to DB
		posts.update({
			"_id": postid
		},
		{
			$push:{
				"comments": comment
			}
		}, function(err, doc){
			if(err){
				throw err;
				// res.send('there was an issue submitting the comment');
			} else {
				req.flash('success','comment successfully submitted');
				res.location('/posts/show/'+ postid);
				res.redirect('/posts/show/'+ postid);
			}
		});
	}

});


module.exports = router;
