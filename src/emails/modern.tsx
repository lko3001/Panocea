import { Tailwind } from "@react-email/tailwind";
import {
  Font,
  Container,
  Head,
  Heading,
  Html,
  Text,
  Hr,
  Link,
  Section,
  Column,
  Row,
} from "@react-email/components";
import * as React from "react";
import { EmailTemplateProps } from "@/types";

export default function Modern({ title, text, fromEmail }: EmailTemplateProps) {
  return (
    <Html>
      <Head>
        <Font
          fontFamily="Inter"
          fallbackFontFamily="Verdana"
          webFont={{
            url: "https://fonts.gstatic.com/s/inter/v12/UcCo3FwrK3iLTcviYwY.woff2",
            format: "woff2",
          }}
          fontWeight={400}
          fontStyle="normal"
        />
      </Head>
      <Tailwind>
        <Container className="bg-white text-black px-8 rounded-md">
          <Heading as="h2">{title}</Heading>
          <Text>{text}</Text>
          <Hr />
          <Section className="text-xs text-neutral-500">
            <Row>
              <Column>
                Sent from{" "}
                <Link
                  href="https://panocea.vercel.app/email"
                  className="text-blue-500"
                >
                  Panocea Email
                </Link>
              </Column>
              <Column className="text-right">
                <Link href={fromEmail} className="text-blue-500">
                  {fromEmail}
                </Link>
              </Column>
            </Row>
          </Section>
        </Container>
      </Tailwind>
    </Html>
  );
}
