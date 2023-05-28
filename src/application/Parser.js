import DIRECTION from "../enums/Direction.js";
import COMMAND from "../enums/command.js";

class Parser {
  parseDirection(string) {
    const direction = DIRECTION[string];
    if (direction) {
      return direction;
    } else {
      throw new Error(`Invalid direction: ${string}`);
    }
  }

  parseCommandName(string) {
    const command = COMMAND[string];
    if (command) {
      return command;
    } else {
      throw new Error(`Invalid command: ${string}`);
    }
  }

  parseCommand(string) {
    const [commandName, commandArgs] = string.split(" ");

    return commandName === "PLACE"
      ? this.parsePlaceCommand(commandName, commandArgs)
      : [this.parseCommandName(commandName), null];
  }

  parsePlaceCommand(commandName, placeArgs) {
    if (!placeArgs) {
      throw new Error(
        'Invalid "place" command. Format should be "place x,y,f".'
      );
    }
    const [x, y, f] = placeArgs.split(",");
    if (!x || !y || !f) {
      throw new Error(
        'Invalid "place" command. Format should be "place x,y,f".'
      );
    }
    return [
      this.parseCommandName(commandName),
      { x: parseInt(x), y: parseInt(y), direction: this.parseDirection(f) },
    ];
  }
}

export default Parser;
