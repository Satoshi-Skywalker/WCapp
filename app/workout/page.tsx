"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dumbbell, Activity, Timer, Flame, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";

interface Workout {
    id: string;
    type: string;
    duration: number; // minutes
    calories: number;
    intensity: "Low" | "Medium" | "High";
    date: string;
}

export default function WorkoutPage() {
    const [workouts, setWorkouts] = useState<Workout[]>([]);
    const [isAdding, setIsAdding] = useState(false);
    const [newWorkout, setNewWorkout] = useState<Partial<Workout>>({
        type: "",
        duration: 30,
        calories: 0,
        intensity: "Medium"
    });

    // Load from localStorage
    useEffect(() => {
        const saved = localStorage.getItem('workout-log');
        if (saved) {
            try {
                setWorkouts(JSON.parse(saved));
            } catch (e) {
                console.error("Failed to load workout log", e);
            }
        } else {
            // Initial sample data if empty
            setWorkouts([
                { id: "1", type: "Morning Jog", duration: 30, calories: 240, intensity: "Medium", date: new Date().toLocaleDateString() },
                { id: "2", type: "Strength Training", duration: 45, calories: 300, intensity: "High", date: new Date(Date.now() - 86400000).toLocaleDateString() },
            ]);
        }
    }, []);

    // Save to localStorage
    const updateWorkouts = (updated: Workout[]) => {
        setWorkouts(updated);
        localStorage.setItem('workout-log', JSON.stringify(updated));
    };


    const handleAddWorkout = () => {
        if (!newWorkout.type || !newWorkout.duration) return;

        const workout: Workout = {
            id: Math.random().toString(),
            type: newWorkout.type,
            duration: Number(newWorkout.duration),
            calories: Number(newWorkout.calories) || 0,
            intensity: (newWorkout.intensity as "Low" | "Medium" | "High") || "Medium",
            date: new Date().toLocaleDateString()
        };

        updateWorkouts([workout, ...workouts]);
        setNewWorkout({ type: "", duration: 30, calories: 0, intensity: "Medium" });
        setIsAdding(false);
        toast.success("Workout logged successfully!");
    };

    const handleDelete = (id: string) => {
        updateWorkouts(workouts.filter(w => w.id !== id));
        toast.success("Workout removed.");
    };

    return (
        <div className="p-8 space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Workout Log</h1>
                    <p className="text-muted-foreground">Track your fitness progress and activities.</p>
                </div>
                <Button onClick={() => setIsAdding(!isAdding)}>
                    <Plus className="mr-2 h-4 w-4" />
                    Log Workout
                </Button>
            </div>

            {isAdding && (
                <Card className="animate-in fade-in slide-in-from-top-4">
                    <CardHeader>
                        <CardTitle>Add New Workout</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid gap-4 md:grid-cols-2">
                            <div className="space-y-2">
                                <Label>Activity Type</Label>
                                <Select
                                    value={newWorkout.type}
                                    onValueChange={(val: string) => setNewWorkout({ ...newWorkout, type: val })}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Running">Running</SelectItem>
                                        <SelectItem value="Start">Walking</SelectItem>
                                        <SelectItem value="Cycling">Cycling</SelectItem>
                                        <SelectItem value="Strength">Strength Training</SelectItem>
                                        <SelectItem value="Yoga">Yoga</SelectItem>
                                        <SelectItem value="HIIT">HIIT</SelectItem>
                                        <SelectItem value="Swimming">Swimming</SelectItem>
                                        <SelectItem value="Other">Other</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label>Duration (min)</Label>
                                <Input
                                    type="number"
                                    value={newWorkout.duration}
                                    onChange={(e) => setNewWorkout({ ...newWorkout, duration: Number(e.target.value) })}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>Calories Burned</Label>
                                <Input
                                    type="number"
                                    value={newWorkout.calories}
                                    onChange={(e) => setNewWorkout({ ...newWorkout, calories: Number(e.target.value) })}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>Intensity</Label>
                                <Select
                                    value={newWorkout.intensity}
                                    onValueChange={(val: "Low" | "Medium" | "High") => setNewWorkout({ ...newWorkout, intensity: val })}
                                >
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Low">Low</SelectItem>
                                        <SelectItem value="Medium">Medium</SelectItem>
                                        <SelectItem value="High">High</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                        <div className="flex justify-end gap-2 mt-4">
                            <Button variant="ghost" onClick={() => setIsAdding(false)}>Cancel</Button>
                            <Button onClick={handleAddWorkout}>Save Entry</Button>
                        </div>
                    </CardContent>
                </Card>
            )}

            <div className="grid gap-4">
                {workouts.length === 0 ? (
                    <div className="text-center py-10 text-muted-foreground">
                        No workouts logged yet. Start moving!
                    </div>
                ) : (
                    workouts.map((workout) => (
                        <Card key={workout.id} className="flex flex-row items-center p-4 hover:shadow-sm transition-all">
                            <div className="h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mr-4">
                                <Dumbbell className="h-6 w-6 text-blue-600 dark:text-blue-300" />
                            </div>
                            <div className="flex-1">
                                <h3 className="font-semibold text-lg">{workout.type}</h3>
                                <div className="flex gap-4 text-sm text-muted-foreground">
                                    <span className="flex items-center gap-1"><Timer className="h-3 w-3" /> {workout.duration} min</span>
                                    <span className="flex items-center gap-1"><Flame className="h-3 w-3" /> {workout.calories} kcal</span>
                                    <span className="flex items-center gap-1"><Activity className="h-3 w-3" /> {workout.intensity}</span>
                                </div>
                            </div>
                            <div className="text-right mr-4">
                                <p className="text-sm font-medium">{workout.date}</p>
                            </div>
                            <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive/90 hover:bg-destructive/10" onClick={() => handleDelete(workout.id)}>
                                <Trash2 className="h-4 w-4" />
                            </Button>
                        </Card>
                    ))
                )}
            </div>
        </div>
    );
}
