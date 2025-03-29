import { useState } from "react";
import { DropdownMenu } from "../ui/dropdown-menu";
import MenuTrigger from "./menu-trigger";
import MenuContent from "./menu-content";
import menuContent from "./topbar-menu.config";

export default function TopbarMenu(): React.ReactNode {
    const [ opened, setOpened ] = useState<boolean>(false)

    return (
        <DropdownMenu onOpenChange={setOpened}>
            <MenuTrigger opened={opened}/>
            <MenuContent content={menuContent}/>
        </DropdownMenu>
    )
}