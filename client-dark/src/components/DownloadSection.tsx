import { Download, CheckCircle2, FileArchive } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface DownloadSectionProps {
  taskId: string;
  fileCount: number;
  onDownload: () => void;
  onReset: () => void;
  isDownloading?: boolean;
}

export function DownloadSection({
  taskId,
  fileCount,
  onDownload,
  onReset,
  isDownloading,
}: DownloadSectionProps) {
  return (
    <Card className="p-6 md:p-8 bg-accent/5 border-accent/20" data-testid="download-section">
      <div className="flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-8">
        <div className="flex items-center gap-4 flex-1">
          <div className="flex items-center justify-center h-12 w-12 rounded-full bg-accent/10">
            <CheckCircle2 className="h-6 w-6 text-accent" />
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-1">
              Your documents are ready!
            </h3>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <FileArchive className="h-4 w-4" />
              <span>{fileCount} {fileCount === 1 ? 'file' : 'files'} processed</span>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <Button
            onClick={onDownload}
            disabled={isDownloading}
            className="bg-accent hover:bg-accent/90 text-accent-foreground min-w-[140px]"
            data-testid="button-download"
          >
            {isDownloading ? (
              <>
                <Download className="h-4 w-4 mr-2 animate-pulse" />
                Downloading...
              </>
            ) : (
              <>
                <Download className="h-4 w-4 mr-2" />
                Download Results
              </>
            )}
          </Button>
          
          <Button
            onClick={onReset}
            variant="outline"
            className="min-w-[140px]"
            data-testid="button-reset"
          >
            Process More
          </Button>
        </div>
      </div>
    </Card>
  );
}
