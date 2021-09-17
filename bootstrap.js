
const fs = require("fs")
const fetch = require("node-fetch")
const { default: { stream } } = require("got");
const { createWriteStream } = require("fs");
const { execSync } = require("child_process");

let application = fs.readFileSync("./application.yml", "utf8")

if (process.env.PORT) {
    application = application.replace("DYNAMICPORT", process.env.PORT)
}

if (process.env.PASS) {
    application = application.replace("youshallnotpass", process.env.PASS)
}
fs.writeFileSync("./application.yml", application)

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

const url = "https://download1501.mediafire.com/vvddcune4eng/32tjs66nz40qdqk/Lavalink.jar";

const start = () => {
    const download = stream(url).pipe(createWriteStream('Lavalink.jar'));
    download.on("finish", () => {
        execSync("java -jar Lavalink.jar", { stdio: "inherit" });
    });
};
start();





