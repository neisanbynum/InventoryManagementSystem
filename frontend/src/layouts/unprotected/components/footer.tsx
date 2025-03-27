import { HStack } from "@/components/custom/containers";
import { CSSProperties, ReactNode } from "react";
import { FOOTER } from "../constants";

export default function Footer(): ReactNode {
    const fontSize: CSSProperties['fontSize'] = `calc(${FOOTER.height} - (${FOOTER.padding} * 2))`
    return (
        <HStack
            width={'100vw'}
            height={FOOTER.height}
            maxHeight={FOOTER.height}
            padding={FOOTER.padding}
            className="bg-slate-50 dark:bg-black"
        >
            <p style={{ fontSize }}>Created by Nathan Bynum 2025</p>
        </HStack>
    )
}