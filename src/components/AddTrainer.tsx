import React from 'react';

interface AddTrainerProps {
    onClose: () => void;
    onAdd: (trainer: any) => void; // Replace `any` with the specific type for your trainer data.
}

export const AddTrainer: React.FC<AddTrainerProps> = ({ onClose, onAdd }) => {
    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const formData = new FormData(form);
        const name = formData.get("trainerName") as string;
        const email = formData.get("email") as string;
        const role = formData.get("roleSelector") as string;
        const user = formData.get("user") as string;
        const trainer = { name, email, role, user };
        onAdd(trainer);
        onClose();
    };

    return (
        <>
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                <div className="bg-white rounded-lg w-[90vw] md:w-[40vw] h-auto max-h-[80vh] p-6 shadow-2xl relative overflow-y-auto">
                    <button
                        className="absolute top-3 right-5 text-gray-500 hover:text-gray-700 text-2xl font-bold focus:outline-none"
                        onClick={onClose}
                    >
                        &times;
                    </button>
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">Add Trainer</h2>
                    <form className="space-y-4" onSubmit={handleSave}>
                        <div>
                            <label htmlFor="trainerId" className="block text-sm font-medium text-gray-700">
                                Trainer ID
                            </label>
                            <input
                                type="text"
                                name="trainerId"
                                id="trainerId"
                                className="w-full mt-1 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="trainerName" className="block text-sm font-medium text-gray-700">
                                Trainer Name
                            </label>
                            <input
                                type="text"
                                name="trainerName"
                                id="trainerName"
                                className="w-full mt-1 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                Email
                            </label>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                className="w-full mt-1 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="roleSelector" className="block text-sm font-medium text-gray-700">
                                Role
                            </label>
                            <select
                                name="roleSelector"
                                id="roleSelector"
                                className="w-full mt-1 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            >
                                <option value="" disabled selected>
                                    Select a role
                                </option>
                                <option value="trainer">Trainer</option>
                                <option value="nutritionist">Nutritionist</option>
                            </select>
                        </div>

                        <div>
                            <label htmlFor="user" className="block text-sm font-medium text-gray-700">
                                User ID or Name
                            </label>
                            <select
                                name="user"
                                id="user"
                                className="w-full mt-1 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            >
                                <option value="" disabled selected>
                                    Select a user
                                </option>
                                {/* Dynamic options can be added here */}
                            </select>
                        </div>

                        <div className="flex justify-end gap-3">
                            <button
                                type="button"
                                className="px-6 py-2 bg-gray-300 rounded-lg text-gray-700 hover:bg-gray-400 focus:outline-none"
                                onClick={onClose}
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="px-6 py-2 bg-blue-600 rounded-lg text-white hover:bg-blue-700 focus:outline-none"
                            >
                                Save
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};
