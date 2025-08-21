import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
  const posts = await getCollection('blog');
  
  // Filtrer uniquement les articles français non-brouillons
  const frenchPosts = posts
    .filter(post => post.id.startsWith('fr/') && !post.data.draft)
    .sort((a, b) => b.data.date.getTime() - a.data.date.getTime());

  return rss({
    title: 'Fiduciaire Expert Luxembourg - Blog',
    description: 'Actualités fiscales, comptables et juridiques au Luxembourg. Conseils pratiques pour entreprises et entrepreneurs.',
    site: context.site,
    items: frenchPosts.map(post => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.date,
      link: `/fr/articles/${post.slug.replace('fr/', '')}/`,
      categories: [post.data.category],
      author: post.data.author || 'Fiduciaire Expert',
    })),
    customData: `<language>fr-LU</language>`,
    stylesheet: '/rss-styles.xsl',
  });
}