// types/activity.ts
export interface ActivityFormData {
    type: string;
    duration: number;
    calories: number;
    date: Date;
}

export interface ActivityTrackerModel {
    id: string;
    user_id: string;
    exerciseType: string;
    duration: number;
    caloriesBurned: number;
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