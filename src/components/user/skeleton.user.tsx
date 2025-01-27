import { Separator } from '@radix-ui/react-dropdown-menu';
import { Skeleton } from '@/components/ui/skeleton';

export default function SkeletonUser() {
  return (
    <section>
      <header className="flex max-md:flex-col max-lg:justify-center items-center gap-4">
        <Skeleton className="size-64 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="w-48 h-8" />
          <Skeleton className="w-40 h-4" />
          <Skeleton className="w-40 h-4" />
        </div>
      </header>
      <Separator />
      <Skeleton className="w-full h-40 rounded-xl" />
    </section>
  );
}
