import { configureStore } from '@reduxjs/toolkit';
import usersReducer from './slices/UserSlice.tsx';
import editUserFormReducer from './slices/editUserFormSlice.tsx';

export const store = configureStore({
    reducer: {
        users: usersReducer,
        editUserForm: editUserFormReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
