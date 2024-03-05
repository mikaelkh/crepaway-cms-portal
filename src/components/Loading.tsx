import { cn } from "@/lib/utils";
import React from "react";
import { BiLoaderCircle } from "react-icons/bi";

type props = {
  className?: string;
  color?: "purple" | "default";
  size?: "large" | "default";
};

const Loading = ({ className, color = "default", size = "default" }: props) => {
  return (
    <div
      className={cn(
        className,
        "flex w-full h-full justify-center items-center"
      )}
    >
      <span
        className={cn("animate-spin text-3xl", {
          "text-5xl": size === "large",
          "text-purple-primary": color === "purple",
        })}
      >
        <BiLoaderCircle />
      </span>
    </div>
  );
};

export default Loading;
