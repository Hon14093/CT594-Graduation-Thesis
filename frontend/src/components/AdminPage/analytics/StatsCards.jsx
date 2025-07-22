import React, { useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card.jsx";

export default function StatsCards({ data }) {
    return (
        <div className="grid auto-rows-min gap-4 md:grid-cols-3">
            <Card className="aspect-auto bg-blue-500 text-ivory text-white">
                <CardHeader>
                    <CardTitle>Doanh thu trong tháng</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-4xl font-sans">{data.revenue.toLocaleString()} vnđ</p>
                </CardContent>
            </Card>
            
            <Card className="aspect-auto bg-purple-500 text-white">
                <CardHeader>
                    <CardTitle>Tổng số đơn hàng</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-4xl font-sans">{data.orders}</p>
                </CardContent>
            </Card>

            <Card className="aspect-auto bg-yellow-500 text-white">
                <CardHeader>
                    <CardTitle>Tổng số khách hàng</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-4xl font-sans">{data?.totalAccounts || 10}</p>
                </CardContent>
            </Card>

            <Card className="aspect-auto bg-orange-500 text-white">
                <CardHeader>
                    <CardTitle>Đơn hàng cần duyệt</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-4xl font-sans">{data.uncheckedOrders}</p>
                </CardContent>
            </Card>

            <Card className="aspect-auto bg-green-500 text-white">
                <CardHeader>
                    <CardTitle>Giá trị bình quân đơn hàng</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-4xl font-sans">
                        {(data.revenue / data.orders).toLocaleString()} vnđ
                    </p>
                </CardContent>
            </Card>
        </div>
    )
}