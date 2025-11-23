import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Code, FileText, Download } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function ApiDocsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-1 p-6 md:p-8 lg:p-12">
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="space-y-4">
            <h1 className="text-4xl font-bold">API Documentation</h1>
            <p className="text-xl text-muted-foreground">
              Complete reference for integrating with our document processing API
            </p>
          </div>

          {/* Swagger UI Embed */}
          <Card className="border-2">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    Interactive API Explorer
                  </CardTitle>
                  <CardDescription>
                    Try out API endpoints directly from your browser
                  </CardDescription>
                </div>
                <Button asChild variant="outline" data-testid="button-open-swagger">
                  <a href="/api-docs" target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Open Full Docs
                  </a>
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="aspect-video bg-muted rounded-lg flex items-center justify-center border-2 border-dashed">
                <div className="text-center space-y-4">
                  <Code className="h-16 w-16 mx-auto text-muted-foreground" />
                  <div>
                    <p className="text-lg font-medium">Swagger UI</p>
                    <p className="text-sm text-muted-foreground">
                      Interactive API documentation will be embedded here
                    </p>
                  </div>
                  <Button asChild data-testid="button-view-swagger">
                    <a href="/api-docs" target="_blank" rel="noopener noreferrer">
                      View Swagger Documentation
                    </a>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* API Endpoints */}
          <div className="space-y-6">
            <h2 className="text-3xl font-bold">Available Endpoints</h2>

            <Tabs defaultValue="upload">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="upload">Upload</TabsTrigger>
                <TabsTrigger value="status">Status</TabsTrigger>
                <TabsTrigger value="download">Download</TabsTrigger>
              </TabsList>

              <TabsContent value="upload" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="font-mono text-lg">
                      POST /api/upload
                    </CardTitle>
                    <CardDescription>
                      Upload files for AI processing
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2">Request</h4>
                      <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
                        <code>{`Content-Type: multipart/form-data

files: File[] (images, PDFs, or ZIP archives)
`}</code>
                      </pre>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Response</h4>
                      <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
                        <code>{`{
  "taskId": "uuid-string",
  "message": "Files uploaded successfully"
}`}</code>
                      </pre>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Example (curl)</h4>
                      <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
                        <code>{`curl -X POST http://localhost:5000/api/upload \\
  -F "files=@document.pdf" \\
  -F "files=@image.jpg"`}</code>
                      </pre>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="status" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="font-mono text-lg">
                      GET /api/status/:taskId
                    </CardTitle>
                    <CardDescription>
                      Get processing status for a task
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2">Parameters</h4>
                      <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
                        <code>{`taskId: string (UUID from upload response)`}</code>
                      </pre>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Response</h4>
                      <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
                        <code>{`{
  "id": "uuid-string",
  "status": "processing" | "completed" | "failed",
  "progress": 75,
  "fileCount": 3,
  "processedCount": 2,
  "createdAt": "2025-11-23T22:00:00Z",
  "error": null
}`}</code>
                      </pre>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Example (curl)</h4>
                      <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
                        <code>{`curl http://localhost:5000/api/status/your-task-id`}</code>
                      </pre>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="download" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="font-mono text-lg">
                      GET /api/download/:taskId
                    </CardTitle>
                    <CardDescription>
                      Download processed files as ZIP
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2">Parameters</h4>
                      <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
                        <code>{`taskId: string (UUID from upload response)`}</code>
                      </pre>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Response</h4>
                      <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
                        <code>{`Content-Type: application/zip
Content-Disposition: attachment; filename="processed_files.zip"

[Binary ZIP file data]`}</code>
                      </pre>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Example (curl)</h4>
                      <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
                        <code>{`curl -O -J http://localhost:5000/api/download/your-task-id`}</code>
                      </pre>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}
