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
    document.body.style.backgroundImage = `none`;
    document.body.style.backgroundColor = "#ffffffff";

    const [mapComponent, setMapComponent] = useState(null);
    const [Temperatura, setTemperature] = useState("");
    const [dataTempAprox, setdataTempAprox] = useState("");
    const [radiacionUV, setRadiacionUV] = useState("");
    const [location, setLocation] = useState("");
    const { openModal, setOpenModal } = useContext(DataContext);
    const { closeModal, setCloseModal } = useContext(DataContext);
    const { Alerts, setAlerts } = useContext(DataContext);
    const { Warnings, setWarnings } = useContext(DataContext);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
    const [valueTab, setValueTab] = useState('1');





    const onChangeTab = (event, newValue) => {
        setValueTab(newValue);
    };



    return (
        <>
            <Toolbar>
                <AppBarContent />
                {/*<SideBar />*/}
            </Toolbar>

            

            <TabContext value={valueTab}>
                <Box>
                    <TabList onChange={onChangeTab} aria-label="lab API tabs example">
                        <Tab label='Temperatura y Radiacion UV' value='1' />
                        <Tab label='Pronostico y Calidad de Aire' value='2' />
                        <Tab label='Localización Personalizada' value='3' />
                    </TabList>
                </Box>
                <Box>
                    <TabPanel value='1'><MainMenu /></TabPanel>
                    <TabPanel value='2'><Pronostics /></TabPanel>
                    <TabPanel value='3'>Localizacion Personalizada</TabPanel>
                </Box>
            </TabContext>

        </>
    );
}



export default MainPanel;