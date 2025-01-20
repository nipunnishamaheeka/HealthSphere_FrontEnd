import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/common/Card';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from 'recharts';
import { Activity, Droplet, Moon, Heart } from 'lucide-react';

// Define types for health data and metrics
interface HealthData {
    date: string;
    weight: number;
    sleep: number;
    water: number;
    steps: number;
}

interface MetricConfig {
    color: string;
    unit: string;
}

export const Dashboard: React.FC = () => {
    // Sample data - in real app, this would come from an API
    const healthData: HealthData[] = [
        { date: 'Mon', weight: 70, sleep: 7, water: 2000, steps: 8000 },
        { date: 'Tue', weight: 69.8, sleep: 6.5, water: 2500, steps: 10000 },
        { date: 'Wed', weight: 69.5, sleep: 8, water: 2200, steps: 7500 },
        { date: 'Thu', weight: 69.7, sleep: 7.5, water: 1800, steps: 9000 },
        { date: 'Fri', weight: 69.3, sleep: 7, water: 2300, steps: 11000 }
    ];

    const [selectedMetric, setSelectedMetric] = useState<keyof HealthData>('weight');

    const metrics: Record<keyof HealthData, MetricConfig> = {
        date: { color: '', unit: '' }, // Placeholder, not used
        weight: { color: '#2563eb', unit: 'kg' },
        sleep: { color: '#7c3aed', unit: 'hours' },
        water: { color: '#0ea5e9', unit: 'ml' },
        steps: { color: '#059669', unit: 'steps' }
    };

    return (
        <div className="p-6 max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold mb-6">HealthSphere Dashboard</h1>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <Card>
                    <CardContent className="pt-6">
                        <div className="flex items-center space-x-2">
                            <Activity className="h-8 w-8 text-blue-500" />
                            <div>
                                <p className="text-sm text-gray-500">Daily Steps</p>
                                <p className="text-2xl font-bold">11,000</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="pt-6">
                        <div className="flex items-center space-x-2">
                            <Droplet className="h-8 w-8 text-blue-400" />
                            <div>
                                <p className="text-sm text-gray-500">Water Intake</p>
                                <p className="text-2xl font-bold">2.3L</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="pt-6">
                        <div className="flex items-center space-x-2">
                            <Moon className="h-8 w-8 text-purple-500" />
                            <div>
                                <p className="text-sm text-gray-500">Sleep</p>
                                <p className="text-2xl font-bold">7h 30m</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="pt-6">
                        <div className="flex items-center space-x-2">
                            <Heart className="h-8 w-8 text-red-500" />
                            <div>
                                <p className="text-sm text-gray-500">Heart Rate</p>
                                <p className="text-2xl font-bold">72 bpm</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Main Chart */}
            <Card className="mb-6">
                <CardHeader>
                    <CardTitle>Health Trends</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={healthData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="date" />
                                <YAxis />
                                <Tooltip formatter={(value: any) => `${value} ${metrics[selectedMetric]?.unit}`} />
                                <Line
                                    type="monotone"
                                    dataKey={selectedMetric}
                                    stroke={metrics[selectedMetric]?.color}
                                    strokeWidth={2}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </CardContent>
            </Card>

            {/* Goals Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Active Goals</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div>
                                <div className="flex justify-between mb-1">
                                    <span>Weight Goal (70kg → 65kg)</span>
                                    <span>60%</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: '60%' }}></div>
                                </div>
                            </div>
                            <div>
                                <div className="flex justify-between mb-1">
                                    <span>Daily Steps (10,000)</span>
                                    <span>85%</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                    <div className="bg-green-600 h-2 rounded-full" style={{ width: '85%' }}></div>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Upcoming Activities</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center">
                                <div>
                                    <p className="font-medium">Morning Yoga</p>
                                    <p className="text-sm text-gray-500">7:00 AM - 8:00 AM</p>
                                </div>
                                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Today</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <div>
                                    <p className="font-medium">Running Session</p>
                                    <p className="text-sm text-gray-500">6:00 PM - 7:00 PM</p>
                                </div>
                                <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">Tomorrow</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};


