import DIRECTION from "../src/enums/Direction.js";
import Parser from "../src/Parser.js";

describe("Parser", () => {
  test("parseDirection", () => {
    const parser = new Parser();
    const direction = parser.parseDirection("NORTH");
    expect(direction).toBe(DIRECTION.NORTH);
  });
});
