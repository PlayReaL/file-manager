import fs from "node:fs";
import path from "node:path";
import { chdir } from "node:process";

export const up = async (currentDir, args) => {
    return currentDir;
};

export const cd = async (currentDir, args) => {
    let res = currentDir;
    if (args.length !== 1) {
        process.stdout.write("Invalid input\n");
        return;
    }
    let folderPath = "";
    if (path.isAbsolute(args[0])) {
        folderPath = args[0];
    } else {
        folderPath = path.join(currentDir, args[0]);
    }
    try {
        folderPath = path.normalize(folderPath);
        if (fs.lstatSync(folderPath).isDirectory()) {
            res = folderPath;
            process.chdir(folderPath);
        } else {
            console.log("Operation failed");
        }
    } catch (error) {
        console.log("Operation failed");
    }

    return res;
};

export const ls = async (currentDir, args) => {};
