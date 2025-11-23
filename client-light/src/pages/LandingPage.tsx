import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload, Zap, Download, Shield, FileText, Image, ArrowRight, Sparkles, Rocket, Lightbulb, Clock, Layers } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background overflow-hidden">
      {/* Animated gradient orbs */}
      <div className="fixed inset-0 -z-10 opacity-40 dark:opacity-30">
        <div className="absolute top-0 right-1/3 w-96 h-96 bg-accent rounded-full blur-3xl animate-pulse-glow"></div>
        <div className="absolute bottom-1/3 left-1/4 w-80 h-80 bg-primary rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '1.5s' }}></div>
        <div className="absolute top-1/2 right-0 w-72 h-72 bg-secondary rounded-full blur-3xl opacity-50 animate-pulse-glow" style={{ animationDelay: '0.75s' }}></div>
      </div>

      {/* Hero Section */}
      <section className="relative flex items-center justify-center min-h-[750px] pt-20 pb-12 px-6 overflow-hidden">
        <div className="relative z-10 max-w-6xl mx-auto text-center space-y-8 w-full">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-5 py-3 rounded-full glass border-0">
            <Sparkles className="h-5 w-5 text-accent animate-pulse" />
            <span className="text-sm font-semibold text-foreground">Next-Gen Document Processing</span>
          </div>

          {/* Main Heading */}
          <div className="space-y-6">
            <h1 className="text-7xl md:text-8xl font-bold tracking-tight text-foreground leading-tight animate-in fade-in slide-in-from-bottom-8 duration-1000">
              Transform Your
              <br />
              <span className="bg-gradient-to-r from-accent via-secondary to-primary bg-clip-text text-transparent">
                Documents
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto font-normal leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
              Upload, process, download. It's that simple. Powered by advanced AI technology with a beautiful interface.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-400">
            <Button
              asChild
              size="lg"
              className="h-14 px-8 text-base font-semibold bg-primary hover:bg-primary/90 text-white shadow-lg hover:shadow-xl transition-all"
              data-testid="button-get-started"
            >
              <Link href="/upload">
                <Upload className="mr-2 h-5 w-5" />
                Start Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="h-14 px-8 text-base font-semibold"
              data-testid="button-view-api"
            >
              <Link href="/api">
                <FileText className="mr-2 h-5 w-5" />
                API Docs
              </Link>
            </Button>
          </div>

          {/* Feature Pills */}
          <div className="grid grid-cols-3 gap-4 pt-12 max-w-3xl mx-auto">
            <div className="p-4 rounded-2xl glass group hover-elevate transition-smooth">
              <div className="text-lg font-bold text-accent mb-1">50MB</div>
              <p className="text-xs text-muted-foreground">Max per file</p>
            </div>
            <div className="p-4 rounded-2xl glass group hover-elevate transition-smooth">
              <div className="text-lg font-bold text-secondary mb-1">3 Formats</div>
              <p className="text-xs text-muted-foreground">Images, PDF, ZIP</p>
            </div>
            <div className="p-4 rounded-2xl glass group hover-elevate transition-smooth">
              <div className="text-lg font-bold text-primary mb-1">Real-time</div>
              <p className="text-xs text-muted-foreground">Live progress</p>
            </div>
          </div>
        </div>

        {/* Floating cards */}
        <div className="absolute top-32 right-12 w-48 h-48 glass rounded-3xl p-8 animate-float opacity-70 hidden lg:flex items-center justify-center">
          <Zap className="h-16 w-16 text-accent animate-pulse" />
        </div>
        <div className="absolute bottom-32 left-8 w-48 h-48 glass rounded-3xl p-8 animate-float opacity-70 hidden lg:flex items-center justify-center" style={{ animationDelay: '2s' }}>
          <Download className="h-16 w-16 text-secondary animate-pulse" style={{ animationDelay: '1s' }} />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-32 px-6 bg-background/50 relative">
        <div className="max-w-6xl mx-auto space-y-20">
          <div className="text-center space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20">
              <Rocket className="h-5 w-5 text-accent" />
              <span className="text-sm font-bold text-accent">CAPABILITIES</span>
            </div>
            <h2 className="text-6xl font-bold text-foreground">Powerful & Simple</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Everything you need to process documents efficiently
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Zap,
                title: "Lightning Fast",
                description: "Process documents in seconds with optimized AI",
                color: "bg-accent"
              },
              {
                icon: Image,
                title: "Multi-Format",
                description: "JPG, PNG, GIF, WebP, PDF, and ZIP archives",
                color: "bg-secondary"
              },
              {
                icon: Download,
                title: "Easy Download",
                description: "Get your results instantly as a ZIP file",
                color: "bg-primary"
              },
              {
                icon: Shield,
                title: "Secure",
                description: "Your files are deleted after processing",
                color: "bg-accent"
              },
              {
                icon: Lightbulb,
                title: "Smart API",
                description: "Full REST API with Swagger documentation",
                color: "bg-secondary"
              },
              {
                icon: Clock,
                title: "Real-time",
                description: "Track progress with live status updates",
                color: "bg-primary"
              },
            ].map((feature, idx) => (
              <Card key={idx} className="glass card-shadow border-0 group hover-elevate transition-smooth overflow-hidden">
                <CardHeader>
                  <div className={`h-16 w-16 rounded-2xl ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <feature.icon className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                  <CardDescription className="text-base">{feature.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Bold CTA Section */}
      <section className="py-32 px-6 relative overflow-hidden">
        <div className="absolute inset-0 gradient-bold opacity-10"></div>
        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-10">
          <div className="space-y-4">
            <h2 className="text-6xl font-bold text-foreground">Ready to Get Started?</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Join users who are transforming their workflows with modern AI
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              className="h-14 px-10 text-base font-semibold bg-accent hover:bg-accent/90 text-white shadow-lg hover:shadow-xl"
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
              className="h-14 px-10 text-base font-semibold bg-primary hover:bg-primary/90 text-white shadow-lg hover:shadow-xl"
              data-testid="button-explore"
            >
              <Link href="/about">
                <Layers className="mr-2 h-5 w-5" />
                Learn More
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-background/50 py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="font-bold text-lg mb-3">Hackathon_Ing_SUAI</h3>
              <p className="text-sm text-muted-foreground">Transform documents with AI</p>
            </div>
            <div>
              <h4 className="font-bold text-sm mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/upload" className="hover:text-foreground transition-colors">Upload</Link></li>
                <li><Link href="/api" className="hover:text-foreground transition-colors">API</Link></li>
                <li><Link href="/history" className="hover:text-foreground transition-colors">History</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-sm mb-4">Resources</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/about" className="hover:text-foreground transition-colors">About</Link></li>
                <li><Link href="/api" className="hover:text-foreground transition-colors">Documentation</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-sm mb-4">Social</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">GitHub</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Twitter</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground">
            <p>&copy; 2025 Hackathon_Ing_SUAI. All rights reserved.</p>
            <p>Built with modern technologies</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
