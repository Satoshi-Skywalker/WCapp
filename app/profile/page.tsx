"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User, Settings, Save } from "lucide-react";

export default function ProfilePage() {
    const [profile, setProfile] = useState({
        name: "Mitch",
        email: "mitch@example.com",
        height: "5'10\"",
        currentWeight: "210",
        goalWeight: "180",
        dietaryPreferences: "None",
    });

    const [isSaving, setIsSaving] = useState(false);

    const handleSave = () => {
        setIsSaving(true);
        // Simulate API call
        setTimeout(() => {
            setIsSaving(false);
        }, 1000);
    };

    return (
        <div className="p-8 space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Profile</h1>
                    <p className="text-muted-foreground">Manage your account and goals.</p>
                </div>
                <Button onClick={handleSave} disabled={isSaving}>
                    <Save className="mr-2 h-4 w-4" />
                    {isSaving ? "Saving..." : "Save Changes"}
                </Button>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <User className="h-5 w-5" />
                            Personal Details
                        </CardTitle>
                        <CardDescription>
                            Update your personal information.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">Full Name</Label>
                            <Input
                                id="name"
                                value={profile.name}
                                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                value={profile.email}
                                onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="height">Height</Label>
                            <Input
                                id="height"
                                value={profile.height}
                                onChange={(e) => setProfile({ ...profile, height: e.target.value })}
                            />
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Settings className="h-5 w-5" />
                            Health Goals
                        </CardTitle>
                        <CardDescription>
                            Set your weight loss targets and preferences.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="currentWeight">Current Weight (lbs)</Label>
                                <Input
                                    id="currentWeight"
                                    type="number"
                                    value={profile.currentWeight}
                                    onChange={(e) => setProfile({ ...profile, currentWeight: e.target.value })}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="goalWeight">Goal Weight (lbs)</Label>
                                <Input
                                    id="goalWeight"
                                    type="number"
                                    value={profile.goalWeight}
                                    onChange={(e) => setProfile({ ...profile, goalWeight: e.target.value })}
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="dietary">Dietary Preferences</Label>
                            <Input
                                id="dietary"
                                placeholder="e.g. Keto, Vegan, Gluten-free"
                                value={profile.dietaryPreferences}
                                onChange={(e) => setProfile({ ...profile, dietaryPreferences: e.target.value })}
                            />
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
