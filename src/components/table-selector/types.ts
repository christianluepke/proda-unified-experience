
export interface TableOption {
  id: string;
  name: string;
  sheetName: string;
  rowCount: number;
  columnCount: number;
  tableType: 'rent_roll' | 'property' | 'operating_statement' | 'unknown';
  confidence: number;
  database?: string;
}

export interface TableBounds {
  startRow: number;
  endRow: number;
  startCol: number;
  endCol: number;
}

export interface TableProperties {
  id: string;
  name: string;
  assetType?: string;
  address?: string;
  units?: number;
  sqft?: number;
}
