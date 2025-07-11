import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/theme-provider";
import { Navbar } from "@/components/navbar";
import Home from "@/pages/home";
import Landing from "@/pages/landing";
import Signup from "@/pages/signup";
import Dashboard from "@/pages/dashboard";
import Feedback from "@/pages/feedback";
import NotFound from "@/pages/not-found";
import { useAuth } from "@/hooks/use-auth";

function AppContent() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-skillmate-green"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      <Switch>
        <Route path="/" component={user ? Dashboard : Home} />
        <Route path="/home" component={Home} />
        <Route path="/login" component={Landing} />
        <Route path="/signup" component={Signup} />
        <Route path="/dashboard" component={user ? Dashboard : Landing} />
        <Route path="/feedback" component={Feedback} />
        <Route component={NotFound} />
      </Switch>
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <TooltipProvider>
          <Toaster />
          <AppContent />
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
