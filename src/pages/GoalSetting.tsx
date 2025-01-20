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
import AddGoalModal from "../components/GoalModelPopup";
import { useAppDispatch, useAppSelector } from '../types/hooks';
import {
    addGoal,
    deleteGoal,
    toggleMilestone,
    selectStats
} from '../store/slices/GoalSlice';
import type { Goal } from '../types/type';

interface StatsCardProps {
    title: string;
    value: string | number;
    icon: React.ReactNode;
    iconColor: string;
}

const StatsCard: React.FC<StatsCardProps> = ({ title, value, icon, iconColor }) => (
    <Card>
        <CardContent className="p-6">
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm text-gray-500">{title}</p>
                    <p className="text-2xl font-bold">{value}</p>
                </div>
                <div className={`h-8 w-8 ${iconColor}`}>
                    {icon}
                </div>
            </div>
        </CardContent>
    </Card>
);

const MilestoneList: React.FC<{
    milestones: { title: string; completed: boolean }[];
    goalId: number;
    onToggle: (index: number) => void;
}> = ({ milestones, goalId, onToggle }) => (
    <div className="border-t pt-4">
        <h4 className="text-sm font-medium mb-2">Milestones</h4>
        <div className="space-y-2">
            {milestones.map((milestone, index) => (
                <div
                    key={index}
                    className="flex items-center space-x-2 cursor-pointer"
                    onClick={() => onToggle(index)}
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
);

const GoalCard: React.FC<{
    goal: Goal;
    onDelete: (id: number) => void;
    onToggleMilestone: (goalId: number, index: number) => void;
}> = ({ goal, onDelete, onToggleMilestone }) => (
    <div className="bg-gray-50 rounded-lg p-6">
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
                    onClick={() => onDelete(goal.id)}
                    aria-label="Delete goal"
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
                    <span>Due {new Date(goal.deadline).toLocaleDateString()}</span>
                </div>
            </div>
            <MilestoneList
                milestones={goal.milestones}
                goalId={goal.id}
                onToggle={(index) => onToggleMilestone(goal.id, index)}
            />
        </div>
    </div>
);

const AchievementSection: React.FC = () => {
    const achievements = useAppSelector(state => state.goal.achievements);

    return (
        <Card>
            <CardHeader>
                <CardTitle>Recent Achievements</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {achievements.map((achievement) => (
                        <div key={achievement.id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                            <div className="h-12 w-12 bg-yellow-100 rounded-full flex items-center justify-center">
                                <Trophy className="h-6 w-6 text-yellow-600" />
                            </div>
                            <div>
                                <h4 className="font-medium">{achievement.title}</h4>
                                <p className="text-sm text-gray-500">{achievement.description}</p>
                                <p className="text-xs text-gray-400 mt-1">
                                    Achieved on {new Date(achievement.date).toLocaleDateString()}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
};

const GoalSetting: React.FC = () => {
    const dispatch = useAppDispatch();
    const goals = useAppSelector(state => state.goal.goals);
    const stats = useAppSelector(selectStats);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);

    const handleAddGoal = (newGoal: Omit<Goal, 'id' | 'createdAt'>) => {
        dispatch(addGoal(newGoal));
        setIsAddModalOpen(false);
    };

    const handleDeleteGoal = (goalId: number) => {
        dispatch(deleteGoal(goalId));
    };

    const handleToggleMilestone = (goalId: number, milestoneIndex: number) => {
        dispatch(toggleMilestone({ goalId, milestoneIndex }));
    };

    return (
        <div className="space-y-6 p-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <StatsCard
                    title="Active Goals"
                    value={stats.activeGoals}
                    icon={<Target className="h-full w-full" />}
                    iconColor="text-blue-500"
                />
                <StatsCard
                    title="Completed"
                    value={stats.completedGoals}
                    icon={<CheckCircle2 className="h-full w-full" />}
                    iconColor="text-green-500"
                />
                <StatsCard
                    title="Achievement Points"
                    value={stats.achievementPoints}
                    icon={<Trophy className="h-full w-full" />}
                    iconColor="text-yellow-500"
                />
                <StatsCard
                    title="Current Streak"
                    value={stats.currentStreak}
                    icon={<TrendingUp className="h-full w-full" />}
                    iconColor="text-purple-500"
                />
            </div>

            {/* Goals Section */}
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
                            <GoalCard
                                key={goal.id}
                                goal={goal}
                                onDelete={handleDeleteGoal}
                                onToggleMilestone={handleToggleMilestone}
                            />
                        ))}
                    </div>
                </CardContent>
            </Card>

            {/* Achievements Section */}
            <AchievementSection />

            {/* Add Goal Modal */}
            <AddGoalModal
                isOpen={isAddModalOpen}
                onClose={() => setIsAddModalOpen(false)}
                onAddGoal={handleAddGoal}
            />
        </div>
    );
};

export default GoalSetting;