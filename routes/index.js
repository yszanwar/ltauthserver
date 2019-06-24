var express = require("express");
var router = express.Router();
var passport = require("passport");
var mongoose = require('mongoose');
mongoose.connect('mongodb+srv://yash:1234@cluster0-waqbt.azure.mongodb.net/test?retryWrites=true&w=majority',{ useNewUrlParser: true }, ()=>{
	console.log("database Connected")
});

var Schemna = mongoose.Schema;
var perSchema = new Schemna({
	userId: String,
	requestedper: String,
	grantedper: String,
});

/* GET home page. */
router.get("/", function(req, res, next) {
	res.render("index", { title: "Express" });
});


/* GET Google Authentication API. */
router.get(
	"/auth/google",
	passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
	"/auth/google/callback",
	passport.authenticate("google", { failureRedirect: "/", session: false }),
	function(req, res) {
		var userid = req.user.userId;
		var token = req.user.token;
		res.redirect("http://localhost:3000?userid=" + userid+"&token="+token);
	}
);

router.get(
	"/request",
	(req, res) => {
		console.log(req.query);
		var perOb = mongoose.model("perOb", perSchema);
		var per = new perOb({
			userId: req.query.user,
			requestedper: req.query.type,
			grantedper: req.query.type
		});
		per.save((error)=>{
			if(error){
				console.log("Error in saving");
				res.status(400);
				res.send({ message: 'Error in requesting' });
			} else {
				console.log("Permission request saved");
				res.status(200);
				res.send({ message: 'requested.' });
			}
		})

	}
);

module.exports = router;
