
import React, { useState } from 'react';
import { Building, DollarSign, Percent, Timer, Search, List, Grid, ChevronDown, ChevronRight } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Badge } from '@/components/ui/badge';
import LeaseTable from '@/components/leasing/LeaseTable';
import LeaseCRM from '@/components/leasing/LeaseCRM';

// Portfolio data type
interface Portfolio {
  id: string;
  name: string;
  area: number;
  areaUnit: 'sqm' | 'sqft';
  contractedRent: number;
  occupancyRate: number;
  expiringIn12Months: number;
  expiringIn24Months: number;
  currency: string;
}

// Sample portfolio data
const portfolioData: Portfolio[] = [
  {
    id: '1',
    name: 'Downtown Office Tower',
    area: 25000,
    areaUnit: 'sqft',
    contractedRent: 1250000,
    occupancyRate: 92,
    expiringIn12Months: 15,
    expiringIn24Months: 28,
    currency: 'USD'
  },
  {
    id: '2',
    name: 'Riverside Retail Complex',
    area: 18500,
    areaUnit: 'sqm',
    contractedRent: 3400000,
    occupancyRate: 97,
    expiringIn12Months: 8,
    expiringIn24Months: 22,
    currency: 'USD'
  },
  {
    id: '3',
    name: 'Tech Park Campus',
    area: 45000,
    areaUnit: 'sqft',
    contractedRent: 5800000,
    occupancyRate: 89,
    expiringIn12Months: 23,
    expiringIn24Months: 35,
    currency: 'USD'
  },
  {
    id: '4',
    name: 'Harbor View Apartments',
    area: 12800,
    areaUnit: 'sqm',
    contractedRent: 2750000,
    occupancyRate: 95,
    expiringIn12Months: 5,
    expiringIn24Months: 12,
    currency: 'USD'
  },
  {
    id: '5',
    name: 'Central Business District',
    area: 32000,
    areaUnit: 'sqft',
    contractedRent: 4200000,
    occupancyRate: 87,
    expiringIn12Months: 18,
    expiringIn24Months: 30,
    currency: 'USD'
  },
  {
    id: '6',
    name: 'Suburban Office Park',
    area: 15600,
    areaUnit: 'sqm',
    contractedRent: 1880000,
    occupancyRate: 91,
    expiringIn12Months: 12,
    expiringIn24Months: 24,
    currency: 'USD'
  }
];

