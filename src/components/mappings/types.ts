
export interface ColumnMapping {
  originalIndex: number;
  originalName: string;
  standardField: StandardField | null;
}

export interface RowSelection {
  rowIndex: number;
  isSelected: boolean;
  isAutoExcluded: boolean;
  reason?: string; // e.g., "Total", "Sub-Total", "Blank"
}

export type StandardField = 
  | "unit_id" 
  | "unit_name" 
  | "tenant_name"
  | "lease_id" 
  | "lease_start" 
  | "lease_end"
  | "contracted_rent" 
  | "passing_rent"
  | "area_sqft"
  | "vacant"
  | "unit_type"
  | null;

export const STANDARD_FIELD_LABELS: Record<StandardField, string> = {
  unit_id: "Unit ID",
  unit_name: "Unit Name",
  tenant_name: "Tenant Name",
  lease_id: "Lease ID",
  lease_start: "Lease Start Date",
  lease_end: "Lease End Date",
  contracted_rent: "Contracted Rent",
  passing_rent: "Passing Rent",
  area_sqft: "Area (sq ft)",
  vacant: "Vacant",
  unit_type: "Unit Type",
  null: "Not Mapped"
};

// Common headers that might match our standard fields
export const COMMON_HEADER_MAPPINGS: Record<string, StandardField> = {
  // Unit ID variations
  'unit id': 'unit_id',
  'unitid': 'unit_id',
  'unit number': 'unit_id',
  'unit #': 'unit_id',
  'unit': 'unit_id',
  'id': 'unit_id',

  // Unit Name variations
  'unit name': 'unit_name',
  'unitname': 'unit_name',
  'space': 'unit_name',
  'space name': 'unit_name',

  // Tenant variations
  'tenant': 'tenant_name',
  'tenant name': 'tenant_name',
  'occupant': 'tenant_name',
  'occupier': 'tenant_name',
  'company': 'tenant_name',
  'customer': 'tenant_name',
  'lessee': 'tenant_name',

  // Lease ID variations
  'lease id': 'lease_id',
  'leaseid': 'lease_id',
  'lease number': 'lease_id',
  'lease #': 'lease_id',
  'lease': 'lease_id',

  // Lease Start Date variations
  'lease start': 'lease_start',
  'start date': 'lease_start',
  'commence': 'lease_start',
  'commencement': 'lease_start',
  'lease commencement': 'lease_start',

  // Lease End Date variations
  'lease end': 'lease_end',
  'end date': 'lease_end',
  'expiry': 'lease_end',
  'expiration': 'lease_end',
  'lease expiry': 'lease_end',
  'lease expiration': 'lease_end',

  // Contracted Rent variations
  'contracted rent': 'contracted_rent',
  'contract rent': 'contracted_rent',
  'base rent': 'contracted_rent',
  'annual rent': 'contracted_rent',
  'yearly rent': 'contracted_rent',

  // Passing Rent variations
  'passing rent': 'passing_rent',
  'current rent': 'passing_rent',
  'effective rent': 'passing_rent',
  'actual rent': 'passing_rent',
  'monthly rent': 'passing_rent',
  'rent': 'passing_rent',

  // Area variations
  'area': 'area_sqft',
  'sqft': 'area_sqft',
  'sq ft': 'area_sqft',
  'square feet': 'area_sqft',
  'size': 'area_sqft',
  'gla': 'area_sqft',
  'nla': 'area_sqft',

  // Vacant variations
  'vacant': 'vacant',
  'vacancy': 'vacant',
  'is vacant': 'vacant',
  'occupied': 'vacant',

  // Unit Type variations
  'unit type': 'unit_type',
  'type': 'unit_type',
  'space type': 'unit_type',
  'category': 'unit_type',
};
