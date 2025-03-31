import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { MealPlannerModel } from '../../model/MealPlanModel';

// Define the state structure properly
interface MealPlannerState {
    meals: MealPlannerModel[];
    isLoading: boolean;
    error: string | null;
}

const initialState: MealPlannerState = {
    meals: [],
    isLoading: false,
    error: null,
};

const api = axios.create({
    baseURL: "/api/mealplan",
    headers: {
        'Content-Type': 'application/json',
    },
});

// export const fetchMeals = createAsyncThunk(
//     "mealPlanner/fetchMeals",
//     async (_, { rejectWithValue }) => {
//         try {
//             const response = await api.get("/get");
//             console.log("Fetched Meals:", response.data);
//             // Ensure we're returning the data array properly
//             const mealsData = response.data.data || response.data;
//             return Array.isArray(mealsData) ? mealsData : [];
//         } catch (err: any) {
//             console.error("Error fetching meals:", err);
//             return rejectWithValue(err.response?.data || "Failed to fetch meals");
//         }
//     })
export const fetchMeals = createAsyncThunk(
    "mealPlanner/fetchMeals",
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.get("/get");
            console.log("Fetched Meals:", response.data);

            // Ensure correct response structure
            const mealsData = response.data?.data || response.data;
            return Array.isArray(mealsData) ? mealsData : [];
        } catch (err: any) {
            console.error("Error fetching meals:", err);
            return rejectWithValue(err.response?.data || "Failed to fetch meals");
        }
    }
);

export const createMeal = createAsyncThunk(
    "mealPlanner/createMeal",
    async (meal: MealPlannerModel, { rejectWithValue }) => {
        try {
            console.log("Meal:", meal);
            const response = await api.post("/post", meal);
            console.log("Saved Meal:", response.data);
            return response.data;
        } catch (error: any) {
            console.error("Error saving meal:", error);
            return rejectWithValue(error.response?.data || "Failed to save meal");
        }
    }
);

export const updateMealAsync = createAsyncThunk(
    "mealPlanner/updateMealAsync",
    async (meal: MealPlannerModel, { rejectWithValue }) => {
        try {
            const response = await api.put(`/update/${meal.meal_id}`, meal);
            console.log("Updated Meal:", response.data);
            return response.data as MealPlannerModel;
        } catch (error: any) {
            console.error("Error updating meal:", error);
            return rejectWithValue(error.response?.data || "Failed to update meal");
        }
    }
)

export const deleteMealAsync = createAsyncThunk<
    string,
    string,
    { rejectValue: string }
>('mealPlanner/deleteMealAsync', async (mealId, { rejectWithValue }) => {
    try {
        const response = await api.delete(`/delete/${mealId}`);
        if (!response.data.success) {
            throw new Error(response.data.error);
        }
        return mealId;
    } catch (error: any) {
        return rejectWithValue(error.message || "Failed to delete meal");
    }
});

const mealPlannerSlice = createSlice({
    name: 'mealPlanner',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Fetch meals
            .addCase(fetchMeals.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchMeals.fulfilled, (state, action: PayloadAction<MealPlannerModel[]>) => {
                state.isLoading = false;
                state.meals = action.payload;

                console.log("Updated Redux State - Meals:", JSON.parse(JSON.stringify(state.meals)));
            })

            .addCase(fetchMeals.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string || "Unknown error occurred";
                console.error("Error fetching meals:", action.payload);
            })

            // Create meal
            .addCase(createMeal.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(createMeal.fulfilled, (state, action: PayloadAction<MealPlannerModel>) => {
                state.isLoading = false;
                state.meals.push(action.payload);
                console.log("Saved Meal:", action.payload);
            })
            .addCase(createMeal.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string || "Unknown error occurred";
                console.log("Error saving meal:", action.payload);
            })

            // Update meal
            .addCase(updateMealAsync.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(updateMealAsync.fulfilled, (state, action: PayloadAction<MealPlannerModel>) => {
                state.isLoading = false;
                const index = state.meals.findIndex((meal) => meal.meal_id === action.payload.meal_id);
                if (index !== -1) {
                    console.log("Updating Meal:", action.payload);
                    state.meals[index] = action.payload;
                }
            })
            .addCase(updateMealAsync.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string || "Unknown error occurred";
                console.log("Error updating meal:", action.payload);
            })

            // Delete meal
            .addCase(deleteMealAsync.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(deleteMealAsync.fulfilled, (state, action: PayloadAction<string>) => {
                state.isLoading = false;
                state.meals = state.meals.filter((meal) => meal.meal_id !== action.payload);
                console.log(`Deleted Meal with meal_id: ${action.payload}`);
            })
            .addCase(deleteMealAsync.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string || "Unknown error occurred";
                console.log("Error deleting meal:", action.payload);
            });
    }
});

export default mealPlannerSlice.reducer;