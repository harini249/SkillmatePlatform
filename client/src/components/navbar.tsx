import { Moon, Sun, LogOut, User, Home, MessageSquare, Info, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/theme-provider";
import { useAuth } from "@/hooks/use-auth";
import { SkillmateLogo } from "@/components/skillmate-logo";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Link } from "wouter";

export function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const { user, refetch } = useAuth();
  const { toast } = useToast();

  const logoutMutation = useMutation({
    mutationFn: () => apiRequest("POST", "/api/auth/logout"),
    onSuccess: () => {
      refetch();
      toast({
        title: "Logged out successfully",
        description: "You have been logged out of your account.",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to logout. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/">
            <SkillmateLogo className="cursor-pointer" />
          </Link>
          
          <div className="flex items-center space-x-4">
            {!user && (
              <>
                <Link href="/home">
                  <Button variant="ghost" size="sm" className="flex items-center space-x-2">
                    <Home className="h-4 w-4" />
                    <span>Home</span>
                  </Button>
                </Link>
                <Link href="/about">
                  <Button variant="ghost" size="sm" className="flex items-center space-x-2">
                    <Info className="h-4 w-4" />
                    <span>About</span>
                  </Button>
                </Link>
                <Link href="/courses">
                  <Button variant="ghost" size="sm" className="flex items-center space-x-2">
                    <BookOpen className="h-4 w-4" />
                    <span>Courses</span>
                  </Button>
                </Link>
                <Link href="/feedback">
                  <Button variant="ghost" size="sm" className="flex items-center space-x-2">
                    <MessageSquare className="h-4 w-4" />
                    <span>Feedback</span>
                  </Button>
                </Link>
                <Link href="/login">
                  <Button variant="outline" size="sm">
                    Sign In
                  </Button>
                </Link>
                <Link href="/signup">
                  <Button size="sm" className="bg-skillmate-green hover:bg-skillmate-dark-green">
                    Sign Up
                  </Button>
                </Link>
              </>
            )}
            
            {user && (
              <>
                <Link href="/profile">
                  <Button variant="ghost" size="sm" className="flex items-center space-x-2">
                    <User className="h-4 w-4" />
                    <span>Profile</span>
                  </Button>
                </Link>
                <Link href="/feedback">
                  <Button variant="ghost" size="sm" className="flex items-center space-x-2">
                    <MessageSquare className="h-4 w-4" />
                    <span>Feedback</span>
                  </Button>
                </Link>
              </>
            )}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              {theme === "light" ? (
                <Moon className="h-5 w-5 text-gray-600 dark:text-gray-300" />
              ) : (
                <Sun className="h-5 w-5 text-yellow-500" />
              )}
            </Button>
            
            {user && (
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2">
                  {user.avatar ? (
                    <img 
                      src={user.avatar} 
                      alt={user.name}
                      className="w-8 h-8 rounded-full"
                    />
                  ) : (
                    <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                      <User className="w-4 h-4" />
                    </div>
                  )}
                  <span className="text-gray-700 dark:text-gray-300 font-medium">
                    {user.name}
                  </span>
                </div>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={handleLogout}
                  disabled={logoutMutation.isPending}
                  className="flex items-center space-x-2"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
