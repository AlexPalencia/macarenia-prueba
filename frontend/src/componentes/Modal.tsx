import { useState, useEffect } from 'react'
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import { DialogContent, Button, TextField, Card, Grid, InputAdornment, CardActions } from '@mui/material';
import { CleaningServices, Close, Search } from '@mui/icons-material';
import Tabla from './Tabla';
import { fetchData,  deleteData } from '../lib/utils';
import ModalAlarma from './ModalAlarma';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../lib/store';
import { setEditPersona } from '../lib/personaSlice';
import LabelInfo from './Label';

interface ConfigAlarma {
    mensaje?: string,
    icono?: string,
    colorIcono?: string,
}

const ModalBusquedaAvanzada = ({handleClose, openDialog}: {handleClose: () => void, openDialog: boolean}) => {
    const [openDialogAlarma, setOpenDialogAlarma] = useState(false);
    const [configModalAlarma, setConfigModalAlarma] = useState<ConfigAlarma>();
    const [listaPersonas, setListaPersonas] = useState([]);
    const dispatch = useDispatch<AppDispatch>();


    const getData = async ()  => {
        await fetchData('personas').then((res) => {
            console.log(res);
            setListaPersonas(res);
        })
    }

    const handleDeletePersona = async (id: number) => {
        await deleteData(`personas/${id}/`).then((res) => {
            console.log(res);
            setConfigModalAlarma({
                mensaje: 'Registro eliminado con éxito',
                icono: 'check_circle',
                colorIcono: 'green'
            })
            handleOpenClosedialogAlarma();
            getData();
        })
    }

    const handleEditPersona = async (id: number) => {
        await fetchData(`personas/${id}`).then((res) => {
            dispatch(setEditPersona(res));
            handleClose();
        })
    };

    const handleOpenClosedialogAlarma = () => {
        setOpenDialogAlarma(!openDialogAlarma);
    }

    useEffect(() => {
        if (openDialog) {
            getData();
        }
    }, [openDialog]);
    return (
        <>
            <Dialog
                keepMounted
                open={openDialog}
                onClose={(_, reason) => {
                    if (reason !== 'backdropClick') {
                      handleClose();
                    }
                }}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                fullWidth
                maxWidth={"md"}
            >
                <DialogTitle>
                    <LabelInfo texto='Búsqueda avanzada'/>
                </DialogTitle>
                <DialogContent>
                    <Grid container>
                        <Grid item><TextField label="Buscar" InputProps={{endAdornment: <InputAdornment position="end"><Search /></InputAdornment>}}></TextField></Grid>
                    </Grid>
                    <Card sx={{ marginTop: 1}}>
                        <Tabla 
                            rows={listaPersonas}
                            handleEdit={handleEditPersona}
                            handleDelete={handleDeletePersona}
                         />
                    </Card>
                    <CardActions>
                        <Grid container spacing={2} flexDirection={{ md: 'row' }} justifyContent={'end'}>
                            <Grid item md={2}>
                                <Button variant="outlined" size='small' fullWidth type='submit' color="primary" endIcon={<CleaningServices />} onClick={handleClose}>
                                    Limpiar
                                </Button>
                            </Grid>
                            <Grid item md={2}>
                                <Button variant="outlined" size='small' fullWidth onClick={handleClose} color="error" endIcon={<Close />}>
                                    Cancelar
                                </Button>
                            </Grid>
                        </Grid>
                    </CardActions>
                </DialogContent>
            </Dialog>
            <ModalAlarma 
                openDialogAlarma={openDialogAlarma}
                handleCloseAlarma={handleOpenClosedialogAlarma}
                configuracion={configModalAlarma}
                handleAceptar={handleOpenClosedialogAlarma}
            />
        </>
    )
}

export default ModalBusquedaAvanzada;