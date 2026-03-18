import { Client } from "@notionhq/client";

const notion = new Client({ auth: process.env.NOTION_API_KEY });

const BLOG_DB = process.env.NOTION_BLOG_DB || "";

export type BlogPost = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  publishedAt: string;
  tags: string[];
  coverUrl?: string;
};

export async function fetchPublishedPosts(): Promise<BlogPost[]> {
  if (!BLOG_DB) return [];

  try {
    const response = await notion.databases.query({
      database_id: BLOG_DB,
      filter: {
        property: "Published",
        checkbox: { equals: true },
      },
      sorts: [{ property: "Created", direction: "descending" }],
    });

    return response.results.map((page) => {
      const p = page as Record<string, unknown>;
      const props = p.properties as Record<string, Record<string, unknown>>;

      const titleProp = props.Name || props.Title;
      const title =
        titleProp?.type === "title"
          ? ((titleProp.title as Array<{ plain_text: string }>)?.[0]
              ?.plain_text ?? "Untitled")
          : "Untitled";

      const slugProp = props.Slug;
      const slug =
        slugProp?.type === "rich_text"
          ? ((slugProp.rich_text as Array<{ plain_text: string }>)?.[0]
              ?.plain_text ?? "")
          : "";

      const excerptProp = props.Excerpt;
      const excerpt =
        excerptProp?.type === "rich_text"
          ? ((excerptProp.rich_text as Array<{ plain_text: string }>)?.[0]
              ?.plain_text ?? "")
          : "";

      const dateProp = props.Created || props.Date;
      const publishedAt =
        dateProp?.type === "date"
          ? ((dateProp.date as { start: string })?.start ?? "")
          : typeof (p as Record<string, string>).created_time === "string"
            ? (p as Record<string, string>).created_time.slice(0, 10)
            : "";

      const tagsProp = props.Tags;
      const tags =
        tagsProp?.type === "multi_select"
          ? (tagsProp.multi_select as Array<{ name: string }>).map(
              (t) => t.name
            )
          : [];

      return { id: p.id as string, slug, title, excerpt, publishedAt, tags };
    });
  } catch {
    console.error("Failed to fetch blog posts from Notion");
    return [];
  }
}

export async function fetchPostBlocks(
  pageId: string
): Promise<Record<string, unknown>[]> {
  try {
    const response = await notion.blocks.children.list({
      block_id: pageId,
      page_size: 100,
    });
    return response.results as Record<string, unknown>[];
  } catch {
    console.error("Failed to fetch post blocks");
    return [];
  }
}

export async function fetchPostBySlug(
  slug: string
): Promise<BlogPost | null> {
  if (!BLOG_DB) return null;

  try {
    const response = await notion.databases.query({
      database_id: BLOG_DB,
      filter: {
        and: [
          { property: "Published", checkbox: { equals: true } },
          { property: "Slug", rich_text: { equals: slug } },
        ],
      },
    });

    if (response.results.length === 0) return null;

    const posts = await fetchPublishedPosts();
    return posts.find((p) => p.slug === slug) ?? null;
  } catch {
    return null;
  }
}