const LeasingCRM: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPortfolio, setSelectedPortfolio] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'crm' | 'list'>('crm');
  
  // Filter portfolios based on search query
  const filteredPortfolios = portfolioData.filter(portfolio => 
    portfolio.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  // Calculate the monetary value of expiring leases
  const calculateExpiryValue = (portfolio: Portfolio, percentage: number) => {
    return (portfolio.contractedRent * percentage / 100).toFixed(0);
  };
  
  // Format currency values
  const formatCurrency = (value: number, currency: string) => {
    return new Intl.NumberFormat('en-US', { 
      style: 'currency', 
      currency,
      maximumFractionDigits: 0
    }).format(value);
  };

  // Handle portfolio selection
  const handlePortfolioClick = (portfolioId: string) => {
    setSelectedPortfolio(selectedPortfolio === portfolioId ? null : portfolioId);
  };

  // Get selected portfolio details
  const getSelectedPortfolio = () => {
    return portfolioData.find(p => p.id === selectedPortfolio);
  };
  
  return (
    <div className="container py-8 max-w-7xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Leasing CRM</h1>
        <p className="text-muted-foreground mt-2">Manage your real estate portfolios and track lease expirations</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Total Portfolios</CardDescription>
            <CardTitle className="flex items-center text-2xl">
              <Building className="mr-2 h-5 w-5 text-muted-foreground" />
              {portfolioData.length}
            </CardTitle>
          </CardHeader>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Total Contracted Rent</CardDescription>
            <CardTitle className="flex items-center text-2xl">
              <DollarSign className="mr-2 h-5 w-5 text-muted-foreground" />
              {formatCurrency(
                portfolioData.reduce((acc, portfolio) => acc + portfolio.contractedRent, 0),
                'USD'
              )}
            </CardTitle>
          </CardHeader>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Average Occupancy</CardDescription>
            <CardTitle className="flex items-center text-2xl">
              <Percent className="mr-2 h-5 w-5 text-muted-foreground" />
              {(portfolioData.reduce((acc, portfolio) => acc + portfolio.occupancyRate, 0) / portfolioData.length).toFixed(1)}%
            </CardTitle>
          </CardHeader>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Expiring in 12 Months</CardDescription>
            <CardTitle className="flex items-center text-2xl">
              <Timer className="mr-2 h-5 w-5 text-muted-foreground" />
              {(portfolioData.reduce((acc, portfolio) => acc + portfolio.expiringIn12Months, 0) / portfolioData.length).toFixed(1)}%
            </CardTitle>
          </CardHeader>
        </Card>
      </div>
      
      <div className="flex items-center mb-4">
        <h2 className="text-xl font-bold mr-4">Portfolio Overview</h2>
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search portfolios..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      
      <Card className="mb-8">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead></TableHead>
                <TableHead>Portfolio Name</TableHead>
                <TableHead>Lettable Area</TableHead>
                <TableHead>Contracted Rent</TableHead>
                <TableHead>Occupancy</TableHead>
                <TableHead>Vacancy</TableHead>
                <TableHead colSpan={2}>Expiring in 12 Months</TableHead>
                <TableHead colSpan={2}>Expiring in 24 Months</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPortfolios.map((portfolio) => (
                <React.Fragment key={portfolio.id}>
                  <TableRow 
                    className="cursor-pointer"
                    onClick={() => handlePortfolioClick(portfolio.id)}
                  >
                    <TableCell className="w-4">
                      {selectedPortfolio === portfolio.id ? (
                        <ChevronDown className="h-4 w-4" />
                      ) : (
                        <ChevronRight className="h-4 w-4" />
                      )}
                    </TableCell>
                    <TableCell className="font-medium">{portfolio.name}</TableCell>
                    <TableCell>
                      {portfolio.area.toLocaleString()} {portfolio.areaUnit}
                    </TableCell>
                    <TableCell>
                      {formatCurrency(portfolio.contractedRent, portfolio.currency)}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Progress value={portfolio.occupancyRate} className="h-2 w-16" />
                        <span>{portfolio.occupancyRate}%</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Progress value={100 - portfolio.occupancyRate} className="h-2 w-16" />
                        <span>{(100 - portfolio.occupancyRate)}%</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      {portfolio.expiringIn12Months}%
                    </TableCell>
                    <TableCell>
                      {formatCurrency(Number(calculateExpiryValue(portfolio, portfolio.expiringIn12Months)), portfolio.currency)}
                    </TableCell>
                    <TableCell>
                      {portfolio.expiringIn24Months}%
                    </TableCell>
                    <TableCell>
                      {formatCurrency(Number(calculateExpiryValue(portfolio, portfolio.expiringIn24Months)), portfolio.currency)}
                    </TableCell>
                  </TableRow>
                  {selectedPortfolio === portfolio.id && (
                    <TableRow>
                      <TableCell colSpan={10} className="p-0 border-0">
                        <div className="p-4 bg-muted/30 rounded-md m-2">
                          <div className="mb-4 flex items-center justify-between">
                            <h3 className="text-lg font-semibold">
                              Expiring Leases - {portfolio.name}
                            </h3>
                            <div className="flex space-x-2">
                              <Button
                                size="sm"
                                variant={viewMode === 'crm' ? 'default' : 'outline'}
                                onClick={() => setViewMode('crm')}
                                className="flex items-center"
                              >
                                <Grid className="h-4 w-4 mr-2" />
                                CRM View
                              </Button>
                              <Button
                                size="sm"
                                variant={viewMode === 'list' ? 'default' : 'outline'}
                                onClick={() => setViewMode('list')}
                                className="flex items-center"
                              >
                                <List className="h-4 w-4 mr-2" />
                                List View
                              </Button>
                            </div>
                          </div>

                          {viewMode === 'list' ? (
                            <LeaseTable portfolioId={portfolio.id} />
                          ) : (
                            <LeaseCRM portfolioId={portfolio.id} />
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </React.Fragment>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default LeasingCRM;
