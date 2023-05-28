import readlineSync from "readline-sync";
import Parser from "./application/Parser.js";
import CommandProcessor from "./application/CommandProcessor.js";
import RobotNavigatorService from "./services/RobotNavigatorService.js";
import fs from "fs";
import readline from "readline";

const robotNavigatorService = new RobotNavigatorService();
const commandProcessor = new CommandProcessor(robotNavigatorService);
const parser = new Parser();

function start() {
  if (process.argv.length < 3) {
    startWithConsole();
  }
  startWithFile();
}

function startWithConsole() {
  while (true) {
    const rawCommand = readlineSync.question();
    const [commandName, commandArgs] = parser.parseCommand(rawCommand);
    commandProcessor.process(commandName, commandArgs);
  }
}

async function startWithFile() {
  const filePath = process.argv[2];
  const fileStream = fs.createReadStream(filePath);

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });

  for await (const line of rl) {
    const [commandName, commandArgs] = parser.parseCommand(line);
    commandProcessor.process(commandName, commandArgs);
  }
}

start();
