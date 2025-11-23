import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Upload, Cpu, Download, FileText, Image as ImageIcon, Archive } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-1 p-6 md:p-8 lg:p-12">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="space-y-4">
            <h1 className="text-4xl font-bold">About Document Processor</h1>
            <p className="text-xl text-muted-foreground">
              Learn how our AI-powered document processing system works
            </p>
          </div>

          {/* How It Works */}
          <section className="space-y-6">
            <h2 className="text-3xl font-bold">How It Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="border-2">
                <CardHeader>
                  <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <Upload className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>1. Upload Files</CardTitle>
                  <CardDescription>
                    Drag and drop or click to select your documents. Supports images (JPG, PNG, GIF, WebP), PDFs, and ZIP archives up to 50MB.
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="border-2">
                <CardHeader>
                  <div className="h-12 w-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                    <Cpu className="h-6 w-6 text-accent" />
                  </div>
                  <CardTitle>2. AI Processing</CardTitle>
                  <CardDescription>
                    Our advanced AI engine analyzes and processes your documents with real-time progress tracking and status updates.
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="border-2">
                <CardHeader>
                  <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <Download className="h-6 w-6 text-primary" />
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
          <section className="space-y-6">
            <h2 className="text-3xl font-bold">Supported File Formats</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <ImageIcon className="h-8 w-8 text-primary mb-2" />
                  <CardTitle>Images</CardTitle>
                  <CardDescription>
                    <ul className="list-disc list-inside space-y-1 mt-2">
                      <li>JPEG (.jpg, .jpeg)</li>
                      <li>PNG (.png)</li>
                      <li>GIF (.gif)</li>
                      <li>WebP (.webp)</li>
                    </ul>
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card>
                <CardHeader>
                  <FileText className="h-8 w-8 text-accent mb-2" />
                  <CardTitle>Documents</CardTitle>
                  <CardDescription>
                    <ul className="list-disc list-inside space-y-1 mt-2">
                      <li>PDF (.pdf)</li>
                    </ul>
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card>
                <CardHeader>
                  <Archive className="h-8 w-8 text-primary mb-2" />
                  <CardTitle>Archives</CardTitle>
                  <CardDescription>
                    <ul className="list-disc list-inside space-y-1 mt-2">
                      <li>ZIP (.zip)</li>
                    </ul>
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>
          </section>

          {/* FAQ */}
          <section className="space-y-6">
            <h2 className="text-3xl font-bold">Frequently Asked Questions</h2>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>What is the maximum file size?</AccordionTrigger>
                <AccordionContent>
                  The maximum file size for uploads is 50MB. This applies to individual files as well as the total size when uploading multiple files.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2">
                <AccordionTrigger>How many files can I upload at once?</AccordionTrigger>
                <AccordionContent>
                  You can upload multiple files in a single batch. The system will process them all together and provide a single ZIP file with all results.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3">
                <AccordionTrigger>How long does processing take?</AccordionTrigger>
                <AccordionContent>
                  Processing time depends on the number and size of files. Typically, most documents are processed within 30-60 seconds. You can track progress in real-time on the upload page.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4">
                <AccordionTrigger>Are my files secure?</AccordionTrigger>
                <AccordionContent>
                  Yes! Files are processed securely on our servers and are automatically cleaned up after download. We do not store your documents permanently.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-5">
                <AccordionTrigger>Can I use the API programmatically?</AccordionTrigger>
                <AccordionContent>
                  Absolutely! We provide a full RESTful API with comprehensive documentation. Check out the API Documentation page for details on all available endpoints and integration examples.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-6">
                <AccordionTrigger>What happens if processing fails?</AccordionTrigger>
                <AccordionContent>
                  If processing fails, you'll see an error message explaining what went wrong. Common issues include unsupported file formats or corrupted files. You can try uploading again or contact support if the problem persists.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </section>

          {/* Technology Stack */}
          <section className="space-y-6">
            <h2 className="text-3xl font-bold">Technology Stack</h2>
            <Card className="border-2">
              <CardContent className="pt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold mb-3 text-lg">Frontend</h3>
                    <ul className="space-y-2 text-muted-foreground">
                      <li>• React with TypeScript</li>
                      <li>• Vite for fast development</li>
                      <li>• TanStack Query for state management</li>
                      <li>• Shadcn UI component library</li>
                      <li>• Tailwind CSS for styling</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-3 text-lg">Backend</h3>
                    <ul className="space-y-2 text-muted-foreground">
                      <li>• Node.js with Express</li>
                      <li>• TypeScript for type safety</li>
                      <li>• Multer for file uploads</li>
                      <li>• Archiver for ZIP creation</li>
                      <li>• RESTful API design</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Contact */}
          <section className="space-y-6">
            <h2 className="text-3xl font-bold">Contact & Support</h2>
            <Card className="border-2 bg-muted/30">
              <CardContent className="pt-6">
                <div className="text-center space-y-4">
                  <p className="text-lg">
                    This project was created for <strong>Hackathon_Ing_SUAI</strong>
                  </p>
                  <p className="text-muted-foreground">
                    For questions, feedback, or support, please contact the development team.
                  </p>
                </div>
              </CardContent>
            </Card>
          </section>
        </div>
      </div>
    </div>
  );
}
