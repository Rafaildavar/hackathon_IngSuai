import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FileText, Download, Clock, CheckCircle2, XCircle, Loader2 } from "lucide-react";
import { format } from "date-fns";
import type { ProcessingTask } from "@shared/schema";

export default function HistoryPage() {
  const { data: tasks, isLoading } = useQuery<ProcessingTask[]>({
    queryKey: ["/api/tasks"],
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle2 className="h-5 w-5 text-accent" />;
      case "failed":
        return <XCircle className="h-5 w-5 text-destructive" />;
      case "processing":
        return <Loader2 className="h-5 w-5 text-primary animate-spin" />;
      default:
        return <Clock className="h-5 w-5 text-muted-foreground" />;
    }
  };

  const getStatusVariant = (status: string): "default" | "secondary" | "destructive" | "outline" => {
    switch (status) {
      case "completed":
        return "default";
      case "failed":
        return "destructive";
      case "processing":
        return "secondary";
      default:
        return "outline";
    }
  };

  const handleDownload = async (taskId: string) => {
    try {
      const response = await fetch(`/api/download/${taskId}`, {
        credentials: "same-origin",
      });

      if (!response.ok) {
        throw new Error("Download failed");
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `processed_${taskId}.zip`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error("Download error:", error);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-1 p-6 md:p-8 lg:p-12">
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="space-y-4">
            <h1 className="text-4xl font-bold">Task History</h1>
            <p className="text-xl text-muted-foreground">
              View all your document processing tasks
            </p>
          </div>

          {isLoading && (
            <div className="flex justify-center items-center min-h-[400px]">
              <Loader2 className="h-12 w-12 animate-spin text-primary" />
            </div>
          )}

          {!isLoading && (!tasks || tasks.length === 0) && (
            <Card className="border-2 border-dashed">
              <CardContent className="flex flex-col items-center justify-center min-h-[400px] text-center">
                <FileText className="h-16 w-16 text-muted-foreground mb-4" />
                <h3 className="text-2xl font-semibold mb-2">No tasks yet</h3>
                <p className="text-muted-foreground mb-6">
                  Start by uploading some documents to process
                </p>
                <Button asChild data-testid="button-upload-first">
                  <a href="/upload">Upload Documents</a>
                </Button>
              </CardContent>
            </Card>
          )}

          {tasks && tasks.length > 0 && (
            <div className="grid gap-6">
              {tasks.map((task) => (
                <Card key={task.id} className="hover-elevate transition-all">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-4">
                        <div className="mt-1">
                          {getStatusIcon(task.status)}
                        </div>
                        <div className="flex-1">
                          <CardTitle className="flex items-center gap-3">
                            <span>
                              {task.originalFileName || `Task ${task.id.slice(0, 8)}`}
                            </span>
                            <Badge variant={getStatusVariant(task.status)}>
                              {task.status}
                            </Badge>
                          </CardTitle>
                          <CardDescription className="mt-2">
                            {task.fileCount} {task.fileCount === 1 ? "file" : "files"} •{" "}
                            Created {format(new Date(task.createdAt), "PPp")}
                          </CardDescription>
                        </div>
                      </div>
                      {task.status === "completed" && (
                        <Button
                          onClick={() => handleDownload(task.id)}
                          variant="outline"
                          size="sm"
                          data-testid={`button-download-${task.id}`}
                        >
                          <Download className="h-4 w-4 mr-2" />
                          Download
                        </Button>
                      )}
                    </div>
                  </CardHeader>
                  {task.status === "processing" && (
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Progress</span>
                          <span>{task.progress}%</span>
                        </div>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <div
                            className="h-full bg-accent transition-all duration-300"
                            style={{ width: `${task.progress}%` }}
                          />
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Processing {task.processedCount} of {task.fileCount} files
                        </p>
                      </div>
                    </CardContent>
                  )}
                  {task.error && (
                    <CardContent>
                      <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
                        <p className="text-sm text-destructive font-medium">
                          Error: {task.error}
                        </p>
                      </div>
                    </CardContent>
                  )}
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
