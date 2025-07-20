import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { NavLink, useParams } from "react-router-dom";
import { Separator } from "../ui/separator";

const links = [
    { label: "Thông Tin Cá Nhân", value: "info" },
    { label: "Địa Chỉ", value: "address" },
    { label: "Đơn Hàng", value: "orders" },
];

export default function Sidebar({ account }) {
    const { tab } = useParams();

    return (
        <div className="w-full sm:w-64 bg-background p-6 border-r space-y-6 rounded-2xl">
            <div className="text-center">
                <Avatar className="mx-auto h-16 w-16">
                    <AvatarImage src="" />
                    <AvatarFallback>IT</AvatarFallback>
                </Avatar>
                <div className="mt-2 font-semibold text-foreground">{account?.username}</div>
                <div className="text-sm text-muted-foreground">{account?.email}</div>
            </div>

            <nav className="flex flex-col gap-3 text-sm">
                {links.map(({ label, value }) => (
                    <>
                    <Separator className={`mb-2`}/>
                    <NavLink
                        key={value}
                        to={`/personal/${value}`}
                        className={({ isActive }) =>
                            isActive
                                ? "text-primary font-medium !text-lg"
                                : "text-muted-foreground hover:text-foreground !text-lg"
                        }
                    >
                        {label}
                    </NavLink>
                    </>
                ))}
            </nav>
        </div>
    );
}
