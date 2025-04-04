
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
  'Income Statement.xlsx',
  'Operating Expenses.pdf',
  'Tenant Directory.xlsx',
  'Property Tax Statement.pdf',
  'Maintenance Reports.xlsx',
  'Property Insurance Policy.pdf',
  'Environmental Assessment.pdf',
  'Management Agreement.pdf',
  'Building Permits.pdf'
];

// Document types with proper labeling
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
    const isExcel = Math.random() > 0.5;
    const randomFileName = FILE_NAMES[Math.floor(Math.random() * FILE_NAMES.length)];
    const randomUploader = UPLOADER_NAMES[Math.floor(Math.random() * UPLOADER_NAMES.length)];
    
    // Choose document type based on filename for more realistic matching
    let randomDocType: 'rent_roll' | 'operating_statement' | 'budget' | 'other';
    if (randomFileName.toLowerCase().includes('rent') || randomFileName.toLowerCase().includes('tenant')) {
      randomDocType = 'rent_roll';
    } else if (randomFileName.toLowerCase().includes('financial') || 
              randomFileName.toLowerCase().includes('income') || 
              randomFileName.toLowerCase().includes('operating')) {
      randomDocType = 'operating_statement';
    } else if (randomFileName.toLowerCase().includes('budget')) {
      randomDocType = 'budget';
    } else {
      randomDocType = 'other';
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
          type: randomDocType,
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

// Generate 30 generic files (increased from 20)
export const GENERIC_PROJECT_FILES = generateGenericFiles(30);
