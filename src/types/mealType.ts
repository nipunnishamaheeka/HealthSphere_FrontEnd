// State Interface
export interface MealPlannerState {
    user: User | null;
    meals: MealModel[];
    isLoading: boolean;
    error: string | null;
}

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
export interface MealModel {
    id: string;
    mealType: MealType;
    time: string;
    ingredients: string[];
    calories: number;
    protein: string | number;
    carbs: string | number;
    fat: string | number;
    mealPlanDate?: Date;
}

export interface RootState {
    mealPlanner: MealPlannerState;
}
