import React, { useEffect, useState } from "react";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "../ui/breadcrumb.jsx";
import { Separator } from "../ui/separator.jsx";
import { SidebarInset, SidebarTrigger } from "../ui/sidebar";
import StatsCards from "./analytics/StatsCards.jsx";
import Popular from "./analytics/Popular.jsx";
import RevenueChart from "./analytics/RevenueChart.jsx";
import { getAllStats, getPopularProducts } from "@/hooks/analytics-api.js";

function Analytics() {
    const [data, setData] = useState({ revenue: 0, revenueLast30: 0 });
    const [popularProducts, setPopularProducts] = useState([]);

    useEffect(() => {
        getAllStats(setData);
        getPopularProducts(setPopularProducts);
    }, [])

    return (
        <SidebarInset>
            <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
                <div className="flex items-center gap-2 px-4">
                    <SidebarTrigger className="-ml-1" />
                    <Separator orientation="vertical" className="mr-2 h-4" />
                    <Breadcrumb>
                        <BreadcrumbList>
                            <BreadcrumbItem className="hidden md:block">
                                <BreadcrumbLink href="#">Quản lý</BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator className="hidden md:block" />
                            <BreadcrumbItem>
                                <BreadcrumbPage>Thống kê</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                </div>
            </header>

            <div className="flex flex-1 flex-col gap-4 p-4 pt-0 text-lg bg-mistGray">
                <StatsCards data={data} />

                <Popular products={popularProducts} />

                <RevenueChart />

            </div>
        </SidebarInset>
    );
}

export default Analytics;