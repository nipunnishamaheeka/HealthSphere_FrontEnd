import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Define types
export enum MealType {
    Breakfast = 'Breakfast',
    Lunch = 'Lunch',
    Dinner = 'Dinner'
}

export interface User {
    id: string;
    name: string;
}

export interface Meal {
    id: string;
    type: MealType;
    time: string;
    items: string[];
    calories: number;
    protein: string | number;
    carbs: string | number;
    fat: string | number;
    date?: Date;
}

export class MealPlannerModel {
    meal_id: string;
    user_id: string;
    trainer_id: string | null;
    meal_plan_date: Date;
    meal_type: MealType;
    ingredients: string;
    nutritional_breakdown: string;

    constructor(
        meal_id: string,
        user_id: string,
        trainer_id: string | null,
        meal_plan_date: Date,
        meal_type: MealType,
        ingredients: string,
        nutritional_breakdown: string
    ) {
        this.meal_id = meal_id;
        this.user_id = user_id;
        this.trainer_id = trainer_id;
        this.meal_plan_date = meal_plan_date;
        this.meal_type = meal_type;
        this.ingredients = ingredients;
        this.nutritional_breakdown = nutritional_breakdown;
    }
}

// Axios instance
const api = axios.create({
    baseURL: "http://localhost:3000/mealplan",
});

// State Interface
interface MealPlannerState {
    user: User | null;
    meals: Meal[];
    isLoading: boolean;
    error: string | null;
}

const initialState: MealPlannerState = {
    user: null,
    meals: [],
    isLoading: false,
    error: null,
};

// Get meal time based on type
const getMealTimeByType = (type: MealType): string => {
    const mealTimes: Record<MealType, string> = {
        [MealType.Breakfast]: '8:00 AM',
        [MealType.Lunch]: '1:00 PM',
        [MealType.Dinner]: '7:00 PM',
    };
    return mealTimes[type] || '12:00 PM';
};

// Convert backend response to frontend model
const transformMealToFrontend = (meal: MealPlannerModel | any): Meal => {
    // Handle if it's already a MealPlannerModel instance or raw API response
    const mealData = meal instanceof MealPlannerModel ? meal : meal;
    const nutritionalData = typeof mealData.nutritional_breakdown === 'string' ?
        JSON.parse(mealData.nutritional_breakdown) : mealData.nutritional_breakdown;
    const items = typeof mealData.ingredients === 'string' ?
        JSON.parse(mealData.ingredients) : mealData.ingredients;

    return {
        id: mealData.meal_id,
        type: mealData.meal_type,
        time: getMealTimeByType(mealData.meal_type),
        items: items || [],
        calories: nutritionalData?.calories || 0,
        protein: nutritionalData?.protein || 0,
        carbs: nutritionalData?.carbs || 0,
        fat: nutritionalData?.fat || 0,
        date: new Date(mealData.meal_plan_date),
    };
};

// Convert frontend model to backend request format (MealPlannerModel)
const transformMealToBackend = (meal: Meal, userId: string): MealPlannerModel => {
    return new MealPlannerModel(
        meal.id || '',
        userId,
        null, // trainer_id
        meal.date || new Date(),
        meal.type,
        JSON.stringify(meal.items),
        JSON.stringify({
            calories: meal.calories,
            protein: meal.protein,
            carbs: meal.carbs,
            fat: meal.fat
        })
    );
};

// Helper to convert MealPlannerModel to plain object for API requests
const modelToPlainObject = (model: MealPlannerModel): any => {
    return {
        meal_id: model.meal_id,
        user_id: model.user_id,
        trainer_id: model.trainer_id,
        meal_plan_date: model.meal_plan_date.toISOString(),
        meal_type: model.meal_type,
        ingredients: model.ingredients,
        nutritional_breakdown: model.nutritional_breakdown
    };
};

// Async thunks for API operations
export const fetchMeals = createAsyncThunk(
    'mealPlanner/fetchMeals',
    async ({ userId, date }: { userId: string, date: Date }, { rejectWithValue }) => {
        try {
            const formattedDate = date.toISOString().split('T')[0];
            const response = await api.get('/', {
                params: { user_id: userId, date: formattedDate }
            });
            return response.data.map(transformMealToFrontend);
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || 'Failed to fetch meals');
        }
    }
);

export const createMeal = createAsyncThunk(
    'mealPlanner/createMeal',
    async ({ meal, userId }: { meal: Meal, userId: string }, { rejectWithValue }) => {
        try {
            const mealModel = transformMealToBackend(meal, userId);
            const response = await api.post('/', modelToPlainObject(mealModel));
            // Return the newly created meal with updated ID from server
            return transformMealToFrontend({
                ...mealModel,
                meal_id: response.data.meal_id
            });
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || 'Failed to create meal');
        }
    }
);

export const updateMealAsync = createAsyncThunk(
    'mealPlanner/updateMealAsync',
    async ({ meal, userId }: { meal: Meal, userId: string }, { rejectWithValue }) => {
        if (!meal.id) {
            return rejectWithValue('Meal ID is required for update');
        }
        try {
            const mealModel = transformMealToBackend(meal, userId);
            await api.put(`/${meal.id}`, modelToPlainObject(mealModel));
            return meal; // Return the updated meal
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || 'Failed to update meal');
        }
    }
);

export const deleteMealAsync = createAsyncThunk(
    'mealPlanner/deleteMealAsync',
    async (mealId: string, { rejectWithValue }) => {
        try {
            await api.delete(`/${mealId}`);
            return mealId;
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || 'Failed to delete meal');
        }
    }
);

// Slice
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
        updateMeal: (state, action: PayloadAction<Meal>) => {
            const index = state.meals.findIndex(meal => meal.id === action.payload.id);
            if (index !== -1) state.meals[index] = action.payload;
        },
        deleteMeal: (state, action: PayloadAction<string>) => {
            state.meals = state.meals.filter(meal => meal.id !== action.payload);
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
    extraReducers: (builder) => {
        builder
            .addCase(fetchMeals.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchMeals.fulfilled, (state, action) => {
                state.isLoading = false;
                state.meals = action.payload;
            })
            .addCase(fetchMeals.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            })
            .addCase(createMeal.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(createMeal.fulfilled, (state, action) => {
                state.isLoading = false;
                state.meals.push(action.payload);
            })
            .addCase(createMeal.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            })
            .addCase(updateMealAsync.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(updateMealAsync.fulfilled, (state, action) => {
                state.isLoading = false;
                const index = state.meals.findIndex(meal => meal.id === action.payload.id);
                if (index !== -1) state.meals[index] = action.payload;
            })
            .addCase(updateMealAsync.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            })
            .addCase(deleteMealAsync.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(deleteMealAsync.fulfilled, (state, action) => {
                state.isLoading = false;
                state.meals = state.meals.filter(meal => meal.id !== action.payload);
            })
            .addCase(deleteMealAsync.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            });
    }
});

export const { setUser, addMeal, updateMeal, deleteMeal, setLoading, setError, clearMeals } = mealPlannerSlice.actions;

export default mealPlannerSlice.reducer;