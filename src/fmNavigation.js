import fs from "node:fs";
import path from "node:path";

export const up = async (currentDir, args) => {
    let res = currentDir;
    if (args.length !== 0) {
        process.stdout.write("Invalid input\n");
        return currentDir;
    }
    res = path.normalize(res);
    const pathArr = res.split(path.sep);
    if (pathArr.length === 1) {
        return currentDir;
    }
    pathArr.pop();
    if (pathArr.length === 1) {
        res = pathArr.push(path.sep);
    }
    res = pathArr.join(path.sep);
    res = path.normalize(res);
    process.chdir(res);
    return res;
};

export const cd = async (currentDir, args) => {
    let res = currentDir;
    if (args.length !== 1) {
        process.stdout.write("Invalid input\n");
        return currentDir;
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

export const ls = async (currentDir, args) => {
    if (args.length !== 0) {
        process.stdout.write("Invalid input\n");
        return;
    }
    const files = fs.readdirSync(currentDir, {withFileTypes: true});
    const res = [];
    for (let i = 0; i < files.length; i++) {
        res.push({ name: files[i].name, type: files[i].isDirectory() ? "directory" : "file" });
    }
    res.sort((a, b) => a.type.localeCompare(b.type) || a.name.localeCompare(b.name));
    console.table(res);
};
