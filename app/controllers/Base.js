'use strict'

class Controller {
	constructor(config, models, queue) {
		this.config = config;
        this.models = models;
        this.queue = queue;
	}
}

module.exports = Controller;