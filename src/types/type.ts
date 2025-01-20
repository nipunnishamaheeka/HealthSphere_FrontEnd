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

//GoalTracker

export interface Milestone {
    title: string;
    completed: boolean;
}

export interface Goal {
    id: number;
    title: string;
    category: string;
    target: string;
    progress: number;
    deadline: string;
    status: 'On Track' | 'Ahead' | 'Behind';
    milestones: Milestone[];
    createdAt: string;
}

export interface Achievement {
    id: string;
    title: string;
    description: string;
    icon: string;
    date: string;
}

export interface User {
    id: string;
    name: string;
    email: string;
    streak: number;
    achievementPoints: number;
    goals: Goal[];
    achievements: Achievement[];
}