"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, Flame, Utensils, Pill, TrendingDown, Trophy, Calendar } from "lucide-react";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const weightData = [
    { date: "Week 1", weight: 210 },
    { date: "Week 2", weight: 208 },
    { date: "Week 3", weight: 206.5 },
    { date: "Week 4", weight: 205 },
    { date: "Week 5", weight: 203.5 },
    { date: "Week 6", weight: 202 },
    { date: "Week 7", weight: 201 },
    { date: "Week 8", weight: 199.5 },
];

export default function DashboardPage() {
    return (
        <div className="p-8 space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
                    <p className="text-muted-foreground">Welcome back! You're making great progress.</p>
                </div>
                <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground bg-secondary/50 px-3 py-1 rounded-full">
                    <Calendar className="h-4 w-4" />
                    <span>{new Date().toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' })}</span>
                </div>
            </div>

            {/* Overview Stats */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card className="glass hover:shadow-md transition-all">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Calories Consumed
                        </CardTitle>
                        <Utensils className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">1,250</div>
                        <p className="text-xs text-muted-foreground">
                            / 1,800 kcal goal
                        </p>
                        <div className="mt-3 h-1 w-full bg-secondary rounded-full overflow-hidden">
                            <div className="h-full bg-primary w-[70%] rounded-full" />
                        </div>
                    </CardContent>
                </Card>

                <Card className="glass hover:shadow-md transition-all">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Active Calories
                        </CardTitle>
                        <Flame className="h-4 w-4 text-orange-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">450</div>
                        <p className="text-xs text-muted-foreground">
                            +12% from yesterday
                        </p>
                        <div className="mt-3 h-1 w-full bg-secondary rounded-full overflow-hidden">
                            <div className="h-full bg-orange-500 w-[45%] rounded-full" />
                        </div>
                    </CardContent>
                </Card>

                <Card className="glass hover:shadow-md transition-all">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Workouts
                        </CardTitle>
                        <Activity className="h-4 w-4 text-blue-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">3</div>
                        <p className="text-xs text-muted-foreground">
                            sessions this week
                        </p>
                        <div className="mt-3 h-1 w-full bg-secondary rounded-full overflow-hidden">
                            <div className="h-full bg-blue-500 w-[60%] rounded-full" />
                        </div>
                    </CardContent>
                </Card>

                <Card className="glass hover:shadow-md transition-all">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Medication
                        </CardTitle>
                        <Pill className="h-4 w-4 text-purple-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">Taken</div>
                        <p className="text-xs text-muted-foreground">
                            Next dose: 8:00 PM
                        </p>
                        <div className="mt-3 flex gap-1">
                            {[1, 1, 1, 0, 0, 0, 0].map((taken, i) => (
                                <div key={i} className={`h-1.5 w-full rounded-full ${taken ? 'bg-purple-500' : 'bg-secondary'}`} />
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                {/* Weight Chart */}
                <Card className="col-span-4 glass">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <TrendingDown className="h-5 w-5 text-green-500" />
                            Weight Progress
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="pl-2">
                        <div className="h-[300px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={weightData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                                    <defs>
                                        <linearGradient id="colorWeight" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                                            <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <XAxis
                                        dataKey="date"
                                        stroke="#888888"
                                        fontSize={12}
                                        tickLine={false}
                                        axisLine={false}
                                    />
                                    <YAxis
                                        stroke="#888888"
                                        fontSize={12}
                                        tickLine={false}
                                        axisLine={false}
                                        domain={['dataMin - 5', 'dataMax + 5']}
                                    />
                                    <Tooltip
                                        contentStyle={{ backgroundColor: 'hsl(var(--card))', borderRadius: '8px', border: '1px solid hsl(var(--border))' }}
                                        itemStyle={{ color: 'hsl(var(--foreground))' }}
                                    />
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                                    <Area
                                        type="monotone"
                                        dataKey="weight"
                                        stroke="hsl(var(--primary))"
                                        fillOpacity={1}
                                        fill="url(#colorWeight)"
                                        strokeWidth={2}
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>

                {/* Recent Activity */}
                <Card className="col-span-3 glass">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Trophy className="h-5 w-5 text-yellow-500" />
                            Recent Achievements
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-8">
                            <div className="flex items-center">
                                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900">
                                    <Activity className="h-5 w-5 text-blue-600 dark:text-blue-300" />
                                </div>
                                <div className="ml-4 space-y-1">
                                    <p className="text-sm font-medium leading-none">Morning Jog</p>
                                    <p className="text-sm text-muted-foreground">
                                        30 mins • 240 kcal
                                    </p>
                                </div>
                                <div className="ml-auto font-medium text-sm text-muted-foreground">Today</div>
                            </div>
                            <div className="flex items-center">
                                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-orange-100 dark:bg-orange-900">
                                    <Utensils className="h-5 w-5 text-orange-600 dark:text-orange-300" />
                                </div>
                                <div className="ml-4 space-y-1">
                                    <p className="text-sm font-medium leading-none">Healthy Breakfast</p>
                                    <p className="text-sm text-muted-foreground">
                                        Oatmeal & Fruit • 350 kcal
                                    </p>
                                </div>
                                <div className="ml-auto font-medium text-sm text-muted-foreground">Today</div>
                            </div>
                            <div className="flex items-center">
                                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-green-100 dark:bg-green-900">
                                    <TrendingDown className="h-5 w-5 text-green-600 dark:text-green-300" />
                                </div>
                                <div className="ml-4 space-y-1">
                                    <p className="text-sm font-medium leading-none">Weight Check-in</p>
                                    <p className="text-sm text-muted-foreground">
                                        199.5 lbs • -1.5 lbs
                                    </p>
                                </div>
                                <div className="ml-auto font-medium text-sm text-muted-foreground">Yesterday</div>
                            </div>
                            <div className="flex items-center">
                                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-purple-100 dark:bg-purple-900">
                                    <Pill className="h-5 w-5 text-purple-600 dark:text-purple-300" />
                                </div>
                                <div className="ml-4 space-y-1">
                                    <p className="text-sm font-medium leading-none">Weekly Injection</p>
                                    <p className="text-sm text-muted-foreground">
                                        Semaglutide 0.5mg
                                    </p>
                                </div>
                                <div className="ml-auto font-medium text-sm text-muted-foreground">2 days ago</div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
