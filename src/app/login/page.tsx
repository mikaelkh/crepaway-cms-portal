"use client";
import { Input } from "@/components/ui/input";
import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type Props = {};

type Credentials = {
  username: string;
  password: string;
};

const Page = (props: Props) => {
  const { data: session, status } = useSession();
  const [credentials, setCredentials] = useState<Credentials>({
    username: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const isEmptyCredentials = () => {
    if (
      credentials.username.trim() === "" ||
      credentials.password.trim() === ""
    )
      return true;
    return false;
  };

  const handleLogin = async () => {
    if (isEmptyCredentials()) return;
    setIsLoading(true);
    const response = await signIn("credentials", {
      ...credentials,
      redirect: false,
    });
    console.log("response", response);
    if (response?.ok) {
      router.push("/");
      toast.success("Logged In!");
    } else {
      setIsLoading(false);
      toast.error("Wrong Credentials!");
    }
  };

  useEffect(() => {
    if (status === "authenticated") router.push("/");
  }, [status]);

  return (
    <div className="flex flex-col flex-1 items-center justify-center">
      <Card className="p-7 lg:min-w-[350px]">
        <form>
          <CardHeader>
            <CardTitle>Crepaway CMS</CardTitle>
            <CardDescription>Enter your credentials to sign in</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <Input
              placeholder="Username"
              type="text"
              onChange={(e) =>
                setCredentials((prev) => ({
                  ...prev,
                  ...{ username: e.target.value },
                }))
              }
            />
            <Input
              placeholder="Password"
              type="password"
              onChange={(e) =>
                setCredentials((prev) => ({
                  ...prev,
                  ...{ password: e.target.value },
                }))
              }
            />
          </CardContent>
          <CardFooter>
            <Button
              variant={"default"}
              size={"full"}
              onClick={handleLogin}
              loading={isLoading}
              disabled={isLoading || isEmptyCredentials()}
            >
              Login
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default Page;
