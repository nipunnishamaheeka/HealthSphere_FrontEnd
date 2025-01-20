import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/common/Card';
import { useAppDispatch, useAppSelector } from '../types/hooks';
import { updateFormData, resetFormData, addHealthLog } from '../store/slices/HealthSlice';
const HealthLogs: React.FC = () => {
    const dispatch = useAppDispatch();
    const { metrics, logs, formData } = useAppSelector(state => state.health);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        dispatch(updateFormData({ field: name as keyof typeof formData, value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const newLog = {
            id: Date.now(),
            date: new Date().toLocaleDateString(),
            weight: formData.weight,
            bloodPressure: `${formData.systolic}/${formData.diastolic}`,
            sleepHours: formData.sleepHours,
            waterIntake: formData.waterIntake,
        };

        dispatch(addHealthLog(newLog));
        dispatch(resetFormData());
    };

    return (
        <div className="space-y-6 p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {metrics.map((metric, index) => (
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
                            {logs.map((log) => (
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