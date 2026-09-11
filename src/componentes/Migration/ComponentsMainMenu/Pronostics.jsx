import {
    Box,
    useMediaQuery,
    useTheme,
    Card,
    CardContent,
    Stack,
    Typography,
    Button,
    Alert,
    AlertTitle,
    Tooltip,
    IconButton,
    LinearProgress
} from "@mui/material";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CrisisAlertIcon from '@mui/icons-material/CrisisAlert';
import Chip from "@mui/material/Chip";
import Divider from "@mui/material/Divider";

import {
    useState,
    useContext,
    useEffect,
    lazy,
    Suspense
} from "react";

import { DataContext } from "../../../Context/MetricsContext.js";
import { Ui_Context } from "../../../Context/Ui-Context.js";
import GenericModal from "../Modal/GenericModal.jsx";
import JsonIcon from '../../dataJson/icon.json';
import { Image } from 'mui-image';
import ClimateDefinition from '../../dataJson/climate-definition.json';
import JsonImage from '../../dataJson/wallpaper.json';

import PopoverComponent from '../GenericComponentes/Popover.jsx';
import TreeGraphicEchart from "../Graphics/TreeGraphicEcharts.jsx";

import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import WaterDropOutlinedIcon from "@mui/icons-material/WaterDropOutlined";
import CloudOutlinedIcon from "@mui/icons-material/CloudOutlined";
import AirOutlinedIcon from "@mui/icons-material/AirOutlined";
import WarningAmberOutlinedIcon from "@mui/icons-material/WarningAmberOutlined";
import React from "react";
const IndicatorDetails = lazy(() => import("../Graphics/indicatorDetails.jsx"));
const TreeGraph = lazy(() => import("../Graphics/TreeGraphic.jsx"));
const IndicatorGraph = lazy(() => import("../Graphics/Indicator.jsx"));
const Pronostics = (props) => {
    const {
        setOptionTab,
        isDay_global, setIsDay_global, setBackground, setDarkLetters, climateAlert
    } = useContext(DataContext);

    const [arrDataDashBoardB] = useState(["Quality-Air", "Velocidad-Viento", "Precipitacion"])
    const [isAlertsOrWarningsB, setisAlertsOrWarningsB] = useState(false);


    useEffect(() => {
        const isNewsB = Object.keys(climateAlert.response["Quality-Air"]["Quality-Air"].Warnings[0]).length > 0
            || Object.keys(climateAlert.response["Quality-Air"]["Quality-Air"].Alerts[0]).length > 0
            || Object.keys(climateAlert.response["Velocidad-Viento"]["Velocidad-Viento"].Warnings[0]).length > 0
            || Object.keys(climateAlert.response["Velocidad-Viento"]["Velocidad-Viento"].Alerts[0]).length > 0
            || Object.keys(climateAlert.response.Precipitacion.Precipitacion.Alerts[0]).length > 0
            || Object.keys(climateAlert.response.Precipitacion.Precipitacion.Warnings[0]).length > 0

        setisAlertsOrWarningsB(isNewsB);

    }, [climateAlert])





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
    const [levelQualityAir, setLevelQualityAir] = useState("");
    const [precipitacion, setPrecipitacion] = useState("");
    const [velocidadViento, setVelocidadViento] = useState("");
    const [QualityAirDetails, setQualityAirDetails] = useState([]);
    const [PronosticDetails, setPronosticDetails] = useState([]);
    const [QualityAir_Elements, setQualityAir_elements] = useState('');
    const [Ozono, setOzono] = useState('');
    const [Pm2_5, setPm2_5] = useState([]);
    const [Pm10, setPm10] = useState([]);
    //const location_last = climateAlert.response.last_update.data;



    //8017952867






    const {
        openModal, setOpenModal, setCloseModal, dataModal, setDataModal, dataRecomendations, setRecomendations,
        dataType, setDataType, dataOptional, setDataOptional, typeModal, setTypeModal, customLocation, setCustomLocation
    } = useContext(Ui_Context);


    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
    setOptionTab(false);

    const nubosidad = climateAlert.response.PronosticsMetrics.Nubosidad.data;
    const humidity = climateAlert.response.PronosticsMetrics.Humedad.data;
    const visibilidad = climateAlert.response.PronosticsMetrics.Visibilidad.data;
    const mono_carbono = isMobile ? Number((((climateAlert.response.QualityMetrics.MonoCarbono.data * 24.45) / 28.01) / 1000).toFixed(4)) : Number((((climateAlert.response.QualityMetrics.MonoCarbono.data * 24.45) / 28.01) / 1000).toFixed(4));
    const dio_nitrogeno = isMobile ? Number((((climateAlert.response.QualityMetrics.DioNitrogeno.data * 24.45) / 46.0055) / 1000).toFixed(4)) : Number((((climateAlert.response.QualityMetrics.DioNitrogeno.data * 24.45) / 46.0055) / 1000).toFixed(4))
    const dio_azufre = isMobile ? Number((((climateAlert.response.QualityMetrics.DioAzufre.data) * 24.45 / 64.07) / 1000).toFixed(4)) : Number((((climateAlert.response.QualityMetrics.DioAzufre.data) * 24.45 / 64.07) / 1000).toFixed(4))
    const pm2_5 = climateAlert.response.QualityMetrics.PM2_5.data;
    const pm10 = climateAlert.response.QualityMetrics.PM10.data;


    const handleOpenModal = (param) => {
        setTypeModal((param === 2) ? 'Quality-Air' : 'Pronostico');
        setOpenModal(true);
        setCloseModal(true);
        setDataModal(props.data);
        setRecomendations(props.recomendaciones);
        setDataType(props.type);
        setDataOptional(props.optionalData);
    };

    useEffect(() => {

        const is_day = (climateAlert.response.is_day.data === 0) ? "nigth" : "day";
        const pronostic = climateAlert.response.pronostic.text.replaceAll(" ", "-")
        //const pronosticFormat = pronostic.replaceAll(" ", "-");


        const location_last = climateAlert.response.last_update.data;


        const Ozono = isMobile ? (((climateAlert.response.QualityMetrics.Ozono.data * 24.45) / 47.998) / 1000).toFixed(2) : (((climateAlert.response.QualityMetrics.Ozono.data * 24.45) / 47.998) / 1000).toFixed(5);
        //const Ozono = climateAlert.current.air_quality.o3;

        const AQI_func = (C, C_low, C_high, I_low, I_high) => {
            return (I_high - I_low) / (C_high - C_low) * (C - C_low) + I_low
        }



        const data_2 = [
            (mono_carbono >= 0.0 && mono_carbono <= 4.4)
                ? AQI_func(mono_carbono, 0.0, 4.4, 0, 50)
                : (mono_carbono > 4.4 && mono_carbono <= 9.4)
                    ? AQI_func(mono_carbono, 4.5, 9.4, 51, 100)
                    : (mono_carbono > 9.4 && mono_carbono <= 12.4)
                        ? AQI_func(mono_carbono, 9.5, 12.4, 101, 150)
                        : (mono_carbono > 12.4 && mono_carbono <= 15.4)
                            ? AQI_func(mono_carbono, 12.5, 15.4, 151, 200)
                            : (mono_carbono > 15.4 && mono_carbono <= 30.4)
                                ? AQI_func(mono_carbono, 15.5, 30.4, 201, 300)
                                : (mono_carbono > 30.4 && mono_carbono <= 40.4)
                                    ? AQI_func(mono_carbono, 30.5, 40.4, 301, 400)
                                    : (mono_carbono > 40.4 && mono_carbono <= 50.4)
                                        ? AQI_func(mono_carbono, 40.5, 50.4, 401, 500)
                                        : mono_carbono,


            (dio_azufre >= 0.000 && dio_azufre <= 0.035)
                ? AQI_func(dio_azufre, 0.000, 0.035, 0, 50)
                : (dio_azufre > 0.035 && dio_azufre <= 0.075)
                    ? AQI_func(dio_azufre, 0.036, 0.075, 51, 100)
                    : (dio_azufre > 0.075 && dio_azufre <= 0.185)
                        ? AQI_func(dio_azufre, 0.076, 0.185, 101, 150)
                        : (dio_azufre > 0.185 && dio_azufre <= 0.304)
                            ? AQI_func(dio_azufre, 0.186, 0.304, 151, 200)
                            : (dio_azufre > 0.304 && dio_azufre <= 0.604)
                                ? AQI_func(dio_azufre, 0.305, 0.604, 201, 300)
                                : (dio_azufre > 0.604 && dio_azufre <= 0.804)
                                    ? AQI_func(dio_azufre, 0.605, 0.804, 301, 400)
                                    : (dio_azufre > 0.804 && dio_azufre <= 1.004)
                                        ? AQI_func(dio_azufre, 0.805, 1.004, 401, 500)
                                        : dio_azufre,


            (dio_nitrogeno >= 0.000 && dio_nitrogeno <= 0.053)
                ? AQI_func(dio_nitrogeno, 0.000, 0.053, 0, 50)
                : (dio_nitrogeno > 0.053 && dio_nitrogeno <= 0.100)
                    ? AQI_func(dio_nitrogeno, 0.054, 0.100, 51, 100)
                    : (dio_nitrogeno > 0.100 && dio_nitrogeno <= 0.360)
                        ? AQI_func(dio_nitrogeno, 0.101, 0.360, 101, 150)
                        : (dio_nitrogeno > 0.360 && dio_nitrogeno <= 0.649)
                            ? AQI_func(dio_nitrogeno, 0.361, 0.649, 151, 200)
                            : (dio_nitrogeno > 0.649 && dio_nitrogeno <= 1.249)
                                ? AQI_func(dio_nitrogeno, 0.650, 1.249, 201, 300)
                                : (dio_nitrogeno > 1.249 && dio_nitrogeno <= 1.649)
                                    ? AQI_func(dio_nitrogeno, 1.250, 1.649, 301, 400)
                                    : (dio_nitrogeno > 1.649 && dio_nitrogeno <= 2.049)
                                        ? AQI_func(dio_nitrogeno, 1.650, 2.049, 401, 500)
                                        : dio_nitrogeno,


            (pm2_5 >= 0.0 && pm2_5 <= 12.0)
                ? AQI_func(pm2_5, 0.0, 12.0, 0, 50)
                : (pm2_5 > 12.0 && pm2_5 <= 35.4)
                    ? AQI_func(pm2_5, 12.1, 35.4, 51, 100)
                    : (pm2_5 > 35.4 && pm2_5 <= 55.4)
                        ? AQI_func(pm2_5, 35.5, 55.4, 101, 150)
                        : (pm2_5 > 55.4 && pm2_5 <= 150.4)
                            ? AQI_func(pm2_5, 55.5, 150.4, 151, 200)
                            : (pm2_5 > 150.4 && pm2_5 <= 250.4)
                                ? AQI_func(pm2_5, 150.5, 250.4, 201, 300)
                                : (pm2_5 > 250.4 && pm2_5 <= 350.4)
                                    ? AQI_func(pm2_5, 250.5, 350.4, 301, 400)
                                    : (pm2_5 > 350.4 && pm2_5 <= 500.4)
                                        ? AQI_func(pm2_5, 350.5, 500.4, 401, 500)
                                        : pm2_5,


            (Ozono >= 0.000 && Ozono <= 0.054)
                ? AQI_func(Ozono, 0.000, 0.054, 0, 50)
                : (Ozono > 0.054 && Ozono <= 0.070)
                    ? AQI_func(Ozono, 0.055, 0.070, 51, 100)
                    : (Ozono > 0.070 && Ozono <= 0.085)
                        ? AQI_func(Ozono, 0.071, 0.085, 101, 150)
                        : (Ozono > 0.085 && Ozono <= 0.105)
                            ? AQI_func(Ozono, 0.086, 0.105, 151, 200)
                            : (Ozono > 0.105 && Ozono <= 0.200)
                                ? AQI_func(Ozono, 0.106, 0.200, 201, 300)
                                : (Ozono > 0.200 && Ozono <= 0.604)
                                    ? AQI_func(Ozono, 0.201, 0.604, 301, 500)
                                    : Ozono,


            (pm10 >= 0 && pm10 <= 54)
                ? AQI_func(pm10, 0, 54, 0, 50)
                : (pm10 > 54 && pm10 <= 154)
                    ? AQI_func(pm10, 55, 154, 51, 100)
                    : (pm10 > 154 && pm10 <= 254)
                        ? AQI_func(pm10, 155, 254, 101, 150)
                        : (pm10 > 254 && pm10 <= 354)
                            ? AQI_func(pm10, 255, 354, 151, 200)
                            : (pm10 > 354 && pm10 <= 424)
                                ? AQI_func(pm10, 355, 424, 201, 300)
                                : (pm10 > 424 && pm10 <= 504)
                                    ? AQI_func(pm10, 425, 504, 301, 400)
                                    : (pm10 > 504 && pm10 <= 604)
                                        ? AQI_func(pm10, 505, 604, 401, 500)
                                        : pm10
        ];
        //alert(data_2)


        let temp_arr = [
            { Name: "Mono-Carbono", value: data_2[0], Message: climateAlert.response.QualityMetrics.MonoCarbono.MetricsData.Message, color: climateAlert.response.QualityMetrics.MonoCarbono.MetricsData.color, titulo: climateAlert.response.QualityMetrics.MonoCarbono.MetricsData.titulo, alert: climateAlert.response.QualityMetrics.MonoCarbono.MetricsData.alert, medidor: 'ppm' },
            { Name: "Dio-Azufre", value: data_2[1], Message: climateAlert.response.QualityMetrics.DioAzufre.MetricsData.Message, color: climateAlert.response.QualityMetrics.DioAzufre.MetricsData.color, titulo: climateAlert.response.QualityMetrics.DioAzufre.MetricsData.titulo, alert: climateAlert.response.QualityMetrics.DioAzufre.MetricsData.alert, medidor: 'ppm' },
            { Name: "Dio-Nitrogeno", value: data_2[2], Message: climateAlert.response.QualityMetrics.DioNitrogeno.MetricsData.Message, color: climateAlert.response.QualityMetrics.DioNitrogeno.MetricsData.color, titulo: climateAlert.response.QualityMetrics.DioNitrogeno.MetricsData.titulo, alert: climateAlert.response.QualityMetrics.DioNitrogeno.MetricsData.alert, medidor: 'ppm' },
            { Name: "Ozono", value: data_2[4], Message: climateAlert.response.QualityMetrics.Ozono.MetricsData.Message, titulo: climateAlert.response.QualityMetrics.Ozono.MetricsData.titulo, alert: climateAlert.response.QualityMetrics.Ozono.MetricsData.alert, medidor: 'ppm' },
            { Name: "PM2_5", value: data_2[3], Message: climateAlert.response.QualityMetrics.PM2_5.MetricsData.Message, color: climateAlert.response.QualityMetrics.PM2_5.MetricsData.color, titulo: climateAlert.response.QualityMetrics.PM2_5.MetricsData.titulo, alert: climateAlert.response.QualityMetrics.PM2_5.MetricsData.alert, medidor: 'µg/m³' },
            { Name: "PM10", value: data_2[5], Message: climateAlert.response.QualityMetrics.PM10.MetricsData.Message, color: climateAlert.response.QualityMetrics.PM10.MetricsData.color, titulo: climateAlert.response.QualityMetrics.PM10.MetricsData.titulo, alert: climateAlert.response.QualityMetrics.PM10.MetricsData.alert, medidor: 'µg/m³' }
        ];






        temp_arr = temp_arr.filter((obj) => obj.value).sort((a, b) => b.value - a.value).slice(0, 3);
        //alert(data_2)
        //alert(JSON.stringify(temp_arr))
        setQualityAir_elements(temp_arr);

        //alert(QualityAir_Elements.length)

        //setQualityAir_elements(temp_arr);
        const level_contamination = climateAlert.response["Quality-Air"]["Quality-Air"].IndicatorGraph.data;
        const precipitation_local = climateAlert.response.Precipitacion.Precipitacion.IndicatorGraph.data;
        const velocidad_viento = climateAlert.response["Velocidad-Viento"]["Velocidad-Viento"].IndicatorGraph.data;


        const qualityAirJson = {
            "CO": data_2[0],
            "NO2": data_2[2],
            "O3": data_2[4],
            "PM2_5": data_2[3],
            "PM10": data_2[5],
            "SO2": data_2[4]
        }
        const PronosticJson = {
            "Nubosidad": nubosidad,
            "Humedad": humidity,
            "Visibilidad": visibilidad
        }
        setPronosticDetails(PronosticJson)
        setQualityAirDetails(qualityAirJson);
        setPronosticInitial(pronostic);
        setPronostic(pronostic);
        setLocation(location_last);
        setIsDay(is_day);

        setNubosidad(nubosidad);
        //setHumedad(humidity);
        setVisibilidad(visibilidad);
        setMonoCarbono(mono_carbono);
        setDioNitrogeno(dio_nitrogeno);
        setDioAzufre(dio_azufre);
        setPrecipitacion(precipitation_local);
        setVelocidadViento(velocidad_viento)
        setOzono(Ozono);
        setPm2_5(pm2_5);
        setPm10(pm10);

        setLevelQualityAir(level_contamination);
        const images = JsonImage.wallPapersCategory[`${is_day}-${pronostic}`];



        setBackground(images);
        const themeD = (isDay === 'nigth') ? true : false
        setIsDay_global((isDay === 'nigth') ? true : false);
        setDarkLetters(themeD);



        setJsonPronosticImage(JsonIcon['icon'][is_day][`${is_day}-${pronostic}`]);
        setAirQualityImage(JsonIcon['icon']['Air-Quality'][level_contamination]);

        //setJsonPronosticImage(JsonIcon['icon'][isDay][`${isDay}-${Pronostic}`]);
        //alert(QualityAir_Elements);
        //setQualityAir_elements(QualityAir_Elements.toSorted().toReversed());
    }, [PronosticInitial])

    const handleCloseModal = () => {
        if (typeof setOpenModal === "function") setOpenModal(false);
    };

    return (
        <>
            <Box
                sx={{
                    mt: '10px',
                    width: '100%',
                    left: '100px',
                    maxWidth: isMobile ? 'md' : '1378px'
                }}
            >
                <Card
                    sx={{
                        borderRadius: '14px',
                        border: isDay_global
                            ? '1px solid rgba(255,255,255,0.12)'
                            : '1px solid rgba(0,0,0,0.06)',
                        backgroundColor: isDay_global
                            ? 'rgba(255,255,255,0.04)'
                            : 'rgba(255,255,255,0.20)',
                        backdropFilter: 'blur(12px)',
                        boxShadow: isDay_global
                            ? '0 8px 30px rgba(0,0,0,0.05)'
                            : '0 8px 30px rgba(0,0,0,0.035)',
                        overflow: 'hidden'
                    }}
                >
                    <CardContent sx={{ p: 2 }}>

                        {/* ENCABEZADO */}
                        <Stack
                            direction={isMobile ? "column" : "row"}
                            justifyContent="space-between"
                            alignItems={isMobile ? "flex-start" : "center"}
                            spacing={1}
                            sx={{ mb: 1 }}
                        >
                            <Stack direction="row" alignItems="center" spacing={0.7}>
                                <CloudOutlinedIcon
                                    sx={{
                                        fontSize: 20,
                                        color: isDay_global ? 'white' : '#455a64'
                                    }}
                                />

                                <Typography
                                    variant="body1"
                                    sx={{
                                        color: isDay_global ? 'white' : 'black',
                                        fontWeight: 600
                                    }}
                                >
                                    Pronostico Hoy
                                </Typography>
                            </Stack>

                            <Chip
                                icon={
                                    <LocationOnIcon
                                        sx={{
                                            fontSize: '18px !important',
                                            color: isDay_global
                                                ? 'rgba(255,255,255,0.85)'
                                                : 'rgba(0,0,0,0.60)'
                                        }}
                                    />
                                }
                                label={location}
                                variant="outlined"
                                sx={{
                                    height: '34px',
                                    maxWidth: '100%',
                                    borderRadius: '18px',

                                    color: isDay_global
                                        ? 'rgba(255,255,255,0.90)'
                                        : 'rgba(0,0,0,0.70)',

                                    borderColor: isDay_global
                                        ? 'rgba(255,255,255,0.18)'
                                        : 'rgba(0,0,0,0.10)',

                                    backgroundColor: isDay_global
                                        ? 'rgba(255,255,255,0.035)'
                                        : 'rgba(255,255,255,0.20)',

                                    backdropFilter: 'blur(6px)',

                                    '& .MuiChip-label': {
                                        px: 1.2,
                                        fontSize: '0.82rem',
                                        fontWeight: 500,
                                        whiteSpace: 'nowrap',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis'
                                    },

                                    '&:hover': {
                                        backgroundColor: isDay_global
                                            ? 'rgba(255,255,255,0.07)'
                                            : 'rgba(255,255,255,0.35)',

                                        borderColor: isDay_global
                                            ? 'rgba(255,255,255,0.28)'
                                            : 'rgba(0,0,0,0.16)'
                                    },

                                    transition: 'all .2s ease'
                                }}
                            />
                        </Stack>

                        <Divider
                            sx={{
                                mb: 1.5,
                                opacity: 0.45
                            }}
                        />

                        <Stack direction={isMobile ? "column" : "row"}>

                            {/* PRONOSTICO */}
                            <Stack
                                direction="column"
                                justifyContent="space-between"
                                spacing={1}
                            >
                                <Stack direction="row" alignItems="center" spacing={0.7}>
                                    <CloudOutlinedIcon
                                        sx={{
                                            fontSize: 19,
                                            color: isDay_global ? 'white' : '#455a64'
                                        }}
                                    />

                                    <Typography
                                        variant="h6"
                                        sx={{
                                            color: isDay_global ? 'white' : 'black',
                                            fontSize: '1.05rem',
                                            fontWeight: 600
                                        }}
                                    >
                                        {`${isDay} ${PronosticInitial}`}
                                    </Typography>
                                </Stack>

                                <Stack
                                    direction={isMobile ? "column" : 'row'}
                                    spacing={1}
                                >
                                    <Card
                                        sx={{
                                            boxShadow: '0 2px 6px rgba(0,0,0,0.08)',
                                            border: '1px solid rgba(218,218,218,0.8)',
                                            borderRadius: '4px',
                                            backgroundColor: 'rgba(255, 255, 255, 0.2)',
                                            transition: 'box-shadow 0.2s ease, border-color 0.2s ease',
                                            '&:hover': {
                                                boxShadow: '0 4px 10px rgba(0,0,0,0.12)',
                                                borderColor: 'rgba(120,120,120,0.5)'
                                            }
                                        }}
                                    >
                                        <CardContent sx={{ p: 2 }}>

                                            <Box
                                                sx={{
                                                    position: 'relative',
                                                    width: '250px',
                                                    height: '300px',
                                                    overflow: 'hidden',
                                                    borderRadius: '4px',
                                                    mb: 1
                                                }}
                                            >
                                                <Image
                                                    src={JsonPronosticImage}
                                                    width={250}
                                                    height={300}
                                                />

                                                <Box
                                                    sx={{
                                                        position: 'absolute',
                                                        top: 8,
                                                        left: 8
                                                    }}
                                                >
                                                    <Chip
                                                        size="small"
                                                        label={isDay}
                                                        icon={
                                                            <CloudOutlinedIcon
                                                                sx={{ fontSize: 15 }}
                                                            />
                                                        }
                                                        sx={{
                                                            backgroundColor: 'rgba(0,0,0,0.55)',
                                                            color: 'white',
                                                            backdropFilter: 'blur(4px)',
                                                            fontWeight: 600
                                                        }}
                                                    />
                                                </Box>
                                            </Box>

                                            <Stack
                                                direction="row"
                                                justifyContent="space-between"
                                                alignItems="center"
                                                sx={{ py: 0.5 }}
                                            >
                                                <PopoverComponent
                                                    tipo={
                                                        <Chip
                                                            size="small"
                                                            sx={{
                                                                width: 'auto',
                                                                fontWeight: 500
                                                            }}
                                                            label="Nubosidad:"
                                                            icon={
                                                                <CloudOutlinedIcon
                                                                    sx={{ fontSize: 15 }}
                                                                />
                                                            }
                                                            color={
                                                                climateAlert.response
                                                                    .PronosticsMetrics
                                                                    .Nubosidad
                                                                    .MetricsData.alert
                                                            }
                                                        />
                                                    }
                                                    text={
                                                        climateAlert.response
                                                            .PronosticsMetrics
                                                            .Nubosidad
                                                            .MetricsData.Message
                                                    }
                                                    titulo={
                                                        climateAlert.response
                                                            .PronosticsMetrics
                                                            .Nubosidad
                                                            .MetricsData.titulo
                                                    }
                                                    alert={
                                                        climateAlert.response
                                                            .PronosticsMetrics
                                                            .Nubosidad
                                                            .MetricsData.alert
                                                    }
                                                />

                                                <Chip
                                                    size="small"
                                                    label={`${climateAlert.response.PronosticsMetrics.Nubosidad.data} %`}
                                                    color={
                                                        climateAlert.response
                                                            .PronosticsMetrics
                                                            .Nubosidad
                                                            .MetricsData.alert
                                                    }
                                                    sx={{ fontWeight: 600 }}
                                                />
                                            </Stack>

                                            <Divider sx={{ opacity: 0.5 }} />

                                            <Stack
                                                direction="row"
                                                justifyContent="space-between"
                                                alignItems="center"
                                                sx={{ py: 0.5 }}
                                            >
                                                <PopoverComponent
                                                    tipo={
                                                        <Chip
                                                            size="small"
                                                            label="Humedad:"
                                                            icon={
                                                                <WaterDropOutlinedIcon
                                                                    sx={{ fontSize: 15 }}
                                                                />
                                                            }
                                                            sx={{
                                                                width: 'auto',
                                                                fontWeight: 500
                                                            }}
                                                            color={
                                                                climateAlert.response
                                                                    .PronosticsMetrics
                                                                    .Humedad
                                                                    .MetricsData.alert
                                                            }
                                                        />
                                                    }
                                                    text={
                                                        climateAlert.response
                                                            .PronosticsMetrics
                                                            .Humedad
                                                            .MetricsData.Message
                                                    }
                                                    titulo={
                                                        climateAlert.response
                                                            .PronosticsMetrics
                                                            .Humedad
                                                            .MetricsData.titulo
                                                    }
                                                    alert={
                                                        climateAlert.response
                                                            .PronosticsMetrics
                                                            .Humedad
                                                            .MetricsData.alert
                                                    }
                                                />

                                                <Chip
                                                    size="small"
                                                    label={`${climateAlert.response.PronosticsMetrics.Humedad.data} %`}
                                                    color={
                                                        climateAlert.response
                                                            .PronosticsMetrics
                                                            .Humedad
                                                            .MetricsData.alert
                                                    }
                                                    sx={{ fontWeight: 600 }}
                                                />
                                            </Stack>

                                            <Divider sx={{ opacity: 0.5 }} />

                                            <Stack
                                                direction="row"
                                                justifyContent="space-between"
                                                alignItems="center"
                                                sx={{ py: 0.5 }}
                                            >
                                                <PopoverComponent
                                                    tipo={
                                                        <Chip
                                                            size="small"
                                                            label="Visibilidad:"
                                                            icon={
                                                                <VisibilityOutlinedIcon
                                                                    sx={{ fontSize: 15 }}
                                                                />
                                                            }
                                                            sx={{
                                                                width: 'auto',
                                                                fontWeight: 500
                                                            }}
                                                            color={
                                                                climateAlert.response
                                                                    .PronosticsMetrics
                                                                    .Visibilidad
                                                                    .MetricsData.alert
                                                            }
                                                        />
                                                    }
                                                    text={
                                                        climateAlert.response
                                                            .PronosticsMetrics
                                                            .Visibilidad
                                                            .MetricsData.Message
                                                    }
                                                    titulo={
                                                        climateAlert.response
                                                            .PronosticsMetrics
                                                            .Visibilidad
                                                            .MetricsData.titulo
                                                    }
                                                    alert={
                                                        climateAlert.response
                                                            .PronosticsMetrics
                                                            .Visibilidad
                                                            .MetricsData.alert
                                                    }
                                                />

                                                <Chip
                                                    size="small"
                                                    label={`${climateAlert.response.PronosticsMetrics.Visibilidad.data} Kilometros`}
                                                    color={
                                                        climateAlert.response
                                                            .PronosticsMetrics
                                                            .Visibilidad
                                                            .MetricsData.alert
                                                    }
                                                    sx={{ fontWeight: 600 }}
                                                />
                                            </Stack>

                                            <Divider sx={{ opacity: 0.5 }} />

                                            <Box sx={{ mt: 1 }}>
                                                <Button
                                                    variant="outlined"
                                                    onClick={() => handleOpenModal(3)}
                                                    size="small"
                                                    startIcon={
                                                        <InfoOutlinedIcon
                                                            sx={{ fontSize: 17 }}
                                                        />
                                                    }
                                                    sx={{
                                                        width: '100%',
                                                        color: isDay_global
                                                            ? 'white'
                                                            : 'black',
                                                        borderColor:
                                                            isDay === 'nigth'
                                                                ? 'white'
                                                                : 'black',
                                                        textTransform: 'none',
                                                        fontWeight: 600,
                                                        borderRadius: '4px'
                                                    }}
                                                >
                                                    Ver Detalles
                                                </Button>
                                            </Box>
                                        </CardContent>
                                    </Card>

                                    <Box sx={{ width: '10%' }}>
                                        <Stack spacing={2} direction="column">
                                            <Stack direction="row" spacing={1}>
                                            </Stack>
                                        </Stack>
                                    </Box>
                                </Stack>
                            </Stack>

                            {/* CALIDAD DEL AIRE */}
                            <Stack
                                direction="column"
                                justifyContent="space-between"
                                spacing={1}
                            >
                                <Stack direction="row" alignItems="center" spacing={0.7}>
                                    <AirOutlinedIcon
                                        sx={{
                                            fontSize: 19,
                                            color: isDay_global ? 'white' : '#455a64'
                                        }}
                                    />

                                    <Typography
                                        variant="h6"
                                        sx={{
                                            color: isDay_global ? 'white' : 'black',
                                            fontSize: '1.05rem',
                                            fontWeight: 600
                                        }}
                                    >
                                        Calidad del Aire
                                    </Typography>
                                </Stack>

                                <Stack
                                    direction={isMobile ? "column" : 'row'}
                                    spacing={1}
                                >
                                    <Card
                                        key={Date.now()}
                                        sx={{
                                            boxShadow: '0 2px 6px rgba(0,0,0,0.08)',
                                            border: '1px solid rgba(218,218,218,0.8)',
                                            borderRadius: '4px',
                                            backgroundColor: 'rgba(255, 255, 255, 0.2)',
                                            transition: 'box-shadow 0.2s ease, border-color 0.2s ease',
                                            '&:hover': {
                                                boxShadow: '0 4px 10px rgba(0,0,0,0.12)',
                                                borderColor: 'rgba(120,120,120,0.5)'
                                            }
                                        }}
                                    >
                                        <CardContent sx={{ p: 2 }}>

                                            <Box
                                                sx={{
                                                    position: 'relative',
                                                    width: '250px',
                                                    height: '300px',
                                                    overflow: 'hidden',
                                                    borderRadius: '4px',
                                                    mb: 1
                                                }}
                                            >
                                                <Image
                                                    src={AirQualityImage}
                                                    width={250}
                                                    height={300}
                                                />

                                                <Box
                                                    sx={{
                                                        position: 'absolute',
                                                        top: 8,
                                                        left: 8
                                                    }}
                                                >
                                                    <Chip
                                                        size="small"
                                                        label="Calidad"
                                                        icon={
                                                            <AirOutlinedIcon
                                                                sx={{ fontSize: 15 }}
                                                            />
                                                        }
                                                        sx={{
                                                            backgroundColor: 'rgba(0,0,0,0.55)',
                                                            color: 'white',
                                                            backdropFilter: 'blur(4px)',
                                                            fontWeight: 600
                                                        }}
                                                    />
                                                </Box>
                                            </Box>

                                            {Array.isArray(QualityAir_Elements) &&
                                                QualityAir_Elements.length > 0 ? (
                                                QualityAir_Elements.map((element, idx) => {

                                                    const airColor =
                                                        element.alert === 'xtreme'
                                                            ? element.color
                                                            : element.alert;

                                                    return (
                                                        <Stack key={idx}>
                                                            <Stack
                                                                direction="row"
                                                                justifyContent="space-between"
                                                                alignItems="center"
                                                                sx={{ py: 0.5 }}
                                                            >
                                                                <PopoverComponent
                                                                    tipo={
                                                                        <Chip
                                                                            size="small"
                                                                            label={element.Name}
                                                                            icon={
                                                                                <AirOutlinedIcon
                                                                                    sx={{ fontSize: 15 }}
                                                                                />
                                                                            }
                                                                            sx={{
                                                                                width: '100%',
                                                                                backgroundColor: airColor,
                                                                                color: 'white',
                                                                                fontWeight: 500
                                                                            }}
                                                                            color={element.alert}
                                                                        />
                                                                    }
                                                                    color={airColor}
                                                                    text={element.Message}
                                                                    titulo={element.titulo}
                                                                    alert={element.alert}
                                                                />

                                                                <Chip
                                                                    size="small"
                                                                    label={
                                                                        element.medidor !== 'ppm'
                                                                            ? `${element.value.toFixed(2)} ${element.medidor}`
                                                                            : element.Name === 'Mono-Carbono'
                                                                                ? `${((((element.value * 24.45) / 28.01) / 1000).toFixed(2))} ${element.medidor}`
                                                                                : element.Name === 'Dio-Nitrogeno'
                                                                                    ? `${((((element.value * 24.45) / 46.0055) / 1000).toFixed(2))} ${element.medidor}`
                                                                                    : element.Name === 'Dio-Azufre'
                                                                                        ? `${((((element.value * 64.07) / 28.01) / 1000).toFixed(2))} ${element.medidor}`
                                                                                        : element.Name === 'Ozono'
                                                                                            ? `${((((element.value * 24.45) / 47.998) / 1000).toFixed(2))} ${element.medidor}`
                                                                                            : '404'
                                                                    }
                                                                    sx={{
                                                                        width: '100%',
                                                                        backgroundColor: airColor,
                                                                        color: 'white',
                                                                        fontWeight: 600
                                                                    }}
                                                                    color={element.alert}
                                                                />
                                                            </Stack>

                                                            <Divider sx={{ opacity: 0.5 }} />
                                                        </Stack>
                                                    );
                                                })
                                            ) : (
                                                <Alert
                                                    severity="error"
                                                    variant="filled"
                                                    sx={{
                                                        borderRadius: '4px'
                                                    }}
                                                >
                                                    Informacion temporalmente no disponible
                                                </Alert>
                                            )}

                                            <Box sx={{ mt: 1 }}>
                                                <Button
                                                    variant="outlined"
                                                    onClick={() => handleOpenModal(2)}
                                                    size="small"
                                                    startIcon={
                                                        <InfoOutlinedIcon
                                                            sx={{ fontSize: 17 }}
                                                        />
                                                    }
                                                    sx={{
                                                        width: '100%',
                                                        color:
                                                            isDay === 'nigth'
                                                                ? 'white'
                                                                : 'black',
                                                        borderColor:
                                                            isDay === 'nigth'
                                                                ? 'white'
                                                                : 'black',
                                                        textTransform: 'none',
                                                        fontWeight: 600,
                                                        borderRadius: '4px'
                                                    }}
                                                >
                                                    Ver Detalles
                                                </Button>
                                            </Box>
                                        </CardContent>
                                    </Card>

                                    <Box sx={{ width: '10%' }}>
                                        <Stack spacing={2} direction="column">
                                            <Stack direction="row" spacing={1}>
                                            </Stack>
                                        </Stack>
                                    </Box>
                                </Stack>
                            </Stack>

                            {/* GRAFICOS */}
                            <Stack direction="column">
                                <Stack
                                    direction={isMobile ? 'column' : 'row'}
                                >
                                    <Suspense
                                        fallback={
                                            <Box sx={{ width: 100, px: 1 }}>
                                                <LinearProgress />
                                            </Box>
                                        }
                                    >
                                        <IndicatorGraph
                                            min={0}
                                            max={6}
                                            type="Quality-Air"
                                            indicator="ppm"
                                            split={5}
                                            color={
                                                climateAlert.response[
                                                    "Quality-Air"
                                                ]["Quality-Air"]
                                                    .IndicatorGraph
                                                    .MetricsData.color
                                            }
                                            data={levelQualityAir}
                                            optionalData={3}
                                            recomendedLimit={3}
                                        />
                                    </Suspense>

                                    <Suspense
                                        fallback={
                                            <Box sx={{ width: 100, px: 1 }}>
                                                <LinearProgress />
                                            </Box>
                                        }
                                    >
                                        <IndicatorGraph
                                            min={0}
                                            max={40}
                                            type="Precipitacion"
                                            indicator="Dm"
                                            split={5}
                                            data={precipitacion / 100}
                                            optionalData={12}
                                            recomendedLimit={12}
                                        />
                                    </Suspense>

                                    <Suspense
                                        fallback={
                                            <Box sx={{ width: 100, px: 1 }}>
                                                <LinearProgress />
                                            </Box>
                                        }
                                    >
                                        <IndicatorGraph
                                            min={0}
                                            max={100}
                                            type="Velocidad-Viento"
                                            indicator="kph"
                                            split={5}
                                            data={velocidadViento}
                                            optionalData={65}
                                            recomendedLimit={65}
                                        />
                                    </Suspense>
                                </Stack>

                                <Stack
                                    direction="row"
                                    justifyContent="space-between"
                                    alignItems="center"
                                    sx={{
                                        mb: 1
                                    }}
                                >

                                    <Stack
                                        direction="row"
                                        alignItems="center"
                                        spacing={1}
                                    >
                                        <Box
                                            sx={{
                                                width: '8px',
                                                height: '8px',
                                                borderRadius: '50%',
                                                backgroundColor: isAlertsOrWarningsB ? '#f44336' : '#3698f4',
                                                boxShadow: isAlertsOrWarningsB ? '0 0 0 4px rgba(244,67,54,0.08)' : '0 0 0 4px rgba(54, 174, 244, 0.08)'
                                            }}
                                        />

                                        <Typography
                                            variant="subtitle2"
                                            sx={{
                                                color: isDay_global
                                                    ? 'white'
                                                    : '#333',
                                                fontWeight: 600
                                            }}
                                        >
                                            Panel de Alertas
                                        </Typography>
                                    </Stack>

                                    <Typography
                                        variant="caption"
                                        sx={{
                                            color: isDay_global
                                                ? 'rgba(255,255,255,0.50)'
                                                : 'rgba(0,0,0,0.40)'
                                        }}
                                    >
                                        Estado actual
                                    </Typography>

                                </Stack>

                                <Box
                                    sx={{
                                        width: '100%',
                                        height: isMobile
                                            ? '300px'
                                            : '300px',
                                        borderRadius: '10px',
                                        backgroundColor: isDay_global
                                            ? 'rgba(0,0,0,0.035)'
                                            : 'rgba(255,255,255,0.12)',
                                        border: isDay_global
                                            ? '1px solid rgba(255,255,255,0.07)'
                                            : '1px solid rgba(0,0,0,0.05)',
                                        overflowY: 'auto',
                                        overflowX: 'hidden',
                                        p: 1
                                    }}
                                >
                                    {isAlertsOrWarningsB ? (
                                        arrDataDashBoardB.map((element, idx) => {
                                            const Alerts =
                                                climateAlert.response[element][element]?.Alerts;

                                            const Warnings =
                                                climateAlert.response[element][element]?.Warnings;

                                            return (
                                                Object.keys(Alerts[0]).length > 0 ||
                                                Object.keys(Warnings[0]).length > 0
                                            ) ? (
                                                <React.Fragment key={`dashboard-${idx}`}>
                                                    {
                                                        Object.keys(Alerts[0]).length === 0 ? (
                                                            <div></div>
                                                        ) : (
                                                            Alerts.map((object, inx) => (
                                                                <Alert
                                                                    key={`alert-${idx}-${inx}`}
                                                                    sx={{
                                                                        width: '95%',
                                                                        height: '38%',
                                                                        marginTop: '15px',
                                                                        marginLeft: '10px',
                                                                        backgroundColor: 'rgba(255, 0, 0, 0.47)',
                                                                        borderRadius: '6px',
                                                                        boxShadow: '0 2px 6px rgba(0,0,0,0.12)'
                                                                    }}
                                                                    variant="filled"
                                                                    severity="error"
                                                                >
                                                                    <AlertTitle>
                                                                        ¡{object?.alertBody?.titulo || "No Disponible"}!
                                                                    </AlertTitle>

                                                                    <Typography variant="caption">
                                                                        {object?.type || "No disponible"}
                                                                    </Typography>
                                                                </Alert>
                                                            ))
                                                        )
                                                    }

                                                    {
                                                        Object.keys(Warnings[0]).length === 0 ? (
                                                            <div></div>
                                                        ) : (
                                                            Warnings.map((object, inx) => (
                                                                <Alert
                                                                    key={`warning-${idx}-${inx}`}
                                                                    sx={{
                                                                        width: '95%',
                                                                        height: isMobile ? '38%' : '28%',
                                                                        marginTop: '15px',
                                                                        marginLeft: '10px',
                                                                        backgroundColor: 'rgba(255, 136, 0, 0.47)',
                                                                        borderRadius: '6px',
                                                                        boxShadow: '0 2px 6px rgba(0,0,0,0.12)'
                                                                    }}
                                                                    variant="filled"
                                                                    severity="warning"
                                                                >
                                                                    <AlertTitle>
                                                                        ¡{object?.alertBody?.titulo || idx}!
                                                                    </AlertTitle>

                                                                    <Typography variant="caption">
                                                                        {object?.type || "No disponible"}
                                                                    </Typography>
                                                                </Alert>
                                                            ))
                                                        )
                                                    }
                                                </React.Fragment>
                                            ) : null;
                                        })
                                    ) : (
                                        <Box
                                            sx={{
                                                width: '100%',
                                                height: '100%',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                flexDirection: 'column',
                                                gap: 0.5
                                            }}
                                        >

                                            <CrisisAlertIcon
                                                sx={{
                                                    fontSize: 30,
                                                    opacity: 0.25,
                                                    color: isDay_global
                                                        ? 'white'
                                                        : '#555'
                                                }}
                                            />

                                            <Typography
                                                variant="body2"
                                                sx={{
                                                    color: isDay_global
                                                        ? 'rgba(255,255,255,0.50)'
                                                        : 'rgba(0,0,0,0.45)',
                                                    fontWeight: 500
                                                }}
                                            >
                                                Sin novedades
                                            </Typography>

                                            <Typography
                                                variant="caption"
                                                sx={{
                                                    color: isDay_global
                                                        ? 'rgba(255,255,255,0.30)'
                                                        : 'rgba(0,0,0,0.30)'
                                                }}
                                            >
                                                No hay alertas meteorológicas activas
                                            </Typography>

                                        </Box>
                                    )}
                                </Box>
                            </Stack>
                        </Stack>
                    </CardContent>
                </Card>

                <br />

                <GenericModal
                    element={
                        typeModal === 'GAUGE' ? (
                            <>
                                <Suspense fallback={<div>Cargando Grafico...</div>}>
                                    <IndicatorDetails
                                        title2={'Rango Recomendable'}
                                        title1={
                                            dataType === 'Quality-Air'
                                                ? 'Calidad del Aire'
                                                : dataType === 'Precipitacion'
                                                    ? 'Precipitacion'
                                                    : dataType === 'Velocidad-Viento'
                                                        ? 'Velocidad'
                                                        : 'Valor no encontrado'
                                        }
                                        valor={dataModal}
                                        valorOpcional={dataOptional}
                                        type={dataType}
                                    />
                                </Suspense>

                                <Stack spacing={1}>
                                    <Box>
                                        <Alert
                                            variant="filled"
                                            severity="info"
                                            sx={{
                                                backgroundColor: '#4fd6ff7a',
                                                borderRadius: '5px'
                                            }}
                                        >
                                            <AlertTitle>
                                                ¡IMPORTANTE!
                                            </AlertTitle>

                                            <Typography variant="caption">
                                                {climateAlert.response[dataType][dataType]
                                                    .IndicatorGraph.MetricsData.Message}
                                            </Typography>
                                        </Alert>
                                    </Box>

                                    <Stack>
                                        <Stack direction="row" spacing={1}>
                                            <Box
                                                sx={{
                                                    backgroundColor: 'rgba(10, 92, 175, 0.92)',
                                                    height: '15px',
                                                    width: '15px',
                                                    borderRadius: '5%'
                                                }}
                                            />

                                            <Typography
                                                color="rgba(255, 255, 255, 0.77)"
                                                variant="caption"
                                            >
                                                Valor Actual ({dataModal})
                                            </Typography>
                                        </Stack>

                                        <Stack direction="row" spacing={1}>
                                            <Box
                                                sx={{
                                                    backgroundColor: 'rgba(142, 228, 72, 0.92)',
                                                    height: '15px',
                                                    width: '15px',
                                                    borderRadius: '5%'
                                                }}
                                            />

                                            <Typography
                                                color="rgba(255, 255, 255, 0.77)"
                                                variant="caption"
                                            >
                                                {'Limite Recomendable'} ({dataOptional})
                                            </Typography>
                                        </Stack>
                                    </Stack>
                                </Stack>
                            </>
                        ) : typeModal === 'Pronostico' ? (
                            <>
                                <Stack direction="column">
                                    <Typography
                                        color="white"
                                        sx={{
                                            fontWeight: 600,
                                            mb: 1
                                        }}
                                    >
                                        Mas Detalles
                                    </Typography>

                                    <Alert
                                        variant="filled"
                                        severity="info"
                                        sx={{
                                            backgroundColor: '#4fd6ff7a',
                                            borderRadius: '5px'
                                        }}
                                    >
                                        <AlertTitle>
                                            ¡IMPORTANTE!
                                        </AlertTitle>

                                        <Typography variant="caption">
                                            {
                                                ClimateDefinition.Definition[
                                                PronosticInitial.replaceAll('-', " ")
                                                ]
                                            }
                                        </Typography>
                                    </Alert>

                                    <TreeGraph data={PronosticDetails} type="Pronostico" />
                                </Stack>
                            </>
                        ) : typeModal === 'Quality-Air' ? (
                            <>
                                <Stack direction="column" spacing={1}>
                                    <Stack direction="row" spacing={1}>
                                        <TreeGraph data={QualityAirDetails} type="QualityAir" />
                                    </Stack>
                                </Stack>
                            </>
                        ) : (
                            <Typography>
                                Elemento no Categorizado
                            </Typography>
                        )
                    }
                    open={openModal}
                    onClose={handleCloseModal}
                />
            </Box>
        </>
    );
};

export default Pronostics;
