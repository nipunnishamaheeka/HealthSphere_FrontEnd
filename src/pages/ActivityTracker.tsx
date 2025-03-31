import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { Activity, Clock, Flame, Plus, Trash2 } from 'lucide-react';
import LogActivityPopup from "../components/LogActivityPopup";
import { useAppDispatch, useAppSelector } from '../types/hooks';
import {
    fetchActivities,
    saveActivity,
    updateActivity,
    deleteActivity,
    selectTotalCalories,
    selectTotalActiveTime
} from '../store/slices/ActivitySlice';
import { ActivityTrackerModel } from '../model/ActivityTracker';
import { toast } from 'react-hot-toast'; // Assuming you're using react-hot-toast for notifications

const ActivityTracker: React.FC = () => {
    const dispatch = useAppDispatch();
    const activities = useAppSelector(state => state.activity.activities);
    const isLoading = useAppSelector(state => state.activity.isLoading);
    const error = useAppSelector(state => state.activity.error);
    const totalCalories = useAppSelector(selectTotalCalories);
    const totalActiveTime = useAppSelector(selectTotalActiveTime);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [selectedActivity, setSelectedActivity] = useState<ActivityTrackerModel | null>(null);

    // Fetch activities on component mount
    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await dispatch(fetchActivities()).unwrap();
                console.log('Activities fetched successfully:', result);
            } catch (error) {
                console.error('Error fetching activities:', error);
                toast.error(typeof error === 'string' ? error : 'Failed to load activities');
            }
        };

        fetchData();
    }, [dispatch]);

    const handleAddActivity = async (activityData: Omit<ActivityTrackerModel, 'id' | 'user_id'>) => {
        try {
            console.log('Adding new activity:', activityData);
            const newActivity = {
                ...activityData,
                user_id: 'U12345',
            };

            const result = await dispatch(saveActivity(newActivity)).unwrap();
            console.log('Activity added successfully:', result);
            toast.success('Activity added successfully');

            // Re-fetch activities after adding a new one
            await dispatch(fetchActivities()).unwrap();
            console.log('Activities re-fetched after adding new activity');

            setIsPopupOpen(false);
        } catch (error) {
            console.error('Error adding activity:', error);
            toast.error('Failed to add activity');
        }
    };


    const handleUpdateActivity = async (activityData: ActivityTrackerModel) => {
        try {
            console.log('Updating activity:', activityData);
            const result = await dispatch(updateActivity(activityData)).unwrap();
            console.log('Activity updated successfully:', result);
            toast.success('Activity updated successfully');
            setSelectedActivity(null);
            setIsPopupOpen(false);
        } catch (error) {
            console.error('Error updating activity:', error);
            toast.error('Failed to update activity');
        }
    };

    const handleDeleteActivity = async (id: string) => {
        try {
            console.log('Deleting activity:', id);
            await dispatch(deleteActivity(id)).unwrap();
            console.log('Activity deleted successfully');
            toast.success('Activity deleted successfully');
        } catch (error) {
            console.error('Error deleting activity:', error);
            toast.error('Failed to delete activity');
        }
    };

    if (error) {
        return <div className="p-6 text-red-500">Error: {error}</div>;
    }

    return (
        <div className="space-y-6 p-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Activity Tracker</h2>
                <Button
                    onClick={() => setIsPopupOpen(true)}
                    className="flex items-center space-x-2"
                    disabled={isLoading}
                >
                    <Plus className="h-5 w-5"/>
                    <span>Log Activity</span>
                </Button>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center space-x-4">
                            <Flame className="h-8 w-8 text-orange-500"/>
                            <div>
                                <p className="text-sm text-gray-500">Calories Burned</p>
                                <p className="text-2xl font-bold">{totalCalories || 0}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center space-x-4">
                            <Clock className="h-8 w-8 text-blue-500"/>
                            <div>
                                <p className="text-sm text-gray-500">Active Time</p>
                                <p className="text-2xl font-bold">{totalActiveTime || '0h 0m'}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center space-x-4">
                            <Activity className="h-8 w-8 text-green-500"/>
                            <div>
                                <p className="text-sm text-gray-500">Activities</p>
                                <p className="text-2xl font-bold">{activities.length}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Activities List */}
            <Card>
                <CardHeader>
                    <CardTitle>Today's Activities</CardTitle>
                </CardHeader>
                <CardContent>
                    {isLoading ? (
                        <div className="flex justify-center p-4">Loading activities...</div>
                    ) : (
                        <div className="space-y-4">
                            {activities.map((activity) => (
                                <div
                                    key={activity.id || activity.date}  // Fallback to date if id is missing
                                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                                >
                                    <div className="flex items-center space-x-4">
                                        <Activity className="h-6 w-6 text-blue-500"/>
                                        <div>
                                            <h3 className="font-medium">{activity.exerciseType}</h3>
                                            <p className="text-sm text-gray-500">
                                                {new Date(activity.date).toLocaleString()}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-6">
                                        <div>
                                            <p className="text-sm text-gray-500">Duration</p>
                                            <p className="font-medium">{activity.duration} min</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500">Calories</p>
                                            <p className="font-medium">{activity.caloriesBurned}</p>
                                        </div>
                                        <div className="flex space-x-2">
                                            {/*<Button*/}
                                            {/*    onClick={() => {*/}
                                            {/*        setSelectedActivity(activity);*/}
                                            {/*        setIsPopupOpen(true);*/}
                                            {/*    }}*/}
                                            {/*    className="text-blue-500 hover:text-blue-700"*/}
                                            {/*>*/}
                                            {/*    Edit*/}
                                            {/*</Button>*/}
                                            <Button
                                                onClick={() => handleDeleteActivity(activity.id)}
                                                variant="ghost"
                                                className="text-red-500 hover:text-red-700"
                                            >
                                                <Trash2 className="h-5 w-5" />
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            ))}

                        </div>
                    )}
                </CardContent>
            </Card>

            <LogActivityPopup
                isOpen={isPopupOpen}
                activity={selectedActivity}
                onClose={() => {
                    setIsPopupOpen(false);
                    setSelectedActivity(null);
                }}
                onSubmit={selectedActivity ? handleUpdateActivity : handleAddActivity}
            />
        </div>
    );
};

export default ActivityTracker;