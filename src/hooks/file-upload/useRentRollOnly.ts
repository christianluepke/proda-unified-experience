
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from "@/components/ui/use-toast";

/**
 * Hook for simplified rent roll only uploads
 */
export function useRentRollOnly() {
  const navigate = useNavigate();

  const handleRentRollOnly = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length === 1) {
      // Create a temporary file ID for rent roll
      const rentRollId = `rr-${Math.random().toString(36).substring(2, 9)}`;
      
      // Start the upload animation
      const file = acceptedFiles[0];
      toast({
        title: "Processing Rent Roll",
        description: `Uploading ${file.name}...`,
      });

      // Simulate upload process
      let progress = 0;
      const interval = setInterval(() => {
        progress += 20;
        if (progress >= 100) {
          clearInterval(interval);
          toast({
            title: "Upload Complete",
            description: "Redirecting to table selection...",
          });
          
          // Navigate to select table page after "upload"
          setTimeout(() => {
            navigate(`/select-table/${rentRollId}`);
          }, 500);
        }
      }, 200);
      
      return true;
    }
    
    return false;
  }, [navigate]);

  return {
    handleRentRollOnly
  };
}
