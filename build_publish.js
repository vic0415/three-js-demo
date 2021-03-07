var shell = require('shelljs');
var fs = require('fs');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;


let versionCode = "";

// 抓config
fs.readFile('json/config.json', function (err, data) {
  let config = JSON.parse(data);
  console.log(config["versionCode"]);
  versionCode = config["versionCode"];


  shell.mkdir('build/'+versionCode);
  shell.mkdir('build/'+versionCode+'/dist');

  shell.exec('tsc');
  shell.exec('webpack --config webpack.config.publish.js  --mode=production --output-path=build/'+versionCode+'/dist');

  shell.exec('cp -R assets/ build/'+versionCode+'/assets'+versionCode+'/');

  fs.readFile('index.html', function (err, data) {
      if (err) throw err;
  
      //console.log(data.toString());

      let dom = new JSDOM(data.toString());
      console.log(dom.window._document.getElementById("mainJs").setAttribute("src", "./dist/bundle.js?v="+versionCode));

      fs.writeFile('build/'+versionCode+'/index.html', dom.serialize(), (err) => {
          if (err) return console.error(err);
          console.log('copy html complete');
        })
  });
});




