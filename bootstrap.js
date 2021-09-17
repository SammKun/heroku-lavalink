
const fs = require("fs")
const fetch = require("node-fetch")

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
            file.close(cb);
        });
        file.on("error", function(err){
            console.error("Filestream error while downloading Lavalink: "+err)
        })
    })
    .catch(function(err){
        console.error("Fetch error while downloading Lavalink: "+err)
    })
};

function startLavalink() {
    const spawn = require("child_process").spawn;
    const child = spawn("java", ["-jar", "Lavalink.jar"])

    child.stdout.setEncoding("utf8")
    child.stderr.setEncoding("utf8")

    child.stdout.on("data", (data) => {
        console.log(data);
    });

    child.stderr.on("data", (data) => {
        console.error(data);
    });

    child.on("error", (error) => {
        console.error(error);
    });

    child.on("close", (code) => {
        console.log(`Lavalink exited with code ${code}`);
    });
}


let priorDL_URL = `https://download1501.mediafire.com/vvddcune4eng/32tjs66nz40qdqk/Lavalink.jar`
            console.log("Found: "+priorDL_URL)
            if("./Lavalink.jar" === null){
            download(priorDL_URL, "./Lavalink.jar", startLavalink)
                return;
            }else{
                startLavalink
                return;
            }



