import React, { useState } from 'react';
import { Users, Trophy, MessageSquare, Search, Plus, ArrowRight } from 'lucide-react';
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
} from '../components/common/Card';
import { Button } from '../components/common/Button';
import { Input } from '../components/common/Inputs';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../components/common/Tabs';

// Define TypeScript interfaces for the data
interface Group {
    name: string;
    members: number;
    description: string;
    activity: string;
}

interface Challenge {
    title: string;
    participants: number;
    deadline: string;
    progress: number;
}

interface ForumTopic {
    title: string;
    author: string;
    replies: number;
    lastActive: string;
}

const CommunityFeatures: React.FC = () => {
    const [activeTab, setActiveTab] = useState<string>('groups');

    const groups: Group[] = [
        {
            name: "Weight Loss Warriors",
            members: 1250,
            description: "Support group for sustainable weight loss journey",
            activity: "Active",
        },
        {
            name: "Morning Yoga Club",
            members: 850,
            description: "Daily morning yoga routines and meditation tips",
            activity: "Active",
        },
        {
            name: "Nutrition Enthusiasts",
            members: 2100,
            description: "Discuss healthy recipes and meal planning",
            activity: "Very Active",
        },
    ];

    const challenges: Challenge[] = [
        {
            title: "30-Day Steps Challenge",
            participants: 456,
            deadline: "5 days left",
            progress: 75,
        },
        {
            title: "Water Intake Week",
            participants: 890,
            deadline: "2 days left",
            progress: 90,
        },
        {
            title: "Meditation Marathon",
            participants: 234,
            deadline: "12 days left",
            progress: 45,
        },
    ];

    const forumTopics: ForumTopic[] = [
        {
            title: "Best pre-workout meals?",
            author: "FitnessGuru",
            replies: 23,
            lastActive: "2h ago",
        },
        {
            title: "Tips for maintaining workout consistency",
            author: "HealthyHabits",
            replies: 45,
            lastActive: "1h ago",
        },
        {
            title: "Sleep improvement strategies",
            author: "WellnessPro",
            replies: 34,
            lastActive: "30m ago",
        },
    ];

    return (
        <div className="w-full max-w-6xl mx-auto p-6">
            <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-bold">Community</h2>
                <Input
                    className="max-w-xs"
                    placeholder="Search community..."
                    icon={<Search className="h-4 w-4" />}
                />
            </div>

            <Tabs defaultValue="groups" className="w-full">
                <TabsList className="mb-8">
                    <TabsTrigger value="groups" className="flex items-center">
                        <Users className="mr-2 h-4 w-4" />
                        Health Groups
                    </TabsTrigger>
                    <TabsTrigger value="challenges" className="flex items-center">
                        <Trophy className="mr-2 h-4 w-4" />
                        Challenges
                    </TabsTrigger>
                    <TabsTrigger value="forum" className="flex items-center">
                        <MessageSquare className="mr-2 h-4 w-4" />
                        Forums
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="groups">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {groups.map((group, index) => (
                            <Card key={index} className="hover:shadow-lg transition-shadow duration-200">
                                <CardHeader>
                                    <CardTitle className="flex justify-between items-center">
                                        {group.name}
                                        <span className="text-sm text-green-500">{group.activity}</span>
                                    </CardTitle>
                                    <CardDescription>{group.description}</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm text-gray-600">{group.members} members</span>
                                        <Button variant="outline" size="sm">
                                            Join Group
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                        <Card className="flex items-center justify-center hover:shadow-lg transition-shadow duration-200 border-dashed">
                            <Button variant="ghost" className="flex items-center gap-2">
                                <Plus className="h-4 w-4" />
                                Create New Group
                            </Button>
                        </Card>
                    </div>
                </TabsContent>

                <TabsContent value="challenges">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {challenges.map((challenge, index) => (
                            <Card key={index} className="hover:shadow-lg transition-shadow duration-200">
                                <CardHeader>
                                    <CardTitle>{challenge.title}</CardTitle>
                                    <CardDescription>
                                        {challenge.participants} participants • {challenge.deadline}
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
                                        <div
                                            className="bg-blue-600 h-2.5 rounded-full"
                                            style={{ width: `${challenge.progress}%` }}
                                        ></div>
                                    </div>
                                    <Button variant="outline" size="sm">
                                        Join Challenge
                                    </Button>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </TabsContent>

                <TabsContent value="forum">
                    <div className="space-y-4">
                        {forumTopics.map((topic, index) => (
                            <Card key={index} className="hover:shadow-lg transition-shadow duration-200">
                                <CardHeader>
                                    <CardTitle className="text-lg">{topic.title}</CardTitle>
                                    <CardDescription className="flex justify-between">
                                        <span>Posted by {topic.author}</span>
                                        <span>{topic.replies} replies • {topic.lastActive}</span>
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <Button variant="ghost" className="text-blue-600">
                                        View Discussion <ArrowRight className="ml-2 h-4 w-4" />
                                    </Button>
                                </CardContent>
                            </Card>
                        ))}
                        <Button className="w-full" variant="outline">
                            <Plus className="mr-2 h-4 w-4" />
                            Start New Discussion
                        </Button>
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    );
};

export default CommunityFeatures;
