import { Typography, Modal, Box, Button, Stack, Alert, AlertTitle } from "@mui/material";
import IndicatorDetails from "../Graphics/indicatorDetails";
import { useContext } from "react";
import { DataContext } from "../../../Context/MetricsContext";
import { useMediaQuery, useTheme } from "@mui/material";

const GenericModal = (props) => {
    const { dataModal } = useContext(DataContext);
    const { dataRecomendations } = useContext(DataContext);
    const { dataOptional } = useContext(DataContext);
    const { dataType } = useContext(DataContext);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    return (
        <Modal sx={{
            position: 'fixed',
            width: '90%',
            maxWidth: '700px'
        }} open={props.open} onClose={props.onClose} BackdropProps={{
            onClick: (e) => e.stopPropagation()
        }}>

            <Box sx={{
                bgcolor: 'background.paper',
                position: 'fixed',
                width: '90%',
                maxWidth: '700px',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%,-50%)',
                boxShadow: '24',
                p: '2%',
            }}>
                <Stack direction={isMobile ? 'column' : 'row'} spacing={1}>
                    <IndicatorDetails title2={dataType === 'Temperatura' ? 'Sensacion aparente' : 'Rango Saludable'} title1={dataType === 'Radiacion UV' ? 'Porcentaje Actual' : 'Temperatura'} valor={dataModal} valorOpcional={dataOptional} type={dataType} />
                    <Stack spacing={2}>
                        <Box>
                            <Alert variant='outlined' severity="info">
                                <AlertTitle>¡IMPORTANTE!</AlertTitle>
                                <Typography variant="caption">{dataRecomendations}</Typography>
                            </Alert>
                        </Box>
                        <Stack>
                            <Stack direction='row' spacing={1}>
                                <Box sx={{ backgroundColor: 'rgba(10, 92, 175, 0.92)', height: '15px', width: '15px', borderRadius: '5%' }}></Box>
                                <Typography variant='caption'>Valor Actual ({dataModal})</Typography>
                            </Stack >
                            <Stack direction='row' spacing={1}>
                                <Box sx={{ backgroundColor: 'rgba(142, 228, 72, 0.92)', height: '15px', width: '15px', borderRadius: '5%' }}></Box>
                                <Typography variant='caption'>{dataType === 'Temperatura' ? 'Valor Actual' : 'Limite saludable'} ({dataOptional})</Typography>
                            </Stack>
                            {dataType === 'Temperatura' ? (<Stack direction='row' spacing={1}>
                                <Box sx={{ backgroundColor: 'rgba(238, 225, 51, 1)', height: '15px', width: '15px', borderRadius: '10%' }}></Box>
                                <Typography variant='caption'>Limite Recomendado {(dataModal < 0) ? '(0 C° : -20 C°)' : '(0 C° : 37 C°)'}</Typography>
                            </Stack>) : ('')}
                        </Stack>
                    </Stack>
                </Stack>

                <Button onClick={props.onClose} variant='contained' color='error' sx={{ width: '100%' }}>Cerrar</Button>
            </Box>
        </Modal>
    );
}
export default GenericModal