import ThemeToggle from "./theme-toggle";
import MenubarMenu from "./menubar.menu";
import { useSelector } from "react-redux";
import { RootState } from "@/state/main";

export default function Menubar(): React.ReactNode {
    return (
        <div className='hstack h-12 p-1 justify-between bg-slate-50 dark:bg-black'>
            <Label/>
            <Controls/>
        </div>
    )
}

function Label(): React.ReactNode {
    const { authenticated, userName } = useSelector((state: RootState) => state.app)
    if (!authenticated) return <p>Inventory Management System</p>

    return <p>{`${userName?.last}, ${userName?.first} ${userName?.middle}`.trim()}</p>
}

function Controls(): React.ReactNode {
    return (
        <div className="hstack w-fit justify-between gap-1">
            <MenubarMenu/>
            <ThemeToggle/>
        </div>
    )
}