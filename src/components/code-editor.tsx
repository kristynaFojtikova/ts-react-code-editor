import MonacoEditor from "@monaco-editor/react";
import prettier from "prettier";
import parser from "prettier/parser-babel";
import { useRef } from "react";
import "./code-editor.css";

interface CodeEditorProps {
  initialValue: string;
  onChange(value: string): void;
}

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
      .replace(/\n/$, "");
    editor.current.getModel()?.setValue(formatted);
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
        height="500px"
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
        onMount={(editorRef, monaco) => {
          console.log("onMount", editor, monaco);
          editor.current = editorRef;
        }}
        onChange={(value, event) => {
          console.log("onChange", value, event);
          onChange(value || "");
        }}
      />
    </div>
  );
};

export default CodeEditor;
