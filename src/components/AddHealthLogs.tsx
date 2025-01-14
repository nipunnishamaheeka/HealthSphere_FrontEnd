import React from "react";

interface AddHealthLogProps {
    onClose: () => void;
    onAdd: (healthlogs: any) => void;
}
export const AddHealthLogs: React.FC<AddHealthLogProps> = ({ onClose, onAdd }) =>  {
    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const formData = new FormData(form);
        const userName = formData.get("userName") as string;
        const date = formData.get("date") as string;
        const weight = formData.get("weight") as string;
        const bloodPressure = formData.get("blood_pressure") as string;
        const sleepHours = formData.get("sleep_hours") as string;
        const waterIntake = formData.get("water_intake") as string;
        const healthLog = { userName, date, weight, bloodPressure,sleepHours,waterIntake };
        onAdd(healthLog);
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
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">Add Logs</h2>
                    <form className="space-y-4" onSubmit={handleSave}>
                        <div>
                            <label htmlFor="logId" className="block text-sm font-medium text-gray-700">
                                Log ID
                            </label>
                            <input
                                type="text"
                                name="logId"
                                id="logId"
                                className="w-full mt-1 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="userName" className="block text-sm font-medium text-gray-700">
                                User Name
                            </label>
                            <select
                                name="userName"
                                id="userName"
                                className="w-full mt-1 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            >
                                <option value="" disabled selected>
                                    Select a user
                                </option>
                                <option value="trainer">Trainer</option>
                            </select>
                        </div>


                        <div>
                            <label htmlFor="date" className="block text-sm font-medium text-gray-700">
                                Date
                            </label>
                            <input
                                type="date"
                                name="date"
                                id="date"
                                className="w-full mt-1 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="weight" className="block text-sm font-medium text-gray-700">
                                Weight
                            </label>
                            <input
                                type="text"
                                name="weight"
                                id="weight"
                                className="w-full mt-1 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="bloodPressure" className="block text-sm font-medium text-gray-700">
                                Blood Pressure
                            </label>
                            <input
                                type="text"
                                name="bloodPressure"
                                id="bloodPressure"
                                className="w-full mt-1 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="sleepHours" className="block text-sm font-medium text-gray-700">
                                Sleep Hours
                            </label>
                            <input
                                type="number"
                                name="sleepHours"
                                id="sleepHours"
                                className="w-full mt-1 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="waterIntake" className="block text-sm font-medium text-gray-700">
                                Water Intake (Liters)
                            </label>
                            <input
                                type="number"
                                name="waterIntake"
                                id="waterIntake"
                                className="w-full mt-1 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                step="0.1" // Allows input in decimal values for precise liter measurements
                                min="0" // Ensures only positive values are entered
                                placeholder="Enter water intake in liters"
                                required
                            />
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