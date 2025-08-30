import { Editor as MonacoEditor } from '@monaco-editor/react'
import type { OnMount, EditorProps } from '@monaco-editor/react'
import { editor } from 'monaco-editor'
import { createATA } from './ata'

export interface EditorFile {
  name: string;
  language: string;
  value: string;
}

interface Props {
  file: EditorFile;
  onChange?: EditorProps['onChange'];
  options?: editor.IStandaloneEditorConstructionOptions;
}

export default function Editor(props: Props) {
  const { file, onChange, options } = props;
  console.log(file);
  

  const handleEditorMount: OnMount = (editor, monaco) => {
    // 让编辑器支持 jsx
    monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
      jsx: monaco.languages.typescript.JsxEmit.Preserve,
      esModuleInterop: true,
      allowNonTsExtensions: true,
      target: monaco.languages.typescript.ScriptTarget.Latest,
      moduleResolution: monaco.languages.typescript.ModuleResolutionKind.NodeJs,
      allowJs: true,
    })

    const ata = createATA((code, path) => {
      monaco.languages.typescript.typescriptDefaults.addExtraLib(code, `file://${path}`)
    })

    // 监听编辑器内容变化
    editor.onDidChangeModelContent(() => {
      ata(editor.getValue());
    });

    ata(editor.getValue());

  }


  return (
    <MonacoEditor
      path={file.name}
      height="100%"
      language={file.language}
      value={file.value}
      onMount={handleEditorMount}
      onChange={onChange}
      options={
        {
          fontSize: 14,
          scrollBeyondLastLine: false,
          minimap: {
            enabled: false,
          },
          scrollbar: {
            verticalScrollbarSize: 6,
            horizontalScrollbarSize: 6,
          },
          ...options,
        }
      }
    />
  )
}
