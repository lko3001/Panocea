import { Button } from "@/components/ui/button";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  CheckIcon,
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
import { Editor } from "@tiptap/react";
import { useGlobal } from "../context/GlobalContext";
import { useToast } from "../ui/use-toast";
import { useCallback, useEffect, useState } from "react";
import { NoteFixed } from "@/types";

export default function Toolbar({
  editor,
  title,
  id,
}: {
  editor: Editor;
  title: string;
  id: string | undefined;
}) {
  const { Crud, userData } = useGlobal();
  const { toast } = useToast();
  const [noteId, setNoteId] = useState(id);

  // Code to use CTRL S
  const handleKeyPress = useCallback((e: any) => {
    if ((e.keyCode == 83 && e.ctrlKey) || (e.keyCode == 83 && e.metaKey)) {
      e.preventDefault();
      validate();
    }
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [handleKeyPress]);
  // Code to use CTRL S ^^^^

  useEffect(() => {
    setNoteId(id);
  }, [id]);

  async function validate() {
    const blankEditor = `{"type":"doc","content":[{"type":"paragraph"}]}`;
    const editorValue = JSON.stringify(editor.getJSON());
    if (editorValue === blankEditor || !title) {
      toast({
        title: "Please fill out the fields",
        variant: "destructive",
      });
    } else {
      const note: NoteFixed | null = await Crud({
        method: "upsert",
        where: "note",
        what: {
          content: editorValue,
          title: title,

          // The line below is to assure that a user that is not logged in can't create a new note
          userId: userData.user ? userData.user.id : "fakeId",
          id: noteId,
        },
      });
      if (note) {
        setNoteId(note.id);
        toast({ title: "Note created with success" });
      }
    }
  }

  return (
    <section className="my-4 flex flex-wrap flex-row justify-center gap-4">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              tabIndex={1}
              onClick={() =>
                editor.chain().focus().toggleHeading({ level: 1 }).run()
              }
              disabled={
                !editor.can().chain().focus().toggleHeading({ level: 1 }).run()
              }
              size={"icon"}
              variant={
                editor.isActive("heading", { level: 1 }) ? "default" : "outline"
              }
            >
              <HeadingIcon className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Heading</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              tabIndex={1}
              onClick={() => editor.chain().focus().toggleBold().run()}
              disabled={!editor.can().chain().focus().toggleBold().run()}
              size={"icon"}
              variant={editor.isActive("bold") ? "default" : "outline"}
            >
              <FontBoldIcon className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Bold</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              tabIndex={1}
              onClick={() => editor.chain().focus().toggleItalic().run()}
              disabled={!editor.can().chain().focus().toggleItalic().run()}
              size={"icon"}
              variant={editor.isActive("italic") ? "default" : "outline"}
            >
              <FontItalicIcon className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Italic</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              tabIndex={1}
              onClick={() => editor.chain().focus().toggleStrike().run()}
              disabled={!editor.can().chain().focus().toggleStrike().run()}
              size={"icon"}
              variant={editor.isActive("strike") ? "default" : "outline"}
            >
              <StrikethroughIcon className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Strike</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              tabIndex={1}
              onClick={() => editor.chain().focus().toggleCode().run()}
              disabled={!editor.can().chain().focus().toggleCode().run()}
              size={"icon"}
              variant={editor.isActive("code") ? "default" : "outline"}
            >
              <CodeIcon className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Inline Code</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              tabIndex={1}
              onClick={() => editor.chain().focus().toggleCodeBlock().run()}
              disabled={!editor.can().chain().focus().toggleCodeBlock().run()}
              size={"icon"}
              variant={editor.isActive("codeBlock") ? "default" : "outline"}
            >
              <CodeSandboxLogoIcon className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Code Block</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              tabIndex={1}
              onClick={() => editor.chain().focus().toggleBlockquote().run()}
              disabled={!editor.can().chain().focus().toggleBlockquote().run()}
              variant={editor.isActive("blockquote") ? "default" : "outline"}
              size={"icon"}
            >
              <CursorTextIcon className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Blockquote</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              tabIndex={1}
              onClick={() => editor.chain().focus().undo().run()}
              disabled={!editor.can().chain().focus().undo().run()}
              size={"icon"}
              variant={"outline"}
            >
              <ArrowLeftIcon className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Undo</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              tabIndex={1}
              onClick={() => editor.chain().focus().redo().run()}
              disabled={!editor.can().chain().focus().redo().run()}
              size={"icon"}
              variant={"outline"}
            >
              <ArrowRightIcon className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Redo</TooltipContent>
        </Tooltip>

        {userData.user && (
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                tabIndex={1}
                onClick={validate}
                size={"icon"}
                variant={"default"}
              >
                <CheckIcon className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Save</TooltipContent>
          </Tooltip>
        )}
      </TooltipProvider>
    </section>
  );
}
