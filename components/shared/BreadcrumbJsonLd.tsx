import JsonLd from "./JsonLd";

interface BreadcrumbItem {
  name: string;
  href: string;
}

const BASE_URL = "https://oladipupoconsulting.co.uk";

export default function BreadcrumbJsonLd({ items }: { items: BreadcrumbItem[] }) {
  const breadcrumbData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
      ...items.map((item, i) => ({
        "@type": "ListItem",
        position: i + 2,
        name: item.name,
        item: `${BASE_URL}${item.href}`,
      })),
    ],
  };

  return <JsonLd data={breadcrumbData} />;
}
