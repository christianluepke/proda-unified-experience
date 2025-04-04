
import { UploadedFile } from './types';
import { PROPERTY_FILES } from './mockData/propertyMockData';
import { FINANCIAL_FILES } from './mockData/financialMockData';
import { PORTFOLIO_FILES } from './mockData/portfolioMockData';
import { RENT_ROLL_FILES } from './mockData/rentRollMockData';
import { MULTI_PROPERTY_FILES } from './mockData/multiPropertyMockData';
import { PROJECT_FILES_MOCK_DATA } from './mockData/projectFilesMockData';

// Combine all mock data
export const MOCK_FILES: UploadedFile[] = [
  ...FINANCIAL_FILES,
  ...RENT_ROLL_FILES,
  ...PROPERTY_FILES,
  ...PORTFOLIO_FILES,
  ...MULTI_PROPERTY_FILES,
  ...PROJECT_FILES_MOCK_DATA,
];
