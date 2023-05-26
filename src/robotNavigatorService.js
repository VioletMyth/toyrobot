import ROTATION from "./enums/rotation";
import DIRECTION from "./enums/directions";

class RobotNavigatorService {
  moveRobot(robot, table, coordinate) {
    robot.position.x = coordinate.x;
    robot.position.y = coordinate.y;
    table.layout[coordinate.x][coordinate.y] = robot;
  }
}

export default RobotNavigatorService;
