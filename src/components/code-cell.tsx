import React, { useState } from "react";
import compile from "../bundler";

import CodeEditor from "./code-editor";
import Preview from "./preview";
import Resizable from "./resizable";

const CodeCell = () => {
  const [input, setInput] = useState("const a = 1;");
  const [code, setCode] = useState("");

  const onClick = async () => {
    const output = await compile(input);
    setCode(output);
  };

  return (
    <Resizable direction="vertical">
      <div style={{ height: "100%", display: "flex", flexDirection: "row" }}>
        <Resizable direction="horizontal">
          <CodeEditor initialValue={input} onChange={setInput} />
        </Resizable>
        <Preview code={code} />
      </div>
    </Resizable>
  );
};

export default CodeCell;
