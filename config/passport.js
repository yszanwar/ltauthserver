var passport = require("passport");
var GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;

passport.serializeUser(function(user, done) {
	done(null, user);
});

passport.deserializeUser(function(user, done) {
	done(null, user);
});

passport.use(
	new GoogleStrategy(
		{
			clientID: "53043402249-tfn348d1nq573j5t7ulif8g68mbgar0n.apps.googleusercontent.com",
			clientSecret: "zrK7hkSKz0ScORmiI3aLOcTX",
			callbackURL: "http://localhost:4500/auth/google/callback"
		},
		function(accessToken, refreshToken, profile, done) {
			var userData = {
				email: profile.emails[0].value,
				name: profile.displayName,
				token: accessToken,
				userId: profile.id
			};
			console.log(userData);
			done(null, userData);
		}
	)
);
