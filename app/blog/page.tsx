import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { fetchPublishedPosts } from "@/lib/notion-cms";

export const revalidate = 60;

export const metadata = {
  title: "Blog — Oladipupo Consulting",
  description:
    "AI automation insights, case studies, and tips for small businesses.",
};

const staticPosts = [
  {
    id: "static-1",
    slug: "5-ways-ai-saves-time",
    title: "5 Ways AI Can Save Your Small Business 10+ Hours a Week",
    excerpt:
      "Discover how AI automation helps UK small businesses save 10+ hours every week. From appointment booking to email responses — practical examples for plumbers, salons, cleaners and more.",
    publishedAt: "18 March 2026",
    tags: ["AI Automation", "Small Business", "Productivity", "UK Business"],
  },
  {
    id: "static-2",
    slug: "local-business-website-2026",
    title:
      "Why Every Local Business Needs a Website in 2026 (And What It Costs)",
    excerpt:
      "46% of UK small businesses still don't have a website. Here's why that's costing you customers, what a good website needs, and what it actually costs in 2026.",
    publishedAt: "18 March 2026",
    tags: ["Websites", "Local Business", "SEO", "UK Business"],
  },
];

export default async function BlogPage() {
  const notionPosts = await fetchPublishedPosts();

  // Combine Notion posts with static posts, static posts appear after Notion posts
  const allPosts = [
    ...notionPosts.map((post) => ({
      id: post.id,
      slug: post.slug,
      title: post.title,
      excerpt: post.excerpt,
      publishedAt: post.publishedAt,
      tags: post.tags,
    })),
    ...staticPosts,
  ];

  return (
    <main className="min-h-screen">
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <p className="text-blue-400 text-sm font-semibold uppercase tracking-wider mb-3">
            Blog
          </p>
          <h1 className="text-4xl font-bold mb-4">
            AI Automation Insights
          </h1>
          <p className="text-zinc-400 max-w-2xl text-lg mb-12">
            Practical tips, case studies, and behind-the-scenes of building AI
            automation for small businesses.
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            {allPosts.map((post) => (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                className="group bg-zinc-900 border border-zinc-800 rounded-xl p-6 hover:border-zinc-700 transition-colors"
              >
                <div className="flex flex-wrap gap-2 mb-3">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs bg-zinc-800 text-zinc-400 px-2 py-0.5 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <h2 className="text-lg font-semibold mb-2 group-hover:text-blue-400 transition-colors">
                  {post.title}
                </h2>
                {post.excerpt && (
                  <p className="text-zinc-400 text-sm mb-3 line-clamp-2">
                    {post.excerpt}
                  </p>
                )}
                <div className="flex items-center justify-between">
                  <span className="text-xs text-zinc-500">
                    {post.publishedAt}
                  </span>
                  <span className="text-sm text-blue-400 flex items-center gap-1 group-hover:gap-2 transition-all">
                    Read
                    <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
