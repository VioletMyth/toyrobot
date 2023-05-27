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

  moveRobotForward(robot, table) {
    const robotPreviousX = robot.position.x;
    const robotPreviousY = robot.position.y;

    if (robot.direction === DIRECTION.EAST) {
      if (robot.position.x === table.width - 1) {
        return;
      }
      robot.position.x += 1;
    } else if (robot.direction === DIRECTION.WEST) {
      if (robot.position.x === 0) {
        return;
      }
      robot.position.x -= 1;
    } else if (robot.direction === DIRECTION.NORTH) {
      if (robot.position.y === table.height - 1) {
        return;
      }
      robot.position.y += 1;
    } else {
      if (robot.position.y === 0) {
        return;
      }
      robot.position.y -= 1;
    }
    table.layout[robotPreviousX][robotPreviousY] = null;
    table.layout[robot.position.x][robot.position.y] = robot;
  }
}

export default RobotNavigatorService;
