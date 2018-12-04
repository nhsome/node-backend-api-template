const models = require('../models');
    config = require('../config');

class Command {
    constructor() {
        this.models = models;
        this.config = config;
        models.sequelize.authenticate();
    }

    //execute method must be implement
}

module.exports = Command;