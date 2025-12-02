"use client"

import { TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

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

export const description = "A bar chart"

const chartData = [
    { month: "January", Amount: 186 },
    { month: "February", Amount: 305 },
    { month: "March", Amount: 237 },
    { month: "April", Amount: 73 },
    { month: "May", Amount: 209 },
    { month: "June", Amount: 270 },
    { month: "July", Amount: 214 },
    { month: "August", Amount: 170 },
    { month: "September", Amount: 204 },
    { month: "October", Amount: 204 },
    { month: "November", Amount: 214 },
    { month: "December", Amount: 114 },
]

const chartConfig = {
    Amount: {
        label: "Amount",
        color: "var(--chart-1)",
    },
}

export function SalesOverview() {
    return (
        <div>


            <ChartContainer className={`h-[380px] w-full`} config={chartConfig}>
                <BarChart accessibilityLayer data={chartData}>
                    <CartesianGrid vertical={false} />
                    <XAxis
                        dataKey="month"
                        tickLine={false}
                        tickMargin={10}
                        axisLine={false}
                        tickFormatter={(value) => value.slice(0, 3)}
                    />
                    <ChartTooltip
                        cursor={true}
                        content={<ChartTooltipContent />}
                    />
                    <Bar dataKey="Amount" fill="#8e51ff" radius={8} />
                </BarChart>
            </ChartContainer>


        </div>
    )
}
