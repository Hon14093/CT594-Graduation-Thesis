import React from 'react'
import { Separator } from '../ui/separator'
import { SidebarInset, SidebarTrigger } from '../ui/sidebar'
import { ArrowUpDown } from 'lucide-react'
import { Button } from '../ui/button'
import { 
    Breadcrumb, 
    BreadcrumbList, 
    BreadcrumbItem, 
    BreadcrumbLink, 
    BreadcrumbPage, 
    BreadcrumbSeparator 
} from '../ui/breadcrumb'
import { DataTable } from '../data-table'

const tempCols = [
    { 
        accessorKey: "col1", 
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Email
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
    },
    { accessorKey: "col2", header: "Col 2" },
    { accessorKey: "col3", header: "Col 3" },
];

const tempData = [
    { col1: "Alice", col2: "Manager", col3: "NY" },
    { col1: "Bob", col2: "Engineer", col3: "CA" },
    { col1: "Charlie", col2: "Designer", col3: "TX" },
    { col1: "Diana", col2: "Developer", col3: "FL" },
    { col1: "Ethan", col2: "Architect", col3: "WA" },
    { col1: "Fiona", col2: "Product Owner", col3: "CO" },
    { col1: "George", col2: "QA Tester", col3: "NV" },
    { col1: "Hannah", col2: "Scrum Master", col3: "IL" },
    { col1: "Ian", col2: "DevOps", col3: "MI" },
    { col1: "Julia", col2: "Support", col3: "GA" },
    { col1: "Kyle", col2: "Intern", col3: "NC" },
    { col1: "Laura", col2: "HR", col3: "OH" },
    { col1: "Mike", col2: "Consultant", col3: "AZ" },
    { col1: "Nina", col2: "Engineer", col3: "OR" },
    { col1: "Oscar", col2: "Manager", col3: "PA" },
    { col1: "Pam", col2: "Analyst", col3: "MA" },
    { col1: "Quentin", col2: "Engineer", col3: "VA" },
    { col1: "Rachel", col2: "UX Researcher", col3: "MN" },
    { col1: "Sam", col2: "Marketing", col3: "MO" },
    { col1: "Tina", col2: "Sales", col3: "WI" },
];


export default function Analytics() {
    return (
        <SidebarInset className='bg-mistGray'>
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

            <div>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab voluptas tempore veritatis dolorem mollitia qui, impedit est suscipit blanditiis reprehenderit praesentium optio vel non rerum ducimus doloremque hic natus provident? Ullam consectetur culpa illum exercitationem reprehenderit molestiae? Vitae sequi itaque mollitia rem expedita ipsam voluptas.

                <DataTable columns={tempCols} data={tempData} />
            </div>
        </SidebarInset>
    )
}
