
import React, { useState } from 'react';
import { TableCell, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Trash2, ExternalLink, AlertCircle } from 'lucide-react';
import { Property } from '@/components/upload/models';
import { format, parseISO } from 'date-fns';
import { formatCurrency } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { PropertyColumn } from '@/hooks/useProperties';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useNavigate } from 'react-router-dom';

interface PropertyRowProps {
  property: Property;
  columns: PropertyColumn[];
  onDelete: (id: string) => void;
}

const PropertyRow: React.FC<PropertyRowProps> = ({ property, columns, onDelete }) => {
  const navigate = useNavigate();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  
  // Filter only visible columns
  const visibleColumns = columns.filter(column => column.visible);
  
  const formatDate = (dateString?: string) => {
    if (!dateString) return 'N/A';
    try {
      return format(parseISO(dateString), 'dd MMM yyyy');
    } catch (e) {
      return dateString;
    }
  };
  
  const formatPercentage = (value?: number) => {
    if (value === undefined || value === null) return 'N/A';
    return `${value.toFixed(1)}%`;
  };
  
  const formatArea = (sqft?: number, areaUnit?: 'sqft' | 'sqm') => {
    if (sqft === undefined || sqft === null) return 'N/A';
    return `${sqft.toLocaleString()} ${areaUnit || 'sqft'}`;
  };
  
  const formatYears = (years?: number) => {
    if (years === undefined || years === null) return 'N/A';
    return `${years.toFixed(1)} years`;
  };
  
  const handleView = () => {
    // In a real app, this would navigate to a property details page
    navigate(`/properties/${property.id}`);
  };
  
  const handleDelete = () => {
    setIsDeleteDialogOpen(true);
  };
  
  const confirmDelete = () => {
    onDelete(property.id);
    setIsDeleteDialogOpen(false);
  };
  
  const renderCellContent = (columnId: string) => {
    switch (columnId) {
      case 'name':
        return <span className="font-medium truncate block max-w-[180px]">{property.name}</span>;
      case 'assetType':
        return <Badge variant="outline" className="truncate max-w-full">{property.assetType || 'N/A'}</Badge>;
      case 'projectName':
        return <span className="truncate block max-w-[150px]">{property.projectName || 'Not assigned'}</span>;
      case 'portfolioName':
        return <span className="truncate block max-w-[150px]">{property.portfolioName || 'Not assigned'}</span>;
      case 'country':
        return property.country;
      case 'city':
        return property.city;
      case 'latestRentRollDate':
        return formatDate(property.latestRentRollDate);
      case 'units':
        return property.units;
      case 'sqft':
        return formatArea(property.sqft, property.areaUnit);
      case 'parkingArea':
        return formatArea(property.parkingArea, property.areaUnit);
      case 'tenantCount':
        return property.tenantCount || 0;
      case 'occupancy':
        return formatPercentage(property.occupancy);
      case 'vacancy':
        return formatPercentage(property.vacancy);
      case 'contractedRentPA':
        return formatCurrency(property.contractedRentPA || 0, 'GBP');
      case 'waltBreak':
        return formatYears(property.waltBreak);
      case 'waltExpiry':
        return formatYears(property.waltExpiry);
      case 'propertyManager':
        return <span className="truncate block max-w-[150px]">{property.propertyManager || 'Not assigned'}</span>;
      case 'assetManager':
        return <span className="truncate block max-w-[150px]">{property.assetManager || 'Not assigned'}</span>;
      case 'region':
        return property.region || 'N/A';
      case 'acquisitionDate':
        return formatDate(property.acquisitionDate);
      case 'saleDate':
        return property.saleDate ? formatDate(property.saleDate) : 'Not sold';
      case 'underwritingStartDate':
        return formatDate(property.underwritingStartDate);
      default:
        return 'N/A';
    }
  };

  return (
    <>
      <TableRow className="hover:bg-muted/30">
        {visibleColumns.map((column) => (
          <TableCell key={column.id} className="py-3 max-w-[200px]">
            {renderCellContent(column.id)}
          </TableCell>
        ))}
        <TableCell className="text-right whitespace-nowrap w-[100px]">
          <div className="flex justify-end">
            <Button 
              variant="ghost" 
              size="icon"
              className="h-8 w-8"
              onClick={handleView}
            >
              <ExternalLink className="h-4 w-4" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon"
              className="h-8 w-8 text-destructive hover:text-destructive-foreground"
              onClick={handleDelete}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </TableCell>
      </TableRow>
      
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center">
              <AlertCircle className="h-5 w-5 mr-2 text-destructive" />
              Delete Property
            </AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete "{property.name}"? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default PropertyRow;
