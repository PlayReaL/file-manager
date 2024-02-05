import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";

export const commandHash = async (currentDir, args) => {
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
        await fs.promises.access(filePath, fs.promises.constants.F_OK);
        const content = await fs.promises.readFile(filePath);
        const hashFuction = crypto.createHash("sha256");
        hashFuction.update(content);
        console.log(`${hashFuction.digest("hex")}`);
    } catch (error) {
        console.log("Operation failed");
    }
};
