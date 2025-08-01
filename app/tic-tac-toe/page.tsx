import React from "react";
import { cn } from "@/lib/utils";
import { Board } from "@/components/tic-tac-toe/Board";


const Page = () => {
	return (
		<div className={cn("")}>
			<Board />
		</div>
	);
};
export default Page;
