"use client";

import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { H2, H3 } from "@/components/ui/typography";
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { ChevronLeftIcon } from "@radix-ui/react-icons";
import { EmailTemplateProps } from "@/types";
import { templates } from "@/variables";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";

export interface BodyInt {
  formData: EmailTemplateProps & {
    subject: string;
  };
  chosenTemplate: TemplateName | undefined;
}
export type TemplateElement = ({
  title,
  text,
  fromEmail,
  toEmail,
}: EmailTemplateProps) => JSX.Element;

const stages = ["Choose your template", "Fill the form"];

type TemplateName = (typeof templates)[number]["name"];

export default function Email() {
  const [currentStage, setCurrentStage] = useState(0);
  const [chosenTemplate, setChosenTemplate] = useState<
    TemplateName | undefined
  >("Ancient");

  const router = useRouter();
  const { toast } = useToast();

  const EmailFormSchema = z.object({
    subject: z.string().nonempty(),
    title: z.string().nonempty(),
    text: z.string().nonempty(),
    fromEmail: z.string().nonempty().email(),
    toEmail: z.string().nonempty().email(),
  });

  const emailForm = useForm<z.infer<typeof EmailFormSchema>>({
    resolver: zodResolver(EmailFormSchema),
    defaultValues: {
      subject: undefined,
      title: undefined,
      text: undefined,
      fromEmail: undefined,
      toEmail: undefined,
    },
  });

  async function sendEmail(formData: z.infer<typeof EmailFormSchema>) {
    const body: BodyInt = {
      formData,
      chosenTemplate,
    };
    const res = await fetch("/api/send-email", {
      method: "POST",
      body: JSON.stringify(body),
    });
    const data = await res.json();
    if (data.hasOwnProperty("id")) {
      router.push("/email");
      toast({ description: "Email sent successfully", title: "Success" });
    } else {
      toast({
        description: "Something went wrong",
        title: "Error",
        variant: "destructive",
      });
    }
  }

  function handleTemplateChoice(name: TemplateName) {
    setChosenTemplate(name);
    setCurrentStage((p) => p + 1);
  }

  return (
    <div className="max-w-5xl mx-auto">
      <H2>Email</H2>
      <div className="flex flex-row items-center gap-4">
        {currentStage !== 0 && (
          <Button
            size={"icon"}
            variant={"outline"}
            onClick={() => setCurrentStage((p) => p - 1)}
          >
            <ChevronLeftIcon />
          </Button>
        )}
        <H3 className="my-4">{stages[currentStage]}</H3>
      </div>
      {currentStage === 0 && (
        <TemplateChoice handleTemplateChoice={handleTemplateChoice} />
      )}
      {currentStage === 1 && (
        <EmailForm
          form={emailForm}
          handleFormSubmit={emailForm.handleSubmit(sendEmail)}
        />
      )}
    </div>
  );
}

function EmailForm({
  form,
  handleFormSubmit,
}: {
  form: any;
  handleFormSubmit: () => void;
}) {
  return (
    <Form {...form}>
      <form onSubmit={handleFormSubmit} className="space-y-6">
        <FormField
          control={form.control}
          name="subject"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="capitalize">subject</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="capitalize">title</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="text"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="capitalize">Content</FormLabel>
              <FormControl>
                <Textarea
                  rows={7}
                  className="resize-none"
                  placeholder="I spent so much because..."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="fromEmail"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="capitalize">Your Email</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="toEmail"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="capitalize">To Email</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Next</Button>
      </form>
    </Form>
  );
}

function TemplateChoice({
  handleTemplateChoice,
}: {
  handleTemplateChoice: (name: TemplateName) => void;
}) {
  return (
    <div className="flex flex-row items-center justify-evenly">
      {templates.map((template) => (
        <Button
          key={template.name}
          className="block h-auto p-2 w-64"
          variant={"outline"}
          onClick={() => handleTemplateChoice(template.name)}
        >
          <img src={template.image} className="rounded-md" />
          <p className="text-lg mt-2 capitalize">{template.name}</p>
        </Button>
      ))}
    </div>
  );
}
