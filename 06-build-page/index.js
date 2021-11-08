const fs = require("fs");
const path = require("path");

const inputPathAssets = path.join(__dirname, "assets");
const inputPathComponents = path.join(__dirname, "components");
const inputPathStyles = path.join(__dirname, "styles");
const inputTemplate = path.join(__dirname, "template.html");
const outputPath = path.join(__dirname, "project-dist");
const outputTemplate = path.join(outputPath, "index.html");
const outputStyle = path.join(outputPath, "style.css");
const outputAssets = path.join(outputPath, "assets");

//delete folder and files and create
fs.rm(outputPath, { recursive: true, force: true }, () => {
  fs.mkdir(outputPath, (err) => {
    console.log("✓ Сreate or remove project-dist");
    //create assets folder
    fs.mkdir(outputAssets, (err) => {
      if (err) {
        console.log(err);
      }
      console.log("✓ Сreate folder assets");
    });

    //create index.html
    fs.open(outputTemplate, "w+", (err) => {
      if (err) {
        console.log(err);
      }
      console.log("✓ Сreate index.html");
    });
    //create style.css
    fs.open(outputStyle, "w+", (err) => {
      if (err) {
        console.log(err);
      }
      console.log("✓ Сreate style.css");
    });
    compilateStyles();
    compilateAssets();
  });
});

function compilateStyles() {
  //FUNC WRITE
  function write(input) {
    const read = fs.createReadStream(input);
    read.on("data", function (text) {
      fs.appendFile(outputStyle, text, function (err) {
        if (err) throw err;
        console.log("✓ Add style file:", path.basename(input));
      });
    });
  }
  //READ
  fs.readdir(inputPathStyles, (err, files) => {
    if (err) {
      console.log("Err");
    }
    files.forEach((el) => {
      const fileInput = path.join(inputPathStyles, el);
      if (path.extname(fileInput) === ".css") {
        write(fileInput);
      }
    });
  });
  compilateIndex();
}
//compilate index
function compilateIndex() {
  const readTemplate = fs.createReadStream(inputTemplate);
  readTemplate.on("data", function (text) {
    let templateHtml = text.toString();
    fs.readdir(inputPathComponents, (err, files) => {
      let IndexHtml = templateHtml;
      if (err) {
        console.log(err);
      } else {
        // Magic. Dount touch.
        files.forEach((el) => {
          const filePath = path.join(inputPathComponents, el);
          const fileName = path.parse(filePath).name;
          readComponent = fs.createReadStream(filePath);
          readComponent.on("data", function (readText) {
            IndexHtml = IndexHtml.replace(
              `{{${fileName}}}`,
              readText.toString()
            );
            fs.createWriteStream(outputTemplate).write(IndexHtml);
            console.log(`✓ Add html file: ${fileName}`);
          });
        });
      }
    });
  });
}
function compilateAssets() {
  //copy
  function copy(input, output) {
    fs.copyFile(input, output, (err) => {
      if (err) {
        console.log(err);
      }
    });
  }
  function readFilesAssets(input, output) {
    fs.readdir(input, (err, files) => {
      if (err) {
        console.log("Err");
      }

      files.forEach((el) => {
        const fileInput = path.join(input, el);
        const fileOutput = path.join(output, el);
        copy(fileInput, fileOutput);
      });
    });
  }
  //create papka
  function createAssets(namefolder) {
    fs.mkdir(path.join(outputAssets, namefolder), (err) => {
      if (err) {
        console.log(err);
      }
    });
    const assetsFolderInput = path.join(inputPathAssets, namefolder);
    const assetsFolderOutput = path.join(outputAssets, namefolder);
    readFilesAssets(assetsFolderInput, assetsFolderOutput);
  }

  //read papka
  fs.readdir(inputPathAssets, (err, files) => {
    if (err) {
      console.log(err);
    }
    files.forEach((el) => {
      const pathFile = path.join(inputPathAssets, el);
      fs.stat(pathFile, (err, stat) => {
        if (err) {
          return console.log("err");
        }
        if (!stat.isFile()) {
          console.log("✓ Add assets:", path.parse(pathFile).name);
          createAssets(path.parse(pathFile).name);
        }
      });
    });
  });
}
