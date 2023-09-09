"use client";
import { H2 } from "@/components/ui/typography";
import { useEditor, EditorContent, Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  CodeIcon,
  CodeSandboxLogoIcon,
  CursorTextIcon,
  FontBoldIcon,
  FontItalicIcon,
  HeadingIcon,
  StrikethroughIcon,
} from "@radix-ui/react-icons";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function TextEditor() {
  const editor = useEditor({
    extensions: [
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
    content: "I was thinking about...",
  });

  const [hasClicked, setHasClicked] = useState(false);

  return (
    <div className="max-w-5xl mx-auto">
      <H2>Text Editor</H2>
      {editor && (
        <div>
          <Menu editor={editor} />
          <EditorContent
            onClick={() => {
              if (!hasClicked) {
                editor.chain().focus().clearContent().run();
                setHasClicked(true);
              }
            }}
            editor={editor}
          />
        </div>
      )}
    </div>
  );
}

function Menu({ editor }: { editor: Editor }) {
  return (
    <section className="my-4 flex flex-wrap flex-row justify-center gap-4">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <Button
              onClick={() =>
                editor.chain().focus().toggleHeading({ level: 1 }).run()
              }
              size={"icon"}
              variant={"outline"}
            >
              <HeadingIcon className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Heading</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger>
            <Button
              onClick={() => editor.chain().focus().toggleBold().run()}
              size={"icon"}
              variant={"outline"}
            >
              <FontBoldIcon className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Bold</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger>
            <Button
              onClick={() => editor.chain().focus().toggleItalic().run()}
              size={"icon"}
              variant={"outline"}
            >
              <FontItalicIcon className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Italic</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger>
            <Button
              onClick={() => editor.chain().focus().toggleStrike().run()}
              size={"icon"}
              variant={"outline"}
            >
              <StrikethroughIcon className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Strike</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger>
            <Button
              onClick={() => editor.chain().focus().toggleCode().run()}
              size={"icon"}
              variant={"outline"}
            >
              <CodeIcon className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Inline Code</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger>
            <Button
              onClick={() => editor.chain().focus().toggleCodeBlock().run()}
              size={"icon"}
              variant={"outline"}
            >
              <CodeSandboxLogoIcon className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Code Block</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger>
            <Button
              onClick={() => editor.chain().focus().toggleBlockquote().run()}
              size={"icon"}
              variant={"outline"}
            >
              <CursorTextIcon className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Blockquote</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger>
            <Button
              onClick={() => editor.chain().focus().undo().run()}
              size={"icon"}
              variant={"outline"}
            >
              <ArrowLeftIcon className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Undo</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger>
            <Button
              onClick={() => editor.chain().focus().redo().run()}
              size={"icon"}
              variant={"outline"}
            >
              <ArrowRightIcon className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Redo</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </section>
  );
}
