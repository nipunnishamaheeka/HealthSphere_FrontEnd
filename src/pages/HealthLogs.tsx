import React, { useEffect, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/common/Card';
import { useAppDispatch, useAppSelector } from '../types/hooks';
import { getHealthLogs, saveHealthLog, deleteHealthLog } from '../store/slices/HealthSlice';
import { HealthLogModel } from '../model/HealthModel';
import { Trash2, Activity, Heart, Moon, Droplets } from 'lucide-react';

const HealthLogs: React.FC = () => {
    const dispatch = useAppDispatch();
    const healthLogs = useAppSelector((state) => state.health);

    const [formData, setFormData] = React.useState({
        date: new Date().toISOString().split('T')[0], // Auto-set today's date
        weight: '',
        systolic: '',
        diastolic: '',
        sleep_hours: '',
        water_intake: ''
    });

    useEffect(() => {
        console.log("Fetching health logs...");
        dispatch(getHealthLogs()).then(() => console.log("Health logs fetched successfully"));
    }, [dispatch]);

    // Calculate metrics from health logs
    const metrics = useMemo(() => {
        if (!healthLogs.length) return [];

        const lastLog = healthLogs[0];
        const previousLog = healthLogs[1];

        const calculateTrend = (current: number, previous: number) => {
            if (!previous) return "No previous data";
            const change = ((current - previous) / previous) * 100;
            return `${change >= 0 ? "+" : ""}${change.toFixed(1)}% from last entry`;
        };

        return [
            {
                icon: Activity,
                label: "Weight",
                value: `${lastLog.weight} kg`,
                trend: previousLog ? calculateTrend(lastLog.weight, previousLog.weight) : "No previous data",
                color: "text-blue-500"
            },
            {
                icon: Heart,
                label: "Blood Pressure",
                value: lastLog.blood_pressure,
                trend: "Latest reading",
                color: "text-red-500"
            },
            {
                icon: Moon,
                label: "Sleep",
                value: `${lastLog.sleep_hours}h`,
                trend: previousLog ? calculateTrend(lastLog.sleep_hours, previousLog.sleep_hours) : "No previous data",
                color: "text-purple-500"
            },
            {
                icon: Droplets,
                label: "Water Intake",
                value: `${lastLog.water_intake}L`,
                trend: previousLog ? calculateTrend(lastLog.water_intake, previousLog.water_intake) : "No previous data",
                color: "text-cyan-500"
            }
        ];
    }, [healthLogs]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Saving health log:", formData);
        const newLog = new HealthLogModel(
            crypto.randomUUID(),
            'user123',
            new Date(formData.date),
            Number(formData.weight),
            `${formData.systolic}/${formData.diastolic}`,
            Number(formData.sleep_hours),
            Number(formData.water_intake)
        );

        await dispatch(saveHealthLog(newLog));
        console.log("Health log saved successfully", newLog);

        setFormData({
            date: new Date().toISOString().split('T')[0], // Reset date to today
            weight: '',
            systolic: '',
            diastolic: '',
            sleep_hours: '',
            water_intake: ''
        });
    };

    const handleDelete = async (logId: string) => {
        console.log("Deleting health log with ID:", logId);
        await dispatch(deleteHealthLog(logId));
        console.log("Health log deleted successfully", logId);
    };

    return (
        <div className="space-y-6 p-6">
            {/* Metrics Cards */}
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

            {/* Form Card */}
            <Card>
                <CardHeader>
                    <CardTitle>Health Log Entry</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium">Weight (kg)</label>
                                <input
                                    type="number"
                                    name="weight"
                                    value={formData.weight}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full rounded-md border p-2"
                                    placeholder="Enter weight"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium">Blood Pressure</label>
                                <div className="flex space-x-2">
                                    <input
                                        type="number"
                                        name="systolic"
                                        value={formData.systolic}
                                        onChange={handleInputChange}
                                        className="mt-1 block w-full rounded-md border p-2"
                                        placeholder="Systolic"
                                    />
                                    <input
                                        type="number"
                                        name="diastolic"
                                        value={formData.diastolic}
                                        onChange={handleInputChange}
                                        className="mt-1 block w-full rounded-md border p-2"
                                        placeholder="Diastolic"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium">Sleep Hours</label>
                                <input
                                    type="number"
                                    name="sleepHours"
                                    value={formData.sleep_hours}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full rounded-md border p-2"
                                    placeholder="Hours of sleep"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium">Water Intake (L)</label>
                                <input
                                    type="number"
                                    name="waterIntake"
                                    value={formData.water_intake}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full rounded-md border p-2"
                                    placeholder="Liters of water"
                                />
                            </div>
                        </div>
                        <div className="flex justify-end">
                            <button
                                type="submit"
                                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                            >
                                Save Log
                            </button>
                        </div>
                    </form>
                </CardContent>
            </Card>

            {/* Logs Table Card */}
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
                                <th className="px-4 py-2 text-left">Actions</th>
                            </tr>
                            </thead>
                            <tbody>
                            {healthLogs.map((log, index) => (
                                <tr key={log.log_id || `log-${index}`} className="border-b">

                                <td className="px-4 py-2">
                                        {new Date(log.date).toLocaleDateString()}
                                    </td>
                                    <td className="px-4 py-2">{log.weight}</td>
                                    <td className="px-4 py-2">{log.blood_pressure}</td>
                                    <td className="px-4 py-2">{log.sleep_hours}</td>
                                    <td className="px-4 py-2">{log.water_intake}</td>
                                    <td className="px-4 py-2">
                                        <button
                                            onClick={() => handleDelete(log.log_id)}
                                            className="text-red-500 hover:text-red-700"
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </button>
                                    </td>
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