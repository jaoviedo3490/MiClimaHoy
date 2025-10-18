

import {
    Toolbar,
    Box,
    useMediaQuery,
    useTheme,
    Card,
    CardContent,
    Stack,
    Typography,
    Alert,
    AlertTitle
} from "@mui/material";
import { useState, useContext, useEffect } from "react";
import { DataContext } from "../../../Context/MetricsContext.js"
import Engine from "../Engine.jsx";
import GenericModal from "../Modal/GenericModal.jsx";
import JsonIcon from '../../dataJson/icon.json';
import { Image } from 'mui-image';
import Divider from '@mui/material/Divider';
import SampleIndicator from "../Graphics/sampleIndicator.jsx";

const Pronostics = () => {
    const [mapComponent, setMapComponent] = useState(null);
    const [Nubosidad, setNubosidad] = useState("");
    const [Visibilidad, setVisibilidad] = useState("");
    const [Humedad, setHumedad] = useState("");
    const [location, setLocation] = useState("");
    const [Pronostic, setPronostic] = useState("");
    const [PronosticInitial, setPronosticInitial] = useState("");
    const [isDay, setIsDay] = useState("");
    const [JsonPronosticImage, setJsonPronosticImage] = useState("");


    const { openModal, setOpenModal, climateAlert, setclimateAlert } = useContext(DataContext);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
    useEffect(() => {

        const pronostic = climateAlert.current.condition.text;
        const pronosticFormat = pronostic.replaceAll(" ", "-");
        const is_day = (climateAlert.current.is_day === 0) ? "nigth" : "day";
        const location_last = climateAlert.current.last_updated;
        const nubosidad = climateAlert.current.cloud;
        const humidity = climateAlert.current.humidity;
        const visibilidad = climateAlert.current.vis_km;

        setPronosticInitial(pronostic);
        setPronostic(pronosticFormat);
        setLocation(location_last);
        setIsDay(is_day);
        setNubosidad(nubosidad);
        setHumedad(humidity);
        setVisibilidad(visibilidad);

        setJsonPronosticImage(JsonIcon['icon'][is_day][`${is_day}-${pronosticFormat}`]);
        //setJsonPronosticImage(JsonIcon['icon'][isDay][`${isDay}-${Pronostic}`]);
    }, [climateAlert])

    const handleCloseModal = () => {
        if (typeof setOpenModal === "function") setOpenModal(false);
    };

    return (
        <>
            <Box sx={{ mt: '10px', width: '100%', left: '100px' }}>
                <Card sx={{ boxShadow: '0', border: '1px solid #dadadaff', borderRadius: '4px' }}>
                    <CardContent sx={{ p: 2 }}>
                        <Stack direction={isMobile ? "column" : "row"} justifyContent="space-between" spacing={1}>
                            <Typography variant='body1'>Pronostico Hoy</Typography>
                            <Typography variant="subtitle2">{location}</Typography>
                        </Stack>
                        <Stack direction='row'>
                            <Stack direction="column" justifyContent="space-between" spacing={1}>
                                <Typography variant="h6">{`${isDay} ${PronosticInitial}`}</Typography>
                                <Stack direction='row' spacing={2}>
                                    <Card sx={{ boxShadow: '0', border: '1px solid #dadadaff', borderRadius: '4px' }}>
                                        <CardContent sx={{ p: 2 }}>
                                            <Image src={JsonPronosticImage} width={250} height={250} />
                                        </CardContent>
                                    </Card>
                                    <Box sx={{  width: '10%' }}>
                                        <Stack spacing={2} direction='column' >
                                            <Stack direction='row' spacing={1}>
                                                <SampleIndicator title='Nubosidad' sizeGraph={110} data={Nubosidad} />
                                                <SampleIndicator title='Humedad' sizeGraph={110} data={Humedad} />
                                                <SampleIndicator title='Visibilidad' sizeGraph={110} data={Visibilidad} />
                                            </Stack>
                                        </Stack>
                                    </Box>
                                </Stack>
                            </Stack>
                        </Stack>

                    </CardContent>
                </Card>

                <br />



                <GenericModal open={openModal} onClose={handleCloseModal} />
            </Box>
        </>
    );
};

export default Pronostics;
