import {
    Drawer, List, ListItemIcon, ListItemText,
    Toolbar, Box, ListItemButton,
    useMediaQuery, useTheme, ListSubheader
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import EqualizerIcon from '@mui/icons-material/Equalizer';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import LogoutIcon from '@mui/icons-material/Logout';
import CalculateIcon from '@mui/icons-material/Calculate';
import { useEffect, useContext, useState } from "react";


const SideBar = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

    const [top, setTop] = useState('');
    useEffect(() => {
        if (!isMobile) handleAppBarClose()
        if (isMobile) setTop('0');
    }, [isMobile])

    const handleAppBarClose = () => {

        setTop('66');
    }

    return (
        <>
            <Drawer variant={'persistent'} open={true} slotProps={{
                paper: {
                    sx: {
                        width: '200px',
                        top: `${top}px`,
                        height: `calc(100% -  ${top}px)`
                    }
                }
            }}>
                <Box sx={{ m: 0, p: 0 }}>
                    <List subheader={
                        <ListSubheader sx={{
                            bgcolor: 'grey.300',
                            color: 'primary.main',
                            fontWeight: 'bold',
                            fontSize: 12,
                            letterSpacing: 1,
                            textTransform: 'uppercase',
                            lineHeight: '32px'
                        }} component="div">Menu de opciones</ListSubheader>
                    }>
                        <ListItemButton>
                            <ListItemIcon>
                               <HomeIcon /><ListItemText primary="Recomendaciones" />
                            </ListItemIcon>
                        </ListItemButton>


                    </List>

                    
                 
                </Box>

                <Box sx={{ flexGrow: 1 }} />
                
            </Drawer>
        </>
    );
}

export default SideBar;
