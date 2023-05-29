import TableBoundaryService from "../../services/TableBoundaryService";
import Coordinate from "../../models/Coordinate";
import Table from "../../models/Table";

describe("TableBoundaryService", () => {
  test.each([
    { x: 4, y: 4 },
    { x: 1, y: 4 },
    { x: 4, y: 1 },
  ])("given coordinates outside of table boundary return false", ({ x, y }) => {
    const tableBoundaryService = new TableBoundaryService();
    const testTable = new Table(3, 3);
    const testCoordinate = new Coordinate(x, y);
    const result = tableBoundaryService.isCoordinatesInBounds(
      testCoordinate,
      testTable
    );
    expect(result).toBe(false);
  });
  test("given coordinates inside of table boundary return true", () => {
    const tableBoundaryService = new TableBoundaryService();
    const testTable = new Table(3, 3);
    const testCoordinate = new Coordinate(1, 1);
    const result = tableBoundaryService.isCoordinatesInBounds(
      testCoordinate,
      testTable
    );
    expect(result).toBe(true);
  });
});
