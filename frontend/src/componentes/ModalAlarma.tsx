/* eslint-disable @typescript-eslint/no-explicit-any */
import { 
Dialog,
DialogContent,
Button,
Avatar,
DialogActions,
Grid,
Typography,
} from "@mui/material";
import Icon from '@mui/material/Icon';
import { Close, Save } from "@mui/icons-material";

const ModalAlarma = ({
    handleCloseAlarma,
    openDialogAlarma,
    configuracion,
    handleAceptar
}: {handleCloseAlarma: () => void, openDialogAlarma: boolean, configuracion: any, handleAceptar: () => void}) => {
    return (
        <>
            <Dialog
                keepMounted
                open={openDialogAlarma}
                onClose={(_, reason) => {
                    if (reason !== 'backdropClick') {
                      handleCloseAlarma();
                    }
                }}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                fullWidth
            >
                <DialogContent>
                        <Avatar style={{ backgroundColor: configuracion?.colorIcono, margin: '10px auto', width: 250, height: 250 }}>
                            <Icon style={{ fontSize: 280 }}>{configuracion?.icono}</Icon>
                        </Avatar>
                        <Typography align="center">{configuracion?.mensaje}</Typography>
                    <DialogActions>
                        <Grid container spacing={2} flexDirection={{ md: 'row' }} justifyContent={'center'}>
                            <Grid item md={3}>
                                <Button variant="outlined" size='small' fullWidth onClick={handleCloseAlarma} sx={{ borderBlockColor: 'black', color: 'grey'}} endIcon={<Close />}>
                                    Cancelar
                                </Button>
                            </Grid>
                            <Grid item md={3}>
                                <Button variant="contained" size='small' fullWidth sx={{ backgroundColor: '#1a237e'}} endIcon={<Save />} onClick={handleAceptar}>
                                    Aceptar
                                </Button>
                            </Grid>
                        </Grid>
                    </DialogActions>
                </DialogContent>
            </Dialog>
        </>
    )
}

export default ModalAlarma;