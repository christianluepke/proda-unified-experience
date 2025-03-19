
export interface TableOption {
  id: string;
  name: string;
  sheetName: string;
  rowCount: number;
  columnCount: number;
  tableType: 'rent_roll' | 'property' | 'unknown';
  confidence: number;
}

export interface TableBounds {
  startRow: number;
  endRow: number;
  startCol: number;
  endCol: number;
}
