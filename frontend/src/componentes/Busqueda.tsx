import { useState, ChangeEvent, useEffect  } from 'react'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import { Button, Grid, } from '@mui/material';
import { Search, } from '@mui/icons-material';
import ModalBusquedaAvanzada from './Modal';
import LabelInfo from './Label';
import Formulario from './Formulario';
import ModalAlarma from './ModalAlarma';
import { fetchData } from '../lib/utils';
import { useSelector, } from 'react-redux';
import { RootState,  } from '../lib/store';

const listaTipoDocumentos = [
    {id: 1, label: 'Cédula de ciudadanía'},
    {id: 2, label: 'Registro civil'},
    {id: 3, label: 'NUIP'},
    {id: 4, label: 'Pasaporte'},
    {id: 5, label: 'Permiso especial de permanencia'},
    {id: 6, label: 'Cédula extranjera'},
    {id: 7, label: 'Tarjeta de indentidad'},
]

interface ConfigAlarma {
    mensaje?: string,
    icono?: string,
    colorIcono?: string,
}

const Busqueda = () => {
    const persona = useSelector((state: RootState) => state.persona.persona);
    const [tipoDocumento, setTipoDoc] = useState('');
    const [numeroDoc, setNumeroDoc] = useState('');
    const [openDialog, setOpenDialog] = useState(false);
    const [showFormulario, setShowFormulario] = useState(false);
    const [openDialogAlarma, setOpenDialogAlarma] = useState(false);
    const [configModalAlarma, setConfigModalAlarma] = useState<ConfigAlarma>();

    const handleChangeTipoDoc = (event: SelectChangeEvent) => {
        setTipoDoc(event.target.value as string);
    }

    const handleChangeNumDoc = (event: ChangeEvent<HTMLInputElement>) => {
        setNumeroDoc(event.target.value as string)
    }
    const handleOpenClosedialog = () => {
        setOpenDialog(!openDialog);
    }

    const handleOpenClosedialogAlarma = () => {
        setOpenDialogAlarma(!openDialogAlarma);
    }

    const hideFormulario = () => {
        setShowFormulario(false);
    }

    const buscarPersona = async () => {
        if (tipoDocumento === '' || numeroDoc === '') {
            setConfigModalAlarma({
                mensaje: 'Los campos con (*) son obligatorios',
                icono: 'error',
                colorIcono: 'red'
            })
            handleOpenClosedialogAlarma();
            return;
        }
        if (!Number(numeroDoc)) {
            setConfigModalAlarma({
                mensaje: 'El campo número de documento sólo acepta números',
                icono: 'error',
                colorIcono: 'red'
            })
            handleOpenClosedialogAlarma();
            return;
        }
        await fetchData(`personas/?tipo_documeto=${tipoDocumento}&numero_documento=${numeroDoc}`).then((res) => {
            console.log(res);
            if(res.length === 0) {
                setShowFormulario(true);
            } else {
                setConfigModalAlarma({
                    mensaje: 'El usuario ya existe',
                    icono: 'error',
                    colorIcono: 'red'
                })
                handleOpenClosedialogAlarma();
            }
        })
    }

    useEffect(() => {
        if (persona.id) {
            setTipoDoc(persona.tipo_documento);
            setNumeroDoc(persona.numero_documento);
            setShowFormulario(true);
        } else {
            setShowFormulario(false);
        }
    }, [persona]);

    return (
        <>
            <Box>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold '}}>
                    Administrador de personas
                </Typography>
                <LabelInfo texto='Información' />
                <Grid container spacing={3} marginTop={1}>
                    <Grid item xs={3}>
                        <FormControl fullWidth>
                            <InputLabel sx={{top: '-8px'}} id="demo-simple-select-label" >Tipo de documento </InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={tipoDocumento}
                                label="Tipo de documento *"
                                onChange={handleChangeTipoDoc}
                                size='small'
                            >
                                { listaTipoDocumentos.map((item) => {
                                    return <MenuItem key={item.id} value={item.id}>{item.label}</MenuItem>
                                }) }
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item>
                        <TextField 
                            label="Número de documento *" 
                            variant="outlined" 
                            value={numeroDoc}
                            onChange={handleChangeNumDoc}
                            size='small'
                        />
                    </Grid>
                    <Grid item >
                        <Button endIcon={<Search/>} variant='contained' sx={{ backgroundColor: '#1a237e'}} onClick={buscarPersona}>Buscar</Button>
                    </Grid>
                    <Grid item>
                        <Button endIcon={<Search/>} variant='outlined' sx={{ borderBlockColor: 'gray', color: 'grey'}} onClick={handleOpenClosedialog}>Búsqueda avanzada</Button>
                    </Grid>
                </Grid>
            </Box>
            {showFormulario && <Formulario num_doc={numeroDoc} tipo_doc={tipoDocumento} handleCancelar={hideFormulario} />}
            <ModalBusquedaAvanzada openDialog={openDialog} handleClose={handleOpenClosedialog} />
            <ModalAlarma 
                openDialogAlarma={openDialogAlarma}
                handleCloseAlarma={handleOpenClosedialogAlarma}
                configuracion={configModalAlarma}
                handleAceptar={handleOpenClosedialogAlarma}
            />
        </>
    )
}

export default Busqueda;