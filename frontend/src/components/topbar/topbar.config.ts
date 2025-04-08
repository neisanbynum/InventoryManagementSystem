import pages from "@/pages/pages.config";
import { MenuContent } from "./topbar.types";

export const UnsecureContent: MenuContent = [
    { type: 'link', label: 'Authenticate', link: pages.signin },
    { type: 'link', label: 'Register', link: pages.register },
    { type: 'link', label: 'Test Page', link: pages.test }
]