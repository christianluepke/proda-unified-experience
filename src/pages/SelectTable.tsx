
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { X, ChevronLeft, ChevronRight, FileText, Check, Table as TableIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Switch } from '@/components/ui/switch';
import { toast } from '@/components/ui/use-toast';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface TableOption {
  id: string;
  name: string;
  sheetName: string;
  rowCount: number;
  columnCount: number;
  tableType: 'rent_roll' | 'property' | 'unknown';
  confidence: number;
}

const SelectTable = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(1);
  const [selectedTable, setSelectedTable] = useState<string | null>(null);
  const [showFullTable, setShowFullTable] = useState(false);
  const [tableBounds, setTableBounds] = useState({ startRow: 1, endRow: 12, startCol: 1, endCol: 7 });
  
  // Mock data
  const fileName = "Property_RentRoll_2023_Q4.xlsx";
  const mockTables: TableOption[] = [
    { 
      id: 'table1', 
      name: 'Main Rent Roll', 
      sheetName: 'Rent Roll', 
      rowCount: 42, 
      columnCount: 12, 
      tableType: 'rent_roll',
      confidence: 92
    },
    { 
      id: 'table2', 
      name: 'Property Summary', 
      sheetName: 'Summary', 
      rowCount: 15, 
      columnCount: 6, 
      tableType: 'property',
      confidence: 78
    },
    { 
      id: 'table3', 
      name: 'Tenant List', 
      sheetName: 'Tenants', 
      rowCount: 55, 
      columnCount: 8, 
      tableType: 'rent_roll',
      confidence: 88
    }
  ];
  
  // Mock rent roll data
  const mockRentRollData = [
    ["Unit", "Tenant", "Area (SQM)", "Term (Years)", "Start Date", "End Date", "Annual Rent"],
    ["101", "ABC Corp", "150", "5", "01/01/2020", "12/31/2024", "$45,000"],
    ["102", "XYZ Ltd", "200", "3", "03/15/2021", "03/14/2024", "$60,000"],
    ["103", "123 Company", "175", "7", "06/01/2019", "05/31/2026", "$52,500"],
    ["104", "Tech Solutions", "300", "10", "01/01/2018", "12/31/2027", "$90,000"],
    ["105", "Retail Store", "250", "5", "04/01/2022", "03/31/2027", "$75,000"],
    ["201", "Law Firm LLP", "350", "8", "07/15/2020", "07/14/2028", "$105,000"],
    ["202", "Consulting Group", "225", "4", "10/01/2021", "09/30/2025", "$67,500"],
    ["203", "Medical Practice", "275", "6", "01/01/2023", "12/31/2028", "$82,500"],
    ["204", "Restaurant Inc", "400", "10", "05/01/2019", "04/30/2029", "$120,000"],
    ["205", "Insurance Agency", "180", "3", "09/01/2022", "08/31/2025", "$54,000"],
    ["301", "Marketing Firm", "220", "5", "03/01/2021", "02/28/2026", "$66,000"]
  ];

  const handleStepChange = (step: number) => {
    setActiveStep(step);
  };

  const handleNext = () => {
    if (!selectedTable) {
      toast({
        title: "Selection Required",
        description: "Please select a table to continue.",
        variant: "destructive",
      });
      return;
    }
    
    if (activeStep < 2) {
      setActiveStep(activeStep + 1);
    } else {
      // Process data and navigate to next step
      toast({
        title: "Selection Complete",
        description: "Rent roll table has been selected.",
      });
      navigate('/projects');
    }
  };

  const handleCancel = () => {
    toast({
      title: "Process Cancelled",
      description: "You've cancelled the rent roll selection.",
      variant: "destructive",
    });
    navigate('/upload');
  };

  const handleCloseDialog = () => {
    const confirmClose = window.confirm("Are you sure you want to close? Any unsaved selections will be lost.");
    if (confirmClose) {
      navigate('/upload');
    }
  };

  const handleTableSelect = (tableId: string) => {
    setSelectedTable(tableId);
  };

  const getHighlightedRows = () => {
    return mockRentRollData.slice(
      Math.max(0, tableBounds.startRow - 1), 
      Math.min(mockRentRollData.length, tableBounds.endRow)
    );
  };

  const updateBounds = (key: keyof typeof tableBounds, value: number) => {
    setTableBounds(prev => ({
      ...prev,
      [key]: value
    }));
  };

  return (
    <div className="fixed inset-0 z-50 bg-background flex flex-col">
      {/* Header */}
      <div className="border-b p-4 flex items-center justify-between">
        <h1 className="text-xl font-semibold">Select Rent Roll Table</h1>
        <Button variant="ghost" size="icon" onClick={handleCloseDialog}>
          <X className="h-5 w-5" />
        </Button>
      </div>

      {/* Progress Steps */}
      <div className="px-4 py-3 border-b">
        <div className="flex items-center">
          <Button 
            variant="ghost" 
            className="text-sm px-2 py-1 h-auto"
            onClick={() => handleStepChange(1)}
          >
            <span className={`mr-2 inline-flex items-center justify-center rounded-full h-6 w-6 text-xs ${
              activeStep >= 1 ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
            }`}>
              1
            </span>
            Select table
          </Button>
          <ChevronRight className="h-4 w-4 mx-1 text-muted-foreground" />
          <Button 
            variant="ghost" 
            className="text-sm px-2 py-1 h-auto"
            onClick={() => handleStepChange(2)}
          >
            <span className={`mr-2 inline-flex items-center justify-center rounded-full h-6 w-6 text-xs ${
              activeStep >= 2 ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
            }`}>
              2
            </span>
            Adjust bounds
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <ResizablePanelGroup direction="horizontal" className="flex-1 overflow-hidden">
        {/* Left Sidebar */}
        <ResizablePanel defaultSize={25} minSize={20} maxSize={30} className="border-r">
          <div className="p-4 h-full overflow-y-auto">
            {activeStep === 1 && (
              <>
                <h2 className="text-lg font-medium mb-4">Select the correct rent roll table.</h2>
                
                <div className="mb-6">
                  <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-md mb-4">
                    <FileText className="h-5 w-5 text-primary" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{fileName}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-sm font-medium mb-2">Detected Tables</h3>
                  
                  <RadioGroup value={selectedTable || ""} onValueChange={handleTableSelect}>
                    {mockTables.map(table => (
                      <div 
                        key={table.id}
                        className={`mb-3 p-3 border rounded-lg transition-colors ${
                          selectedTable === table.id ? 'border-primary bg-primary/5' : 'hover:bg-muted/50'
                        }`}
                      >
                        <div className="flex items-start mb-2">
                          <RadioGroupItem value={table.id} id={table.id} className="mt-1" />
                          <div className="ml-3 flex-1">
                            <label htmlFor={table.id} className="font-medium cursor-pointer flex items-center gap-2">
                              {table.name}
                              <Badge className={
                                table.confidence > 90 ? "bg-green-100 text-green-800" : 
                                table.confidence > 80 ? "bg-amber-100 text-amber-800" : 
                                "bg-red-100 text-red-800"
                              }>
                                {table.confidence}%
                              </Badge>
                            </label>
                            <div className="text-xs text-muted-foreground mt-1">
                              Sheet: {table.sheetName}
                            </div>
                            <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                              <div className="flex items-center gap-1">
                                <TableIcon className="h-3 w-3" />
                                <span>{table.rowCount} rows</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <TableIcon className="h-3 w-3 rotate-90" />
                                <span>{table.columnCount} columns</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <Badge 
                          variant="outline" 
                          className={
                            table.tableType === 'rent_roll' ? "bg-blue-50 text-blue-700 border-blue-200" : 
                            table.tableType === 'property' ? "bg-purple-50 text-purple-700 border-purple-200" : 
                            "bg-gray-50 text-gray-700 border-gray-200"
                          }
                        >
                          {table.tableType === 'rent_roll' ? 'Rent Roll' : 
                           table.tableType === 'property' ? 'Property Data' : 
                           'Unknown Type'}
                        </Badge>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
              </>
            )}

            {activeStep === 2 && (
              <div className="space-y-5">
                <h2 className="text-lg font-medium mb-4">Adjust table bounds</h2>
                <p className="text-sm text-muted-foreground">
                  Fine-tune the rows and columns to include only relevant rent roll data.
                </p>
                
                <div className="space-y-4 mt-6">
                  <div>
                    <h3 className="text-sm font-medium mb-3">Table Bounds</h3>
                    
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-sm text-muted-foreground">Start Row</label>
                          <Select
                            value={tableBounds.startRow.toString()}
                            onValueChange={(v) => updateBounds('startRow', parseInt(v))}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Start Row" />
                            </SelectTrigger>
                            <SelectContent>
                              {[...Array(10)].map((_, i) => (
                                <SelectItem key={`start-row-${i+1}`} value={(i+1).toString()}>
                                  Row {i+1}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div className="space-y-2">
                          <label className="text-sm text-muted-foreground">End Row</label>
                          <Select
                            value={tableBounds.endRow.toString()}
                            onValueChange={(v) => updateBounds('endRow', parseInt(v))}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="End Row" />
                            </SelectTrigger>
                            <SelectContent>
                              {[...Array(mockRentRollData.length)].map((_, i) => (
                                <SelectItem key={`end-row-${i+1}`} value={(i+1).toString()}>
                                  Row {i+1}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-sm text-muted-foreground">Start Column</label>
                          <Select
                            value={tableBounds.startCol.toString()}
                            onValueChange={(v) => updateBounds('startCol', parseInt(v))}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Start Column" />
                            </SelectTrigger>
                            <SelectContent>
                              {[...Array(7)].map((_, i) => (
                                <SelectItem key={`start-col-${i+1}`} value={(i+1).toString()}>
                                  Column {i+1}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div className="space-y-2">
                          <label className="text-sm text-muted-foreground">End Column</label>
                          <Select
                            value={tableBounds.endCol.toString()}
                            onValueChange={(v) => updateBounds('endCol', parseInt(v))}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="End Column" />
                            </SelectTrigger>
                            <SelectContent>
                              {[...Array(7)].map((_, i) => (
                                <SelectItem key={`end-col-${i+1}`} value={(i+1).toString()}>
                                  Column {i+1}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Show Full Table</span>
                    <Switch 
                      checked={showFullTable} 
                      onCheckedChange={setShowFullTable} 
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </ResizablePanel>
        
        <ResizableHandle withHandle />
        
        {/* Right Content Area */}
        <ResizablePanel defaultSize={75} className="flex flex-col overflow-hidden">
          <div className="flex-1 overflow-auto p-4">
            <div className="bg-muted/10 p-4 rounded-lg border border-dashed border-muted-foreground/50 mb-4">
              <h3 className="text-sm font-medium mb-2">Table Preview</h3>
              <p className="text-xs text-muted-foreground mb-4">
                {activeStep === 1 
                  ? "Select a table from the left panel to preview it."
                  : "Adjust the bounds using the controls on the left."}
              </p>
              
              {selectedTable ? (
                <div className="border rounded-md overflow-auto max-h-[650px]">
                  <Table>
                    <TableHeader>
                      {activeStep === 1 && (
                        <TableRow className="bg-primary text-primary-foreground">
                          {mockRentRollData[0].map((header, idx) => (
                            <TableHead key={`header-${idx}`}>{header}</TableHead>
                          ))}
                        </TableRow>
                      )}
                      {activeStep === 2 && (
                        <TableRow className="bg-primary text-primary-foreground">
                          {mockRentRollData[0].map((header, idx) => (
                            <TableHead 
                              key={`header-${idx}`}
                              className={idx + 1 >= tableBounds.startCol && idx + 1 <= tableBounds.endCol ? '' : 'opacity-40'}
                            >
                              {header}
                            </TableHead>
                          ))}
                        </TableRow>
                      )}
                    </TableHeader>
                    <TableBody>
                      {(showFullTable ? mockRentRollData.slice(1) : getHighlightedRows().slice(1)).map((row, rowIdx) => (
                        <TableRow 
                          key={`row-${rowIdx}`}
                          className={
                            activeStep === 2 && !showFullTable && rowIdx + 1 >= tableBounds.startRow && rowIdx + 1 <= tableBounds.endRow
                              ? 'bg-blue-50/50'
                              : rowIdx % 2 === 0 ? 'bg-muted/5' : ''
                          }
                        >
                          {row.map((cell, cellIdx) => (
                            <TableCell 
                              key={`cell-${rowIdx}-${cellIdx}`}
                              className={
                                activeStep === 2 && cellIdx + 1 >= tableBounds.startCol && cellIdx + 1 <= tableBounds.endCol
                                  ? ''
                                  : 'opacity-40'
                              }
                            >
                              {cell}
                            </TableCell>
                          ))}
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              ) : (
                <div className="flex items-center justify-center h-48 bg-muted/5 rounded-md border">
                  <p className="text-muted-foreground">Select a table to preview</p>
                </div>
              )}
            </div>
          </div>
          
          {/* Footer Controls */}
          <div className="border-t p-4 flex justify-between items-center">
            <Button variant="outline" onClick={handleCancel}>
              Cancel
            </Button>
            <Button onClick={handleNext} disabled={!selectedTable}>
              {activeStep < 2 ? 'Next' : 'Confirm Selection'}
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};

export default SelectTable;
