import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface User {
    id: string;
    name: string;
    email: string;
    role: string;
    userName: string;
    mealPlanner: 'Yes' | 'No';
    status: 'Online' | 'Offline';
    image: string;
}

const initialState: User[] = [
    {
        id: '1',
        name: 'Neil Sims',
        email: 'neil.sims@flowbite.com',
        role: 'Admin',
        userName: 'john_doe',
        mealPlanner: 'Yes',
        status: 'Online',
        image: 'https://smartcdn.gprod.postmedia.digital/healthing/wp-content/uploads/2021/02/GettyImages-1081891678-1-scaled.jpg?quality=90&strip=all&w=704&h=395',
    },
    // {
    //     id: '2',
    //     name: 'Bonnie Green',
    //     email: 'bonnie@flowbite.com',
    //     position: 'Designer',
    //     status: 'Online',
    //     image: '/docs/images/people/profile-picture-3.jpg',
    // },
];

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        editUser(state, action: PayloadAction<User>) {
            const index = state.findIndex((user) => user.id === action.payload.id);
            if (index !== -1) {
                state[index] = action.payload;
            }
        },
    },
});

export const { editUser } = usersSlice.actions;
export default usersSlice.reducer;
