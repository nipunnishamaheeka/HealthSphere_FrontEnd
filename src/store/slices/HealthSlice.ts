import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { HealthState, HealthLog, HealthFormData } from '../../types/type';
import { Heart, Droplets, Moon, Weight } from 'lucide-react';

const initialState: HealthState = {
    metrics: [
        {
            icon: Weight,
            label: 'Weight',
            value: '75.5 kg',
            trend: '+0.5 kg this week',
            color: 'text-purple-500',
        },
        {
            icon: Heart,
            label: 'Blood Pressure',
            value: '120/80',
            trend: 'Normal range',
            color: 'text-green-500',
        },
        {
            icon: Moon,
            label: 'Sleep',
            value: '7h 23m',
            trend: '30min less than usual',
            color: 'text-blue-500',
        },
        {
            icon: Droplets,
            label: 'Water Intake',
            value: '2.4L',
            trend: '80% of daily goal',
            color: 'text-cyan-500',
        },
    ],
    logs: [],
    formData: {
        weight: '',
        systolic: '',
        diastolic: '',
        sleepHours: '',
        waterIntake: ''
    },
    status: 'idle',
    error: null
};

const healthSlice = createSlice({
    name: 'health',
    initialState,
    reducers: {
        updateFormData: (state, action: PayloadAction<{ field: keyof HealthFormData; value: string }>) => {
            state.formData[action.payload.field] = action.payload.value;
        },
        resetFormData: (state) => {
            state.formData = initialState.formData;
        },
        addHealthLog: (state, action: PayloadAction<HealthLog>) => {
            state.logs.unshift(action.payload);
            // Update metrics based on latest log
            state.metrics = state.metrics.map(metric => {
                switch (metric.label) {
                    case 'Weight':
                        return {
                            ...metric,
                            value: `${action.payload.weight} kg`
                        };
                    case 'Blood Pressure':
                        return {
                            ...metric,
                            value: action.payload.bloodPressure
                        };
                    case 'Sleep':
                        return {
                            ...metric,
                            value: `${action.payload.sleepHours}h`
                        };
                    case 'Water Intake':
                        return {
                            ...metric,
                            value: `${action.payload.waterIntake}L`
                        };
                    default:
                        return metric;
                }
            });
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
    updateFormData,
    resetFormData,
    addHealthLog,
    setError,
    clearError
} = healthSlice.actions;

export default healthSlice.reducer;