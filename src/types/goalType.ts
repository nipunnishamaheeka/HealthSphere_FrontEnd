// types/type.ts

// Goal Setting Types
export type GoalSettingModel = {
    goal_id: string;
    user_id: string;
    goal_type: string;
    goal_value: string;
    current_progress: number;
    target_date: Date;
}

// Goal State Types
export type GoalState = {
    goals: GoalSettingModel[];
    isLoading: boolean;
    error: string | null;
}

// API Response Types
export type ApiResponse<T> = {
    success: boolean;
    data: T;
    message?: string;
}

// Goal Form Types
export type GoalFormData = Omit<GoalSettingModel, 'goal_id'>;

// Redux State Type
export type RootState = {
    goal: GoalState;
}

// Redux Action Types
export type GoalActionTypes = {
    SET_GOALS: 'SET_GOALS';
    ADD_GOAL: 'ADD_GOAL';
    UPDATE_GOAL: 'UPDATE_GOAL';
    DELETE_GOAL: 'DELETE_GOAL';
    SET_LOADING: 'SET_LOADING';
    SET_ERROR: 'SET_ERROR';
}

// Redux Action Payloads
export type GoalAction = {
    type: GoalActionTypes[keyof GoalActionTypes];
    payload?: any;
}

// Redux Thunk Types
export type AppThunk<ReturnType = void> = (
    dispatch: any,
    getState: () => RootState
) => ReturnType;

// Goal Status Type
export type GoalStatus = 'Not Started' | 'In Progress' | 'Completed';

// User Type (if needed for authentication)
export type User = {
    user_id: string;
    username: string;
    email: string;
}

// Goal Statistics Type
export type GoalStats = {
    totalGoals: number;
    completedGoals: number;
    inProgressGoals: number;
    averageProgress: number;
}

// Sort and Filter Types
export type GoalSortOption = 'date' | 'progress' | 'type';
export type GoalFilterOption = 'all' | 'completed' | 'in-progress' | 'not-started';

// Error Types
export type ApiError = {
    code: string;
    message: string;
    details?: string;
}