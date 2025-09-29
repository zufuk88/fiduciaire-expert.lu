import { readdirSync, readFileSync, statSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const pagesDir = path.join(__dirname, '..', 'pages');
const blogDir = path.join(__dirname, '..', 'content', 'blog');

const staticPageDates = buildStaticPageLastmodMap();
const articleDates = buildArticleLastmodMap();

export function customSitemapTransform(page) {
  if (!page) {
    return page;
  }

  const url = typeof page === 'string' ? page : page.url || page;
  const pathname = extractPathname(url);

  // Exclure pages de recherche et pages sans langue
  if (pathname.includes('/recherche') || pathname.includes('/search')) {
    return null;
  }

  // Exclure les pages merci/thank-you du sitemap (pour éviter l'indexation)
  if (pathname.includes('/merci') || pathname.includes('/thank-you')) {
    return null;
  }

  // S'assurer que toutes les pages ont une langue (fr ou en)
  if (!pathname.startsWith('/fr') && !pathname.startsWith('/en') && pathname !== '/') {
    return null;
  }

  const priorities = {
    '/': 1.0,
    '/fr': 1.0,
    '/en': 1.0,
    '/fr/fiscalite': 1.0,
    '/en/tax': 1.0,
    '/fr/creation-societe-luxembourg': 0.9,
    '/en/company-formation-luxembourg': 0.9,
    '/fr/services': 0.9,
    '/en/services': 0.9,
    '/fr/comptabilite': 0.8,
    '/en/accounting': 0.8,
    '/fr/paie': 0.8,
    '/en/payroll': 0.8,
    '/fr/formations': 0.8,
    '/en/training': 0.8,
    '/fr/domiciliation': 0.7,
    '/en/domiciliation': 0.7,
    '/fr/contact': 0.7,
    '/en/contact': 0.7,
    '/fr/a-propos': 0.7,
    '/en/about': 0.7,
    '/fr/simulations': 0.6,
    '/fr/articles': 0.6,
    '/en/articles': 0.6,
    default: 0.5,
  };

  let priority = priorities.default;

  if (priorities[pathname]) {
    priority = priorities[pathname];
  } else {
    for (const [pathKey, prio] of Object.entries(priorities)) {
      if (pathKey !== 'default' && pathname.startsWith(pathKey + '/')) {
        priority = prio;
        break;
      }
    }
  }

  if (pathname.includes('/articles/') && !pathname.endsWith('/articles')) {
    if (pathname.includes('/category/')) {
      priority = 0.4;
    } else if (pathname.includes('/page/')) {
      priority = 0.4;
    } else {
      priority = 0.5;
    }
  }

  if (
    pathname.includes('/mentions-legales') ||
    pathname.includes('/politique-confidentialite') ||
    pathname.includes('/legal-notice') ||
    pathname.includes('/privacy-policy')
  ) {
    priority = 0.3;
  }

  if (pathname.includes('/merci') || pathname.includes('/thank-you')) {
    priority = 0.2;
  }

  let changefreq = 'monthly';
  if (priority >= 0.9) {
    changefreq = 'weekly';
  } else if (priority >= 0.8) {
    changefreq = 'weekly';
  } else if (pathname.includes('/articles/') && priority >= 0.5) {
    changefreq = 'weekly';
  }

  const candidateLastmod =
    normalizeDate(typeof page === 'object' && 'lastmod' in page ? page.lastmod : undefined) ||
    articleDates.get(pathname) ||
    staticPageDates.get(pathname);

  const lastmod = candidateLastmod || new Date().toISOString();

  return {
    url,
    lastmod,
    priority,
    changefreq,
  };
}

function extractPathname(rawUrl) {
  try {
    const parsed = new URL(rawUrl, 'https://fiduciaire-expert.lu');
    return (parsed.pathname || '/').replace(/\/$/, '') || '/';
  } catch {
    const pathname = (typeof rawUrl === 'string' ? rawUrl : '/').replace('https://fiduciaire-expert.lu', '');
    return (pathname || '/').replace(/\/$/, '') || '/';
  }
}

function buildStaticPageLastmodMap() {
  const map = new Map();

  try {
    walkDirectory(pagesDir, (filePath) => {
      const ext = path.extname(filePath);
      if (!['.astro', '.md', '.mdx'].includes(ext)) {
        return;
      }

      const relativePath = path.relative(pagesDir, filePath).replace(/\\/g, '/');
      if (relativePath.includes('[')) {
        return;
      }

      const routePath = deriveRouteFromRelativePath(relativePath);
      if (!routePath) {
        return;
      }

      const stat = statSync(filePath);
      map.set(routePath, stat.mtime.toISOString());
    });
  } catch {
    // Ignore failures: we fall back to build time if we cannot resolve the file tree.
  }

  return map;
}

function buildArticleLastmodMap() {
  const map = new Map();

  try {
    walkDirectory(blogDir, (filePath, relative) => {
      if (path.extname(filePath) !== '.md') {
        return;
      }

      const normalizedRelative = relative.replace(/\\/g, '/');
      const segments = normalizedRelative.split('/');
      const locale = segments.shift();
      if (!locale || segments.length === 0) {
        return;
      }

      const slugPath = segments.join('/').replace(/\.md$/, '');
      if (!slugPath) {
        return;
      }

      const routePath = `/${locale}/articles/${slugPath}`.replace(/\/$/, '');
      const fileContents = readFileSync(filePath, 'utf-8');
      const modified = extractFrontmatterValue(fileContents, 'modified');
      const published = extractFrontmatterValue(fileContents, 'date');

      const stat = statSync(filePath);
      const fallbackDate = stat.mtime.toISOString();
      const normalizedDate = normalizeDate(modified) || normalizeDate(published) || fallbackDate;

      map.set(routePath, normalizedDate);
    }, blogDir);
  } catch {
    // Ignore failures: blog dates fallback to build time if parsing fails.
  }

  return map;
}

function walkDirectory(baseDir, onFile, currentDir = baseDir) {
  let entries;
  try {
    entries = readdirSync(currentDir, { withFileTypes: true });
  } catch {
    return;
  }

  for (const entry of entries) {
    const fullPath = path.join(currentDir, entry.name);
    if (entry.isDirectory()) {
      walkDirectory(baseDir, onFile, fullPath);
      continue;
    }

    if (!entry.isFile()) {
      continue;
    }

    const relative = path.relative(baseDir, fullPath);
    onFile(fullPath, relative);
  }
}

function deriveRouteFromRelativePath(relativePath) {
  let route = relativePath.replace(/\.(astro|md|mdx)$/, '');
  route = route.replace(/\/index$/, '');

  if (route === 'index') {
    route = '';
  }

  if (!route) {
    return '/';
  }

  return `/${route}`;
}

function extractFrontmatterValue(fileContents, field) {
  const regex = new RegExp(`^${field}:\s*(.+)$`, 'm');
  const match = fileContents.match(regex);
  if (!match) {
    return undefined;
  }

  const rawValue = match[1].trim();
  if (!rawValue) {
    return undefined;
  }

  if (rawValue.startsWith('"') && rawValue.endsWith('"')) {
    return rawValue.slice(1, -1);
  }

  if (rawValue.startsWith("'") && rawValue.endsWith("'")) {
    return rawValue.slice(1, -1);
  }

  return rawValue;
}

function normalizeDate(value) {
  if (!value) {
    return null;
  }

  if (value instanceof Date) {
    return value.toISOString();
  }

  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) {
    return null;
  }

  return parsed.toISOString();
}
