"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { signIn } from "next-auth/react";
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";

export default function SignIn() {
  const router = useSearchParams();
  async function Login() {
    await signIn("github");
  }
  return (
    <Card className="max-w-sm w-full">
      <CardHeader>
        <CardTitle>Sign In</CardTitle>
        <CardDescription>Choose your preferred provider</CardDescription>
      </CardHeader>
      <CardContent>
        <Button className="w-full" onClick={Login}>
          <GitHubLogoIcon className="mr-2 h-4 w-4" />
          Github
        </Button>
      </CardContent>
    </Card>
  );
}
