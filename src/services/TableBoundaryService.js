class TableBoundaryService {
  isCoordinatesInBounds(coordinate, table) {
    return (
      coordinate.x > -1 &&
      coordinate.x < table.width &&
      coordinate.y > -1 &&
      coordinate.y < table.height
    );
  }
}

export default TableBoundaryService;
