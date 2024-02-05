import fs from "node:fs";
import path from "node:path";

export const cat = async (currentDir, args) => {
    if (args.length !== 1) {
        process.stdout.write("Invalid input\n");
        return;
    }
    let filePath = "";
    if (path.isAbsolute(args[0])) {
        filePath = args[0];
    } else {
        filePath = path.join(currentDir, args[0]);
    }
    try {
        const content = await fs.promises.readFile(filePath, "utf-8");
        console.log(content);
    } catch (error) {
        console.log("Operation failed");
    }
};

export const add = async (currentDir, args) => {
    if (args.length !== 1) {
        process.stdout.write("Invalid input\n");
        return;
    }
    const filePath = path.join(currentDir, args[0]);
    try {
        await fs.promises.writeFile(filePath, "", { flag: "wx" });
    } catch (error) {
        console.log("Operation failed");
    }
};

export const rn = async (currentDir, args) => {
    if (args.length !== 2) {
        process.stdout.write("Invalid input\n");
        return;
    }
    let oldFileName = "";
    let newFileName = "";
    if (path.isAbsolute(args[0])) {
        oldFileName = args[0];
    } else {
        oldFileName = path.join(currentDir, args[0]);
    }
    if (path.isAbsolute(args[1])) {
        newFileName = args[1];
    } else {
        newFileName = path.join(currentDir, args[1]);
    }
    try {
        await fs.promises.access(newFileName, fs.promises.constants.F_OK);
        console.log("Operation failed");
    } catch (error) {
        try {
            await fs.promises.rename(oldFileName, newFileName);
        } catch (error) {
            console.log("Operation failed");
        }
    }
};

export const cp = async (currentDir, args) => {
    if (args.length !== 2) {
        process.stdout.write("Invalid input\n");
        return;
    }
    let filePath = "";
    let folderPath = "";
    if (path.isAbsolute(args[0])) {
        filePath = args[0];
    } else {
        filePath = path.join(currentDir, args[0]);
    }
    if (path.isAbsolute(args[1])) {
        folderPath = args[1];
    } else {
        folderPath = path.join(currentDir, args[1]);
    }
    let newFilePath = path.join(folderPath, path.basename(filePath));
    try {
        await fs.promises.access(newFilePath, fs.promises.constants.F_OK);
        console.log("Operation failed");
    } catch (error) {
        try {
            await fs.promises.access(filePath, fs.promises.constants.F_OK);
            const st = await fs.promises.stat(folderPath);
            if (st.isDirectory()) {
                const streamIn = fs.createReadStream(filePath);
                const streamOut = fs.createWriteStream(newFilePath);
                streamIn.pipe(streamOut);
            } else {
                console.log("Operation failed");
            }
        } catch (error) {
            console.log("Operation failed");
        }
    }
};
