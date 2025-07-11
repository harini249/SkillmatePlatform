import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/hooks/use-auth";
import { useNotes } from "@/hooks/use-notes";
import { 
  User, 
  Mail, 
  Calendar, 
  BookOpen, 
  Trophy, 
  Target,
  Edit3,
  Save,
  Settings,
  Shield
} from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export default function Profile() {
  const { user } = useAuth();
  const { data: notes } = useNotes();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(user?.name || "");

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="max-w-md mx-auto">
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Access Denied</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Please log in to view your profile.
            </p>
            <Button>Go to Login</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const handleSaveProfile = () => {
    // In a real app, this would make an API call to update the profile
    toast({
      title: "Profile updated",
      description: "Your profile information has been saved.",
    });
    setIsEditing(false);
  };

  const stats = [
    {
      icon: <BookOpen className="h-5 w-5" />,
      label: "Notes Created",
      value: notes?.length || 0,
      color: "bg-blue-500"
    },
    {
      icon: <Calendar className="h-5 w-5" />,
      label: "Days Active",
      value: Math.floor((Date.now() - new Date(user.createdAt).getTime()) / (1000 * 60 * 60 * 24)) + 1,
      color: "bg-green-500"
    },
    {
      icon: <Trophy className="h-5 w-5" />,
      label: "Learning Streak",
      value: "7 days",
      color: "bg-yellow-500"
    },
    {
      icon: <Target className="h-5 w-5" />,
      label: "Goals Completed",
      value: "3/5",
      color: "bg-purple-500"
    }
  ];

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Profile Header */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-center space-x-4">
              <Avatar className="h-20 w-20">
                <AvatarImage src={user.avatar || undefined} alt={user.name} />
                <AvatarFallback className="text-2xl bg-skillmate-green text-white">
                  {user.name?.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center space-x-3">
                  {isEditing ? (
                    <Input
                      value={editedName}
                      onChange={(e) => setEditedName(e.target.value)}
                      className="text-2xl font-bold h-auto p-2"
                    />
                  ) : (
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                      {user.name}
                    </h1>
                  )}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={isEditing ? handleSaveProfile : () => setIsEditing(true)}
                  >
                    {isEditing ? <Save className="h-4 w-4" /> : <Edit3 className="h-4 w-4" />}
                  </Button>
                </div>
                <div className="flex items-center space-x-2 mt-2">
                  <Mail className="h-4 w-4 text-gray-500" />
                  <span className="text-gray-600 dark:text-gray-300">{user.email}</span>
                </div>
                <div className="flex items-center space-x-2 mt-1">
                  <Calendar className="h-4 w-4 text-gray-500" />
                  <span className="text-gray-600 dark:text-gray-300">
                    Joined {new Date(user.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex items-center space-x-2 mt-2">
                  <Badge variant="secondary" className="bg-skillmate-green/10 text-skillmate-green">
                    {user.provider === "google" ? "Google Account" : "Email Account"}
                  </Badge>
                  <Badge variant="outline">Developer Intern</Badge>
                </div>
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg ${stat.color} text-white`}>
                    {stat.icon}
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-300">{stat.label}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Profile Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Learning Progress</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>30-Day Internship Progress</span>
                    <span>Day 7 of 30</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-skillmate-green h-2 rounded-full" style={{ width: "23%" }}></div>
                  </div>
                </div>
                <Separator />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold mb-2">Current Goals</h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span>Complete Day 7 exercises</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                        <span>Create 5 practice notes</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                        <span>Join community discussion</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Achievements</h4>
                    <div className="space-y-2">
                      <Badge variant="outline" className="mr-2">First Note</Badge>
                      <Badge variant="outline" className="mr-2">Week 1 Complete</Badge>
                      <Badge variant="outline" className="mr-2">Early Bird</Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="activity" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {notes && notes.length > 0 ? (
                    notes.slice(0, 5).map((note) => (
                      <div key={note.id} className="flex items-start space-x-3 p-3 border rounded-lg">
                        <BookOpen className="h-5 w-5 text-skillmate-green mt-0.5" />
                        <div className="flex-1">
                          <h4 className="font-medium">{note.title}</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                            {note.content.substring(0, 100)}...
                          </p>
                          <p className="text-xs text-gray-500 mt-2">
                            Created {new Date(note.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-600 dark:text-gray-300 text-center py-8">
                      No activity yet. Start creating notes to see your activity here!
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Settings className="h-5 w-5" />
                  <span>Account Settings</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" value={user.email} disabled />
                  <p className="text-xs text-gray-500">
                    Email cannot be changed for security reasons
                  </p>
                </div>
                <Separator />
                <div className="space-y-2">
                  <Label htmlFor="provider">Account Type</Label>
                  <div className="flex items-center space-x-2">
                    <Shield className="h-4 w-4 text-gray-500" />
                    <span className="text-sm">
                      {user.provider === "google" ? "Google OAuth" : "Email & Password"}
                    </span>
                  </div>
                </div>
                <Separator />
                <div className="pt-4">
                  <Button variant="outline" className="w-full">
                    Export My Data
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
}