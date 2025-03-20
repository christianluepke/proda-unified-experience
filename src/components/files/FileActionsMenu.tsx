
import React from 'react';
import { 
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator 
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { MoreVertical, PlusCircle, Download, Trash } from 'lucide-react';

interface FileActionsMenuProps {
  fileId: string;
  fileName: string;
  onDeleteFile: (fileId: string) => void;
}

const FileActionsMenu: React.FC<FileActionsMenuProps> = ({ 
  fileId, 
  fileName, 
  onDeleteFile 
}) => {
  const confirmDelete = () => {
    if (window.confirm(`Are you sure you want to delete "${fileName}"?`)) {
      onDeleteFile(fileId);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <MoreVertical className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem className="flex items-center">
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Extraction
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="flex items-center">
          <Download className="mr-2 h-4 w-4" />
          Download Original
        </DropdownMenuItem>
        <DropdownMenuItem className="flex items-center">
          <Download className="mr-2 h-4 w-4" />
          Download Processed
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem 
          className="flex items-center text-red-600 focus:text-red-600"
          onClick={confirmDelete}
        >
          <Trash className="mr-2 h-4 w-4" />
          Delete File
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default FileActionsMenu;
