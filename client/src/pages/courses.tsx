import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SkillmateLogo } from "@/components/skillmate-logo";
import { Link } from "wouter";
import { 
  BookOpen, 
  Play, 
  Clock, 
  Users, 
  Star,
  CheckCircle,
  ArrowRight,
  Code,
  Laptop,
  Smartphone,
  Globe,
  Database,
  Palette
} from "lucide-react";

export default function Courses() {
  const courses = [
    {
      id: 1,
      title: "30-Day Developer Internship",
      description: "Complete beginner to job-ready developer in 30 days",
      duration: "30 days",
      level: "Beginner",
      students: 5248,
      rating: 4.9,
      price: "Free",
      featured: true,
      progress: 23,
      icon: <Code className="h-8 w-8" />,
      topics: ["HTML/CSS", "JavaScript", "React", "Node.js", "Git", "Portfolio"],
      nextLesson: "Day 8: Building Your First API"
    },
    {
      id: 2,
      title: "Frontend Mastery Track",
      description: "Master modern frontend development with React and TypeScript",
      duration: "8 weeks",
      level: "Intermediate",
      students: 2157,
      rating: 4.8,
      price: "$99",
      featured: false,
      progress: 0,
      icon: <Laptop className="h-8 w-8" />,
      topics: ["React", "TypeScript", "Next.js", "Tailwind", "Testing"],
      nextLesson: "Introduction to React Hooks"
    },
    {
      id: 3,
      title: "Mobile App Development",
      description: "Build native mobile apps with React Native",
      duration: "10 weeks",
      level: "Intermediate",
      students: 1893,
      rating: 4.7,
      price: "$149",
      featured: false,
      progress: 0,
      icon: <Smartphone className="h-8 w-8" />,
      topics: ["React Native", "Expo", "Navigation", "State Management"],
      nextLesson: "Setting Up Your Development Environment"
    },
    {
      id: 4,
      title: "Full-Stack Web Development",
      description: "Complete web development from frontend to backend",
      duration: "12 weeks",
      level: "Advanced",
      students: 3241,
      rating: 4.9,
      price: "$199",
      featured: true,
      progress: 0,
      icon: <Globe className="h-8 w-8" />,
      topics: ["React", "Node.js", "MongoDB", "Authentication", "Deployment"],
      nextLesson: "Planning Your Full-Stack Architecture"
    },
    {
      id: 5,
      title: "Database Design & Management",
      description: "Master SQL, NoSQL, and database optimization",
      duration: "6 weeks",
      level: "Intermediate",
      students: 1456,
      rating: 4.6,
      price: "$79",
      featured: false,
      progress: 0,
      icon: <Database className="h-8 w-8" />,
      topics: ["SQL", "MongoDB", "PostgreSQL", "Optimization", "Security"],
      nextLesson: "Introduction to Relational Databases"
    },
    {
      id: 6,
      title: "UI/UX Design for Developers",
      description: "Learn design principles and create beautiful interfaces",
      duration: "4 weeks",
      level: "Beginner",
      students: 987,
      rating: 4.5,
      price: "$59",
      featured: false,
      progress: 0,
      icon: <Palette className="h-8 w-8" />,
      topics: ["Design Principles", "Figma", "Color Theory", "Typography"],
      nextLesson: "Understanding User Experience Basics"
    }
  ];

  const learningPaths = [
    {
      title: "Complete Beginner Path",
      description: "Start from zero and become a professional developer",
      courses: ["30-Day Developer Internship", "Frontend Mastery Track", "Full-Stack Web Development"],
      duration: "6 months",
      difficulty: "Beginner to Advanced"
    },
    {
      title: "Frontend Specialist Path",
      description: "Master modern frontend technologies and frameworks",
      courses: ["Frontend Mastery Track", "UI/UX Design for Developers", "Mobile App Development"],
      duration: "4 months",
      difficulty: "Intermediate"
    },
    {
      title: "Full-Stack Developer Path",
      description: "Become a versatile full-stack developer",
      courses: ["30-Day Developer Internship", "Database Design & Management", "Full-Stack Web Development"],
      duration: "5 months",
      difficulty: "Beginner to Advanced"
    }
  ];

  const getLevelColor = (level: string) => {
    switch (level) {
      case "Beginner": return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "Intermediate": return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
      case "Advanced": return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
      default: return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <SkillmateLogo size="lg" className="justify-center mb-8" />
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            Learn to <span className="skillmate-green">Code</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
            Master in-demand programming skills with our hands-on courses and structured learning paths. 
            From complete beginner to professional developer.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup">
              <Button size="lg" className="bg-skillmate-green hover:bg-skillmate-dark-green">
                Start Learning Today
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Button variant="outline" size="lg">
              View Free Lessons
            </Button>
          </div>
        </div>
      </section>

      {/* Courses Section */}
      <section className="container mx-auto px-4 pb-20">
        <Tabs defaultValue="courses" className="space-y-8">
          <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto">
            <TabsTrigger value="courses">All Courses</TabsTrigger>
            <TabsTrigger value="paths">Learning Paths</TabsTrigger>
          </TabsList>

          <TabsContent value="courses" className="space-y-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Choose Your Course
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                Structured curriculum designed by industry experts to get you job-ready
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {courses.map((course) => (
                <Card key={course.id} className={`relative hover:shadow-lg transition-shadow ${course.featured ? 'ring-2 ring-skillmate-green' : ''}`}>
                  {course.featured && (
                    <Badge className="absolute -top-2 left-4 bg-skillmate-green">
                      Featured
                    </Badge>
                  )}
                  <CardHeader>
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="p-2 bg-skillmate-green/10 rounded-lg text-skillmate-green">
                        {course.icon}
                      </div>
                      <Badge className={getLevelColor(course.level)}>
                        {course.level}
                      </Badge>
                    </div>
                    <CardTitle className="text-xl mb-2">{course.title}</CardTitle>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      {course.description}
                    </p>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {course.progress > 0 && (
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Progress</span>
                          <span>{course.progress}%</span>
                        </div>
                        <Progress value={course.progress} />
                        <p className="text-sm text-skillmate-green font-medium">
                          Next: {course.nextLesson}
                        </p>
                      </div>
                    )}
                    
                    <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-300">
                      <div className="flex items-center space-x-1">
                        <Clock className="h-4 w-4" />
                        <span>{course.duration}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Users className="h-4 w-4" />
                        <span>{course.students.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span>{course.rating}</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <p className="text-sm font-medium">What you'll learn:</p>
                      <div className="flex flex-wrap gap-1">
                        {course.topics.slice(0, 3).map((topic, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {topic}
                          </Badge>
                        ))}
                        {course.topics.length > 3 && (
                          <Badge variant="secondary" className="text-xs">
                            +{course.topics.length - 3} more
                          </Badge>
                        )}
                      </div>
                    </div>

                    <div className="pt-4 border-t">
                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-bold text-skillmate-green">
                          {course.price}
                        </span>
                        {course.progress > 0 ? (
                          <Button className="bg-skillmate-green hover:bg-skillmate-dark-green">
                            Continue Learning
                            <Play className="ml-2 h-4 w-4" />
                          </Button>
                        ) : (
                          <Button variant="outline">
                            Learn More
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="paths" className="space-y-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Learning Paths
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                Structured paths that guide you from beginner to expert in your chosen field
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {learningPaths.map((path, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-xl mb-2">{path.title}</CardTitle>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      {path.description}
                    </p>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <p className="font-medium text-sm">Included Courses:</p>
                      {path.courses.map((course, courseIndex) => (
                        <div key={courseIndex} className="flex items-center space-x-2 text-sm">
                          <CheckCircle className="h-4 w-4 text-skillmate-green" />
                          <span>{course}</span>
                        </div>
                      ))}
                    </div>
                    
                    <div className="space-y-2 pt-4 border-t">
                      <div className="flex justify-between text-sm">
                        <span>Duration:</span>
                        <span className="font-medium">{path.duration}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Difficulty:</span>
                        <span className="font-medium">{path.difficulty}</span>
                      </div>
                    </div>

                    <Button className="w-full bg-skillmate-green hover:bg-skillmate-dark-green">
                      Start Path
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </section>

      {/* CTA Section */}
      <section className="bg-skillmate-green text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Start Your Developer Journey?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Join thousands of students who have successfully transitioned into tech careers with SkillMate
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup">
              <Button size="lg" className="bg-white text-skillmate-green hover:bg-gray-100">
                Get Started Free
              </Button>
            </Link>
            <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-skillmate-green">
              Talk to an Advisor
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}