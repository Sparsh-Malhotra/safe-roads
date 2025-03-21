import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { MapIcon, UserIcon, LockIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const Login = () => {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    setTimeout(() => {
      setIsLoading(false);
      toast.success('Login successful');
      navigate('/home');
    }, 1500);
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

              <form onSubmit={handleLogin} className="space-y-6">
                  <div className="space-y-2">
                      <div className="relative">
                          <UserIcon className="absolute left-3 top-2 h-5 w-5 text-muted-foreground" />
                          <Input
                              type="text"
                              placeholder="User ID"
                              value={userId}
                              onChange={(e) => setUserId(e.target.value)}
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
                      disabled={isLoading}
                  >
                      {isLoading ? (
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