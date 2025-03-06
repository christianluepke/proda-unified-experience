
import React from 'react';
import { LayoutGrid, List } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ViewMode } from '@/hooks/useProjects';

interface ViewSelectorProps {
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
}

const ViewSelector: React.FC<ViewSelectorProps> = ({ viewMode, setViewMode }) => {
  return (
    <div className="flex items-center space-x-2 border rounded-md">
      <Button
        variant={viewMode === 'cards' ? 'default' : 'ghost'}
        size="sm"
        className="rounded-r-none"
        onClick={() => setViewMode('cards')}
      >
        <LayoutGrid className="h-4 w-4 mr-1" /> Cards
      </Button>
      <Button
        variant={viewMode === 'list' ? 'default' : 'ghost'}
        size="sm"
        className="rounded-l-none"
        onClick={() => setViewMode('list')}
      >
        <List className="h-4 w-4 mr-1" /> List
      </Button>
    </div>
  );
};

export default ViewSelector;
