import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Meal, User } from '../../types/type';

interface MealPlannerState {
    user: User | null;
    meals: Meal[];
    isLoading: boolean;
    error: string | null;
}

const initialState: MealPlannerState = {
    user: null,
    meals: [
        {
            type: 'Breakfast',
            time: '8:00 AM',
            items: ['Oatmeal with berries', 'Greek yogurt', 'Green tea'],
            calories: 420,
            protein: '15g',
            carbs: '65g',
            fat: '12g',
        },
        {
            type: 'Lunch',
            time: '1:00 PM',
            items: ['Grilled chicken salad', 'Quinoa', 'Olive oil dressing'],
            calories: 550,
            protein: '35g',
            carbs: '45g',
            fat: '25g',
        },
        {
            type: 'Dinner',
            time: '7:00 PM',
            items: ['Salmon', 'Roasted vegetables', 'Brown rice'],
            calories: 650,
            protein: '40g',
            carbs: '55g',
            fat: '30g',
        },
    ],
    isLoading: false,
    error: null,
};

const mealPlannerSlice = createSlice({
    name: 'mealPlanner',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<User>) => {
            state.user = action.payload;
        },
        addMeal: (state, action: PayloadAction<Meal>) => {
            state.meals.push(action.payload);
        },
        updateMeal: (state, action: PayloadAction<{ type: string; updatedMeal: Meal }>) => {
            const index = state.meals.findIndex(meal => meal.type === action.payload.type);
            if (index !== -1) {
                state.meals[index] = action.payload.updatedMeal;
            }
        },
        deleteMeal: (state, action: PayloadAction<string>) => {
            state.meals = state.meals.filter(meal => meal.type !== action.payload);
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload;
        },
        setError: (state, action: PayloadAction<string | null>) => {
            state.error = action.payload;
        },
        clearMeals: (state) => {
            state.meals = [];
        },
    },
});

export const {
    setUser,
    addMeal,
    updateMeal,
    deleteMeal,
    setLoading,
    setError,
    clearMeals,
} = mealPlannerSlice.actions;

export default mealPlannerSlice.reducer;