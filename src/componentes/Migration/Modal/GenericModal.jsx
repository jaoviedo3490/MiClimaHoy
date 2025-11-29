import {  Modal, Box, Button, Stack } from "@mui/material";

import { useMediaQuery, useTheme } from "@mui/material";

const GenericModal = (props) => {
  
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    //console.log("aqui")
    return (
        <Modal sx={{
            position: 'fixed',
            width: '90%',
            maxWidth: '700px',
            

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
                borderRadius: '10px',
                backgroundColor: 'rgba(255, 255, 255, 0.32)',
                backdropFilter: 'blur(7px)'
                
                    
            }}>
                <Stack direction={isMobile ? 'column' : 'row'} spacing={1}>
                    {props.element}
                </Stack>

                <Button onClick={props.onClose} variant='contained' color='error' sx={{ width: '100%' }}>Cerrar</Button>
            </Box>
        </Modal>
    );
}
export default GenericModal