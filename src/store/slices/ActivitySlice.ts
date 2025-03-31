import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { ActivityTrackerModel, ActivityState, ActivityFormData } from "../../types/ActivityTypes";

const initialState: ActivityState = {
    activities: [],
    weeklyProgress: {},
    isLoading: false,
    error: null,
};

const api = axios.create({
    baseURL: "/api/activitytracker",
    headers: {
        'Content-Type': 'application/json',
    },
});



// Fixed thunk definitions with proper types
export const fetchActivities = createAsyncThunk<
    ActivityTrackerModel[],
    void,
    { rejectValue: string }
>("activity/fetchActivities", async (_, { rejectWithValue }) => {
    try {
        const { data } = await api.get("/get");
        return data.map((activity: ActivityTrackerModel) => ({
            ...activity,
            date: new Date(activity.date)
        }));
    } catch (error: any) {
        return rejectWithValue(error.response?.data?.message || "Failed to fetch activities");
    }
});

export const saveActivity = createAsyncThunk<
    ActivityTrackerModel,
    ActivityFormData,
    { rejectValue: string }
>("activity/saveActivity", async (activity, { rejectWithValue }) => {
    try {
        const { data } = await api.post("/post", activity);
        return {
            ...data,
            date: new Date(data.date)
        };
    } catch (error: any) {
        return rejectWithValue(error.response?.data?.message || "Failed to save activity");
    }
});

export const updateActivity = createAsyncThunk<
    ActivityTrackerModel,
    ActivityTrackerModel,
    { rejectValue: string }
>("activity/updateActivity", async (activity, { rejectWithValue }) => {
    try {
        const { data } = await api.patch(`/put${activity.id}`, activity);
        return {
            ...data,
            date: new Date(data.date)
        };
    } catch (error: any) {
        return rejectWithValue(error.response?.data?.message || "Failed to update activity");
    }
});

// export const deleteActivity = createAsyncThunk<
//     string,
//     string,
//     { rejectValue: string }
// >("activity/deleteActivity", async (id, { rejectWithValue }) => {
//     try {
//         await api.delete(`/delete${id}`);
//         return id;
//     } catch (error: any) {
//         return rejectWithValue(error.response?.data?.message || "Failed to delete activity");
//     }
// });

export const deleteActivity = createAsyncThunk(
    "activity/deleteActivity",
    async (id: string, { rejectWithValue }) => {
        try {
            await api.delete(`/delete/${id}`);
            return id;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || "Failed to delete activity");
        }
    }
)
const activitySlice = createSlice({
    name: "activity",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchActivities.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchActivities.fulfilled, (state, action) => {
                state.isLoading = false;
                state.activities = action.payload;
                state.weeklyProgress = {};
                action.payload.forEach(({ date, caloriesBurned, duration }) => {
                    const formattedDate = date.toISOString().split("T")[0];
                    if (!state.weeklyProgress[formattedDate]) {
                        state.weeklyProgress[formattedDate] = { calories: 0, duration: 0, count: 0 };
                    }
                    state.weeklyProgress[formattedDate].calories += caloriesBurned;
                    state.weeklyProgress[formattedDate].duration += duration;
                    state.weeklyProgress[formattedDate].count += 1;
                });
            })
            .addCase(fetchActivities.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload || "Failed to fetch activities";
            })
            .addCase(saveActivity.fulfilled, (state, action) => {
                state.activities.push(action.payload);
            })
            .addCase(updateActivity.fulfilled, (state, action) => {
                const index = state.activities.findIndex(
                    ({ id }) => id === action.payload.id
                );
                if (index !== -1) {
                    state.activities[index] = action.payload;
                }
            })
            .addCase(deleteActivity.fulfilled, (state, action) => {
                state.activities = state.activities.filter(
                    ({ id }) => id !== action.payload
                );
            });
    },
});

// Selectors with proper types
export const selectTotalCalories = (state: { activity: ActivityState }) =>
    state.activity.activities.reduce((sum, { caloriesBurned }) => sum + caloriesBurned, 0);

export const selectTotalActiveTime = (state: { activity: ActivityState }) => {
    const totalMinutes = state.activity.activities.reduce((sum, { duration }) => sum + duration, 0);
    return `${Math.floor(totalMinutes / 60)}h ${totalMinutes % 60}m`;
};

export const selectWeeklyProgress = (state: { activity: ActivityState }) =>
    state.activity.weeklyProgress;

export default activitySlice.reducer;