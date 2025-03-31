import { HealthLogModel } from "../../model/HealthModel";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

export const initialState: HealthLogModel[] = [];

// Use the proxy configured in vite.config.ts
const api = axios.create({
    baseURL: "/api/healthlog",
});

// ** Get all health logs **
export const getHealthLogs = createAsyncThunk(
    "health/getHealthLogs",
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.get("/get");
            console.log("Fetched Health Logs:", response.data);
            return response.data as HealthLogModel[];
        } catch (err: any) {
            console.error("Error fetching health logs:", err);
            return rejectWithValue(err.response?.data || "Failed to fetch health logs");
        }
    }
);

// ** Save a health log **
export const saveHealthLog = createAsyncThunk(
    "health/saveHealthLog",
    async (healthLog: HealthLogModel, { rejectWithValue }) => {
        try {
            const response = await api.post("/post", healthLog);
            console.log("Saved Health Log:", response.data);
            return response.data;
        } catch (error: any) {
            console.error("Error saving health log:", error);
            return rejectWithValue(error.response?.data || "Failed to save health log");
        }
    }
);

// ** Update a health log **
export const updateHealthLog = createAsyncThunk(
    "health/updateHealthLog",
    async (healthLog: HealthLogModel, { rejectWithValue }) => {
        try {
            const response = await api.put(`/update/${healthLog.log_id}`, healthLog);
            console.log("Updated Health Log:", response.data);
            return response.data as HealthLogModel;
        } catch (err: any) {
            console.error("Error updating health log:", err);
            return rejectWithValue(err.response?.data || "Failed to update health log");
        }
    }
);

// ** Delete a health log **
export const deleteHealthLog = createAsyncThunk(
    "health/deleteHealthLog",
    async (log_id: string, { rejectWithValue }) => {
        try {
            await api.delete(`/delete/${log_id}`);
            console.log(`Deleted Health Log with log_id: ${log_id}`);
            return log_id;
        } catch (err: any) {
            console.error("Error deleting health log:", err);
            return rejectWithValue(err.response?.data || "Failed to delete health log");
        }
    }
);

// ** Health Slice **
const healthSlice = createSlice({
    name: "health",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getHealthLogs.fulfilled, (state, action: PayloadAction<HealthLogModel[]>) => {
                console.log("Health Logs successfully fetched:", action.payload);
                return action.payload;
            })
            .addCase(getHealthLogs.rejected, (_, action) => {
                console.error("Failed to fetch health logs:", action.payload);
            });

        builder
            .addCase(saveHealthLog.fulfilled, (state, action: PayloadAction<HealthLogModel>) => {
                console.log("Health log saved successfully:", action.payload);
                state.push(action.payload);
            })
            .addCase(saveHealthLog.rejected, (_, action) => {
                console.error("Failed to save health log:", action.payload);
            })

        builder
            .addCase(updateHealthLog.fulfilled, (state, action: PayloadAction<HealthLogModel>) => {
                const index = state.findIndex((log) => log.log_id === action.payload.log_id);
                if (index !== -1) {
                    console.log("Health log updated successfully:", action.payload);
                    state[index] = action.payload;
                }
            })
            .addCase(updateHealthLog.rejected, (_, action) => {
                console.error("Failed to update health log:", action.payload);
            });

        builder
            .addCase(deleteHealthLog.fulfilled, (state, action: PayloadAction<string>) => {
                console.log(`Health log with log_id ${action.payload} deleted successfully`);
                return state.filter((log) => log.log_id !== action.payload);
            })
            .addCase(deleteHealthLog.rejected, (_, action) => {
                console.error("Failed to delete health log:", action.payload);
            });
    },
});

export default healthSlice.reducer;
