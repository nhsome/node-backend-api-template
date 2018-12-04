'use strict'

const Controller = require('./Base'),
	AuthJWT = require('./../AuthJWT.js'),
    HttpError = require('standard-http-error'),
    md5 = require('md5');

class Auth extends Controller {
	async authVerify(req, res) {
        let user = await this.models.User.findOne({where: {login: req.body.login}});
        if (!user || user.passwordHash !== md5(this.config.jwt_secret + req.body.password))
            throw new HttpError(401, "fail");

        let token = AuthJWT.createJWToken(
            {
                sessionData: user.toJSON(),
                maxAge: 3600
            },
            this.config.jwt_secret
        );
        res.send({result: 'success', token: token});
	}
}

module.exports = Auth;