import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Metrics {
    attendance: string;
    completion: string;
    engagement: string;
}

interface Client {
    id: string;
    name: string;
    plan: string;
    progress: number;
    nextSession: string;
    alerts: number;
    metrics: Metrics;
}

interface Session {
    id: string;
    client: string;
    type: string;
    time: string;
    duration: string;
}

interface TrainerState {
    clients: Client[];
    sessions: Session[];
}

const initialState: TrainerState = {
    clients: [],
    sessions: [],
};

const trainerSlice = createSlice({
    name: 'trainer',
    initialState,
    reducers: {
        addClient: (state, action: PayloadAction<Client>) => {
            state.clients.push(action.payload);
        },
        updateClient: (state, action: PayloadAction<Client>) => {
            const index = state.clients.findIndex(client => client.id === action.payload.id);
            if (index !== -1) {
                state.clients[index] = action.payload;
            }
        },
        deleteClient: (state, action: PayloadAction<string>) => {
            state.clients = state.clients.filter(client => client.id !== action.payload);
        },
        addSession: (state, action: PayloadAction<Session>) => {
            state.sessions.push(action.payload);
        },
        updateSession: (state, action: PayloadAction<Session>) => {
            const index = state.sessions.findIndex(session => session.id === action.payload.id);
            if (index !== -1) {
                state.sessions[index] = action.payload;
            }
        },
        deleteSession: (state, action: PayloadAction<string>) => {
            state.sessions = state.sessions.filter(session => session.id !== action.payload);
        },
    },
});

export const {
    addClient,
    updateClient,
    deleteClient,
    addSession,
    updateSession,
    deleteSession,
} = trainerSlice.actions;

export default trainerSlice.reducer;
