
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
    <div className="w-full max-w-[95%] 2xl:max-w-[90%] mx-auto py-10">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Properties</h1>
        <div className="flex items-center space-x-3">
          <div className="relative w-48">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <SearchIcon className="h-4 w-4 text-muted-foreground" />
            </div>
            <Input
              className="pl-10"
              placeholder="Search properties..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
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
