import { Upload, FileImage, FileText, FolderArchive } from "lucide-react";
import { useCallback, useState } from "react";
import { Card } from "@/components/ui/card";

interface UploadZoneProps {
  onFilesSelected: (files: File[]) => void;
  disabled?: boolean;
}

export function UploadZone({ onFilesSelected, disabled }: UploadZoneProps) {
  const [isDragging, setIsDragging] = useState(false);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      
      if (disabled) return;
      
      const files = Array.from(e.dataTransfer.files);
      if (files.length > 0) {
        onFilesSelected(files);
      }
    },
    [onFilesSelected, disabled]
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    if (!disabled) {
      setIsDragging(true);
    }
  }, [disabled]);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleFileInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (disabled) return;
      
      const files = Array.from(e.target.files || []);
      if (files.length > 0) {
        onFilesSelected(files);
      }
    },
    [onFilesSelected, disabled]
  );

  return (
    <Card
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      className={`
        relative overflow-hidden transition-all duration-200
        ${isDragging ? 'border-accent bg-accent/5 border-2' : 'border-dashed border-2'}
        ${disabled ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer hover-elevate'}
      `}
      data-testid="upload-zone"
    >
      <input
        type="file"
        multiple
        accept="image/*,.pdf,.zip"
        onChange={handleFileInput}
        disabled={disabled}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed z-10"
        data-testid="input-file"
      />
      
      <div className="p-12 md:p-16 flex flex-col items-center justify-center gap-6 min-h-[300px] md:min-h-[400px]">
        <div className={`
          transition-all duration-200
          ${isDragging ? 'scale-110 text-accent' : 'text-muted-foreground'}
        `}>
          <Upload className="h-20 w-20 md:h-24 md:w-24" strokeWidth={1.5} />
        </div>
        
        <div className="text-center space-y-3">
          <h3 className="text-xl md:text-2xl font-semibold text-foreground">
            {isDragging ? 'Drop your documents here' : 'Drag & drop your documents here'}
          </h3>
          <p className="text-sm md:text-base text-muted-foreground max-w-md">
            or click to browse • Supports Images, PDF, and ZIP files
          </p>
        </div>
        
        <div className="flex items-center gap-6 mt-2">
          <div className="flex items-center gap-2 text-muted-foreground">
            <FileImage className="h-5 w-5" />
            <span className="text-sm font-medium">Images</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <FileText className="h-5 w-5" />
            <span className="text-sm font-medium">PDF</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <FolderArchive className="h-5 w-5" />
            <span className="text-sm font-medium">ZIP</span>
          </div>
        </div>
      </div>
    </Card>
  );
}
