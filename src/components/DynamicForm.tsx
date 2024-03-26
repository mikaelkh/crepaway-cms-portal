"use client";
import React from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { DevTool } from "@hookform/devtools";
import { ControllerRenderProps, UseFormReturn, useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import clsx from "clsx";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";

type Props = {
  formInputs: FormInput[];
  onSubmit: (values: any) => void;
  formSchema: any;
};

const DynamicForm = ({ formInputs, onSubmit, formSchema }: Props) => {
  const defaultValues = formInputs.map((obj: FormInput) => {
    if (obj.type === "seperator") return;
    return {
      [obj.name]: obj.defaultValue,
    };
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {formInputs.map((inp) => {
          console.log("inp", inp);
          if (inp.type === "seperator")
            return <div className="h-1 w-full bg-gray-400" />;
          const { label, name, defaultValue, grid = null, ...rest } = inp;
          return (
            <FormField
              name={name}
              key={name}
              control={form.control}
              render={({ field }) => (
                <FormItem className={grid ? getGridSpanClass(grid) : ""}>
                  <FormLabel>{label}</FormLabel>
                  <FormControl>
                    <InputComponent inp={rest} field={field} />
                  </FormControl>
                  <FormMessage></FormMessage>
                </FormItem>
              )}
            />
          );
        })}
        <Button type="submit">Submit</Button>
      </form>
      <DevTool control={form.control} />
    </Form>
  );
};

export default DynamicForm;

const InputComponent = ({
  inp,
  field,
}: {
  inp: Partial<FormInput>;
  field: ControllerRenderProps<any, string>;
}): React.ReactNode => {
  console.log("first", inp);
  switch (inp.type) {
    case "text":
    case "password":
    case "textarea":
    case "number":
    case "email":
      return <Input {...inp} {...field} />;
    // case "checkbox-group" || "radio-group" || "select" || "multi-select":
    case "radio-group":
      return (
        <RadioGroup
          onValueChange={field.onChange}
          defaultValue={field.value}
          className={clsx("flex", {
            "flex-col space-y-1": inp?.radioDirection === "col",
            "flex-row space-x-1":
              inp?.radioDirection === "row" || !inp?.radioDirection,
          })}
        >
          {inp.data.map((option: LabelOption<string>) => (
            <FormItem className="flex items-center space-x-3 space-y-0">
              <FormControl>
                <RadioGroupItem value={option.value} />
              </FormControl>
              <FormLabel className="font-normal">{option.label}</FormLabel>
            </FormItem>
          ))}
        </RadioGroup>
      );
  }
};

const getGridSpanClass = (grid: GridSpan) => {
  return clsx({
    [`col-span-${grid?.xs}`]: grid?.xs,
    [`col-span-${grid?.sm}`]: grid?.sm,
    [`col-span-${grid?.md}`]: grid?.md,
    [`col-span-${grid?.lg}`]: grid?.lg,
    [`col-span-${grid?.xl}`]: grid?.xl,
    "col-span-full": !grid.xs && !grid.sm && !grid.md && !grid.lg && !grid.xl,
  });
};
