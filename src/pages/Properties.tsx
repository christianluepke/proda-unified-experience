
import React, { useState } from 'react';
import { useProperties } from '@/hooks/useProperties';
import { Button } from '@/components/ui/button';
import { GridIcon, ListIcon, SearchIcon } from 'lucide-react';
import { Input } from '@/components/ui/input';
import PropertyList from '@/components/properties/PropertyList';
import PropertiesGrid from '@/components/properties/PropertiesGrid';
import ColumnSelector from '@/components/properties/ColumnSelector';

const Properties = () => {
  const { properties, columns, toggleColumnVisibility, deleteProperty } = useProperties();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Filter properties based on search query
  const filteredProperties = properties.filter(property => {
    if (!searchQuery) return true;
    
    const searchLower = searchQuery.toLowerCase();
    return (
      property.name.toLowerCase().includes(searchLower) ||
      (property.projectName?.toLowerCase().includes(searchLower)) ||
      (property.portfolioName?.toLowerCase().includes(searchLower)) ||
      property.city.toLowerCase().includes(searchLower) ||
      (property.assetType?.toLowerCase().includes(searchLower))
    );
  });
  
  return (
    <div className="container mx-auto py-8 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-3xl font-bold">Properties</h1>
        <div className="flex items-center gap-2">
          <Button
            variant={viewMode === 'grid' ? 'default' : 'outline'}
            size="icon"
            onClick={() => setViewMode('grid')}
            className="h-9 w-9"
          >
            <GridIcon className="h-5 w-5" />
          </Button>
          <Button
            variant={viewMode === 'list' ? 'default' : 'outline'}
            size="icon"
            onClick={() => setViewMode('list')}
            className="h-9 w-9"
          >
            <ListIcon className="h-5 w-5" />
          </Button>
          {viewMode === 'list' && (
            <ColumnSelector 
              columns={columns}
              toggleColumnVisibility={toggleColumnVisibility}
            />
          )}
        </div>
      </div>
      
      <div className="flex items-center border rounded-md px-3 py-2 w-full sm:w-96">
        <SearchIcon className="h-4 w-4 text-muted-foreground mr-2" />
        <Input 
          placeholder="Search properties..." 
          className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0 p-0"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      
      <div className="mb-4">
        <p className="text-muted-foreground">
          {filteredProperties.length} {filteredProperties.length === 1 ? 'property' : 'properties'} found
        </p>
      </div>
      
      {viewMode === 'grid' ? (
        <PropertiesGrid 
          properties={filteredProperties} 
          onDelete={deleteProperty} 
        />
      ) : (
        <PropertyList 
          properties={filteredProperties} 
          columns={columns} 
          onDelete={deleteProperty} 
        />
      )}
    </div>
  );
};

export default Properties;
