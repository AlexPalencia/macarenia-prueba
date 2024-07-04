import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Persona {
    id?: string,
    tipo_documento: string;
    numero_documento: string;
    primer_nombre: string;
    segundo_nombre?: string;
    primer_apellido: string;
    segundo_apellido?: string;
    fecha_nacimiento?: string;
    genero: string;
    estado_civil: string;
    pais: string;
}

export interface PersonaState {
    persona: Persona;
}

const initialState: PersonaState = {
    persona: {
        tipo_documento: "",
        numero_documento: "",
        primer_nombre: "",
        primer_apellido: "",
        genero: "",
        estado_civil: "",
        pais: ""
    }
};

const personaSlice = createSlice({
    name: 'persona',
    initialState,
    reducers: {
        setEditPersona(state, action: PayloadAction<Persona>) {
            state.persona = action.payload;
        }
    }
});

export const { setEditPersona } = personaSlice.actions;
export default personaSlice.reducer;
