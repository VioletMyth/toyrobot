import RobotNavigatorService from "../src/robotNavigatorService";
import Robot from "../src/robot";
import Coordinate from "../src/Coordinate";
import Table from "../src/table";
import ROTATION from "../src/enums/rotation";
import DIRECTION from "../src/enums/directions";

describe("RobotNavigatorService", () => {
  test("given coordinate, robot and table should move robot to coordinate on table", () => {
    const testRobot = new Robot(new Coordinate(0, 0), DIRECTION.SOUTH);
    const testRobotNavigatorService = new RobotNavigatorService();
    const testTable = new Table(5, 5);
    const coordinate = new Coordinate(1, 1);
    testRobotNavigatorService.placeRobot(testRobot, testTable, coordinate);

    expect(testRobot.position.x).toBe(1);
    expect(testRobot.position.y).toBe(1);
    expect(testTable.layout[1][1]).toBe(testRobot);
  });

  test.each([
    { input: ROTATION.LEFT, expected: DIRECTION.WEST },
    { input: ROTATION.RIGHT, expected: DIRECTION.EAST },
  ])(
    "robot should point in $expected direction given $input",
    ({ input, expected }) => {
      const testRobot = new Robot(new Coordinate(0, 0), DIRECTION.NORTH);
      const testRobotNavigatorService = new RobotNavigatorService();
      testRobotNavigatorService.rotateRobot(testRobot, input);

      expect(testRobot.direction).toBe(expected);
    }
  );

  test("robot should move forward one square on table", () => {
    const testRobot = new Robot(new Coordinate(0, 0), DIRECTION.NORTH);
    const testTable = new Table(5, 5);
    const testRobotNavigatorService = new RobotNavigatorService();
    testRobotNavigatorService.moveRobotForward(testRobot, testTable);

    expect(testRobot.position.x).toBe(0);
    expect(testRobot.position.y).toBe(1);
    expect(testTable.layout[0][1]).toBe(testRobot);
  });

  test("robot should not move when on the edge of top", () => {
    const testRobot = new Robot(new Coordinate(0, 0), DIRECTION.SOUTH);
    const testTable = new Table(5, 5);
    testTable.layout[0][0] = testRobot;
    const testRobotNavigatorService = new RobotNavigatorService();
    testRobotNavigatorService.moveRobotForward(testRobot, testTable);

    expect(testRobot.position.x).toBe(0);
    expect(testRobot.position.y).toBe(0);
    expect(testRobot.direction).toBe(DIRECTION.SOUTH);
    expect(testTable.layout[0][0]).toBe(testRobot);
  });
});
