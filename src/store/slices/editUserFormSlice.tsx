import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface EditUserForm {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    department: string;
    company: string;
    currentPassword: string;
    newPassword: string;
}

const initialState: EditUserForm = {
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    department: '',
    company: '',
    currentPassword: '',
    newPassword: '',
};

const editUserFormSlice = createSlice({
    name: 'editUserForm',
    initialState,
    reducers: {
        updateForm(state, action: PayloadAction<{ field: string; value: string }>) {
            const { field, value } = action.payload;
            (state as any)[field] = value;
        },
        resetForm() {
            return initialState;
        },
    },
});

export const { updateForm, resetForm } = editUserFormSlice.actions;
export default editUserFormSlice.reducer;
