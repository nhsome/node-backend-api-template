const routes = require('./routes.js'),
    config = require('./config.js'),
    HttpError = require('standard-http-error'),
    Roles = require('./Roles'),
    AuthJWT = require('./AuthJWT');

class Router {
    constructor(server, indexRoute) {
        this.server = server;
        this.indexRoute = indexRoute || '';
    }

    addEventsListeners(models, queue) {
        routes.forEach(route => {
            let Controller = require('./controllers/' + route.controller);
            let controller = new Controller(config, models, queue);

            route.path = this.indexRoute + route.path;

            this.server[route.method](route.path, async (req, res, next) => {
                let executeAction = () => {
                    try {
                        let result = controller[route.action](req, res, next);
                        if (result instanceof Promise)
                            result.catch((err) => Router.handleError(err, res));
                    }
                    catch (err) {
                        return Router.handleError(err, res);
                    }
                };

                if (!route.accessible.length)
                    return executeAction();

                let token = req.headers.authorization;
                token = (token) ? token.replace('Bearer ', '') : token;

                try {
                    let decodedToken = await AuthJWT.verifyJWTToken(token, config.jwt_secret);
                    req.user = decodedToken.data;

                    if (!Roles.isUserHasAcess(route, req.user))
                        return res.status(403).send({error: "You are not have permissions"});

                    executeAction();
                }
                catch (e) {
                    res.status(401).send({error: "Invalid auth token provided."});
                }
            });
        });
    }

    static handleError(err, res) {
        let code = (err instanceof HttpError) ? err.code : 500;
        res.status(code).send({error: err.message});
    }
}

module.exports = Router;