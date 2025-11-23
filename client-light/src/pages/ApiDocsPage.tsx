import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Code, FileText, Copy, CheckCircle2 } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";

export default function ApiDocsPage() {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-background via-background to-background/80">
      <div className="flex-1 p-6 md:p-8 lg:p-12">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="space-y-4">
            <h1 className="text-5xl md:text-6xl font-bold text-foreground">API Documentation</h1>
            <p className="text-xl text-muted-foreground">
              Complete REST API reference with interactive examples
            </p>
          </div>

          <Card className="border-0 glass card-shadow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2 text-2xl">
                    <FileText className="h-6 w-6 text-accent" />
                    Interactive API Explorer
                  </CardTitle>
                  <CardDescription>
                    Test endpoints directly from your browser
                  </CardDescription>
                </div>
                <Button asChild variant="outline" data-testid="button-open-swagger">
                  <a href="/api-docs" target="_blank" rel="noopener noreferrer" className="gap-2">
                    <ExternalLink className="h-5 w-5" />
                    Open Full Docs
                  </a>
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="aspect-video bg-gradient-to-br from-primary/10 to-accent/10 rounded-xl flex items-center justify-center border border-primary/20">
                <div className="text-center space-y-4">
                  <Code className="h-16 w-16 mx-auto text-muted-foreground" />
                  <div>
                    <p className="text-lg font-bold">Swagger UI</p>
                    <p className="text-sm text-muted-foreground">
                      Interactive API documentation available
                    </p>
                  </div>
                  <Button asChild className="bg-primary hover:bg-primary/90 text-white" data-testid="button-view-swagger">
                    <a href="/api-docs" target="_blank" rel="noopener noreferrer">
                      View Swagger Documentation
                    </a>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-8">
            <h2 className="text-4xl font-bold">API Endpoints</h2>

            <Tabs defaultValue="upload" className="w-full">
              <TabsList className="grid w-full grid-cols-3 bg-muted/50">
                <TabsTrigger value="upload">Upload</TabsTrigger>
                <TabsTrigger value="status">Status</TabsTrigger>
                <TabsTrigger value="download">Download</TabsTrigger>
              </TabsList>

              <TabsContent value="upload" className="space-y-6 mt-6">
                <Card className="border-0 glass card-shadow">
                  <CardHeader>
                    <CardTitle className="font-mono text-lg text-primary">
                      POST /api/upload
                    </CardTitle>
                    <CardDescription>
                      Upload files for AI processing
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <h4 className="font-bold mb-3 text-foreground">Request</h4>
                      <div className="relative">
                        <pre className="bg-muted/50 p-4 rounded-lg overflow-x-auto text-sm">{`Content-Type: multipart/form-data

files: File[] (images, PDFs, or ZIP archives)`}</pre>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="absolute top-2 right-2"
                          onClick={() => copyToClipboard("Content-Type: multipart/form-data\n\nfiles: File[]", "req-upload")}
                        >
                          {copiedCode === "req-upload" ? <CheckCircle2 className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                        </Button>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-bold mb-3 text-foreground">Response</h4>
                      <div className="relative">
                        <pre className="bg-muted/50 p-4 rounded-lg overflow-x-auto text-sm">{`{
  "taskId": "uuid-string",
  "message": "Files uploaded successfully"
}`}</pre>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="absolute top-2 right-2"
                          onClick={() => copyToClipboard('{\n  "taskId": "uuid-string",\n  "message": "Files uploaded successfully"\n}', "res-upload")}
                        >
                          {copiedCode === "res-upload" ? <CheckCircle2 className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                        </Button>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-bold mb-3 text-foreground">Example (curl)</h4>
                      <div className="relative">
                        <pre className="bg-muted/50 p-4 rounded-lg overflow-x-auto text-sm">{`curl -X POST http://localhost:5000/api/upload \\
  -F "files=@document.pdf" \\
  -F "files=@image.jpg"`}</pre>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="absolute top-2 right-2"
                          onClick={() => copyToClipboard('curl -X POST http://localhost:5000/api/upload \\\n  -F "files=@document.pdf" \\\n  -F "files=@image.jpg"', "curl-upload")}
                        >
                          {copiedCode === "curl-upload" ? <CheckCircle2 className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="status" className="space-y-6 mt-6">
                <Card className="border-0 glass card-shadow">
                  <CardHeader>
                    <CardTitle className="font-mono text-lg text-primary">
                      GET /api/status/:taskId
                    </CardTitle>
                    <CardDescription>
                      Get processing status for a task
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <h4 className="font-bold mb-3 text-foreground">Parameters</h4>
                      <pre className="bg-muted/50 p-4 rounded-lg text-sm">{`taskId: string (UUID from upload response)`}</pre>
                    </div>
                    <div>
                      <h4 className="font-bold mb-3 text-foreground">Response</h4>
                      <div className="relative">
                        <pre className="bg-muted/50 p-4 rounded-lg overflow-x-auto text-sm">{`{
  "id": "uuid-string",
  "status": "processing" | "completed" | "failed",
  "progress": 75,
  "fileCount": 3,
  "processedCount": 2,
  "createdAt": "2025-11-23T22:00:00Z",
  "error": null
}`}</pre>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="absolute top-2 right-2"
                          onClick={() => copyToClipboard('curl http://localhost:5000/api/status/your-task-id', "curl-status")}
                        >
                          {copiedCode === "curl-status" ? <CheckCircle2 className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="download" className="space-y-6 mt-6">
                <Card className="border-0 glass card-shadow">
                  <CardHeader>
                    <CardTitle className="font-mono text-lg text-primary">
                      GET /api/download/:taskId
                    </CardTitle>
                    <CardDescription>
                      Download processed files as ZIP
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <h4 className="font-bold mb-3 text-foreground">Parameters</h4>
                      <pre className="bg-muted/50 p-4 rounded-lg text-sm">{`taskId: string (UUID from upload response)`}</pre>
                    </div>
                    <div>
                      <h4 className="font-bold mb-3 text-foreground">Example (curl)</h4>
                      <div className="relative">
                        <pre className="bg-muted/50 p-4 rounded-lg text-sm">{`curl -O -J http://localhost:5000/api/download/your-task-id`}</pre>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="absolute top-2 right-2"
                          onClick={() => copyToClipboard('curl -O -J http://localhost:5000/api/download/your-task-id', "curl-download")}
                        >
                          {copiedCode === "curl-download" ? <CheckCircle2 className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                        </Button>
                      </div>
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
