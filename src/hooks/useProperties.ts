
import { useState } from 'react';
import { Property } from '@/components/upload/models';
import { format, addMonths, subMonths, subYears, addYears } from 'date-fns';
import { toast } from '@/components/ui/use-toast';

// Sample UK cities
const ukCities = [
  'London', 'Manchester', 'Birmingham', 'Liverpool', 
  'Edinburgh', 'Glasgow', 'Cardiff', 'Bristol', 
  'Leeds', 'Sheffield', 'Newcastle', 'Belfast',
  'Oxford', 'Cambridge', 'York', 'Reading'
];

// Sample UK regions
const ukRegions = [
  'Greater London', 'North West', 'West Midlands', 
  'Scotland', 'Wales', 'South West', 
  'Yorkshire', 'North East', 'Northern Ireland',
  'East of England', 'South East', 'East Midlands'
];

// Sample UK postcodes
const generatePostcode = () => {
  const firstPart = ['SW1', 'NW1', 'W1', 'E1', 'N1', 'SE1', 'M1', 'B1', 'L1', 'EH1', 'G1', 'CF1'];
  const secondPart = ['1AA', '2BB', '3CC', '4DD', '5EE', '6FF', '7GG', '8HH', '9JJ'];
  return `${firstPart[Math.floor(Math.random() * firstPart.length)]} ${secondPart[Math.floor(Math.random() * secondPart.length)]}`;
};

// Portfolio names - UK property companies/funds
const portfolios = [
  'Land Securities Group', 'British Land', 'Segro', 
  'Derwent London', 'Great Portland Estates', 'Workspace Group',
  'Capital & Counties', 'Shaftesbury', 'Hammerson',
  'LXi REIT', 'Primary Health Properties', 'Big Yellow Group'
];

// Projects - named after UK areas/neighborhoods
const projects = [
  'Canary Wharf Development', 'Manchester Northern Quarter', 'Birmingham Jewellery Quarter',
  'Liverpool Docklands', 'Edinburgh Old Town', 'Glasgow Merchant City',
  'Cardiff Bay', 'Bristol Harbourside', 'Leeds City Centre',
  'Sheffield Cultural Industries', 'Newcastle Quayside', 'Belfast Titanic Quarter',
  'Oxford City Centre', 'Cambridge Science Park', 'York Historic Centre'
];

// Asset types
const assetTypes = [
  'Office', 'Retail', 'Industrial', 'Logistics', 
  'Multi-Family Residential', 'Mixed-Use', 'Student Accommodation',
  'Healthcare', 'Self-Storage', 'Hotel', 'Leisure'
];

// Names of property managers
const propertyManagers = [
  'Knight Frank', 'Savills', 'JLL', 'CBRE', 
  'Cushman & Wakefield', 'Colliers', 'Avison Young',
  'Gerald Eve', 'Allsop', 'GVA Grimley'
];

// Names of asset managers 
const assetManagers = [
  'James Williams', 'Sarah Thompson', 'Robert Davies', 'Emma Wilson',
  'Andrew Taylor', 'Olivia Brown', 'Michael Smith', 'Sophie Johnson',
  'Daniel Evans', 'Elizabeth Clark', 'Thomas Wright', 'Charlotte Hall'
];

// Generate realistic UK property addresses
const generateAddress = (city: string) => {
  const buildingNumbers = ['1', '5', '10', '15', '20', '25', '30', '35', '40', '45'];
  const streetNames = ['High Street', 'Church Street', 'Queen Street', 'King Street', 'Market Street', 
                      'Victoria Road', 'Station Road', 'London Road', 'Park Road', 'New Street',
                      'St. George\'s Way', 'Oxford Street', 'Regent Street', 'Baker Street', 'Piccadilly'];
  
  return `${buildingNumbers[Math.floor(Math.random() * buildingNumbers.length)]} ${streetNames[Math.floor(Math.random() * streetNames.length)]}`;
};

// Generate property names
const generatePropertyName = (assetType: string, streetName: string, city: string) => {
  const prefixes = ['The', '', 'New', 'City', 'Central', 'Royal', 'Imperial', 'Metropolitan', 'Sovereign', 'Apex'];
  const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
  
  if (prefix) {
    return `${prefix} ${assetType} ${streetName}, ${city}`;
  } else {
    return `${assetType} ${streetName}, ${city}`;
  }
};

