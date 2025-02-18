import { createSlice, PayloadAction, createSelector, createAsyncThunk } from '@reduxjs/toolkit';
import { Goal, Achievement, User } from '../../types/type';
import { GoalSettingModel } from "../../model/GoalModel";
import axios from "axios";

interface GoalState {
    goals: Goal[];
    achievements: Achievement[];
    user: User | null;
    isLoading: boolean;
    error: string | null;
}

export const initialState: GoalState = {
    goals: [],
    achievements: [],
    user: null,
    isLoading: false,
    error: null
};

const api = axios.create({
    baseURL: "http://localhost:3000/goal",
});

// Convert GoalSettingModel to Goal
const convertToGoal = (goalSetting: GoalSettingModel): Goal => {
    // Ensure target_date is a valid Date object
    const targetDate = goalSetting.target_date ? new Date(goalSetting.target_date) : new Date();

    if (isNaN(targetDate.getTime())) {
        console.error("Invalid target_date received:", goalSetting.target_date);
        throw new Error("Invalid target_date format");
    }

    return {
        id: parseInt(goalSetting.goal_id),
        title: goalSetting.goal_value,
        category: goalSetting.goal_type,
        target: goalSetting.goal_value,
        progress: goalSetting.current_progress,
        deadline: targetDate.toISOString(),
        status: calculateGoalStatus({
            progress: goalSetting.current_progress,
            createdAt: new Date().toISOString(),
            deadline: targetDate.toISOString(),
        }),
        milestones: [],
        createdAt: new Date().toISOString()
    };
};


// Convert Goal to GoalSettingModel
const convertToGoalSetting = (goal: Goal): GoalSettingModel => {
    console.log("Converting Goal to GoalSettingModel:", goal);
    return new GoalSettingModel(
        goal.id.toString(),
        goal.user_id || "default",
        goal.category,
        goal.target,
        goal.progress,
        new Date(goal.deadline)
    );
};

export const fetchGoals = createAsyncThunk(
    "goal/fetchGoals",
    async (_, { rejectWithValue }) => {
        try {
            console.log("Fetching goals from API...");
            const response = await api.get("/get");
            console.log("Fetched goals:", response.data);
            return response.data.map(convertToGoal);
        } catch (err: any) {
            console.error("Error fetching goals:", err);
            return rejectWithValue(err.response?.data || "Failed to fetch goals");
        }
    }
);

export const updateGoal = createAsyncThunk(
    "goal/updateGoal",
    async (goal: Goal, { rejectWithValue }) => {
        try {
            console.log("Updating goal:", goal);
            const goalSetting = convertToGoalSetting(goal);
            const response = await api.put(`/update/${goal.id}`, goalSetting);
            console.log("Updated goal response:", response.data);
            return convertToGoal(response.data);
        } catch (err: any) {
            console.error("Error updating goal:", err);
            return rejectWithValue(err.response?.data || "Failed to update goal");
        }
    }
);

export const deleteGoal = createAsyncThunk(
    "goal/deleteGoal",
    async (goalId: number, { rejectWithValue }) => {
        try {
            console.log(`Deleting goal with ID: ${goalId}`);
            await api.delete(`/delete/${goalId}`);
            return goalId;
        } catch (err: any) {
            console.error("Error deleting goal:", err);
            return rejectWithValue(err.response?.data || "Failed to delete goal");
        }
    }
);


export const createGoal = createAsyncThunk(
    "goal/createGoal",
    async (goal: Omit<Goal, 'id' | 'createdAt'>, { rejectWithValue }) => {
        try {
            console.log("Creating new goal:", goal);
            const newGoal: Goal = {
                ...goal,
                id: Date.now(),
                createdAt: new Date().toISOString()
            };
            const goalSetting = convertToGoalSetting(newGoal);
            const response = await api.post("/post", goalSetting);
            console.log("Created goal response:", response.data);
            return convertToGoal(response.data);
        } catch (err: any) {
            console.error("Error creating goal:", err);
            return rejectWithValue(err.response?.data || "Failed to create goal");
        }
    }
);


const goalSlice = createSlice({
    name: 'goal',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<User>) => {
            state.user = action.payload;
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
                const completedMilestones = goal.milestones.filter(m => m.completed).length;
                goal.progress = Math.round((completedMilestones / goal.milestones.length) * 100);
                goal.status = calculateGoalStatus(goal);
                checkAndAddAchievement(state);
            }
        },
        addAchievement: (state, action: PayloadAction<Achievement>) => {
            state.achievements.push(action.payload);
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchGoals.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchGoals.fulfilled, (state, action) => {
                state.isLoading = false;
                state.goals = action.payload;
                state.error = null;
            })
            .addCase(fetchGoals.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            })
            // Handle other async actions similarly
            .addCase(createGoal.fulfilled, (state, action) => {
                state.goals.push(action.payload);
            })
            .addCase(updateGoal.fulfilled, (state, action) => {
                const index = state.goals.findIndex(g => g.id === action.payload.id);
                if (index !== -1) {
                    state.goals[index] = action.payload;
                }
            })
            .addCase(deleteGoal.fulfilled, (state, action) => {
                state.goals = state.goals.filter(goal => goal.id !== action.payload);
            });
    }
});

// Helper function to calculate goal status
const calculateGoalStatus = (goal: Pick<Goal, 'progress' | 'createdAt' | 'deadline'>): 'On Track' | 'Ahead' | 'Behind' => {
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

// Selectors
export const selectGoalState = (state: { goal: GoalState }) => state.goal;
export const selectGoals = createSelector([selectGoalState], state => state.goals);
export const selectAchievements = createSelector([selectGoalState], state => state.achievements);
export const selectStats = createSelector(
    [selectGoals, selectAchievements],
    (goals, achievements) => ({
        activeGoals: goals.length,
        completedGoals: goals.filter(g => g.progress === 100).length,
        achievementPoints: achievements.length * 100 + goals.filter(g => g.progress === 100).length * 50,
        currentStreak: `${goals.filter(g => g.status === 'Ahead' || g.status === 'On Track').length} days`
    })
);

export const { setUser, updateGoalProgress, toggleMilestone, addAchievement } = goalSlice.actions;
export default goalSlice.reducer;