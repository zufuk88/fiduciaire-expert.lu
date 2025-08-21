import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
  const posts = await getCollection('blog');
  
  // Filter only English articles that are not drafts
  const englishPosts = posts
    .filter(post => post.id.startsWith('en/') && !post.data.draft)
    .sort((a, b) => b.data.date.getTime() - a.data.date.getTime());

  return rss({
    title: 'Fiduciaire Expert Luxembourg - Blog',
    description: 'Tax, accounting and legal news in Luxembourg. Practical advice for companies and entrepreneurs.',
    site: context.site,
    items: englishPosts.map(post => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.date,
      link: `/en/articles/${post.slug.replace('en/', '')}/`,
      categories: [post.data.category],
      author: post.data.author || 'Fiduciaire Expert',
    })),
    customData: `<language>en-US</language>`,
    stylesheet: '/rss-styles.xsl',
  });
}