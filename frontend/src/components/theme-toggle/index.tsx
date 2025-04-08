import React from "react";
import { ToolTip, ToolTipContent, ToolTipTrigger } from "../custom/tooltip";
import Toggle from "./toggle";
import { useSelector } from "react-redux";
import { RootState } from "@/state/main";
import { titlecase } from "@/utils/helpers/parsers";

export default function ThemeToggle(): React.ReactNode {
	const { currTheme } = useSelector((state: RootState) => state.app)
    
    return (
        // <ToolTip delay={500}>
        //     <ToolTipTrigger>
                <Toggle currTheme={currTheme}/>
        //     </ToolTipTrigger>
        //     <ToolTipContent>
        //         {`${titlecase(currTheme === 'dark' ? 'light' : 'dark')} Theme`}
        //     </ToolTipContent>
        // </ToolTip>
    )
}