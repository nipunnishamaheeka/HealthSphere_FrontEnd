import React, { useState, FormEvent } from 'react';
import { X, Plus, User, Mail, Phone, Calendar } from 'lucide-react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "./common/Dialog";
import { Button } from "./common/Button";
import { Input } from "./common/Inputs";
import { Label } from "./common/Lable";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./common/Select";

const AddTrainerPopups: React.FC = () => {
    const [showTrainerModal, setShowTrainerModal] = useState<boolean>(false);
    const [showClientModal, setShowClientModal] = useState<boolean>(false);

    const handleTrainerSubmit = (e: FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        // Handle trainer form submission
        setShowTrainerModal(false);
    };

    const handleClientSubmit = (e: FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        // Handle client form submission
        setShowClientModal(false);
    };

    return (
        <>
            {/* Add Trainer Button */}
            <button
                onClick={() => setShowTrainerModal(true)}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 flex items-center space-x-2"
            >
                <Plus className="h-5 w-5" />
                <span>Add Trainer</span>
            </button>

            {/* Add Trainer Modal */}
            <Dialog open={showTrainerModal} onOpenChange={setShowTrainerModal}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Add New Trainer</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleTrainerSubmit}>
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="trainerName">Full Name</Label>
                                <Input
                                    id="trainerName"
                                    placeholder="Enter trainer's full name"
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="trainerEmail">Email</Label>
                                <Input
                                    id="trainerEmail"
                                    type="email"
                                    placeholder="Enter trainer's email"
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="trainerPhone">Phone</Label>
                                <Input
                                    id="trainerPhone"
                                    type="tel"
                                    placeholder="Enter trainer's phone number"
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="specialization">Specialization</Label>
                                <Select>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select specialization" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="weightLoss">Weight Loss</SelectItem>
                                        <SelectItem value="muscleGain">Muscle Gain</SelectItem>
                                        <SelectItem value="flexibility">Flexibility</SelectItem>
                                        <SelectItem value="cardio">Cardio</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        <DialogFooter className="mt-6">
                            <Button type="button" variant="outline" onClick={() => setShowTrainerModal(false)}>
                                Cancel
                            </Button>
                            <Button type="submit">Add Trainer</Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>

            {/* Add Client Modal */}
            <Dialog open={showClientModal} onOpenChange={setShowClientModal}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Add New Client</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleClientSubmit}>
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="clientName">Full Name</Label>
                                <Input
                                    id="clientName"
                                    placeholder="Enter client's full name"
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="clientEmail">Email</Label>
                                <Input
                                    id="clientEmail"
                                    type="email"
                                    placeholder="Enter client's email"
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="clientPhone">Phone</Label>
                                <Input
                                    id="clientPhone"
                                    type="tel"
                                    placeholder="Enter client's phone number"
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="program">Training Program</Label>
                                <Select>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select program" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="weightLoss">Weight Loss Program</SelectItem>
                                        <SelectItem value="muscleGain">Muscle Gain Program</SelectItem>
                                        <SelectItem value="maintenance">Fitness Maintenance</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="trainer">Assign Trainer</Label>
                                <Select>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select trainer" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="trainer1">John Smith</SelectItem>
                                        <SelectItem value="trainer2">Sarah Wilson</SelectItem>
                                        <SelectItem value="trainer3">Mike Johnson</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="startDate">Start Date</Label>
                                <Input
                                    id="startDate"
                                    type="date"
                                    required
                                />
                            </div>
                        </div>

                        <DialogFooter className="mt-6">
                            <Button type="button" variant="outline" onClick={() => setShowClientModal(false)}>
                                Cancel
                            </Button>
                            <Button type="submit">Add Client</Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default AddTrainerPopups;
