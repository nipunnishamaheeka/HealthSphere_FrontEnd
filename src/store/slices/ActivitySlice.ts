import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ActivityItem, User } from '../../types/type';

interface ActivityState {
    user: User | null;
    activities: ActivityItem[];
    weeklyProgress: {
        [key: string]: {
            calories: number;
            duration: number;
            count: number;
        };
    };
    isLoading: boolean;
    error: string | null;
}

const initialState: ActivityState = {
    user: null,
    activities: [
        {
            id: '1',
            type: 'Morning Run',
            duration: '30 min',
            distance: '3.2 km',
            calories: 320,
            time: '7:00 AM',
            date: new Date().toISOString(),
        },
        {
            id: '2',
            type: 'Yoga Session',
            duration: '45 min',
            calories: 180,
            time: '12:30 PM',
            date: new Date().toISOString(),
        },
        {
            id: '3',
            type: 'Weight Training',
            duration: '60 min',
            calories: 440,
            time: '5:30 PM',
            date: new Date().toISOString(),
        },
    ],
    weeklyProgress: {},
    isLoading: false,
    error: null,
};

const activitySlice = createSlice({
    name: 'activity',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<User>) => {
            state.user = action.payload;
        },
        addActivity: (state, action: PayloadAction<ActivityItem>) => {
            state.activities.push(action.payload);
            // Update weekly progress
            const date = new Date(action.payload.date).toISOString().split('T')[0];
            if (!state.weeklyProgress[date]) {
                state.weeklyProgress[date] = {
                    calories: 0,
                    duration: 0,
                    count: 0,
                };
            }
            state.weeklyProgress[date].calories += action.payload.calories;
            state.weeklyProgress[date].duration += parseInt(action.payload.duration);
            state.weeklyProgress[date].count += 1;
        },
        deleteActivity: (state, action: PayloadAction<string>) => {
            const activity = state.activities.find(a => a.id === action.payload);
            if (activity) {
                const date = new Date(activity.date).toISOString().split('T')[0];
                state.weeklyProgress[date].calories -= activity.calories;
                state.weeklyProgress[date].duration -= parseInt(activity.duration);
                state.weeklyProgress[date].count -= 1;
            }
            state.activities = state.activities.filter(activity => activity.id !== action.payload);
        },
        updateActivity: (state, action: PayloadAction<ActivityItem>) => {
            const index = state.activities.findIndex(activity => activity.id === action.payload.id);
            if (index !== -1) {
                state.activities[index] = action.payload;
            }
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload;
        },
        setError: (state, action: PayloadAction<string | null>) => {
            state.error = action.payload;
        },
        clearActivities: (state) => {
            state.activities = [];
            state.weeklyProgress = {};
        },
    },
});

export const {
    setUser,
    addActivity,
    deleteActivity,
    updateActivity,
    setLoading,
    setError,
    clearActivities,
} = activitySlice.actions;

export const selectTotalCalories = (state: { activity: ActivityState }) =>
    state.activity.activities.reduce((sum, activity) => sum + activity.calories, 0);

export const selectTotalActiveTime = (state: { activity: ActivityState }) => {
    const totalMinutes = state.activity.activities.reduce((sum, activity) => {
        const duration = parseInt(activity.duration);
        return sum + (isNaN(duration) ? 0 : duration);
    }, 0);

    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${hours}h ${minutes}m`;
};

export const selectWeeklyProgress = (state: { activity: ActivityState }) =>
    state.activity.weeklyProgress;

export default activitySlice.reducer;
