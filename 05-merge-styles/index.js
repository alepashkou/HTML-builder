const fs = require('fs');
const path = require('path');

//PATH
const inputPath = path.join(__dirname, 'styles')
const outputPath = path.join(__dirname, 'project-dist')
const outputFile = path.join(outputPath, 'bundle.css')
//CREATE BUNDLE FILE
fs.open(outputFile, 'w+', (err)=>{
    if(err){console.log(err)}
    fs.createWriteStream(outputFile).write('')
})
//FUNC WRITE
function write(input){
    const read = fs.createReadStream(input);
    read.on('data', function (text) {
        fs.appendFile(outputFile, text, function (err) {
            if (err) throw err;
            console.log('add file:', path.basename(input));
          });
});
}
//READ
fs.readdir(inputPath, (err, files)=>{
    if(err){console.log("Err")}
        files.forEach((el)=>{
            const fileInput = path.join(inputPath, el)
            if(path.extname(fileInput) === '.css'){
                write(fileInput)
            }
    })
})
