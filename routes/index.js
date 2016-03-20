var express = require('express');
var router = express.Router();
var request = require('request');
var _ = require("lodash");

var stripeKey = process.env.STRIPE_API_KEY

if (!stripeKey) throw "StripeTokenNotDefined"

var stripe = require("stripe")(stripeKey);

/* GET home page. */
router.post('/enroll', function(req, res, next) {
	var enrollment = req.body.enrollment_data;
	var stripeToken = req.body.token;		

	var price; 	

	if (req.body.enrollment_data["coupon-code"].toLowerCase() === "cubb") {
		price = 100000;
	} else {
		price = 120000
	}

	stripe.customers.create({
	  source: stripeToken.id,
	  description: enrollment.email
	}).then(function(customer) {		
		return stripe.charges.create({
			amount: price, // amount in cents, again
			currency: "usd",
			customer: customer.id
		});				
	}).then(function(charge) {
		request({
		  url: 'https://script.google.com/macros/s/AKfycbz1ThaaXXJk1Of3SmdR4pYVTcmWAj_qswmGLzUjpnZS3F7f19Pp/exec',	    
		  method: 'POST',
		  //Lets post the following key/values as form
		  form: _.extend(enrollment, {customer: charge.customer, charge: charge.id})
		}, function(error, response, body){		  
	      res.send(200)		  
		}); 
	}).catch(function(error) {
		console.log("ERROOOR", error);
		res.send(error.statusCode, {message: error.message});
		return 
	})
});

module.exports = router;
