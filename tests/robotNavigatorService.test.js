import RobotNavigatorService from "../src/robotNavigatorService";
import Robot from "../src/robot";
import Coordinate from "../src/Coordinate";
import Table from "../src/table";
import ROTATION from "../src/enums/rotation";
import DIRECTION from "../src/enums/directions";

describe("RobotNavigatorService", () => {
  test("given coordinate, robot and table should move robot to coordinate on table", () => {
    const testRobot = new Robot();
    const testRobotNavigatorService = new RobotNavigatorService();
    const testTable = new Table(5, 5);
    const coordinate = new Coordinate(1, 1);
    testRobotNavigatorService.moveRobot(testRobot, testTable, coordinate);

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
});
