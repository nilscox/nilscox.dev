import { Root, Element } from 'hast';
import { is } from 'unist-util-is';
import { visit } from 'unist-util-visit';

export const rehypeCodeMeta = () => (tree: Root) => {
  visit(
    tree,
    (node): node is Element => is(node, { tagName: 'pre' }) && is(node.children[0], { tagName: 'code' }),
    (pre) => {
      const code = pre.children[0] as Element;

      if (code.data) {
        const metaStr = code.data.meta as string;

        const meta: Record<string, string> = {};
        const re = /([a-z]+)="([^"]*)"/g;
        let match;

        while ((match = re.exec(metaStr)) !== null) {
          meta[match[1]] = match[2];
        }

        pre.properties = {
          meta: JSON.stringify(meta),
        };
      }
    }
  );
};
