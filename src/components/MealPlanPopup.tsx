import React, { useState } from 'react';
import { X, Plus, Minus } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './common/Card';
import { Button } from './common/Button';
import { Input } from './common/Inputs';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from './common/Select';

interface MealPlanPopupProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (meal: MealData) => void;
}

interface MealData {
    type: string;
    time: string;
    items: string[];
    calories: number;
    protein: string;
    carbs: string;
    fat: string;
}

const mealTypes = [
    'Breakfast',
    'Morning Snack',
    'Lunch',
    'Afternoon Snack',
    'Dinner',
    'Evening Snack'
] as const;

type MealType = typeof mealTypes[number];

const MealPlanPopup: React.FC<MealPlanPopupProps> = ({
                                                         isOpen,
                                                         onClose,
                                                         onSubmit
                                                     }) => {
    const [formData, setFormData] = useState<MealData>({
        type: '',
        time: '',
        items: [''],
        calories: 0,
        protein: '',
        carbs: '',
        fat: '',
    });

    const handleAddItem = () => {
        setFormData(prev => ({
            ...prev,
            items: [...prev.items, '']
        }));
    };

    const handleRemoveItem = (index: number) => {
        setFormData(prev => ({
            ...prev,
            items: prev.items.filter((_, idx) => idx !== index)
        }));
    };

    const handleItemChange = (index: number, value: string) => {
        setFormData(prev => ({
            ...prev,
            items: prev.items.map((item, idx) => idx === index ? value : item)
        }));
    };

    const validateNutrition = (value: string): string => {
        return value.replace(/[^0-9]/g, '') + 'g';
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
        setFormData({
            type: '',
            time: '',
            items: [''],
            calories: 0,
            protein: '',
            carbs: '',
            fat: '',
        });
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <Card className="w-full max-w-xl">
                <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle className="text-xl font-semibold">Add New Meal</CardTitle>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={onClose}
                        className="h-8 w-8 p-0"
                    >
                        <X className="h-4 w-4" />
                    </Button>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Meal Type</label>
                                <Select
                                    value={formData.type}
                                    onValueChange={(value: string) =>
                                        setFormData(prev => ({ ...prev, type: value }))
                                    }
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select meal type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {mealTypes.map((type) => (
                                            <SelectItem key={type} value={type}>
                                                {type}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium">Time</label>
                                <Input
                                    type="time"
                                    value={formData.time}
                                    onChange={(e) =>
                                        setFormData(prev => ({ ...prev, time: e.target.value }))
                                    }
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium">Meal Items</label>
                            {formData.items.map((item, index) => (
                                <div key={index} className="flex gap-2">
                                    <Input
                                        value={item}
                                        onChange={(e) => handleItemChange(index, e.target.value)}
                                        placeholder={`Item ${index + 1}`}
                                        className="flex-1"
                                    />
                                    {index === formData.items.length - 1 ? (
                                        <Button
                                            type="button"
                                            variant="outline"
                                            size="icon"
                                            onClick={handleAddItem}
                                        >
                                            <Plus className="h-4 w-4" />
                                        </Button>
                                    ) : (
                                        <Button
                                            type="button"
                                            variant="outline"
                                            size="icon"
                                            onClick={() => handleRemoveItem(index)}
                                        >
                                            <Minus className="h-4 w-4" />
                                        </Button>
                                    )}
                                </div>
                            ))}
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Calories</label>
                                <Input
                                    type="number"
                                    value={formData.calories}
                                    onChange={(e) =>
                                        setFormData(prev => ({
                                            ...prev,
                                            calories: parseInt(e.target.value) || 0
                                        }))
                                    }
                                    min="0"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium">Protein</label>
                                <Input
                                    value={formData.protein}
                                    onChange={(e) =>
                                        setFormData(prev => ({
                                            ...prev,
                                            protein: validateNutrition(e.target.value)
                                        }))
                                    }
                                    placeholder="0g"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium">Carbs</label>
                                <Input
                                    value={formData.carbs}
                                    onChange={(e) =>
                                        setFormData(prev => ({
                                            ...prev,
                                            carbs: validateNutrition(e.target.value)
                                        }))
                                    }
                                    placeholder="0g"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium">Fat</label>
                                <Input
                                    value={formData.fat}
                                    onChange={(e) =>
                                        setFormData(prev => ({
                                            ...prev,
                                            fat: validateNutrition(e.target.value)
                                        }))
                                    }
                                    placeholder="0g"
                                />
                            </div>
                        </div>

                        <div className="flex justify-end space-x-2 pt-4">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={onClose}
                            >
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                disabled={!formData.type || !formData.time || formData.items.some(item => !item)}
                            >
                                Add Meal
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default MealPlanPopup;