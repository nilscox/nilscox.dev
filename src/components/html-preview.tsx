import { Language, PrettierFormatter } from '@code-preview/formatter';
import { CodePreview, HtmlRoot, MonacoEditor } from '@code-preview/react';

const formatter = new PrettierFormatter(Language.html);

type HtmlPreviewProps = {
  html: string;
  height?: number;
};

const HtmlPreview = ({ html, height = 120 }: HtmlPreviewProps) => {
  return (
    <CodePreview
      code={html}
      formatter={formatter}
      editor={(html, onChange) => <MonacoEditor language="html" code={html} onChange={onChange} />}
      renderer={(code) => (
        <HtmlRoot
          code={code}
          iframeStyle={{
            height: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        />
      )}
      className="my-4 box-content resize-y divide-x overflow-hidden rounded-sm border"
      style={{ height }}
    />
  );
};

export default HtmlPreview;
