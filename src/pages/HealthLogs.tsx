import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/common/Card';
import { Heart, Droplets, Moon, Weight } from 'lucide-react';

const HealthLogs = () => {
    // State for form inputs
    const [formData, setFormData] = useState({
        weight: '',
        systolic: '',
        diastolic: '',
        sleepHours: '',
        waterIntake: ''
    });

    // State for past logs
    const [pastLogs, setPastLogs] = useState([]);

    const healthMetrics = [
        {
            icon: Weight,
            label: 'Weight',
            value: '75.5 kg',
            trend: '+0.5 kg this week',
            color: 'text-purple-500',
        },
        {
            icon: Heart,
            label: 'Blood Pressure',
            value: '120/80',
            trend: 'Normal range',
            color: 'text-green-500',
        },
        {
            icon: Moon,
            label: 'Sleep',
            value: '7h 23m',
            trend: '30min less than usual',
            color: 'text-blue-500',
        },
        {
            icon: Droplets,
            label: 'Water Intake',
            value: '2.4L',
            trend: '80% of daily goal',
            color: 'text-cyan-500',
        },
    ];

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const newLog = {
            id: Date.now(),
            date: new Date().toLocaleDateString(),
            weight: formData.weight,
            bloodPressure: `${formData.systolic}/${formData.diastolic}`,
            sleepHours: formData.sleepHours,
            waterIntake: formData.waterIntake,
        };

        setPastLogs(prev => [newLog, ...prev]);

        // Reset form
        setFormData({
            weight: '',
            systolic: '',
            diastolic: '',
            sleepHours: '',
            waterIntake: ''
        });
    };

    return (
        <div className="space-y-6 p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {healthMetrics.map((metric, index) => (
                    <Card key={index}>
                        <CardContent className="pt-6">
                            <div className="flex flex-col items-center text-center">
                                <metric.icon className={`h-8 w-8 ${metric.color} mb-4`} />
                                <h3 className="text-lg font-medium">{metric.label}</h3>
                                <p className="text-3xl font-bold mt-2">{metric.value}</p>
                                <p className="text-sm text-gray-500 mt-1">{metric.trend}</p>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Health Log Entry</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Weight (kg)</label>
                                <input
                                    type="number"
                                    name="weight"
                                    value={formData.weight}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                    placeholder="Enter weight"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Blood Pressure</label>
                                <div className="flex space-x-2">
                                    <input
                                        type="number"
                                        name="systolic"
                                        value={formData.systolic}
                                        onChange={handleInputChange}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                        placeholder="Systolic"
                                    />
                                    <input
                                        type="number"
                                        name="diastolic"
                                        value={formData.diastolic}
                                        onChange={handleInputChange}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                        placeholder="Diastolic"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Sleep Hours</label>
                                <input
                                    type="number"
                                    name="sleepHours"
                                    value={formData.sleepHours}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                    placeholder="Hours of sleep"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Water Intake (L)</label>
                                <input
                                    type="number"
                                    name="waterIntake"
                                    value={formData.waterIntake}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                    placeholder="Liters of water"
                                />
                            </div>
                        </div>
                        <div className="flex justify-end">
                            <button
                                type="submit"
                                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                            >
                                Save Log
                            </button>
                        </div>
                    </form>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Past Health Logs</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                            <tr className="border-b">
                                <th className="px-4 py-2 text-left">Date</th>
                                <th className="px-4 py-2 text-left">Weight (kg)</th>
                                <th className="px-4 py-2 text-left">Blood Pressure</th>
                                <th className="px-4 py-2 text-left">Sleep (hours)</th>
                                <th className="px-4 py-2 text-left">Water (L)</th>
                            </tr>
                            </thead>
                            <tbody>
                            {pastLogs.map((log) => (
                                <tr key={log.id} className="border-b">
                                    <td className="px-4 py-2">{log.date}</td>
                                    <td className="px-4 py-2">{log.weight}</td>
                                    <td className="px-4 py-2">{log.bloodPressure}</td>
                                    <td className="px-4 py-2">{log.sleepHours}</td>
                                    <td className="px-4 py-2">{log.waterIntake}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default HealthLogs;