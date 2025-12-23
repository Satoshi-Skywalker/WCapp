"use client";

import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, MessageSquare, Phone, HelpCircle } from "lucide-react";

interface Message {
    id: string;
    role: "user" | "agent";
    content: string;
    timestamp: string;
}

export default function SupportPage() {
    const [messages, setMessages] = useState<Message[]>([
        {
            id: "1",
            role: "agent",
            content: "Hi there! I'm your personal health coach. How can I help you today?",
            timestamp: "9:00 AM",
        },
    ]);
    const [inputValue, setInputValue] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isTyping]);

    const handleSendMessage = () => {
        if (!inputValue.trim()) return;

        const newMessage: Message = {
            id: Math.random().toString(),
            role: "user",
            content: inputValue,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };

        setMessages((prev) => [...prev, newMessage]);
        setInputValue("");
        setIsTyping(true);

        // Simulate response
        setTimeout(() => {
            const responseMessage: Message = {
                id: Math.random().toString(),
                role: "agent",
                content: "Thanks for reaching out! A member of our clinical team will review your message and get back to you shortly. Is there anything else I can help with?",
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            };
            setMessages((prev) => [...prev, responseMessage]);
            setIsTyping(false);
        }, 1500);
    };

    return (
        <div className="p-8 space-y-8 h-[calc(100vh-4rem)] flex flex-col">
            <div className="flex items-center justify-between shrink-0">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Support</h1>
                    <p className="text-muted-foreground">Chat with your care team.</p>
                </div>
                <Button variant="outline">
                    <HelpCircle className="mr-2 h-4 w-4" />
                    FAQ
                </Button>
            </div>

            <div className="grid gap-6 md:grid-cols-3 flex-1 min-h-0">
                {/* Chat Area */}
                <Card className="md:col-span-2 flex flex-col h-full">
                    <CardHeader className="border-b shrink-0">
                        <CardTitle className="flex items-center gap-2">
                            <MessageSquare className="h-5 w-5" />
                            Live Chat
                        </CardTitle>
                        <CardDescription>
                            Typical response time: &lt; 2 hours
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="flex-1 flex flex-col p-0 min-h-0">
                        <div className="flex-1 overflow-y-auto p-4 space-y-4">
                            {messages.map((message) => (
                                <div
                                    key={message.id}
                                    className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                                >
                                    <div
                                        className={`max-w-[80%] rounded-lg px-4 py-2 ${message.role === "user"
                                            ? "bg-primary text-primary-foreground"
                                            : "bg-secondary text-secondary-foreground"
                                            }`}
                                    >
                                        <p className="text-sm">{message.content}</p>
                                        <p className="text-[10px] opacity-70 mt-1 text-right">
                                            {message.timestamp}
                                        </p>
                                    </div>
                                </div>
                            ))}
                            {isTyping && (
                                <div className="flex justify-start">
                                    <div className="bg-secondary text-secondary-foreground rounded-lg px-4 py-2">
                                        <div className="flex gap-1 items-center h-5">
                                            <span className="w-1.5 h-1.5 bg-foreground/50 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                                            <span className="w-1.5 h-1.5 bg-foreground/50 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                                            <span className="w-1.5 h-1.5 bg-foreground/50 rounded-full animate-bounce"></span>
                                        </div>
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>
                        <div className="p-4 border-t mt-auto">
                            <form
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    handleSendMessage();
                                }}
                                className="flex gap-2"
                            >
                                <Input
                                    placeholder="Type your message..."
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                />
                                <Button type="submit" size="icon">
                                    <Send className="h-4 w-4" />
                                </Button>
                            </form>
                        </div>
                    </CardContent>
                </Card>

                {/* Sidebar Info */}
                <div className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Contact Info</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center gap-3">
                                <div className="h-10 w-10 rounded-full bg-secondary flex items-center justify-center">
                                    <Phone className="h-5 w-5 text-muted-foreground" />
                                </div>
                                <div>
                                    <p className="font-medium">Emergency Line</p>
                                    <p className="text-sm text-muted-foreground">1-800-GLP-CARE</p>
                                </div>
                            </div>
                            <div className="pt-4">
                                <Button className="w-full" variant="secondary">
                                    Schedule Video Call
                                </Button>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-gradient-to-br from-orange-500/10 to-orange-500/5 border-orange-200 dark:border-orange-900">
                        <CardHeader>
                            <CardTitle className="text-orange-700 dark:text-orange-400">HubSpot Support</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-muted-foreground mb-4">
                                Connect with our dedicated support team via our integrated HubSpot portal for billing and account inquiries.
                            </p>
                            <Button className="w-full bg-[#ff7a59] hover:bg-[#ff7a59]/90 text-white">
                                Open HubSpot Portal
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
