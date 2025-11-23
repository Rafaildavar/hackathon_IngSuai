import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload, Zap, Download, Shield, FileText, Image } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative flex items-center justify-center min-h-[600px] bg-gradient-to-br from-primary via-primary/90 to-primary/80 text-primary-foreground overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:32px_32px]" />
        <div className="relative z-10 max-w-5xl mx-auto px-6 py-20 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-in fade-in slide-in-from-bottom-4 duration-1000">
            AI-Powered Document Processing
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-primary-foreground/90 max-w-3xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-150">
            Transform your documents instantly with advanced AI technology. Upload images, PDFs, and ZIP archives for intelligent processing.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-300">
            <Button 
              asChild 
              size="lg" 
              variant="secondary" 
              className="text-lg px-8 h-14"
              data-testid="button-get-started"
            >
              <Link href="/upload">
                <Upload className="mr-2 h-5 w-5" />
                Get Started
              </Link>
            </Button>
            <Button 
              asChild 
              size="lg" 
              variant="outline" 
              className="text-lg px-8 h-14 bg-primary-foreground/10 hover:bg-primary-foreground/20 border-primary-foreground/30 backdrop-blur-sm"
              data-testid="button-view-api"
            >
              <Link href="/api">
                <FileText className="mr-2 h-5 w-5" />
                View API Docs
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 bg-background">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Powerful Features</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Everything you need for efficient document processing in one platform
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-2 hover-elevate transition-all">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Zap className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Lightning Fast</CardTitle>
                <CardDescription>
                  Process documents in seconds with our optimized AI engine
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-2 hover-elevate transition-all">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                  <Image className="h-6 w-6 text-accent" />
                </div>
                <CardTitle>Multi-Format Support</CardTitle>
                <CardDescription>
                  Works with images (JPG, PNG, GIF), PDFs, and ZIP archives
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-2 hover-elevate transition-all">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Download className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Batch Processing</CardTitle>
                <CardDescription>
                  Upload multiple files at once and download results as ZIP
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-2 hover-elevate transition-all">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6 text-accent" />
                </div>
                <CardTitle>Secure Processing</CardTitle>
                <CardDescription>
                  Your documents are processed securely and deleted after download
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-2 hover-elevate transition-all">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <FileText className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>RESTful API</CardTitle>
                <CardDescription>
                  Full API access with Swagger documentation for integration
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-2 hover-elevate transition-all">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                  <Upload className="h-6 w-6 text-accent" />
                </div>
                <CardTitle>Drag & Drop</CardTitle>
                <CardDescription>
                  Intuitive interface with drag-and-drop file upload support
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-6 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-5xl font-bold text-primary mb-2">50MB</div>
              <p className="text-lg text-muted-foreground">Maximum File Size</p>
            </div>
            <div>
              <div className="text-5xl font-bold text-accent mb-2">3</div>
              <p className="text-lg text-muted-foreground">Supported Formats</p>
            </div>
            <div>
              <div className="text-5xl font-bold text-primary mb-2">100%</div>
              <p className="text-lg text-muted-foreground">Open Source</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-accent text-accent-foreground">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Transform Your Documents?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Start processing your files in seconds with our AI-powered platform
          </p>
          <Button 
            asChild 
            size="lg" 
            variant="secondary" 
            className="text-lg px-8 h-14"
            data-testid="button-start-processing"
          >
            <Link href="/upload">
              <Upload className="mr-2 h-5 w-5" />
              Start Processing Now
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
