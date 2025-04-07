
import { UploadedFile } from '../types';

// Common rent roll file names
const RENT_ROLL_FILE_NAMES = [
  'Rent Roll.xlsx',
  'Property Rent Roll.xlsx',
  'Quarterly Rent Roll.xlsx', 
  'Annual Rent Roll 2023.xlsx',
  'Rent Roll Q1.xlsx',
  'Rent Roll Q2.xlsx',
  'Rent Roll Q3.xlsx',
  'Rent Roll Q4.xlsx',
  'Tenant Rent Roll.xlsx'
];

// Common operating statement file names
const OPERATING_STATEMENT_FILE_NAMES = [
  'Operating Statement.xlsx',
  'Financial Statement.xlsx',
  'Operating Statement Q1.pdf',
  'Operating Statement Q2.pdf',
  'Operating Statement Q3.pdf',
  'Operating Statement Q4.pdf',
  'Annual Operating Statement.pdf',
  'Income Statement.xlsx',
  'Operating Expenses.pdf'
];

// Common uploader names
const UPLOADER_NAMES = [
  'John Smith',
  'Sarah Johnson',
  'Michael Brown',
  'Emma Davis',
  'David Wilson',
  'Lisa Martinez',
  'Robert Taylor',
  'Jennifer Garcia',
  'William Anderson',
  'Elizabeth Thomas'
];

// Generate generic files that can be assigned to any project
export const generateGenericFiles = (count: number): UploadedFile[] => {
  const files: UploadedFile[] = [];
  
  for (let i = 0; i < count; i++) {
    const isRentRoll = Math.random() > 0.5;
    const isExcel = Math.random() > 0.3;
    
    // Choose file name based on type
    const fileNames = isRentRoll ? RENT_ROLL_FILE_NAMES : OPERATING_STATEMENT_FILE_NAMES;
    const randomFileName = fileNames[Math.floor(Math.random() * fileNames.length)];
    const randomUploader = UPLOADER_NAMES[Math.floor(Math.random() * UPLOADER_NAMES.length)];
    
    // Set document type based on file name
    let documentType: 'rent_roll' | 'operating_statement';
    if (isRentRoll) {
      documentType = 'rent_roll';
    } else {
      documentType = 'operating_statement';
    }
    
    const randomDate = new Date(Date.now() - Math.floor(Math.random() * 31536000000)).toISOString(); // Within last year
    
    const file: UploadedFile = {
      id: `generic-file-${i}`,
      name: randomFileName,
      fileType: isExcel ? 'excel' : 'pdf',
      uploadDate: randomDate,
      uploader: {
        id: `user-${i % 10 + 1}`,
        name: randomUploader,
      },
      size: Math.floor(Math.random() * 5000000) + 500000, // Random size between 500KB and 5MB
      documents: [ // Always include a document for each file
        {
          id: `generic-doc-${i}`,
          name: randomFileName.replace('.xlsx', '').replace('.pdf', ''),
          type: documentType,
          createdAt: randomDate,
          updatedAt: new Date(Date.now() - Math.floor(Math.random() * 15768000000)).toISOString(), // Within last 6 months
          creator: {
            id: `user-${i % 10 + 1}`,
            name: randomUploader,
          },
          lastUpdatedBy: {
            id: `user-${i % 10 + 1}`,
            name: randomUploader,
          },
          status: Math.random() > 0.2 ? 'complete' : 'draft',
          property: Math.random() > 0.5 ? {
            id: `property-${i % 5}`,
            name: `Property ${i % 5 + 1}`
          } : undefined
        }
      ],
      status: Math.random() > 0.2 ? 'complete' : 'draft',
    };
    
    files.push(file);
  }
  
  return files;
};

// Generate 30 generic files
export const GENERIC_PROJECT_FILES = generateGenericFiles(30);
