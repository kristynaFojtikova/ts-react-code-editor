import MonacoEditor, { OnMount } from "@monaco-editor/react";
import prettier from "prettier";
import parser from "prettier/parser-babel";
import { parse } from "@babel/parser";
import traverse from "@babel/traverse";
import { useRef } from "react";
import "./code-editor.css";
import MonacoJSXHighlighter from "monaco-jsx-highlighter";

interface CodeEditorProps {
  initialValue: string;
  onChange(value: string): void;
}

const babelParse = (code: string) =>
  parse(code, {
    sourceType: "module",
    plugins: ["jsx"],
  });

const CodeEditor: React.FC<CodeEditorProps> = ({ initialValue, onChange }) => {
  const editor = useRef<any>();

  const onPressFormat = () => {
    const currentValue = editor.current.getValue();
    const formatted = prettier
      .format(currentValue, {
        parser: "babel",
        plugins: [parser],
        useTabs: false,
        semi: true,
        singleQuote: true,
      })
      .replace(/\n$/, "");
    editor.current.getModel()?.setValue(formatted);
  };

  const onEditorMount: OnMount = (editorRef, monaco) => {
    editor.current = editorRef;

    // Setup JSX highlighter
    const highlighter = new MonacoJSXHighlighter(
      // @ts-ignore
      monaco,
      babelParse,
      traverse,
      editorRef
    );
    highlighter.highLightOnDidChangeModelContent(100);
  };

  return (
    <div className="editor-wrapper">
      <button
        className="button button-format is-primary is-small"
        onClick={onPressFormat}
      >
        Format
      </button>
      <MonacoEditor
        height="100%"
        language="javascript"
        theme="vs-dark"
        options={{
          wordWrap: "on",
          showUnused: false,
          minimap: { enabled: false },
          folding: false,
          lineNumbersMinChars: 3,
          fontSize: 16,
          scrollBeyondLastLine: false,
          automaticLayout: true,
          tabSize: 2,
        }}
        value={initialValue}
        onMount={onEditorMount}
        onChange={(value) => {
          onChange(value || "");
        }}
      />
    </div>
  );
};

export default CodeEditor;
