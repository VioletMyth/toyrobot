import ROTATION from "./enums/rotation.js";
import DIRECTION from "./enums/Direction.js";

class RobotNavigatorService {
  placeRobot(robot, table, coordinate) {
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

    if (this.isRobotFacingEdgeOfTable(robot, table)) {
      return;
    }

    if (robot.direction === DIRECTION.EAST) {
      robot.position.x += 1;
    } else if (robot.direction === DIRECTION.WEST) {
      robot.position.x -= 1;
    } else if (robot.direction === DIRECTION.NORTH) {
      robot.position.y += 1;
    } else {
      robot.position.y -= 1;
    }
    table.layout[robotPreviousX][robotPreviousY] = null;
    table.layout[robot.position.x][robot.position.y] = robot;
  }

  isRobotFacingEdgeOfTable(robot, table) {
    switch (robot.direction) {
      case DIRECTION.EAST:
        return robot.position.x === table.width - 1;
      case DIRECTION.WEST:
        return robot.position.x === 0;
      case DIRECTION.NORTH:
        return robot.position.y === table.height - 1;
      case DIRECTION.SOUTH:
        return robot.position.y === 0;
    }
  }
}

export default RobotNavigatorService;
