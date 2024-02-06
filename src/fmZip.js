import fs from "node:fs";
import stream from "node:stream";
import path from "node:path";
import zlib from "node:zlib";

export const compress = async (currentDir, args) => {
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
            await fs.promises.access(oldFileName, fs.promises.constants.F_OK);
            const src = fs.createReadStream(oldFileName);
            const dest = fs.createWriteStream(newFileName);
            const compressBrotli = zlib.createBrotliCompress();
            await stream.promises.pipeline(src, compressBrotli, dest);
        } catch (error) {
            console.log("Operation failed");
        }
    }
};

export const decompress = async (currentDir, args) => {
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
          await fs.promises.access(oldFileName, fs.promises.constants.F_OK);
          const src = fs.createReadStream(oldFileName);
          const dest = fs.createWriteStream(newFileName);
          const compressBrotli = zlib.createBrotliDecompress();
          await stream.promises.pipeline(src, compressBrotli, dest);
      } catch (error) {
          console.log("Operation failed");
      }
  }
};
