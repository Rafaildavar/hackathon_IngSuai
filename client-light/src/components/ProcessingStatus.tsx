import { Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

interface ProcessingStatusProps {
  status: "pending" | "processing" | "completed" | "error";
  progress: number;
  processedCount: number;
  totalCount: number;
  error?: string;
}

export function ProcessingStatus({
  status,
  progress,
  processedCount,
  totalCount,
  error,
}: ProcessingStatusProps) {
  const getStatusIcon = () => {
    switch (status) {
      case "completed":
        return <CheckCircle2 className="h-6 w-6 text-accent" />;
      case "error":
        return <AlertCircle className="h-6 w-6 text-destructive" />;
      default:
        return <Loader2 className="h-6 w-6 text-primary animate-spin" />;
    }
  };

  const getStatusText = () => {
    switch (status) {
      case "completed":
        return "Processing Complete";
      case "error":
        return "Processing Failed";
      case "processing":
        return "AI processing documents...";
      default:
        return "Preparing documents...";
    }
  };

  const getStatusColor = () => {
    switch (status) {
      case "completed":
        return "bg-accent/10 border-accent/20";
      case "error":
        return "bg-destructive/10 border-destructive/20";
      default:
        return "bg-primary/5 border-primary/20";
    }
  };

  return (
    <Card className={`p-6 md:p-8 ${getStatusColor()}`} data-testid="processing-status">
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0 mt-1">{getStatusIcon()}</div>
        
        <div className="flex-1 space-y-4">
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-1">
              {getStatusText()}
            </h3>
            {error && (
              <p className="text-sm text-destructive mt-2" data-testid="text-error">
                {error}
              </p>
            )}
          </div>

          {status !== "error" && (
            <>
              <Progress value={progress} className="h-2" data-testid="progress-bar" />
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" data-testid="badge-progress">
                    {processedCount} of {totalCount} files
                  </Badge>
                  <Badge variant="outline" data-testid="badge-percentage">
                    {Math.round(progress)}%
                  </Badge>
                </div>
                
                {status === "processing" && (
                  <p className="text-xs text-muted-foreground">
                    This may take a few moments...
                  </p>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </Card>
  );
}
