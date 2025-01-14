import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/Store';
import { updateTrainer, resetForm } from '../store/slices/trainerSlice';
import { AddTrainer } from '../components/AddTrainer';
import {DeleteTrainerPopup} from "../components/DeleteTrainerPopup.tsx";

export const Trainer: React.FC = () => {
    const trainer = useSelector((state: RootState) => state.trainer);
    const [isAddTrainerOpen, setIsAddTrainerOpen] = React.useState(false);
    const [deleteTrainerOpen, setIsDeleteTrainer] = React.useState(false);
    const dispatch = useDispatch();

    const handleEditFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(resetForm());
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        dispatch(updateTrainer({ field: name, value }));
    };
    const handelDelete =async (result:string) =>{
        setIsDeleteTrainer(!deleteTrainerOpen)
        if (result === "yes"){
            console.log("delete")

        }
    }

    const addNewTrainer = (newTrainer: TrainerData) => {
        dispatch(updateTrainer(newTrainer)); // Update the store with the new trainer
    };

    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg w-full">
            <div
                className="flex items-center justify-between flex-column md:flex-row flex-wrap space-y-4 md:space-y-0 py-4 bg-white dark:bg-gray-900">

                {/*<div>*/}
                {/*    <button*/}
                {/*        className="inline-flex items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-3 py-1.5 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"*/}
                {/*    >*/}
                {/*        Action*/}
                {/*    </button>*/}
                {/*</div>*/}
                <div>
                    <h1 className="text-lg font-semibold text-gray-800">Trainer Management</h1>
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
                        onClick={() => setIsDeleteTrainer(true)}
                    >
                        Delete
                    </button>
                    <button
                        type="button"
                        className="text-white bg-gray-800 hover:bg-black hover:text-white focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5"
                        onClick={() => setIsAddTrainerOpen(true)}
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
                    <th className="px-6 py-3">Name</th>
                    <th className="px-6 py-3">Role</th>
                    <th className="px-6 py-3">User Name</th>
                    <th className="px-6 py-3">Meal Planner</th>
                    <th className="px-6 py-3">Status</th>
                    <th className="px-6 py-3">Action</th>
                </tr>
                </thead>
                <tbody>
                {trainer.trainers.map((user) => (
                    <tr key={user.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                        <td className="w-4 p-4">
                            <input
                                type="checkbox"
                                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
                            />
                        </td>
                        <td className="px-6 py-4">
                            <div className="flex items-center">
                                <img className="w-10 h-10 rounded-full" src={user.image} alt={`${user.name} image`} />
                                <div className="ps-3">
                                    <div className="text-base font-semibold">{user.name}</div>
                                    <div className="font-normal text-gray-500">{user.email}</div>
                                </div>
                            </div>
                        </td>
                        <td className="px-6 py-4">{user.role}</td>
                        <td className="px-6 py-4">{user.userName}</td>
                        <td className="px-6 py-4">{user.mealPlanner}</td>
                        <td className="px-6 py-4">
                            <div className="flex items-center">
                                <div className={`h-2.5 w-2.5 rounded-full ${user.status === 'Online' ? 'bg-green-500' : 'bg-red-500'} me-2`} />
                                {user.status}
                            </div>
                        </td>
                        <td className="px-6 py-4">
                            <button
                                className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                                onClick={() => dispatch(updateTrainer(user))}
                            >
                                Edit user
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>

            {isAddTrainerOpen && (
                <AddTrainer
                    onClose={() => setIsAddTrainerOpen(false)}
                    onAdd={addNewTrainer}
                />
            )}
            {deleteTrainerOpen && <DeleteTrainerPopup close={handelDelete}/>}
        </div>
    );
};
