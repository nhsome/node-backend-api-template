const models = require('../models/index'),
    config = require('../config'),
    kue = require('kue'),
    timeoutMap = {
        //'somequeue': 20000,
    };

class Worker {
    constructor() {
        this.models = models;
        this.config = config;
        models.sequelize.authenticate();
    }

    initQueue(qname) {
        this.queue = kue.createQueue();
        this.qname = qname;
    }

    listen(qname) {
        this.initQueue(qname);
        this.queue.process(qname, async (job, done) => {
            console.log(`Received job for queue ${qname}.`, job.data);
            await this.execute(job, (...arg) => {
                let timeout = timeoutMap[qname] || 0;
                Worker.timeout(timeout).then(() => done(...arg));
            });
        });
        console.log(`Queue ${qname} listening.`)
    }
    //execute method must be implement

    repeat(qname, data, delay, priority) {
        delay = delay || 0;
        priority = priority || 'normal';
        return new Promise((resolve, reject) => {
            this.queue.create(this.qname, data).priority(priority)
                .save((err) => {
                    if (err) return reject(err);
                    resolve()
                })
                .delay(delay);
        });
    }

    static timeout(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

module.exports = Worker;