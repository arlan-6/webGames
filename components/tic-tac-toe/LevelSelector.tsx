"use client";

import {  useId, useState } from "react";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface LevelSelectorProps {
  value?: string;
  onChange?: (value: number) => void;
  className?: string;
  disabled?:boolean
}

function LevelSelector({ value, onChange, className = "" ,disabled=false}: LevelSelectorProps) {
  const id = useId();
  const [selectedValue, setSelectedValue] = useState(value ?? "1");

  const handleChange = (val: string) => {
    setSelectedValue(val);
    onChange?.(parseInt(val));
  };

  return (
    <div
      className={`bg-input/50 inline-flex h-9 rounded-md p-0.5 mb-4 ${className}`}
    >
      <RadioGroup 
      disabled={disabled}
        value={selectedValue}
        onValueChange={handleChange}
        className="group after:bg-background has-focus-visible:after:border-ring has-focus-visible:after:ring-ring/50 relative inline-grid grid-cols-[1fr_1fr_1fr] items-center gap-0 text-sm font-medium after:absolute after:inset-y-0 after:w-1/3 after:rounded-sm after:shadow-xs after:transition-[translate,box-shadow] after:duration-300 after:ease-[cubic-bezier(0.16,1,0.3,1)] has-focus-visible:after:ring-[3px] data-[state=1]:after:translate-x-0 data-[state=2]:after:translate-x-full data-[state=3]:after:translate-x-[200%]"
        data-state={selectedValue}
      >
        <label
          className={`relative z-10 inline-flex h-full min-w-8 cursor-pointer items-center justify-center px-4 whitespace-nowrap transition-colors select-none ${
            selectedValue !== "1" && "text-muted-foreground/70"
          }`}
        >
          Level 1
          <RadioGroupItem id={`${id}-1`} value="1" className="sr-only" />
        </label>
        <label
          className={`relative z-10 inline-flex h-full min-w-8 cursor-pointer items-center justify-center px-4 whitespace-nowrap transition-colors select-none ${
            selectedValue !== "2" && "text-muted-foreground/70"
          }`}
        >
          Level 2
          <RadioGroupItem id={`${id}-2`} value="2" className="sr-only" />
        </label>
        <label
          className={`relative z-10 inline-flex h-full min-w-8 cursor-pointer items-center justify-center px-4 whitespace-now-rap transition-colors select-none ${
            selectedValue !== "3" && "text-muted-foreground/70"
          }`}
        >
          Level 3
          <RadioGroupItem id={`${id}-3`} value="3" className="sr-only" />
        </label>
      </RadioGroup>
    </div>
  );
}
export default LevelSelector;