
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Building2, Calendar, DollarSign } from 'lucide-react';
import { Lease } from '@/lib/types';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import LeaseDetailsDialog from './LeaseDetailsDialog';

interface LeaseCardProps {
  lease: Lease;
}

const LeaseCard: React.FC<LeaseCardProps> = ({ lease }) => {
  const [open, setOpen] = React.useState(false);
  
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };
  
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(value);
  };
  
  // Calculate days until expiry
  const daysUntilExpiry = () => {
    const expiryDate = new Date(lease.expiryDate);
    const now = new Date();
    const diffTime = expiryDate.getTime() - now.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };
  
  return (
    <>
      <Card 
        className="hover:bg-muted/50 cursor-pointer transition-colors"
        onClick={() => setOpen(true)}
      >
        <CardContent className="p-3">
          <div className="flex justify-between items-start mb-2">
            <h4 className="font-semibold">{lease.unitNumber}</h4>
            <Badge variant="outline" className="text-xs">
              {daysUntilExpiry()} days left
            </Badge>
          </div>
          
          <p className="text-sm text-muted-foreground mb-2 line-clamp-1">{lease.tenant}</p>
          
          <div className="grid grid-cols-2 gap-1 text-xs text-muted-foreground">
            <div className="flex items-center">
              <Building2 className="h-3 w-3 mr-1" />
              {lease.area.toLocaleString()} {lease.areaUnit}
            </div>
            <div className="flex items-center">
              <DollarSign className="h-3 w-3 mr-1" />
              {formatCurrency(lease.annualRent)}
            </div>
            <div className="flex items-center col-span-2">
              <Calendar className="h-3 w-3 mr-1" />
              Expires: {formatDate(lease.expiryDate)}
            </div>
          </div>
        </CardContent>
      </Card>
      
      <LeaseDetailsDialog 
        lease={lease} 
        open={open} 
        onClose={() => setOpen(false)} 
      />
    </>
  );
};

export default LeaseCard;
