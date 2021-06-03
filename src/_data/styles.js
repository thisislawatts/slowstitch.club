const fs = require('fs');
const path = require('path');

module.exports = fs.readFileSync(path.resolve(__dirname, '../../src/static/css/screen.css'), {encoding: 'utf-8'});