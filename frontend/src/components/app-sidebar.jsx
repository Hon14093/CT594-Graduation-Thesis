import * as React from "react"
import {
	ChartColumn,
	TicketPercent,
	Boxes,
	List,
	ClipboardList,
	ClipboardCheck,
	BriefcaseBusiness,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import logo from "../assets/Logo_white.png"
import { NavProjects } from "@/components/nav-projects"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import { Link } from "react-router-dom"
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
	projects: [
		{
			name: "Thống Kê",
			url: "http://localhost:5173/admin",
			icon: ChartColumn,
		},
		{
			name: "Sản Phẩm",
			url: "http://localhost:5173/admin/products",
			icon: Boxes,
		},
		{
			name: "Danh Mục",
			url: "http://localhost:5173/admin/categories",
			icon: List,
		},
		{
			name: "Thương Hiệu",
			url: "http://localhost:5173/admin/brands",
			icon: BriefcaseBusiness,
		},
		{
			name: "Khuyến Mãi",
			url: "http://localhost:5173/admin/discounts",
			icon: TicketPercent,
		},
		{
			name: "Duyệt Đơn Hàng",
			url: "http://localhost:5173/admin/orders/check",
			icon: ClipboardCheck,
		},
		{
			name: "Đơn Hàng",
			url: "http://localhost:5173/admin/orders/processed",
			icon: ClipboardList,
		},
	],
}

export function AppSidebar({
	...props
}) {
	return (
		(<Sidebar collapsible="icon" {...props} className='raleway'>
			<SidebarHeader className='bg-techBlue text-white'>
				<Link className="flex items-center gap-2 px-4 pt-4" to="/">
					<img src={logo} alt="" className="w-[100%]" />
				</Link>
			</SidebarHeader>

			<SidebarContent className='bg-techBlue text-white'>
				<NavProjects projects={data.projects} />
			</SidebarContent>

			<SidebarFooter className='bg-techBlue text-white'>
				{/* <NavUser user={data.user} /> */}
			</SidebarFooter>

			<SidebarRail />
		</Sidebar>)
	);
}
