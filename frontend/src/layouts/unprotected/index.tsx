import { ReactNode } from "react";
import { Outlet } from "react-router";
import Menubar from "./components/menubar";
import { HStack, VStack } from "@/components/custom/container";
import { ClassName } from "@/components/custom.types";


export default function UnprotectedLayout(): ReactNode {
    const rootStyle: ClassName = 'min-w-screen w-screen max-w-screen min-h-screen h-screen max-h-screen gap-none'

    return (
        <VStack className={rootStyle}>
            <Menubar/>
            <VStack>
                <Outlet/>
            </VStack>
            <HStack key='App-Footer' className={'h-8 p-1 bg-slate-50 dark:bg-black'}>
                <p>Created by Nathan Bynum 2025</p>
            </HStack>
        </VStack>
    )
}

