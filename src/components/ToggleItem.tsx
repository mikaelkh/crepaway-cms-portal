import { cn } from "@/lib/utils";
import React from "react";

interface Props extends React.HTMLAttributes<HTMLSpanElement> {
  selected: boolean;
}

const ToggleItem = (props: Props) => {
  const { selected, ...rest } = props;
  return (
    <span
      className={cn(
        "text-secondary-foreground/80 hover:text-foreground rounded-3xl px-2 py-0.5 cursor-pointer select-none text-sm",
        {
          "bg-accent text-black font-medium": props.selected,
        }
      )}
      {...rest}
    />
  );
};

export default ToggleItem;
