import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SkillmateLogo } from "@/components/skillmate-logo";
import { Link } from "wouter";
import { 
  GraduationCap, 
  Code, 
  Users, 
  Trophy, 
  Clock, 
  Star, 
  ArrowRight,
  CheckCircle
} from "lucide-react";

export default function Home() {
  const features = [
    {
      icon: <GraduationCap className="h-8 w-8" />,
      title: "30-Day Structured Program",
      description: "Follow a proven curriculum designed by industry experts"
    },
    {
      icon: <Code className="h-8 w-8" />,
      title: "Hands-on Projects",
      description: "Build real applications with modern tech stack"
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Community Support",
      description: "Learn alongside other aspiring developers"
    },
    {
      icon: <Trophy className="h-8 w-8" />,
      title: "Progress Tracking",
      description: "Monitor your learning journey with detailed analytics"
    }
  ];

  const stats = [
    { number: "1000+", label: "Students Enrolled" },
    { number: "30", label: "Days Program" },
    { number: "95%", label: "Completion Rate" },
    { number: "4.9/5", label: "Average Rating" }
  ];

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <SkillmateLogo size="lg" className="justify-center mb-8" />
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white mb-6">
            Your Journey to
            <br />
            <span className="skillmate-green">Developer Excellence</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
            Join thousands of aspiring developers in our comprehensive 30-day internship program. 
            Build real projects, learn industry best practices, and launch your tech career.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup">
              <Button 
                size="lg" 
                className="bg-skillmate-green hover:bg-skillmate-dark-green text-white px-8 py-4 text-lg"
              >
                Start Your Journey
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/login">
              <Button 
                variant="outline" 
                size="lg" 
                className="border-skillmate-green text-skillmate-green hover:bg-skillmate-green hover:text-white px-8 py-4 text-lg"
              >
                Already a Member? Sign In
              </Button>
            </Link>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-skillmate-green mb-2">
                {stat.number}
              </div>
              <div className="text-gray-600 dark:text-gray-300 font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Why Choose SkillMate?
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Our proven methodology has helped thousands of students transition into successful tech careers
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-16 h-16 bg-skillmate-green/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <div className="text-skillmate-green">
                    {feature.icon}
                  </div>
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Program Overview */}
      <section className="bg-white dark:bg-gray-800 py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
                30-Day Developer Internship Program
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
                Our comprehensive program takes you from beginner to job-ready developer in just 30 days. 
                Learn by building real projects with industry-standard tools and frameworks.
              </p>
              
              <div className="space-y-4 mb-8">
                {[
                  "Set up your development environment",
                  "Build full-stack applications",
                  "Learn modern frameworks and tools",
                  "Create a professional portfolio",
                  "Get mentorship from industry experts",
                  "Join our active developer community"
                ].map((item, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-skillmate-green flex-shrink-0" />
                    <span className="text-gray-700 dark:text-gray-300">{item}</span>
                  </div>
                ))}
              </div>

              <Link href="/signup">
                <Button 
                  size="lg" 
                  className="bg-skillmate-green hover:bg-skillmate-dark-green"
                >
                  Enroll Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>

            <div className="relative">
              <Card className="p-8">
                <div className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-skillmate-green rounded-full flex items-center justify-center">
                      <Clock className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">Week 1-2</h3>
                      <p className="text-gray-600 dark:text-gray-300">Foundation & Setup</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                      <Code className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">Week 3-4</h3>
                      <p className="text-gray-600 dark:text-gray-300">Build Real Projects</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center">
                      <Trophy className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">Final Week</h3>
                      <p className="text-gray-600 dark:text-gray-300">Portfolio & Showcase</p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
            Ready to Start Your Developer Journey?
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            Join our community of learners and take the first step towards your dream tech career.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup">
              <Button 
                size="lg" 
                className="bg-skillmate-green hover:bg-skillmate-dark-green px-8 py-4 text-lg"
              >
                Get Started Today
              </Button>
            </Link>
            <Link href="/feedback">
              <Button 
                variant="outline" 
                size="lg" 
                className="px-8 py-4 text-lg"
              >
                Share Feedback
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}