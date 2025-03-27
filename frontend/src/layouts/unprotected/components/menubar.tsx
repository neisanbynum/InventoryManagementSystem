import { HStack } from "@/components/custom/containers";
import { ReactNode } from "react";
import ThemeToggle from "./theme-toggle";
import { MENUBAR } from "../constants";
import MenubarMenu from "./menubar.menu";


export default function Menubar(): ReactNode {
    return (
        <HStack
            width={'100vw'}
            height={MENUBAR.height}
            justify="space-between"
            padding={MENUBAR.padding}
            className="bg-slate-50 dark:bg-black"
        >
            <Label/>
            <Controls/>
        </HStack>
    )
}

function Label(): ReactNode {
    const authenticated: boolean = false

    if (!authenticated) return <p>Inventory Management System</p>

    return <p>Team - User</p>
}

function Controls(): ReactNode {
    return (
        <HStack 
            width={'fit-content'}
            justify="space-between"
            gap={'0.25rem'}
        >
            <MenubarMenu/>
            <ThemeToggle iconSize={`calc(${MENUBAR.height} - ${MENUBAR.padding})`}/>
        </HStack>
    )
}