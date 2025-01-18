import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/common/Card';
import {
    Target,
    TrendingUp,
    Calendar,
    Award,
    Plus,
    ChevronRight,
    MoreVertical,
    CheckCircle2,
    Trophy,
} from 'lucide-react';
import AddGoalModal from "../components/new Added/GoalModelPopup";

// Define types for the component's data
interface Milestone {
    title: string;
    completed: boolean;
}

interface Goal {
    id: number;
    title: string;
    category: string;
    target: string;
    progress: number;
    deadline: string;
    status: 'On Track' | 'Ahead' | 'Behind';
    milestones: Milestone[];
}

interface Achievement {
    title: string;
    description: string;
    icon: React.ElementType;
    date: string;
}

const GoalSetting: React.FC = () => {
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [goals, setGoals] = useState<Goal[]>([
        {
            id: 1,
            title: 'Weight Loss Goal',
            category: 'Weight Management',
            target: 'Lose 10kg',
            progress: 60,
            deadline: '2024-03-15',
            status: 'On Track',
            milestones: [
                { title: 'Lost first 2kg', completed: true },
                { title: 'Lost 5kg', completed: true },
                { title: 'Lost 8kg', completed: false },
            ],
        },
        {
            id: 2,
            title: 'Running Distance',
            category: 'Cardio',
            target: 'Run 10km',
            progress: 75,
            deadline: '2024-02-28',
            status: 'Ahead',
            milestones: [
                { title: 'Run 3km without stops', completed: true },
                { title: 'Run 5km under 30min', completed: true },
                { title: 'Run 8km', completed: false },
            ],
        },
        {
            id: 3,
            title: 'Meditation Streak',
            category: 'Wellness',
            target: '30 days streak',
            progress: 40,
            deadline: '2024-02-15',
            status: 'Behind',
            milestones: [
                { title: '7 days streak', completed: true },
                { title: '15 days streak', completed: false },
                { title: '21 days streak', completed: false },
            ],
        },
    ]);

    const achievements: Achievement[] = [
        {
            title: 'Early Bird',
            description: 'Completed 10 morning workouts',
            icon: Trophy,
            date: '2024-01-10',
        },
        {
            title: 'Goal Crusher',
            description: 'Completed 5 goals',
            icon: Award,
            date: '2024-01-08',
        },
    ];

    const handleAddGoal = (newGoal: Omit<Goal, 'id'>) => {
        const goal: Goal = {
            ...newGoal,
            id: Math.max(...goals.map(g => g.id), 0) + 1, // Generate new ID
        };
        setGoals([...goals, goal]);
    };

    const toggleMilestoneCompletion = (goalId: number, milestoneIndex: number) => {
        setGoals(goals.map(goal => {
            if (goal.id === goalId) {
                const newMilestones = [...goal.milestones];
                newMilestones[milestoneIndex] = {
                    ...newMilestones[milestoneIndex],
                    completed: !newMilestones[milestoneIndex].completed
                };

                // Calculate new progress based on completed milestones
                const completedCount = newMilestones.filter(m => m.completed).length;
                const newProgress = Math.round((completedCount / newMilestones.length) * 100);

                // Determine new status based on progress and deadline
                let newStatus: Goal['status'] = 'On Track';
                const deadlineDate = new Date(goal.deadline);
                const today = new Date();
                const timeProgress = (today.getTime() - new Date(goal.deadline).getTime()) / (deadlineDate.getTime() - new Date(goal.deadline).getTime());

                if (newProgress > timeProgress * 100) {
                    newStatus = 'Ahead';
                } else if (newProgress < timeProgress * 100) {
                    newStatus = 'Behind';
                }

                return {
                    ...goal,
                    milestones: newMilestones,
                    progress: newProgress,
                    status: newStatus
                };
            }
            return goal;
        }));
    };

    const deleteGoal = (goalId: number) => {
        setGoals(goals.filter(goal => goal.id !== goalId));
    };

    const calculateStats = () => {
        const activeGoals = goals.length;
        const completedGoals = goals.filter(goal => goal.progress === 100).length;
        const currentStreak = goals.filter(goal => goal.status === 'Ahead' || goal.status === 'On Track').length;
        const achievementPoints = achievements.length * 100 + completedGoals * 50;

        return {
            activeGoals,
            completedGoals,
            achievementPoints,
            currentStreak: `${currentStreak} days`
        };
    };

    const stats = calculateStats();

    return (
        <div className="space-y-6 p-6">
            {/* Header with Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-500">Active Goals</p>
                                <p className="text-2xl font-bold">{stats.activeGoals}</p>
                            </div>
                            <Target className="h-8 w-8 text-blue-500" />
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-500">Completed</p>
                                <p className="text-2xl font-bold">{stats.completedGoals}</p>
                            </div>
                            <CheckCircle2 className="h-8 w-8 text-green-500" />
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-500">Achievement Points</p>
                                <p className="text-2xl font-bold">{stats.achievementPoints}</p>
                            </div>
                            <Trophy className="h-8 w-8 text-yellow-500" />
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-500">Current Streak</p>
                                <p className="text-2xl font-bold">{stats.currentStreak}</p>
                            </div>
                            <TrendingUp className="h-8 w-8 text-purple-500" />
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Main Goals Section */}
            <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>Your Goals</CardTitle>
                    <button
                        onClick={() => setIsAddModalOpen(true)}
                        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 flex items-center space-x-2"
                    >
                        <Plus className="h-5 w-5" />
                        <span>Add New Goal</span>
                    </button>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {goals.map((goal) => (
                            <div key={goal.id} className="bg-gray-50 rounded-lg p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <div>
                                        <h3 className="text-lg font-medium">{goal.title}</h3>
                                        <p className="text-sm text-gray-500">{goal.category}</p>
                                    </div>
                                    <div className="flex items-center space-x-4">
                                        <span
                                            className={`px-3 py-1 rounded-full text-sm ${
                                                goal.status === 'On Track'
                                                    ? 'bg-green-100 text-green-800'
                                                    : goal.status === 'Ahead'
                                                        ? 'bg-blue-100 text-blue-800'
                                                        : 'bg-red-100 text-red-800'
                                            }`}
                                        >
                                            {goal.status}
                                        </span>
                                        <button
                                            className="p-1 hover:bg-gray-200 rounded-full"
                                            onClick={() => deleteGoal(goal.id)}
                                        >
                                            <MoreVertical className="h-5 w-5 text-gray-500" />
                                        </button>
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <div>
                                        <div className="flex justify-between text-sm text-gray-500 mb-1">
                                            <span>Progress</span>
                                            <span>{goal.progress}%</span>
                                        </div>
                                        <div className="w-full h-2 bg-gray-200 rounded-full">
                                            <div
                                                className="h-2 bg-blue-500 rounded-full transition-all duration-300"
                                                style={{ width: `${goal.progress}%` }}
                                            />
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between text-sm">
                                        <div className="flex items-center space-x-2">
                                            <Target className="h-4 w-4 text-gray-500" />
                                            <span>{goal.target}</span>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <Calendar className="h-4 w-4 text-gray-500" />
                                            <span>Due {goal.deadline}</span>
                                        </div>
                                    </div>
                                    <div className="border-t pt-4">
                                        <h4 className="text-sm font-medium mb-2">Milestones</h4>
                                        <div className="space-y-2">
                                            {goal.milestones.map((milestone, index) => (
                                                <div
                                                    key={index}
                                                    className="flex items-center space-x-2 cursor-pointer"
                                                    onClick={() => toggleMilestoneCompletion(goal.id, index)}
                                                >
                                                    <CheckCircle2
                                                        className={`h-4 w-4 ${
                                                            milestone.completed ? 'text-green-500' : 'text-gray-300'
                                                        }`}
                                                    />
                                                    <span
                                                        className={`text-sm ${
                                                            milestone.completed ? 'text-gray-700' : 'text-gray-500'
                                                        }`}
                                                    >
                                                        {milestone.title}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            {/* Achievements Section */}
            <Card>
                <CardHeader>
                    <CardTitle>Recent Achievements</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {achievements.map((achievement, index) => (
                            <div key={index} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                                <div className="h-12 w-12 bg-yellow-100 rounded-full flex items-center justify-center">
                                    <achievement.icon className="h-6 w-6 text-yellow-600" />
                                </div>
                                <div>
                                    <h4 className="font-medium">{achievement.title}</h4>
                                    <p className="text-sm text-gray-500">{achievement.description}</p>
                                    <p className="text-xs text-gray-400 mt-1">Achieved on {achievement.date}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            <AddGoalModal
                isOpen={isAddModalOpen}
                onClose={() => setIsAddModalOpen(false)}
                onAddGoal={handleAddGoal}
            />
        </div>
    );
};

export default GoalSetting;