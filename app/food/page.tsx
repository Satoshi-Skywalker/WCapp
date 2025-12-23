"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Utensils, Coffee, Moon, Sun, Flame, ChevronRight } from "lucide-react";
import { Progress } from "@/components/ui/progress";

type MealType = "Breakfast" | "Lunch" | "Dinner" | "Snack";

interface FoodItem {
    id: string;
    name: string;
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
}

interface Meal {
    type: MealType;
    items: FoodItem[];
}

export default function FoodPage() {
    const [meals, setMeals] = useState<Meal[]>([
        {
            type: "Breakfast",
            items: [
                { id: "1", name: "Oatmeal & Berries", calories: 350, protein: 12, carbs: 60, fat: 6 },
            ],
        },
        { type: "Lunch", items: [] },
        { type: "Dinner", items: [] },
        { type: "Snack", items: [] },
    ]);

    const [isLoaded, setIsLoaded] = useState(false);

    // Load from localStorage on mount
    // Load from localStorage on mount
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const saved = localStorage.getItem('food-log');
            if (saved) {
                try {
                    setMeals(JSON.parse(saved));
                } catch (e) {
                    console.error("Failed to load food log", e);
                }
            }
            setIsLoaded(true);
        }
    }, []);

    // Save to localStorage whenever meals change
    const updateMeals = (newMeals: Meal[]) => {
        setMeals(newMeals);
        if (typeof window !== 'undefined') {
            localStorage.setItem('food-log', JSON.stringify(newMeals));
        }
    };

    const [isAdding, setIsAdding] = useState<MealType | null>(null);
    const [newItem, setNewItem] = useState({ name: "", calories: "", protein: "", carbs: "", fat: "" });

    const handleAddItem = () => {
        if (!newItem.name || !newItem.calories || !isAdding) return;

        const updatedMeals = meals.map((meal) => {
            if (meal.type === isAdding) {
                return {
                    ...meal,
                    items: [
                        ...meal.items,
                        {
                            id: Math.random().toString(),
                            name: newItem.name,
                            calories: parseInt(newItem.calories),
                            protein: parseInt(newItem.protein) || 0,
                            carbs: parseInt(newItem.carbs) || 0,
                            fat: parseInt(newItem.fat) || 0,
                        },
                    ],
                };
            }
            return meal;
        });

        updateMeals(updatedMeals);
        setNewItem({ name: "", calories: "", protein: "", carbs: "", fat: "" });
        setIsAdding(null);
    };

    const totals = meals.reduce(
        (acc, meal) => {
            meal.items.forEach(item => {
                acc.calories += item.calories;
                acc.protein += item.protein;
                acc.carbs += item.carbs;
                acc.fat += item.fat;
            });
            return acc;
        },
        { calories: 0, protein: 0, carbs: 0, fat: 0 }
    );

    const goals = {
        calories: 2000,
        protein: 150,
        carbs: 200,
        fat: 65
    };

    return (
        <div className="p-8 space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Food Log</h1>
                    <p className="text-muted-foreground">Track your daily nutrition and macros.</p>
                </div>
                <div className="text-right">
                    <p className="text-2xl font-bold">{totals.calories} / {goals.calories}</p>
                    <p className="text-xs text-muted-foreground">kcal consumed</p>
                </div>
            </div>

            {/* Macro Summary */}
            <div className="grid gap-4 md:grid-cols-3">
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">Protein</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-end justify-between mb-2">
                            <span className="text-2xl font-bold">{totals.protein}g</span>
                            <span className="text-xs text-muted-foreground">/ {goals.protein}g</span>
                        </div>
                        <Progress value={(totals.protein / goals.protein) * 100} className="h-2" />
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">Carbs</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-end justify-between mb-2">
                            <span className="text-2xl font-bold">{totals.carbs}g</span>
                            <span className="text-xs text-muted-foreground">/ {goals.carbs}g</span>
                        </div>
                        <Progress value={(totals.carbs / goals.carbs) * 100} className="h-2" />
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">Fat</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-end justify-between mb-2">
                            <span className="text-2xl font-bold">{totals.fat}g</span>
                            <span className="text-xs text-muted-foreground">/ {goals.fat}g</span>
                        </div>
                        <Progress value={(totals.fat / goals.fat) * 100} className="h-2" />
                    </CardContent>
                </Card>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                {meals.map((meal) => (
                    <Card key={meal.type} className="h-full flex flex-col">
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-lg font-medium flex items-center gap-2">
                                {meal.type === "Breakfast" && <Coffee className="h-4 w-4 text-orange-500" />}
                                {meal.type === "Lunch" && <Sun className="h-4 w-4 text-yellow-500" />}
                                {meal.type === "Dinner" && <Moon className="h-4 w-4 text-blue-500" />}
                                {meal.type === "Snack" && <Utensils className="h-4 w-4 text-purple-500" />}
                                {meal.type}
                            </CardTitle>
                            <Button variant="ghost" size="sm" onClick={() => setIsAdding(meal.type)}>
                                <Plus className="h-4 w-4" />
                            </Button>
                        </CardHeader>
                        <CardContent className="flex-1">
                            {meal.items.length === 0 ? (
                                <div className="h-20 flex items-center justify-center border-2 border-dashed rounded-lg border-muted/50">
                                    <p className="text-sm text-muted-foreground italic">No food logged</p>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {meal.items.map((item) => (
                                        <div key={item.id} className="flex items-center justify-between text-sm p-3 bg-secondary/30 rounded-lg hover:bg-secondary/50 transition-colors">
                                            <div>
                                                <p className="font-medium">{item.name}</p>
                                                <p className="text-xs text-muted-foreground">
                                                    {item.protein}p • {item.carbs}c • {item.fat}f
                                                </p>
                                            </div>
                                            <span className="font-bold">{item.calories} kcal</span>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {isAdding === meal.type && (
                                <div className="mt-4 p-4 border rounded-lg bg-card shadow-lg space-y-4 animate-in fade-in slide-in-from-top-2 absolute inset-x-0 mx-4 z-10 md:static md:inset-auto md:mx-0">
                                    <div className="space-y-2">
                                        <Label htmlFor="name">Food Name</Label>
                                        <Input
                                            id="name"
                                            placeholder="e.g. Grilled Chicken"
                                            value={newItem.name}
                                            onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                                            autoFocus
                                        />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="calories">Calories</Label>
                                            <Input
                                                id="calories"
                                                type="number"
                                                placeholder="kcal"
                                                value={newItem.calories}
                                                onChange={(e) => setNewItem({ ...newItem, calories: e.target.value })}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="protein">Protein (g)</Label>
                                            <Input
                                                id="protein"
                                                type="number"
                                                placeholder="g"
                                                value={newItem.protein}
                                                onChange={(e) => setNewItem({ ...newItem, protein: e.target.value })}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="carbs">Carbs (g)</Label>
                                            <Input
                                                id="carbs"
                                                type="number"
                                                placeholder="g"
                                                value={newItem.carbs}
                                                onChange={(e) => setNewItem({ ...newItem, carbs: e.target.value })}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="fat">Fat (g)</Label>
                                            <Input
                                                id="fat"
                                                type="number"
                                                placeholder="g"
                                                value={newItem.fat}
                                                onChange={(e) => setNewItem({ ...newItem, fat: e.target.value })}
                                            />
                                        </div>
                                    </div>
                                    <div className="flex gap-2 justify-end pt-2">
                                        <Button variant="ghost" size="sm" onClick={() => setIsAdding(null)}>
                                            Cancel
                                        </Button>
                                        <Button size="sm" onClick={handleAddItem}>
                                            Add Item
                                        </Button>
                                    </div>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
