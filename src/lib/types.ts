
export type LeaseStatus = 'lead' | 'negotiation' | 'contract' | 'closed';

export interface Lease {
  id: string;
  portfolioId: string;
  unitNumber: string;
  tenant: string;
  contactName?: string;
  contactPhone?: string;
  contactEmail?: string;
  area: number;
  areaUnit: 'sqm' | 'sqft';
  annualRent: number;
  startDate: string;
  expiryDate: string;
  status: LeaseStatus;
  notes?: string;
}

// Operating Statement Types
export type MappingMethod = 'machine_learning' | 'previous_documents';

export interface AccountMapping {
  originalName: string;
  mappedName: string;
  category: 'Income' | 'Expense' | 'Other';
}

export interface PeriodValue {
  period: string; // e.g., "01/22", "02/22"
  value: number;
}

export interface StatementAccount {
  originalAccountName: string;
  accountName: string;
  category: 'Income' | 'Expense' | 'Other';
  values: PeriodValue[];
}

export interface StatementSection {
  title: string;
  accounts: StatementAccount[];
  sectionTotals: PeriodValue[];
}

export interface OperatingStatement {
  id: string;
  projectId: string;
  projectName: string;
  fileName: string;
  uploadDate: string;
  propertyName: string;
  statementType: 'operating_statement';
  mappingMethod: MappingMethod;
  sections: StatementSection[];
  periods: string[]; // e.g., ["01/22", "02/22", ...]
  netIncomeTotals: PeriodValue[];
}
