import { X, FileImage, FileText, FolderArchive, File } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface FilePreviewProps {
  file: File;
  onRemove: () => void;
}

function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
}

function getFileIcon(fileType: string) {
  if (fileType.startsWith('image/')) {
    return <FileImage className="h-8 w-8 text-accent" />;
  } else if (fileType === 'application/pdf') {
    return <FileText className="h-8 w-8 text-destructive" />;
  } else if (fileType.includes('zip')) {
    return <FolderArchive className="h-8 w-8 text-primary" />;
  }
  return <File className="h-8 w-8 text-muted-foreground" />;
}

export function FilePreview({ file, onRemove }: FilePreviewProps) {
  return (
    <Card className="relative p-4 hover-elevate" data-testid={`file-preview-${file.name}`}>
      <Button
        size="icon"
        variant="ghost"
        onClick={onRemove}
        className="absolute top-2 right-2 h-7 w-7 text-muted-foreground hover:text-destructive z-10"
        data-testid={`button-remove-${file.name}`}
      >
        <X className="h-4 w-4" />
      </Button>
      
      <div className="flex items-start gap-3">
        <div className="flex items-center justify-center h-16 w-16 rounded-lg bg-muted flex-shrink-0">
          {getFileIcon(file.type)}
        </div>
        
        <div className="flex-1 min-w-0 pt-1">
          <p className="text-sm font-semibold text-foreground truncate pr-8" title={file.name}>
            {file.name}
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            {formatFileSize(file.size)}
          </p>
        </div>
      </div>
    </Card>
  );
}
