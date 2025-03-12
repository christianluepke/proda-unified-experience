
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Clock, MessageSquare, FileText, Check, Building2, Calendar, DollarSign, UserRound, Phone, Mail } from 'lucide-react';
import { Lease, LeaseStatus } from '@/lib/types';
import { updateLeaseStatus } from '@/lib/leasingData';
import { useToast } from '@/hooks/use-toast';

interface LeaseDetailsDialogProps {
  lease: Lease;
  open: boolean;
  onClose: () => void;
}

const statusOptions: { value: LeaseStatus; label: string; icon: React.ReactNode }[] = [
  { value: 'lead', label: 'Lead', icon: <MessageSquare className="h-4 w-4" /> },
  { value: 'negotiation', label: 'Negotiation', icon: <Clock className="h-4 w-4" /> },
  { value: 'contract', label: 'Contract', icon: <FileText className="h-4 w-4" /> },
  { value: 'closed', label: 'Closed', icon: <Check className="h-4 w-4" /> }
];

const LeaseDetailsDialog: React.FC<LeaseDetailsDialogProps> = ({ lease, open, onClose }) => {
  const [currentLease, setCurrentLease] = useState<Lease>(lease);
  const { toast } = useToast();
  
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
  
  const handleStatusChange = (status: LeaseStatus) => {
    const updatedLease = updateLeaseStatus(currentLease.id, status);
    if (updatedLease) {
      setCurrentLease(updatedLease);
      toast({
        title: "Status updated",
        description: `Lease status updated to ${status.charAt(0).toUpperCase() + status.slice(1)}`,
      });
    }
  };
  
  return (
    <Dialog open={open} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>Unit {currentLease.unitNumber}</span>
            <Badge className="ml-2">
              {currentLease.status.charAt(0).toUpperCase() + currentLease.status.slice(1)}
            </Badge>
          </DialogTitle>
          <DialogDescription>
            Lease details for {currentLease.tenant}
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <div className="text-sm font-medium">Tenant</div>
              <div className="text-sm flex items-center">
                <UserRound className="h-4 w-4 mr-2 text-muted-foreground" />
                {currentLease.tenant}
              </div>
            </div>
            
            <div className="space-y-1">
              <div className="text-sm font-medium">Contact</div>
              <div className="text-xs flex items-center">
                <Phone className="h-3 w-3 mr-1 text-muted-foreground" />
                {currentLease.contactPhone}
              </div>
              <div className="text-xs flex items-center">
                <Mail className="h-3 w-3 mr-1 text-muted-foreground" />
                {currentLease.contactEmail}
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <div className="text-sm font-medium">Area</div>
              <div className="text-sm flex items-center">
                <Building2 className="h-4 w-4 mr-2 text-muted-foreground" />
                {currentLease.area.toLocaleString()} {currentLease.areaUnit}
              </div>
            </div>
            
            <div className="space-y-1">
              <div className="text-sm font-medium">Annual Rent</div>
              <div className="text-sm flex items-center">
                <DollarSign className="h-4 w-4 mr-2 text-muted-foreground" />
                {formatCurrency(currentLease.annualRent)}
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <div className="text-sm font-medium">Start Date</div>
              <div className="text-sm flex items-center">
                <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                {formatDate(currentLease.startDate)}
              </div>
            </div>
            
            <div className="space-y-1">
              <div className="text-sm font-medium">Expiry Date</div>
              <div className="text-sm flex items-center">
                <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                {formatDate(currentLease.expiryDate)}
              </div>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="text-sm font-medium">Notes</div>
            <div className="text-sm text-muted-foreground border rounded-md p-2 min-h-20 bg-muted/30">
              {currentLease.notes || "No notes available for this lease."}
            </div>
          </div>
        </div>
        
        <DialogFooter className="flex-col sm:flex-row sm:justify-between gap-2">
          <div className="text-sm font-medium mb-2 sm:mb-0">Update Status:</div>
          <div className="flex flex-wrap gap-2">
            {statusOptions.map(option => (
              <Button
                key={option.value}
                size="sm"
                variant={currentLease.status === option.value ? 'default' : 'outline'}
                className="flex items-center"
                disabled={currentLease.status === option.value}
                onClick={() => handleStatusChange(option.value)}
              >
                {option.icon}
                <span className="ml-1">{option.label}</span>
              </Button>
            ))}
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default LeaseDetailsDialog;
