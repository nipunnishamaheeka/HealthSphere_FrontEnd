import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/common/Card';
import { Coffee, ChevronRight, Plus, Edit, Trash2 } from 'lucide-react';
import MealPlanPopup from "../components/MealPlanPopup";
import { useAppDispatch, useAppSelector } from '../types/hooks';
import {
    addMeal,
    fetchMeals,
    createMeal,
    updateMealAsync,
    deleteMealAsync,
    Meal,
    MealType,
    MealPlannerModel
} from '../store/slices/MealPlannerSlice';

const MealPlanner: React.FC = () => {
    const dispatch = useAppDispatch();
    const meals = useAppSelector(state => state.mealPlanner.meals);
    const user = useAppSelector(state => state.mealPlanner.user);
    const isLoading = useAppSelector(state => state.mealPlanner.isLoading);
    const error = useAppSelector(state => state.mealPlanner.error);

    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [editingMeal, setEditingMeal] = useState<Meal | null>(null);
    const [selectedDate, setSelectedDate] = useState(new Date());

    // Fetch meals when component mounts or date/user changes
    // useEffect(() => {
    //     if (user) {
    //         dispatch(fetchMeals({ userId: user.id, date: selectedDate }));
    //     }
    // }, [dispatch, user, selectedDate]);

    useEffect(() => {
        console.log("Fetching health logs...");
        dispatch(fetchMeals()).then(() => console.log("Health logs fetched successfully"));
    }, [dispatch]);
    // Helper function to convert Meal to MealPlannerModel
    const convertToMealPlannerModel = (meal: Meal, userId: string): MealPlannerModel => {
        return new MealPlannerModel(
            meal.id,
            userId,
            null, // trainer_id
            meal.date || new Date(), // meal_plan_date
            meal.type,
            JSON.stringify(meal.items), // ingredients
            JSON.stringify({ // nutritional_breakdown
                calories: meal.calories,
                protein: meal.protein,
                carbs: meal.carbs,
                fat: meal.fat
            })
        );
    };

    const handleAddMeal = (newMeal: Meal) => {
        if (user) {
            // Set the date of the meal to the selected date
            const mealWithDate = {
                ...newMeal,
                date: selectedDate
            };

            // Create MealPlannerModel instance for logging/debugging
            const mealModel = convertToMealPlannerModel(mealWithDate, user.id);
            console.log('Creating meal with model:', mealModel);

            // Create new meal with API
            dispatch(createMeal({ meal: mealWithDate, userId: user.id }));
            setIsPopupOpen(false);
        } else {
            console.error("Cannot add meal: No user logged in");
        }
    };

    const handleUpdateMeal = (updatedMeal: Meal) => {
        if (user && editingMeal) {
            // Keep the original meal date if it exists
            const mealToUpdate = {
                ...updatedMeal,
                id: editingMeal.id,
                date: editingMeal.date || selectedDate
            };

            // Create MealPlannerModel instance for logging/debugging
            const mealModel = convertToMealPlannerModel(mealToUpdate, user.id);
            console.log('Updating meal with model:', mealModel);

            // Update meal with API
            dispatch(updateMealAsync({ meal: mealToUpdate, userId: user.id }));
            setEditingMeal(null);
            setIsPopupOpen(false);
        } else {
            console.error("Cannot update meal: No user logged in or no meal selected");
        }
    };

    const handleDeleteMeal = (mealId: string) => {
        if (window.confirm("Are you sure you want to delete this meal?")) {
            console.log(`Deleting meal with ID: ${mealId}`);
            dispatch(deleteMealAsync(mealId));
        }
    };

    const openEditPopup = (meal: Meal) => {
        setEditingMeal(meal);
        setIsPopupOpen(true);
    };

    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newDate = new Date(e.target.value);
        setSelectedDate(newDate);
    };

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
                    {meals.length === 0 ? (
                        <Card>
                            <CardContent className="p-6 text-center text-gray-500">
                                <p className="py-8">No meals planned for this day. Click "Add Meal" to create one.</p>
                            </CardContent>
                        </Card>
                    ) : (
                        <div className="space-y-4">
                            {meals.map((meal) => (
                                <Card key={meal.id}>
                                    <CardContent className="p-6">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center space-x-4">
                                                <Coffee className="h-8 w-8 text-blue-500" />
                                                <div>
                                                    <h3 className="text-lg font-medium">{meal.type}</h3>
                                                    <p className="text-sm text-gray-500">{meal.time}</p>
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
                                                    onClick={() => handleDeleteMeal(meal.id)}
                                                >
                                                    <Trash2 className="h-5 w-5" />
                                                </button>
                                                <ChevronRight className="h-6 w-6 text-gray-400" />
                                            </div>
                                        </div>

                                        <div className="mt-4">
                                            <div className="space-y-2">
                                                {meal.items.map((item, idx) => (
                                                    <p key={idx} className="text-gray-600">{item}</p>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="mt-4 grid grid-cols-4 gap-4">
                                            <div>
                                                <p className="text-sm text-gray-500">Calories</p>
                                                <p className="font-medium">{meal.calories}</p>
                                            </div>
                                            <div>
                                                <p className="text-sm text-gray-500">Protein</p>
                                                <p className="font-medium">{meal.protein}g</p>
                                            </div>
                                            <div>
                                                <p className="text-sm text-gray-500">Carbs</p>
                                                <p className="font-medium">{meal.carbs}g</p>
                                            </div>
                                            <div>
                                                <p className="text-sm text-gray-500">Fat</p>
                                                <p className="font-medium">{meal.fat}g</p>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    )}

                    {meals.length > 0 && (
                        <Card>
                            <CardHeader>
                                <CardTitle>Nutritional Summary</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    <div>
                                        <p className="text-sm text-gray-500">Total Calories</p>
                                        <p className="text-2xl font-bold">
                                            {meals.reduce((sum, meal) => sum + Number(meal.calories), 0)}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Total Protein</p>
                                        <p className="text-2xl font-bold">
                                            {meals.reduce((sum, meal) => sum + Number(meal.protein), 0)}g
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Total Carbs</p>
                                        <p className="text-2xl font-bold">
                                            {meals.reduce((sum, meal) => sum + Number(meal.carbs), 0)}g
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Total Fat</p>
                                        <p className="text-2xl font-bold">
                                            {meals.reduce((sum, meal) => sum + Number(meal.fat), 0)}g
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
                initialData={editingMeal}
            />
        </div>
    );
};

export default MealPlanner;