import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import { Button, buttonVariants } from '@/components/ui/button';
import Link from 'next/link';

export default function Home() {
  return (
    <MaxWidthWrapper>
      <div className="py-20 mx-auto text-center flex flex-col items-center max-w-3xl">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
          Digi <span className="text-green-600">Plaza</span>
        </h1>
        <p className="mt-4 text-lg max-w-prose text-muted-foreground">
          Discover a curated digital marketplace offering innovative solutions
          and captivating digital art – your one-stop destination for all things
          digital excellence.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 mt-6">
          <Link href="/products" className={buttonVariants()}>
            Browse Trending
          </Link>
          <Button variant="ghost">Our qaulity promise &rarr;</Button>
        </div>
      </div>
    </MaxWidthWrapper>
  );
}
