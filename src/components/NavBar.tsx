import React, { useState } from 'react';
import {Menu, X, User, LogOut, Settings, LayoutDashboard, User2} from 'lucide-react';
import { Trainer } from '../pages/Trainer.tsx';
import {Dashboard} from '../pages/Dashboard';
import {HealthLog} from "../pages/HealthLog.tsx";
// import SettingsPage from '../pages/Settings';

export const NavBar: React.FC = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [activePage, setActivePage] = useState('Dashboard'); // Track the active page

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const toggleProfile = () => {
        setIsProfileOpen(!isProfileOpen);
    };

    const handleLogout = () => {
        // Handle logout logic here
        console.log('Logged out');
    };

    const navigationItems = [
        { id: 'Dashboard', label: 'Dashboard', icon: LayoutDashboard, component: <Dashboard /> },
        { id: 'Trainer', label: 'Trainer', icon: User, component: <Trainer /> },
        { id: 'HealthLog', label: 'Health Logs', icon: User2, component: <HealthLog /> },
        // { id: 'Settings', label: 'Settings', icon: Settings, component: <SettingsPage /> },
    ];

    return (
        <>
            <nav className="relative top-0  z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                <div className="px-3 py-3 lg:px-5 lg:pl-3">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center justify-start">
                            <button
                                onClick={toggleSidebar}
                                className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                            >
                                {isSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                            </button>
                            <span className="flex ml-2 md:mr-24 self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white">
                                HealthSphere
                            </span>
                        </div>
                        <div className="flex items-center">
                            <div className="relative ml-3">
                                <button
                                    onClick={toggleProfile}
                                    className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                                >
                                    <img
                                        className="w-8 h-8 rounded-full"
                                        src="https://images.freeimages.com/fic/images/icons/61/dragon_soft/512/user.png"
                                        alt="user photo"
                                    />
                                </button>
                                {isProfileOpen && (
                                    <div className="absolute right-0 z-50 w-48 py-2 mt-2 bg-white rounded-lg shadow-xl dark:bg-gray-700">
                                        <div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                                            <div>User Name</div>
                                            <div className="font-medium truncate">user@example.com</div>
                                        </div>
                                        <div className="border-t border-gray-200 dark:border-gray-600" />
                                        <button
                                            onClick={() => setActivePage('Settings')}
                                            className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                                        >
                                            <Settings className="w-4 h-4 mr-2" />
                                            Settings
                                        </button>
                                        <button
                                            onClick={handleLogout}
                                            className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                                        >
                                            <LogOut className="w-4 h-4 mr-2" />
                                            Sign out
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            <aside
                className={`fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform bg-white border-r border-gray-200 dark:bg-gray-800 dark:border-gray-700 ${
                    isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
                } sm:translate-x-0`}
            >
                <div className="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
                    <ul className="space-y-2 font-medium">
                        {navigationItems.map((item) => {
                            const Icon = item.icon;
                            return (
                                <li key={item.id}>
                                    <button
                                        onClick={() => setActivePage(item.id)}
                                        className={`flex items-center w-full p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group ${
                                            activePage === item.id
                                                ? 'bg-gray-100 dark:bg-gray-700'
                                                : ''
                                        }`}
                                    >
                                        <Icon className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                                        <span className="ml-3">{item.label}</span>
                                    </button>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </aside>

            <div className="p-4 sm:ml-64">
                <div className="mt-14">
                    {/* Render the active page component */}
                    {navigationItems.find((item) => item.id === activePage)?.component}
                </div>
            </div>
        </>
    );
};
