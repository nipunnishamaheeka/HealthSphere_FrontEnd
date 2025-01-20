import { createSlice, PayloadAction, createSelector } from '@reduxjs/toolkit';
import { Goal, Achievement, User } from '../../types/type';

interface GoalState {
    user: User | null;
    goals: Goal[];
    achievements: Achievement[];
    isLoading: boolean;
    error: string | null;
}

const initialState: GoalState = {
    user: null,
    goals: [
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
            createdAt: new Date().toISOString(),
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
            createdAt: new Date().toISOString(),
        },
    ],
    achievements: [
        {
            id: '1',
            title: 'Early Bird',
            description: 'Completed 10 morning workouts',
            icon: 'Trophy',
            date: '2024-01-10',
        },
        {
            id: '2',
            title: 'Goal Crusher',
            description: 'Completed 5 goals',
            icon: 'Award',
            date: '2024-01-08',
        },
    ],
    isLoading: false,
    error: null,
};

const goalSlice = createSlice({
    name: 'goal',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<User>) => {
            state.user = action.payload;
        },
        addGoal: (state, action: PayloadAction<Omit<Goal, 'id' | 'createdAt'>>) => {
            const newGoal: Goal = {
                ...action.payload,
                id: Math.max(...state.goals.map(g => g.id), 0) + 1,
                createdAt: new Date().toISOString(),
            };
            state.goals.push(newGoal);
        },
        deleteGoal: (state, action: PayloadAction<number>) => {
            state.goals = state.goals.filter(goal => goal.id !== action.payload);
        },
        updateGoalProgress: (state, action: PayloadAction<{ id: number; progress: number }>) => {
            const goal = state.goals.find(g => g.id === action.payload.id);
            if (goal) {
                goal.progress = action.payload.progress;
                goal.status = calculateGoalStatus(goal);
            }
        },
        toggleMilestone: (state, action: PayloadAction<{ goalId: number; milestoneIndex: number }>) => {
            const goal = state.goals.find(g => g.id === action.payload.goalId);
            if (goal) {
                goal.milestones[action.payload.milestoneIndex].completed =
                    !goal.milestones[action.payload.milestoneIndex].completed;

                // Update progress based on milestones
                const completedMilestones = goal.milestones.filter(m => m.completed).length;
                goal.progress = Math.round((completedMilestones / goal.milestones.length) * 100);
                goal.status = calculateGoalStatus(goal);

                // Check for achievements
                if (goal.progress === 100) {
                    checkAndAddAchievement(state);
                }
            }
        },
        addAchievement: (state, action: PayloadAction<Achievement>) => {
            state.achievements.push(action.payload);
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload;
        },
        setError: (state, action: PayloadAction<string | null>) => {
            state.error = action.payload;
        },
    },
});

// Helper function to calculate goal status
const calculateGoalStatus = (goal: Goal): 'On Track' | 'Ahead' | 'Behind' => {
    const deadline = new Date(goal.deadline);
    const today = new Date();
    const totalDays = deadline.getTime() - new Date(goal.createdAt).getTime();
    const daysElapsed = today.getTime() - new Date(goal.createdAt).getTime();
    const expectedProgress = (daysElapsed / totalDays) * 100;

    if (goal.progress >= expectedProgress + 10) return 'Ahead';
    if (goal.progress <= expectedProgress - 10) return 'Behind';
    return 'On Track';
};

// Helper function to check and add achievements
const checkAndAddAchievement = (state: GoalState) => {
    const completedGoals = state.goals.filter(g => g.progress === 100).length;

    if (completedGoals === 5 && !state.achievements.some(a => a.title === 'Goal Crusher')) {
        state.achievements.push({
            id: Date.now().toString(),
            title: 'Goal Crusher',
            description: 'Completed 5 goals',
            icon: 'Trophy',
            date: new Date().toISOString(),
        });
    }
};

// Base selectors
const selectGoalState = (state: { goal: GoalState }) => state.goal;
const selectGoals = createSelector(
    [selectGoalState],
    state => state.goals
);
const selectAchievements = createSelector(
    [selectGoalState],
    state => state.achievements
);

// Memoized stats selector
export const selectStats = createSelector(
    [selectGoals, selectAchievements],
    (goals, achievements) => {
        const activeGoals = goals.length;
        const completedGoals = goals.filter(g => g.progress === 100).length;
        const currentStreak = goals.filter(g => g.status === 'Ahead' || g.status === 'On Track').length;
        const achievementPoints = achievements.length * 100 + completedGoals * 50;

        return {
            activeGoals,
            completedGoals,
            achievementPoints,
            currentStreak: `${currentStreak} days`
        };
    }
);

export const {
    setUser,
    addGoal,
    deleteGoal,
    updateGoalProgress,
    toggleMilestone,
    addAchievement,
    setLoading,
    setError,
} = goalSlice.actions;

export default goalSlice.reducer;