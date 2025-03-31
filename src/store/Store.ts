 import { configureStore } from '@reduxjs/toolkit';
import  mealPlannerReducer  from './slices/MealPlannerSlice';
import goalReducer from './slices/GoalSlice';
import activityReducer from './slices/ActivitySlice';
import contactsReducer from './slices/ContactsSlice';
import healthReducer from './slices/HealthSlice';
import trainerReducer from './slices/TrainerSlice';
 import userReducer from './slices/UserSlice';
export const store = configureStore({
    reducer: {

        mealPlanner: mealPlannerReducer,
        activity: activityReducer,
        goal: goalReducer,
        contacts: contactsReducer,
        health: healthReducer,
        trainer: trainerReducer,
        user: userReducer,
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
