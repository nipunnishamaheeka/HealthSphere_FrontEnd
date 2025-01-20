import { configureStore } from '@reduxjs/toolkit';
import  mealPlannerReducer  from './slices/MealPlannerSlice';
import goalReducer from './slices/GoalSlice';
import activityReducer from './slices/ActivitySlice';
import contactsReducer from './slices/ContactsSlice';
import healthReducer from './slices/HealthSlice';
export const store = configureStore({
    reducer: {
        mealPlanner: mealPlannerReducer,
        activity: activityReducer,
        goal: goalReducer,
        contacts: contactsReducer,
        health: healthReducer
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
