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

	var price = checkCouponCode(req.body.enrollment_data["Discount Code"]);

	var email = enrollment["Parent Email"];
	var name = enrollment["Parent Name"];

	console.log("email", email, name);
	stripe.customers.create({
	  source: stripeToken,
	  description: name,
	  email: email
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

router.post('/confirmation', function(req, res, next) {
	var enrollment = req.body;		
	sessionNumber = enrollment["Session"];

	if (sessionNumber === "1") {
		enrollment["Session"] = "6/20 - 7/1: Design Tech High School, Millbrae"
	} else if (sessionNumber === "2") {
		enrollment["Session"] = "7/11 - 7/22: Union Square, San Francisco"		
	} else {
		enrollment["Session"] = "7/27 - 8/9: Cubberley Community Center, Palo Alto"
	}

	var coupon = getCoupon(req.body["Discount Code"]);

	res.render("confirmation.jade", _.extend({data: enrollment, sessionNumber: sessionNumber}, coupon));
});

function checkCouponCode(code) {
	if (code.toLowerCase() === "gunn" || code.toLowerCase() === "dtech") {
		return 96000;
	} else {
		return 120000
	}
}

function getCoupon(code) {
	if (code.toLowerCase() === "gunn") {
		return {price: "$960.00", discount: "20%"}
	} else if (code.toLowerCase() === "dtech") {
		return {price: "$960.00", discount: "20%"}
	} else {
		return {price: "$1,200.00"}
	}
}

module.exports = router;
