import Coordinate from "../models/Coordinate.js";
import Table from "../models/Table.js";
import Robot from "../models/Robot.js";
import COMMAND from "../enums/command.js";
import ROTATION from "../enums/rotation.js";

const HEIGHT = 5;
const WIDTH = 5;

class CommandProcessor {
  constructor(robotNavigatorService, tableBoundaryService) {
    this.robot = null;
    this.table = null;
    this.firstPlaceCommandProcessed = false;
    this.robotNavigatorService = robotNavigatorService;
    this.tableBoundaryService = tableBoundaryService;
  }

  process(commandName, args) {
    if (commandName !== COMMAND.PLACE && !this.firstPlaceCommandProcessed) {
      return;
    }

    switch (commandName) {
      case COMMAND.PLACE:
        this.table = new Table(HEIGHT, WIDTH);
        const coordinate = new Coordinate(args.x, args.y);
        if (
          !this.tableBoundaryService.isCoordinatesInBounds(
            coordinate,
            this.table
          )
        ) {
          return;
        }
        this.robot = new Robot(coordinate, args.direction);
        this.robotNavigatorService.placeRobot(
          this.robot,
          this.table,
          coordinate
        );
        this.firstPlaceCommandProcessed = true;
        break;

      case COMMAND.LEFT:
        this.robotNavigatorService.rotateRobot(this.robot, ROTATION.LEFT);
        break;
      case COMMAND.RIGHT:
        this.robotNavigatorService.rotateRobot(this.robot, ROTATION.RIGHT);
        break;
      case COMMAND.MOVE:
        this.robotNavigatorService.moveRobotForward(this.robot, this.table);
        break;
      case COMMAND.REPORT:
        console.log(
          "%s,%s,%s",
          this.robot.position.x,
          this.robot.position.y,
          this.robot.direction
        );
        break;
      default:
        throw new Error("Invalid command.");
    }
  }
}

export default CommandProcessor;
