"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, X, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

interface DoseLog {
    day: string;
    status: "taken" | "missed" | "pending";
    time?: string;
}

export default function MedicationPage() {
    const [logs, setLogs] = useState<DoseLog[]>([
        { day: "Mon", status: "taken", time: "9:00 AM" },
        { day: "Tue", status: "taken", time: "9:15 AM" },
        { day: "Wed", status: "pending" },
        { day: "Thu", status: "pending" },
        { day: "Fri", status: "pending" },
        { day: "Sat", status: "pending" },
        { day: "Sun", status: "pending" },
    ]);

    const handleLogDose = (day: string) => {
        const updatedLogs = logs.map((log) => {
            if (log.day === day) {
                return { ...log, status: "taken", time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) } as DoseLog;
            }
            return log;
        });
        setLogs(updatedLogs);
    };

    return (
        <div className="p-8 space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Medication Tracker</h1>
                    <p className="text-muted-foreground">Track your weekly GLP-1 injections or daily pills.</p>
                </div>
                <Button variant="outline">
                    <AlertCircle className="mr-2 h-4 w-4" />
                    Report Side Effects
                </Button>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Weekly Schedule</CardTitle>
                    <CardDescription>Semaglutide 0.5mg - Daily</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-7 gap-4">
                        {logs.map((log) => (
                            <div key={log.day} className="flex flex-col items-center gap-4 p-4 rounded-xl border bg-card/50">
                                <span className="font-medium text-muted-foreground">{log.day}</span>
                                <div className={cn(
                                    "flex h-12 w-12 items-center justify-center rounded-full transition-all",
                                    log.status === "taken" && "bg-primary text-primary-foreground shadow-lg shadow-primary/25",
                                    log.status === "missed" && "bg-destructive text-destructive-foreground",
                                    log.status === "pending" && "bg-secondary text-muted-foreground border-2 border-dashed border-muted-foreground/25"
                                )}>
                                    {log.status === "taken" && <Check className="h-6 w-6" />}
                                    {log.status === "missed" && <X className="h-6 w-6" />}
                                    {log.status === "pending" && <span className="text-xs">Pending</span>}
                                </div>
                                {log.status === "taken" ? (
                                    <span className="text-xs font-medium text-primary">{log.time}</span>
                                ) : (
                                    <Button
                                        size="sm"
                                        variant="ghost"
                                        className="h-7 text-xs"
                                        onClick={() => handleLogDose(log.day)}
                                    >
                                        Log
                                    </Button>
                                )}
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            <div className="grid gap-6 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle>Adherence Stats</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center justify-center py-8">
                            <div className="text-center">
                                <div className="text-5xl font-bold text-primary">98%</div>
                                <p className="text-sm text-muted-foreground mt-2">Monthly Adherence</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Next Refill</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center justify-between py-4">
                            <div>
                                <p className="font-medium">Wegovy (Semaglutide)</p>
                                <p className="text-sm text-muted-foreground">0.5mg / 0.5ml Pen</p>
                            </div>
                            <div className="text-right">
                                <p className="text-2xl font-bold">12 Days</p>
                                <p className="text-xs text-muted-foreground">remaining</p>
                            </div>
                        </div>
                        <Button className="w-full mt-4" variant="secondary">Request Refill</Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
