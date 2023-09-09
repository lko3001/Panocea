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

export default function Toolbar({
  editor,
  title,
}: {
  editor: Editor;
  title: string;
}) {
  const { Crud, userData } = useGlobal();
  const { toast } = useToast();

  async function validate() {
    const blankEditor = `{"type":"doc","content":[{"type":"paragraph"}]}`;
    const editorValue = JSON.stringify(editor.getJSON());
    if (editorValue === blankEditor || !title) {
      toast({
        title: "Please fill out the fields",
        variant: "destructive",
      });
    } else {
      const note = Crud({
        method: "create",
        where: "note",
        what: {
          content: editorValue,
          title: title,
          userId: userData.user.id,
        },
      });
      if (note) {
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
          <TooltipTrigger asChild>
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
          <TooltipTrigger asChild>
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
          <TooltipTrigger asChild>
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
          <TooltipTrigger asChild>
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
          <TooltipTrigger asChild>
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
          <TooltipTrigger asChild>
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
          <TooltipTrigger asChild>
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
          <TooltipTrigger asChild>
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

        {userData.user && (
          <Tooltip>
            <TooltipTrigger asChild>
              <Button onClick={validate} size={"icon"} variant={"default"}>
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
