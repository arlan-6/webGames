"use client";

import { JSX, useId, useState } from "react";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Bot, Users } from "lucide-react";

interface PlayerOrBotProps {
	value?: string;
	onChange?: (value: boolean) => void;
	className?: string;
}
function PlayerOrBot({ value, onChange, className = "" }: PlayerOrBotProps) {
	const id = useId();
	const [selectedValue, setSelectedValue] = useState(value ?? "off");

	// Keep internal state in sync with controlled value
	// If value prop changes, update selectedValue
	// This effect is only needed if you want to support controlled usage
	// Remove if you want only uncontrolled
	// useEffect(() => {
	//   if (value !== undefined) setSelectedValue(value)
	// }, [value])

	const handleChange = (val: string) => {
		setSelectedValue(val);
		onChange?.(val === "on");
	};

	return (
		<div
			className={`bg-input/50 inline-flex h-9 rounded-md p-0.5 mb-4 ${className}`}
		>
			<RadioGroup
				value={selectedValue}
				onValueChange={handleChange}
				className="group after:bg-background has-focus-visible:after:border-ring has-focus-visible:after:ring-ring/50 relative inline-grid grid-cols-[1fr_1fr] items-center gap-0 text-sm font-medium after:absolute after:inset-y-0 after:w-1/2 after:rounded-sm after:shadow-xs after:transition-[translate,box-shadow] after:duration-300 after:ease-[cubic-bezier(0.16,1,0.3,1)] has-focus-visible:after:ring-[3px] data-[state=off]:after:translate-x-0 data-[state=on]:after:translate-x-full"
				data-state={selectedValue}
			>
				<label className="group-data-[state=on]:text-muted-foreground/70 relative z-10 inline-flex h-full min-w-8 cursor-pointer items-center justify-center px-4 whitespace-nowrap transition-colors select-none">
					<Users strokeWidth={1.5} className="mr-2" /> 2 Players
					<RadioGroupItem id={`${id}-1`} value="off" className="sr-only" />
				</label>
				<label className="group-data-[state=off]:text-muted-foreground/70 relative z-10 inline-flex h-full min-w-8 cursor-pointer items-center justify-center px-4 whitespace-nowrap transition-colors select-none">
					<span className="flex items-center flex-row">
						<Bot strokeWidth={1.5} className="mr-2" /> With bot{" "}
					</span>
					<RadioGroupItem id={`${id}-2`} value="on" className="sr-only" />
				</label>
			</RadioGroup>
		</div>
	);
}
type BotLevelsType = 'easy' | 'medium' | 'hard';

interface BotLevelsProps {
  value?: BotLevelsType;
  onChange?: (value: BotLevelsType) => void;
  className?: string;
}

const botLevelsData = [
  { value: 'easy', label: 'Easy lvl', icon: Users },
  { value: 'medium', label: 'Medium lvl', icon: Bot },
  { value: 'hard', label: 'Hard lvl', icon: Bot },
];

const BotLevels = ({ value, onChange, className = "" }: BotLevelsProps): JSX.Element => {
  const id = useId();
  const [selectedValue, setSelectedValue] = useState<BotLevelsType>(value ?? 'easy');

  const handleChange = (val: BotLevelsType) => {
    console.log(val);
    
    setSelectedValue(val);
    onChange?.(val);
  };
  console.log(selectedValue);
  
  const groupClasses = "group after:bg-background has-focus-visible:after:border-ring has-focus-visible:after:ring-ring/50 relative inline-grid grid-cols-[1fr_1fr_1fr] items-center gap-0 text-sm font-medium after:absolute after:inset-y-0 after:w-1/3 after:rounded-sm after:shadow-xs after:transition-[translate,box-shadow] after:duration-300 after:ease-[cubic-bezier(0.16,1,0.3,1)] has-focus-visible:after:ring-[3px] data-[state=off]:after:translate-x-0 data-[state=on]:after:translate-x-full";

  const labelClasses = "relative z-10 inline-flex h-full min-w-8 cursor-pointer items-center justify-center px-4 whitespace-nowrap transition-colors select-none group-data-[state=on]:text-muted-foreground/70";

  return (
    <div className={`bg-input/50 inline-flex h-9 rounded-md p-0.5 mb-4 ${className}`}>
      <RadioGroup
        value={selectedValue}
        onValueChange={handleChange}
        className={groupClasses}
        // data-state={selectedValue}
      >
        {botLevelsData.map(({ value, label, icon: Icon }) => (
          <label
            key={value}
            htmlFor={`${id}-${value}`}
            className={labelClasses}
          >
            <span className="flex items-center flex-row">
              <Icon strokeWidth={1.5} className="mr-2" />
              {label}
            </span>
            <RadioGroupItem id={`${id}-${value}`} value={value} className="sr-only" />
          </label>
        ))}
      </RadioGroup>
    </div>
  );
};
export type {BotLevelsType}
export { PlayerOrBot, BotLevels };
