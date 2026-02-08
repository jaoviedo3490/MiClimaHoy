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
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import IndicatorDetails from "../Graphics/indicatorDetails.jsx";
import Divider from '@mui/material/Divider';
import { useState, useMemo, useContext, useEffect, lazy, Suspense } from "react";
import { DataContext } from "../../../Context/MetricsContext.js"
import { Ui_Context } from "../../../Context/Ui-Context.js";
import IndicatorGraph from "../Graphics/Indicator.jsx";
import GenericModal from "../Modal/GenericModal.jsx";
import Snackbar from '@mui/material/Snackbar';
import JsonImage from '../../dataJson/wallpaper.json';
import { Vibrant } from "node-vibrant/browser";
import Skeleton from '@mui/material/Skeleton';
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';
import CircularProgress from '@mui/material/CircularProgress';
import { test_context } from "../../../Context/test-context.js";
import Countries_Cities from '../../dataJson/countries_cities.json'
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

const LazyIframe = lazy(() => import("./LazyIframe.jsx"));



const MainMenu = () => {
    const [button_disable, setDissable] = useState(true);
    const [open, setOpen] = useState(false);
    const [Temperatura, setTemperature] = useState("");
    const [dataTempAprox, setdataTempAprox] = useState("");
    const [radiacionUV, setRadiacionUV] = useState("");
    const [location, setLocation] = useState("");
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


    const { isDay_global, setIsDay_global, OficialAlerts, setOficialAlerts, climateAlert, setBackground, setDarkLetters, Warnings, Alerts, setClimateAlert,

    } = useContext(DataContext);

    const {
        openModal, setOpenModal, setCloseModal, dataModal, dataRecomendations,
        dataType, dataOptional, typeModal, setTypeModal, mapUrlState, setMapUrlState, customLocation, setCustomLocation
    } = useContext(Ui_Context);

    const { Trigger } = useContext(test_context);
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
        setDissable(false);
    }


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
        console.log(event.target.value)


        const cities_select = Countries_Cities.find((city_element) => city_element.id === event.target.value)
        let json = cities_select.cities.map((name) => ({ value: name.name, latitude: name.latitude, longitude: name.longitude }));

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
                const mapUrl = `https://maps.google.com/maps?q=${(customLocation) ? custom_latitude : latitude},${(customLocation) ? custom_longitude : longitude}&z=15&output=embed`;
                setMapUrlState(mapUrl);
                fetch(`https://clima-app-server.vercel.app/api/v1/wheater/alerts?lat=${latitude}&lon=${longitude}`).then((res) => res.json()).then((data) => {

                    setOficialAlerts(data.response.alerts)
                    console.log(data)

                })
                return fetch(`https://clima-app-server.vercel.app/api/v1/wheater/current?lat=${latitude}&lon=${longitude}`)

                    .then((res) => res.json())
                    .then((data) => {

                        //console.log(`/api/v1/wheater/current?lat=${latitude}&lon=${longitude}`)
                        if (data.error) {
                            setIsSnackBarActive(true);
                            setMessageSnackBar(data.error);
                        }
                        setAuxState(false);


                        console.log(data)

                        setClimateAlert(data);
                        setTemperature(data.response.Temperatura.Temperatura.IndicatorGraph.data);
                        setRadiacionUV(data.response["Radiacion UV"]["Radiacion UV"].IndicatorGraph.data);
                        setLocation(data.response["last_updated"]);
                        setdataTempAprox(data.response.Temperatura.Temperatura.IndicatorGraph.optionalData);
                        var isNews = false;
                        arrDataDashBoardA.forEach((element) => {
                            isNews = Object.keys(data.response.Temperatura.Temperatura.Warnings[0]).length > 0
                                || Object.keys(data.response.Temperatura.Temperatura.Alerts[0]).length > 0
                                || Object.keys(data.response["Radiacion UV"]["Radiacion UV"].Warnings[0]).length > 0
                                || Object.keys(data.response["Radiacion UV"]["Radiacion UV"].Alerts[0]).length > 0
                        })
                        setisAlertsOrWarnings(isNews);
                        
                    })
                    .catch((error) => {
                        setAuxState(false);
                        setIsSnackBarActive(true);
                        setMessageSnackBar(String(error));

                    });
            },
            (error) => {
                setIsSnackBarActive(true);
                setMessageSnackBar(`Error al obtener ubicación: ${String(error)}`);

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
            {(auxState) ? (<CircularProgress
                size={24}
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    marginTop: '-12px',
                    marginLeft: '-12px',
                }}
            />) : (
                <Box sx={{ mt: '10px', width: '100%', left: '100px' }}>
                    {<Button variant="outlined" sx={{ color: 'black', borderColor: 'black', marginBottom: 2 }} startIcon={<AddLocationAltIcon />} onClick={() => locate(customLocation ? true : false)}> {(customLocation) ? "Restaurar Ubicación" : "Localización Personalizada"} </Button>}
                    <Card sx={{
                        boxShadow: '0', border: '1px solid #dadadaff', borderRadius: '4px',
                        backgroundColor: 'rgba(255, 255, 255, 0.2)',
                        backdropFilter: 'blur(5px)'

                    }}>
                        <CardContent sx={{ p: 2 }}>
                            <Stack direction={isMobile ? "column" : "row"} justifyContent="space-between" spacing={1}>
                                <Typography sx={{ color: isDay_global ? 'white' : 'black' }} variant="h6">Clima hoy - Ubicación aproximada</Typography>

                                <Typography variant="subtitle2" sx={{ color: isDay_global ? 'white' : 'black' }}>{location}</Typography>
                            </Stack>
                            <Suspense fallback={<Skeleton variant="rectangular" width={210} height={118} />}>
                                {mapUrlState ? (
                                    <>
                                        <Stack direction={isMobile ? "column" : "row"}>

                                            <Box sx={{ width: '100%', height: "100%" }}><LazyIframe /></Box>
                                            <Stack direction="column">
                                                <Stack direction={isMobile ? "column" : "row"} spacing={2} sx={{ width: "100%" }}>

                                                    <IndicatorGraph
                                                        min={-50}
                                                        max={70}
                                                        type="Temperatura"
                                                        indicator="C°"
                                                        split={5}
                                                        data={Temperatura}
                                                        optionalData={dataTempAprox}
                                                        color={climateAlert.response.Temperatura.Temperatura.IndicatorGraph.MetricsData.color}
                                                        recomendedLimit={(Temperatura < 0) ? -10 : 37}
                                                    />
                                                    {<IndicatorGraph
                                                        min={0}
                                                        max={20}
                                                        type="Radiacion UV"
                                                        indicator="UV"
                                                        split={5}
                                                        color={climateAlert.response["Radiacion UV"]["Radiacion UV"].IndicatorGraph.MetricsData.color}
                                                        data={radiacionUV}
                                                        optionalData={3}
                                                        recomendedLimit={6}

                                                    />}
                                                </Stack>

                                                <Stack direction="column" spacing={0} sx={{ ml: "10px", width: "98%", height: "100%" }}>
                                                    <Divider component="div" role="presentation">
                                                        <Typography>Panel de Alertas</Typography>
                                                    </Divider>
                                                    <Stack key={1} direction="column" spacing={2} sx={{ width: "100%", position: "relative", display: "flex", flexDirection: "column" }}>
                                                        <Box
                                                            sx={{
                                                                width: '100%',
                                                                height: isMobile ? '300px' : '215px',
                                                                borderRadius: '10px',
                                                                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                                                            }}
                                                        >

                                                            {isAlertsOrWarnings ? (
                                                                arrDataDashBoardA.map((element, idx) => {
                                                                    const Alerts = climateAlert.response[element][element]?.Alerts;
                                                                    const Warnings = climateAlert.response[element][element]?.Warnings;

                                                                    return (Object.keys(Alerts[0]).length > 0 || Object.keys(Warnings[0]).length > 0
                                                                    ) ? (
                                                                        <>
                                                                            {
                                                                                Object.keys(Alerts[0]).length === 0 ? (<div></div>)
                                                                                    : (Alerts.map((object, inx) => (
                                                                                        <Alert
                                                                                            key={`alert-${idx}-${inx}`}
                                                                                            sx={{
                                                                                                width: '95%',
                                                                                                height: '38%',
                                                                                                marginTop: '15px',
                                                                                                marginLeft: '10px',
                                                                                                backgroundColor: 'rgba(255, 0, 0, 0.47)'
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
                                                                                    )))
                                                                            }

                                                                            {
                                                                                Object.keys(Warnings[0]).length === 0 ? (
                                                                                    <div></div>
                                                                                ) : (Warnings.map((object, inx) => (
                                                                                    <Alert
                                                                                        key={`warning-${idx}-${inx}`}
                                                                                        sx={{
                                                                                            width: '95%',
                                                                                            height: isMobile ? '40%' : '38%',
                                                                                            marginTop: '15px',
                                                                                            marginLeft: '10px',
                                                                                            backgroundColor: 'rgba(255, 136, 0, 0.47)'
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
                                                                                )))
                                                                            }
                                                                        </>
                                                                    ) : null
                                                                })
                                                            ) : (<Box

                                                                sx={{
                                                                    marginTop: isMobile ? '40%' : '20%',
                                                                    marginLeft: isMobile ? '35%' : '40%'
                                                                }}
                                                            >
                                                                <Typography variant="caption">Sin novedades</Typography>
                                                            </Box>)

                                                            }

                                                        </Box>

                                                    </Stack>
                                                </Stack>
                                            </Stack>
                                        </Stack>
                                    </>
                                ) : (<><Skeleton animation="wave" variant="rectangular" width={800} height={600} />
                                </>)}
                            </Suspense>
                        </CardContent>
                    </Card>
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

                    <br />



                    <GenericModal open={openModal} element={
                        (typeModal === 'GAUGE') ? (<>
                            <IndicatorDetails title2={dataType === 'Temperatura' ? 'Sensacion aparente' : 'Rango Recomendable'} title1={dataType === 'Radiacion UV' ? 'Porcentaje Actual' : dataType === 'Quality-Air' ? 'Calidad del Aire' : dataType === 'Precipitacion' ? 'Precipitacion' : dataType === 'Velocidad-Viento' ? 'Velocidad' : 'Temperatura'} valor={dataModal} valorOpcional={dataOptional} type={dataType} />
                            <Stack spacing={2}>
                                <Box>
                                    <Alert variant='filled' severity="info" sx={{ backgroundColor: '#4fd6ff7a' }}>
                                        <AlertTitle>¡IMPORTANTE!</AlertTitle>
                                        <Typography color='rgba(255, 255, 255, 0.77)' variant="caption">{climateAlert.response[dataType][dataType].IndicatorGraph.MetricsData.Message}</Typography>
                                    </Alert>
                                </Box>
                                <Stack>
                                    <Stack direction='row' spacing={1}>
                                        <Box sx={{ backgroundColor: 'rgba(10, 92, 175, 0.92)', height: '15px', width: '15px', borderRadius: '5%' }}></Box>
                                        <Typography color='rgba(255, 255, 255, 0.77)' variant='caption'>Valor Actual ({dataModal})</Typography>
                                    </Stack >
                                    <Stack direction='row' spacing={1}>
                                        <Box sx={{ backgroundColor: 'rgba(142, 228, 72, 0.92)', height: '15px', width: '15px', borderRadius: '5%' }}></Box>
                                        <Typography color='rgba(255, 255, 255, 0.77)' variant='caption'>{dataType === 'Temperatura' ? 'Valor Actual' : 'Limite Recomendable'} ({dataOptional})</Typography>
                                    </Stack>
                                    {dataType === 'Temperatura' ? (<Stack direction='row' spacing={1}>
                                        <Box sx={{ backgroundColor: 'rgba(238, 225, 51, 1)', height: '15px', width: '15px', borderRadius: '10%' }}></Box>
                                        <Typography color='rgba(255, 255, 255, 0.77)' variant='caption'>Limite Recomendado {(dataModal < 0) ? '(0 C° : -20 C°)' : '(0 C° : 37 C°)'}</Typography>
                                    </Stack>) : ('')}
                                </Stack>
                            </Stack>
                        </>) : (typeModal === 'CustomLocation') ? (
                            <>

                                <Stack direction='column' spacing={1} sx={{ width: '100%' }}>
                                    <Typography>Localización Personalizada</Typography>
                                    <Stack direction='column' spacing={1}>

                                        <FormControl fullWidth>
                                            <InputLabel sx={{ display: 'block', width: '100%' }} >Seleccione el Pais</InputLabel>
                                            <Select sx={{ width: '100%' }} label="Location" onChange={handleEvent}>
                                                {Countries_Cities.map((temp => {

                                                    return (
                                                        <MenuItem key={temp.id} value={temp.id}>{temp.name}</MenuItem>
                                                    )
                                                }))}
                                            </Select>
                                            <br></br>


                                            {cities.length > 0 && (


                                                <>
                                                    <InputLabel>Seleccione la ciudad</InputLabel>
                                                    <Select label="City" onChange={onChangeCity}
                                                        value={SeleccionadoC}>

                                                        {cities.map((temp => {

                                                            return (
                                                                <MenuItem key={{ latitude: temp.latitude, longitude: temp.longitude }} value={temp.value}>{temp.value}</MenuItem>
                                                            )
                                                        }))}


                                                    </Select>
                                                    {/* <Select
                                                placeholder="Selecciona una Ciudad"
                                                value={SeleccionadoC}
                                                onChange={onChangeCity}
                                                options={cities}
                                            />*/}

                                                </>


                                            )}
                                            <br></br>

                                            <Button
                                                disabled={button_disable}
                                                onClick={() => { handleCloseModal(); setCustomLocation(true); }}
                                                variant='contained'
                                                color='success'
                                                sx={{ width: '100%' }}
                                            >Informe de Clima
                                            </Button>
                                            <br></br>
                                        </FormControl>
                                    </Stack>

                                </Stack>
                            </>
                        ) : 'undefined'
                    } onClose={handleCloseModal} />
                </Box>
            )}

        </>
    );
};

export default MainMenu;
