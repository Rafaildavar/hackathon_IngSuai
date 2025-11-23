import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function LoadingSkeleton() {
  return (
    <Card className="p-6 md:p-8">
      <div className="flex items-start gap-4">
        <Skeleton className="h-6 w-6 rounded-full flex-shrink-0 mt-1" />
        
        <div className="flex-1 space-y-4">
          <div className="space-y-2">
            <Skeleton className="h-5 w-48" />
            <Skeleton className="h-4 w-64" />
          </div>
          
          <Skeleton className="h-2 w-full" />
          
          <div className="flex items-center gap-2">
            <Skeleton className="h-6 w-24" />
            <Skeleton className="h-6 w-16" />
          </div>
        </div>
      </div>
    </Card>
  );
}
