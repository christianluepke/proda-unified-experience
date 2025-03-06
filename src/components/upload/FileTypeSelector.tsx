
import React from 'react';

interface FileType {
  id: string;
  name: string;
}

interface FileTypeSelectorProps {
  fileTypes: FileType[];
  selectedFileType: string | null;
  onChange: (fileType: string) => void;
  label: string;
  description: string;
}

const FileTypeSelector: React.FC<FileTypeSelectorProps> = ({
  fileTypes,
  selectedFileType,
  onChange,
  label,
  description,
}) => {
  return (
    <div>
      <h2 className="text-lg font-medium mb-3">{label}</h2>
      <p className="text-sm text-muted-foreground mb-3">
        {description}
      </p>
      <select
        id="fileType"
        className="w-full pl-3 pr-10 py-2 text-base border border-input bg-background rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary sm:text-sm"
        defaultValue=""
        onChange={(e) => onChange(e.target.value)}
        value={selectedFileType || ""}
      >
        <option value="" disabled>Select a default file type</option>
        {fileTypes.map(type => (
          <option key={type.id} value={type.id}>{type.name}</option>
        ))}
      </select>
    </div>
  );
};

export default FileTypeSelector;
