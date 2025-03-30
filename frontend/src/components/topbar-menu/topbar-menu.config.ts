import pages from "@/pages/pages.config";
import { MenuContent } from "./topbar-menu.types";

const menuContent: MenuContent = [
    { type: 'link', label: 'Authentication', link: pages.signin },
    { type: 'divider' },
    { type: 'link', label: 'Registration', link: pages.register },
    { type: 'link', label: 'Verification', link: pages.verification}
]

export default menuContent