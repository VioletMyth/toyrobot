import COMMAND from "../../enums/command.js";
import DIRECTION from "../../enums/Direction.js";
import Parser from "../Parser.js";

describe("Parser", () => {
  test("parseDirection", () => {
    const parser = new Parser();
    const direction = parser.parseDirection("NORTH");
    expect(direction).toBe(DIRECTION.NORTH);
  });

  test("given string return command enum", () => {
    const parser = new Parser();
    const command = parser.parseCommandName("PLACE");
    expect(command).toBe(COMMAND.PLACE);
  });

  test("given place command with raw arguments return place command enum with parsed arguments", () => {
    const parser = new Parser();
    const commandWithArgs = parser.parsePlaceCommand("PLACE", "1,1,NORTH");
    expect(commandWithArgs).toStrictEqual([
      COMMAND.PLACE,
      { x: 1, y: 1, direction: "NORTH" },
    ]);
  });

  test.each(["", "1", "1,1", "1,NORTH"])(
    "given place command with no arguments should throw error",
    (input) => {
      const parser = new Parser();
      expect(() => {
        parser.parsePlaceCommand("PLACE", input);
      }).toThrow();
    }
  );

  test.each([
    {
      command: "PLACE 1,1,SOUTH",
      expected: [COMMAND.PLACE, { x: 1, y: 1, direction: "SOUTH" }],
    },
    { command: "REPORT", expected: [COMMAND.REPORT, null] },
    { command: "LEFT", expected: [COMMAND.LEFT, null] },
  ])(
    "given raw $command command string return command enum with parsed arguments",
    ({ command, expected }) => {
      const parser = new Parser();
      const commandWithArgs = parser.parseCommand(command);
      expect(commandWithArgs).toStrictEqual(expected);
    }
  );
});
