import { HTMLAttributes } from 'react';

type Meta = {
  filename: string;
  caption: string;
};

type CodeProps = HTMLAttributes<HTMLPreElement> & {
  meta?: string;
  children?: React.ReactNode;
};

export const Code = ({ meta, children }: CodeProps) => {
  const { filename, caption }: Meta = meta ? JSON.parse(meta) : {};

  return (
    <pre>
      <div className="flex flex-row items-end">
        {filename && <Filename>{filename}</Filename>}
        {caption && <Caption>{caption}</Caption>}
      </div>
      {children}
    </pre>
  );
};

const Filename = ({ children }: { children: React.ReactNode }) => (
  <div className="bg-muted/50 mx-4 px-4 pt-1 rounded-t-xs font-medium font-mono text-xs">{children}</div>
);

const Caption = ({ children }: { children: React.ReactNode }) => (
  <div className="uppercase text-xs text-muted ml-auto">{children}</div>
);
