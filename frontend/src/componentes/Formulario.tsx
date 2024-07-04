import { SetStateAction, useState, useEffect } from 'react'
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import { Button, Grid, InputAdornment, TextField } from '@mui/material';
import { CalendarMonth, Save, Close, CleaningServices } from '@mui/icons-material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import dayjs, { Dayjs } from 'dayjs';
import LabelInfo from './Label';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import ModalAlarma from './ModalAlarma';
import ModalAlarma2 from './ModalAlarma';
import { postData, editData } from '../lib/utils';
import { useSelector, } from 'react-redux';
import { RootState,  } from '../lib/store';

enum TiposAlarma {
    Success,
    Info,
    Error
}

interface ConfigAlarma {
    mensaje?: string,
    icono?: string,
    colorIcono?: string,
}

interface Persona {
    tipo_documento: string,
    numero_documento: string,
    primer_nombre: string,
    segundo_nombre?: string,
    primer_apellido: string,
    segundo_apellido?: string,
    fecha_nacimiento?: string,
    genero: string,
    estado_civil: string,
    pais: string,
}

const listaGeneros = [
    {id: 1, label: 'Mujer'},
    {id: 2, label: 'Hombre'},
    {id: 3, label: 'Otros'},
]

const listaEstadoCivil = [
    {id: 1, label: 'Soltero'},
    {id: 2, label: 'Casado'},
    {id: 3, label: 'Viudo'},
    {id: 4, label: 'Unión Libre'},
    {id: 5, label: 'Divorciado'},
]

const listaPaises = [
    {id: 1, label: 'Colombia'},
    {id: 2, label: 'Francia'},
    {id: 3, label: 'USA'},
    {id: 4, label: 'México'},
    {id: 5, label: 'China'},
]

