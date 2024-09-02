const logger = require('../utils/logger');

module.exports = (err, req, res, next) => {
    logger(`request header: ${JSON.stringify(req.headers)}`);
    logger(`request body: ${JSON.stringify(req.original_body)}`);
    logger(err.stack);
    next(err);
};