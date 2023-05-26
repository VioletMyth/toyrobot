import ROTATION from "./enums/rotation";
import DIRECTION from "./enums/directions";

class RobotNavigatorService {
  moveRobot(robot, table, coordinate) {
    robot.position.x = coordinate.x;
    robot.position.y = coordinate.y;
    table.layout[coordinate.x][coordinate.y] = robot;
  }

  rotateRobot(robot, rotationDirection) {
    const directions = [
      DIRECTION.NORTH,
      DIRECTION.EAST,
      DIRECTION.SOUTH,
      DIRECTION.WEST,
    ];

    const currentIndex = directions.indexOf(robot.direction);

    if (rotationDirection === ROTATION.RIGHT) {
      robot.direction = directions[(currentIndex + 1) % directions.length];
    } else if (rotationDirection === ROTATION.LEFT) {
      const newIndex =
        (currentIndex - 1 + directions.length) % directions.length;
      robot.direction = directions[newIndex];
    }
  }
}

export default RobotNavigatorService;
