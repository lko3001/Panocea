"use client";
import { useEditor, EditorContent, ReactNodeViewRenderer } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import { useRef, useState } from "react";
import css from "highlight.js/lib/languages/css";
import js from "highlight.js/lib/languages/javascript";
import ts from "highlight.js/lib/languages/typescript";
import html from "highlight.js/lib/languages/xml";
import { lowlight } from "lowlight";
import CodeBlockComponent from "@/components/layout/CodeBlockComponent";
import Toolbar from "@/components/tiptap/Toolbar";

lowlight.registerLanguage("html", html);
lowlight.registerLanguage("css", css);
lowlight.registerLanguage("js", js);
lowlight.registerLanguage("ts", ts);

export default function TextEditor() {
  const titleRef = useRef<HTMLInputElement>(null);
  const editor = useEditor({
    extensions: [
      CodeBlockLowlight.extend({
        addNodeView() {
          return ReactNodeViewRenderer(CodeBlockComponent);
        },
      }).configure({ lowlight }),
      StarterKit.configure({
        heading: {
          HTMLAttributes: {
            class: "tiptap-heading",
          },
        },
        blockquote: {
          HTMLAttributes: {
            class: "shadcn-blockquote",
          },
        },
        paragraph: {
          HTMLAttributes: {
            class: "shadcn-paragraph",
          },
        },
        orderedList: {
          HTMLAttributes: {
            class: "shadcn-ol",
          },
        },
        bulletList: {
          HTMLAttributes: {
            class: "shadcn-ul",
          },
        },
        code: {
          HTMLAttributes: {
            class: "shadcn-monospace",
          },
        },
      }),
    ],
    editorProps: {
      attributes: {
        class: "tiptap-editor",
      },
    },
  });

  const [hasClicked, setHasClicked] = useState(false);

  return (
    <div className="max-w-5xl mx-auto">
      <input
        type="text"
        ref={titleRef}
        placeholder="Insert title..."
        className="block w-full shadcn-h2 bg-transparent focus:outline-none placeholder:text-muted-foreground"
      />
      {editor && (
        <div>
          <Toolbar title={titleRef.current!.value} editor={editor} />
          {!hasClicked && (
            <p
              className="text-muted-foreground"
              onClick={() => {
                editor.chain().focus().clearContent().run();
                setHasClicked(true);
              }}
            >
              I was thinking about...
            </p>
          )}
          <EditorContent
            editor={editor}
            className={hasClicked ? "" : "invisible"}
          />
        </div>
      )}
    </div>
  );
}
