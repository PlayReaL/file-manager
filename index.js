import os from "node:os";

import { parseArgs } from "./src/fmArgs.js";
import { getUserName, exitApp } from "./src/fmFileManager.js";

import { cat, add, rn, cp } from "./src/fmFiles.js";
import { commandOs } from "./src/fmOs.js";

const userName = getUserName();
let currentPath = os.homedir();

const processInput = async (data) => {
    const str = data.toString().trim();
    let command = "";
    let args = "";
    const spaceIdx = str.indexOf(" ");
    if (spaceIdx === -1) {
        command = str;
    } else {
        command = str.substring(0, spaceIdx);
        args = str.substring(spaceIdx + 1);
    }
    const argsArr = parseArgs(args);

    switch (command) {
        case "test":
            process.stdout.write("test\n");
            break;
        case "cat":
            await cat(currentPath, argsArr);
            break;
        case "add":
            await add(currentPath, argsArr);
            break;
        case "rn":
            await rn(currentPath, argsArr);
            break;
        case "cp":
            await cp(currentPath, argsArr);
            break;
        case "os":
            commandOs(argsArr);
            break;
        case ".exit":
            exitApp(userName);
            break;
        default:
            process.stdout.write("Invalid input\n");
            break;
    }
    process.stdout.write(`You are currently in ${currentPath}\n`);
    process.stdout.write(">");
};

process.chdir(currentPath);

process.stdout.write(`Welcome to the File Manager, ${userName}!\n`);
process.stdout.write(`You are currently in ${currentPath}\n`);

process.stdout.write(">");
process.stdin.on("data", processInput);

process.on("SIGINT", () => {
    exitApp(userName);
});
