import fs from "node:fs";
import path from "node:path";

export const cat = async (currentDir, args) => {
    if (args.length !== 1) {
        process.stdout.write("Invalid input\n");
        return;
    }
    const filePath = path.join(currentDir, args[0]);
    try {
        const content = await fs.promises.readFile(filePath, "utf-8");
        console.log(content);
    } catch (error) {
        console.log("Operation failed");
    }
};
