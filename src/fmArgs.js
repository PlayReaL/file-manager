export const parseArgs = (str) => {
    const chars = str.split("");
    const res = [];
    let insideQuotes = false;

    let tmpStr = "";

    chars.forEach((ele) => {
        if (ele === '"') {
            if (insideQuotes && tmpStr.length > 0) {
                res.push(tmpStr);
                tmpStr = "";
            }
            insideQuotes = !insideQuotes;
        } else if (ele === " " && !insideQuotes) {
            if (tmpStr.length > 0) {
                res.push(tmpStr);
                tmpStr = "";
            }
        } else {
            tmpStr += ele;
        }
    });

    if (tmpStr.length > 0) {
        res.push(tmpStr);
    }

    if (insideQuotes) {
        return undefined;
    }
    return res;
};
