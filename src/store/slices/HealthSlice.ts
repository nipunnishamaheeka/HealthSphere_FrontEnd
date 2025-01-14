import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface HealthLog {
    log_id: string;
    user_id: string;
    date: string;
    weight: string;
    blood_pressure: string;
    sleep_hours: string;
    water_intake: string;
}

interface HealthLogState {
    healthLogs: HealthLog[];
}

const initialState: HealthLogState = {
    healthLogs: [
        {
            log_id: "log1",
            user_id: "user123",
            date: "2025-01-01",
            weight: "70kg",
            blood_pressure: "120/80",
            sleep_hours: "7",
            water_intake: "2L"
        },
    ],
};

const healthSlice = createSlice({
    name: "healthLogs",
    initialState,
    reducers: {
        // Add a new log
        addLogs(state, action: PayloadAction<HealthLog>) {
            state.healthLogs.push(action.payload);
        },

        // Remove a log by ID
        removeLogs(state, action: PayloadAction<string>) {
            state.healthLogs = state.healthLogs.filter((healthLogs) => healthLogs.log_id !== action.payload);
        },

        // Update a log by ID
        updateLogs(state, action: PayloadAction<HealthLog>) {
            const index = state.healthLogs.findIndex((healthLogs) => healthLogs.log_id === action.payload.id);
            if (index !== -1) {
                state.healthLogs[index] = action.payload;
            }
        },

        // Reset the form (clear logs list)
        resetForm() {
            return initialState;
        },
    },
});

export const { addLogs, removeLogs, updateLogs, resetForm } = healthSlice.actions;

export default healthSlice.reducer;
