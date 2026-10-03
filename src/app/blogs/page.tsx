import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ClosingCta } from "@/components/sites/cogentlabs-co-edeb5c95/root-8a5edab2/ClosingCta";
import { SiteFooter } from "@/components/sites/cogentlabs-co-edeb5c95/root-8a5edab2/SiteFooter";
import { SiteHeader } from "@/components/sites/cogentlabs-co-edeb5c95/root-8a5edab2/SiteHeader";
import { blogCategories, filterPosts, getFeaturedPost } from "@/lib/blogs";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Working notes on AI, SaaS product development, and shipping systems that hold up in real workflows.",
};

type BlogsPageProps = {
  searchParams: Promise<{ category?: string }>;
};

export default async function BlogsPage({ searchParams }: BlogsPageProps) {
  const { category: categoryParam } = await searchParams;
  const activeCategory = blogCategories.some((category) => category.id === categoryParam)
    ? categoryParam
    : "all";
  const posts = filterPosts(activeCategory);
  const showFeatured = activeCategory === "all" || activeCategory === getFeaturedPost().category;
  const featured = showFeatured ? posts.find((post) => post.featured) ?? null : null;
  const listed = featured
    ? posts.filter((post) => post.slug !== featured.slug)
    : posts;

  return (
    <main>
      <SiteHeader />
      <div className="border-b border-border bg-[#f8f7f3]">
        <div className="mx-auto max-w-3xl px-5 pb-24 pt-36 sm:px-6 sm:pt-44 lg:px-8">
          <header>
            <p className="eyebrow text-[#f47820]">Blog</p>
            <h1 className="mt-3 text-[2.5rem] font-semibold leading-[1.08] tracking-tight sm:text-5xl">
              Field Notes
            </h1>
            <p className="mt-4 max-w-xl text-lg leading-relaxed text-muted-foreground">
              Working notes on AI, SaaS product loops, and putting autonomous systems to work inside real business workflows.
            </p>
          </header>

          <div className="mt-10 border-b border-border pb-6">
            <nav aria-label="Blog categories" className="flex flex-wrap gap-3">
              {blogCategories.map((category) => {
                const isActive = activeCategory === category.id;
                const href = category.id === "all" ? "/blogs" : `/blogs?category=${category.id}`;
                return (
                  <Link
                    key={category.id}
                    href={href}
                    className={cn(
                      "inline-block px-4 py-1.5 font-mono text-[11px] font-medium uppercase tracking-[0.2em] transition-colors duration-200",
                      isActive
                        ? "bg-[#f47820] text-[#111111]"
                        : "text-muted-foreground hover:text-[#f47820]",
                    )}
                  >
                    {category.label}
                  </Link>
                );
              })}
            </nav>
          </div>

          {featured ? (
            <div className="border-b border-border py-10">
              <Link href={`/blogs/${featured.slug}`} className="group block">
                <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl border border-border">
                  <Image
                    src={featured.image}
                    alt={featured.title}
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw, 768px"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                  />
                </div>
                <div className="mt-6">
                  <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.18em]">
                    <span className="text-[#f47820]">Featured</span>
                    <span className="text-border">/</span>
                    <span className="text-muted-foreground">{featured.categoryLabel}</span>
                  </div>
                  <h2 className="mt-3 text-2xl font-semibold leading-tight tracking-tight transition-colors duration-200 group-hover:text-[#f47820] sm:text-3xl">
                    {featured.title}
                  </h2>
                  <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted-foreground">
                    {featured.excerpt}
                  </p>
                  <div className="mt-4 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                    <span className="text-foreground">{featured.author.name}</span>
                    <span className="text-border">/</span>
                    <span>{featured.dateLabel}</span>
                  </div>
                </div>
              </Link>
            </div>
          ) : null}

          <div>
            {listed.map((post) => (
              <Link
                key={post.slug}
                href={`/blogs/${post.slug}`}
                className="group grid grid-cols-1 items-start gap-5 border-b border-border/70 py-8 sm:grid-cols-[1fr_auto] sm:gap-10"
              >
                <div className="min-w-0">
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-medium">{post.author.name}</span>
                  </div>
                  <h3 className="mt-2 text-xl font-semibold leading-snug transition-colors duration-200 group-hover:text-[#f47820] sm:text-[1.375rem]">
                    {post.title}
                  </h3>
                  <p className="mt-2 line-clamp-2 text-[0.95rem] leading-relaxed text-muted-foreground">
                    {post.excerpt}
                  </p>
                  <div className="mt-4 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                    <span className="text-[#f47820]">{post.categoryLabel}</span>
                    <span className="text-border">/</span>
                    <span>{post.shortDateLabel}</span>
                  </div>
                </div>
                <div className="relative h-28 w-28 shrink-0 overflow-hidden rounded-lg border border-border sm:h-32 sm:w-32">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    sizes="128px"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
      <ClosingCta />
      <SiteFooter />
    </main>
  );
}
