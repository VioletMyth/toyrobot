import CommandProcessor from "../CommandProcessor";
import { jest } from "@jest/globals";
import COMMAND from "../../enums/command.js";
import RobotNavigatorService from "../../services/RobotNavigatorService.js";
import DIRECTION from "../../enums/Direction";
import TableBoundaryService from "../../services/TableBoundaryService";
jest.spyOn(global.console, "log");

describe("CommandProcessor", () => {
  test("given LEFT command should invoke rotateRobot in robotNavigatorService", () => {
    const tableBoundaryService = new TableBoundaryService();
    const mockRobotNavigatorService = new RobotNavigatorService();
    mockRobotNavigatorService.rotateRobot = jest.fn();

    const commandProcessor = new CommandProcessor(
      mockRobotNavigatorService,
      tableBoundaryService
    );
    commandProcessor.process(COMMAND.PLACE, {
      x: 1,
      y: 1,
      direction: DIRECTION.NORTH,
    });
    commandProcessor.process(COMMAND.LEFT, null);
    expect(mockRobotNavigatorService.rotateRobot).toHaveBeenCalled();
  });

  test("given RIGHT command should invoke rotateRobot in robotNavigatorService", () => {
    const tableBoundaryService = new TableBoundaryService();
    const mockRobotNavigatorService = new RobotNavigatorService();
    mockRobotNavigatorService.rotateRobot = jest.fn();

    const commandProcessor = new CommandProcessor(
      mockRobotNavigatorService,
      tableBoundaryService
    );
    commandProcessor.process(COMMAND.PLACE, {
      x: 1,
      y: 1,
      direction: DIRECTION.NORTH,
    });
    commandProcessor.process(COMMAND.RIGHT, null);
    expect(mockRobotNavigatorService.rotateRobot).toHaveBeenCalled();
  });

  test("given MOVE command should invoke moveRobot in robotNavigatorService", () => {
    const tableBoundaryService = new TableBoundaryService();
    const mockRobotNavigatorService = new RobotNavigatorService();
    mockRobotNavigatorService.moveRobotForward = jest.fn();

    const commandProcessor = new CommandProcessor(
      mockRobotNavigatorService,
      tableBoundaryService
    );
    commandProcessor.process(COMMAND.PLACE, {
      x: 1,
      y: 1,
      direction: DIRECTION.NORTH,
    });
    commandProcessor.process(COMMAND.MOVE, null);
    expect(mockRobotNavigatorService.moveRobotForward).toHaveBeenCalled();
  });

  test("given REPORT command should console log", () => {
    const tableBoundaryService = new TableBoundaryService();
    const mockRobotNavigatorService = new RobotNavigatorService();

    const commandProcessor = new CommandProcessor(
      mockRobotNavigatorService,
      tableBoundaryService
    );
    commandProcessor.process(COMMAND.PLACE, {
      x: 1,
      y: 1,
      direction: DIRECTION.NORTH,
    });
    commandProcessor.process(COMMAND.REPORT, null);
    expect(console.log).toHaveBeenCalled();
  });

  test("given PLACE command should invoke placeRobot", () => {
    const tableBoundaryService = new TableBoundaryService();
    const mockRobotNavigatorService = new RobotNavigatorService();
    mockRobotNavigatorService.placeRobot = jest.fn();

    const commandProcessor = new CommandProcessor(
      mockRobotNavigatorService,
      tableBoundaryService
    );
    commandProcessor.process(COMMAND.PLACE, {
      x: 1,
      y: 1,
      direction: DIRECTION.EAST,
    });
    expect(mockRobotNavigatorService.placeRobot).toHaveBeenCalled();
  });

  test("should not process any other commands other than PLACE", () => {
    const tableBoundaryService = new TableBoundaryService();
    const mockRobotNavigatorService = new RobotNavigatorService();
    mockRobotNavigatorService.moveRobotForward = jest.fn();

    const commandProcessor = new CommandProcessor(
      mockRobotNavigatorService,
      tableBoundaryService
    );
    commandProcessor.process(COMMAND.MOVE, null);
    expect(mockRobotNavigatorService.moveRobotForward).not.toHaveBeenCalled();
  });

  test("should check if command arguments in bounds for PLACE command", () => {
    const tableBoundaryService = new TableBoundaryService();
    const robotNavigatorService = new RobotNavigatorService();
    tableBoundaryService.isCoordinatesInBounds = jest.fn();

    const commandProcessor = new CommandProcessor(
      robotNavigatorService,
      tableBoundaryService
    );

    commandProcessor.process(COMMAND.PLACE, {
      x: 1,
      y: 1,
      direction: DIRECTION.EAST,
    });
    expect(tableBoundaryService.isCoordinatesInBounds).toHaveBeenCalled();
  });
});
