import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload, Zap, Download, Shield, FileText, Image, ArrowRight, Sparkles, Rocket } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background overflow-hidden">
      {/* Animated gradient background */}
      <div className="fixed inset-0 -z-10 opacity-30 dark:opacity-20">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary rounded-full blur-3xl animate-pulse-glow"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '1s' }}></div>
      </div>

      {/* Hero Section - Modern Design */}
      <section className="relative flex items-center justify-center min-h-[700px] pt-20 pb-12 px-6 overflow-hidden">
        {/* Gradient mesh background */}
        <div className="absolute inset-0 -z-5">
          <div className="absolute top-0 left-0 w-full h-full gradient-mesh opacity-80"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-5xl mx-auto text-center space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-light border-0 backdrop-blur-md">
            <Sparkles className="h-4 w-4 text-accent" />
            <span className="text-sm font-medium text-foreground">AI-Powered Document Processing</span>
          </div>

          {/* Main Heading */}
          <div className="space-y-4">
            <h1 className="text-6xl md:text-7xl font-bold tracking-tight text-white drop-shadow-xl animate-in fade-in slide-in-from-bottom-8 duration-1000">
              Transform Documents
              <br />
              <span className="bg-gradient-to-r from-accent via-emerald-400 to-teal-400 bg-clip-text text-transparent">
                Instantly
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto font-light leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
              Upload images, PDFs, and ZIP archives. Let AI do the heavy lifting. Download your results in seconds.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-400">
            <Button
              asChild
              size="lg"
              className="h-14 px-8 text-lg font-semibold bg-white text-primary hover:bg-white/95 shadow-lg hover:shadow-xl transition-all"
              data-testid="button-get-started"
            >
              <Link href="/upload">
                <Upload className="mr-2 h-5 w-5" />
                Start Processing
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="h-14 px-8 text-lg font-semibold bg-white/10 hover:bg-white/20 border-white/30 text-white backdrop-blur-sm transition-all"
              data-testid="button-view-api"
            >
              <Link href="/api">
                <FileText className="mr-2 h-5 w-5" />
                API Docs
              </Link>
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 pt-12 max-w-2xl mx-auto">
            <div className="space-y-2">
              <div className="text-3xl font-bold text-white">50MB</div>
              <p className="text-sm text-white/70">Max File Size</p>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-white">100%</div>
              <p className="text-sm text-white/70">Open Source</p>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-white">&lt;1s</div>
              <p className="text-sm text-white/70">Processing</p>
            </div>
          </div>
        </div>

        {/* Floating cards decoration */}
        <div className="absolute top-20 right-10 w-40 h-40 glass rounded-2xl p-6 animate-float opacity-60 hidden lg:block">
          <div className="h-full bg-gradient-to-br from-accent/20 to-accent/10 rounded-lg flex items-center justify-center">
            <Zap className="h-8 w-8 text-accent" />
          </div>
        </div>
        <div className="absolute bottom-20 left-10 w-40 h-40 glass rounded-2xl p-6 animate-float-slow opacity-60 hidden lg:block" style={{ animationDelay: '1s' }}>
          <div className="h-full bg-gradient-to-br from-emerald-400/20 to-emerald-400/10 rounded-lg flex items-center justify-center">
            <Download className="h-8 w-8 text-accent" />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-6 bg-background relative">
        <div className="max-w-6xl mx-auto space-y-16">
          {/* Section Header */}
          <div className="text-center space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20">
              <Rocket className="h-4 w-4 text-accent" />
              <span className="text-sm font-medium text-accent">Features</span>
            </div>
            <h2 className="text-5xl font-bold">Everything You Need</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              A complete solution for modern document processing
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Zap,
                title: "Lightning Fast",
                description: "Process documents in seconds with our optimized AI engine",
                color: "from-primary/20 to-primary/10",
                iconColor: "text-primary"
              },
              {
                icon: Image,
                title: "Multi-Format Support",
                description: "Works with images (JPG, PNG, GIF), PDFs, and ZIP archives",
                color: "from-accent/20 to-accent/10",
                iconColor: "text-accent"
              },
              {
                icon: Download,
                title: "Batch Processing",
                description: "Upload multiple files at once and download results as ZIP",
                color: "from-primary/20 to-primary/10",
                iconColor: "text-primary"
              },
              {
                icon: Shield,
                title: "Secure Processing",
                description: "Your documents are processed securely and deleted after download",
                color: "from-accent/20 to-accent/10",
                iconColor: "text-accent"
              },
              {
                icon: FileText,
                title: "RESTful API",
                description: "Full API access with Swagger documentation for integration",
                color: "from-primary/20 to-primary/10",
                iconColor: "text-primary"
              },
              {
                icon: Upload,
                title: "Drag & Drop",
                description: "Intuitive interface with drag-and-drop file upload support",
                color: "from-accent/20 to-accent/10",
                iconColor: "text-accent"
              },
            ].map((feature, idx) => (
              <Card key={idx} className="group glass card-shadow border-0 hover-elevate transition-smooth">
                <CardHeader>
                  <div className={`h-14 w-14 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <feature.icon className={`h-7 w-7 ${feature.iconColor}`} />
                  </div>
                  <CardTitle>{feature.title}</CardTitle>
                  <CardDescription>{feature.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 bg-gradient-to-br from-primary/5 to-accent/5 relative overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary rounded-full blur-3xl opacity-20"></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-8">
          <h2 className="text-5xl font-bold">Ready to Get Started?</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Join thousands of users who are transforming their document workflows with AI
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
            <Button
              asChild
              size="lg"
              className="h-14 px-8 text-lg font-semibold bg-accent hover:bg-accent/90 text-accent-foreground shadow-lg hover:shadow-xl transition-all"
              data-testid="button-start-now"
            >
              <Link href="/upload">
                <Rocket className="mr-2 h-5 w-5" />
                Start Processing
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="h-14 px-8 text-lg font-semibold"
              data-testid="button-learn-more"
            >
              <Link href="/about">Learn More</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-background py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="font-semibold mb-4">Hackathon_Ing_SUAI</h3>
              <p className="text-sm text-muted-foreground">AI-powered document processing platform</p>
            </div>
            <div>
              <h4 className="font-medium text-sm mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/upload" className="hover:text-foreground">Upload</Link></li>
                <li><Link href="/api" className="hover:text-foreground">API</Link></li>
                <li><Link href="/history" className="hover:text-foreground">History</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-sm mb-4">Resources</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/about" className="hover:text-foreground">About</Link></li>
                <li><Link href="/api" className="hover:text-foreground">Documentation</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-sm mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground">Privacy</a></li>
                <li><a href="#" className="hover:text-foreground">Terms</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground">
            <p>&copy; 2025 Hackathon_Ing_SUAI. All rights reserved.</p>
            <p>Built with modern web technologies</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
