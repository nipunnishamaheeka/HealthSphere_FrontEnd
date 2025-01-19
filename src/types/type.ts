// MealPlaner
export interface Meal {
    type: string;
    time: string;
    items: string[];
    calories: number;
    protein: string;
    carbs: string;
    fat: string;
}

export interface User {
    id: string;
    name: string;
    email: string;
    dailyCalorieGoal: number;
    meals: Meal[];
}

// ActivityTracker

export interface ActivityItem {
    id: string;
    type: string;
    duration: string;
    distance?: string;
    calories: number;
    time: string;
    date: string;
}

export interface User {
    id: string;
    name: string;
    email: string;
    dailyCalorieTarget: number;
    weeklyActivityGoal: number;
    activities: ActivityItem[];
}