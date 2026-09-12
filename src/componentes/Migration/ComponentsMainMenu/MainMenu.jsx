import {
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
import Chip from "@mui/material/Chip";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import Divider from '@mui/material/Divider';
import { useState, useMemo, useContext, useEffect, lazy, Suspense } from "react";
import { DataContext } from "../../../Context/MetricsContext.js"
import { Ui_Context } from "../../../Context/Ui-Context.js";
import { Test_context } from "../../../Context/test-context.js";
import IndicatorGraph from "../Graphics/Indicator.jsx";
import GenericModal from "../Modal/GenericModal.jsx";
import Snackbar from '@mui/material/Snackbar';
import JsonImage from '../../dataJson/wallpaper.json';
import { Vibrant } from "node-vibrant/browser";
import Skeleton from '@mui/material/Skeleton';
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';
import CircularProgress from '@mui/material/CircularProgress';
import CrisisAlertIcon from '@mui/icons-material/CrisisAlert';
import Countries_Cities from '../../dataJson/countries_cities.json'
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import ListItems from "../GenericComponentes/ListItems.jsx";
import ReportGmailerrorredIcon from '@mui/icons-material/ReportGmailerrorred';
import LocationOnIcon from '@mui/icons-material/LocationOn';

const IndicatorDetails = lazy(() => import("../Graphics/indicatorDetails.jsx"))
const LazyIframe = lazy(() => import("./LazyIframe.jsx"));


const MainMenu = () => {
    const [button_disable, setDissable] = useState(true);
    const [open, setOpen] = useState(false);
    const [Temperatura, setTemperature] = useState("");
    const [dataTempAprox, setdataTempAprox] = useState("");
    const [radiacionUV, setRadiacionUV] = useState("");
    const [location, setLocation] = useState("");
    const [locationMap,setLocationMap] = useState("");
    const [messageSnackBar, setMessageSnackBar] = useState();
    const [isSnackBarActive, setIsSnackBarActive] = useState(false);
    const [isLocalizeExec] = useState(false);
    const [custom_latitude, SetCustomLatitude] = useState('');
    const [custom_longitude, SetCustomLongitude] = useState('');
    const [SeleccionadoC, setSelectC] = useState(localStorage.getItem('seleccionado'));
    const [cities, setCities] = useState([]);
    const [auxState, setAuxState] = useState(false);
    const [arrDataDashBoardA, setArrDataDashBoardA] = useState(["Temperatura", "Radiacion UV"])
    const [isAlertsOrWarnings, setisAlertsOrWarnings] = useState(false);
    const d = new Date();
    const currentDate = d.getFullYear() + '-' + (d.getMonth() + 1).toString().padStart(2, 0) + '-' + (d.getDate() - 1).toString().padStart(2, 0);

    const { isDay_global, setIsDay_global, climateAlert, setBackground, setDarkLetters, Warnings, Alerts, setClimateAlert,

    } = useContext(DataContext);

    const {
        openModal, setOpenModal, setCloseModal, dataModal, dataRecomendations,
        dataType, dataOptional, typeModal, setTypeModal, customLocation, setCustomLocation
    } = useContext(Ui_Context);

    const { Trigger, OficialAlerts, setOficialAlerts, mapUrlState, setMapUrlState } = useContext(Test_context);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));




    const handleCloseModal = () => {
        if (typeof setOpenModal === "function")
            setOpenModal(false);
        setCities([]);
    };

    const handleOpenModal = (param) => {
        setTypeModal((param === 2) ? 'CustomLocation' : 'undefined');
        setOpenModal(true);
        setCloseModal(true);

    };
    const onChangeCity = (event) => {
        setSelectC(event.target.value);

        localStorage.setItem('seleccionado', event.target.value);
        const cityData = cities.find(c => c.value === event.target.value);

        SetCustomLatitude(cityData.latitude);
        SetCustomLongitude(cityData.longitude);
        localStorage.setItem('Latitud', cityData.latitude);
        localStorage.setItem('Longitud', cityData.longitude);

        setDissable(false);
    }

    useEffect(() => {

    }, [custom_latitude, custom_longitude])


    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setIsSnackBarActive(false);
    };

    useEffect(() => {
        if (!customLocation) localStorage.clear()
    }, [])

    useEffect(() => {
        if (typeModal === 'CustomLocation') {
            setCustomLocation(true);
        }
    }, [])

    const handleEvent = (event) => {
        //console.log(event.target.value)


        const cities_select = Countries_Cities.find((city_element) => city_element.id === event.target.value)
        let json = cities_select.cities.map((name) => ({ value: name.name, latitude: name.latitude, longitude: name.longitude }));
        //alert(event.target.key)

        if (json.length < 1) {
            setIsSnackBarActive(true);
            setMessageSnackBar(`Ciudades no listadas , por favor escoger otro Pais`);
        }

        setCities(json);

    };
    const localize = () => {
    setAuxState(true);

    navigator.geolocation.getCurrentPosition(
        (position) => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;

            const lat = customLocation
                ? localStorage.getItem('Latitud')
                : latitude;

            const lon = customLocation
                ? localStorage.getItem('Longitud')
                : longitude;

            const mapUrl = `https://maps.google.com/maps?q=${lat},${lon}&z=15&output=embed`;
            setMapUrlState(mapUrl);

            const anio = d.getFullYear();
            const month = String(d.getMonth() + 1).padStart(2, '0');
            const day = String(d.getDate()).padStart(2, '0');

            fetch(
                `https://clima-app-server.vercel.app/api/v1/wheater/alerts?lat=${lat}&lon=${lon}&anio=${anio}&month=${month}&day=${day}`
            )
                .then((res) => res.json())
                .then((data) => {
                    setOficialAlerts(data);
                })
                .catch((error) => {
                    console.error(error);
                });

            fetch(
                `https://clima-app-server.vercel.app/api/v1/wheater/current?lat=${lat}&lon=${lon}`
            )
                .then((res) => res.json())
                .then((data) => {
                    if (data.error) {
                        setIsSnackBarActive(true);
                        setMessageSnackBar(data.error);
                    }

                    setClimateAlert(data);

                    setTemperature(
                        data.response.Temperatura.Temperatura.IndicatorGraph.data
                    );

                    setRadiacionUV(
                        data.response["Radiacion UV"]["Radiacion UV"].IndicatorGraph.data
                    );

                    setLocation(data.response["last_update"]);
                    setLocationMap(data?.response);

                    setdataTempAprox(
                        data.response.Temperatura.Temperatura.IndicatorGraph.optionalData
                    );

                    var isNews = false;

                    arrDataDashBoardA.forEach((element) => {
                        isNews =
                            Object.keys(
                                data?.response?.Temperatura?.Temperatura?.Warnings?.[0] ?? {}
                            ).length > 0 ||
                            Object.keys(
                                data?.response?.Temperatura?.Temperatura?.Alerts?.[0] ?? {}
                            ).length > 0 ||
                            Object.keys(
                                data?.response?.["Radiacion UV"]?.["Radiacion UV"]?.Warnings?.[0] ?? {}
                            ).length > 0 ||
                            Object.keys(
                                data?.response?.["Radiacion UV"]?.["Radiacion UV"]?.Alerts?.[0] ?? {}
                            ).length > 0;
                    });

                    setisAlertsOrWarnings(isNews);
                })
                .catch((error) => {
                    setIsSnackBarActive(true);
                    setMessageSnackBar(String(error));
                })
                .finally(() => {
                    setAuxState(false);
                });
        },

        (error) => {

            // Si el navegador tarda más de 5 segundos,
            // usamos la última ubicación guardada.
            if (error.code === error.TIMEOUT) {

                const lat = sessionStorage.getItem('Latitud');
                const lon = sessionStorage.getItem('Longitud');

                if (lat && lon) {

                    console.warn(
                        'Tiempo de geolocalización agotado. Usando última ubicación almacenada.'
                    );

                    const mapUrl = `https://maps.google.com/maps?q=${lat},${lon}&z=15&output=embed`;
                    setMapUrlState(mapUrl);

                    const anio = d.getFullYear();
                    const month = String(d.getMonth() + 1).padStart(2, '0');
                    const day = String(d.getDate()).padStart(2, '0');

                    fetch(
                        `https://clima-app-server.vercel.app/api/v1/wheater/alerts?lat=${lat}&lon=${lon}&anio=${anio}&month=${month}&day=${day}`
                    )
                        .then((res) => res.json())
                        .then((data) => {
                            setOficialAlerts(data);
                        })
                        .catch((error) => {
                            console.error(error);
                        });

                    fetch(
                        `https://clima-app-server.vercel.app/api/v1/wheater/current?lat=${lat}&lon=${lon}`
                    )
                        .then((res) => res.json())
                        .then((data) => {

                            if (data.error) {
                                setIsSnackBarActive(true);
                                setMessageSnackBar(data.error);
                            }

                            setClimateAlert(data);

                            setTemperature(
                                data.response.Temperatura.Temperatura.IndicatorGraph.data
                            );

                            setRadiacionUV(
                                data.response["Radiacion UV"]["Radiacion UV"].IndicatorGraph.data
                            );

                            setLocation(data.response["last_update"]);
                            setLocationMap(data?.response);

                            setdataTempAprox(
                                data.response.Temperatura.Temperatura.IndicatorGraph.optionalData
                            );

                            var isNews = false;

                            arrDataDashBoardA.forEach((element) => {
                                isNews =
                                    Object.keys(
                                        data?.response?.Temperatura?.Temperatura?.Warnings?.[0] ?? {}
                                    ).length > 0 ||
                                    Object.keys(
                                        data?.response?.Temperatura?.Temperatura?.Alerts?.[0] ?? {}
                                    ).length > 0 ||
                                    Object.keys(
                                        data?.response?.["Radiacion UV"]?.["Radiacion UV"]?.Warnings?.[0] ?? {}
                                    ).length > 0 ||
                                    Object.keys(
                                        data?.response?.["Radiacion UV"]?.["Radiacion UV"]?.Alerts?.[0] ?? {}
                                    ).length > 0;
                            });

                            setisAlertsOrWarnings(isNews);
                        })
                        .catch((error) => {
                            setIsSnackBarActive(true);
                            setMessageSnackBar(String(error));
                        })
                        .finally(() => {
                            setAuxState(false);
                        });

                    return;
                }
            }

            // Si NO fue timeout, entonces sí mostramos el error.
            setAuxState(false);
            setIsSnackBarActive(true);
            setMessageSnackBar(
                `Error al obtener ubicación: ${String(error)}`
            );
        },

        {
            enableHighAccuracy: false,
            timeout: 3000,
            maximumAge: 600000
        }
    );
};

    const getColor = async (param) => {
        try {
            const palette = await Vibrant.from(param).getPalette(); // <-- espera a la promesa
            const dominant = palette.Vibrant || palette.Muted;

            if (!dominant) return "#000000";

            const [r, g, b] = dominant.rgb;
            const brightness = (r * 299 + g * 587 + b * 114) / 1000;

            return brightness > 128 ? "#000000" : "#FFFFFF";
        } catch (error) {
            setIsSnackBarActive(true);
            setMessageSnackBar(`Error al calcular el color: ${String(error)}`);
            return "#000000";
        }
    };


    useMemo(() => {
        localize();
    }, [Trigger, customLocation]);

    useEffect(() => {
        if (Temperatura <= -5) {

            const images = JsonImage.wallPapersCategory.low_temp_fatal[Math.floor(Math.random() * JsonImage.wallPapersCategory.low_temp_fatal.length)];
            setBackground(images);
            const themeD = getColor(images);

            console.log(images)


            setIsDay_global(false);
        } else if (Temperatura < 0 && Temperatura >= -5) {

            const images = JsonImage.wallPapersCategory.low_temp_non_fatal[Math.floor(Math.random() * JsonImage.wallPapersCategory.low_temp_non_fatal.length)];
            setBackground(images);
            const themeD = getColor(images);

            console.log(images)

            setDarkLetters(themeD);
        } else if (Temperatura >= 0 && Temperatura <= 20) {

            const images = JsonImage.wallPapersCategory.low_temp[Math.floor(Math.random() * JsonImage.wallPapersCategory.low_temp.length)];
            setBackground(images);
            const themeD = getColor(images);


            console.log(images)
            setIsDay_global(false);
        } else if (Temperatura >= 20 && Temperatura <= 30) {

            const images = JsonImage.wallPapersCategory.normal_temp[Math.floor(Math.random() * JsonImage.wallPapersCategory.normal_temp.length)];
            setBackground(images);
            const themeD = getColor(images);

            console.log(images)
            setIsDay_global(false);
        } else if (Temperatura >= 30 && Temperatura <= 36) {

            const images = JsonImage.wallPapersCategory.hight_temp_non_fatal[Math.floor(Math.random() * JsonImage.wallPapersCategory.hight_temp_non_fatal.length)];
            setBackground(images);
            const themeD = getColor(images);

            console.log(images)
            setIsDay_global(false);
        } else if (Temperatura >= 36) {

            const images = JsonImage.wallPapersCategory.hight_temp_fatal[Math.floor(Math.random() * JsonImage.wallPapersCategory.hight_temp_fatal.length)];
            setBackground(images);
            const themeD = getColor(images);

            console.log(images)
            setIsDay_global(false);
        }

    }, [Temperatura, customLocation]);

    const locate = (param) => {
        if (param) {
            setCustomLocation(false);
            localStorage.removeItem('seleccionado');
        } else {
            handleOpenModal(2)
        }
    }



    return (
        <>
            {auxState ? (
                <Box
                    sx={{
                        minHeight: '300px',
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                >
                    <CircularProgress size={32} />
                </Box>
            ) : (
                <Box
                    sx={{
                        width: '100%',
                        maxWidth: isMobile ? '100%' : '1378px',
                        mx: 'auto',
                        px: isMobile ? 1 : 0,
                        py: 1
                    }}
                >

                    {/* ===================================================== */}
                    {/* ACCIONES */}
                    {/* ===================================================== */}

                    <Stack
                        direction={isMobile ? 'column' : 'row'}
                        spacing={1}
                        sx={{
                            mb: 2
                        }}
                    >
                        <Button
                            variant="outlined"
                            startIcon={<AddLocationAltIcon />}
                            onClick={() => locate(customLocation ? true : false)}
                            sx={{
                                color: isDay_global ? 'white' : '#252525',
                                borderColor: isDay_global
                                    ? 'rgba(255,255,255,0.25)'
                                    : '#d8d8d8',
                                backgroundColor: isDay_global
                                    ? 'rgba(255,255,255,0.04)'
                                    : 'rgba(255,255,255,0.20)',
                                backdropFilter: 'blur(8px)',
                                borderRadius: '8px',
                                textTransform: 'none',
                                fontWeight: 500,
                                boxShadow: 'none',
                                transition: 'all .2s ease',
                                '&:hover': {
                                    backgroundColor: isDay_global
                                        ? 'rgba(255,255,255,0.08)'
                                        : 'rgba(255,255,255,0.45)',
                                    borderColor: isDay_global
                                        ? 'rgba(255,255,255,0.40)'
                                        : '#bdbdbd',
                                    boxShadow: '0 3px 10px rgba(0,0,0,0.06)'
                                },
                                width: isMobile ? '100%' : 'auto'
                            }}
                        >
                            {customLocation
                                ? 'Restaurar Ubicación'
                                : 'Localización Personalizada'}
                        </Button>

                        <Button
                            variant="outlined"
                            startIcon={<CrisisAlertIcon />}
                            onClick={() => {
                                setTypeModal("Cap:Alertas");
                                setOpenModal(true);
                            }}
                            sx={{
                                color: isDay_global ? 'white' : '#252525',
                                borderColor: isDay_global
                                    ? 'rgba(255,255,255,0.25)'
                                    : '#d8d8d8',
                                backgroundColor: isDay_global
                                    ? 'rgba(255,255,255,0.04)'
                                    : 'rgba(255,255,255,0.20)',
                                backdropFilter: 'blur(8px)',
                                borderRadius: '8px',
                                textTransform: 'none',
                                fontWeight: 500,
                                boxShadow: 'none',
                                transition: 'all .2s ease',
                                '&:hover': {
                                    backgroundColor: isDay_global
                                        ? 'rgba(255,255,255,0.08)'
                                        : 'rgba(255,255,255,0.45)',
                                    borderColor: isDay_global
                                        ? 'rgba(255,255,255,0.40)'
                                        : '#bdbdbd',
                                    boxShadow: '0 3px 10px rgba(0,0,0,0.06)'
                                },
                                width: isMobile ? '100%' : 'auto'
                            }}
                        >
                            Alertas Oficiales
                        </Button>
                    </Stack>


                    {/* ===================================================== */}
                    {/* DASHBOARD PRINCIPAL */}
                    {/* ===================================================== */}

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

                        <CardContent
                            sx={{
                                p: {
                                    xs: 1.5,
                                    sm: 2,
                                    md: 2.5
                                },
                                '&:last-child': {
                                    pb: {
                                        xs: 1.5,
                                        sm: 2,
                                        md: 2.5
                                    }
                                }
                            }}
                        >

                            {/* ================================================= */}
                            {/* CABECERA */}
                            {/* ================================================= */}

                            <Box
                                sx={{
                                    mb: 2,
                                    pb: 1.5,
                                    borderBottom: isDay_global
                                        ? '1px solid rgba(255,255,255,0.08)'
                                        : '1px solid rgba(0,0,0,0.05)'
                                }}
                            >
                                <Stack
                                    direction={isMobile ? 'column' : 'row'}
                                    justifyContent="space-between"
                                    alignItems={isMobile ? 'flex-start' : 'center'}
                                    spacing={0.5}
                                >

                                    <Box>
                                        <Typography
                                            variant="h6"
                                            sx={{
                                                color: isDay_global
                                                    ? 'white'
                                                    : '#222',
                                                fontWeight: 600,
                                                letterSpacing: '-0.2px'
                                            }}
                                        >
                                            Clima hoy
                                        </Typography>

                                        <Typography
                                            variant="caption"
                                            sx={{
                                                color: isDay_global
                                                    ? 'rgba(255,255,255,0.60)'
                                                    : 'rgba(0,0,0,0.50)'
                                            }}
                                        >
                                            Información meteorológica de tu ubicación
                                        </Typography>
                                    </Box>

                                    <Box
                                        sx={{
                                            px: 1.5,
                                            py: 0.7,
                                            borderRadius: '20px',
                                            backgroundColor: isDay_global
                                                ? 'rgba(255,255,255,0.05)'
                                                : 'rgba(0,0,0,0.02)',
                                            border: isDay_global
                                                ? '1px solid rgba(255,255,255,0.08)'
                                                : '1px solid rgba(0,0,0,0.04)'
                                        }}
                                    >
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
                                label={location?.data}
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
                                    </Box>

                                </Stack>
                            </Box>


                            {/* ================================================= */}
                            {/* CONTENIDO */}
                            {/* ================================================= */}

                            <Suspense
                                fallback={
                                    <Skeleton
                                        animation="wave"
                                        variant="rectangular"
                                        width="100%"
                                        height={600}
                                        sx={{
                                            borderRadius: '10px'
                                        }}
                                    />
                                }
                            >

                                {mapUrlState ? (

                                    <Stack
                                        direction={isMobile ? 'column' : 'row'}
                                        spacing={2}
                                        sx={{
                                            width: '100%',
                                            alignItems: 'stretch'
                                        }}
                                    >

                                        {/* ========================================= */}
                                        {/* MAPA */}
                                        {/* ========================================= */}

                                        <Box
                                            sx={{
                                                width: '100%',
                                                flex: isMobile
                                                    ? 'none'
                                                    : '1.35 1 0',
                                                minWidth: 0,
                                                borderRadius: '12px',
                                                overflow: 'hidden',
                                                border: isDay_global
                                                    ? '1px solid rgba(255,255,255,0.08)'
                                                    : '1px solid rgba(0,0,0,0.06)',
                                                boxShadow:
                                                    '0 4px 18px rgba(0,0,0,0.04)'
                                            }}
                                        >
                                            <LazyIframe />
                                        </Box>


                                        {/* ========================================= */}
                                        {/* COLUMNA DERECHA */}
                                        {/* ========================================= */}

                                        <Stack
                                            direction="column"
                                            spacing={2}
                                            sx={{
                                                width: '100%',
                                                flex: isMobile
                                                    ? 'none'
                                                    : '1 1 0',
                                                minWidth: 0
                                            }}
                                        >

                                            {/* ===================================== */}
                                            {/* INDICADORES */}
                                            {/* ===================================== */}

                                            <Stack
                                                direction={isMobile
                                                    ? 'column'
                                                    : 'row'}
                                                spacing={2}
                                                sx={{
                                                    width: '100%',
                                                    alignItems: 'stretch'
                                                }}
                                            >

                                                <Box
                                                    sx={{
                                                        flex: 1,
                                                        minWidth: 0,
                                                        borderRadius: '10px',
                                                        overflow: 'hidden',
                                                        backgroundColor: isDay_global
                                                            ? 'rgba(255,255,255,0.025)'
                                                            : 'rgba(255,255,255,0.14)',
                                                        border: isDay_global
                                                            ? '1px solid rgba(255,255,255,0.07)'
                                                            : '1px solid rgba(0,0,0,0.04)'
                                                    }}
                                                >
                                                    <IndicatorGraph
                                                        min={-50}
                                                        max={70}
                                                        type="Temperatura"
                                                        indicator="C°"
                                                        split={5}
                                                        data={Temperatura || 0}
                                                        optionalData={dataTempAprox || 0}
                                                        color={
                                                            climateAlert?.response?.Temperatura?.Temperatura?.IndicatorGraph?.MetricsData?.color
                                                        }
                                                        recomendedLimit={
                                                            Temperatura < 0
                                                                ? -10
                                                                : 37
                                                        }
                                                    />
                                                </Box>

                                                <Box
                                                    sx={{
                                                        flex: 1,
                                                        minWidth: 0,
                                                        borderRadius: '10px',
                                                        overflow: 'hidden',
                                                        backgroundColor: isDay_global
                                                            ? 'rgba(255,255,255,0.025)'
                                                            : 'rgba(255,255,255,0.14)',
                                                        border: isDay_global
                                                            ? '1px solid rgba(255,255,255,0.07)'
                                                            : '1px solid rgba(0,0,0,0.04)'
                                                    }}
                                                >
                                                    <IndicatorGraph
                                                        min={0}
                                                        max={20}
                                                        type="Radiacion UV"
                                                        indicator="UV"
                                                        split={5}
                                                        color={
                                                            climateAlert?.response?.["Radiacion UV"]?.["Radiacion UV"]?.IndicatorGraph?.MetricsData?.color
                                                        }
                                                        data={radiacionUV}
                                                        optionalData={3}
                                                        recomendedLimit={6}
                                                    />
                                                </Box>

                                            </Stack>


                                            {/* ===================================== */}
                                            {/* ALERTAS */}
                                            {/* ===================================== */}

                                            <Box
                                                sx={{
                                                    width: '100%',
                                                    minWidth: 0
                                                }}
                                            >

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
                                                                backgroundColor: isAlertsOrWarnings ? '#f44336' : '#3698f4',
                                                                boxShadow:isAlertsOrWarnings ? '0 0 0 4px rgba(244,67,54,0.08)' : '0 0 0 4px rgba(54, 174, 244, 0.08)'
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
                                                            : '215px',
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

                                                    {isAlertsOrWarnings ? (

                                                        arrDataDashBoardA.map(
                                                            (element, idx) => {

                                                                const Alerts =
                                                                    climateAlert.response[element][element]?.Alerts;

                                                                const Warnings =
                                                                    climateAlert.response[element][element]?.Warnings;

                                                                return (
                                                                    Object.keys(Alerts[0]).length > 0 ||
                                                                    Object.keys(Warnings[0]).length > 0
                                                                ) ? (

                                                                    <Stack
                                                                        key={`alert-group-${idx}`}
                                                                        spacing={1}
                                                                    >

                                                                        {/* ALERTAS */}
                                                                        {Object.keys(Alerts[0]).length === 0 ? (
                                                                            <></>
                                                                        ) : (
                                                                            Alerts.map(
                                                                                (object, inx) => (
                                                                                    <Alert
                                                                                        key={`alert-${idx}-${inx}`}
                                                                                        variant="filled"
                                                                                        severity="error"
                                                                                        sx={{
                                                                                            width: '100%',
                                                                                            borderRadius: '8px',
                                                                                            py: 0.75,
                                                                                            backgroundColor:
                                                                                                'rgba(211,47,47,0.72)',
                                                                                            boxShadow:
                                                                                                '0 3px 10px rgba(211,47,47,0.10)',
                                                                                            '& .MuiAlert-message': {
                                                                                                width: '100%',
                                                                                                minWidth: 0
                                                                                            }
                                                                                        }}
                                                                                    >
                                                                                        <AlertTitle
                                                                                            sx={{
                                                                                                mb: 0.3,
                                                                                                fontSize: '0.82rem',
                                                                                                fontWeight: 600
                                                                                            }}
                                                                                        >
                                                                                            ¡
                                                                                            {object?.alertBody?.titulo ||
                                                                                                "No Disponible"}
                                                                                            !
                                                                                        </AlertTitle>

                                                                                        <Typography
                                                                                            variant="caption"
                                                                                            sx={{
                                                                                                opacity: 0.9
                                                                                            }}
                                                                                        >
                                                                                            {object?.type ||
                                                                                                "No disponible"}
                                                                                        </Typography>
                                                                                    </Alert>
                                                                                )
                                                                            )
                                                                        )}


                                                                        {/* ADVERTENCIAS */}
                                                                        {Object.keys(Warnings[0]).length === 0 ? (
                                                                            <></>
                                                                        ) : (
                                                                            Warnings.map(
                                                                                (object, inx) => (
                                                                                    <Alert
                                                                                        key={`warning-${idx}-${inx}`}
                                                                                        variant="filled"
                                                                                        severity="warning"
                                                                                        sx={{
                                                                                            width: '100%',
                                                                                            borderRadius: '8px',
                                                                                            py: 0.75,
                                                                                            backgroundColor:
                                                                                                'rgba(237,108,2,0.72)',
                                                                                            boxShadow:
                                                                                                '0 3px 10px rgba(237,108,2,0.09)',
                                                                                            '& .MuiAlert-message': {
                                                                                                width: '100%',
                                                                                                minWidth: 0
                                                                                            }
                                                                                        }}
                                                                                    >
                                                                                        <AlertTitle
                                                                                            sx={{
                                                                                                mb: 0.3,
                                                                                                fontSize: '0.82rem',
                                                                                                fontWeight: 600
                                                                                            }}
                                                                                        >
                                                                                            ¡
                                                                                            {object?.alertBody?.titulo ||
                                                                                                idx}
                                                                                            !
                                                                                        </AlertTitle>

                                                                                        <Typography
                                                                                            variant="caption"
                                                                                            sx={{
                                                                                                opacity: 0.9
                                                                                            }}
                                                                                        >
                                                                                            {object?.type ||
                                                                                                "No disponible"}
                                                                                        </Typography>
                                                                                    </Alert>
                                                                                )
                                                                            )
                                                                        )}

                                                                    </Stack>

                                                                ) : null;
                                                            }
                                                        )

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

                                            </Box>

                                        </Stack>

                                    </Stack>

                                ) : (

                                    <Skeleton
                                        animation="wave"
                                        variant="rectangular"
                                        width="100%"
                                        height={600}
                                        sx={{
                                            borderRadius: '10px'
                                        }}
                                    />

                                )}

                            </Suspense>

                        </CardContent>

                    </Card>


                    {/* ===================================================== */}
                    {/* SNACKBAR */}
                    {/* ===================================================== */}

                    <Snackbar
                        open={isSnackBarActive}
                        message={messageSnackBar}
                        onClose={handleClose}
                        action={
                            <IconButton
                                size="small"
                                aria-label="close"
                                color="inherit"
                                onClick={handleClose}
                            >
                                <CloseIcon fontSize="small" />
                            </IconButton>
                        }
                    />


                    {/* ===================================================== */}
                    {/* MODAL */}
                    {/* ===================================================== */}

                    <GenericModal
                        open={openModal}
                        element={
                            (typeModal === 'GAUGE') ? (
                                <>
                                    <Suspense
                                        fallback={
                                            <div>
                                                Cargando Plotly...
                                            </div>
                                        }
                                    >
                                        <IndicatorDetails
                                            title2={
                                                dataType === 'Temperatura'
                                                    ? 'Sensacion aparente'
                                                    : 'Rango Recomendable'
                                            }
                                            title1={
                                                dataType === 'Radiacion UV'
                                                    ? 'Porcentaje Actual'
                                                    : dataType === 'Quality-Air'
                                                        ? 'Calidad del Aire'
                                                        : dataType === 'Precipitacion'
                                                            ? 'Precipitacion'
                                                            : dataType === 'Velocidad-Viento'
                                                                ? 'Velocidad'
                                                                : 'Temperatura'
                                            }
                                            valor={dataModal}
                                            valorOpcional={dataOptional}
                                            type={dataType}
                                        />
                                    </Suspense>

                                    <Stack spacing={2} sx={{ mt: 2 }}>

                                        <Alert
                                            variant="filled"
                                            severity="info"
                                            sx={{
                                                borderRadius: '10px',
                                                backgroundColor: 'rgba(79,214,255,0.20)',
                                                border: '1px solid rgba(79,214,255,0.15)'
                                            }}
                                        >
                                            <AlertTitle>
                                                ¡IMPORTANTE!
                                            </AlertTitle>

                                            <Typography
                                                color="rgba(255,255,255,0.70)"
                                                variant="caption"
                                            >
                                                {
                                                    climateAlert.response[dataType][dataType]
                                                        .IndicatorGraph.MetricsData.Message
                                                }
                                            </Typography>
                                        </Alert>


                                        <Box
                                            sx={{
                                                p: 1.5,
                                                borderRadius: '10px',
                                                backgroundColor: 'rgba(255,255,255,0.02)',
                                                border: '1px solid rgba(255,255,255,0.05)'
                                            }}
                                        >

                                            <Stack spacing={1}>

                                                <Stack
                                                    direction="row"
                                                    spacing={1}
                                                    alignItems="center"
                                                >
                                                    <Box
                                                        sx={{
                                                            backgroundColor: 'rgba(10,92,175,0.82)',
                                                            height: '12px',
                                                            width: '12px',
                                                            borderRadius: '3px',
                                                            flexShrink: 0
                                                        }}
                                                    />

                                                    <Typography
                                                        color="rgba(255,255,255,0.70)"
                                                        variant="caption"
                                                    >
                                                        Valor Actual ({dataModal})
                                                    </Typography>
                                                </Stack>


                                                <Stack
                                                    direction="row"
                                                    spacing={1}
                                                    alignItems="center"
                                                >
                                                    <Box
                                                        sx={{
                                                            backgroundColor: 'rgba(142,228,72,0.82)',
                                                            height: '12px',
                                                            width: '12px',
                                                            borderRadius: '3px',
                                                            flexShrink: 0
                                                        }}
                                                    />

                                                    <Typography
                                                        color="rgba(255,255,255,0.70)"
                                                        variant="caption"
                                                    >
                                                        {dataType === 'Temperatura'
                                                            ? 'Valor Actual'
                                                            : 'Limite Recomendable'} ({dataOptional})
                                                    </Typography>
                                                </Stack>


                                                {dataType === 'Temperatura' ? (
                                                    <Stack
                                                        direction="row"
                                                        spacing={1}
                                                        alignItems="center"
                                                    >
                                                        <Box
                                                            sx={{
                                                                backgroundColor: 'rgba(238,225,51,0.88)',
                                                                height: '12px',
                                                                width: '12px',
                                                                borderRadius: '3px',
                                                                flexShrink: 0
                                                            }}
                                                        />

                                                        <Typography
                                                            color="rgba(255,255,255,0.70)"
                                                            variant="caption"
                                                        >
                                                            Limite Recomendado{" "}
                                                            {dataModal < 0
                                                                ? '(0 C° : -20 C°)'
                                                                : '(0 C° : 37 C°)'}
                                                        </Typography>
                                                    </Stack>
                                                ) : (
                                                    ''
                                                )}

                                            </Stack>

                                        </Box>

                                    </Stack>
                                </>

                            ) : (typeModal === 'CustomLocation') ? (

                                <Stack
                                    direction="column"
                                    spacing={2}
                                    sx={{
                                        width: '100%'
                                    }}
                                >

                                    <Box>
                                        <Typography
                                            variant="h6"
                                            sx={{
                                                fontWeight: 600
                                            }}
                                        >
                                            Localización Personalizada
                                        </Typography>

                                        <Typography
                                            variant="caption"
                                            sx={{
                                                color: 'text.secondary'
                                            }}
                                        >
                                            Selecciona la ubicación que deseas consultar.
                                        </Typography>
                                    </Box>


                                    <FormControl fullWidth>

                                        <InputLabel>
                                            Seleccione el Pais
                                        </InputLabel>

                                        <Select
                                            sx={{
                                                width: '100%'
                                            }}
                                            label="Location"
                                            onChange={handleEvent}
                                        >
                                            {Countries_Cities.map((temp) => (
                                                <MenuItem
                                                    key={temp.id}
                                                    value={temp.id}
                                                >
                                                    {temp.name}
                                                </MenuItem>
                                            ))}
                                        </Select>


                                        {cities.length > 0 && (
                                            <Box sx={{ mt: 2 }}>

                                                <InputLabel>
                                                    Seleccione la ciudad
                                                </InputLabel>

                                                <Select
                                                    sx={{
                                                        width: '100%'
                                                    }}
                                                    label="City"
                                                    onChange={onChangeCity}
                                                    value={SeleccionadoC}
                                                >
                                                    {cities.map((temp) => (
                                                        <MenuItem
                                                            key={`${temp.latitude}-${temp.longitude}`}
                                                            value={temp.value}
                                                        >
                                                            {temp.value}
                                                        </MenuItem>
                                                    ))}
                                                </Select>

                                            </Box>
                                        )}


                                        <Button
                                            disabled={button_disable}
                                            onClick={() => {
                                                handleCloseModal();
                                                setCustomLocation(true);
                                            }}
                                            variant="contained"
                                            color="success"
                                            sx={{
                                                width: '100%',
                                                mt: 2,
                                                borderRadius: '8px',
                                                textTransform: 'none',
                                                fontWeight: 600
                                            }}
                                        >
                                            Informe de Clima
                                        </Button>

                                    </FormControl>

                                </Stack>

                            ) : (typeModal === "Cap:Alertas") ? (

                                <>
                                    <ListItems />
                                </>

                            ) : (
                                'undefined'
                            )
                        }
                        onClose={handleCloseModal}
                    />

                </Box>
            )}
        </>
    );


};

export default MainMenu;
