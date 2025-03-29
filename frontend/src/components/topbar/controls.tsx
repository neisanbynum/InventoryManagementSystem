import ThemeToggle from "../theme-toggle";
import TopbarMenu from "../topbar-menu";

export default function Controls(): React.ReactNode {
    return (
        <div className="hstack w-fit justify-between gap-2">
            <TopbarMenu/>
            <ThemeToggle/>
        </div>
    )
}