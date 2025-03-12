
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
