import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/common/Card';
import { Coffee, ChevronRight, Plus, Edit } from 'lucide-react';
import MealPlanPopup from "../components/MealPlanPopup";
import { useAppDispatch, useAppSelector } from '../types/hooks';
import { addMeal, updateMeal } from '../store/slices/MealPlannerSlice';
import { useState } from 'react';
import { Meal } from '../types/type';

const MealPlanner: React.FC = () => {
    const dispatch = useAppDispatch();
    const meals = useAppSelector(state => state.mealPlanner.meals);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [editingMeal, setEditingMeal] = useState<Meal | null>(null);

    const handleAddMeal = (newMeal: Meal) => {
        dispatch(addMeal(newMeal));
        setIsPopupOpen(false);
    };

    const handleEditMeal = (updatedMeal: Meal) => {
        if (editingMeal) {
            dispatch(updateMeal({ type: editingMeal.type, updatedMeal }));
        }
        setEditingMeal(null);
        setIsPopupOpen(false);
    };

    const openEditPopup = (meal: Meal) => {
        setEditingMeal(meal);
        setIsPopupOpen(true);
    };
    return (
        <div className="space-y-6 p-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Today's Meal Plan</h2>
                <button
                    className="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                    onClick={() => {
                        setEditingMeal(null);
                        setIsPopupOpen(true);
                    }}
                >
                    <Plus className="h-5 w-5" />
                    <span>Add Meal</span>
                </button>
            </div>

            <div className="space-y-4">
                {meals.map((meal, index) => (
                    <Card key={index}>
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-4">
                                    <Coffee className="h-8 w-8 text-blue-500" />
                                    <div>
                                        <h3 className="text-lg font-medium">{meal.type}</h3>
                                        <p className="text-sm text-gray-500">{meal.time}</p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <button
                                        className="text-blue-500 hover:text-blue-700"
                                        onClick={() => openEditPopup(meal)}
                                    >
                                        <Edit className="h-5 w-5" />
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
                                    <p className="font-medium">{meal.protein}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Carbs</p>
                                    <p className="font-medium">{meal.carbs}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Fat</p>
                                    <p className="font-medium">{meal.fat}</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Nutritional Summary</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div>
                            <p className="text-sm text-gray-500">Total Calories</p>
                            <p className="text-2xl font-bold">{meals.reduce((sum, meal) => sum + meal.calories, 0)}</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Total Protein</p>
                            <p className="text-2xl font-bold">{meals.reduce((sum, meal) => sum + parseInt(meal.protein), 0)}g</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Total Carbs</p>
                            <p className="text-2xl font-bold">{meals.reduce((sum, meal) => sum + parseInt(meal.carbs), 0)}g</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Total Fat</p>
                            <p className="text-2xl font-bold">{meals.reduce((sum, meal) => sum + parseInt(meal.fat), 0)}g</p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <MealPlanPopup
                isOpen={isPopupOpen}
                onClose={() => setIsPopupOpen(false)}
                onSubmit={editingMeal ? handleEditMeal : handleAddMeal}
                initialData={editingMeal}
            />
        </div>
    );
};

export default MealPlanner;
