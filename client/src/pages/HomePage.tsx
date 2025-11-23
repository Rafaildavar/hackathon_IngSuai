import { useState, useCallback } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Header } from "@/components/Header";
import { UploadZone } from "@/components/UploadZone";
import { FilePreview } from "@/components/FilePreview";
import { ProcessingStatus } from "@/components/ProcessingStatus";
import { DownloadSection } from "@/components/DownloadSection";
import { LoadingSkeleton } from "@/components/LoadingSkeleton";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import type { ProcessingTask } from "@shared/schema";

export default function HomePage() {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [taskId, setTaskId] = useState<string | null>(null);
  const { toast } = useToast();

  const handleFilesSelected = useCallback((files: File[]) => {
    const validFiles = files.filter((file) => {
      const isImage = file.type.startsWith("image/");
      const isPdf = file.type === "application/pdf";
      const isZip = file.type.includes("zip");
      return isImage || isPdf || isZip;
    });

    if (validFiles.length !== files.length) {
      toast({
        title: "Some files were skipped",
        description: "Only images, PDF, and ZIP files are supported.",
        variant: "destructive",
      });
    }

    setSelectedFiles((prev) => [...prev, ...validFiles]);
  }, [toast]);

  const handleRemoveFile = useCallback((index: number) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
  }, []);

  const uploadMutation = useMutation({
    mutationFn: async (files: File[]) => {
      const formData = new FormData();
      files.forEach((file) => {
        formData.append("files", file);
      });
      
      const response = await apiRequest("POST", "/api/upload", formData);
      return await response.json() as { taskId: string };
    },
    onSuccess: (data) => {
      setTaskId(data.taskId);
      setSelectedFiles([]); // Clear selected files after successful upload
      toast({
        title: "Upload successful",
        description: "Your files are being processed...",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Upload failed",
        description: error.message || "Failed to upload files. Please try again.",
        variant: "destructive",
      });
    },
  });

  const { data: taskStatus, isLoading: isLoadingStatus, error: statusError, isPlaceholderData } = useQuery<ProcessingTask>({
    queryKey: ["/api/status", taskId],
    enabled: !!taskId,
    refetchInterval: (query) => {
      const data = query.state.data;
      if (data?.status === "completed" || data?.status === "error") {
        return false;
      }
      return 1000;
    },
    placeholderData: (previousData) => previousData, // Keep previous data during refetch to prevent flicker
    staleTime: 0, // Always fetch fresh data
    gcTime: 5 * 60 * 1000, // Keep in cache for 5 minutes
  });

  const handleUpload = useCallback(() => {
    if (selectedFiles.length === 0) {
      toast({
        title: "No files selected",
        description: "Please select at least one file to upload.",
        variant: "destructive",
      });
      return;
    }
    uploadMutation.mutate(selectedFiles);
  }, [selectedFiles, uploadMutation, toast]);

  const handleDownload = useCallback(async () => {
    if (!taskId) return;
    
    try {
      const response = await fetch(`/api/download/${taskId}`);
      if (!response.ok) throw new Error("Download failed");
      
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `processed_${taskId}.zip`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      
      toast({
        title: "Download complete",
        description: "Your processed files have been downloaded.",
      });
    } catch (error) {
      toast({
        title: "Download failed",
        description: "Failed to download files. Please try again.",
        variant: "destructive",
      });
    }
  }, [taskId, toast]);

  const handleReset = useCallback(() => {
    setSelectedFiles([]);
    setTaskId(null);
  }, []);

  const isUploading = uploadMutation.isPending;
  const isProcessing = taskStatus && taskStatus.status !== "completed" && taskStatus.status !== "error";
  const isCompleted = taskStatus?.status === "completed";
  const hasError = taskStatus?.status === "error";

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="max-w-6xl mx-auto px-6 md:px-12 py-8 md:py-12">
        <div className="space-y-8">
          {!taskId ? (
            <>
              <UploadZone
                onFilesSelected={handleFilesSelected}
                disabled={isUploading}
              />
              
              {selectedFiles.length > 0 && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold text-foreground">
                      Selected Files ({selectedFiles.length})
                    </h2>
                    <Button
                      variant="outline"
                      onClick={() => setSelectedFiles([])}
                      disabled={isUploading}
                      data-testid="button-clear-all"
                    >
                      Clear All
                    </Button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {selectedFiles.map((file, index) => (
                      <FilePreview
                        key={`${file.name}-${index}`}
                        file={file}
                        onRemove={() => handleRemoveFile(index)}
                      />
                    ))}
                  </div>
                  
                  <div className="flex justify-center pt-4">
                    <Button
                      onClick={handleUpload}
                      disabled={isUploading}
                      className="bg-primary hover:bg-primary/90 text-primary-foreground px-12 py-6 text-lg min-h-12"
                      data-testid="button-upload"
                    >
                      {isUploading ? "Uploading..." : "Start Processing"}
                    </Button>
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="space-y-6">
              {statusError && (
                <div className="p-6 bg-destructive/10 border border-destructive/20 rounded-lg">
                  <p className="text-destructive font-semibold">Failed to load task status</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    {statusError instanceof Error ? statusError.message : 'Unknown error'}
                  </p>
                </div>
              )}
              
              {isLoadingStatus && !statusError && (
                <LoadingSkeleton />
              )}
              
              {taskStatus && (isProcessing || hasError) && (
                <ProcessingStatus
                  status={taskStatus.status as any}
                  progress={taskStatus.progress}
                  processedCount={taskStatus.processedCount}
                  totalCount={taskStatus.fileCount}
                  error={taskStatus.error || undefined}
                />
              )}
              
              {taskStatus && isCompleted && (
                <DownloadSection
                  taskId={taskId}
                  fileCount={taskStatus.fileCount}
                  onDownload={handleDownload}
                  onReset={handleReset}
                />
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
