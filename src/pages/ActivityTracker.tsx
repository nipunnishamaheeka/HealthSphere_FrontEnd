import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { Activity, Clock, Flame, LineChart, Plus } from 'lucide-react';
import LogActivityPopup from "@/components/LogActivityPopup";


interface ActivityItem {
    type: string;
    duration: string;
    distance?: string;
    calories: number;
    time: string;
}

const ActivityTracker: React.FC = () => {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [activities, setActivities] = useState<ActivityItem[]>([
        {
            type: 'Morning Run',
            duration: '30 min',
            distance: '3.2 km',
            calories: 320,
            time: '7:00 AM',
        },
        {
            type: 'Yoga Session',
            duration: '45 min',
            calories: 180,
            time: '12:30 PM',
        },
        {
            type: 'Weight Training',
            duration: '60 min',
            calories: 440,
            time: '5:30 PM',
        },
    ]);

    const handleAddActivity = (newActivity: ActivityItem) => {
        setActivities([...activities, newActivity]);
    };

    // Calculate totals
    const totalCalories = activities.reduce((sum, activity) => sum + activity.calories, 0);
    const totalActivities = activities.length;

    // Calculate total active time
    const getTotalActiveTime = () => {
        const totalMinutes = activities.reduce((sum, activity) => {
            const duration = parseInt(activity.duration);
            return sum + (isNaN(duration) ? 0 : duration);
        }, 0);

        const hours = Math.floor(totalMinutes / 60);
        const minutes = totalMinutes % 60;
        return `${hours}h ${minutes}m`;
    };

    return (
        <div className="space-y-6 p-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Activity Tracker</h2>
                <Button
                    onClick={() => setIsPopupOpen(true)}
                    className="flex items-center space-x-2"
                >
                    <Plus className="h-5 w-5" />
                    <span>Log Activity</span>
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center space-x-4">
                            <Flame className="h-8 w-8 text-orange-500" />
                            <div>
                                <p className="text-sm text-gray-500">Calories Burned</p>
                                <p className="text-2xl font-bold">{totalCalories}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center space-x-4">
                            <Clock className="h-8 w-8 text-blue-500" />
                            <div>
                                <p className="text-sm text-gray-500">Active Time</p>
                                <p className="text-2xl font-bold">{getTotalActiveTime()}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center space-x-4">
                            <Activity className="h-8 w-8 text-green-500" />
                            <div>
                                <p className="text-sm text-gray-500">Activities</p>
                                <p className="text-2xl font-bold">{totalActivities}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Today's Activities</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {activities.map((activity, index) => (
                            <div
                                key={index}
                                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                            >
                                <div className="flex items-center space-x-4">
                                    <Activity className="h-6 w-6 text-blue-500" />
                                    <div>
                                        <h3 className="font-medium">{activity.type}</h3>
                                        <p className="text-sm text-gray-500">{activity.time}</p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-6">
                                    <div>
                                        <p className="text-sm text-gray-500">Duration</p>
                                        <p className="font-medium">{activity.duration}</p>
                                    </div>
                                    {activity.distance && (
                                        <div>
                                            <p className="text-sm text-gray-500">Distance</p>
                                            <p className="font-medium">{activity.distance}</p>
                                        </div>
                                    )}
                                    <div>
                                        <p className="text-sm text-gray-500">Calories</p>
                                        <p className="font-medium">{activity.calories}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Weekly Progress</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="h-64 w-full bg-gray-50 rounded-lg flex items-center justify-center">
                        <LineChart className="h-8 w-8 text-gray-400" />
                    </div>
                </CardContent>
            </Card>

            <LogActivityPopup
                isOpen={isPopupOpen}
                onClose={() => setIsPopupOpen(false)}
                onSubmit={handleAddActivity}
            />
        </div>
    );
};

export default ActivityTracker;