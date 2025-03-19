
import { useState, useEffect } from 'react';
import { OperatingStatement, StatementSection, StatementAccount, PeriodValue } from '@/lib/types';

export function useMockOperatingStatement(id?: string) {
  const [operatingStatement, setOperatingStatement] = useState<OperatingStatement | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real app, we'd fetch this data from an API
    // For now, we'll return mock data after a short delay to simulate API call
    const fetchData = async () => {
      setLoading(true);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Periods for the operating statement (months)
      const periods = ['01/22', '02/22', '03/22', '04/22', '05/22', '06/22', '07/22', '08/22', '09/22'];
      
      // Generate income section
      const incomeSection: StatementSection = {
        title: 'Rental Income',
        accounts: [
          createAccount('Gross Market Rent', 'Potential Market Rent', 'Income', periods, [
            86449.76, 71887.07, 100140.47, 96015.93, 62987.38, 77062.73, 88738.04, 87887.84, 84395.68
          ]),
          createAccount('Contract Gain(Loss)', '(Loss to Lease) / Gain to Lease', 'Income', periods, [
            -1776.24, 444.42, -894.72, -3658.09, -1047.53, -3544.49, -27.34, -1892.57, -2248.50
          ]),
          createAccount('Change in Prepaid', 'Other Income', 'Income', periods, [
            -1550.28, -1526.18, -106.04, -395.66, -307.54, 0.00, 2636.36, -1503.97, 0.00
          ]),
          createAccount('Change in Delinquency', 'Other Income', 'Income', periods, [
            -8036.07, -15821.43, -14658.43, 811.71, 1932.59, -374.63, -15424.83, -4440.28, -5288.55
          ])
        ],
        sectionTotals: periods.map((period, index) => ({
          period,
          value: [75087.17, 54983.88, 84481.28, 92773.89, 63564.90, 73143.61, 75922.23, 80051.02, 76858.63][index]
        }))
      };
      
      // Generate vacancies section
      const vacanciesSection: StatementSection = {
        title: 'Economic Vacancies',
        accounts: [
          createAccount('Bad Debt', 'Collection Loss / Bad Debt', 'Income', periods, [
            0.00, 0.00, 14652.12, 0.00, 0.00, -43310.76, 0.00, 0.00, 0.00
          ]),
          createAccount('Conc - Miscellaneous', 'Concessions', 'Income', periods, [
            0.00, -398.70, -2287.17, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00
          ]),
          createAccount('Conc - Recurring', 'Concessions', 'Income', periods, [
            -1185.98, -1204.64, -549.75, -711.72, -658.04, -629.41, 0.00, -1160.50, -1269.68
          ]),
          createAccount('Vacancy Loss', 'Vacancy', 'Income', periods, [
            -8329.43, -14547.15, -13496.05, -1030.04, -241.95, -2153.76, -14423.62, -5624.91, -6088.66
          ])
        ],
        sectionTotals: periods.map((period, index) => ({
          period,
          value: [-9515.41, -16150.49, -1680.85, -1741.76, -899.99, -46093.93, -14423.62, -6785.41, -7358.34][index]
        }))
      };
      
      // Generate net rental income
      const netRentalIncome = periods.map((period, index) => ({
        period,
        value: [65571.76, 38833.39, 82800.43, 91032.13, 62664.91, 27049.68, 61498.61, 73265.61, 69500.29][index]
      }));
      
      // Generate other property income section
      const otherPropertyIncomeSection: StatementSection = {
        title: 'Other Property Income',
        accounts: [
          createAccount('Administrative Fee', 'Administrative Fees', 'Income', periods, [
            586.15, 0.00, 680.82, 857.57, 0.00, 0.00, 485.45, 289.82, 423.46
          ])
        ],
        sectionTotals: periods.map((period, index) => ({
          period,
          value: [586.15, 0.00, 680.82, 857.57, 0.00, 0.00, 485.45, 289.82, 423.46][index]
        }))
      };
      
      // Generate net income totals
      const netIncomeTotals = periods.map((period, index) => ({
        period,
        value: [-290.90, 14129.00, 10363.01, 2971.37, 39786.13, -6615.67, 1077.82, 30095.26, 17547.70][index]
      }));
      
      const mockStatement: OperatingStatement = {
        id: id || 'os-1',
        projectId: 'p-1',
        projectName: 'Sample Project',
        fileName: 'T12 Income Statement - Mock 12.22.xlsx',
        uploadDate: new Date().toISOString(),
        propertyName: '118 Southwark St',
        statementType: 'operating_statement',
        mappingMethod: 'machine_learning',
        sections: [incomeSection, vacanciesSection, otherPropertyIncomeSection],
        periods,
        netIncomeTotals
      };
      
      setOperatingStatement(mockStatement);
      setLoading(false);
    };
    
    fetchData();
  }, [id]);
  
  return { operatingStatement, loading };
}

// Helper function to create an account with values
function createAccount(
  originalName: string, 
  mappedName: string, 
  category: 'Income' | 'Expense' | 'Other',
  periods: string[],
  values: number[]
): StatementAccount {
  return {
    originalAccountName: originalName,
    accountName: mappedName,
    category,
    values: periods.map((period, index) => ({
      period,
      value: values[index]
    }))
  };
}
