const fs = require('fs');
const path = require('path');

/**
 * Docusaurus plugin: docs-ai-index
 *
 * At build time (and dev server start), reads every .md/.mdx file under docs/,
 * strips markdown syntax to plain text, splits into chunks (~500 words each),
 * and writes a JSON index to static/ai-docs-index.json.
 *
 * The AiHelper component fetches this file at runtime and uses TF-IDF style
 * keyword matching to find relevant chunks for a user's question, sending
 * only those chunks to Gemini instead of the entire docs corpus.
 */

function stripMarkdown(md) {
  return (
    md
      // Remove frontmatter
      .replace(/^---[\s\S]*?---\n*/m, '')
      // Remove HTML tags
      .replace(/<[^>]+>/g, '')
      // Remove images
      .replace(/!\[.*?\]\(.*?\)/g, '')
      // Remove links but keep text
      .replace(/\[([^\]]+)\]\(.*?\)/g, '$1')
      // Remove code blocks but keep content
      .replace(/```[\s\S]*?```/g, (match) => {
        return match.replace(/```\w*\n?/g, '').replace(/```/g, '');
      })
      // Remove inline code backticks
      .replace(/`([^`]+)`/g, '$1')
      // Remove headings markers but keep text
      .replace(/^#{1,6}\s+/gm, '')
      // Remove bold/italic markers
      .replace(/\*\*(.+?)\*\*/g, '$1')
      .replace(/\*(.+?)\*/g, '$1')
      .replace(/__(.+?)__/g, '$1')
      .replace(/_(.+?)_/g, '$1')
      // Remove horizontal rules
      .replace(/^[-*_]{3,}\s*$/gm, '')
      // Remove blockquote markers
      .replace(/^>\s+/gm, '')
      // Remove list markers
      .replace(/^[\s]*[-*+]\s+/gm, '- ')
      .replace(/^[\s]*\d+\.\s+/gm, '')
      // Collapse multiple newlines
      .replace(/\n{3,}/g, '\n\n')
      .trim()
  );
}

function extractTitle(content) {
  // Try frontmatter title
  const fmMatch = content.match(/^---[\s\S]*?title:\s*['"]?(.+?)['"]?\s*$/m);
  if (fmMatch) return fmMatch[1].trim();

  // Try first heading
  const headingMatch = content.match(/^#{1,3}\s+(.+)$/m);
  if (headingMatch) return headingMatch[1].trim();

  return null;
}

function chunkText(text, maxWords = 500) {
  const paragraphs = text.split(/\n\n+/);
  const chunks = [];
  let current = '';
  let wordCount = 0;

  for (const para of paragraphs) {
    const paraWords = para.split(/\s+/).filter(Boolean).length;

    if (wordCount + paraWords > maxWords && current.trim()) {
      chunks.push(current.trim());
      current = '';
      wordCount = 0;
    }

    current += para + '\n\n';
    wordCount += paraWords;
  }

  if (current.trim()) {
    chunks.push(current.trim());
  }

  return chunks;
}

/** Recursively find all .md and .mdx files */
function findMarkdownFiles(dir, base) {
  base = base || dir;
  let results = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results = results.concat(findMarkdownFiles(full, base));
    } else if (/\.(md|mdx)$/i.test(entry.name)) {
      results.push(path.relative(base, full));
    }
  }
  return results;
}

function buildIndex(docsDir) {
  const files = findMarkdownFiles(docsDir);

  const index = [];

  for (const file of files) {
    const fullPath = path.join(docsDir, file);
    const content = fs.readFileSync(fullPath, 'utf-8');
    const title = extractTitle(content) || path.basename(file, path.extname(file));
    const plainText = stripMarkdown(content);
    const docPath = '/docs/' + file.replace(/\\/g, '/').replace(/(index)?\.mdx?$/, '').replace(/\/$/, '');

    const chunks = chunkText(plainText);

    chunks.forEach((chunk, i) => {
      // Build keyword set for this chunk (lowercased, unique words 3+ chars)
      const words = chunk
        .toLowerCase()
        .replace(/[^a-z0-9\s-_.]/g, ' ')
        .split(/\s+/)
        .filter((w) => w.length >= 3);
      const keywords = [...new Set(words)];

      index.push({
        id: `${file}#${i}`,
        title,
        path: docPath,
        content: chunk,
        keywords,
      });
    });
  }

  return index;
}

module.exports = function docsAiIndexPlugin(context) {
  const docsDir = path.resolve(context.siteDir, 'docs');

  return {
    name: 'docs-ai-index',

    async loadContent() {
      return buildIndex(docsDir);
    },

    async contentLoaded({ content, actions }) {
      // Write to static dir so it's available as /ai-docs-index.json
      const staticDir = path.resolve(context.siteDir, 'static');
      if (!fs.existsSync(staticDir)) {
        fs.mkdirSync(staticDir, { recursive: true });
      }
      const outPath = path.join(staticDir, 'ai-docs-index.json');
      fs.writeFileSync(outPath, JSON.stringify(content, null, 0), 'utf-8');
      console.log(`[docs-ai-index] Indexed ${content.length} chunks from docs/`);
    },

    getPathsToWatch() {
      // Re-index when docs change
      return [path.resolve(docsDir, '**/*.{md,mdx}')];
    },
  };
};
