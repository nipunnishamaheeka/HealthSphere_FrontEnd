import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/common/Card';
import {
    Target,
    TrendingUp,
    Calendar,
    Award,
    Plus,
    MoreVertical,
    CheckCircle2,
    Trophy,
} from 'lucide-react';
import AddGoalModal from "../components/GoalModelPopup";
import { useAppDispatch, useAppSelector } from '../types/hooks';
import {
    fetchGoals,
    createGoal,
    deleteGoal,
    updateGoal,
    toggleMilestone,
    selectStats,
    selectGoals,
    selectAchievements
} from '../store/slices/GoalSlice';
import type { Achievement, Goal, Milestone } from '../types/goalType';
import {GoalSettingModel} from "@/model/GoalModel";

// StatsCard Component
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

// MilestoneList Component
interface MilestoneListProps {
    milestones: Milestone[];
    goalId: number;
    onToggle: (index: number) => void;
}

const MilestoneList: React.FC<MilestoneListProps> = ({ milestones, goalId, onToggle }) => (
    <div className="border-t pt-4">
        <h4 className="text-sm font-medium mb-2">Milestones</h4>
        <div className="space-y-2">
            {milestones && milestones.length > 0 ? (
                milestones.map((milestone, index) => (
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
                ))
            ) : (
                <p className="text-sm text-gray-400">No milestones added yet</p>
            )}
        </div>
    </div>
);

// GoalCard Component
interface GoalCardProps {
    // goal: Goal;
    goal: GoalSettingModel;
    onDelete: (id: number) => void;
    onToggleMilestone: (goalId: number, index: number) => void;
}

const GoalCard: React.FC<GoalCardProps> = ({ goal, onDelete, onToggleMilestone }) => (
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
                milestones={goal.milestones || []}
                goalId={goal.id}
                onToggle={(index) => onToggleMilestone(goal.id, index)}
            />
        </div>
    </div>
);

// AchievementSection Component
interface AchievementSectionProps {
    achievements: Achievement[];
}

const AchievementSection: React.FC<AchievementSectionProps> = ({ achievements }) => (
    <Card>
        <CardHeader>
            <CardTitle>Recent Achievements</CardTitle>
        </CardHeader>
        <CardContent>
            {achievements && achievements.length > 0 ? (
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
            ) : (
                <p className="text-center text-gray-500 py-6">Complete goals to earn achievements!</p>
            )}
        </CardContent>
    </Card>
);

// Main GoalSetting Component
const GoalSetting: React.FC = () => {
    const dispatch = useAppDispatch();
    const goals = useAppSelector(selectGoals);
    const achievements = useAppSelector(selectAchievements);
    const stats = useAppSelector(selectStats);
    const isLoading = useAppSelector(state => state.goal.isLoading);
    const error = useAppSelector(state => state.goal.error);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);

    useEffect(() => {
        // Fetch goals when component mounts
        const loadGoals = async () => {
            try {
                await dispatch(fetchGoals()).unwrap();
            } catch (error) {
            }
        };

        loadGoals();
    }, [dispatch]);

    const handleAddGoal = async (newGoal: Omit<Goal, 'id' | 'createdAt'>) => {
        try {
            await dispatch(createGoal(newGoal)).unwrap();
            setIsAddModalOpen(false);
        } catch (err) {
        }
    };

    const handleDeleteGoal = async (goalId: number) => {
        try {
            await dispatch(deleteGoal(goalId)).unwrap();
        } catch (err) {
        }
    };

    const handleToggleMilestone = async (goalId: number, milestoneIndex: number) => {
        const goal = goals.find(g => g.id === goalId);
        if (!goal) return;

        const updatedGoal = {
            ...goal,
            milestones: Array.isArray(goal.milestones)
                ? goal.milestones.map((m, i) =>
                    i === milestoneIndex ? { ...m, completed: !m.completed } : { ...m }
                )
                : []
        };

        try {
            await dispatch(updateGoal(updatedGoal)).unwrap();
            dispatch(toggleMilestone({ goalId, milestoneIndex }));
        } catch (err) {

        }
    };

    if (isLoading && goals.length === 0) {
        return <div className="flex justify-center items-center h-screen">Loading...</div>;
    }

    if (error) {
        return (
            <div className="text-red-500 text-center p-4 bg-red-50 rounded-lg border border-red-200 m-6">
                <h3 className="font-medium mb-2">Error</h3>
                <p>{error}</p>
            </div>
        );
    }

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
                    {goals && goals.length > 0 ? (
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
                    ) : (
                        <div className="text-center py-8 text-gray-500">
                            <p>No goals yet. Click "Add New Goal" to get started!</p>
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* Achievements Section */}
            <AchievementSection achievements={achievements} />

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