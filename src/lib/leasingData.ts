
import { Lease, LeaseStatus } from './types';

// Sample lease data
const leaseData: Lease[] = [
  // Portfolio 1: Downtown Office Tower
  {
    id: '1-1',
    portfolioId: '1',
    unitNumber: 'Suite 101',
    tenant: 'Apex Consulting',
    contactName: 'Sarah Johnson',
    contactPhone: '(555) 123-4567',
    contactEmail: 'sjohnson@apexconsulting.com',
    area: 2500,
    areaUnit: 'sqft',
    annualRent: 112500,
    startDate: '2020-05-01',
    expiryDate: '2023-04-30',
    status: 'lead',
    notes: 'Tenant has expressed interest in renewing but wants to renegotiate terms. Initial discussion scheduled for next week.'
  },
  {
    id: '1-2',
    portfolioId: '1',
    unitNumber: 'Suite 205',
    tenant: 'Fusion Technologies',
    contactName: 'Michael Lee',
    contactPhone: '(555) 987-6543',
    contactEmail: 'mlee@fusiontech.com',
    area: 3800,
    areaUnit: 'sqft',
    annualRent: 171000,
    startDate: '2021-01-15',
    expiryDate: '2023-07-14',
    status: 'negotiation',
    notes: 'Engaged in active negotiations. Tenant requesting 10% reduction in rent but willing to extend lease term to 5 years.'
  },
  {
    id: '1-3',
    portfolioId: '1',
    unitNumber: 'Suite 310',
    tenant: 'Global Partners LLC',
    contactName: 'David Rodriguez',
    contactPhone: '(555) 234-5678',
    contactEmail: 'drodriguez@globalpartners.com',
    area: 5200,
    areaUnit: 'sqft',
    annualRent: 234000,
    startDate: '2019-08-01',
    expiryDate: '2024-01-31',
    status: 'contract',
    notes: 'Contract drafted and sent for review. Expecting signed agreement by end of month.'
  },
  {
    id: '1-4',
    portfolioId: '1',
    unitNumber: 'Suite 420',
    tenant: 'Innovative Designs',
    contactName: 'Emily Chen',
    contactPhone: '(555) 876-5432',
    contactEmail: 'echen@innovativedesigns.com',
    area: 4100,
    areaUnit: 'sqft',
    annualRent: 184500,
    startDate: '2020-11-01',
    expiryDate: '2023-10-31',
    status: 'lead',
    notes: 'Tenant considering downsizing. Initial discussions about alternative spaces within the building.'
  },
  
  // Portfolio 2: Riverside Retail Complex
  {
    id: '2-1',
    portfolioId: '2',
    unitNumber: 'Store 12A',
    tenant: 'Urban Outfitters',
    contactName: 'James Wilson',
    contactPhone: '(555) 345-6789',
    contactEmail: 'jwilson@urbanoutfitters.com',
    area: 2200,
    areaUnit: 'sqm',
    annualRent: 396000,
    startDate: '2019-03-15',
    expiryDate: '2024-03-14',
    status: 'negotiation',
    notes: 'Tenant performing well and interested in extending lease. Negotiations for improved terms in progress.'
  },
  {
    id: '2-2',
    portfolioId: '2',
    unitNumber: 'Store 15B',
    tenant: 'Gourmet Delights',
    contactName: 'Sofia Martinez',
    contactPhone: '(555) 456-7890',
    contactEmail: 'smartinez@gourmetdelights.com',
    area: 1800,
    areaUnit: 'sqm',
    annualRent: 324000,
    startDate: '2021-05-01',
    expiryDate: '2023-05-31',
    status: 'closed',
    notes: 'Lease renewal confirmed with 3% increase in rent. New 5-year term starting June 2023.'
  },
  {
    id: '2-3',
    portfolioId: '2',
    unitNumber: 'Store 20C',
    tenant: 'Fitness First',
    contactName: 'Robert Taylor',
    contactPhone: '(555) 567-8901',
    contactEmail: 'rtaylor@fitnessfirst.com',
    area: 3500,
    areaUnit: 'sqm',
    annualRent: 630000,
    startDate: '2020-08-15',
    expiryDate: '2023-08-14',
    status: 'lead',
    notes: 'Tenant facing financial challenges. Need to discuss potential rent relief options or find replacement tenant.'
  },
  
  // Portfolio 3: Tech Park Campus
  {
    id: '3-1',
    portfolioId: '3',
    unitNumber: 'Building A, Floor 2',
    tenant: 'NextGen Software',
    contactName: 'Daniel Kim',
    contactPhone: '(555) 678-9012',
    contactEmail: 'dkim@nextgensoft.com',
    area: 8500,
    areaUnit: 'sqft',
    annualRent: 935000,
    startDate: '2019-10-01',
    expiryDate: '2024-09-30',
    status: 'contract',
    notes: 'Tenant expanding operations. New lease agreement includes additional space on Floor 3.'
  },
  {
    id: '3-2',
    portfolioId: '3',
    unitNumber: 'Building B, Floor 1',
    tenant: 'CloudSphere Inc.',
    contactName: 'Rebecca Nelson',
    contactPhone: '(555) 789-0123',
    contactEmail: 'rnelson@cloudsphere.com',
    area: 12000,
    areaUnit: 'sqft',
    annualRent: 1320000,
    startDate: '2020-01-15',
    expiryDate: '2023-01-14',
    status: 'lead',
    notes: 'Tenant has been acquired by larger company. Need to discuss lease assignment or new terms with acquiring entity.'
  },
  {
    id: '3-3',
    portfolioId: '3',
    unitNumber: 'Building C, Floor 3',
    tenant: 'DataViz Analytics',
    contactName: 'Alicia Wong',
    contactPhone: '(555) 890-1234',
    contactEmail: 'awong@dataviz.com',
    area: 7800,
    areaUnit: 'sqft',
    annualRent: 858000,
    startDate: '2021-03-01',
    expiryDate: '2024-02-29',
    status: 'negotiation',
    notes: 'Tenant requiring upgrades to HVAC system as part of lease renewal. Evaluating cost-benefit analysis.'
  },
  
  // Portfolio 4: Harbor View Apartments
  {
    id: '4-1',
    portfolioId: '4',
    unitNumber: 'Retail Unit A',
    tenant: 'Harbor Café',
    contactName: 'Thomas Brown',
    contactPhone: '(555) 901-2345',
    contactEmail: 'tbrown@harborcafe.com',
    area: 1500,
    areaUnit: 'sqm',
    annualRent: 270000,
    startDate: '2020-04-01',
    expiryDate: '2023-03-31',
    status: 'negotiation',
    notes: 'Popular tenant with consistent performance. Negotiations focused on extending term with modest rent increase.'
  },
  {
    id: '4-2',
    portfolioId: '4',
    unitNumber: 'Retail Unit C',
    tenant: 'Marine Supplies Shop',
    contactName: 'Grace Phillips',
    contactPhone: '(555) 012-3456',
    contactEmail: 'gphillips@marinesupplies.com',
    area: 1800,
    areaUnit: 'sqm',
    annualRent: 324000,
    startDate: '2019-06-15',
    expiryDate: '2024-06-14',
    status: 'closed',
    notes: 'Lease extension confirmed for another 3 years with 5% rent increase.'
  },
  
  // Portfolio 5: Central Business District
  {
    id: '5-1',
    portfolioId: '5',
    unitNumber: 'Floor 10, Suite A',
    tenant: 'Parker & Associates Law Firm',
    contactName: 'William Parker',
    contactPhone: '(555) 123-4567',
    contactEmail: 'wparker@parkerassociates.com',
    area: 5800,
    areaUnit: 'sqft',
    annualRent: 754000,
    startDate: '2019-09-01',
    expiryDate: '2024-08-31',
    status: 'contract',
    notes: 'Long-term tenant. New lease includes option for additional expansion space in Year 2.'
  },
  {
    id: '5-2',
    portfolioId: '5',
    unitNumber: 'Floor 12, Suite B',
    tenant: 'Meridian Financial Services',
    contactName: 'Jennifer Adams',
    contactPhone: '(555) 234-5678',
    contactEmail: 'jadams@meridianfinancial.com',
    area: 7200,
    areaUnit: 'sqft',
    annualRent: 936000,
    startDate: '2020-07-15',
    expiryDate: '2023-07-14',
    status: 'lead',
    notes: 'Tenant expressing interest in moving to a different floor with better views. Exploring options within the building.'
  },
  {
    id: '5-3',
    portfolioId: '5',
    unitNumber: 'Floor 15, Suite A',
    tenant: 'Global Investments Ltd',
    contactName: 'Jonathan Hughes',
    contactPhone: '(555) 345-6789',
    contactEmail: 'jhughes@globalinvestments.com',
    area: 8500,
    areaUnit: 'sqft',
    annualRent: 1105000,
    startDate: '2021-02-01',
    expiryDate: '2024-01-31',
    status: 'negotiation',
    notes: 'Tenant seeking to consolidate operations from multiple locations. Discussing expanded space requirements.'
  },
  
  // Portfolio 6: Suburban Office Park
  {
    id: '6-1',
    portfolioId: '6',
    unitNumber: 'Building 2, Suite 101',
    tenant: 'Green Energy Solutions',
    contactName: 'Laura Clark',
    contactPhone: '(555) 456-7890',
    contactEmail: 'lclark@greenenergy.com',
    area: 3200,
    areaUnit: 'sqm',
    annualRent: 384000,
    startDate: '2020-03-15',
    expiryDate: '2023-03-14',
    status: 'lead',
    notes: 'Tenant planning expansion. Initial discussions about larger space within the office park.'
  },
  {
    id: '6-2',
    portfolioId: '6',
    unitNumber: 'Building 3, Suite 205',
    tenant: 'Innovative Healthcare',
    contactName: 'Mark Stevens',
    contactPhone: '(555) 567-8901',
    contactEmail: 'mstevens@innovativehealthcare.com',
    area: 2800,
    areaUnit: 'sqm',
    annualRent: 336000,
    startDate: '2019-11-01',
    expiryDate: '2024-10-31',
    status: 'closed',
    notes: 'Lease renewal confirmed with tenant improvements allowance of $150k and 4% rent increase.'
  },
];

// Get leases for a specific portfolio
export const getLeasesForPortfolio = (portfolioId: string): Lease[] => {
  return leaseData.filter(lease => lease.portfolioId === portfolioId);
};

// Update lease status
export const updateLeaseStatus = (leaseId: string, status: LeaseStatus): Lease | null => {
  const leaseIndex = leaseData.findIndex(lease => lease.id === leaseId);
  
  if (leaseIndex === -1) {
    return null;
  }
  
  // Create a copy of the lease and update its status
  const updatedLease = {
    ...leaseData[leaseIndex],
    status
  };
  
  // Update the lease in the array
  leaseData[leaseIndex] = updatedLease;
  
  return updatedLease;
};
