import { configureStore } from '@reduxjs/toolkit';
import  mealPlannerReducer  from './slices/MealPlannerSlice';

import activityReducer from './slices/ActivitySlice';
export const store = configureStore({
    reducer: {
        // // users: usersReducer,
        // // editUserForm: editUserFormReducer,
        // trainer: trainersReducer,
        // healthLogs: healthLogReducer,
        mealPlanner: mealPlannerReducer,
        activity: activityReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
