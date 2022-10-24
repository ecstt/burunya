import fs from "node:fs";

interface commandsInterface {
  [key: string]: Function;
}
var Commands: commandsInterface = {};
//type commandsKey = keyof typeof Function;

//LOAD COMMANDS INTO "Commands"
const commands = fs
  .readdirSync(__dirname)
  .filter((file) => !file.match("commands.ts"));
for (const file of commands) {
  const command = require(`./${file}`);
  for (var key in command) {
    Commands[key] = command[key];
  }
}

export default Commands;
