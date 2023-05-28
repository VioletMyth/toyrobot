import DIRECTION from "./enums/Direction.js";

class Parser {
  parseDirection(string) {
    const direction = DIRECTION[string];
    if (direction) {
      return direction;
    } else {
      throw new Error(`Invalid direction: ${string}`);
    }
  }
}

export default Parser;
