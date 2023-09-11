"use client";
import { useEditor, EditorContent, ReactNodeViewRenderer } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import { useEffect, useRef, useState } from "react";
import css from "highlight.js/lib/languages/css";
import js from "highlight.js/lib/languages/javascript";
import ts from "highlight.js/lib/languages/typescript";
import html from "highlight.js/lib/languages/xml";
import { lowlight } from "lowlight";
import CodeBlockComponent from "@/components/layout/CodeBlockComponent";
import Toolbar from "@/components/tiptap/Toolbar";
import { useSearchParams } from "next/navigation";
import { useGlobal } from "@/components/context/GlobalContext";

lowlight.registerLanguage("html", html);
lowlight.registerLanguage("css", css);
lowlight.registerLanguage("js", js);
lowlight.registerLanguage("ts", ts);

export default function TextEditor() {
  const { userData } = useGlobal();
  const searchParams = useSearchParams();
  const titleParam = searchParams.get("title");
  const titleRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const onBeforeUnload = (e: Event) => {
      if (true) {
        e.preventDefault();
        e.returnValue = "" as any;
        return;
      }
    };
    window.addEventListener("beforeunload", onBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", onBeforeUnload);
    };
  }, []);

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
    autofocus: true,
  });

  const [noteId, setNoteId] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (userData.user) {
      const noteParam = userData.user.notes.find(
        (note) => note.id === searchParams.get("id")
      );
      if (noteParam && editor) {
        titleRef.current!.value = noteParam.title;
        editor.commands.setContent(JSON.parse(noteParam.content));
        setNoteId(searchParams.get("id") as string);
      }
    }
  }, [userData, editor]);

  return (
    <div className="max-w-5xl mx-auto">
      <input
        type="text"
        defaultValue={titleParam ? titleParam : ""}
        ref={titleRef}
        placeholder="Insert title..."
        className="block w-full shadcn-h2 bg-transparent focus:outline-none placeholder:text-muted-foreground"
      />
      {editor && (
        <div>
          <Toolbar
            title={titleRef.current!.value}
            id={noteId}
            editor={editor}
          />
          <EditorContent editor={editor} />
        </div>
      )}
    </div>
  );
}
