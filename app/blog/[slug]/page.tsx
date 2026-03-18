import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { fetchPostBySlug, fetchPostBlocks, fetchPublishedPosts } from "@/lib/notion-cms";
import { notFound } from "next/navigation";

export const revalidate = 60;

export async function generateStaticParams() {
  const posts = await fetchPublishedPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await fetchPostBySlug(slug);
  if (!post) return { title: "Post Not Found" };
  return {
    title: `${post.title} — Oladipupo Consulting`,
    description: post.excerpt || `Read ${post.title} on the Oladipupo Consulting blog.`,
  };
}

function renderBlock(block: Record<string, unknown>) {
  const type = block.type as string;
  const data = block[type] as Record<string, unknown> | undefined;

  if (!data) return null;

  const richText = (data.rich_text as Array<{ plain_text: string; annotations?: Record<string, boolean>; href?: string }>) || [];

  const renderRichText = (texts: typeof richText) =>
    texts.map((t, i) => {
      let el: React.ReactNode = t.plain_text;
      if (t.annotations?.bold) el = <strong key={i}>{el}</strong>;
      if (t.annotations?.italic) el = <em key={i}>{el}</em>;
      if (t.annotations?.code)
        el = (
          <code key={i} className="bg-zinc-800 px-1.5 py-0.5 rounded text-sm">
            {el}
          </code>
        );
      if (t.href)
        el = (
          <a key={i} href={t.href} className="text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">
            {el}
          </a>
        );
      return <span key={i}>{el}</span>;
    });

  switch (type) {
    case "paragraph":
      return (
        <p className="text-zinc-300 leading-relaxed mb-4">
          {renderRichText(richText)}
        </p>
      );
    case "heading_1":
      return (
        <h1 className="text-3xl font-bold mt-8 mb-4">
          {renderRichText(richText)}
        </h1>
      );
    case "heading_2":
      return (
        <h2 className="text-2xl font-bold mt-6 mb-3">
          {renderRichText(richText)}
        </h2>
      );
    case "heading_3":
      return (
        <h3 className="text-xl font-semibold mt-5 mb-2">
          {renderRichText(richText)}
        </h3>
      );
    case "bulleted_list_item":
      return (
        <li className="text-zinc-300 ml-6 list-disc mb-1">
          {renderRichText(richText)}
        </li>
      );
    case "numbered_list_item":
      return (
        <li className="text-zinc-300 ml-6 list-decimal mb-1">
          {renderRichText(richText)}
        </li>
      );
    case "quote":
      return (
        <blockquote className="border-l-4 border-blue-500 pl-4 italic text-zinc-400 my-4">
          {renderRichText(richText)}
        </blockquote>
      );
    case "divider":
      return <hr className="border-zinc-800 my-8" />;
    default:
      return null;
  }
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await fetchPostBySlug(slug);
  if (!post) notFound();

  const blocks = await fetchPostBlocks(post.id);

  return (
    <main className="min-h-screen">
      <article className="py-20 px-6">
        <div className="max-w-3xl mx-auto">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-zinc-400 hover:text-white text-sm mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            All Posts
          </Link>

          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs bg-zinc-800 text-zinc-400 px-2 py-0.5 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>

          <h1 className="text-4xl font-bold mb-4">{post.title}</h1>

          <p className="text-zinc-500 text-sm mb-12">{post.publishedAt}</p>

          <div className="prose prose-invert max-w-none">
            {blocks.map((block, i) => (
              <div key={(block.id as string) || i}>{renderBlock(block)}</div>
            ))}
          </div>

          <div className="mt-16 bg-zinc-900 border border-zinc-800 rounded-xl p-8 text-center">
            <h3 className="text-xl font-semibold mb-2">
              Want to automate your business?
            </h3>
            <p className="text-zinc-400 mb-4">
              Get a free AI Readiness Audit — we&apos;ll show you exactly
              where AI can save you time.
            </p>
            <Link
              href="/audit"
              className="inline-flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              Get Your Free Audit
            </Link>
          </div>
        </div>
      </article>
    </main>
  );
}
