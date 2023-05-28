import Coordinate from "../models/Coordinate.js";
import Table from "../models/Table.js";
import Robot from "../models/Robot.js";

const HEIGHT = 5;
const WIDTH = 5;

class CommandProcessor {
  constructor(robotNavigatorService) {
    this.robot = null;
    this.table = null;
    this.firstPlaceCommandProcessed = false;
    this.robotNavigatorService = robotNavigatorService;
  }

  process(commandName, args) {
    if (commandName !== "PLACE" && !this.firstPlaceCommandProcessed) {
      return;
    }

    switch (commandName) {
      case "PLACE":
        this.firstPlaceCommandProcessed = true;

        // Handle the "place" command
        this.table = new Table(HEIGHT, WIDTH);
        const coordinate = new Coordinate(args.x, args.y);
        this.robot = new Robot(coordinate, args.direction);
        this.robotNavigatorService.placeRobot(
          this.robot,
          this.table,
          coordinate
        );
        break;

      case "LEFT":
        // Handle the "left" command
        this.robotNavigatorService.rotateRobot(this.robot, "LEFT");
        break;
      case "RIGHT":
        // Handle the "right" command
        this.robotNavigatorService.rotateRobot(this.robot, "RIGHT");
        break;
      case "MOVE":
        // Handle the "move" command
        this.robotNavigatorService.moveRobotForward(this.robot, this.table);
        break;
      case "REPORT":
        console.log(this.robot.position, this.robot.direction);
        // Handle the "report" command
        break;
      default:
        throw new Error("Invalid command.");
    }
  }
}

export default CommandProcessor;