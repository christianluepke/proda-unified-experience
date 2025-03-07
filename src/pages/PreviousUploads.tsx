
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { File as LucideFile, ChevronLeft, Calendar, Building2, FileText } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';

interface UploadRecord {
  id: string;
  fileName: string;
  fileType: 'rent_roll' | 'operating_statement' | 'other';
  uploadDate: string;
  project: string;
  status: 'success' | 'error' | 'processing';
  fileSize: string;
}

const MOCK_UPLOADS: UploadRecord[] = [
  {
    id: '1',
    fileName: 'rent-roll-2023-q1.xlsx',
    fileType: 'rent_roll',
    uploadDate: '2023-04-15',
    project: 'Project A',
    status: 'success',
    fileSize: '2.4 MB'
  },
  {
    id: '2',
    fileName: 'property-valuation.pdf',
    fileType: 'other',
    uploadDate: '2023-03-22',
    project: 'Project B',
    status: 'success',
    fileSize: '5.1 MB'
  },
  {
    id: '3',
    fileName: 'operating-statement-2023.xlsx',
    fileType: 'operating_statement',
    uploadDate: '2023-05-10',
    project: 'Project A',
    status: 'processing',
    fileSize: '1.8 MB'
  },
  {
    id: '4',
    fileName: 'property-photos.zip',
    fileType: 'other',
    uploadDate: '2023-02-28',
    project: 'Project C',
    status: 'error',
    fileSize: '18.7 MB'
  }
];

const getStatusBadge = (status: UploadRecord['status']) => {
  switch (status) {
    case 'success':
      return <Badge variant="secondary" className="bg-green-100 text-green-800 hover:bg-green-200">Success</Badge>;
    case 'error':
      return <Badge variant="secondary" className="bg-red-100 text-red-800 hover:bg-red-200">Error</Badge>;
    case 'processing':
      return <Badge variant="secondary" className="bg-blue-100 text-blue-800 hover:bg-blue-200">Processing</Badge>;
    default:
      return null;
  }
};

const getFileTypeName = (fileType: UploadRecord['fileType']) => {
  switch (fileType) {
    case 'rent_roll':
      return 'Rent Roll';
    case 'operating_statement':
      return 'Operating Statement';
    default:
      return 'Other';
  }
};

const PreviousUploads: React.FC = () => {
  return (
    <div className="container mx-auto py-8">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Link to="/upload">
            <Button variant="ghost" size="sm" className="gap-1">
              <ChevronLeft className="h-4 w-4" />
              Back to Upload
            </Button>
          </Link>
          <h1 className="text-2xl font-bold">Previous Uploads</h1>
        </div>
        <Link to="/upload">
          <Button>Upload New Files</Button>
        </Link>
      </div>

      <div className="w-full rounded-md border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[30%]">File Name</TableHead>
              <TableHead className="w-[15%]">Date</TableHead>
              <TableHead className="w-[15%]">Project</TableHead>
              <TableHead className="w-[15%]">File Type</TableHead>
              <TableHead className="w-[15%]">Status</TableHead>
              <TableHead className="w-[10%]">Size</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {MOCK_UPLOADS.map(upload => (
              <TableRow key={upload.id}>
                <TableCell className="flex items-center gap-3">
                  <LucideFile className="h-5 w-5 text-muted-foreground shrink-0" />
                  <span className="font-medium">{upload.fileName}</span>
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3.5 w-3.5 shrink-0" />
                    <span>{upload.uploadDate}</span>
                  </div>
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Building2 className="h-3.5 w-3.5 shrink-0" />
                    <span>{upload.project}</span>
                  </div>
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <FileText className="h-3.5 w-3.5 shrink-0" />
                    <span>{getFileTypeName(upload.fileType)}</span>
                  </div>
                </TableCell>
                <TableCell>
                  {getStatusBadge(upload.status)}
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">
                  {upload.fileSize}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default PreviousUploads;