const Formulario = ({
    tipo_doc,
    num_doc,
    handleCancelar
}: {
    tipo_doc: string,
    num_doc: string,
    handleCancelar: () => void
}) => {
    const personaEdit = useSelector((state: RootState) => state.persona.persona);
    const [openDialogAlarma, setOpenDialogAlarma] = useState(false);
    const [openDialogAlarma2, setOpenDialogAlarma2] = useState(false);
    const [configModalAlarma, setConfigModalAlarma] = useState<ConfigAlarma>();
    // State del formulario
    const [primerNombre, setPrimerNombre] = useState('');
    const [segundoNombre, setSegundoNombre] = useState<string | undefined>('');
    const [primerApellido, setPrimerApellido] = useState('');
    const [segundoApellido, setSegundoApellido] = useState<string | undefined>('');
    const [fecha_nacimiento, setFechaNacimiento] = useState<Dayjs | null>(null);
    const [paisNacimiento, setPaisNacimiento] = useState('');
    const [genero, setGenero] = useState('');
    const [estadoCivil, setEstadoCivil] = useState('');

    const handleChangeFechaNacimiento = (event: SetStateAction<Dayjs | null>) => {
        console.log(event);
        setFechaNacimiento(event);
    }

    const handleChangePaisNacimiento = (event: SelectChangeEvent) => {
        setPaisNacimiento(event.target.value);
    }
    
    const handleChangeGenero = (event: SelectChangeEvent) => {       
        setGenero(event.target.value);
    }

    const handleChangeEstadoCivil = (event: SelectChangeEvent) => {
        setEstadoCivil(event.target.value);
    }

    const handleOpenClosedialogAlarma = () => {
        setOpenDialogAlarma(!openDialogAlarma);
    }

    const handleOpenClosedialogAlarma2 = () => {
        setOpenDialogAlarma2(!openDialogAlarma2);
    }

    const showAlarma = (tipo: TiposAlarma ) => {
        switch (tipo) {
            case TiposAlarma.Success:
                setConfigModalAlarma({
                    mensaje: 'Información guardada con éxito',
                    icono: 'check_circle',
                    colorIcono: 'green'
                })
                handleOpenClosedialogAlarma();
                break;
            case TiposAlarma.Info:
                setConfigModalAlarma({
                    mensaje: 'Se limpiará la información del formulario',
                    icono: 'info',
                    colorIcono: '#fdd835'
                })
                handleOpenClosedialogAlarma2();
                break;
            case TiposAlarma.Error:
                setConfigModalAlarma({
                    mensaje: 'Los campos con (*) son obligatorios',
                    icono: 'error',
                    colorIcono: 'red'
                })
                handleOpenClosedialogAlarma();
                break;
            default:
                break;
        }
    }

    const handleAceptarFn = () => {
        setPrimerNombre('');
        setSegundoNombre('');
        setPrimerApellido('');
        setSegundoApellido('');
        setFechaNacimiento(null);
        setGenero('');
        setPaisNacimiento('');
        setEstadoCivil('');
        handleOpenClosedialogAlarma2();
    }

    const guardarPersona = async () => {
        if ([primerNombre,primerApellido,fecha_nacimiento,genero,paisNacimiento,estadoCivil].includes("")) {
            showAlarma(TiposAlarma.Error);
            return;
        }
        const persona: Persona = {
            tipo_documento: tipo_doc,
            numero_documento: num_doc,
            primer_nombre: primerNombre,
            segundo_nombre: segundoNombre,
            primer_apellido: primerApellido,
            segundo_apellido: segundoApellido,
            fecha_nacimiento: fecha_nacimiento?.format('YYYY-MM-DD'),
            genero: genero,
            estado_civil: estadoCivil,
            pais: paisNacimiento
        }
        // si existe Id entonces edita
        if (personaEdit.id) {
            await editData(`personas/${personaEdit.id}/`, persona).then((res) => {
                console.log(res);
                showAlarma(TiposAlarma.Success);
            }).catch((e) => {
                console.log(e);
                setConfigModalAlarma({
                    mensaje: 'Error inesperado',
                    icono: 'error',
                    colorIcono: 'red'
                })
                handleOpenClosedialogAlarma();
            })
        } else { // De lo contrario se crea un nuevo registro
            await postData('personas/', persona).then((res) => {
                console.log(res);
                showAlarma(TiposAlarma.Success);
            }).catch((e) => {
                console.log(e);
                setConfigModalAlarma({
                    mensaje: 'Error inesperado',
                    icono: 'error',
                    colorIcono: 'red'
                })
                handleOpenClosedialogAlarma();
            })
        }
    }

    useEffect(() => {
        if (personaEdit.id) {
            setPrimerNombre(personaEdit.primer_nombre);
            setSegundoNombre(personaEdit.segundo_nombre);
            setPrimerApellido(personaEdit.primer_apellido);
            setSegundoApellido(personaEdit.segundo_apellido);
            setFechaNacimiento(dayjs(personaEdit.fecha_nacimiento));
            setGenero(personaEdit.genero);
            setPaisNacimiento(personaEdit.pais);
            setEstadoCivil(personaEdit.estado_civil);
        } 
    }, [personaEdit]);

    return (
        <>
            <Box marginTop={2}>
                <LabelInfo texto='Información' />
                <Grid container spacing={3}>
                    <Grid item md={6}>
                        <TextField fullWidth label="Primer Nombre *" value={primerNombre} onChange={(e) => setPrimerNombre(e.target.value as string)} variant="outlined" size='small'/>
                    </Grid>
                    <Grid item md={6}>
                        <TextField fullWidth label="Segundo Nombre" value={segundoNombre} onChange={(e) => setSegundoNombre(e.target.value as string)} variant="outlined" size='small'/>
                    </Grid>
                    <Grid item md={6}>
                        <TextField fullWidth label="Primer Apellido *" value={primerApellido} onChange={(e) => setPrimerApellido(e.target.value as string)} variant="outlined" size='small'/>
                    </Grid>
                    <Grid item md={6}>
                        <TextField fullWidth label="Segundo Apellido" value={segundoApellido} onChange={(e) => setSegundoApellido(e.target.value as string)} variant="outlined" size='small'/>
                    </Grid>
                    <Grid item md={6}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <MobileDatePicker
                                label="Fecha de Nacimiento"
                                slotProps={{
                                    textField: {
                                        fullWidth: true,
                                        required: true,
                                        InputProps: {
                                            endAdornment: (
                                            <InputAdornment position="end"><CalendarMonth /></InputAdornment>
                                            ),
                                            size: 'small',
                                        }
                                    }
                                }}
                                disableFuture
                                format="YYYY-MM-DD"
                                value={fecha_nacimiento ? dayjs(fecha_nacimiento) : null}
                                onChange={handleChangeFechaNacimiento}
                                name="fecha_nacimiento"
                            />
                        </LocalizationProvider>
                    </Grid>
                    <Grid item md={6}>
                        <FormControl fullWidth>
                            <InputLabel sx={{top: '-8px'}} id="demo-simple-select-label" >País de nacimiento *</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={paisNacimiento}
                                label="País de nacimiento *"
                                onChange={handleChangePaisNacimiento}
                                size='small'
                            >
                                { listaPaises.map((item) => {
                                    return <MenuItem key={item.id} value={item.id}>{item.label}</MenuItem>
                                }) }
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item md={6}>
                        <FormControl fullWidth>
                            <InputLabel sx={{top: '-8px'}} id="demo-simple-select-label" >Género *</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={genero}
                                label="Género *"
                                onChange={handleChangeGenero}
                                size='small'
                            >
                                { listaGeneros.map((item) => {
                                    return <MenuItem key={item.id} value={item.id}>{item.label}</MenuItem>
                                }) }
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item md={6}>
                        <FormControl fullWidth>
                            <InputLabel sx={{top: '-8px'}} id="demo-simple-select-label" >Estado civil *</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={estadoCivil}
                                label="Estado civil *"
                                onChange={handleChangeEstadoCivil}
                                size='small'
                            >
                                { listaEstadoCivil.map((item) => {
                                    return <MenuItem key={item.id} value={item.id}>{item.label}</MenuItem>
                                }) }
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid container spacing={1} flexDirection={{ md: 'row' }} justifyContent={'end'} marginTop={1}>
                        <Grid item md={2}>
                            <Button variant="outlined" size='small' fullWidth type='submit' color="primary" endIcon={<CleaningServices />} onClick={()=>{ showAlarma(TiposAlarma.Info)}}>
                                Limpiar
                            </Button>
                        </Grid>
                        <Grid item md={2}>
                            <Button variant="outlined" size='small' fullWidth onClick={handleCancelar} color="error" endIcon={<Close />}>
                                Cancelar
                            </Button>
                        </Grid>
                        <Grid item md={2}>
                            <Button variant="outlined" size='small' fullWidth onClick={guardarPersona} color="success" endIcon={<Save />}>
                                Guardar
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Box>
            <ModalAlarma 
                openDialogAlarma={openDialogAlarma}
                handleCloseAlarma={handleOpenClosedialogAlarma}
                configuracion={configModalAlarma}
                handleAceptar={handleOpenClosedialogAlarma}
            />
            <ModalAlarma2
                openDialogAlarma={openDialogAlarma2}
                handleCloseAlarma={handleOpenClosedialogAlarma2}
                configuracion={configModalAlarma}
                handleAceptar={handleAceptarFn}
            />
        </>
    )
}

export default Formulario;