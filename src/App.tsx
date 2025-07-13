import { useState, useEffect } from "react";
import { Light as SyntaxHighlighter } from "react-syntax-highlighter";
import json from "react-syntax-highlighter/dist/esm/languages/hljs/json";
import style from "react-syntax-highlighter/dist/esm/styles/hljs/darcula";
import "./App.css";
import ItemFilterTemplate from "./data/ItemFilterTemplate.json";
import type { ItemFilter } from "./vite-env";
import { convertFilter } from "./utils/FilterConverter";
import textContent from "./data/exampleInput.txt?raw";

SyntaxHighlighter.registerLanguage("json", json);

function App() {
  const [fileContent, setFileContent] = useState<string>(textContent);
  const [jsonContent, setJsonContent] = useState<string>(JSON.stringify(ItemFilterTemplate, null, 2));
  const [fileName, setFileName] = useState<string>("modified.json");

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFileName(file.name.replace(/\.[^/.]+$/, "") + ".json");

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      setFileContent(text);
    };
    reader.readAsText(file);
  };

  const handleTransform = () => {
    console.log(ItemFilterTemplate);
    const filterJson: ItemFilter = structuredClone(ItemFilterTemplate);
    const newRules = convertFilter(fileContent);
    filterJson.rules.push(...newRules);

    setJsonContent(JSON.stringify(filterJson, null, 2));
  };

  const handleDownload = () => {
    const blob = new Blob([jsonContent], { type: "text/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = fileName;
    link.click();
    URL.revokeObjectURL(url);
  };

  useEffect(handleTransform, [fileContent]);

  return (
    <>
      <h1>Text File Editor</h1>
      <div className="container">
        <div className="datablock">
          <input className="clickable" type="file" accept=".txt" onChange={handleFileUpload} />

          <textarea
            className="content"
            value={fileContent}
            onChange={(e) => {
              setFileContent(e.target.value);
            }}
            wrap="off"
            placeholder="Your file content will appear here..."
          />
        </div>

        <div className="datablock">
          <div>
            <button className="json-style" onClick={handleDownload}>
              Download Filter
            </button>
          </div>
          <SyntaxHighlighter className="content" language="json" style={style}>
            {jsonContent.substring(0, 5000)}
          </SyntaxHighlighter>
        </div>
      </div>
    </>
  );
}

export default App;
