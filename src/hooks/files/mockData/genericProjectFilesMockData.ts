
import { UploadedFile } from '../types';

// Common file and document names that can be used for any project
const FILE_NAMES = [
  'Rent Roll.xlsx',
  'Financial Statement.xlsx',
  'Budget Report.xlsx',
  'Lease Agreement.pdf',
  'Property Analysis.pdf',
  'Market Study.pdf',
  'Valuation Report.pdf',
  'Due Diligence Summary.pdf',
  'Capital Expenditure Plan.xlsx',
  'Income Statement.xlsx'
];

// Common document types
const DOCUMENT_TYPES: Array<'rent_roll' | 'operating_statement' | 'budget' | 'other'> = [
  'rent_roll',
  'operating_statement',
  'budget',
  'other'
];

// Common uploader names
const UPLOADER_NAMES = [
  'John Smith',
  'Sarah Johnson',
  'Michael Brown',
  'Emma Davis',
  'David Wilson',
  'Lisa Martinez'
];

// Generate generic files that can be assigned to any project
export const generateGenericFiles = (count: number): UploadedFile[] => {
  const files: UploadedFile[] = [];
  
  for (let i = 0; i < count; i++) {
    const isExcel = Math.random() > 0.5;
    const randomFileName = FILE_NAMES[Math.floor(Math.random() * FILE_NAMES.length)];
    const randomUploader = UPLOADER_NAMES[Math.floor(Math.random() * UPLOADER_NAMES.length)];
    const randomDocType = DOCUMENT_TYPES[Math.floor(Math.random() * DOCUMENT_TYPES.length)];
    const randomDate = new Date(Date.now() - Math.floor(Math.random() * 31536000000)).toISOString(); // Within last year
    
    const file: UploadedFile = {
      id: `generic-file-${i}`,
      name: randomFileName,
      fileType: isExcel ? 'excel' : 'pdf',
      uploadDate: randomDate,
      uploader: {
        id: `user-${i % 6 + 1}`,
        name: randomUploader,
      },
      size: Math.floor(Math.random() * 5000000) + 500000, // Random size between 500KB and 5MB
      documents: Math.random() > 0.3 ? [ // 70% chance to have a document
        {
          id: `generic-doc-${i}`,
          name: randomFileName.replace('.xlsx', '').replace('.pdf', ''),
          type: randomDocType,
          createdAt: randomDate,
          updatedAt: new Date(Date.now() - Math.floor(Math.random() * 15768000000)).toISOString(), // Within last 6 months
          creator: {
            id: `user-${i % 6 + 1}`,
            name: randomUploader,
          },
          lastUpdatedBy: {
            id: `user-${i % 6 + 1}`,
            name: randomUploader,
          },
          status: Math.random() > 0.2 ? 'complete' : 'draft',
        }
      ] : [],
      status: Math.random() > 0.2 ? 'complete' : 'draft',
    };
    
    files.push(file);
  }
  
  return files;
};

// Generate 20 generic files
export const GENERIC_PROJECT_FILES = generateGenericFiles(20);
