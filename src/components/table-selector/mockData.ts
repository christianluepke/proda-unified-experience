
import { TableOption } from './types';

export const fileName = "Property_RentRoll_2023_Q4.xlsx";

export const mockTables: TableOption[] = [
  { 
    id: 'table1', 
    name: 'Main Rent Roll', 
    sheetName: 'Rent Roll', 
    rowCount: 42, 
    columnCount: 12, 
    tableType: 'rent_roll',
    confidence: 92
  },
  { 
    id: 'table2', 
    name: 'Property Summary', 
    sheetName: 'Summary', 
    rowCount: 15, 
    columnCount: 6, 
    tableType: 'property',
    confidence: 78
  },
  { 
    id: 'table3', 
    name: 'Tenant List', 
    sheetName: 'Tenants', 
    rowCount: 55, 
    columnCount: 8, 
    tableType: 'rent_roll',
    confidence: 88
  }
];

// Mock rent roll data
export const mockRentRollData = [
  ["Unit", "Tenant", "Area (SQM)", "Term (Years)", "Start Date", "End Date", "Annual Rent"],
  ["101", "ABC Corp", "150", "5", "01/01/2020", "12/31/2024", "$45,000"],
  ["102", "XYZ Ltd", "200", "3", "03/15/2021", "03/14/2024", "$60,000"],
  ["103", "123 Company", "175", "7", "06/01/2019", "05/31/2026", "$52,500"],
  ["104", "Tech Solutions", "300", "10", "01/01/2018", "12/31/2027", "$90,000"],
  ["105", "Retail Store", "250", "5", "04/01/2022", "03/31/2027", "$75,000"],
  ["201", "Law Firm LLP", "350", "8", "07/15/2020", "07/14/2028", "$105,000"],
  ["202", "Consulting Group", "225", "4", "10/01/2021", "09/30/2025", "$67,500"],
  ["203", "Medical Practice", "275", "6", "01/01/2023", "12/31/2028", "$82,500"],
  ["204", "Restaurant Inc", "400", "10", "05/01/2019", "04/30/2029", "$120,000"],
  ["205", "Insurance Agency", "180", "3", "09/01/2022", "08/31/2025", "$54,000"],
  ["301", "Marketing Firm", "220", "5", "03/01/2021", "02/28/2026", "$66,000"]
];
