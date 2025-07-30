import React, { FC } from "react";
import { cn } from "@/lib/utils";
import { useDroppable } from "@dnd-kit/core";

interface DroppableProps {
	className?: string;
	children?: React.ReactNode;
	id: number | string; // ID is required
}

export const Droppable: FC<DroppableProps> = React.memo(
	({ className, children, id }) => {
		const { isOver, setNodeRef } = useDroppable({
			id: id,
		});

		const style = {
			// You can add visual feedback here when an item is over the droppable
			backgroundColor: isOver ? "rgba(0, 117, 149, 0.1)" : undefined, // Light blue tint
			transition: "background-color 0.2s ease-in-out", // Smooth transition
		};

		return (
			<div
				ref={setNodeRef}
				style={style}
				// Ensure the droppable fills its parent div for easier interaction
				className={cn(
					"w-full h-full flex items-center justify-center",
					className,
				)}
			>
				{children}
			</div>
		);
	},
);

// Droppable.displayName = "Droppable";
