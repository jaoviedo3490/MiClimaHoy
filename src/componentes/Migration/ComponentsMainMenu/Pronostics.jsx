import {
    Box,
    useMediaQuery,
    useTheme,
    Card,
    CardContent,
    Stack,
    Typography, Button, Alert, AlertTitle
} from "@mui/material";
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import { useState, useContext, useEffect } from "react";
import { DataContext } from "../../../Context/MetricsContext.js"
import { Ui_Context } from "../../../Context/Ui-Context.js";
import GenericModal from "../Modal/GenericModal.jsx";
import JsonIcon from '../../dataJson/icon.json';
import { Image } from 'mui-image';
import IndicatorDetails from "../Graphics/indicatorDetails.jsx";
import ClimateDefinition from '../../dataJson/climate-definition.json';
import JsonImage from '../../dataJson/wallpaper.json';
import Engine from "../Engine.jsx";
import PopoverComponent from '../GenericComponentes/Popover.jsx';
import TreeGraph from "../Graphics/TreeGraphic.jsx";
import TreeGraphicEchart from "../Graphics/TreeGraphicEcharts.jsx";
const Pronostics = (props) => {
    const [GaugeModal, setGaugeModal] = useState(false);

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
    const {
        setOptionTab, Warnings_Module_second, Alerts_Module_second, dataDioAzufre, dataDioNitrogeno, dataMonoCarbono,
        isDay_global, setIsDay_global, dataVisibilidad, dataHumedad, dataNubosidad, setBackground, setDarkLetters, climateAlert
    } = useContext(DataContext);

    const {
        openModal, setOpenModal, setCloseModal, dataModal, setDataModal, dataRecomendations, setRecomendations,
        dataType, setDataType, dataOptional, setDataOptional, typeModal, setTypeModal,
    } = useContext(Ui_Context);


    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
    setOptionTab(false);

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
        const PM2_5 = climateAlert.current.air_quality.pm2_5;
        const Ozono = climateAlert.current.air_quality.o3;
        const level_contamination = climateAlert.current.air_quality['us-epa-index'];
        const precipitation_local = climateAlert.current.precip_mm;
        const velocidad_viento = climateAlert.current.wind_kph;
        const PM10 = climateAlert.current.air_quality.pm10;

        const qualityAirJson = {
            "CO": mono_carbono,
            "NO2": dio_nitrogeno,
            "O3": Ozono,
            "PM2_5": PM2_5,
            "PM10": PM10,
            "SO2": dio_azufre
        }
        const PronosticJson = {
            "Nubosidad": nubosidad,
            "Humedad": humidity,
            "Visibilidad": visibilidad
        }
        setPronosticDetails(PronosticJson)
        setQualityAirDetails(qualityAirJson);
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
        setPrecipitacion(precipitation_local);
        setVelocidadViento(velocidad_viento)

        setLevelQualityAir(level_contamination);

        //alert(`${is_day}-${pronosticFormat}`)
        const images = JsonImage.wallPapersCategory[`${is_day}-${pronosticFormat}`];


        setBackground(images);
        const themeD = (isDay === 'nigth') ? true : false
        setIsDay_global((isDay === 'nigth') ? true : false);
        setDarkLetters(themeD);



        setJsonPronosticImage(JsonIcon['icon'][is_day][`${is_day}-${pronosticFormat}`]);
        setAirQualityImage(JsonIcon['icon']['Air-Quality'][level_contamination]);

        //setJsonPronosticImage(JsonIcon['icon'][isDay][`${isDay}-${Pronostic}`]);

    }, [PronosticInitial])

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
                            <Typography variant='body1' sx={{ color: isDay_global ? 'white' : 'black' }}>Pronostico Hoy</Typography>
                            <Typography variant="subtitle2" sx={{ color: isDay_global ? 'white' : 'black' }}>{location}</Typography>
                        </Stack>
                        <Stack direction={isMobile ? "column" : "row"}>
                            <Stack direction="column" justifyContent="space-between" spacing={1}>
                                <Typography variant="h6" sx={{ color: isDay_global ? 'white' : 'black' }}>{`${isDay} ${PronosticInitial}`}</Typography>
                                <Stack direction={isMobile ? "column" : 'row'} spacing={1}>
                                    <Card sx={{ boxShadow: '0', border: '1px solid #dadadaff', borderRadius: '4px', backgroundColor: 'rgba(255, 255, 255, 0.2)' }}>
                                        <CardContent sx={{ p: 2 }}>
                                            <Image src={JsonPronosticImage} width={250} height={300} />
                                            <br></br>
                                            <Stack direction={"row"} justifyContent="space-between">

                                                <PopoverComponent
                                                    tipo={
                                                        <Chip size="small" sx={{ width: isMobile ? 'auto' : 'auto' }} label={'Nubosidad:'} color={dataNubosidad.alert} />
                                                    }

                                                    text={dataNubosidad.Message}
                                                    titulo={dataNubosidad.titulo}
                                                    alert={dataNubosidad.alert}
                                                />
                                                <Chip size="small" sx={{ width: isMobile ? 'auto' : 'auto' }} label={`${Nubosidad} %`} color={dataNubosidad.alert} />
                                            </Stack>
                                            <Divider component="div" role="presentation" />
                                            <Stack direction={"row"} justifyContent="space-between">
                                                <PopoverComponent
                                                    tipo={
                                                        <Chip size="small" label="Humedad:" sx={{ width: isMobile ? 'auto' : 'auto' }} color={`${dataHumedad.alert}`} />
                                                    }

                                                    text={dataHumedad.Message}
                                                    titulo={dataHumedad.titulo}
                                                    alert={dataHumedad.alert}
                                                />
                                                <Chip size="small" sx={{ width: isMobile ? 'auto' : 'auto' }} label={`${Humedad} %`} color={dataHumedad.alert} />
                                            </Stack>
                                            <Divider component="div" role="presentation" />
                                            <Stack direction='row' justifyContent="space-between">
                                                <PopoverComponent
                                                    tipo={
                                                        <Chip size="small" sx={{ width: isMobile ? 'auto' : 'auto' }} label="Visibilidad:" color={dataVisibilidad.alert} />
                                                    }

                                                    text={dataVisibilidad.Message}
                                                    titulo={dataVisibilidad.titulo}
                                                    alert={dataVisibilidad.alert}

                                                />

                                                <Chip size="small" sx={{ width: isMobile ? 'auto' : 'auto' }} label={`${Visibilidad} Kilometros`} color={dataVisibilidad.alert} />
                                            </Stack>
                                            <Divider component="div" role="presentation" />
                                            <br></br>
                                            <Button variant="outlined" onClick={() => handleOpenModal(3)} size="small" sx={{ width: '100%', color: isDay_global ? 'white' : 'black', borderColor: (isDay === 'nigth') ? 'white' : 'black' }}>
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
                                <Engine min={0} max={100} type="Nubosidad" data={Nubosidad} />
                                <Engine min={0} max={100} type="Humedad" data={Humedad} />
                                <Engine min={0} max={50} type="Visibilidad" data={Visibilidad} />
                                {/*<Engine min={0} max={50} type="Quality-Air" data={levelQualityAir} />*/}
                                <Engine min={0} max={50} type="MonoCarbono" data={MonoCarbono} />
                                <Engine min={0} max={50} type="DioNitrogeno" data={DioNitrogeno} />
                                <Engine min={0} max={50} type="DioAzufre" data={DioAzufre} />


                            </Stack>
                            <Stack direction="column" justifyContent="space-between" spacing={1}>
                                <Typography variant="h6" sx={{ color: isDay_global ? 'white' : 'black' }}>Calidad del Aire</Typography>
                                <Stack direction='row' spacing={2}>
                                    <Card sx={{ boxShadow: '0', border: '1px solid #dadadaff', borderRadius: '4px', backgroundColor: 'rgba(255, 255, 255, 0.2)' }}>
                                        <CardContent sx={{ p: 2 }}>
                                            <Image src={AirQualityImage} width={250} height={300} />
                                            <br></br>
                                            <Stack direction='row' justifyContent="space-between">
                                                <PopoverComponent
                                                    tipo={
                                                        <Chip size="small" label="Mono-Carbono:" sx={{ width: '100%' }} color={dataMonoCarbono.alert} />
                                                    }
                                                    color={dataMonoCarbono.color}
                                                    text={dataMonoCarbono.Message}
                                                    titulo={dataMonoCarbono.titulo}
                                                    alert={dataMonoCarbono.alert}
                                                />
                                                <Chip
                                                    size="small"
                                                    label={`${(((MonoCarbono * 24.45) / 28.01) / 1000).toFixed(2)} ppm`}
                                                    sx={{ width: isMobile ? '100%' : 'auto' }}
                                                    color={dataMonoCarbono.alert}
                                                />
                                            </Stack>
                                            <Divider component="div" role="presentation" />
                                            <Stack direction='row' justifyContent="space-between">
                                                <PopoverComponent
                                                    tipo={
                                                        <Chip size="small" label="Dio-Nitrogeno:" sx={{ width: '100%' }} color={dataDioNitrogeno.alert} />
                                                    }
                                                    color={dataDioNitrogeno.color}
                                                    text={dataDioNitrogeno.Message}
                                                    titulo={dataDioNitrogeno.titulo}
                                                    alert={dataDioNitrogeno.alert}
                                                />
                                                <Chip
                                                    size="small"
                                                    label={`${(((DioNitrogeno * 24.45) / 46.0055) / 1000).toFixed(2)} ppm`}
                                                    sx={{ width: '100%' }}
                                                    color={dataDioNitrogeno.alert}
                                                />

                                            </Stack>
                                            <Divider component="div" role="presentation" />
                                            <Stack direction='row' justifyContent="space-between">
                                                <PopoverComponent
                                                    tipo={
                                                        <Chip size="small" label="Dio-Azufre:" sx={{ width: '100%' }} color={dataDioAzufre.alert} />
                                                    }
                                                    color={dataDioAzufre.color}
                                                    alert={dataDioAzufre.alert}
                                                    text={dataDioAzufre.Message}
                                                    titulo={dataDioAzufre.titulo}
                                                />
                                                <Chip
                                                    size="small"
                                                    label={`${(((climateAlert.current.air_quality.so2) * 24.45 / 64.07) / 1000).toFixed(2)} ppm`}
                                                    sx={{ width: '100%' }}
                                                    color={dataDioAzufre.alert}
                                                />

                                            </Stack>
                                            <Divider component="div" role="presentation" />
                                            <br></br>
                                            <Button variant="outlined" onClick={() => handleOpenModal(2)} size="small" sx={{ width: '100%', color: (isDay === 'nigth') ? 'white' : 'black', borderColor: (isDay === 'nigth') ? 'white' : 'black' }}>
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
                            <Stack direction='column'>
                                <Stack direction={isMobile ? 'column' : 'row'}>

                                    <Engine
                                        min={0}
                                        max={6}
                                        type="Quality-Air"
                                        indicator="ppm"
                                        split={5}
                                        data={levelQualityAir}
                                        //optionalData={dataTempAprox}
                                        recomendedLimit={3}
                                    />
                                    <Engine
                                        min={0}
                                        max={40}
                                        type="Precipitacion"
                                        indicator="Dm"
                                        split={5}
                                        data={precipitacion / 100}
                                        optionalData={12}
                                        recomendedLimit={12}
                                    />
                                    <Engine
                                        min={0}
                                        max={100}
                                        type="Velocidad-Viento"
                                        indicator="kph"
                                        split={5}
                                        data={velocidadViento}
                                        optionalData={65}
                                        recomendedLimit={65}
                                    />
                                </Stack>
                                <Divider
                                    component="div"
                                    role="presentation"

                                    sx={{
                                        '&::before, &::after': {
                                            borderColor: isDay_global ? 'white' : 'black',
                                        }
                                    }}
                                >

                                    <Typography sx={{ color: isDay_global ? 'white' : 'black' }}>
                                        Panel de Alertas
                                    </Typography>
                                </Divider>
                                <Box
                                    sx={{
                                        width: '100%',
                                        height: isMobile ? '300px' : '300px',
                                        borderRadius: '10px',
                                        backgroundColor: 'rgba(255, 255, 255, 0.2)',
                                    }}
                                >

                                    {(Array.isArray(Alerts_Module_second) && Alerts_Module_second.length > 0) ||
                                        (Array.isArray(Warnings_Module_second) && Warnings_Module_second.length > 0) ? (
                                        <>

                                            {Array.isArray(Alerts_Module_second) && Alerts_Module_second.length > 0 &&
                                                Alerts_Module_second.map((object, inx) => (
                                                    <Alert
                                                        sx={{ width: '95%', height: '26%', marginTop: '15px', marginLeft: '10px', backgroundColor: 'rgba(255, 0, 0, 0.47)' }}
                                                        variant="filled"
                                                        severity="error"
                                                        key={inx}
                                                    >
                                                        <AlertTitle>{`¡${object.alertBody?.titulo || "No disponible"}!`}</AlertTitle>
                                                        <Typography variant="caption">{object?.type || "No disponible"}</Typography>
                                                    </Alert>
                                                ))
                                            }


                                            {Array.isArray(Warnings_Module_second) && Warnings_Module_second.length > 0 &&
                                                Warnings_Module_second.map((object, inx) => (
                                                    <Alert
                                                        sx={{ width: '95%', height: isMobile ? '40%' : '26%', marginTop: '15px', marginLeft: '10px', backgroundColor: 'rgba(255, 136, 0, 0.47)' }}
                                                        variant="filled"
                                                        severity="warning"
                                                        key={inx}
                                                    >
                                                        <AlertTitle>{`¡${object.alertBody?.titulo || "No disponible"}!`}</AlertTitle>
                                                        <Typography variant="caption">{object?.type || "No disponible"}</Typography>
                                                    </Alert>
                                                ))
                                            }
                                        </>
                                    ) : (

                                        <Box sx={{ marginTop: isMobile ? '40%' : '20%', marginLeft: isMobile ? '35%' : '43%' }}>
                                            <Typography variant='body' sx={{ color: isDay_global ? 'white' : 'black' }}>Sin novedades</Typography>
                                        </Box>
                                    )}
                                </Box>

                            </Stack>
                        </Stack>

                    </CardContent>
                </Card>

                <br />
                <GenericModal element={
                    (typeModal === 'GAUGE') ? (<>
                        <IndicatorDetails title2={'Rango Recomendable'} title1={dataType === 'Quality-Air' ? 'Calidad del Aire' : dataType === 'Precipitacion' ? 'Precipitacion' : dataType === 'Velocidad-Viento' ? 'Velocidad' : 'Valor no encontrado'} valor={dataModal} valorOpcional={dataOptional} type={dataType} />
                        <Stack spacing={1}>
                            <Box>
                                <Alert variant='filled' severity="info" sx={{backgroundColor: '#4fd6ff7a'}}>
                                    <AlertTitle>¡IMPORTANTE!</AlertTitle>
                                    <Typography variant="caption">{dataRecomendations}</Typography>
                                </Alert>

                            </Box>
                            <Stack>
                                <Stack direction='row' spacing={1}>
                                    <Box sx={{ backgroundColor: 'rgba(10, 92, 175, 0.92)', height: '15px', width: '15px', borderRadius: '5%' }}></Box>
                                    <Typography color='rgba(255, 255, 255, 0.77)' variant='caption'>Valor Actual ({dataModal})</Typography>
                                </Stack >
                                <Stack direction='row' spacing={1}>
                                    <Box sx={{ backgroundColor: 'rgba(142, 228, 72, 0.92)', height: '15px', width: '15px', borderRadius: '5%' }}></Box>
                                    <Typography color='rgba(255, 255, 255, 0.77)' variant='caption'>{'Limite Recomendable'} ({dataOptional})</Typography>
                                </Stack>
                            </Stack>
                        </Stack>
                    </>) : (typeModal === 'Pronostico') ? (
                        <>

                            {<Stack direction='column'>
                                <Typography color="white">En Desarrollo</Typography>
                                <TreeGraph data={PronosticDetails} type='Pronostico' />
                                {/*<Alert variant='outlined' severity="success">
                                    <AlertTitle>IMPORTANTE</AlertTitle>
                                    <Typography variant="caption">{ClimateDefinition.Definition[PronosticInitial]}</Typography>
                                </Alert>*/}
                            </Stack>}
                            {/*<Typography>En desarrollo</Typography>*/}

                        </>
                    ) : (typeModal === 'Quality-Air') ? (
                        <>

                            {/*<TreeGraphicEchart data={QualityAirDetails} />*/}
                            {/*<TreeGraph data={QualityAirDetails} type='QualityAir' />*/}
                            {/*<Typography>En desarrollo</Typography>*/}
                            {<Stack direction='column'>
                                <Typography color="white">En Desarrollo</Typography>
                                <TreeGraph data={QualityAirDetails} type='QualityAir' />
                                {/*<Alert variant='outlined' severity="success">
                                    <AlertTitle>IMPORTANTE</AlertTitle>
                                    <Typography variant="caption">{ClimateDefinition.Definition[PronosticInitial]}</Typography>
                                </Alert>*/}
                            </Stack>}

                        </>
                    ) : (<Typography>Elemento no Categorizado</Typography>)
                } open={openModal} onClose={handleCloseModal} />
            </Box >
        </>
    );
};

export default Pronostics;
