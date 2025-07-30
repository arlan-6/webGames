import React, { FC } from "react";
import { cn } from "@/lib/utils";
import { useDraggable } from "@dnd-kit/core";
import { Button } from "../ui/button";
import { CSS } from '@dnd-kit/utilities';

interface DraggableProps {
    className?: string;
    children?: React.ReactNode;
    id: string | number; // Make ID required
}

export const Draggable: FC<DraggableProps> = React.memo(({ className, children, id }) => {
    const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({ // Destructure isDragging
        id: id,
    });

    // Apply transform only if not currently dragging (i.e., not the overlay)
    // or if you intend for the original element to move if not using DragOverlay
    // For DragOverlay, the original element should *not* be transformed.
    const style: React.CSSProperties = {
        // When using DragOverlay, the original Draggable should not move.
        // Instead, the DragOverlay will handle the movement.
        // You might just hide the original or make it transparent.
        // For simple elements, often you just apply opacity to the original.
    };

    return (
        <Button
            variant={"outline"}
            className={cn("cursor-pointer scale-150", className, isDragging ? "opacity-0" : "")} // Hide original while dragging
            ref={setNodeRef}
            // No need to apply style={style} if using DragOverlay for the actual drag visuals
            {...listeners}
            {...attributes}
        >
            {children}
        </Button>
    );
});