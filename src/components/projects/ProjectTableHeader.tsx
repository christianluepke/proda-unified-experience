
import React from 'react';
import { TableHeader, TableRow, TableHead } from "@/components/ui/table";

const ProjectTableHeader: React.FC = () => {
  return (
    <TableHeader>
      <TableRow className="bg-muted/50">
        <TableHead className="w-[15%] min-w-[150px]">Project Name</TableHead>
        <TableHead className="w-[8%] min-w-[80px]">Property Count</TableHead>
        <TableHead className="w-[10%] min-w-[120px]">Portfolio</TableHead>
        <TableHead className="w-[10%] min-w-[120px]">Asset Class</TableHead>
        <TableHead className="w-[8%] min-w-[100px]">Total Units</TableHead>
        <TableHead className="w-[10%] min-w-[120px]">Status</TableHead>
        <TableHead className="w-[10%] min-w-[120px]">Date Added</TableHead>
        <TableHead className="w-[10%] min-w-[120px]">Created By</TableHead>
        <TableHead className="w-[13%] min-w-[150px]">Project Owner</TableHead>
        <TableHead className="w-[6%] min-w-[80px]">Actions</TableHead>
      </TableRow>
    </TableHeader>
  );
};

export default ProjectTableHeader;
