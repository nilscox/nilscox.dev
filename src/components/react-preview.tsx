import { ESBuildCompiler } from '@code-preview/compiler';
import { PrettierFormatter, Language } from '@code-preview/formatter';
import { CodePreview, MonacoEditor, ReactRoot } from '@code-preview/react';
import { useRef } from 'react';

const compiler = new ESBuildCompiler({ loader: 'tsx' });
const formatter = new PrettierFormatter(Language.typescript, { printWidth: 90, semi: false });

type ReactPreviewProps = {
  component: string;
  props: unknown;
  code: string;
  showCode?: 'full' | 'compiled';
  before?: string;
  after?: string;
  start?: number;
  end?: number;
  height?: number;
};

const ReactPreview = ({
  component,
  props,
  code,
  showCode,
  before,
  after,
  start,
  end,
  height = 120,
}: ReactPreviewProps) => {
  const uri = useRef(`file:///file-${Math.random()}.tsx`);

  return (
    <CodePreview
      code={code}
      showCode={showCode}
      before={before}
      after={after}
      editor={(code, onChange) => (
        <MonacoEditor
          react
          language="typescript"
          uri={uri.current}
          code={code.split('\n').slice(start, end).join('\n')}
          onChange={onChange}
        />
      )}
      renderer={(code) => <ReactRoot component={component} props={props} code={code} />}
      compiler={compiler}
      formatter={formatter}
      className="my-4 box-content resize-y divide-x rounded-sm border"
      style={{ height }}
    />
  );
};

export default ReactPreview;
