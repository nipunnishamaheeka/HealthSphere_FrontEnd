import {MealType} from "@/types/mealType";

export class MealPlannerModel {
    meal_id: string;
    user_id: string;
    trainer_id: string | null;
   // mealPlanDate: Date;
    mealType: MealType;
    ingredients: string;
    nutritional_breakdown: string;

    constructor(
        meal_id: string,
        user_id: string,
        trainer_id: string | null,
    //    mealPlanDate: Date,
        mealType: MealType,
        ingredients: string,
        nutritional_breakdown: string
    ) {
        this.meal_id = meal_id;
        this.user_id = user_id;
        this.trainer_id = trainer_id;
      //  this.mealPlanDate = mealPlanDate;
        this.mealType = mealType;
        this.ingredients = ingredients;
        this.nutritional_breakdown = nutritional_breakdown;
    }
}
