import { DropdownMenuContent } from "../ui/dropdown-menu";
import MenuItem from "./menu-item";
import { MenuContentProps } from "./topbar-menu.types";

export default function MenuContent({ content, width = 200 }: MenuContentProps): React.ReactNode {
    if (!content || content.length === 0) return null
    
    return (
        <DropdownMenuContent className="shadow-lg duration-400" style={{width}}>
            {content.map((item, i) => <MenuItem key={`Menu-Item-${i}`} item={item}/>)}
        </DropdownMenuContent>
    )
}