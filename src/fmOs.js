import os from "node:os";

export const commandOs = (args) => {
  if (args.length !== 1) {
      process.stdout.write("Invalid input\n");
      return;
  }
  switch (args[0]) {
      case "--EOL":
          console.log(JSON.stringify(os.EOL));
          return;
      case "--cpus":
          const cpuData = os.cpus();
          console.log("Overall amount of CPUS", cpuData.length);
          console.table(cpuData);
          return;
      case "--homedir":
          console.log(os.homedir());
          return;
      case "--username":
          console.log(os.userInfo().username);
          return;
      case "--architecture":
          console.log(os.arch());
          return;
      default:
          process.stdout.write("Invalid input\n");
          return;
  }
};
