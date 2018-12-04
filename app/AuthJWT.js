const jwt = require('jsonwebtoken'),
	_ = require('lodash');

class AuthJWT {
	static verifyJWTToken(token, jwt_secret) {
	  return new Promise((resolve, reject) => {
	    jwt.verify(token, jwt_secret, (err, decodedToken) => {
	      if (err || !decodedToken) {
	        return reject(err)
	      }
	      resolve(decodedToken)
	    })
	  });
	}

	static createJWToken(details, jwt_secret) {
	  if (typeof details !== 'object')
	  	details = {};

	  if (!details.maxAge || typeof details.maxAge !== 'number')
	  	details.maxAge = 3600;

	  details.sessionData = _.reduce(details.sessionData || {}, (memo, val, key) => {
	    if (typeof val !== "function" && key !== "password")
		    memo[key] = val;
	    return memo;
	  }, {});

	  return jwt.sign(
	  	{data: details.sessionData},
	  	jwt_secret, 
	  	{
	      expiresIn: details.maxAge,
	      algorithm: 'HS256'
	    }
	  );
	}
}

module.exports = AuthJWT;