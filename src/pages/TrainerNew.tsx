import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/common/Card';
import {
    Users, Calendar, MessageSquare, Activity,
    ChevronRight, Search, Plus, MoreVertical,
    TrendingUp, AlertCircle
} from 'lucide-react';
import AddTrainerPopups from '../components/new Added/TrainerAddButton'
interface Client {
    name: string;
    plan: string;
    progress: number;
    nextSession: string;
    alerts: number;
    metrics: {
        attendance: string;
        completion: string;
        engagement: string;
    };
}

interface Session {
    client: string;
    type: string;
    time: string;
    duration: string;
}

const TrainerDashboard: React.FC = () => {
    const [activeTab, setActiveTab] = useState<string>('clients');

    const clients: Client[] = [
        {
            name: 'Sarah Johnson',
            plan: 'Weight Loss Program',
            progress: 68,
            nextSession: '2024-01-16 10:00 AM',
            alerts: 2,
            metrics: {
                attendance: '90%',
                completion: '85%',
                engagement: '95%'
            }
        },
        {
            name: 'Mike Thompson',
            plan: 'Muscle Gain Program',
            progress: 75,
            nextSession: '2024-01-16 2:00 PM',
            alerts: 0,
            metrics: {
                attendance: '95%',
                completion: '88%',
                engagement: '92%'
            }
        },
        {
            name: 'Emily Davis',
            plan: 'Fitness Maintenance',
            progress: 82,
            nextSession: '2024-01-17 11:00 AM',
            alerts: 1,
            metrics: {
                attendance: '85%',
                completion: '90%',
                engagement: '88%'
            }
        }
    ];

    const upcomingSessions: Session[] = [
        {
            client: 'Sarah Johnson',
            type: 'Personal Training',
            time: '10:00 AM',
            duration: '60 min'
        },
        {
            client: 'Mike Thompson',
            type: 'Progress Review',
            time: '2:00 PM',
            duration: '30 min'
        },
        {
            client: 'Group Session',
            type: 'HIIT Workout',
            time: '4:00 PM',
            duration: '45 min'
        }
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Top Bar */}
            <div className="bg-white border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <h1 className="text-2xl font-bold text-gray-900">Trainer Dashboard</h1>
                        <div className="flex items-center space-x-4">
                            <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
                                <Plus className="h-5 w-5" />
                            </button>
                            <AddTrainerPopups />
                            <img
                                className="h-8 w-8 rounded-full"
                                src="/api/placeholder/32/32"
                                alt="Trainer profile"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Stats Overview */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                    <Card>
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-500">Total Clients</p>
                                    <p className="text-2xl font-bold">24</p>
                                </div>
                                <Users className="h-8 w-8 text-blue-500" />
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-500">Today's Sessions</p>
                                    <p className="text-2xl font-bold">6</p>
                                </div>
                                <Calendar className="h-8 w-8 text-green-500" />
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-500">Active Programs</p>
                                    <p className="text-2xl font-bold">8</p>
                                </div>
                                <Activity className="h-8 w-8 text-purple-500" />
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-500">Messages</p>
                                    <p className="text-2xl font-bold">12</p>
                                </div>
                                <MessageSquare className="h-8 w-8 text-orange-500" />
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Client List */}
                <Card className="mb-8">
                    <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle>Active Clients</CardTitle>
                        <div className="flex items-center space-x-2">
                            <div className="relative">
                                <Search className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Search clients..."
                                    className="pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
                                Add Client
                            </button>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {clients.map((client, index) => (
                                <div key={index} className="bg-gray-50 rounded-lg p-4">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-4">
                                            <img
                                                src="/api/placeholder/40/40"
                                                alt={client.name}
                                                className="h-10 w-10 rounded-full"
                                            />
                                            <div>
                                                <h3 className="font-medium">{client.name}</h3>
                                                <p className="text-sm text-gray-500">{client.plan}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center space-x-8">
                                            <div>
                                                <p className="text-sm text-gray-500">Progress</p>
                                                <div className="flex items-center space-x-2">
                                                    <div className="w-32 h-2 bg-gray-200 rounded-full">
                                                        <div
                                                            className="h-2 bg-green-500 rounded-full"
                                                            style={{ width: `${client.progress}%` }}
                                                        />
                                                    </div>
                                                    <span className="text-sm font-medium">{client.progress}%</span>
                                                </div>
                                            </div>
                                            <div>
                                                <p className="text-sm text-gray-500">Next Session</p>
                                                <p className="font-medium">{client.nextSession}</p>
                                            </div>
                                            {client.alerts > 0 && (
                                                <div className="flex items-center space-x-1 text-red-500">
                                                    <AlertCircle className="h-5 w-5" />
                                                    <span>{client.alerts}</span>
                                                </div>
                                            )}
                                            <button className="p-2 hover:bg-gray-200 rounded-full">
                                                <MoreVertical className="h-5 w-5 text-gray-500" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Schedule */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2">
                        <Card>
                            <CardHeader>
                                <CardTitle>Today's Schedule</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {upcomingSessions.map((session, index) => (
                                        <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                            <div className="flex items-center space-x-4">
                                                <Calendar className="h-6 w-6 text-blue-500" />
                                                <div>
                                                    <h3 className="font-medium">{session.client}</h3>
                                                    <p className="text-sm text-gray-500">{session.type}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center space-x-6">
                                                <div>
                                                    <p className="text-sm text-gray-500">Time</p>
                                                    <p className="font-medium">{session.time}</p>
                                                </div>
                                                <div>
                                                    <p className="text-sm text-gray-500">Duration</p>
                                                    <p className="font-medium">{session.duration}</p>
                                                </div>
                                                <button className="p-2 hover:bg-gray-200 rounded-full">
                                                    <ChevronRight className="h-5 w-5 text-gray-500" />
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Quick Actions */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Quick Actions</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <button className="w-full flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100">
                                    <div className="flex items-center space-x-3">
                                        <Plus className="h-5 w-5 text-blue-500" />
                                        <span className="font-medium">Add New Client</span>
                                    </div>
                                    <ChevronRight className="h-5 w-5 text-gray-500" />
                                </button>
                                <button className="w-full flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100">
                                    <div className="flex items-center space-x-3">
                                        <TrendingUp className="h-5 w-5 text-green-500" />
                                        <span className="font-medium">Track Client Progress</span>
                                    </div>
                                    <ChevronRight className="h-5 w-5 text-gray-500" />
                                </button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default TrainerDashboard;
