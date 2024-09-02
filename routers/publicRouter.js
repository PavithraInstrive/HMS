const user = require('../api/User/route');

const publicRouters = (app) => {
    app.use('/api/user', user);

};

module.exports = publicRouters;