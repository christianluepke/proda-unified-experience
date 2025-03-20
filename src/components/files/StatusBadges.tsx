
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { ProcessingStatus } from './models';

export const getStatusBadge = (status: ProcessingStatus) => {
  switch (status) {
    case 'complete':
      return <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">Complete</Badge>;
    case 'processing':
      return <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-200">Processing</Badge>;
    case 'draft':
      return <Badge variant="outline" className="bg-amber-100 text-amber-800 border-amber-200">Draft</Badge>;
    case 'error':
      return <Badge variant="outline" className="bg-red-100 text-red-800 border-red-200">Error</Badge>;
    default:
      return null;
  }
};
