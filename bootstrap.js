const fs = require("fs")
const fetch = require("node-fetch")
const { execSync } = require("child_process");

let application = fs.readFileSync("./application.yml", "utf8")

if (process.env.PORT) {
    application = application.replace("DYNAMICPORT", process.env.PORT)
}

if (process.env.PASS) {
    application = application.replace("youshallnotpass", process.env.PASS)
}
fs.writeFileSync("./application.yml", application)

const download = function (url, dest, cb) {
    const file = fs.createWriteStream(dest);
    fetch(url).then(res=>{
        res.body.pipe(file)
        console.log("Downloading Lavalink.jar")
        file.on("finish", function () {
            console.log("Downloaded Lavalink.jar")
            setTimeout(function(){
            file.close(cb);
            },20000)
        });
        file.on("error", function(err){
            console.error("Filestream error while downloading Lavalink: "+err)
        })
    })
    .catch(function(err){
        console.error("Fetch error while downloading Lavalink: "+err)
    })
};

 let priorDL_URL = `https://download1501.mediafire.com/vvddcune4eng/32tjs66nz40qdqk/Lavalink.jar`
            console.log("Found: "+priorDL_URL)
            download(priorDL_URL, "./Lavalink.jar")
setTimeout(function(){execSync("java -jar ./Lavalink.jar", { stdio: "inherit" })},50000)
