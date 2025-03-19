
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { OperatingStatement } from '@/lib/types';

interface StatementTableProps {
  operatingStatement: OperatingStatement;
}

const StatementTable: React.FC<StatementTableProps> = ({ operatingStatement }) => {
  return (
    <div className="min-w-max">
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="sticky left-0 z-10 bg-primary text-primary-foreground text-left p-3 border-r">Original Account Name</th>
            <th className="sticky left-[200px] z-10 bg-primary text-primary-foreground text-left p-3 border-r">Account Name</th>
            {operatingStatement.periods.map((period) => (
              <th key={period} className="bg-primary text-primary-foreground p-3 border-r text-center min-w-[100px]">
                {period}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {operatingStatement.sections.map((section, sectionIndex) => (
            <React.Fragment key={`section-${sectionIndex}`}>
              {/* Section Header */}
              <tr>
                <td colSpan={2 + operatingStatement.periods.length} className="bg-muted/40 p-3 font-medium">
                  {section.title}
                </td>
              </tr>
              
              {/* Section Accounts */}
              {section.accounts.map((account, accountIndex) => (
                <tr key={`account-${sectionIndex}-${accountIndex}`} className={accountIndex % 2 === 0 ? '' : 'bg-muted/5'}>
                  <td className="sticky left-0 z-[5] bg-inherit p-3 border-r min-w-[200px]">
                    {account.originalAccountName}
                  </td>
                  <td className="sticky left-[200px] z-[5] bg-inherit p-3 border-r min-w-[200px] flex items-center">
                    <Badge className="bg-green-100 text-green-800 mr-2">Income</Badge>
                    {account.accountName}
                    <ChevronDown className="ml-auto h-4 w-4 text-muted-foreground" />
                  </td>
                  {account.values.map((value, valueIndex) => (
                    <td key={`value-${sectionIndex}-${accountIndex}-${valueIndex}`} className="p-3 border-r text-right">
                      {value.value.toLocaleString('en-US', { 
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2
                      })}
                    </td>
                  ))}
                </tr>
              ))}
              
              {/* Section Totals */}
              <tr className="font-medium">
                <td colSpan={2} className="sticky left-0 z-[5] bg-muted/20 p-3 text-right border-r">
                  {section.title}
                </td>
                {section.sectionTotals.map((total, totalIndex) => (
                  <td key={`total-${sectionIndex}-${totalIndex}`} className="bg-muted/20 p-3 border-r text-right">
                    {total.value.toLocaleString('en-US', { 
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2
                    })}
                  </td>
                ))}
              </tr>
            </React.Fragment>
          ))}
          
          {/* Net Income Total */}
          <tr className="font-medium text-lg">
            <td colSpan={2} className="sticky left-0 z-[5] bg-muted/30 p-3 text-right border-r">
              Net Income Total
            </td>
            {operatingStatement.netIncomeTotals.map((total, totalIndex) => (
              <td key={`net-income-${totalIndex}`} className="bg-muted/30 p-3 border-r text-right">
                {total.value.toLocaleString('en-US', { 
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2
                })}
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
};

// Helper component for dropdown icon
const ChevronDown = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="m6 9 6 6 6-6"/>
  </svg>
);

export default StatementTable;
