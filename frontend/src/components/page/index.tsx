import pages from "@/pages/pages.config"
import { RootState } from "@/state/main"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router"
import Spinner from "../custom/spinner"
import Topbar from "../topbar"
import PageProvider from "./page.context"
import { usePageContext } from "./page.utils"

interface PageProps {
    children?: React.ReactNode
    secure?: boolean
}

export default function Page({ children, secure = false }: PageProps): React.ReactElement {
    return (
        <PageProvider>
            <PageContent secure={secure}>
                { children }
            </PageContent>
        </PageProvider>
    )
}

function PageContent({ children, secure }: PageProps): React.ReactElement {
    const { ref, renderScrollBar } = usePageContext()
    const { authenticated } = useSelector((state: RootState) => state.app)

    return (
        <div
            id="Page-Container"
            className={'grid grid-rows-[3rem_calc(100vh-3rem)] grid-cols-[100vw]'}
        >
            <Topbar className={'row-start-1 row-span-1 col-start-1 col-end-2'}/>
            <div
                id="Page-Content"
                ref={ref}
                className={'row-start-2 row-span-1 col-start-1 col-span-1 flex flex-col justify-center items-center gap-4 p-4 m-0 hidden-scroll overflow-x-hidden overflow-y-auto'}
            >
                {(secure && !authenticated) ? <RedirectPage/> : children}
                {renderScrollBar && <ScrollBar/>}
            </div>
        </div>
    )
}

function RedirectPage(): React.ReactElement {
    const navigate = useNavigate()
    navigate(pages.signin)

    return (
        <div className='vstack gap-4'>
            <Spinner size={36} />
            <p className='text-lg font-semibold'>Redirecting Back to Sign In...</p>
        </div>
    )
}

function ScrollBar(): React.ReactElement {
    const { renderScrollBar, scrollBarStyle, scrollThumbStyle } = usePageContext()

    return (
        <div className="z-40 bg-slate-200 dark:bg-slate-500 opacity-25 pointer-events-none" style={scrollBarStyle}>
            <div
                role='scrollbar'
				aria-orientation={'vertical'}
				aria-hidden={!renderScrollBar}
                className="z-50 rounded-full bg-slate-500 dark:bg-slate-700 opacity-100 transition-all duration-0 ease-in-out"
                style={scrollThumbStyle}
            />
        </div>
    )
}