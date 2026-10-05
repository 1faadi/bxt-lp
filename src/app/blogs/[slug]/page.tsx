import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ClosingCta } from "@/components/sites/cogentlabs-co-edeb5c95/root-8a5edab2/ClosingCta";
import { ArrowLeftIcon } from "@/components/sites/cogentlabs-co-edeb5c95/root-8a5edab2/icons";
import { SiteFooter } from "@/components/sites/cogentlabs-co-edeb5c95/root-8a5edab2/SiteFooter";
import { SiteHeader } from "@/components/sites/cogentlabs-co-edeb5c95/root-8a5edab2/SiteHeader";
import { blogPosts, getBlogPost } from "@/lib/blogs";

export const dynamicParams = false;

export function generateStaticParams(): { slug: string }[] {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  return {
    title: post?.title ?? "Blog",
    description: post?.excerpt,
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  const initial = post.author.name.trim().charAt(0).toUpperCase();

  return (
    <main>
      <SiteHeader />
      <article className="border-b border-border bg-[#f8f7f3]">
        <div className="mx-auto max-w-3xl px-5 pb-24 pt-36 sm:px-6 sm:pt-44 lg:px-8">
          <Link
            href="/blogs"
            className="inline-flex items-center gap-2 font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:text-[#f47820]"
          >
            <ArrowLeftIcon className="size-3.5" />
            All Articles
          </Link>

          <p className="mt-8 font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-[#f47820]">
            {post.categoryLabel}
          </p>
          <h1 className="mt-4 text-[2.25rem] font-semibold leading-[1.1] tracking-tight sm:text-5xl">
            {post.title}
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            {post.excerpt}
          </p>

          <div className="mt-8 flex items-center gap-4">
            <div
              aria-hidden="true"
              className="flex size-10 items-center justify-center rounded-full bg-[#111111] text-sm font-semibold text-[#f8f7f3]"
            >
              {initial}
            </div>
            <div className="text-sm">
              <p className="font-medium">{post.author.name}</p>
              <p className="mt-0.5 text-muted-foreground">
                {post.dateLabel}
                <span className="mx-2 text-border">·</span>
                {post.readMinutes} min read
              </p>
            </div>
          </div>

          <div className="relative mt-10 aspect-[16/9] w-full overflow-hidden rounded-2xl border border-border">
            <Image
              src={post.image}
              alt={post.title}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 768px"
              className="object-cover"
            />
          </div>

          <div className="mt-14 space-y-12">
            {post.sections.map((section) => (
              <section key={section.heading}>
                <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                  {section.heading}
                </h2>
                <div className="mt-5 space-y-5">
                  {section.paragraphs.map((paragraph) => (
                    <p
                      key={paragraph.slice(0, 48)}
                      className="text-lg leading-[1.8] text-muted-foreground"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              </section>
            ))}
          </div>

          <div className="mt-20 border-t border-border pt-10">
            <p className="font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
              Written by
            </p>
            <div className="mt-5 flex items-start gap-4">
              <div
                aria-hidden="true"
                className="flex size-12 shrink-0 items-center justify-center rounded-full bg-[#111111] text-base font-semibold text-[#f8f7f3]"
              >
                {initial}
              </div>
              <div>
                <p className="text-lg font-semibold">{post.author.name}</p>
                <p className="mt-1 text-sm text-[#f47820]">{post.author.role}</p>
                <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground">
                  {post.author.bio}
                </p>
              </div>
            </div>
          </div>
        </div>
      </article>
      <ClosingCta />
      <SiteFooter />
    </main>
  );
}
