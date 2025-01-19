import { configureStore } from '@reduxjs/toolkit';
import  mealPlannerReducer  from './slices/MealPlannerSlice';
export const store = configureStore({
    reducer: {
        // // users: usersReducer,
        // // editUserForm: editUserFormReducer,
        // trainer: trainersReducer,
        // healthLogs: healthLogReducer,
        mealPlanner: mealPlannerReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
