
import { LucideIcon } from 'lucide-react';

export interface SidebarItemType {
  label: string;
  icon: LucideIcon | null;
  path: string | null;
  section?: boolean;
  dividerAfter?: boolean;
}

export interface SidebarProps {
  className?: string;
  collapsed?: boolean;
  onToggle?: () => void;
}
