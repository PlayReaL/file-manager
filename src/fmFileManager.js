export const getUserName = () => {
    const str = process.argv.slice(2).join("");

    if (str.startsWith("--username=")) {
        return str.slice(11);
    } else {
        return "Username";
    }
};

export const exitApp = (name) => {
    console.log(`\nThank you for using File Manager, ${name}, goodbye!`);
    process.exit();
};

export const printCurrentDirectory = (dir) => {
    console.log(`You are currently in ${dir}`);
};
