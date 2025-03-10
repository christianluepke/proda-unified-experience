
import React from 'react';
import { DatabaseIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Database } from '@/components/sidebar/types';

interface DatabaseSelectorDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  databases: Database[];
  selectedDatabase: string;
  setSelectedDatabase: (databaseId: string) => void;
}

const DatabaseSelectorDialog: React.FC<DatabaseSelectorDialogProps> = ({
  open,
  setOpen,
  databases,
  selectedDatabase,
  setSelectedDatabase,
}) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Select Database</DialogTitle>
          <DialogDescription>
            Choose which database to upload these files to
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-4">
          <RadioGroup 
            value={selectedDatabase} 
            onValueChange={setSelectedDatabase}
            className="space-y-2"
          >
            {databases.map(db => (
              <div key={db.id} className="flex items-center space-x-2 p-2 border rounded-md hover:bg-muted">
                <RadioGroupItem value={db.id} id={`db-${db.id}`} />
                <label htmlFor={`db-${db.id}`} className="flex items-center gap-2 text-sm cursor-pointer flex-grow">
                  <DatabaseIcon className="h-4 w-4 text-muted-foreground" />
                  {db.name}
                </label>
              </div>
            ))}
          </RadioGroup>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={() => setOpen(false)}>
            Confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DatabaseSelectorDialog;
