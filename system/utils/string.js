const uniqid = require('uniqid');

function generateUniqueString(prefix = '') {
    return uniqid(prefix);
}

module.exports = {
    generateUniqueString,
};