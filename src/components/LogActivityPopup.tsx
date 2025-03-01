import React, { useState } from 'react';
import { Activity, X } from 'lucide-react';
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

interface LogActivityPopupProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (activity: ActivityFormData) => void;
}

interface ActivityFormData {
    type: string;
    duration: number;
    distance?: string;
    calories: number;
    time: string;
}

const activityTypes = [
    'Morning Run',
    'Evening Run',
    'Yoga Session',
    'Weight Training',
    'Swimming',
    'Cycling',
    'HIIT Workout',
    'Walking'
] as const;

type ActivityType = typeof activityTypes[number];

const LogActivityPopup: React.FC<LogActivityPopupProps> = ({
                                                               isOpen,
                                                               onClose,
                                                               onSubmit
                                                           }) => {
    const [formData, setFormData] = useState<ActivityFormData>({
        type: '',
        duration: 0,
        distance: '',
        calories: 0,
        time: new Date().toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit'
        })
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
        setFormData({
            type: '',
            duration: 0,
            distance: '',
            calories: 0,
            time: new Date().toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit'
            })
        });
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <Card className="w-full max-w-md">
                <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                        <Activity className="h-5 w-5" />
                        Log New Activity
                    </CardTitle>
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
                        <div className="space-y-2">
                            <label className="text-sm font-medium ">Activity Type</label>
                            <Select
                                value={formData.type}
                                onValueChange={(value: string) =>
                                    setFormData(prev => ({ ...prev, type: value }))
                                }
                            >
                                <SelectTrigger className="w-full z-20">
                                    <SelectValue placeholder="Select activity type" />
                                </SelectTrigger>
                                <SelectContent className="z-50 bg-white shadow-lg border border-gray-300">

                                {activityTypes.map((type) => (
                                        <SelectItem key={type} value={type}>
                                            {type}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium">Duration (minutes)</label>
                            <Input
                                type="number"
                                value={formData.duration}
                                onChange={(e) =>
                                    setFormData(prev => ({ ...prev,
                                        duration:  parseInt(e.target.value) || 0}))
                                }
                                placeholder="Enter duration"
                                min="1"
                                className="w-full"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium">Distance (km)</label>
                            <Input
                                type="number"
                                value={formData.distance}
                                onChange={(e) =>
                                    setFormData(prev => ({ ...prev, distance: e.target.value }))
                                }
                                placeholder="Enter distance (optional)"
                                step="0.1"
                                min="0"
                                className="w-full"
                            />
                        </div>

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
                                placeholder="Enter calories burned"
                                min="0"
                                className="w-full"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium">Time</label>
                            <Input
                                type="time"
                                value={formData.time}
                                onChange={(e) =>
                                    setFormData(prev => ({ ...prev, time: e.target.value }))
                                }
                                className="w-full"
                            />
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
                                disabled={!formData.type || !formData.duration || !formData.calories}
                            >
                                Save Activity
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default LogActivityPopup;