import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { SkillmateLogo } from "@/components/skillmate-logo";
import { Chrome, Mail, Lock, User, Eye, EyeOff } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/use-auth";
import { Link, useLocation } from "wouter";

const signupSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string(),
  terms: z.boolean().refine((val) => val === true, "You must accept the terms and conditions"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type SignupData = z.infer<typeof signupSchema>;

export default function Signup() {
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { toast } = useToast();
  const { refetch } = useAuth();
  const [, setLocation] = useLocation();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<SignupData>({
    resolver: zodResolver(signupSchema),
  });

  const termsAccepted = watch("terms");

  const signupMutation = useMutation({
    mutationFn: (data: Omit<SignupData, "confirmPassword" | "terms">) => 
      apiRequest("POST", "/api/auth/register", data),
    onSuccess: () => {
      toast({
        title: "Welcome to SkillMate!",
        description: "Your account has been created successfully.",
      });
      refetch();
      setLocation("/dashboard");
    },
    onError: (error: any) => {
      toast({
        title: "Signup failed",
        description: error.message || "Please try again.",
        variant: "destructive",
      });
    },
  });

  const googleAuthMutation = useMutation({
    mutationFn: (userData: any) => apiRequest("POST", "/api/auth/google", userData),
    onSuccess: () => {
      toast({
        title: "Welcome to SkillMate!",
        description: "You have been signed up successfully.",
      });
      refetch();
      setLocation("/dashboard");
    },
    onError: (error: any) => {
      toast({
        title: "Google signup failed",
        description: error.message || "Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleGoogleSignup = () => {
    setIsGoogleLoading(true);
    
    // In a real app, this would open Google OAuth popup
    // For demo, we'll prompt user for their name
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
        title: "Signup cancelled",
        description: "Please provide your name and email to continue.",
        variant: "destructive",
      });
    }
    
    setIsGoogleLoading(false);
  };

  const onSubmit = (data: SignupData) => {
    const { confirmPassword, terms, ...signupData } = data;
    signupMutation.mutate(signupData);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <Link href="/">
            <SkillmateLogo size="lg" className="justify-center mb-6 cursor-pointer" />
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Join the SkillMate Community
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Start your 30-day developer internship journey today
          </p>
        </div>

        <Card className="max-w-md mx-auto shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-semibold">Create Your Account</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <Button
              onClick={handleGoogleSignup}
              disabled={isGoogleLoading || googleAuthMutation.isPending}
              className="w-full bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white dark:border-gray-600"
            >
              {isGoogleLoading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-gray-600 mr-3" />
              ) : (
                <Chrome className="h-5 w-5 text-blue-500 mr-3" />
              )}
              Sign up with Google
            </Button>

            <div className="flex items-center">
              <Separator className="flex-1" />
              <span className="px-4 text-sm text-gray-500 dark:text-gray-400">or</span>
              <Separator className="flex-1" />
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="name"
                    type="text"
                    placeholder="Enter your full name"
                    className="pl-10"
                    {...register("name")}
                  />
                </div>
                {errors.name && (
                  <p className="text-sm text-red-500">{errors.name.message}</p>
                )}
              </div>

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
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a password"
                    className="pl-10 pr-10"
                    {...register("password")}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-sm text-red-500">{errors.password.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm your password"
                    className="pl-10 pr-10"
                    {...register("confirmPassword")}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                  >
                    {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="text-sm text-red-500">{errors.confirmPassword.message}</p>
                )}
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="terms"
                  checked={termsAccepted}
                  onCheckedChange={(checked) => setValue("terms", checked as boolean)}
                />
                <Label htmlFor="terms" className="text-sm text-gray-600 dark:text-gray-300">
                  I agree to the{" "}
                  <a href="#" className="text-skillmate-green hover:underline">
                    Terms of Service
                  </a>{" "}
                  and{" "}
                  <a href="#" className="text-skillmate-green hover:underline">
                    Privacy Policy
                  </a>
                </Label>
              </div>
              {errors.terms && (
                <p className="text-sm text-red-500">{errors.terms.message}</p>
              )}

              <Button
                type="submit"
                className="w-full bg-skillmate-green hover:bg-skillmate-dark-green"
                disabled={signupMutation.isPending}
              >
                {signupMutation.isPending ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2" />
                ) : (
                  <User className="h-4 w-4 mr-2" />
                )}
                Create Account
              </Button>
            </form>

            <div className="text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Already have an account?{" "}
                <Link href="/login" className="text-skillmate-green hover:underline font-medium">
                  Sign in here
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="text-center mt-8">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            By signing up, you're taking the first step towards becoming a skilled developer
          </p>
        </div>
      </div>
    </main>
  );
}