import { configureStore } from '@reduxjs/toolkit';
import personaReducer, { PersonaState } from './personaSlice';

const store = configureStore({
    reducer: {
        persona: personaReducer
    }
});

export default store;

export type RootState = {
    persona: PersonaState;
};

export type AppDispatch = typeof store.dispatch;
