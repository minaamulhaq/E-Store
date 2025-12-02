"use client"

import { TrendingUp } from "lucide-react"
import { Label, Pie, PieChart } from "recharts"

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"

export const description = "A donut chart"

const chartData = [
    { status: "pending", count: 275, fill: "var(--color-pending)" },
    { status: "processing", count: 200, fill: "var(--color-processing)" },
    { status: "shipped", count: 187, fill: "var(--color-shipped)" },
    { status: "delivered", count: 173, fill: "var(--color-delivered)" },
    { status: "cancelled", count: 90, fill: "var(--color-cancelled)" },
    { status: "unverified", count: 90, fill: "var(--color-unverified)" },
]

const chartConfig = {
    status: {
        label: "Status",
    },
    pending: {
        label: "Pending",
        color: "#3b82f6",
    },
    processing: {
        label: "Processing",
        color: "#eab308",
    },
    shipped: {
        label: "Shipped",
        color: "#06b6d4",
    },
    delivered: {
        label: "Delivered",
        color: "#22c55e",
    },
    cancelled: {
        label: "Cancelled",
        color: "#ef4444",
    },
    unverified: {
        label: "Unverified",
        color: "#f97316",
    },
}

export function OrderStatus() {
    return (
        <div>
            <CardContent className="flex-1 pb-0">
                <ChartContainer
                    config={chartConfig}
                    className="mx-auto aspect-square max-h-[250px]"
                >
                    <PieChart>
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent />}
                        />
                        <Pie
                            data={chartData}
                            dataKey="count"
                            nameKey="status"
                            innerRadius={50}
                        >

                            <Label
                                content={({ viewBox }) => {
                                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                                        return (
                                            <text
                                                x={viewBox.cx}
                                                y={viewBox.cy}
                                                textAnchor="middle"
                                                dominantBaseline="middle"
                                            >
                                                <tspan
                                                    x={viewBox.cx}
                                                    y={viewBox.cy}
                                                    className="fill-foreground text-3xl font-bold"
                                                >
                                                    125
                                                </tspan>
                                                <tspan
                                                    x={viewBox.cx}
                                                    y={(viewBox.cy || 0) + 24}
                                                    className="fill-muted-foreground"
                                                >
                                                    Order Status
                                                </tspan>
                                            </text>
                                        )
                                    }
                                }}
                            />


                        </Pie>
                    </PieChart>
                </ChartContainer>
            </CardContent>
            <div>
                <ul>
                    <li className="flex items-center justify-between mb-3 text-sm">
                        <span>Pending</span>
                        <span className="font-medium bg-blue-500 rounded-full px-2 text-white">275</span>
                    </li>
                    <li className="flex items-center justify-between mb-3 text-sm">
                        <span>Processing</span>
                        <span className="font-medium bg-blue-500 rounded-full px-2 text-white">275</span>
                    </li>
                    <li className="flex items-center justify-between mb-3 text-sm">
                        <span>Shipped</span>
                        <span className="font-medium bg-blue-500 rounded-full px-2 text-white">275</span>
                    </li>
                    <li className="flex items-center justify-between mb-3 text-sm">
                        <span>Delivered</span>
                        <span className="font-medium bg-blue-500 rounded-full px-2 text-white">275</span>
                    </li>
                    <li className="flex items-center justify-between mb-3 text-sm">
                        <span>Cancelled</span>
                        <span className="font-medium bg-blue-500 rounded-full px-2 text-white">275</span>
                    </li>
                    <li className="flex items-center justify-between mb-3 text-sm">
                        <span>Unverified</span>
                        <span className="font-medium bg-blue-500 rounded-full px-2 text-white">275</span>
                    </li>
                </ul>
            </div>
        </div>
    )
}
