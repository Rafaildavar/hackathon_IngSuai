import { FileText } from "lucide-react";

export function Header() {
  return (
    <header className="bg-primary border-b border-primary-border">
      <div className="max-w-6xl mx-auto px-6 md:px-12 py-4 md:py-5">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-primary-foreground/10">
            <FileText className="h-6 w-6 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-xl md:text-2xl font-bold text-primary-foreground tracking-tight">
              Hackathon_Ing_SUAI
            </h1>
            <p className="text-sm text-primary-foreground/80 font-medium">
              AI Document Processor
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
