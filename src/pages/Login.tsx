import React, { useState } from "react";
import { MapIcon, UserIcon, LockIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useLogin } from "@/services/hooks";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { mutate: login, isPending, error } = useLogin("/home");

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();

        login({
            email,
            password,
        });
    };

    return (
        <div className="flex min-h-screen w-full flex-col items-center justify-center bg-gradient-to-b from-background/30 to-background p-4">
            <div
                className={cn(
                    "w-full max-w-md rounded-xl border bg-card p-8 shadow-card glass-morphism",
                    "animate-in fade-in slide-in-from-bottom-4 duration-500"
                )}
            >
                <div className="flex flex-col items-center space-y-2 mb-8">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mb-2">
                        <MapIcon
                            className="h-8 w-8 text-primary"
                            strokeWidth={2}
                        />
                    </div>
                    <h1 className="text-2xl font-bold tracking-tight">
                        SafeRoads
                    </h1>
                    <p className="text-sm text-muted-foreground">
                        Login to access your account
                    </p>
                </div>

                {/* Show error message if login fails */}
                {error && (
                    <div className="mb-6 p-3 rounded-md bg-destructive/10 border border-destructive/20 text-destructive text-sm">
                        {error.message}
                    </div>
                )}

                <form onSubmit={handleLogin} className="space-y-6">
                    <div className="space-y-2">
                        <div className="relative">
                            <UserIcon className="absolute left-3 top-2 h-5 w-5 text-muted-foreground" />
                            <Input
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="pl-10"
                                required
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <div className="relative">
                            <LockIcon className="absolute left-3 top-2 h-5 w-5 text-muted-foreground" />
                            <Input
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="pl-10"
                                required
                            />
                        </div>
                    </div>

                    <Button
                        type="submit"
                        className={cn(
                            "w-full press-effect transition-all duration-300",
                            "bg-safety hover:bg-safety-hover text-safety-foreground"
                        )}
                        disabled={isPending}
                    >
                        {isPending ? (
                            <>
                                <span className="loader mr-2"></span>
                                Logging in...
                            </>
                        ) : (
                            "Login"
                        )}
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default Login;
