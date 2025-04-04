
import { useCallback } from 'react';

/**
 * Hook for simulating file upload progress
 */
export function useFileProgress(
  setFiles: (updater: (prevFiles: any[]) => any[]) => void
) {
  const simulateProgress = useCallback((file: File) => {
    const reader = new FileReader();

    reader.onabort = () => console.log('file reading was aborted');
    reader.onerror = () => console.log('file reading has failed');
    reader.onload = () => {
      let progress = 0;
      const interval = setInterval(() => {
        progress += 10;
        setFiles(prevFiles =>
          prevFiles.map(f =>
            f.file === file ? { ...f, progress: Math.min(progress, 100) } : f
          )
        );

        if (progress >= 100) {
          clearInterval(interval);
          setFiles(prevFiles =>
            prevFiles.map(f =>
              f.file === file ? { ...f, status: 'success' as const, progress: 100 } : f
            )
          );
          setTimeout(() => {
            setFiles(prevFiles =>
              prevFiles.map(f =>
                f.file === file ? { ...f, progress: 0 } : f
              )
            );
          }, 2000);
        }
      }, 200);
    };
    reader.readAsArrayBuffer(file);
  }, [setFiles]);

  return {
    simulateProgress
  };
}
