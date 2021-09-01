import React, { useState } from "react";
import compile from "../bundler";

import CodeEditor from "./code-editor";
import Preview from "./preview";

const CodeCell = () => {
  const [input, setInput] = useState("");
  const [code, setCode] = useState("");

  const onClick = async () => {
    const output = await compile(input);
    setCode(output);
  };

  return (
    <div>
      <CodeEditor initialValue={input} onChange={setInput} />
      <div>
        <button onClick={onClick}>Submit!</button>
      </div>
      <Preview code={code} />
    </div>
  );
};

export default CodeCell;
