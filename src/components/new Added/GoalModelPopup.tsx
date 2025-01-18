import React, { useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
    DialogDescription,
} from '../common/Dialog';
import { Button } from '../common/Button';
import { Input } from '../common/Inputs';
import { Label } from '../common/Lable';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '../common/Select';
import { Calendar as CalendarIcon, Plus, X } from 'lucide-react';
import { Calendar } from '../common/Celender';
import { Popover, PopoverContent, PopoverTrigger } from '../common/Popover';
import { format } from 'date-fns';

interface AddGoalModalProps {
    isOpen: boolean;
    onClose: () => void;
    onAddGoal: (goal: Omit<Goal, 'id'>) => void;
}

const AddGoalModal: React.FC<AddGoalModalProps> = ({ isOpen, onClose, onAddGoal }) => {
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');
    const [target, setTarget] = useState('');
    const [deadline, setDeadline] = useState<Date>();
    const [milestones, setMilestones] = useState<string[]>(['']);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!title || !category || !target || !deadline) return;

        const newGoal = {
            title,
            category,
            target,
            deadline: format(deadline, 'yyyy-MM-dd'),
            progress: 0,
            status: 'On Track' as const,
            milestones: milestones
                .filter(m => m.trim() !== '')
                .map(title => ({ title, completed: false })),
        };

        onAddGoal(newGoal);
        resetForm();
        onClose();
    };

    const resetForm = () => {
        setTitle('');
        setCategory('');
        setTarget('');
        setDeadline(undefined);
        setMilestones(['']);
    };

    const addMilestone = () => {
        setMilestones([...milestones, '']);
    };

    const removeMilestone = (index: number) => {
        setMilestones(milestones.filter((_, i) => i !== index));
    };

    const updateMilestone = (index: number, value: string) => {
        const newMilestones = [...milestones];
        newMilestones[index] = value;
        setMilestones(newMilestones);
    };

    return (
        <Dialog open={isOpen} onOpenChange={() => {
            resetForm();
            onClose();
        }}>
            <DialogContent
                className="sm:max-w-md"
                aria-describedby="goal-form-description"
            >
                <DialogHeader>
                    <DialogTitle>Add New Goal</DialogTitle>
                    <DialogDescription id="goal-form-description">
                        Create a new goal with specific targets and milestones. Fill out the form below to get started.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="title">Goal Title</Label>
                        <Input
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Enter goal title"
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="category">Category</Label>
                        <Select value={category} onValueChange={setCategory} required>
                            <SelectTrigger id="category">
                                <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Weight Management">Weight Management</SelectItem>
                                <SelectItem value="Cardio">Cardio</SelectItem>
                                <SelectItem value="Strength">Strength</SelectItem>
                                <SelectItem value="Wellness">Wellness</SelectItem>
                                <SelectItem value="Nutrition">Nutrition</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="target">Target</Label>
                        <Input
                            id="target"
                            value={target}
                            onChange={(e) => setTarget(e.target.value)}
                            placeholder="Enter target (e.g., Lose 10kg)"
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <Label>Deadline</Label>
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                    variant="outline"
                                    className="w-full justify-start text-left font-normal"
                                    type="button"
                                >
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {deadline ? format(deadline, 'PPP') : <span>Pick a date</span>}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                                <Calendar
                                    mode="single"
                                    selected={deadline}
                                    onSelect={setDeadline}
                                    initialFocus
                                />
                            </PopoverContent>
                        </Popover>
                    </div>

                    <div className="space-y-2">
                        <Label>Milestones</Label>
                        <div className="space-y-2">
                            {milestones.map((milestone, index) => (
                                <div key={index} className="flex gap-2">
                                    <Input
                                        value={milestone}
                                        onChange={(e) => updateMilestone(index, e.target.value)}
                                        placeholder="Enter milestone"
                                        aria-label={`Milestone ${index + 1}`}
                                    />
                                    {milestones.length > 1 && (
                                        <Button
                                            type="button"
                                            variant="outline"
                                            size="icon"
                                            onClick={() => removeMilestone(index)}
                                            aria-label={`Remove milestone ${index + 1}`}
                                        >
                                            <X className="h-4 w-4" />
                                        </Button>
                                    )}
                                </div>
                            ))}
                            <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={addMilestone}
                                className="mt-2"
                            >
                                <Plus className="h-4 w-4 mr-2" />
                                Add Milestone
                            </Button>
                        </div>
                    </div>

                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={onClose}>
                            Cancel
                        </Button>
                        <Button type="submit">Create Goal</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default AddGoalModal;