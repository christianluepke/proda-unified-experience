
import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define access levels
export type AccessLevel = 'full' | 'rent_roll_only';

// Define context type
interface FeatureAccessContextType {
  accessLevel: AccessLevel;
  setAccessLevel: (level: AccessLevel) => void;
  hasAccess: (feature: 'operating_statement' | 'rent_roll') => boolean;
}

// Create context with default values
const FeatureAccessContext = createContext<FeatureAccessContextType>({
  accessLevel: 'full',
  setAccessLevel: () => {},
  hasAccess: () => true,
});

export const useFeatureAccess = () => useContext(FeatureAccessContext);

interface FeatureAccessProviderProps {
  children: ReactNode;
}

export const FeatureAccessProvider: React.FC<FeatureAccessProviderProps> = ({ children }) => {
  const [accessLevel, setAccessLevel] = useState<AccessLevel>('full');

  // Check if user has access to a specific feature
  const hasAccess = (feature: 'operating_statement' | 'rent_roll'): boolean => {
    if (accessLevel === 'full') return true;
    if (accessLevel === 'rent_roll_only' && feature === 'rent_roll') return true;
    return false;
  };

  return (
    <FeatureAccessContext.Provider value={{ accessLevel, setAccessLevel, hasAccess }}>
      {children}
    </FeatureAccessContext.Provider>
  );
};
