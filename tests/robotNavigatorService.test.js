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
});
