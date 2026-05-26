type JsonLdProps = { data: Record<string, unknown> | Record<string, unknown>[] };

export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000';

export const organizationLd = (settings: {
  siteName?: string;
  description?: string;
  contactEmail?: string;
  organizationLegalName?: string;
  foundingDate?: string;
  socials?: { url: string }[];
}) => ({
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: settings.organizationLegalName ?? settings.siteName ?? 'Archeon Solutions',
  url: SERVER_URL,
  logo: `${SERVER_URL}/logo.png`,
  description: settings.description,
  email: settings.contactEmail,
  foundingDate: settings.foundingDate,
  sameAs: settings.socials?.map((s) => s.url).filter(Boolean),
});

export const websiteLd = () => ({
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Archeon Solutions',
  url: SERVER_URL,
  potentialAction: {
    '@type': 'SearchAction',
    target: `${SERVER_URL}/blog?q={search_term_string}`,
    'query-input': 'required name=search_term_string',
  },
});

export const articleLd = (article: {
  title?: string;
  excerpt?: string;
  slug?: string;
  coverImage?: { url?: string } | string;
  publishedAt?: string;
  updatedAt?: string;
  author?: { name?: string } | string;
}) => ({
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: article.title,
  description: article.excerpt,
  image:
    typeof article.coverImage === 'object' ? article.coverImage?.url : article.coverImage,
  datePublished: article.publishedAt,
  dateModified: article.updatedAt ?? article.publishedAt,
  author: {
    '@type': 'Person',
    name: typeof article.author === 'object' ? article.author?.name : article.author,
  },
  mainEntityOfPage: `${SERVER_URL}/blog/${article.slug ?? ''}`,
});

export const breadcrumbLd = (items: { name: string; url: string }[]) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: item.name,
    item: item.url,
  })),
});

export const creativeWorkLd = (project: {
  title?: string;
  summary?: string;
  slug?: string;
  heroImage?: { url?: string };
  publishedAt?: string;
  updatedAt?: string;
}) => ({
  '@context': 'https://schema.org',
  '@type': 'CreativeWork',
  name: project.title,
  description: project.summary,
  image: project.heroImage?.url,
  url: `${SERVER_URL}/projects/${project.slug ?? ''}`,
  dateCreated: project.publishedAt,
  dateModified: project.updatedAt ?? project.publishedAt,
});
