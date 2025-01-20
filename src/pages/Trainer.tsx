import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../store/Store';
import { addClient, deleteClient } from '../store/slices/TrainerSlice';
import { Card, CardContent, CardHeader, CardTitle } from "../components/common/Card";
import { Users, Calendar, MessageSquare, Activity, ChevronRight, Search, Plus, MoreVertical, TrendingUp, AlertCircle } from 'lucide-react';
// import AddTrainerPopups from '../components/TrainerAddButton'; // Ensure this is imported correctly

const TrainerDashboard: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const clients = useSelector((state: RootState) => state.trainer.clients);

    // Mock upcoming sessions data
    const upcomingSessions = [
        { client: 'John Doe', type: 'Personal Training', time: '10:00 AM', duration: '1 Hour' },
        { client: 'Jane Smith', type: 'Group Training', time: '1:00 PM', duration: '2 Hours' },
    ];

    const handleAddClient = () => {
        dispatch(addClient({
            id: '4',
            name: 'New Client',
            plan: 'New Plan',
            progress: 50,
            nextSession: '2024-02-01 10:00 AM',
            alerts: 0,
            metrics: { attendance: '100%', completion: '50%', engagement: '75%' },
        }));
    };

    const handleDeleteClient = (id: string) => {
        dispatch(deleteClient(id));
    };

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
                            {/* Ensure AddTrainerPopups is correctly imported */}
                            {/* <AddTrainerPopups /> */}
                            <img
                                className="h-8 w-8 rounded-full"
                                src="https://d1csarkz8obe9u.cloudfront.net/posterpreviews/fitness-logo%2C-gym-logo%2C-fitness-center-logo-design-template-ee502c447776d7537ac35f02d0efa0ac_screen.jpg?ts=1669138823"
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
                    {/* Stats Cards */}
                    {[
                        { label: 'Total Clients', value: 24, icon: Users, color: 'blue' },
                        { label: "Today's Sessions", value: 6, icon: Calendar, color: 'green' },
                        { label: 'Active Programs', value: 8, icon: Activity, color: 'purple' },
                        { label: 'Messages', value: 12, icon: MessageSquare, color: 'orange' },
                    ].map((stat, idx) => (
                        <Card key={idx}>
                            <CardContent className="p-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-gray-500">{stat.label}</p>
                                        <p className="text-2xl font-bold">{stat.value}</p>
                                    </div>
                                    <stat.icon className={`h-8 w-8 text-${stat.color}-500`} />
                                </div>
                            </CardContent>
                        </Card>
                    ))}
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
                            <button onClick={handleAddClient} className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
                                Add Client
                            </button>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {clients.map(client => (
                                <div key={client.id} className="bg-gray-50 rounded-lg p-4">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-4">
                                            <img
                                                src="https://via.placeholder.com/40"
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
                                            <button
                                                onClick={() => handleDeleteClient(client.id)}
                                                className="p-2 hover:bg-gray-200 rounded-full"
                                            >
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
                                    {upcomingSessions.map((session, idx) => (
                                        <div key={idx} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
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
                                {[
                                    { label: 'Add New Client', icon: Plus },
                                    { label: 'Track Client Progress', icon: TrendingUp },
                                ].map((action, idx) => (
                                    <button
                                        key={idx}
                                        className="w-full flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100"
                                    >
                                        <div className="flex items-center space-x-3">
                                            <action.icon className="h-5 w-5 text-blue-500" />
                                            <span className="font-medium">{action.label}</span>
                                        </div>
                                        <ChevronRight className="h-5 w-5 text-gray-500" />
                                    </button>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default TrainerDashboard;
