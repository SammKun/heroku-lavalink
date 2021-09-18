const https = require('https');
const fs = require('fs');
const { execSync } = require("child_process");

let application = fs.readFileSync('./application.yml','utf8')

if(process.env.PORT){
	application = application.replace('DYNAMICPORT',process.env.PORT)
}

if(process.env.PASS){
	application = application.replace('youshallnotpass',process.env.PASS)
}
fs.writeFileSync('./application.yml', application)

const url = 'https://download1501.mediafire.com/vvddcune4eng/32tjs66nz40qdqk/Lavalink.jar'; // link to file you want to download
const path = './Lavalink.jar' // where to save a file

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
	 execSync("java -jar Lavalink.jar", { stdio: "inherit" });
}, 140000);

