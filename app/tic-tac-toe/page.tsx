import React, { FC } from "react";
import { cn } from "@/lib/utils";
import { Board } from "@/components/tic-tac-toe/Board";

interface pageProps {
	className?: string;
}
const Page: FC<pageProps> = ({ className }) => {
	return (
		<div className={cn("", className)}>
			<Board />
		</div>
	);
};
export default Page;
