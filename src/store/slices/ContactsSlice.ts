import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {EmergencyContactModel} from "../../model/EmergencyContactModel";
import axios from "axios";

export const initialState: EmergencyContactModel[] = [];

const api = axios.create({
    baseURL: "/api/emergencycontact",
})

export const getEmergencyContacts = createAsyncThunk(
    "health/getEmergencyContacts",
    async (_,{rejectWithValue}) => {
        try {
            const response = await api.get("/get");
            console.log("Fetched Emergency Contacts:", response.data);
            return response.data as EmergencyContactModel[];
        }catch (err:any){
            console.error("Error fetching emergency contacts:", err);
            return rejectWithValue(err.response?.data || "Failed to fetch emergency contacts");
        }
    });

export const saveEmergencyContact = createAsyncThunk(
    "health/saveEmergencyContact",
    async (emergencyContact: EmergencyContactModel, {rejectWithValue}) => {
        try {
            const response = await api.post("/post", emergencyContact);
            console.log("Saved Emergency Contact:", response.data);
            return response.data as EmergencyContactModel;
        } catch (error: any) {
            console.error("Error saving emergency contact:", error);
            return rejectWithValue(error.response?.data || "Failed to save emergency contact");
        }
    }
);

export const updateEmergencyContact = createAsyncThunk(
    "health/updateEmergencyContact",
    async (emergencyContact: EmergencyContactModel, {rejectWithValue}) => {
        try {
            const response = await api.put(`/update/${emergencyContact.user_id}`, emergencyContact);
            console.log("Updated Emergency Contact:", response.data);
            return response.data as EmergencyContactModel;
        }catch (err: any){
            console.log("Error updating emergency contact:", err);
            return rejectWithValue(err.response?.data || "Failed to update emergency contact");
        }
    }
);

export const deleteEmergencyContact = createAsyncThunk(
    "health/deleteEmergencyContact",
    async (user_id: string, {rejectWithValue}) => {
        try {
            await api.delete(`/delete/${user_id}`);
            console.log(`Deleted Emergency Contact with user_id: ${user_id}`);
            return user_id; // Return the user_id for the reducer
        } catch (err: any) {
            console.error("Error deleting emergency contact:", err);
            return rejectWithValue(err.response?.data || "Failed to delete emergency contact");
        }
    });

const contactsSlice = createSlice({
    name: 'contacts',
    initialState,
    reducers: {
        // Add a reducer to handle local updates
        updateContactLocally: (state, action: PayloadAction<EmergencyContactModel>) => {
            const index = state.findIndex(contact => contact.user_id === action.payload.user_id);
            if (index !== -1) {
                state[index] = action.payload;
            }
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getEmergencyContacts.fulfilled,(state,action:PayloadAction<EmergencyContactModel[]>) => {
                console.log("Fetched Emergency Contacts:", action.payload);
                return action.payload;
            })
            .addCase(getEmergencyContacts.rejected, (_, action) => {
                console.log("Failed to fetch emergency contacts:", action.payload);
            })
        builder
            .addCase(saveEmergencyContact.fulfilled,(state,action:PayloadAction<EmergencyContactModel>) => {
                console.log("Saved Emergency Contact:", action.payload);
                state.push(action.payload);
            })
            .addCase(saveEmergencyContact.rejected, (_, action) => {
                console.log("Failed to save emergency contact:", action.payload);
            })
        builder
            .addCase(updateEmergencyContact.fulfilled,(state,action:PayloadAction<EmergencyContactModel>) => {
                console.log("Updated Emergency Contact:", action.payload);
                const index = state.findIndex(contact => contact.user_id === action.payload.user_id);
                if (index !== -1) {
                    state[index] = action.payload;
                }
            })
            .addCase(updateEmergencyContact.rejected, (_, action) => {
                console.log("Failed to update emergency contact:", action.payload);
            })
        builder
            .addCase(deleteEmergencyContact.fulfilled,(state,action: PayloadAction<string>) => {
                console.log(`Deleted Emergency Contact with Id ${action.payload} Successfully` );
                return state.filter((contact) => contact.user_id !== action.payload);
            })
            .addCase(deleteEmergencyContact.rejected, (_, action) => {
                console.log("Failed to delete emergency contact:", action.payload);
            })
    }
});

export const { updateContactLocally } = contactsSlice.actions;
export default contactsSlice.reducer;