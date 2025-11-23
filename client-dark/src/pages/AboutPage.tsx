import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Upload, Cpu, Download, FileText, Image as ImageIcon, Archive, Zap, Lock, Share2 } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-background via-background to-background/80">
      <div className="flex-1 p-6 md:p-8 lg:p-12">
        <div className="max-w-6xl mx-auto space-y-16">
          <div className="space-y-4">
            <h1 className="text-5xl md:text-6xl font-bold text-foreground">About This Project</h1>
            <p className="text-xl text-muted-foreground">
              Learn how our document processor works and what makes it special
            </p>
          </div>

          {/* How It Works */}
          <section className="space-y-8">
            <h2 className="text-4xl font-bold">How It Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="border-0 glass card-shadow hover-elevate transition-smooth">
                <CardHeader>
                  <div className="h-16 w-16 rounded-2xl bg-primary flex items-center justify-center mb-4">
                    <Upload className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle>1. Upload Files</CardTitle>
                  <CardDescription>
                    Drag and drop or click to select your documents. Supports images (JPG, PNG, GIF, WebP), PDFs, and ZIP archives up to 50MB.
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="border-0 glass card-shadow hover-elevate transition-smooth">
                <CardHeader>
                  <div className="h-16 w-16 rounded-2xl bg-accent flex items-center justify-center mb-4">
                    <Cpu className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle>2. AI Processing</CardTitle>
                  <CardDescription>
                    Our advanced AI engine analyzes and processes your documents with real-time progress tracking and status updates.
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="border-0 glass card-shadow hover-elevate transition-smooth">
                <CardHeader>
                  <div className="h-16 w-16 rounded-2xl bg-secondary flex items-center justify-center mb-4">
                    <Download className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle>3. Download Results</CardTitle>
                  <CardDescription>
                    Once processing is complete, download your results as a convenient ZIP file containing all processed documents.
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>
          </section>

          {/* Supported Formats */}
          <section className="space-y-8">
            <h2 className="text-4xl font-bold">Supported File Formats</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="border-0 glass card-shadow">
                <CardHeader>
                  <ImageIcon className="h-8 w-8 text-accent mb-3" />
                  <CardTitle>Images</CardTitle>
                  <CardDescription>
                    <ul className="list-disc list-inside space-y-1 mt-2 text-sm">
                      <li>JPEG (.jpg, .jpeg)</li>
                      <li>PNG (.png)</li>
                      <li>GIF (.gif)</li>
                      <li>WebP (.webp)</li>
                    </ul>
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="border-0 glass card-shadow">
                <CardHeader>
                  <FileText className="h-8 w-8 text-secondary mb-3" />
                  <CardTitle>Documents</CardTitle>
                  <CardDescription>
                    <ul className="list-disc list-inside space-y-1 mt-2 text-sm">
                      <li>PDF (.pdf)</li>
                      <li>More formats coming soon</li>
                    </ul>
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="border-0 glass card-shadow">
                <CardHeader>
                  <Archive className="h-8 w-8 text-primary mb-3" />
                  <CardTitle>Archives</CardTitle>
                  <CardDescription>
                    <ul className="list-disc list-inside space-y-1 mt-2 text-sm">
                      <li>ZIP (.zip)</li>
                      <li>Batch processing</li>
                    </ul>
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>
          </section>

          {/* FAQ */}
          <section className="space-y-8">
            <h2 className="text-4xl font-bold">Frequently Asked Questions</h2>
            <Accordion type="single" collapsible className="w-full space-y-4">
              <Card className="border-0 glass card-shadow">
                <AccordionItem value="item-1" className="p-0">
                  <AccordionTrigger className="p-6 hover:no-underline">
                    <span className="font-semibold text-lg">What is the maximum file size?</span>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-6">
                    The maximum file size for uploads is 50MB. This applies to individual files as well as the total size when uploading multiple files.
                  </AccordionContent>
                </AccordionItem>
              </Card>

              <Card className="border-0 glass card-shadow">
                <AccordionItem value="item-2" className="p-0">
                  <AccordionTrigger className="p-6 hover:no-underline">
                    <span className="font-semibold text-lg">How many files can I upload at once?</span>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-6">
                    You can upload multiple files in a single batch. The system will process them all together and provide a single ZIP file with all results.
                  </AccordionContent>
                </AccordionItem>
              </Card>

              <Card className="border-0 glass card-shadow">
                <AccordionItem value="item-3" className="p-0">
                  <AccordionTrigger className="p-6 hover:no-underline">
                    <span className="font-semibold text-lg">How long does processing take?</span>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-6">
                    Processing time depends on the number and size of files. Typically, most documents are processed within 30-60 seconds. You can track progress in real-time on the upload page.
                  </AccordionContent>
                </AccordionItem>
              </Card>

              <Card className="border-0 glass card-shadow">
                <AccordionItem value="item-4" className="p-0">
                  <AccordionTrigger className="p-6 hover:no-underline">
                    <span className="font-semibold text-lg">Are my files secure?</span>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-6">
                    Yes! Files are processed securely on our servers and are automatically cleaned up after download. We do not store your documents permanently.
                  </AccordionContent>
                </AccordionItem>
              </Card>

              <Card className="border-0 glass card-shadow">
                <AccordionItem value="item-5" className="p-0">
                  <AccordionTrigger className="p-6 hover:no-underline">
                    <span className="font-semibold text-lg">Can I use the API programmatically?</span>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-6">
                    Absolutely! We provide a full RESTful API with comprehensive documentation. Check out the API Documentation page for details on all available endpoints and integration examples.
                  </AccordionContent>
                </AccordionItem>
              </Card>
            </Accordion>
          </section>

          {/* Technology Stack */}
          <section className="space-y-8">
            <h2 className="text-4xl font-bold">Technology Stack</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="border-0 glass card-shadow">
                <CardHeader>
                  <h3 className="font-bold text-xl mb-4">Frontend</h3>
                  <ul className="space-y-2 text-muted-foreground text-sm">
                    <li>✨ React 18 with TypeScript</li>
                    <li>⚡ Vite for fast development</li>
                    <li>🎨 TanStack Query for state</li>
                    <li>🧩 Shadcn UI components</li>
                    <li>🎯 Tailwind CSS styling</li>
                  </ul>
                </CardHeader>
              </Card>
              <Card className="border-0 glass card-shadow">
                <CardHeader>
                  <h3 className="font-bold text-xl mb-4">Backend</h3>
                  <ul className="space-y-2 text-muted-foreground text-sm">
                    <li>🚀 Node.js with Express</li>
                    <li>📦 TypeScript for safety</li>
                    <li>📤 Multer for uploads</li>
                    <li>📦 Archiver for ZIP</li>
                    <li>🔌 REST API design</li>
                  </ul>
                </CardHeader>
              </Card>
            </div>
          </section>

          {/* Hackathon Info */}
          <section className="space-y-6">
            <h2 className="text-4xl font-bold">About Hackathon</h2>
            <Card className="border-0 glass card-shadow">
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <p className="text-lg">
                    This project was created for <span className="font-bold">Hackathon_Ing_SUAI</span>
                  </p>
                  <p className="text-muted-foreground">
                    A modern, fully functional document processing application showcasing cutting-edge web development practices, beautiful UI design, and practical AI integration. Built with TypeScript, React, and Express for maximum reliability and scalability.
                  </p>
                  <div className="flex gap-4 pt-4">
                    <div className="flex items-center gap-2 text-accent font-semibold">
                      <Zap className="h-5 w-5" />
                      Performance
                    </div>
                    <div className="flex items-center gap-2 text-primary font-semibold">
                      <Lock className="h-5 w-5" />
                      Security
                    </div>
                    <div className="flex items-center gap-2 text-secondary font-semibold">
                      <Share2 className="h-5 w-5" />
                      Open Source
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>
        </div>
      </div>
    </div>
  );
}
