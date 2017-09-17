var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');

/* GET contact page. */
router.get('/', function(req, res, next) {
  res.render('contact', { title: 'Contact' });
});

router.post('/send', function(req,res, next) {
	var transporter = nodemailer.createTransport({
		service: 'Gmail',
		auth: {
			user: 'kevinlee05@gmail.com',
			pass: 's@lvation7'
		}
	});

	var mailOptions = {
		from: 'Website user <website@user.com>',
		to: 'inspir3d@gmail.com',
		subject: 'website submission',
		text: 'you have a new submission with the following details...Name: '+req.body.name+ 
			'Email: '+req.body.email+' Message: '+req.body.message+' ',
		html: '<p>you have a new submission:</p><ul> <li>Name: '+req.body.name+
		'</li><li>Email: '+req.body.email+'</li><li>Message: '+req.body.message+'</li></ul>'
	};

	transporter.sendMail(mailOptions, function(error, info){
		if(error){
			console.log(error);
			res.redirect('/');
		} else {
			console.log('Message Sent'+info.response);
			res.redirect('/');
		}
	});
});

module.exports = router;
