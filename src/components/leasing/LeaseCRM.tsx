
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MessageSquare, FileText, Check, Clock } from 'lucide-react';
import { getLeasesForPortfolio } from '@/lib/leasingData';
import { LeaseStatus, Lease } from '@/lib/types';
import LeaseCard from './LeaseCard';

interface LeaseCRMProps {
  portfolioId: string;
}

const statusColumns: { status: LeaseStatus; icon: React.ReactNode; label: string }[] = [
  { 
    status: 'lead', 
    icon: <MessageSquare className="h-4 w-4 mr-2" />, 
    label: 'Lead' 
  },
  { 
    status: 'negotiation', 
    icon: <Clock className="h-4 w-4 mr-2" />, 
    label: 'Negotiation' 
  },
  { 
    status: 'contract', 
    icon: <FileText className="h-4 w-4 mr-2" />, 
    label: 'Contract' 
  },
  { 
    status: 'closed', 
    icon: <Check className="h-4 w-4 mr-2" />, 
    label: 'Closed' 
  }
];

const LeaseCRM: React.FC<LeaseCRMProps> = ({ portfolioId }) => {
  const leases = getLeasesForPortfolio(portfolioId);
  const [showAll, setShowAll] = useState(false);
  
  // Filter leases by expiration (12 or 24 months)
  const filteredLeases = showAll 
    ? leases 
    : leases.filter(lease => {
        const expiryDate = new Date(lease.expiryDate);
        const now = new Date();
        const monthsUntilExpiry = (expiryDate.getFullYear() - now.getFullYear()) * 12 + 
                                  (expiryDate.getMonth() - now.getMonth());
        return monthsUntilExpiry <= 12;
      });

  // Group leases by status
  const leasesByStatus = statusColumns.reduce((acc, { status }) => {
    acc[status] = filteredLeases.filter(lease => lease.status === status);
    return acc;
  }, {} as Record<LeaseStatus, Lease[]>);

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-sm font-medium">
          Showing leases expiring in {showAll ? '24' : '12'} months
        </h3>
        <Badge 
          variant="outline" 
          className="cursor-pointer"
          onClick={() => setShowAll(!showAll)}
        >
          {showAll ? 'Show 12 Months' : 'Show 24 Months'}
        </Badge>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {statusColumns.map(({ status, icon, label }) => (
          <Card key={status} className="overflow-hidden">
            <CardHeader className="bg-muted/30 pb-3 pt-4">
              <CardTitle className="text-sm font-medium flex items-center">
                {icon}
                {label} ({leasesByStatus[status]?.length || 0})
              </CardTitle>
            </CardHeader>
            <CardContent className="p-3 max-h-[400px] overflow-y-auto">
              {leasesByStatus[status]?.length ? (
                <div className="space-y-3">
                  {leasesByStatus[status].map((lease) => (
                    <LeaseCard key={lease.id} lease={lease} />
                  ))}
                </div>
              ) : (
                <div className="text-muted-foreground text-sm py-4 text-center">
                  No leases in this status
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default LeaseCRM;
