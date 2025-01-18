import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Trainer {
    trainer_id: string;
    name: string;
    email: string;
    role: string;
    userName: string;
    mealPlanner: "Yes" | "No";
    status: "Online" | "Offline";
    image: string;
}

interface TrainerState {
    trainers: Trainer[];
}

const initialState: TrainerState = {
    trainers: [
        {
            trainer_id: "1",
            name: "John Doe",
            email: "john.doe@example.com",
            role: "Trainer",
            userName: "johndoe",
            mealPlanner: "Yes",
            status: "Online",
            image: "https://randomuser.me/api/portraits/men/1.jpg",
        },
    ],
};

const trainerSlice = createSlice({
    name: "trainer",
    initialState,
    reducers: {
        // Add a new trainer
        addTrainer(state, action: PayloadAction<Trainer>) {
            state.trainers.push(action.payload);
        },

        // Remove a trainer by ID
        removeTrainer(state, action: PayloadAction<string>) {
            state.trainers = state.trainers.filter((trainer) => trainer.trainer_id !== action.payload);
        },

        // Update a trainer by ID
        updateTrainer(state, action: PayloadAction<Trainer>) {
            const index = state.trainers.findIndex((trainer) => trainer.trainer_id === action.payload.trainer_id);
            if (index !== -1) {
                state.trainers[index] = action.payload;
            }
        },

        // Reset the form (clear trainers list)
        resetForm() {
            return initialState;
        },
    },
});

export const { addTrainer, removeTrainer, updateTrainer, resetForm } = trainerSlice.actions;

export default trainerSlice.reducer;
