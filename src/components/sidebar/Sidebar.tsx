"use client";
import { cn } from "@/lib/utils";
import React, { useState } from "react";
import { IoIosArrowForward } from "react-icons/io";

type Props = {};

const Sidebar = (props: Props) => {
  const [open, setOpen] = useState(false);

  const CollapseButton = () => (
    <div
      className={cn(
        "absolute right-0 translate-x-1/2 top-1/2 -translate-y-1/2 bg-secondary rounded-full text-xl p-1 text-primary flex items-center justify-center duration-300 shadow-md cursor-pointer hover:bg-secondary/80",
        {
          "rotate-180 ": open,
        }
      )}
      onClick={() => setOpen((prev) => !prev)}
    >
      <IoIosArrowForward />
    </div>
  );

  return (
    <div
      className={cn(
        "flex flex-col min-h-full gap-5 bg-primary relative duration-300",
        {
          "w-[200px]": open,
          "w-[50px]": !open,
        }
      )}
    >
      <CollapseButton />
    </div>
  );
};

export default Sidebar;
