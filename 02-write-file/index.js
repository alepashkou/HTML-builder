const readline = require('readline');
const { stdin: input, stdout: output } = require('process');
const fs = require('fs');
const path = require('path');
const readlines = readline.createInterface({ input, output });
const file = path.join(__dirname, 'text.txt')
let write = fs.createWriteStream(file);


console.log('What text do you want write?');
readlines.on('line', (data) => {
    if (data === "exit"||data === "Exit"){
        console.log("GOODBYE!")
       return readlines.close();
    }
    write.write(`${data}`)
    return console.log('What text do you want write next?');
});

readlines.on('SIGINT', () => {
    console.log("GOODBYE!")
    return readlines.close();
});
