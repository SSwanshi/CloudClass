import { Logo } from "./logo"
import { SidebarRoutes } from "./sidebar-routes"

export const Sidebar = () => {
    return (
        <>
        <div className="h-full border-r flex flex-col overflow-y-auto bg-white shadow-sm">
            <div className="p-6 flex">
                <Logo />
                <div className="self-center ml-2 text-lg md:text-xl font-extrabold tracking-wide font-[Poppins] bg-gradient-to-r from-blue-600 to-cyan-400 text-transparent bg-clip-text drop-shadow-sm">Cloud Class</div>
            </div>
            <div className="flex flex-col w-full">
            <SidebarRoutes />
        </div>
        </div>
        
        </>
        
    )
}