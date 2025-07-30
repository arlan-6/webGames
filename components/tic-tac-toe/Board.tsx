"use client";
import React, { FC, useEffect, useState,  useCallback } from "react";
import { cn } from "@/lib/utils";
import { BrushCleaning, Circle, SquareDashed, X } from "lucide-react";
import {
    DndContext,
    DragEndEvent,
    DragOverEvent,
    DragStartEvent,
    DragOverlay,
} from "@dnd-kit/core";
import { Draggable } from "./Draggable"; // Assuming Draggable.tsx is in the same directory
import { Droppable } from "./Droppable"; // Assuming Droppable.tsx is in the same directory
import { createPortal } from "react-dom";
import { Button } from "../ui/button"; // Assuming your button component

interface BoardProps {
    className?: string;
}

// Define possible states for a cell
type CellValue = "" | "X" | "O";
type Player = "X" | "O";

const WIN_CONDITIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

export const Board: FC<BoardProps> = ({ className }) => {
    // Game state
    const [board, setBoard] = useState<CellValue[]>(Array(9).fill(""));
    const [currentPlayer, setCurrentPlayer] = useState<Player>("X"); // Renamed moveOf to currentPlayer for clarity
    const [winner, setWinner] = useState<Player | null>(null);
    const [isDraw, setIsDraw] = useState<boolean>(false);

    // Dnd-kit state
    const [activeId, setActiveId] = useState<string | number | null>(null);

    // --- Game Logic ---

    // Memoize the checkWinner function to avoid re-creating on every render
    const checkWinner = useCallback((currentBoard: CellValue[]): Player | null => {
        for (const condition of WIN_CONDITIONS) {
            const [a, b, c] = condition;
            if (
                currentBoard[a] &&
                currentBoard[a] === currentBoard[b] &&
                currentBoard[a] === currentBoard[c]
            ) {
                return currentBoard[a] as Player;
            }
        }
        return null;
    }, []);

    // Memoize the checkDraw function
    const checkDraw = useCallback((currentBoard: CellValue[]): boolean => {
        return !checkWinner(currentBoard) && currentBoard.every(cell => cell !== "");
    }, [checkWinner]);

    useEffect(() => {
        const currentWinner = checkWinner(board);
        if (currentWinner) {
            setWinner(currentWinner);
            // alert(`${currentWinner} wins!`); // Consider a more elegant modal/toast
        } else if (checkDraw(board)) {
            setIsDraw(true);
            // alert("It's a draw!"); // Consider a more elegant modal/toast
        }
    }, [board, checkWinner, checkDraw]); // Dependencies for useEffect

    // --- Dnd-kit Handlers ---

    const handleDragStart = (event: DragStartEvent): void => {
        // Only allow dragging if there's no winner/draw and the dragged item matches the current player
        if (!winner && !isDraw && event.active.id.toString().toUpperCase() === currentPlayer) {
            setActiveId(event.active.id);
        } else {
            // Prevent drag if it's not the correct player's turn or game is over
            setActiveId(null);
        }
    };

    const handleDragEnd = (event: DragEndEvent): void => {
        const { active, over } = event;

        // Reset activeId immediately regardless of drop success
        setActiveId(null);

        // If game is over or activeId is null (drag prevented), do nothing
        if (winner || isDraw || !activeId) {
            return;
        }

        // Check if an item was dropped over a valid droppable area
        if (over) {
            const dropZoneIndex = (over.id as number) - 1; // Adjust to 0-indexed array
            const draggablePlayerSymbol = active.id.toString().toUpperCase(); // 'X' or 'O'

            // Check if the cell is empty and the correct player is making the move
            if (board[dropZoneIndex] === "" && draggablePlayerSymbol === currentPlayer) {
                setBoard((prevBoard) => {
                    const newBoard = [...prevBoard];
                    newBoard[dropZoneIndex] = draggablePlayerSymbol as CellValue;
                    return newBoard;
                });
                setCurrentPlayer((prev) => (prev === "X" ? "O" : "X")); // Toggle player
            }
        }
    };

    // No specific logic needed for handleDragOver in this simple case
    // const handleDragOver = (event: DragOverEvent) => {
        // For debugging, if needed:
        // console.log("Drag over event:", event.active.id, "Over:", event.over?.id);
    // };

    const handleResetGame = () => {
        setBoard(Array(9).fill(""));
        setCurrentPlayer("X");
        setWinner(null);
        setIsDraw(false);
    };

    // --- Render Logic for DragOverlay ---
    const renderDragOverlayContent = () => {
        if (!activeId) return null; // Only render if an item is active

        const symbol = activeId.toString().toUpperCase(); // Get 'X' or 'O'
        const color = symbol === "X" ? "#007595" : "#65a30d";

        return (
            <Draggable id={activeId} className="cursor-grabbing scale-150">
                {symbol === "X" ? (
                    <X strokeWidth={4} color={color} />
                ) : (
                    <Circle strokeWidth={4} color={color} />
                )}
            </Draggable>
        );
    };

    return (
        <div className={cn("w-full p-10 flex flex-col items-center", className)}>
            <DndContext
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
                onDragCancel={() => {
                    console.log("Drag cancelled");
                    setActiveId(null);
                }}
                // onDragOver={handleDragOver}
            >
                {/* Game Info and Reset Button */}
                <div className="mb-6 text-xl font-bold flex items-center gap-4">
                    {winner ? (
                        <span className="text-green-600 text-5xl">{winner} wins!</span>
                    ) : isDraw ? (
                        <span className="text-yellow-600">It is a Draw!</span>
                    ) : (
                        <span>Current Player: {currentPlayer}</span>
                    )}
                    <Button
                        variant="outline"
                        onClick={handleResetGame}
                        className="hover:bg-destructive-foreground text-red-600 cursor-pointer"
                    >
                        Reset <BrushCleaning strokeWidth={2} className="ml-2" />
                    </Button>
                </div>

                {/* Draggable Pieces (X and O) */}
                <div className="flex gap-8 mb-8">
                    <div className="flex flex-col items-center">
                        <span className="text-lg font-semibold mb-2">X s Turn</span>
                        {/* Only render Draggable if it's X's turn and X is not currently being dragged */}
                        {currentPlayer === "X" && !winner && !isDraw ? (
                            <Draggable
                                id="x"
                                className={cn(activeId === "x" ? "opacity-0" : "", "animate-in zoom-in-50 duration-300")}
                            >
                                <X strokeWidth={4} color="#007595" />
                            </Draggable>
                        ) : (
                            <Button variant="outline" className="scale-[1] animate-in zoom-in-50 duration-150 opacity-50 cursor-not-allowed">
                                <X strokeWidth={4} color="gray" />
                            </Button>
                        )}
                    </div>
                    <div className="flex flex-col items-center">
                        <span className="text-lg font-semibold mb-2">O s Turn</span>
                        {/* Only render Draggable if it's O's turn and O is not currently being dragged */}
                        {currentPlayer === "O" && !winner && !isDraw ? (
                            <Draggable
                                id="o"
                                className={cn(activeId === "o" ? "opacity-0" : "", "animate-in zoom-in-50 duration-300")}
                            >
                                <Circle strokeWidth={4} color="#65a30d" />
                            </Draggable>
                        ) : (
                            <Button variant="outline" className="scale-[1] animate-in zoom-in-50 duration-150 opacity-50 cursor-not-allowed">
                                <Circle strokeWidth={4} color="gray" />
                            </Button>
                        )}
                    </div>
                </div>

                {/* Tic-Tac-Toe Board Grid */}
                <div className="flex flex-wrap border-2 border-dashed border-gray-400 rounded-lg overflow-hidden w-[28rem] h-[28rem]"> {/* Fixed width for better layout */}
                    {Array.from({ length: 9 }).map((_, i) => (
                        <div
                            key={i}
                            className="w-1/3 h-1/3 border border-dashed border-gray-300 flex items-center justify-center p-2"
                        >
                            {board[i] ? (
                                // Render X or O if cell is occupied
                                board[i] === "X" ? (
                                    <X
                                        strokeWidth={4}
                                        color="#007595"
                                        size={72}
                                        className="animate-in zoom-in-50 duration-300" // Apply animation here
                                    />
                                ) : (
                                    <Circle
                                        strokeWidth={4}
                                        color="#65a30d"
                                        size={72}
                                        className="animate-in zoom-in-50 duration-300" // Apply animation here
                                    />
                                )
                            ) : (
                                // Render Droppable if cell is empty
                                <Droppable id={i + 1} className="w-full h-full flex items-center justify-center">
                                    <SquareDashed className="text-gray-300 " size={72}/> {/* Smaller, lighter icon */}
                                </Droppable>
                            )}
                        </div>
                    ))}
                </div>

                {/* DragOverlay for smooth dragging experience */}
                {createPortal(
                    <DragOverlay>
                        {renderDragOverlayContent()}
                    </DragOverlay>,
                    document.body
                )}
            </DndContext>
        </div>
    );
};