"use client";
import DynamicForm from "@/components/DynamicForm";
import Image from "next/image";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { object, z } from "zod";

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
    fruits: z.array(z.string()).refine((value) => value.some((item) => item), {
      message: "You have to select at least one item.",
    }),
    gender: z.enum(["male"], {
      required_error: "You need to select a notification type.",
    }),
    terms: z.number().refine((value) => value === 1, {
      message: "You must agree to the terms and conditions",
    }),
    country: z.string().min(1),
    file: z.any(),
    datepi: z.string().min(1),
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  const FormInputs: FormInput[] = [
    {
      name: "username",
      label: "Username",
      type: "text",
      defaultValue: "asd",
      placeholder: "Enter username",
      grid: {
        xs: 12,
        sm: 6,
        md: 6,
        lg: 6,
        xl: 6,
      },
    },
    {
      name: "password",
      label: "Password",
      type: "password",
      defaultValue: "1234",
      placeholder: "Enter password",
    },
    {
      type: "radio-group",
      name: "gender",
      defaultValue: "male",
      label: "Gender",
      direction: "row",
      data: [
        { label: "Male", value: "male" },
        { label: "Female", value: "female" },
      ],
    },
    {
      type: "checkbox-group",
      data: [
        { label: "Banana", value: "banana" },
        { label: "Apple", value: 2 },
      ],
      name: "fruits",
      // defaultValue: [2, "banana"],
      direction: "row",
      label: "Fruits",
    },
    { type: "seperator" },
    {
      type: "checkbox",
      name: "terms",
      description: "I agree to the terms and conditions",
      label: "Terms and Conditions",
      defaultValue: 1,
    },
    {
      type: "select",
      name: "country",
      data: [
        { label: "Lebanon", value: "lebanon" },
        { label: "Germany", value: "germany" },
      ],
      defaultValue: "lebanon",
      label: "Country",
      placeholder: "Select a country",
    },
    {
      type: "file",
      name: "file",
      label: "Upload your Image",
    },
    {
      type: "datetime-local",
      name: "datepi",
      label: "Add date",
      placeholder: "Select a date",
    },
  ];

  return (
    <>
      <Link href={"/menu/item"}>items</Link>
      <div className="container">
        <DynamicForm
          formInputs={FormInputs}
          onSubmit={onSubmit}
          formSchema={formSchema}
        />
      </div>
    </>
  );
}
