import os from "node:os";

import { parseArgs } from "./src/fmArgs.js";
import { getUserName, exitApp } from "./src/fmFileManager.js";

import { up, cd, ls } from "./src/fmNavigation.js";
import { cat, add, rn, cp, mv, rm } from "./src/fmFiles.js";
import { commandOs } from "./src/fmOs.js";
import { commandHash } from "./src/fmHash.js";
import { compress, decompress } from "./src/fmZip.js";

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
        case "up":
            currentPath = await up(currentPath, argsArr);
            break;
        case "cd":
            currentPath = await cd(currentPath, argsArr);
            break;
        case "ls":
            await ls(currentPath, argsArr);
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
        case "mv":
            await mv(currentPath, argsArr);
            break;
        case "rm":
            await rm(currentPath, argsArr);
            break;
        case "os":
            commandOs(argsArr);
            break;
        case "hash":
            await commandHash(currentPath, argsArr);
            break;
        case "compress":
            await compress(currentPath, argsArr);
            break;
        case "decompress":
            await decompress(currentPath, argsArr);
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
