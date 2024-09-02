/* eslint-disable no-unused-vars */
const boom = require('@hapi/boom');
const validationErrorHandler = require('celebrate').errors;

async function tokenErrorHandler(err, req, res, next) {
    if (err.status === 401) {
        next(boom.unauthorized(err.name));
    } else {
        next(err);
    }
}

function allErrorHandler(err, req, res, next) {
    if (err.output) {
        return res.status(err.output.statusCode).json(err.output.payload);
    }
    return res.status(500).json('Internal Server Error');
}

module.exports = {
    token: tokenErrorHandler,
    validation: validationErrorHandler(),
    all: allErrorHandler,
};