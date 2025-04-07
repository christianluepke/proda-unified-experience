
import React from 'react';
import { 
  Upload, 
  FolderOpen, 
  Building2, 
  FileText, 
  FileSpreadsheet, 
  Map, 
  Bot, 
  HelpCircle, 
  Settings,
  Briefcase,
  ShieldCheck
} from 'lucide-react';
import { SidebarItemType } from './types';

// Define sidebar navigation items
export const sidebarItems: SidebarItemType[] = [
  { 
    label: 'Upload', 
    icon: Upload, 
    path: '/upload',
    section: null
  },
  { 
    label: 'Manage',
    icon: null,
    path: null,
    section: true
  },
  { 
    label: 'Files', 
    icon: FolderOpen, 
    path: '/files'
  },
  { 
    label: 'Projects', 
    icon: Briefcase, 
    path: '/projects'
  },
  { 
    label: 'Properties', 
    icon: Building2, 
    path: '/properties'
  },
  { 
    label: 'Analyse',
    icon: null,
    path: null,
    section: true
  },
  { 
    label: 'Rent Rolls', 
    icon: FileText, 
    path: '/rent-rolls'
  },
  { 
    label: 'Operating Statements', 
    icon: FileSpreadsheet, 
    path: '/operating-statements'
  },
  { 
    label: 'Explorer', 
    icon: Map, 
    path: '/explorer'
  },
  { 
    label: 'PRODA Assistant', 
    icon: Bot, 
    path: '/assistant'
  },
  { 
    label: 'Audit',
    icon: null,
    path: null,
    section: true
  },
  { 
    label: 'Data Governance', 
    icon: ShieldCheck, 
    path: '/data-governance',
    dividerAfter: true
  },
  { 
    label: 'Get Help', 
    icon: HelpCircle, 
    path: '/help'
  },
  { 
    label: 'Settings', 
    icon: Settings, 
    path: '/settings'
  }
];
