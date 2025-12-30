"use client";

import type * as React from "react";

import { cn } from "@/lib/utils";

function Label({
  className,
  htmlFor,
  ...props
}: React.ComponentProps<"label"> & {
  htmlFor: string;
}) {
  return (
    <label
      className={cn(
        "flex select-none items-center gap-2 font-medium text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-50 group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50",
        className
      )}
      data-slot="label"
      htmlFor={htmlFor}
      {...props}
    >
      {props.children || <span className="sr-only">Label</span>}
    </label>
  );
}

export { Label };