// Generate realistic sample properties
const generateSampleProperties = (count: number): Property[] => {
  const properties: Property[] = [];
  
  for (let i = 1; i <= count; i++) {
    const city = ukCities[Math.floor(Math.random() * ukCities.length)];
    const region = ukRegions[Math.floor(Math.random() * ukRegions.length)];
    const assetType = assetTypes[Math.floor(Math.random() * assetTypes.length)];
    const streetName = generateAddress(city);
    const projectIndex = Math.floor(Math.random() * projects.length);
    const projectId = `proj-${projectIndex + 1}`;
    const projectName = projects[projectIndex];
    const portfolioName = portfolios[Math.floor(Math.random() * portfolios.length)];
    
    // Generate realistic metrics
    const units = Math.floor(Math.random() * 150) + 5;
    const occupancy = Math.random() * 25 + 75; // 75% to 100%
    const vacancy = 100 - occupancy;
    const sqft = Math.floor(Math.random() * 200000) + 10000;
    const parkingArea = Math.floor(Math.random() * 20000) + 2000;
    const tenantCount = Math.floor(units * occupancy / 100);
    const contractedRentPA = Math.floor(Math.random() * 5000000) + 500000;
    
    // Random dates within reasonable ranges
    const randomPastDate = () => {
      const daysAgo = Math.floor(Math.random() * 365 * 2);
      const date = new Date();
      date.setDate(date.getDate() - daysAgo);
      return format(date, 'yyyy-MM-dd');
    };
    
    const randomFutureDate = () => {
      const daysAhead = Math.floor(Math.random() * 365 * 2);
      const date = new Date();
      date.setDate(date.getDate() + daysAhead);
      return format(date, 'yyyy-MM-dd');
    };
    
    // WALT (Weighted Average Lease Term) - realistic values between 1-10 years
    const waltBreak = Math.random() * 5 + 1;
    const waltExpiry = waltBreak + Math.random() * 5;

    // Use either sqft or sqm as the area unit
    const areaUnit = Math.random() > 0.5 ? 'sqft' : 'sqm';
    
    properties.push({
      id: `property-${Math.random().toString(36).substring(2, 11)}`,
      name: generatePropertyName(assetType, streetName.split(' ')[1], city),
      streetNo: streetName.split(' ')[0],
      streetName: streetName.split(' ').slice(1).join(' '),
      city: city,
      state: region,
      country: 'United Kingdom',
      zip: generatePostcode(),
      units: units,
      sqft: areaUnit === 'sqft' ? sqft : Math.floor(sqft / 10.764),
      areaUnit: areaUnit,
      createdAt: randomPastDate(),
      assetType: assetType,
      projectId: projectId,
      projectName: projectName,
      portfolioName: portfolioName,
      latestRentRollDate: randomPastDate(),
      parkingArea: parkingArea,
      tenantCount: tenantCount,
      occupancy: occupancy,
      vacancy: vacancy,
      contractedRentPA: contractedRentPA,
      waltBreak: waltBreak,
      waltExpiry: waltExpiry,
      propertyManager: propertyManagers[Math.floor(Math.random() * propertyManagers.length)],
      assetManager: assetManagers[Math.floor(Math.random() * assetManagers.length)],
      region: region,
      acquisitionDate: format(subYears(new Date(), Math.floor(Math.random() * 5) + 1), 'yyyy-MM-dd'),
      saleDate: Math.random() > 0.8 ? format(addYears(new Date(), Math.floor(Math.random() * 3) + 1), 'yyyy-MM-dd') : undefined,
      underwritingStartDate: format(subMonths(new Date(), Math.floor(Math.random() * 24) + 3), 'yyyy-MM-dd')
    });
  }
  
  return properties;
};

// Mock properties for initial state
const MOCK_PROPERTIES: Property[] = generateSampleProperties(20);

export interface PropertyColumn {
  id: string;
  label: string;
  visible: boolean;
}

export function useProperties() {
  const [properties, setProperties] = useState<Property[]>(MOCK_PROPERTIES);
  
  // Define columns configuration
  const [columns, setColumns] = useState<PropertyColumn[]>([
    // Default visible columns
    { id: 'name', label: 'Property Name', visible: true },
    { id: 'projectName', label: 'Project Name', visible: true },
    { id: 'portfolioName', label: 'Portfolio Name', visible: true },
    { id: 'country', label: 'Country', visible: true },
    { id: 'city', label: 'City', visible: true },
    { id: 'assetType', label: 'Asset Class', visible: true },
    { id: 'latestRentRollDate', label: 'Latest Rent Roll Date', visible: true },
    { id: 'units', label: 'Unit Count', visible: true },
    { id: 'sqft', label: 'Area', visible: true },
    { id: 'parkingArea', label: 'Parking Area', visible: true },
    { id: 'tenantCount', label: 'Tenant Count', visible: true },
    { id: 'occupancy', label: 'Occupancy %', visible: true },
    { id: 'vacancy', label: 'Vacancy %', visible: true },
    { id: 'contractedRentPA', label: 'Contracted Rent PA', visible: true },
    
    // Additional columns (hidden by default)
    { id: 'waltBreak', label: 'WALT - Break', visible: false },
    { id: 'waltExpiry', label: 'WALT - Expiry', visible: false },
    { id: 'propertyManager', label: 'Property Manager', visible: false },
    { id: 'assetManager', label: 'Asset Manager', visible: false },
    { id: 'region', label: 'Property Region', visible: false },
    { id: 'acquisitionDate', label: 'Acquisition Date', visible: false },
    { id: 'saleDate', label: 'Sale Date', visible: false },
    { id: 'underwritingStartDate', label: 'Underwriting Start Date', visible: false }
  ]);

  const toggleColumnVisibility = (columnId: string) => {
    setColumns(prevColumns => 
      prevColumns.map(column => 
        column.id === columnId ? { ...column, visible: !column.visible } : column
      )
    );
  };
  
  const deleteProperty = (propertyId: string) => {
    setProperties(prevProperties => prevProperties.filter(property => property.id !== propertyId));
    
    toast({
      title: "Property Deleted",
      description: "The property has been removed.",
    });
  };
  
  return {
    properties,
    columns,
    toggleColumnVisibility,
    deleteProperty
  };
}
