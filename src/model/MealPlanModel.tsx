export enum MealType {
    Breakfast = 'Breakfast',
    Lunch = 'Lunch',
    Dinner = 'Dinner'
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
