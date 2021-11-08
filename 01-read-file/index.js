const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, 'text.txt')
let read = fs.createReadStream(file);
read.on('data', function (text) {
    console.log(text.toString());
});