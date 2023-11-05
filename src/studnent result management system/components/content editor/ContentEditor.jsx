import React, { useEffect, useState } from "react";

import styles from "./ContentEditable.module.css";
const ContentEditor = ({ editorStyles, editorRef, placeholder, scale }) => {
  const [spellCheck, setSpellCheck] = useState("true");
  useEffect(() => {
    editorRef.current.innerHTML = placeholder;
  }, [placeholder, editorRef]);
  return (
    <div className={styles["content-editor"]} style={{ zoom: scale }}>
      <p
        spellCheck={spellCheck}
        ref={editorRef}
        contentEditable="true"
        style={{ ...editorStyles }}
      ></p>

      <button
        onClick={(event) => {
          setSpellCheck((prev) => {
            if (prev === "true") return "false";
            else return "true";
          });
        }}
      >
        {spellCheck === "true" ? "🙊" : "📢"}
      </button>
    </div>
  );
};

export default ContentEditor;
