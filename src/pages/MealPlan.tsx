import React, {useEffect, useState} from 'react';
import {Card, CardContent, CardHeader, CardTitle} from '../components/common/Card';
import {ChevronRight, Coffee, Edit, Plus, Trash2} from 'lucide-react';
import MealPlanPopup from "../components/MealPlanPopup";
import {useAppDispatch, useAppSelector} from '../types/hooks';
import {createMeal, deleteMealAsync, fetchMeals, updateMealAsync,} from '../store/slices/MealPlannerSlice';
import {MealPlannerModel} from "../model/MealPlanModel";
import {MealModel, MealPlannerState} from "../types/mealType";



const MealPlanner: React.FC = () => {
    const dispatch = useAppDispatch();
    const mealsState = useAppSelector((state): MealPlannerState => state.mealPlanner);
    const meals = Array.isArray(mealsState.meals) ? mealsState.meals : [];

    const isLoading = useAppSelector(state => state.mealPlanner.isLoading);
    const error = useAppSelector(state => state.mealPlanner.error);

    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [editingMeal, setEditingMeal] = useState<MealModel | null>(null);
    const [selectedDate, setSelectedDate] = useState(new Date());

    useEffect(() => {
        const fetchData = async () => {
            try {
                console.log("Fetching meals...");
                const result = await dispatch(fetchMeals()).unwrap();
                console.log('Meals fetched successfully:', result);
            } catch (error) {
                console.error('Error fetching meals:', error);
            }
        };
        fetchData();
    }, [dispatch]);

    // Helper function to parse nutritional data
    const parseNutritionalData = (meal): { calories: number; protein: number; carbs: number; fat: number } => {
        try {
            console.log("Parsing nutritional data:", meal);
            if (meal.nutritionalBreakdown) {
                const nutritionData = JSON.parse(meal.nutritionalBreakdown);
                console.log("Parsed nutritional data:", nutritionData);

                const extractNumber = (value: string | number): number => {
                    if (typeof value === 'string') {
                        const match = value.match(/\d+/);
                        return match ? Number(match[0]) : 0;
                    }
                    return Number(value);
                };

                return {
                    calories: extractNumber(nutritionData.calories) || 0,
                    carbs: extractNumber(nutritionData.carbs),
                    protein: extractNumber(nutritionData.protein),
                    fat: extractNumber(nutritionData.fat),
                };
            }
            return { calories: 0, protein: 0, carbs: 0, fat: 0 };
        } catch (e) {
            console.error("Error parsing nutritional data:", e, meal.nutritionalBreakdown);
            return { calories: 0, protein: 0, carbs: 0, fat: 0 };
        }
    };

    // Helper function to parse ingredients
    const parseIngredients = (meal): string[] => {
        try {
            if (typeof meal.ingredients === 'string') {
                return JSON.parse(meal.ingredients) || [];
            } else if (Array.isArray(meal.ingredients)) {
                return meal.ingredients;
            }
            return [];
        } catch (e) {
            console.error("Error parsing ingredients:", e, meal.ingredients);
            return [];
        }
    };

    const convertToMealPlannerModel = (meal: MealModel): MealPlannerModel => {
        return new MealPlannerModel(
            meal.id,
            "U12345", // Hardcoded user_id
            "T12345", // Hardcoded trainer_id
            meal.mealType,
            JSON.stringify(meal.ingredients),
            JSON.stringify({
                calories: meal.calories || 0,
                protein: Number(meal.protein) || 0,
                carbs: Number(meal.carbs) || 0,
                fat: Number(meal.fat) || 0,
            })
        );
    };

    // const handleAddMeal = async (mealData: Omit<MealPlannerModel, "meal_id" | "user_id">) => {
    //     try {
    //         const newMeal = {
    //             ...mealData,
    //             meal_id: "",
    //             user_id: "U12345"
    //         };
    //         console.log("Adding new meal:", newMeal);
    //         await dispatch(createMeal(newMeal as MealPlannerModel)).unwrap();
    //         setIsPopupOpen(false);
    //     } catch (error) {
    //         console.error("Error adding meal:", error);
    //     }
    // };
    const handleAddMeal = async (mealData: MealModel) => {
        try {
            const newMeal = convertToMealPlannerModel(mealData);
            console.log("Adding new meal:", newMeal);
            await dispatch(createMeal(newMeal)).unwrap();
            setIsPopupOpen(false);
            dispatch(fetchMeals()).unwrap();
        } catch (error) {
            console.error("Error adding meal:", error);
        }
    };

    const handleUpdateMeal = async (mealData: MealModel) => {
        try {
            const updatedMeal = convertToMealPlannerModel(mealData);
            console.log("Updating meal:", updatedMeal);
            const result = await dispatch(updateMealAsync(updatedMeal)).unwrap();
            console.log("Meal updated successfully:", result);
            setIsPopupOpen(false);
            setEditingMeal(null);
        } catch (error) {
            console.error("Error updating meal:", error);
        }
    };

    const handleDeleteMeal = (id: string, mealType: string) => {
        if (window.confirm(`Are you sure you want to delete the "${mealType}" meal?`)) {
            console.log(`Deleting meal with ID: ${id}`);
            dispatch(deleteMealAsync(id));
            dispatch(fetchMeals()).unwrap();
        }
    };

    const openEditPopup = (meal: MealPlannerModel) => {
        setEditingMeal(meal);
        setIsPopupOpen(true);
    };

    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newDate = new Date(e.target.value);
        setSelectedDate(newDate);
    };

    // Debug logging
    console.log("Meals state structure:", mealsState);
    console.log("Processed meals array:", meals);

    if (error) {
        return <div className="p-6 text-red-500">Error: {error}</div>;
    }

    return (
        <div className="space-y-6 p-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Meal Plan</h2>
                <div className="flex items-center space-x-4">
                    <input
                        type="date"
                        className="border rounded p-2"
                        value={selectedDate.toISOString().split('T')[0]}
                        onChange={handleDateChange}
                    />
                    <button
                        className="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                        onClick={() => {
                            setEditingMeal(null);
                            setIsPopupOpen(true);
                        }}
                        disabled={isLoading}
                    >
                        <Plus className="h-5 w-5" />
                        <span>Add Meal</span>
                    </button>
                </div>
            </div>

            {isLoading ? (
                <div className="flex justify-center p-12">
                    <div className="animate-spin h-8 w-8 border-4 border-blue-500 rounded-full border-t-transparent"></div>
                </div>
            ) : (
                <>
                    {!meals || meals.length === 0 ? (
                        <Card>
                            <CardContent className="p-6 text-center text-gray-500">
                                <p className="py-8">No meals planned for this day. Click "Add Meal" to create one.</p>
                            </CardContent>
                        </Card>
                    ) : (
                        <div className="space-y-4">
                            {meals.map((meal) => {
                                if (!meal) return null;

                                const { calories, protein, carbs, fat } = parseNutritionalData(meal);
                                const ingredients = parseIngredients(meal);

                                return (
                                    <Card key={meal.meal_id}>
                                        <CardContent className="p-6">
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center space-x-4">
                                                    <Coffee className="h-8 w-8 text-blue-500" />
                                                    <div>
                                                        <h3 className="text-lg font-medium">{meal.mealType}</h3>
                                                    </div>
                                                </div>
                                                <div className="flex items-center space-x-4">
                                                    <button
                                                        className="text-blue-500 hover:text-blue-700"
                                                        onClick={() => openEditPopup(meal)}
                                                    >
                                                        <Edit className="h-5 w-5" />
                                                    </button>
                                                    <button
                                                        className="text-red-500 hover:text-red-700"
                                                        onClick={() => handleDeleteMeal(meal.id, meal.mealType)}
                                                    >
                                                        <Trash2 className="h-5 w-5" />
                                                    </button>
                                                    <ChevronRight className="h-6 w-6 text-gray-400" />
                                                </div>
                                            </div>

                                            <div className="mt-4">
                                                <div className="space-y-2">
                                                    {ingredients && ingredients.length > 0 ? (
                                                        ingredients.map((item: string, index: number) => (
                                                            <p key={index} className="text-gray-600">{item}</p>
                                                        ))
                                                    ) : (
                                                        <p className="text-gray-400 italic">No ingredients listed</p>
                                                    )}
                                                </div>
                                            </div>

                                            <div className="mt-4 grid grid-cols-4 gap-4">
                                                <div>
                                                    <p className="text-sm text-gray-500">Calories</p>
                                                    <p className="font-medium">{calories}</p>
                                                </div>
                                                <div>
                                                    <p className="text-sm text-gray-500">Protein</p>
                                                    <p className="font-medium">{protein}g</p>
                                                </div>
                                                <div>
                                                    <p className="text-sm text-gray-500">Carbs</p>
                                                    <p className="font-medium">{carbs}g</p>
                                                </div>
                                                <div>
                                                    <p className="text-sm text-gray-500">Fat</p>
                                                    <p className="font-medium">{fat}g</p>
                                                </div>
                                            </div>

                                        </CardContent>
                                    </Card>
                                );
                            })}
                        </div>
                    )}

                    {meals && meals.length > 0 && (
                        <Card>
                            <CardHeader>
                                <CardTitle>Nutritional Summary</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    <div>
                                        <p className="text-sm text-gray-500">Total Calories</p>
                                        <p className="text-2xl font-bold">
                                            {meals.reduce((sum, meal) => {
                                                if (!meal) return sum;
                                                const { calories } = parseNutritionalData(meal);
                                                return sum + Number(calories);
                                            }, 0)}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Total Protein</p>
                                        <p className="text-2xl font-bold">
                                            {meals.reduce((sum, meal) => {
                                                if (!meal) return sum;
                                                const { protein } = parseNutritionalData(meal);
                                                return sum + Number(protein);
                                            }, 0)}g
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Total Carbs</p>
                                        <p className="text-2xl font-bold">
                                            {meals.reduce((sum, meal) => {
                                                if (!meal) return sum;
                                                const { carbs } = parseNutritionalData(meal);
                                                return sum + Number(carbs);
                                            }, 0)}g
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Total Fat</p>
                                        <p className="text-2xl font-bold">
                                            {meals.reduce((sum, meal) => {
                                                if (!meal) return sum;
                                                const { fat } = parseNutritionalData(meal);
                                                return sum + Number(fat);
                                            }, 0)}g
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    )}
                </>
            )}

            <MealPlanPopup
                isOpen={isPopupOpen}
                onClose={() => {
                    setIsPopupOpen(false);
                    setEditingMeal(null);
                }}
                onSubmit={editingMeal ? handleUpdateMeal : handleAddMeal}
                meal={editingMeal}
            />
        </div>
    );
};

export default MealPlanner;