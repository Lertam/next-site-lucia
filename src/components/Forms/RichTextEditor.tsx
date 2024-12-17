"use client";

import { FC, ReactNode, useEffect, useRef, useState } from "react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import "./RichTextStyles.css";

const modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link", "image", "video"],
    ["clean"],
  ],
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false,
  },
};

const formats = [
  "bullet",
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "indent",
  "link",
  "image",
  "video",
];

const RichTextEditor: FC<{
  label: string | ReactNode;
  id: string;
  value?: string;
  name: string;
  error?: string[];
}> = ({ label, id, name, value: _value, error }) => {
  const [value, setValue] = useState<string>(_value ? _value : "");

  const editorRef = useRef<ReactQuill>(null);

  useEffect(() => {
    editorRef.current?.editor?.root.setAttribute("lang", "ru_RU");
    // window.editor = editorRef.current?.editor;
  }, []);

  return (
    <div className={"flex flex-col mb-4"}>
      {typeof label === "string" ? (
        <label htmlFor={id}>{label}</label>
      ) : (
        <>{label}</>
      )}
      <input type={"hidden"} name={name} value={value} />
      <ReactQuill
        ref={editorRef}
        modules={modules}
        onChange={(value) => setValue(value)}
        defaultValue={_value}
        formats={formats}
      />
      {error && <p className={"text-red-500"}>{error}</p>}
    </div>
  );
};

export default RichTextEditor;
