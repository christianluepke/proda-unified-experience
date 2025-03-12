
import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Check, MessageSquare, FileText, Clock, ArrowUpDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getLeasesForPortfolio } from '@/lib/leasingData';
import { Lease, LeaseStatus } from '@/lib/types';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import LeaseDetailsDialog from './LeaseDetailsDialog';

interface LeaseTableProps {
  portfolioId: string;
}

const LeaseTable: React.FC<LeaseTableProps> = ({ portfolioId }) => {
  const leases = getLeasesForPortfolio(portfolioId);
  const [sortField, setSortField] = useState<keyof Lease>('expiryDate');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [showAll, setShowAll] = useState(false);
  const [selectedLease, setSelectedLease] = useState<Lease | null>(null);
  
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
  
  // Sort leases
  const sortedLeases = [...filteredLeases].sort((a, b) => {
    if (sortField === 'expiryDate' || sortField === 'startDate') {
      const dateA = new Date(a[sortField]);
      const dateB = new Date(b[sortField]);
      return sortDirection === 'asc' ? dateA.getTime() - dateB.getTime() : dateB.getTime() - dateA.getTime();
    }
    
    if (sortField === 'annualRent') {
      return sortDirection === 'asc' ? a.annualRent - b.annualRent : b.annualRent - a.annualRent;
    }
    
    // String sorting for other fields
    const valueA = String(a[sortField]);
    const valueB = String(b[sortField]);
    return sortDirection === 'asc' ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA);
  });
  
  const handleSort = (field: keyof Lease) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };
  
  const getStatusIcon = (status: LeaseStatus) => {
    switch (status) {
      case 'lead':
        return <MessageSquare className="h-4 w-4 mr-1" />;
      case 'negotiation':
        return <Clock className="h-4 w-4 mr-1" />;
      case 'contract':
        return <FileText className="h-4 w-4 mr-1" />;
      case 'closed':
        return <Check className="h-4 w-4 mr-1" />;
      default:
        return null;
    }
  };
  
  const getStatusColor = (status: LeaseStatus) => {
    switch (status) {
      case 'lead':
        return 'bg-blue-100 text-blue-800';
      case 'negotiation':
        return 'bg-yellow-100 text-yellow-800';
      case 'contract':
        return 'bg-purple-100 text-purple-800';
      case 'closed':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
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
      
      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>
                <Button variant="ghost" size="sm" onClick={() => handleSort('unitNumber')} className="font-medium">
                  Unit <ArrowUpDown className="h-3 w-3 ml-1" />
                </Button>
              </TableHead>
              <TableHead>
                <Button variant="ghost" size="sm" onClick={() => handleSort('tenant')} className="font-medium">
                  Tenant <ArrowUpDown className="h-3 w-3 ml-1" />
                </Button>
              </TableHead>
              <TableHead>
                <Button variant="ghost" size="sm" onClick={() => handleSort('area')} className="font-medium">
                  Area <ArrowUpDown className="h-3 w-3 ml-1" />
                </Button>
              </TableHead>
              <TableHead>
                <Button variant="ghost" size="sm" onClick={() => handleSort('annualRent')} className="font-medium">
                  Annual Rent <ArrowUpDown className="h-3 w-3 ml-1" />
                </Button>
              </TableHead>
              <TableHead>
                <Button variant="ghost" size="sm" onClick={() => handleSort('startDate')} className="font-medium">
                  Start Date <ArrowUpDown className="h-3 w-3 ml-1" />
                </Button>
              </TableHead>
              <TableHead>
                <Button variant="ghost" size="sm" onClick={() => handleSort('expiryDate')} className="font-medium">
                  Expiry Date <ArrowUpDown className="h-3 w-3 ml-1" />
                </Button>
              </TableHead>
              <TableHead>
                <Button variant="ghost" size="sm" onClick={() => handleSort('status')} className="font-medium">
                  Status <ArrowUpDown className="h-3 w-3 ml-1" />
                </Button>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedLeases.map((lease) => (
              <TableRow 
                key={lease.id} 
                className="cursor-pointer hover:bg-muted"
                onClick={() => setSelectedLease(lease)}
              >
                <TableCell className="font-medium">{lease.unitNumber}</TableCell>
                <TableCell>{lease.tenant}</TableCell>
                <TableCell>{lease.area.toLocaleString()} {lease.areaUnit}</TableCell>
                <TableCell>{formatCurrency(lease.annualRent)}</TableCell>
                <TableCell>{formatDate(lease.startDate)}</TableCell>
                <TableCell>{formatDate(lease.expiryDate)}</TableCell>
                <TableCell>
                  <Badge className={`flex w-fit items-center ${getStatusColor(lease.status)}`} variant="outline">
                    {getStatusIcon(lease.status)}
                    {lease.status.charAt(0).toUpperCase() + lease.status.slice(1)}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      
      {selectedLease && (
        <LeaseDetailsDialog 
          lease={selectedLease} 
          open={!!selectedLease} 
          onClose={() => setSelectedLease(null)} 
        />
      )}
    </div>
  );
};

export default LeaseTable;
