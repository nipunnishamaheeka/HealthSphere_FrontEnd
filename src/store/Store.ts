import { configureStore } from '@reduxjs/toolkit';
import  mealPlannerReducer  from './slices/MealPlannerSlice';
import goalReducer from './slices/GoalSlice';
import activityReducer from './slices/ActivitySlice';
export const store = configureStore({
    reducer: {
        // // users: usersReducer,
        // // editUserForm: editUserFormReducer,
        // trainer: trainersReducer,
        // healthLogs: healthLogReducer,
        mealPlanner: mealPlannerReducer,
        activity: activityReducer,
        goal: goalReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
