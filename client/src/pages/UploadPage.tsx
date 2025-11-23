import { useState, useCallback } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { UploadZone } from "@/components/UploadZone";
import { FilePreview } from "@/components/FilePreview";
import { ProcessingStatus } from "@/components/ProcessingStatus";
import { DownloadSection } from "@/components/DownloadSection";
import { LoadingSkeleton } from "@/components/LoadingSkeleton";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import type { ProcessingTask } from "@shared/schema";

export default function UploadPage() {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [taskId, setTaskId] = useState<string | null>(null);
  const { toast } = useToast();

  const handleFilesSelected = useCallback((files: File[]) => {
    setSelectedFiles((prev) => [...prev, ...files]);
  }, []);

  const handleRemoveFile = useCallback((index: number) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
  }, []);

  const uploadMutation = useMutation({
    mutationFn: async (files: File[]) => {
      const formData = new FormData();
      files.forEach((file) => {
        formData.append("files", file);
      });

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
        credentials: "same-origin",
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Upload failed");
      }

      return response.json();
    },
    onSuccess: (data) => {
      setTaskId(data.taskId);
      setSelectedFiles([]);
      toast({
        title: "Upload successful",
        description: "Your files are being processed",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Upload failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const { data: task, isLoading } = useQuery<ProcessingTask>({
    queryKey: ["/api/status", taskId],
    enabled: !!taskId,
    refetchInterval: (query) => {
      const data = query.state.data;
      if (!data) return false;
      return data.status === "processing" ? 2000 : false;
    },
    placeholderData: (previousData) => previousData,
  });

  const handleUpload = () => {
    if (selectedFiles.length === 0) {
      toast({
        title: "No files selected",
        description: "Please select at least one file to upload",
        variant: "destructive",
      });
      return;
    }
    uploadMutation.mutate(selectedFiles);
  };

  const handleReset = () => {
    setTaskId(null);
    setSelectedFiles([]);
  };

  const isProcessing = task?.status === "processing";
  const isCompleted = task?.status === "completed";
  const hasError = task?.status === "failed";
  
  const mapStatus = (status: string): "pending" | "processing" | "completed" | "error" => {
    if (status === "failed") return "error";
    return status as "pending" | "processing" | "completed" | "error";
  };

  const handleDownload = async () => {
    if (!taskId) return;
    
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
      toast({
        title: "Download failed",
        description: error instanceof Error ? error.message : "Unknown error",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-1 p-6 md:p-8 lg:p-12">
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold">Upload & Process Documents</h1>
            <p className="text-xl text-muted-foreground">
              Upload your images, PDFs, or ZIP files for AI-powered processing
            </p>
          </div>

          {!taskId && (
            <>
              <UploadZone onFilesSelected={handleFilesSelected} />

              {selectedFiles.length > 0 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-semibold mb-4">
                      Selected Files ({selectedFiles.length})
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {selectedFiles.map((file, index) => (
                        <FilePreview
                          key={index}
                          file={file}
                          onRemove={() => handleRemoveFile(index)}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-center gap-4">
                    <Button
                      onClick={handleUpload}
                      disabled={uploadMutation.isPending}
                      size="lg"
                      className="px-8"
                      data-testid="button-upload"
                    >
                      {uploadMutation.isPending ? "Uploading..." : "Upload & Process"}
                    </Button>
                    <Button
                      onClick={() => setSelectedFiles([])}
                      variant="outline"
                      size="lg"
                      disabled={uploadMutation.isPending}
                      data-testid="button-clear"
                    >
                      Clear All
                    </Button>
                  </div>
                </div>
              )}
            </>
          )}

          {taskId && (
            <>
              {isLoading && !task && <LoadingSkeleton />}

              {task && (isProcessing || hasError) && (
                <ProcessingStatus
                  status={mapStatus(task.status)}
                  progress={task.progress}
                  totalCount={task.fileCount}
                  processedCount={task.processedCount}
                  error={task.error || undefined}
                />
              )}

              {isCompleted && task && (
                <DownloadSection
                  taskId={taskId}
                  fileCount={task.fileCount}
                  onDownload={handleDownload}
                  onReset={handleReset}
                />
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
