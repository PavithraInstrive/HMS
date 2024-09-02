const boom = require('@hapi/boom');

// eslint-disable-next-line consistent-return
const controllerHandler = (promise, params) => async(req, res, next) => {
    const boundParams = params ? params(req, res, next) : [];
    try {
        const result = await promise(...boundParams);
        return res.json(result || {
            message: 'OK',
        });
    } catch (error) {
        if (!error.isBoom) {
            return next(boom.badImplementation(error));
        }
        next(error);
    }
};

module.exports = controllerHandler;