import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SkillmateLogo } from "@/components/skillmate-logo";
import { Link } from "wouter";
import { 
  Users, 
  Target, 
  Award, 
  Code, 
  Lightbulb, 
  Heart,
  ArrowRight,
  Github,
  Twitter,
  Linkedin
} from "lucide-react";

export default function About() {
  const teamMembers = [
    {
      name: "Sarah Chen",
      role: "Founder & Lead Developer",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b589?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
      bio: "Former Google engineer with 8 years experience. Passionate about making coding accessible to everyone."
    },
    {
      name: "Marcus Johnson",
      role: "Curriculum Director",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
      bio: "Bootcamp instructor turned educator. Has mentored over 500 developers into their first tech jobs."
    },
    {
      name: "Emily Rodriguez",
      role: "Community Manager",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
      bio: "Developer advocate focused on building inclusive tech communities and supporting new developers."
    }
  ];

  const values = [
    {
      icon: <Users className="h-8 w-8" />,
      title: "Community First",
      description: "We believe learning happens best when you're supported by a community of peers and mentors."
    },
    {
      icon: <Target className="h-8 w-8" />,
      title: "Practical Learning",
      description: "Every lesson focuses on real-world skills you'll use in your first developer job."
    },
    {
      icon: <Award className="h-8 w-8" />,
      title: "Quality Education",
      description: "Our curriculum is constantly updated to reflect current industry standards and best practices."
    },
    {
      icon: <Heart className="h-8 w-8" />,
      title: "Inclusive by Design",
      description: "We welcome learners from all backgrounds and provide multiple paths to success."
    }
  ];

  const milestones = [
    { year: "2022", event: "SkillMate founded with the first cohort of 50 students" },
    { year: "2023", event: "Reached 1,000+ students and 85% job placement rate" },
    { year: "2024", event: "Launched advanced tracks and corporate partnerships" },
    { year: "2025", event: "Expanding globally with localized content and mentorship" }
  ];

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <SkillmateLogo size="lg" className="justify-center mb-8" />
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            About <span className="skillmate-green">SkillMate</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
            We're on a mission to democratize tech education and help aspiring developers 
            build the skills they need for successful careers in technology.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
          <div className="text-center">
            <div className="text-4xl font-bold text-skillmate-green mb-2">5,000+</div>
            <div className="text-gray-600 dark:text-gray-300">Students Enrolled</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-skillmate-green mb-2">92%</div>
            <div className="text-gray-600 dark:text-gray-300">Job Placement Rate</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-skillmate-green mb-2">200+</div>
            <div className="text-gray-600 dark:text-gray-300">Partner Companies</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-skillmate-green mb-2">3</div>
            <div className="text-gray-600 dark:text-gray-300">Years of Excellence</div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="bg-white dark:bg-gray-800 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">Our Mission</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
              At SkillMate, we believe that everyone deserves access to quality tech education, 
              regardless of their background or financial situation. Our structured 30-day internship 
              program is designed to take complete beginners and turn them into job-ready developers 
              through hands-on projects, mentorship, and community support.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/signup">
                <Button size="lg" className="bg-skillmate-green hover:bg-skillmate-dark-green">
                  Join Our Mission
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/feedback">
                <Button variant="outline" size="lg">
                  Share Your Story
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Our Values</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            These core principles guide everything we do at SkillMate
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {values.map((value, index) => (
            <Card key={index} className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-16 h-16 bg-skillmate-green/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <div className="text-skillmate-green">
                    {value.icon}
                  </div>
                </div>
                <CardTitle className="text-xl">{value.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300">
                  {value.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Team Section */}
      <section className="bg-white dark:bg-gray-800 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Meet Our Team</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Passionate educators and developers committed to your success
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {teamMembers.map((member, index) => (
              <Card key={index} className="text-center">
                <CardHeader>
                  <div className="w-24 h-24 mx-auto mb-4">
                    <img
                      src={member.avatar}
                      alt={member.name}
                      className="w-full h-full rounded-full object-cover"
                    />
                  </div>
                  <CardTitle className="text-xl">{member.name}</CardTitle>
                  <Badge variant="secondary" className="mx-auto">
                    {member.role}
                  </Badge>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    {member.bio}
                  </p>
                  <div className="flex justify-center space-x-3">
                    <Button variant="ghost" size="sm">
                      <Twitter className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Linkedin className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Github className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Our Journey</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            From a small idea to transforming thousands of lives
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="space-y-8">
            {milestones.map((milestone, index) => (
              <div key={index} className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-skillmate-green rounded-full flex items-center justify-center text-white font-bold">
                  {milestone.year}
                </div>
                <Card className="flex-1">
                  <CardContent className="p-4">
                    <p className="text-gray-700 dark:text-gray-300">{milestone.event}</p>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-skillmate-green text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Start Your Journey?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Join thousands of students who have transformed their careers with SkillMate
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup">
              <Button size="lg" className="bg-white text-skillmate-green hover:bg-gray-100">
                Get Started Today
              </Button>
            </Link>
            <Link href="/feedback">
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-skillmate-green">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}