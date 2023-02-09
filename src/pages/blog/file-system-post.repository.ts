import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import matter from 'gray-matter';

import { Post } from './post';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export class FileSystemPostRepository {
  static readonly postsDir = path.join(__dirname, 'posts');

  async listPosts(): Promise<Post[]> {
    const files = await this.listEntries();
    const entries = await Promise.all(files.map(this.loadEntry));

    return entries.map(([entry, data]) => this.parsePost(entry, data));
  }

  async getPost(postId: string): Promise<Post | undefined> {
    const entries = await this.listEntries();
    const match = entries.find((entry) => entry.endsWith(postId));

    if (!match) {
      return;
    }

    const [entry, post] = await this.loadEntry(match);

    return this.parsePost(entry, post);
  }

  private async listEntries() {
    return fs.readdir(FileSystemPostRepository.postsDir);
  }

  private async loadEntry(entry: string) {
    const entryPath = path.join(FileSystemPostRepository.postsDir, entry, 'index.mdx');
    const buffer = await fs.readFile(entryPath);

    return [entry, String(buffer)];
  }

  private parsePost(entry: string, data: string): Post {
    const { data: meta, content } = matter(data);

    return {
      link: `/blog/${entry.replace(/^\d+-\d+-\d+-/, '')}`,
      title: meta.title,
      date: new Date(meta.date),
      cover: meta.cover,
      description: meta.description,
      content,
    };
  }
}
