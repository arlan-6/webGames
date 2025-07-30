import React, { FC } from 'react'
import { cn } from '@/lib/utils' 
import {useDroppable} from '@dnd-kit/core';

interface DroppableProps {
 className?:string
    children?: React.ReactNode;
    id?: number | string; // Use number or string based on your ID type
}

export const Droppable: FC<DroppableProps> = ({ className, children,id }) => {
    const {isOver, setNodeRef} = useDroppable({
    id: id || 'droppable-item',
  });
  const style = {
    color: isOver ? 'green' : undefined,
  };
  return (
    <div ref={setNodeRef} style={style}>
        {children}
    </div>
  )
}