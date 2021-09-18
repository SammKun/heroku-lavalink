const https = require('https');
const fs = require('fs');
const { execSync } = require("child_process");
const extract = require('extract-zip')

const url = 'https://download1501.mediafire.com/vvddcune4eng/32tjs66nz40qdqk/Lavalink.jar'; // link to file you want to download
const path = './Lavalink.zip' // where to save a file

const request = https.get(url, function(response) {
    if (response.statusCode === 200) {
        var file = fs.createWriteStream(path);
        response.pipe(file);
    }
    request.setTimeout(60000, function() { // if after 60s file not downlaoded, we abort a request 
        request.abort();
    });
});
setTimeout(function(){
try {
    await extract("./Lavalink.zip", { dir: "./" })
    console.log('Extraction complete')
  } catch (err) {
    console.log(err)
  }
	}, 80000);

setTimeout(function(){
	 execSync("java -jar Lavalink.jar", { stdio: "inherit" });
}, 100000);

