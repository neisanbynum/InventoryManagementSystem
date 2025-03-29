import Controls from "./controls";
import Label from "./heading";

export default function Topbar(): React.ReactNode {
    return (
        <div className='hstack h-12 p-2 justify-between bg-slate-50 dark:bg-black'>
            <Label/>
            <Controls/>
        </div>
    )
}