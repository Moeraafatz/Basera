"use client";

import * as React from "react";
import * as AccordionPrimitives from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const Accordion = AccordionPrimitives.Root;

const AccordionItem = React.forwardRef<
  React.ComponentRef<typeof AccordionPrimitives.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitives.Item>
>(({ className, ...props }, ref) => (
  <AccordionPrimitives.Item
    ref={ref}
    className={cn("border-b border-white/5", className)}
    {...props}
  />
));
AccordionItem.displayName = "AccordionItem";

const AccordionTrigger = React.forwardRef<
  React.ComponentRef<typeof AccordionPrimitives.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitives.Trigger>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitives.Header className="flex">
    <AccordionPrimitives.Trigger
      ref={ref}
      className={cn(
        "flex flex-1 items-center justify-between py-4 text-sm font-medium text-zinc-300 transition-all duration-300 hover:text-white [&[data-state=open]>svg]:rotate-180 [&[data-state=open]>span]:text-cyan-400",
        className
      )}
      {...props}
    >
      <span className="transition-colors duration-300">{children}</span>
      <ChevronDown className="h-4 w-4 shrink-0 text-zinc-500 transition-transform duration-300 ease-in-out" />
    </AccordionPrimitives.Trigger>
  </AccordionPrimitives.Header>
));
AccordionTrigger.displayName = AccordionPrimitives.Trigger.displayName;

const AccordionContent = React.forwardRef<
  React.ComponentRef<typeof AccordionPrimitives.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitives.Content>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitives.Content
    ref={ref}
    className="overflow-hidden text-sm data-[state=closed]:animate-[accordion-up] data-[state=open]:animate-[accordion-down]"
    {...props}
  >
    <div className={cn("pb-4 pt-2", className)}>{children}</div>
  </AccordionPrimitives.Content>
));
AccordionContent.displayName = AccordionContent.displayName;

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
