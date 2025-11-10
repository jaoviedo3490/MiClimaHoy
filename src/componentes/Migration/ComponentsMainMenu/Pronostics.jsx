

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
    AlertTitle, Button
} from "@mui/material";
import Divider from '@mui/material/Divider';
import { useState, useContext, useEffect } from "react";
import { DataContext } from "../../../Context/MetricsContext.js"
import GenericModal from "../Modal/GenericModal.jsx";
import JsonIcon from '../../dataJson/icon.json';
import { Image } from 'mui-image';
import IndicatorDetails from "../Graphics/indicatorDetails.jsx";
import ClimateDefinition from '../../dataJson/climate-definition.json';
import JsonImage from '../../dataJson/wallpaper.json';
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
    const [MonoCarbono, setMonoCarbono] = useState("");
    const [DioAzufre, setDioAzufre] = useState("");
    const [DioNitrogeno, setDioNitrogeno] = useState("");
    const [AirQualityImage, setAirQualityImage] = useState("");
    const { dark_theme_letters, setDarkLetters } = useContext(DataContext);


    const { openModal, setOpenModal, climateAlert, setclimateAlert,setBackground } = useContext(DataContext);
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
        const mono_carbono = climateAlert.current.air_quality.co;
        const dio_nitrogeno = climateAlert.current.air_quality.no2;
        const dio_azufre = climateAlert.current.air_quality.so2;
        const level_contamination = climateAlert.current.air_quality['us-epa-index'];

        setPronosticInitial(pronostic);
        setPronostic(pronosticFormat);
        setLocation(location_last);
        setIsDay(is_day);
        setNubosidad(nubosidad);
        setHumedad(humidity);
        setVisibilidad(visibilidad);
        setMonoCarbono(mono_carbono);
        setDioNitrogeno(dio_nitrogeno);
        setDioAzufre(dio_azufre);

        //alert(`${is_day}-${pronosticFormat}`)
        const images = JsonImage.wallPapersCategory[`${is_day}-${pronosticFormat}`];

        setBackground(images);
        const themeD = (isDay==='night') ? true : false
        setDarkLetters(themeD);
        

        setJsonPronosticImage(JsonIcon['icon'][is_day][`${is_day}-${pronosticFormat}`]);
        setAirQualityImage(JsonIcon['icon']['Air-Quality'][level_contamination]);

        //setJsonPronosticImage(JsonIcon['icon'][isDay][`${isDay}-${Pronostic}`]);
    }, [climateAlert])

    const handleCloseModal = () => {
        if (typeof setOpenModal === "function") setOpenModal(false);
    };

    return (
        <>
            <Box sx={{
                mt: '10px', width: '100%', left: '100px'
            }}>
                <Card sx={{
                    boxShadow: '0', border: '1px solid #dadadaff', borderRadius: '4px', backgroundColor: 'rgba(255, 255, 255, 0.2)',
                    backdropFilter: 'blur(5px)'
                }}>
                    <CardContent sx={{ p: 2 }}>
                        <Stack direction={isMobile ? "column" : "row"} justifyContent="space-between" spacing={1}>
                            <Typography variant='body1' sx={{ color: (isDay==='nigth') ? 'white' : 'black' }}>Pronostico Hoy</Typography>
                            <Typography variant="subtitle2" sx={{color: (isDay==='nigth') ? 'white' : 'black'}}>{location}</Typography>
                        </Stack>
                        <Stack direction={isMobile ? "column" : "row"}>
                            <Stack direction="column" justifyContent="space-between" spacing={1}>
                                <Typography variant="h6" sx={{ color: (isDay==='nigth') ? 'white' : 'black' }}>{`${isDay} ${PronosticInitial}`}</Typography>
                                <Stack direction={isMobile ? "column" : "row"} spacing={2}>
                                    <Card sx={{ boxShadow: '0', border: '1px solid #dadadaff', borderRadius: '4px', backgroundColor: 'rgba(255, 255, 255, 0.2)' }}>
                                        <CardContent sx={{ p: 2 }}>
                                            <Image src={JsonPronosticImage} width={250} height={250} />
                                            <Stack direction={isMobile ? "column" : "row"} justifyContent="space-between">
                                                <Typography>{`Nubosidad:`}</Typography>
                                                <Typography>{`${Nubosidad} %`}</Typography>
                                            </Stack>
                                            <Divider component="div" role="presentation" />
                                            <Stack direction={isMobile ? "column" : "row"} justifyContent="space-between">
                                                <Typography>{`Humedad Relativa:`}</Typography>
                                                <Typography>{`${Humedad} %`}</Typography>
                                            </Stack>
                                            <Divider component="div" role="presentation" />
                                            <Stack direction='row' justifyContent="space-between">
                                                <Typography>{`Visibilidad:`}</Typography>
                                                <Typography>{`${Visibilidad} Kilometros`}</Typography>
                                            </Stack>
                                            <Divider component="div" role="presentation" />
                                            <Button variant="outlined" size="small" sx={{ width: '100%' }}>
                                                Ver Detalles
                                            </Button>
                                        </CardContent>
                                    </Card>
                                    <Box sx={{ width: '10%' }}>
                                        <Stack spacing={2} direction='column' >
                                            <Stack direction='row' spacing={1}>
                                            </Stack>
                                        </Stack>
                                    </Box>
                                </Stack>

                            </Stack>
                            <Stack direction="column" justifyContent="space-between" spacing={1}>
                                <Typography variant="h6" sx={{ color: (isDay==='nigth') ? 'white' : 'black' }}>Calidad del Aire</Typography>
                                <Stack direction='row' spacing={2}>
                                    <Card sx={{ boxShadow: '0', border: '1px solid #dadadaff', borderRadius: '4px', backgroundColor: 'rgba(255, 255, 255, 0.2)' }}>
                                        <CardContent sx={{ p: 2 }}>
                                            <Image src={AirQualityImage} width={250} height={250} />
                                            <Stack direction='row' justifyContent="space-between">
                                                <Typography>{`Mono-Carbono:`}</Typography>
                                                <Typography>{`${MonoCarbono}`}</Typography>
                                            </Stack>
                                            <Divider component="div" role="presentation" />
                                            <Stack direction='row' justifyContent="space-between">
                                                <Typography>{`Dio-Nitrogeno:`}</Typography>
                                                <Typography>{`${DioNitrogeno}`}</Typography>
                                            </Stack>
                                            <Divider component="div" role="presentation" />
                                            <Stack direction='row' justifyContent="space-between">
                                                <Typography>{`Dio-Azufre:`}</Typography>
                                                <Typography>{`${DioAzufre}`}</Typography>
                                            </Stack>
                                            <Divider component="div" role="presentation" />
                                            <Button variant="outlined" size="small" sx={{ width: '100%' }}>
                                                Ver Detalles
                                            </Button>
                                        </CardContent>
                                    </Card>
                                    <Box sx={{ width: '10%' }}>
                                        <Stack spacing={2} direction='column' >
                                            <Stack direction='row' spacing={1}>
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
