import axios from "axios";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {apiInstance} from "../../api/api-instance";

interface UserState {
    jwt_token: string | null;
    refresh_token: string | null;
    username: string | null;
    isAuthenticated: boolean;
    loading: boolean;
    error: string;
    userDetail?: any;
}

const initialState: UserState = {
    jwt_token: null,
    refresh_token: null,
    username: null,
    isAuthenticated: false,
    loading: false,
    error: "",
};

const api = axios.create({
    baseURL: "http://localhost:3000/user",
    // headers: {
    //     'Content-Type': 'application/json',
    // },
});

// Change your API calls to use the proxy path
export const registerUser = createAsyncThunk(
    'user/register',
    async (user: any, { rejectWithValue }) => {
        try {
            // Changed URL to use the proxy
            const response = await axios.post('/api/user/register', user);
            return response.data;
        } catch (error: any) {
            console.log('Register error:', error.message);
            return rejectWithValue(error.response?.data || { message: 'Registration failed' });
        }
    }
);

// Change login API call to use the proxy
export const loginUser = createAsyncThunk(
    'user/login',
    async (user: any, {rejectWithValue}) => {
        try {
            console.log("Logging in user:", user);
            const response = await axios.post('/api/user/login', user, {withCredentials: true});
            console.log("Login response:", response.data);
            return response.data;
        } catch (err: any) {
            console.log("Login error:", err.message, err.response?.data);
            return rejectWithValue(err.response?.data?.message || "Failed to login user");
        }
    }
);

export const refreshToken = createAsyncThunk(
    'user/refreshToken',
    async (refreshToken: string, {rejectWithValue}) => {
        try {
            const response = await api.post('/refresh-token', {refreshToken}, {withCredentials: true});
            return response.data;
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || "Token refresh failed");
        }
    }
);

export const fetchUserAccount = createAsyncThunk(
    'user/fetchUserAccount',
    async (username: string, {rejectWithValue}) => {
        try {
            const response = await apiInstance.get(`user/get-user`, {params: {username}});
            console.log(response.data);
            return response.data; // Added return to actually return the data
        } catch (err: any) {
            console.log(err);
            return rejectWithValue(err.response?.data?.message || "Failed to fetch user account");
        }
    }
);

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        logOutUser(state) {
            state.isAuthenticated = false;
            state.jwt_token = null;
            state.refresh_token = null;
            state.username = null;
        },
        updateTokens(state, action) {
            state.jwt_token = action.payload.jwt_token;
            state.refresh_token = action.payload.refresh_token;
        },
    },
    extraReducers(builder) {
        builder.addCase(registerUser.pending, (state) => {
            state.loading = true;
            state.error = "";
        });
        builder.addCase(registerUser.fulfilled, (state) => {
            state.loading = false;
            state.isAuthenticated = false;
            state.error = "";
        });
        builder.addCase(registerUser.rejected, (state, action) => {
            state.loading = false;
            state.isAuthenticated = false;
            state.error = action.payload as string;
        });

        builder.addCase(loginUser.pending, (state) => {
            state.loading = true;
            state.error = "";
        });
        builder.addCase(loginUser.fulfilled, (state, action) => {
            state.loading = false;
            state.isAuthenticated = true;
            state.jwt_token = action.payload.accessToken;
            state.refresh_token = action.payload.refreshToken;
            state.username = action.payload.username;
            state.error = "";
        });
        builder.addCase(loginUser.rejected, (state, action) => {
            state.loading = false;
            state.isAuthenticated = false;
            state.error = action.payload as string;
        });

        builder.addCase(refreshToken.pending, (state) => {
            state.loading = true;
            state.error = "";
        });
        builder.addCase(refreshToken.fulfilled, (state, action) => {
            state.loading = false;
            state.isAuthenticated = true;
            state.jwt_token = action.payload.accessToken;
            state.refresh_token = action.payload.refreshToken;
            state.error = "";
        });
        builder.addCase(refreshToken.rejected, (state, action) => {
            state.loading = false;
            state.isAuthenticated = false;
            state.error = action.payload as string;
        });
        builder.addCase(fetchUserAccount.pending, (state) => {
            state.loading = true;
            state.error = "";
        });
        builder.addCase(fetchUserAccount.fulfilled, (state, action) => {
            state.loading = false;
            state.userDetail = action.payload;
        });
        builder.addCase(fetchUserAccount.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        });
    },
});

export const {logOutUser, updateTokens} = userSlice.actions;
export default userSlice.reducer;