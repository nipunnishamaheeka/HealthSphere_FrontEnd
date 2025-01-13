import { configureStore } from '@reduxjs/toolkit';
// import usersReducer from './slices/UserSlice.ts';
// import editUserFormReducer from './slices/editUserFormSlice.ts';
import trainersReducer from './slices/trainerSlice.ts';
export const store = configureStore({
    reducer: {
        // users: usersReducer,
        // editUserForm: editUserFormReducer,
        trainer: trainersReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
