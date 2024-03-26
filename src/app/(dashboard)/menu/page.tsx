"use client";
import DynamicForm from "@/components/DynamicForm";
import Image from "next/image";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

export default function Home() {
  const formSchema = z.object({
    username: z.string().min(2).max(50),
    password: z.string().min(6),
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  const FormInputs: FormInput[] = [
    {
      name: "username",
      label: "Username",
      type: "text",
      defaultValue: "",
      placeholder: "Enter username",
    },
    {
      name: "password",
      label: "Password",
      type: "password",
      defaultValue: "",
      placeholder: "Enter password",
    },
    {
      type: "radio-group",
      name: "gender",
      defaultValue: "asd",
      placeholder: "gender",
      label: "Gender",
      radioDirection: "row",
      data: [
        { label: "Male", value: "male" },
        { label: "Female", value: "female" },
      ],
    },
  ];

  return (
    <>
      <Link href={"/menu/item"}>items</Link>
      <DynamicForm
        formInputs={FormInputs}
        onSubmit={onSubmit}
        formSchema={formSchema}
      />
    </>
  );
}
