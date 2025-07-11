import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { SkillmateLogo } from "@/components/skillmate-logo";
import { Chrome, Mail, Lock } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginData } from "@shared/schema";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/use-auth";
import { useLocation } from "wouter";

export default function Landing() {
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const { toast } = useToast();
  const { refetch } = useAuth();
  const [, setLocation] = useLocation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
  });

  const loginMutation = useMutation({
    mutationFn: (data: LoginData) => apiRequest("POST", "/api/auth/login", data),
    onSuccess: () => {
      toast({
        title: "Welcome back!",
        description: "You have been logged in successfully.",
      });
      refetch();
      setLocation("/dashboard");
    },
    onError: (error: any) => {
      toast({
        title: "Login failed",
        description: error.message || "Please check your credentials and try again.",
        variant: "destructive",
      });
    },
  });

  const googleAuthMutation = useMutation({
    mutationFn: (userData: any) => apiRequest("POST", "/api/auth/google", userData),
    onSuccess: () => {
      toast({
        title: "Welcome!",
        description: "You have been logged in successfully.",
      });
      refetch();
      setLocation("/dashboard");
    },
    onError: (error: any) => {
      toast({
        title: "Google login failed",
        description: error.message || "Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleGoogleLogin = () => {
    setIsGoogleLoading(true);
    
    // In a real app, this would open Google OAuth popup
    // For demo, we'll prompt user for their name and email
    const name = prompt("Enter your full name:");
    const email = prompt("Enter your email:");
    
    if (name && email) {
      const userData = {
        name: name.trim(),
        email: email.trim(),
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=10b981&color=ffffff`,
      };
      
      googleAuthMutation.mutate(userData);
    } else {
      toast({
        title: "Login cancelled",
        description: "Please provide your name and email to continue.",
        variant: "destructive",
      });
    }
    
    setIsGoogleLoading(false);
  };

  const onSubmit = (data: LoginData) => {
    loginMutation.mutate(data);
  };

  return (
    <main className="min-h-screen">
      <div className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <SkillmateLogo size="lg" className="justify-center mb-8" />
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            Welcome to Your<br />
            <span className="skillmate-green">30-Day Developer Internship</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            Build your coding playground, create real projects, and learn with a structured internship program.
          </p>
        </div>

        <Card className="max-w-md mx-auto shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-semibold">Get Started</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <Button
              onClick={handleGoogleLogin}
              disabled={isGoogleLoading || googleAuthMutation.isPending}
              className="w-full bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white dark:border-gray-600"
            >
              {isGoogleLoading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-gray-600 mr-3" />
              ) : (
                <Chrome className="h-5 w-5 text-blue-500 mr-3" />
              )}
              Continue with Google
            </Button>

            <div className="flex items-center">
              <Separator className="flex-1" />
              <span className="px-4 text-sm text-gray-500 dark:text-gray-400">or</span>
              <Separator className="flex-1" />
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    className="pl-10"
                    {...register("email")}
                  />
                </div>
                {errors.email && (
                  <p className="text-sm text-red-500">{errors.email.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    className="pl-10"
                    {...register("password")}
                  />
                </div>
                {errors.password && (
                  <p className="text-sm text-red-500">{errors.password.message}</p>
                )}
              </div>

              <Button
                type="submit"
                className="w-full bg-skillmate-green hover:bg-skillmate-dark-green"
                disabled={loginMutation.isPending}
              >
                {loginMutation.isPending ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2" />
                ) : (
                  <Mail className="h-4 w-4 mr-2" />
                )}
                Sign In
              </Button>
            </form>

            <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
              Use any email and password "password" for demo purposes
            </p>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
