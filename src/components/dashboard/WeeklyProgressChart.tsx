"use client"

import * as React from "react"
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip as RechartsTooltip } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart" // Using shadcn's chart setup

const chartConfig = {
  progress: {
    label: "Progress",
    color: "hsl(var(--primary))", // Use primary color from theme
  },
} satisfies ChartConfig

export default function WeeklyProgressChart() {
  const [chartData, setChartData] = React.useState([
    { day: "Mon", progress: 0 },
    { day: "Tue", progress: 0 },
    { day: "Wed", progress: 0 },
    { day: "Thu", progress: 0 },
    { day: "Fri", progress: 0 },
    { day: "Sat", progress: 0 },
    { day: "Sun", progress: 0 },
  ]);

  React.useEffect(() => {
    // Generate random data on client mount to avoid hydration mismatch
    setChartData([
      { day: "Mon", progress: Math.floor(Math.random() * 100) },
      { day: "Tue", progress: Math.floor(Math.random() * 100) },
      { day: "Wed", progress: Math.floor(Math.random() * 100) },
      { day: "Thu", progress: Math.floor(Math.random() * 100) },
      { day: "Fri", progress: Math.floor(Math.random() * 100) },
      { day: "Sat", progress: Math.floor(Math.random() * 70) }, // Weekend less progress
      { day: "Sun", progress: Math.floor(Math.random() * 50) },
    ]);
  }, []);

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="font-headline">Weekly Progress</CardTitle>
        <CardDescription>Your team's task completion rate this week.</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[250px] w-full">
          <BarChart accessibilityLayer data={chartData} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis
              dataKey="day"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <YAxis 
              tickLine={false}
              axisLine={false}
              tickMargin={10}
              domain={[0, 100]}
            />
             <RechartsTooltip
              cursor={{ fill: "hsl(var(--muted))", radius: 4 }}
              content={<ChartTooltipContent indicator="dot" />}
            />
            <Bar dataKey="progress" fill="var(--color-progress)" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
