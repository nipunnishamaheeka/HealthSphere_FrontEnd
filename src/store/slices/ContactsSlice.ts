import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Contact, ContactsState } from '../../types/type';

const initialState: ContactsState = {
    contacts: [{
        id: 1,
        name: "John Doe",
        relationship: "Father",
        phone: "+1 (555) 123-4567",
        email: "john.doe@email.com"
    }],
    status: 'idle',
    error: null
};

const contactsSlice = createSlice({
    name: 'contacts',
    initialState,
    reducers: {
        addContact: (state, action: PayloadAction<Contact>) => {
            state.contacts.push(action.payload);
        },
        removeContact: (state, action: PayloadAction<number>) => {
            if (state.contacts.length > 1) {
                state.contacts = state.contacts.filter(contact => contact.id !== action.payload);
            }
        },
        updateContact: (state, action: PayloadAction<Contact>) => {
            const index = state.contacts.findIndex(contact => contact.id === action.payload.id);
            if (index !== -1) {
                state.contacts[index] = action.payload;
            }
        },
        setContacts: (state, action: PayloadAction<Contact[]>) => {
            state.contacts = action.payload;
        },
        setError: (state, action: PayloadAction<string>) => {
            state.status = 'failed';
            state.error = action.payload;
        },
        clearError: (state) => {
            state.status = 'idle';
            state.error = null;
        }
    }
});

export const {
    addContact,
    removeContact,
    updateContact,
    setContacts,
    setError,
    clearError
} = contactsSlice.actions;

export default contactsSlice.reducer;