import React, {useState} from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/common/Card';
import { Coffee, ChevronRight, Plus } from 'lucide-react';
import MealPlanPopup from "@/components/new Added/MealPlanPopup";

interface Meal {
    type: string;
    time: string;
    items: string[];
    calories: number;
    protein: string;
    carbs: string;
    fat: string;
}

const MealPlanner: React.FC = () => {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [meals, setMeals] = useState<Meal[]>([
        {
            type: 'Breakfast',
            time: '8:00 AM',
            items: ['Oatmeal with berries', 'Greek yogurt', 'Green tea'],
            calories: 420,
            protein: '15g',
            carbs: '65g',
            fat: '12g',
        },
        {
            type: 'Lunch',
            time: '1:00 PM',
            items: ['Grilled chicken salad', 'Quinoa', 'Olive oil dressing'],
            calories: 550,
            protein: '35g',
            carbs: '45g',
            fat: '25g',
        },
        {
            type: 'Dinner',
            time: '7:00 PM',
            items: ['Salmon', 'Roasted vegetables', 'Brown rice'],
            calories: 650,
            protein: '40g',
            carbs: '55g',
            fat: '30g',
        },
    ]);

    const handleAddMeal = (newMeal: Meal) => {
        setMeals([...meals, newMeal]);
    };
    return (
        <div className="space-y-6 p-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Today's Meal Plan</h2>
                <button className="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                        onClick={() => setIsPopupOpen(true)}>
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
                                <ChevronRight className="h-6 w-6 text-gray-400" />
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
                            <p className="text-2xl font-bold">1,620</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Total Protein</p>
                            <p className="text-2xl font-bold">90g</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Total Carbs</p>
                            <p className="text-2xl font-bold">165g</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Total Fat</p>
                            <p className="text-2xl font-bold">67g</p>
                        </div>
                    </div>
                </CardContent>
            </Card>
            <MealPlanPopup
                isOpen={isPopupOpen}
                onClose={() => setIsPopupOpen(false)}
                onSubmit={handleAddMeal}
            />
        </div>
    );
};

export default MealPlanner;
