import React from "react";

interface DeleteTrainerPopupProps {
    close: (action: "yes" | "no") => void;
}

export const DeleteTrainerPopup: React.FC<DeleteTrainerPopupProps> = ({ close }) => {
    return (
        <div className="fixed inset-0  bg-opacity-50 flex justify-center items-center z-50">
            <div className="w-1/4 bg-white p-4 rounded-lg">
                <div className="flex justify-between">
                    <div className="flex items-center">
                        <img src="https://cdn-icons-png.flaticon.com/512/4201/4201973.png" className="w-5" alt="Warning Icon" />
                        <h1 className="font-medium body-font ms-3">Delete Shop</h1>
                    </div>
                    <div onClick={() => close("no")} className="cursor-pointer">
                        &times;
                    </div>
                </div>
                <div className="mt-5">
                    <h1 className="text-lg">Are you sure you want to delete this shop?</h1>
                </div>
                <div className="flex justify-around mt-4">
                    <button
                        className="px-4 py-2 bg-gray-300 text-black rounded-lg mr-2"
                        onClick={() => close("no")}
                    >
                        Cancel
                    </button>
                    <button
                        className="px-4 py-2 bg-red-600 text-white rounded-lg"
                        onClick={() => close("yes")}
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
};
