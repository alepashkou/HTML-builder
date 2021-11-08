const fs = require('fs');
const path = require('path');
//PATH
const papka = path.join(__dirname, 'secret-folder')
//CONVERT
const convert= function(bytes) {
  const sizes = ["bytes","kb","mb","gb","tb"]
  if(bytes ===0){return "n/a"}
  const a =parseInt(Math.floor(Math.log(bytes) / Math.log(1024)))
  if(a ===0) {return bytes + " " +sizes[a]}
  return (bytes / Math.pow(1024, a)).toFixed(1) + " " + sizes[a]}
//READDIR
fs.readdir(papka, (err, files)=>{
if(err){console.log("Err")}

files.forEach((el)=>{
  const pathFile = path.join(__dirname, 'secret-folder', el)
  const object = path.parse(pathFile)
  const fileName = object.name
  const extName = object.ext.replace(/[.]/g, '');
  
  fs.stat(pathFile, (err, stat)=>{
    if(err){return console.log('err')}
    if (stat.isFile()){
      console.log(`${fileName} - ${extName} - ${convert(stat.size)}`)
    }
  })
})
})