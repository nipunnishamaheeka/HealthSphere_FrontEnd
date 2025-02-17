// types/activity.ts
export interface ActivityFormData {
    exercise_type: string;
    duration: number;
    calories_burned: number;
    date: Date;
}

export interface ActivityTrackerModel {
    activity_id: string;
    user_id: string;
    exercise_type: string;
    duration: number;
    calories_burned: number;
    date: Date;
}

export interface ActivityState {
    activities: ActivityTrackerModel[];
    weeklyProgress: Record<string, { calories: number; duration: number; count: number }>;
    isLoading: boolean;
    error: string | null;
}

// Define the root state type
export interface RootState {
    activity: ActivityState;
}