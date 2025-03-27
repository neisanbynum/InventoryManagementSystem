import { CSSProperties, ReactNode } from "react";
import { Outlet } from "react-router";
import Menubar from "./components/menubar";
import { VStack } from "@/components/custom/containers";
import { FOOTER, MENUBAR } from "./constants";
import Footer from "./components/footer";

export default function UnprotectedLayout(): ReactNode {
    const viewHeight: CSSProperties['height'] = `calc(100vh - ${MENUBAR.height} - ${FOOTER.height})`

    return (
        <>
            <Menubar/>
            <VStack
                width={'100vw'}
                height={viewHeight}
                maxHeight={viewHeight}
            >
                <Outlet/>
            </VStack>
            <Footer/>
        </>
    )
}

