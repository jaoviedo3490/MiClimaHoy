import {
    Toolbar,
    Box,
    useMediaQuery,
    useTheme,
    AppBar,
} from "@mui/material";
import { useState, useEffect, useContext } from "react";
import AppBarContent from "./appBar";
import { DataContext } from "../../Context/MetricsContext";

import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Tab from '@mui/material/Tab';
import TabContext from "@mui/lab/TabContext";
import MainMenu from "./ComponentsMainMenu/MainMenu";
import Pronostics from "./ComponentsMainMenu/Pronostics";
import JsonImage from '../dataJson/wallpaper.json';

const MainPanel = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
    const [valueTab, setValueTab] = useState('1');
    const { dark_theme_letters, setDarkLetters, background_image, setBackground,climateAlert } = useContext(DataContext);

    const onChangeTab = (event, newValue) => {
        setValueTab(newValue);
    };

    // ------------------ FIX BACKGROUND ------------------
    useEffect(() => {
        const background = background_image || JsonImage.wallPapersCategory.Default_wallpapers[
            Math.floor(Math.random() * JsonImage.wallPapersCategory.Default_wallpapers.length)
        ];

        setBackground(background);

        document.body.style.transition = "background 0.5s ease-in-out";
        const img = new Image();
        img.src = background;
        img.onload = () => document.body.style.backgroundImage = `url(${background})`;
        img.onerror = () => console.warn("No se pudo cargar la imagen de fondo:", background);
        const themeD = /_dark/.test(background);
        setDarkLetters(themeD);
    }, [background_image, dark_theme_letters,climateAlert]);


    return (
        <>
            <Toolbar>
                <AppBarContent />
            </Toolbar>

            <TabContext value={valueTab}>
                <Box>
                    <TabList
                        onChange={onChangeTab}
                        aria-label="lab API tabs example"
                        textColor='inherit'
                        sx={{ color: dark_theme_letters ? 'white' : 'black' }}
                    >
                        <Tab label='Temperatura y Radiacion UV' value='1' />
                        <Tab label='Pronostico y Calidad de Aire' value='2' />
                    </TabList>
                </Box>
                <Box>
                    <TabPanel value='1'><MainMenu /></TabPanel>
                    <TabPanel value='2'><Pronostics /></TabPanel>
                </Box>
            </TabContext>
        </>
    );
}

export default MainPanel;
