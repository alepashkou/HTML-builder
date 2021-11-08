const fs = require('fs');
const path = require('path');

const inputPath = path.join(__dirname, 'files')
const outputPath = path.join(__dirname, 'files-copy')

function copy(input, output){
    fs.copyFile(input, output,(err) => {
        if (err){
            console.log(err);
        }
      })
}
fs.rmdir(outputPath, { recursive: true, force: true }, ()=>{
    fs.mkdir(outputPath, (err)=>{
        if(err){console.log(err)}
        fs.readdir(inputPath, (err, files)=>{
            if(err){console.log("Err")}
                files.forEach((el)=>{
                    const fileInput = path.join(inputPath, el)
                    const fileOutput = path.join(outputPath, el)
                    copy(fileInput, fileOutput)
            })
        })
    })
    console.log("Done")
})


    // function copy(input, output){
    //     console.log(input)
    //     console.log(output)
    //     fs.copyFile(input, output,(err) => {
    //         if (err){
    //             console.log(err);
    //         }
    //       })
    // }
    // fs.readdir(inputPath, (err, files)=>{
    //     if(err){console.log("Err")}
    //     files.forEach((el)=>{
    //         const fileInput = path.join(inputPath, el)
    //         const fileOutput = path.join(outputPath, el)
    //         copy(fileInput, fileOutput)
    //     })
    //     })