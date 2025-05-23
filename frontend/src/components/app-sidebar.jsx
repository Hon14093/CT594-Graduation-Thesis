import * as React from "react"
import {
	AudioWaveform,
	BookOpen,
	Bot,
	ChartColumn,
	Laptop,
	Frame,
	GalleryVerticalEnd,
	Map,
	PieChart,
	TicketPercent,
	Boxes,
	Settings2,
	SquareTerminal,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
	SidebarRail,
} from "@/components/ui/sidebar"

const data = {
	user: {
		name: "shadcn",
		email: "m@example.com",
		avatar: "/avatars/shadcn.jpg",
	},
	teams: [
		{
			name: "Laptopia",
			logo: Laptop,
			// plan: "Enterprise",
		},
	],
	projects: [
		{
			name: "Thống Kê",
			url: "http://localhost:5173/admin",
			icon: ChartColumn,
		},
		{
			name: "Products",
			url: "http://localhost:5173/admin/products",
			icon: Boxes,
		},
		{
			name: "Discounts",
			url: "http://localhost:5173/admin/discounts",
			icon: TicketPercent,
		},
	],
}

export function AppSidebar({
	...props
}) {
	return (
		(<Sidebar collapsible="icon" {...props}>
			<SidebarHeader className='bg-techBlue text-white'>
				<TeamSwitcher teams={data.teams} />
			</SidebarHeader>

			<SidebarContent className='bg-techBlue text-white'>
				<NavProjects projects={data.projects} />
			</SidebarContent>

			<SidebarFooter className='bg-techBlue text-white'>
				<NavUser user={data.user} />
			</SidebarFooter>

			<SidebarRail />
		</Sidebar>)
	);
}
