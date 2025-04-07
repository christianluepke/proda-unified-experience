
import React from 'react';
import { Property } from '@/components/upload/models';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Trash2, ExternalLink, Building2, MapPin, Users, CreditCard, CalendarDays } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { formatCurrency } from '@/lib/utils';
import { format, parseISO } from 'date-fns';

interface PropertyCardProps {
  property: Property;
  onDelete: (id: string) => void;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property, onDelete }) => {
  const navigate = useNavigate();
  
  const handleView = () => {
    // In a real app, this would navigate to a property details page
    navigate(`/properties/${property.id}`);
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'N/A';
    try {
      return format(parseISO(dateString), 'dd MMM yyyy');
    } catch (e) {
      return dateString;
    }
  };
  
  return (
    <Card className="overflow-hidden">
      <CardHeader className="p-0">
        <div className="h-28 bg-gradient-to-r from-primary/10 to-secondary/10 relative">
          <div className="absolute bottom-3 left-4">
            <Badge variant="secondary" className="bg-background/80 backdrop-blur-sm">
              {property.assetType || 'Property'}
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4 space-y-4">
        <div>
          <h3 className="font-semibold truncate">{property.name}</h3>
          <div className="flex items-center text-muted-foreground text-sm mt-1">
            <MapPin className="h-3.5 w-3.5 mr-1" />
            <span className="truncate">{property.city}, {property.country}</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 text-sm">
          <div>
            <p className="text-muted-foreground text-xs mb-0.5">Project</p>
            <p className="truncate">{property.projectName || 'Not assigned'}</p>
          </div>
          <div>
            <p className="text-muted-foreground text-xs mb-0.5">Portfolio</p>
            <p className="truncate">{property.portfolioName || 'Not assigned'}</p>
          </div>
          <div>
            <p className="text-muted-foreground text-xs mb-0.5">Units</p>
            <p className="flex items-center">
              <Users className="h-3.5 w-3.5 mr-1 text-muted-foreground" />
              <span>{property.units}</span>
            </p>
          </div>
          <div>
            <p className="text-muted-foreground text-xs mb-0.5">Area</p>
            <p className="flex items-center">
              <Building2 className="h-3.5 w-3.5 mr-1 text-muted-foreground" />
              <span>{property.sqft?.toLocaleString()} {property.areaUnit}</span>
            </p>
          </div>
          <div>
            <p className="text-muted-foreground text-xs mb-0.5">Occupancy</p>
            <p>{property.occupancy?.toFixed(1)}%</p>
          </div>
          <div>
            <p className="text-muted-foreground text-xs mb-0.5">Rent</p>
            <p className="flex items-center">
              <CreditCard className="h-3.5 w-3.5 mr-1 text-muted-foreground" />
              <span>{formatCurrency(property.contractedRentPA || 0, 'GBP', true)}</span>
            </p>
          </div>
        </div>
        
        <div className="pt-2">
          <p className="text-xs text-muted-foreground flex items-center">
            <CalendarDays className="h-3.5 w-3.5 mr-1" />
            <span>Latest Rent Roll: {formatDate(property.latestRentRollDate)}</span>
          </p>
        </div>
      </CardContent>
      <CardFooter className="px-4 py-3 border-t flex justify-between">
        <Button variant="ghost" size="sm" onClick={handleView}>
          <ExternalLink className="h-4 w-4 mr-1" />
          View Details
        </Button>
        <Button variant="ghost" size="sm" onClick={() => onDelete(property.id)} className="text-destructive hover:text-destructive">
          <Trash2 className="h-4 w-4 mr-1" />
          Delete
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PropertyCard;
