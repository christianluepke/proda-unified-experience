
import React from 'react';
import { Document } from './models';
import { format } from 'date-fns';
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { 
  FileText, 
  Calculator, 
  Building2, 
  MoreVertical,
  ExternalLink,
  FileCheck,
  FileClock,
  Clock,
  User,
  Pencil
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu, 
  DropdownMenuTrigger, 
  DropdownMenuContent, 
  DropdownMenuItem,
  DropdownMenuSeparator
} from '@/components/ui/dropdown-menu';
import { useFiles } from '@/hooks/useFiles';
import { getStatusBadge } from './StatusBadges';

interface DocumentListProps {
  documents: Document[];
}

const DocumentList: React.FC<DocumentListProps> = ({ documents }) => {
  const { getDocumentTypeLabel } = useFiles();

  const getDocumentIcon = (type: string) => {
    switch (type) {
      case 'rent_roll':
        return <Building2 className="h-4 w-4 text-blue-500" />;
      case 'operating_statement':
        return <Calculator className="h-4 w-4 text-green-500" />;
      default:
        return <FileText className="h-4 w-4 text-gray-500" />;
    }
  };

  return (
    <div className="border rounded-md">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/30">
            <TableHead className="w-[25%]">Document Name</TableHead>
            <TableHead className="w-[15%]">Type</TableHead>
            <TableHead className="w-[20%]">Date Extracted</TableHead>
            <TableHead className="w-[20%]">Last Updated</TableHead>
            <TableHead className="w-[10%] text-right">Status</TableHead>
            <TableHead className="w-[10%] text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {documents.map((document) => (
            <TableRow key={document.id} className="hover:bg-muted/20">
              <TableCell>
                <div className="flex items-center gap-2">
                  {getDocumentIcon(document.type)}
                  <span>{document.name}</span>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  {getDocumentTypeLabel(document.type)}
                </div>
              </TableCell>
              <TableCell>
                <div className="flex flex-col">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Clock className="mr-1 h-3 w-3" />
                    {format(new Date(document.createdAt), 'MMM d, yyyy h:mm a')}
                  </div>
                  <div className="flex items-center text-xs text-muted-foreground">
                    <User className="mr-1 h-3 w-3" />
                    {document.creator.name}
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex flex-col">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Clock className="mr-1 h-3 w-3" />
                    {format(new Date(document.updatedAt), 'MMM d, yyyy h:mm a')}
                  </div>
                  <div className="flex items-center text-xs text-muted-foreground">
                    <User className="mr-1 h-3 w-3" />
                    {document.lastUpdatedBy.name}
                  </div>
                </div>
              </TableCell>
              <TableCell className="text-right">
                {getStatusBadge(document.status)}
              </TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-7 w-7">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem className="flex items-center">
                      <Pencil className="mr-2 h-4 w-4" />
                      Edit Document
                    </DropdownMenuItem>
                    <DropdownMenuItem className="flex items-center">
                      <ExternalLink className="mr-2 h-4 w-4" />
                      View Details
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="flex items-center">
                      <FileText className="mr-2 h-4 w-4" />
                      Download Data
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default DocumentList;
