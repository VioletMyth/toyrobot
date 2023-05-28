class Table {
  constructor(height, width) {
    this.layout = new Array(height)
      .fill(null)
      .map(() => new Array(width).fill(null));
    this.height = height;
    this.width = width;
  }
}

export default Table;
