import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/Store.ts';
import { updateForm, resetForm } from '../store/slices/editUserFormSlice.tsx';
import {AddTrainer} from "../components/AddTrainer.tsx";





export const Trainer: React.FC = () => {
    const users = useSelector((state: RootState) => state.users);
    const editUserForm = useSelector((state: RootState) => state.editUserForm);
    const [isAddTrainerOpen, setIsAddTrainerOpen] = React.useState(false);
    const dispatch = useDispatch();
    const [trainers, setTrainers] = React.useState<TrainerData[]>([]);
    // const addNewTrainer = (newShop: ShopData) => {
    //     setItems((prevItems) => [...prevItems, newShop]);
    // };

    const handleEditFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Handle form submission logic here
        // console.log('Form submitted:', editUserForm);
        // dispatch(
        //     editUser({
        //         id: editUserForm.email,
        //         name: `${editUserForm.firstName} ${editUserForm.lastName}`,
        //         email: editUserForm.email,
        //         position: editUserForm.department,
        //         status: 'Online',
        //         image: '/docs/images/people/profile-picture-1.jpg',
        //     })
        // );
        dispatch(resetForm());
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        dispatch(updateForm({ field: name, value }));
    };

    type TrainerData = {
        id: string;
        name: string;
        email: string;
        position: string;
        status: string;
        image: string;
    };



    const addNewTrainer = (newTrainer: TrainerData) => {
        setTrainers((prevTrainers: TrainerData[]) => [...prevTrainers, newTrainer]);
    };
    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg w-full">

            <div
                className="flex items-center justify-between flex-column md:flex-row flex-wrap space-y-4 md:space-y-0 py-4 bg-white dark:bg-gray-900">
                <div>
                    <button
                        id="dropdownActionButton"
                        data-dropdown-toggle="dropdownAction"
                        className="inline-flex items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-3 py-1.5 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                        type="button"
                    >
                        <span className="sr-only">Action button</span>
                        Action
                        <svg
                            className="w-2.5 h-2.5 ms-2.5"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 10 6"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="m1 1 4 4 4-4"
                            />
                        </svg>
                    </button>

                    {/* Dropdown menu */}
                    <div
                        id="dropdownAction"
                        className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600"
                    >
                        <ul className="py-1 text-sm text-gray-700 dark:text-gray-200">
                            <li>
                                <a href="#"
                                   className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                                    Reward
                                </a>
                            </li>
                            <li>
                                <a href="#"
                                   className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                                    Promote
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                {/* Search */}
                <div className="relative">
                    <div
                        className="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
                        <svg
                            className="w-4 h-4 text-gray-500 dark:text-gray-400"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 20 20"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                            />
                        </svg>
                    </div>
                    <input
                        type="text"
                        id="table-search-users"
                        className="block pt-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Search for users"
                    />
                </div>

                    {/*<div className="relative">*/}
                    {/*    <input*/}
                    {/*        type="text"*/}
                    {/*        id="table-search-suppliers"*/}
                    {/*        className="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500"*/}
                    {/*        placeholder="Search suppliers"*/}
                    {/*        // value={searchText}*/}
                    {/*        // onChange={(e) => setSearchText(e.target.value)}*/}
                    {/*        // onKeyDown={handleSearchKeyDown}*/}
                    {/*    />*/}
                    {/*    <svg*/}
                    {/*        className="absolute left-3 top-2.5 w-5 h-5 text-gray-400"*/}
                    {/*        xmlns="http://www.w3.org/2000/svg"*/}
                    {/*        fill="none"*/}
                    {/*        viewBox="0 0 24 24"*/}
                    {/*        stroke="currentColor"*/}
                    {/*    >*/}
                    {/*        <path*/}
                    {/*            strokeLinecap="round"*/}
                    {/*            strokeLinejoin="round"*/}
                    {/*            strokeWidth="2"*/}
                    {/*            d="M21 21l-4.35-4.35M10 18a8 8 0 100-16 8 8 0 000 16z"*/}
                    {/*        />*/}
                    {/*    </svg>*/}
                    {/*</div>*/}
                    <button
                        type="button"
                        className="text-white bg-gray-800 hover:bg-black hover:text-white focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5"
                        // onClick={() => setDeleteShopOpen(true)}
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
                        <th scope="col" className="p-4">
                            <div className="flex items-center">
                                <input
                                    id="checkbox-all-search"
                                    type="checkbox"
                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                />
                                <label htmlFor="checkbox-all-search" className="sr-only">
                                    checkbox
                                </label>
                            </div>
                        </th>
                        <th scope="col" className="px-6 py-3">Name</th>
                        <th scope="col" className="px-6 py-3">Role</th>
                        <th scope="col" className="px-6 py-3">User Name</th>
                        <th scope="col" className="px-6 py-3">Meal Planner</th>
                        <th scope="col" className="px-6 py-3">Status</th>
                        <th scope="col" className="px-6 py-3">Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {users.map((user) => (
                        <tr key={user.id}
                            className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                            <td className="w-4 p-4">
                                <div className="flex items-center">
                                    <input
                                        type="checkbox"
                                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                    />
                                </div>
                            </td>
                            <th scope="row"
                                className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                                <img className="w-10 h-10 rounded-full" src={user.image} alt={`${user.name} image`}/>
                                <div className="ps-3">
                                    <div className="text-base font-semibold">{user.name}</div>
                                    <div className="font-normal text-gray-500">{user.email}</div>
                                </div>
                            </th>
                            <td className="px-6 py-4">{user.role}</td>
                            <td className="px-6 py-4">{user.userName}</td>
                            <td className="px-6 py-4">{user.mealPlanner}</td>
                            <td className="px-6 py-4">
                                <div className="flex items-center">
                                    <div
                                        className={`h-2.5 w-2.5 rounded-full ${user.status === 'Online' ? 'bg-green-500' : 'bg-red-500'} me-2`}></div>
                                    {user.status}
                                </div>
                            </td>

                            <td className="px-6 py-4">
                                <a
                                    href="#"
                                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                                    data-modal-target="editUserModal"
                                    data-modal-show="editUserModal"
                                >
                                    Edit user
                                </a>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>

                {/* Edit User Modal */}
                <div
                    id="editUserModal"
                    tabIndex={-1}
                    aria-hidden="true"
                    className="fixed top-0 left-0 right-0 z-50 items-center justify-center hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full"
                >
                    <div className="relative w-full max-w-2xl max-h-full">
                        <form className="relative bg-white rounded-lg shadow dark:bg-gray-700"
                              onSubmit={handleEditFormSubmit}>
                            {/* Modal header */}
                            <div
                                className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Edit user</h3>
                                <button
                                    type="button"
                                    className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                                    data-modal-hide="editUserModal"
                                >
                                    <svg
                                        className="w-3 h-3"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 14 14"
                                    >
                                        <path
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                                        />
                                    </svg>
                                    <span className="sr-only">Close modal</span>
                                </button>
                            </div>

                            {/* Modal body */}
                            <div className="p-6 space-y-6">
                                <div className="grid grid-cols-6 gap-6">
                                    {/* Form fields */}
                                    <div className="col-span-6 sm:col-span-3">
                                        <label htmlFor="firstName"
                                               className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                            First Name
                                        </label>
                                        <input
                                            type="text"
                                            name="firstName"
                                            id="firstName"
                                            value={editUserForm.firstName}
                                            onChange={handleInputChange}
                                            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            placeholder="First name"
                                            required
                                        />
                                    </div>
                                    {/* Add other form fields similarly */}
                                </div>
                            </div>

                            {/* Modal footer */}
                            <div
                                className="flex items-center p-6 space-x-3 rtl:space-x-reverse border-t border-gray-200 rounded-b dark:border-gray-600">
                                <button
                                    type="submit"
                                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                >
                                    Save all
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            {isAddTrainerOpen && (
                <AddTrainer
                    onClose={() => setIsAddTrainerOpen(false)}
                    onAdd={addNewTrainer}
                />
            )}

        </div>
    );
};
