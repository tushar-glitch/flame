import React, { useEffect } from "react";
import { Button, Textarea } from "@material-tailwind/react";
import Editor from "@monaco-editor/react";
import { useState, useRef } from "react";
import axios from "axios";

const API = axios.create({
  baseURL: "https://emkc.org/api/v2/piston",
});
const sphereEngine = axios.create({
  baseURL: "https://d96fdfac.problems.sphere-engine.com/api/v4"
})

const CodeEditor = () => {
  const editorRef = useRef();
  const [output, setOutput] = useState("");
  const [roomName, setRoomName] = useState("");
  console.log(process.env);
  sphereEngine.get(`problems?access_token=${process.env.REACT_APP_SPHERE_ENGINE_TOKEN}`)
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
    console.log(err);
  })

  const executeCode = async () => {
    const code = editorRef.current.getValue();
    var response;
    try {
      response = await API.post("/execute", {
        language: "javascript",
        version: "18.15.0",
        files: [
          {
            content: code,
          },
        ],
      });
    } catch (err) {
      console.log(err);
    } finally {
      setOutput(response.data.run.output);
      console.log(output);
    }
  };

  return (
    <div className="flex h-screen">
      <div className="w-1/2 h-full"></div>
      <div className="w-1/2 h-full flex flex-col">
        <div className="h-3/4">
          <Editor
            height="100%"
            defaultLanguage="javascript"
            theme="vs-dark"
            onMount={(editor) => {
              editorRef.current = editor;
            }}
            defaultValue=""
          />
        </div>
        <div className="h-1/4 flex flex-col justify-between">
          <Textarea label="Input" className="mb-4" />
          <Textarea label="Output" value={output} disabled />
        </div>
        <div className="h-1/4 flex items-center justify-center space-x-4">
          <Button onClick={executeCode}>Run</Button>
          <Button>Submit</Button>
        </div>
      </div>
    </div>
  );
};

export default CodeEditor;
