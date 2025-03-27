import { VStack } from "@/components/custom/containers";
import { ReactNode } from "react";
import AuthPanel from "./components/auth-panel";

export default function AuthPageLayout(): ReactNode {
    return (
        <VStack>
            <AuthPanel/>
        </VStack>
    )
}