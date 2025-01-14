import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/Store';
import { updateLogs, resetForm } from '../store/slices/HealthSlice.ts';
import { AddHealthLogs } from '../components/AddHealthLogs.tsx';
import {DeleteHealthPopup} from "../components/DeleteHealthPopup.tsx";

export const HealthLog: React.FC = () => {
    const healthLog = useSelector((state: RootState) => state.healthLogs);
    const [isAddHealthOpen, setIsAddHealthOpen] = React.useState(false);
    const [deleteHealthOpen, setIsDeleteHealth] = React.useState(false);
    const dispatch = useDispatch();

    const handleEditFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(resetForm());
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        dispatch(updateLogs({ field: name, value }));
    };
    const handelDelete =async (result:string) =>{
        setIsDeleteHealth(!deleteHealthOpen)
        if (result === "yes"){
            console.log("delete")

        }
    }

    const addNewTrainer = (newTrainer: TrainerData) => {
        dispatch(updateLogs(newTrainer)); // Update the store with the new trainer
    };

    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg w-full">
            <div
                className="flex items-center justify-between flex-column md:flex-row flex-wrap space-y-4 md:space-y-0 py-4 bg-white dark:bg-gray-900">

                <div>
                    <h1 className="text-lg font-semibold text-gray-800">Health Logs Management</h1>
                    <p className="text-sm text-gray-500">Manage trainers and transactions effectively</p>
                </div>
                <div className="flex items-center gap-4">
                    <input
                        type="text"
                        id="table-search-users"
                        className="block pt-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Search for users"
                    />
                    <button
                        type="button"
                        className="text-white bg-gray-800 hover:bg-black hover:text-white focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5"
                        onClick={() => setIsDeleteHealth(true)}
                    >
                        Delete
                    </button>
                    <button
                        type="button"
                        className="text-white bg-gray-800 hover:bg-black hover:text-white focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5"
                        onClick={() => setIsAddHealthOpen(true)}
                    >
                        Add New
                    </button>
                </div>
            </div>

            {/* Users Table */}
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <th className="p-4">
                        <input
                            type="checkbox"
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
                        />
                    </th>
                    <th className="px-6 py-3">Date</th>
                    <th className="px-6 py-3">User Name</th>
                    <th className="px-6 py-3">Weight</th>
                    <th className="px-6 py-3">Blood Pressure</th>
                    <th className="px-6 py-3">Sleep Hours</th>
                    <th className="px-6 py-3">Water Intake</th>
                    <th className="px-6 py-3">Action</th>
                </tr>
                </thead>
                <tbody>
                {healthLog.healthLogs.map((user) => (
                    <tr key={user.log_id}
                        className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                        <td className="w-4 p-4">
                            <input
                                type="checkbox"
                                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
                            />
                        </td>
                        <td className="px-6 py-4">

                            <td className="px-6 py-4">{user.date}</td>
                        </td>
                        <td className="px-6 py-4">{user.user_id}</td>
                        <td className="px-6 py-4">{user.weight}</td>
                        <td className="px-6 py-4">{user.blood_pressure}</td>
                        <td className="px-6 py-4">
                           {user.sleep_hours}
                        </td>
                        <td className="px-6 py-4">{user.water_intake}</td>
                        <td className="px-6 py-4">
                            <button
                                className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                                onClick={() => dispatch(updateLogs(user))}
                            >
                                Edit user
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>

            {isAddHealthOpen && (
                <AddHealthLogs
                    onClose={() => setIsAddHealthOpen(false)}
                    onAdd={addNewTrainer}
                />
            )}
            {deleteHealthOpen && <DeleteHealthPopup close={handelDelete}/>}
        </div>
    );
};
