const fs = require('fs');

function deleteFileByPath(filePath) {
    // eslint-disable-next-line no-console
    console.log(`Deleting file: ${filePath}`);
    fs.unlinkSync(filePath);
    // eslint-disable-next-line no-useless-return
    return;
}

module.exports = {
    deleteFileByPath,
};