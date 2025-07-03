import {
	ChartColumn,
	TicketPercent,
	Boxes,
	ClipboardList,
	BriefcaseBusiness,
} from "lucide-react"

import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuAction,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
} from "@/components/ui/sidebar"
import { Link } from "react-router-dom";

export function NavProjects({
    projects
}) {
    return (
        (<SidebarGroup className="group-data-[collapsible=icon]:hidden">
            <SidebarGroupLabel className='text-white'>Quản lý</SidebarGroupLabel>
            <SidebarMenu>
                {projects.map((item) => (
                    <SidebarMenuItem key={item.name} className='pb-2'>
                        <SidebarMenuButton asChild>
                            <Link to={item.url} className="p-2 h-10">
                                {/* <item.icon size={50}/>  */}
                                <item.icon className="!size-5" />
                                <span className="text-md font-semibold">{item.name}</span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                ))}
            </SidebarMenu>
        </SidebarGroup>)
    );
}
