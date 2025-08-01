import React, { FC } from "react";
import { cn } from "@/lib/utils";
import { useDraggable } from "@dnd-kit/core";
import { Button } from "../ui/button"; // Assuming your button component

interface DraggableProps {
    className?: string;
    children?: React.ReactNode;
    id: string | number; // ID is required
}

export const Draggable: FC<DraggableProps> = React.memo(({ className, children, id }) => {
    const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
        id: id,
    });

    return (
        <Button
            variant={"outline"}
            // Apply opacity-0 when dragging so the original element disappears
            // and only the DragOverlay is visible.
            className={cn("cursor-grab scale-150", className, isDragging ? "opacity-0" : "")}
            ref={setNodeRef}
            {...listeners}
            {...attributes}
        >
            {children}
        </Button>
    );
});

Draggable.displayName = "Draggable";