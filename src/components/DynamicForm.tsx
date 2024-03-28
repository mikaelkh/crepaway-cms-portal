"use client";
import React from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { DevTool } from "@hookform/devtools";
import {
  Control,
  ControllerRenderProps,
  UseFormReturn,
  useForm,
} from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import clsx from "clsx";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Checkbox } from "./ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

type Props = {
  formInputs: FormInput[];
  onSubmit: (values: any) => void;
  formSchema: any;
};

const DynamicForm = ({ formInputs, onSubmit, formSchema }: Props) => {
  const defaultValues = formInputs.reduce(
    (acc: { [key: string]: any }, obj) => {
      if (!obj.hasOwnProperty("defaultValue")) return acc;
      if (obj.type === "seperator" || obj.type === "file") return acc;
      acc[obj.name] = obj?.defaultValue;
      return acc;
    },
    {}
  );
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-12 gap-4">
          {formInputs.map((inp, idx) => {
            if (inp.type === "seperator")
              return (
                <div
                  className="h-0.5 w-full col-span-full bg-gray-400"
                  key={idx}
                />
              );
            const {
              label,
              name,
              defaultValue,
              grid = null,
              ...rest
            } = inp as typeof inp & { defaultValue?: any };
            /* added defaultValue as option to the type because it is not available in input type file, 
          and i just need to destructure it out of the object if it exists  **/
            return (
              <FormField
                name={name}
                key={name}
                control={form.control}
                render={({ field }) => (
                  <FormItem className={getGridSpanClass(grid)}>
                    {label && <FormLabel>{label}</FormLabel>}
                    <FormControl>
                      <InputComponent
                        inp={rest}
                        field={field}
                        formControl={form.control}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            );
          })}
        </div>
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
  formControl,
}: {
  inp: Partial<FormInput>;
  field: ControllerRenderProps<any, string>;
  formControl: Control<any>;
}): React.ReactNode => {
  switch (inp.type) {
    case "text":
    case "password":
    case "textarea":
    case "number":
    case "email":
    case "datetime-local":
    case "date":
      return <Input {...inp} {...field} />;

    case "file":
      const { value, ...rest } = field;
      return (
        <Input
          {...inp}
          {...rest}
          onChange={(e) => field.onChange(e.target.files)}
        />
      );
    // case "checkbox-group" || "radio-group" || "select" || "multi-select":
    case "radio-group":
      // to fix default value for radio group
      return (
        <RadioGroup
          onValueChange={field.onChange}
          defaultValue={field.value}
          className={clsx("flex", {
            "flex-col space-y-1": inp?.direction === "col",
            "flex-row space-x-1": inp?.direction === "row" || !inp?.direction,
            "justify-center": inp?.content === "center",
            "justify-around": inp?.content === "around",
            "justify-end": inp?.content === "end",
            "justify-between": inp?.content === "between",
          })}
        >
          {inp?.data?.map((option) => (
            <FormItem
              className="flex items-center space-x-3 space-y-0"
              key={option.value}
            >
              <FormControl>
                <RadioGroupItem value={option.value} />
              </FormControl>
              <FormLabel className="font-normal">{option.label}</FormLabel>
            </FormItem>
          ))}
        </RadioGroup>
      );
    case "checkbox-group":
      return (
        <div
          className={clsx("flex", {
            "flex-col space-y-1": inp?.direction === "col",
            "flex-row space-x-3": inp?.direction === "row" || !inp?.direction,

            "justify-center": inp?.content === "center",
            "justify-around": inp?.content === "around",
            "justify-end": inp?.content === "end",
            "justify-between": inp?.content === "between",
          })}
        >
          {inp?.data?.map((item) => (
            <FormField
              key={item.value}
              control={formControl}
              name={field.name}
              render={({ field }) => {
                return (
                  <FormItem
                    key={item.value}
                    className="flex flex-row items-start space-x-3 space-y-0"
                  >
                    <FormControl>
                      <Checkbox
                        checked={field.value?.includes(item.value)}
                        onCheckedChange={(checked) => {
                          // to fix ...field.value
                          return checked
                            ? field.onChange([
                                ...(field.value ? field.value : []),
                                item.value,
                              ])
                            : field.onChange(
                                field.value?.filter(
                                  (val: string | number) => item.value !== val
                                )
                              );
                        }}
                      />
                    </FormControl>
                    <FormLabel className="font-normal">{item.label}</FormLabel>
                  </FormItem>
                );
              }}
            />
          ))}
        </div>
      );
    case "checkbox":
      return (
        <div className="flex items-center space-x-2">
          <Checkbox
            checked={!!field.value}
            onCheckedChange={(checked) => field.onChange(Number(checked))}
          />
          <FormDescription>{inp.description}</FormDescription>
        </div>
      );

    case "select":
      return (
        <Select onValueChange={field.onChange} defaultValue={field.value}>
          <FormControl>
            <SelectTrigger>
              <SelectValue placeholder={inp.placeholder} />
            </SelectTrigger>
          </FormControl>
          <SelectContent>
            {inp?.data?.map((option) => (
              <SelectItem value={option.value} key={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      );
    case "custom":
      if (!inp.Component) return;
      return <inp.Component changeHandle={field.onChange} />;
  }
};

const getGridSpanClass = (grid: GridSpan | null) => {
  return clsx({
    [`col-span-${grid?.xs}`]: grid?.xs,
    [`sm:col-span-${grid?.sm}`]: grid?.sm,
    [`md:col-span-${grid?.md}`]: grid?.md,
    [`lg:col-span-${grid?.lg}`]: grid?.lg,
    [`xl:col-span-${grid?.xl}`]: grid?.xl,
    "col-span-full":
      !grid?.xs && !grid?.sm && !grid?.md && !grid?.lg && !grid?.xl,
  });
};
