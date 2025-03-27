import { VStack } from "@/components/custom/container";
import { ReactNode } from "react";

export default function RegistrationVerification(): ReactNode {
    return (
        <VStack className='h-full'>
            <VStack className='gap-1'>
                <h1>Verification</h1>
                <p>Check your email to verify your account</p>
            </VStack>
        </VStack>
    )
}