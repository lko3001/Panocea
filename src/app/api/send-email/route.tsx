import { Resend } from "resend";
import { NextResponse } from "next/server";
import { BodyInt, TemplateElement } from "@/app/(pages)/email/page";
import { templates } from "@/variables";

const resend = new Resend(process.env.RESEND_SECRET);
export async function POST(request: Request) {
  try {
    const body: BodyInt = await request.json();
    const EmailTemplate: TemplateElement = templates.find(
      (template) => template.name === body.chosenTemplate
    )!.element;
    const data = await resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to: [body.formData.toEmail],
      subject: body.formData.subject,
      react: <EmailTemplate {...body.formData} />,
    });

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error });
  }
}
