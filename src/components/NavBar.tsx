import React, { useState } from 'react';
import { Menu, X, User, LogOut, Settings, LayoutDashboard, Activity, Dumbbell, Heart, Coffee, Target, Moon, Sun } from 'lucide-react';
import { useTheme } from '../components/Theme/ThemeContext';
import { Dashboard } from '../pages/Dashboard';
import ActivityTracker from "../pages/ActivityTracker";
import MealPlan from "../pages/MealPlan";
import GoalSetting from "../pages/GoalSetting";
import EmergencyContact from "../pages/EmergencyContact";
import HealthLogs from "../pages/HealthLogs";
import Trainer from "../pages/Trainer";

export const NavBar = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [activePage, setActivePage] = useState('Dashboard');
    const { theme, toggleTheme } = useTheme();

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const toggleProfile = () => {
        setIsProfileOpen(!isProfileOpen);
    };

    const handleLogout = () => {
        console.log('Logged out');
    };

    const navigationItems = [
        { id: 'Dashboard', label: 'Dashboard', icon: LayoutDashboard, component: <Dashboard /> },
        { id: 'HealthMetric', label: 'Health Log New', icon: Heart, component: <HealthLogs /> },
        { id: 'Client', label: 'Trainer Ui', icon: Dumbbell, component: <Trainer /> },
        { id: 'ActivityItem', label: 'Activity Tracker', icon: Activity, component: <ActivityTracker /> },
        { id: 'Meal', label: 'Meal Plan', icon: Coffee, component: <MealPlan /> },
        { id: 'Goal', label: 'Goal Setting', icon: Target, component: <GoalSetting /> },
        // { id: 'Group', label: 'Community', icon: Users, component: <Community /> },
        // { id: 'WeeklyData', label: 'Analytics', icon: BarChart, component: <InsightsAndAnalytics /> },
        { id: 'Contact', label: 'Emergency Contact', icon: User, component: <EmergencyContact /> },
    ];

    return (
        <>
            {/* Top Navigation Bar */}
                <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                    <div className="px-4 py-3 lg:px-6">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                                <button
                                    onClick={toggleSidebar}
                                    className="inline-flex items-center p-2 text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    {isSidebarOpen ? <X className="w-6 h-6"/> : <Menu className="w-6 h-6"/>}
                                </button>
                                <img
                                    src="https://thumbs.dreamstime.com/b/medical-pharmacy-heart-healthcare-logo-vector-graphic-design-medical-pharmacy-heart-healthcare-logo-vector-graphic-design-template-158027818.jpg"
                                    alt="HealthSphere Logo"
                                    className="w-8 h-8"
                                />
                                <span className="text-2xl font-bold text-gray-800 dark:text-white">
                                HealthSphere
                            </span>
                            </div>

                            {/* Right Side Controls */}
                            <div className="flex items-center space-x-4">
                                {/* Theme Toggle */}
                                <button
                                    onClick={toggleTheme}
                                    className="p-2 text-gray-500 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    aria-label="Toggle theme"
                                >
                                    {theme === 'dark' ? (
                                        <Sun className="w-5 h-5" />
                                    ) : (
                                        <Moon className="w-5 h-5" />
                                    )}
                                </button>

                                {/* Profile Button */}
                                <div className="relative">
                                    <button
                                        onClick={toggleProfile}
                                        className="flex items-center focus:outline-none"
                                    >
                                        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-100 hover:bg-blue-200 dark:bg-blue-900 dark:hover:bg-blue-800">
                                            <img
                                                className="w-8 h-8 rounded-full"
                                                src="https://images.freeimages.com/fic/images/icons/61/dragon_soft/512/user.png"
                                                alt="user photo"
                                            />
                                        </div>
                                    </button>

                                    {/* Profile Dropdown */}
                                    {isProfileOpen && (
                                        <div className="absolute right-0 mt-3 w-64 bg-white rounded-lg shadow-lg py-2 dark:bg-gray-700 transform transition-all duration-200">
                                            <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-600">
                                                <p className="text-sm font-semibold text-gray-900 dark:text-white">User Name</p>
                                                <p className="text-sm text-gray-500 dark:text-gray-300">user@example.com</p>
                                            </div>
                                            <button
                                                onClick={() => setActivePage('Settings')}
                                                className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-600"
                                            >
                                                <Settings className="w-4 h-4 mr-3" />
                                                Settings
                                            </button>
                                            <button
                                                onClick={handleLogout}
                                                className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-gray-600"
                                            >
                                                <LogOut className="w-4 h-4 mr-3" />
                                                Sign out
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>

                {/* Sidebar */}
                <aside
                    className={`fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform duration-300 bg-white border-r border-gray-200 dark:bg-gray-800 dark:border-gray-700 ${
                        isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
                    } sm:translate-x-0`}
                >
                    <div className="h-full px-4 pb-4 overflow-y-auto">
                        <ul className="space-y-1">
                            {navigationItems.map((item) => {
                                const Icon = item.icon;
                                const isActive = activePage === item.id;

                                return (
                                    <li key={item.id}>
                                        <button
                                            onClick={() => setActivePage(item.id)}
                                            className={`flex items-center w-full px-4 py-3 rounded-lg transition-all duration-200 group
                                            ${isActive
                                                ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400'
                                                : 'text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700'
                                            }`}
                                        >
                                            <Icon className={`w-5 h-5 mr-3 transition-colors duration-200
                                            ${isActive
                                                ? 'text-blue-600 dark:text-blue-400'
                                                : 'text-gray-500 group-hover:text-gray-700 dark:text-gray-400 dark:group-hover:text-gray-300'
                                            }`}
                                            />
                                            <span className="font-medium">{item.label}</span>
                                        </button>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                </aside>

                {/* Main Content */}
                <div className="p-4 sm:ml-64">
                    <div className="mt-16 p-4">
                        {navigationItems.find((item) => item.id === activePage)?.component}
                    </div>
                </div>
        </>
    );
};

export default NavBar;