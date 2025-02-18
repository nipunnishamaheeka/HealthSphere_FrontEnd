export enum MealType {
    Breakfast = 'Breakfast',
    Lunch = 'Lunch',
    Dinner = 'Dinner'
}

export interface Meal {
    id?: string;
    type: string;
    time: string;
    items: string[];
    calories: number;
    protein: string;
    carbs: string;
    fat: string;
    date?: Date;
}

export interface User {
    id: string;
    username: string;
    email: string;
    firstName?: string;
    lastName?: string;
    role?: string;
}

export interface MealPlannerModel {
    meal_id: string;
    user_id: string;
    trainer_id: string | null;
    meal_plan_date: Date;
    meal_type: MealType;
    ingredients: string;
    nutritional_breakdown: string;
}