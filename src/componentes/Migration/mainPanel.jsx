import {
    Toolbar,
    Box,
    useMediaQuery,
    useTheme,
    AppBar,
} from "@mui/material";
import { useState, useEffect, useContext, useCallback, useRef } from "react";
import AppBarContent from "./appBar";
import { DataContext } from "../../Context/MetricsContext";

import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Tab from '@mui/material/Tab';
import TabContext from "@mui/lab/TabContext";
import MainMenu from "./ComponentsMainMenu/MainMenu";
import Pronostics from "./ComponentsMainMenu/Pronostics";
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';



const MainPanel = () => {


    // document.body.style.backgroundColor = "#ffffffff";


    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
    const [valueTab, setValueTab] = useState('1');
    const { dark_theme_letters, setDarkLetters, background_image, setBackground } = useContext(DataContext);





    const onChangeTab = (event, newValue) => {
        setValueTab(newValue);
    };
    useEffect(() => {
        document.body.style.transition = "background 0.5s ease-in-out";
        document.body.style.backgroundImage = `url(${background_image})`;
        const themeD = /_dark/.test(background_image);
        console.log(background_image)
        setDarkLetters(themeD);
    }, [background_image,dark_theme_letters])


    return (
        <>

            <Toolbar>
                <AppBarContent />
                {/*<SideBar />*/}
            </Toolbar>



            <TabContext value={valueTab}>
                <Box>
                    <TabList onChange={onChangeTab} aria-label="lab API tabs example" textColor='inherit' sx={{ color: dark_theme_letters ? 'white' : 'black' }}>
                        <Tab label='Temperatura y Radiacion UV' value='1' />
                        <Tab label='Pronostico y Calidad de Aire' value='2' />
                        {/*<Tab label='Localización Personalizada' value='3' />*/}
                    </TabList>
                </Box>
                <Box>
                    <TabPanel value='1'><MainMenu /></TabPanel>
                    <TabPanel value='2'><Pronostics /></TabPanel>
                    {/*<TabPanel value='3'>Localizacion Personalizada</TabPanel>*/}
                </Box>
            </TabContext>


        </>
    );
}



export default MainPanel;