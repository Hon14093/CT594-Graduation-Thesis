import React from "react";
import { Card, CardContent } from "@/components/ui/card";

export default function InfoCard({ label, value }) {
    return (
        <Card className="w-full sm:w-60">
            <CardContent className="pt-4">
                <div className="text-sm text-muted-foreground">{label}</div>
                <div className="mt-1 font-medium text-foreground">{value}</div>
            </CardContent>
        </Card>
    );
}
