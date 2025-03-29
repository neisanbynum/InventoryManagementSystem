import { Outlet } from "react-router";
import Menubar from "./components/menubar";


export default function UnprotectedLayout(): React.ReactNode {

    return (
        <div className='vstack w-screen max-w-screen h-screen max-h-screen'>
            <Menubar/>
            <div className="vstack">
                <Outlet/>
            </div>
            <div className='hstack h-8 p-1 bg-slate-50 dark:bg-black'>
                <p>Created by Nathan Bynum 2025</p>
            </div>
        </div>
    )
}

