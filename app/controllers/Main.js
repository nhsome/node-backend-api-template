'use strict'

const Controller = require('./Base');

class Main extends Controller {
    showThisUser(req, res) {
		res.send(req.user);
	}
}

module.exports = Main;