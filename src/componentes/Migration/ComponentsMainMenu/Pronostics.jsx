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
import IndicatorGraph from "../Graphics/Indicator.jsx";

import PopoverComponent from '../GenericComponentes/Popover.jsx';
import TreeGraph from "../Graphics/TreeGraphic.jsx";
import TreeGraphicEchart from "../Graphics/TreeGraphicEcharts.jsx";
const Pronostics = (props) => {
    const { dataOzono, dataPM2_5, setPM2_5,
        dataPM10, setDataPM10,
        setOptionTab, Warnings_Module_second, Alerts_Module_second, dataDioAzufre, dataDioNitrogeno, dataMonoCarbono,
        isDay_global, setIsDay_global, dataVisibilidad, dataHumedad, dataNubosidad, setBackground, setDarkLetters, climateAlert
    } = useContext(DataContext);

    const [arrDataDashBoardB, setArrDataDashBoardB] = useState(["Quality-Air", "Velocidad-Viento", "Precipitacion"])
    const [isAlertsOrWarningsB, setisAlertsOrWarningsB] = useState(false);


    useEffect(() => {
        const isNewsB = Object.keys(climateAlert.response["Quality-Air"]["Quality-Air"].Warnings[0]).length > 0
            || Object.keys(climateAlert.response["Quality-Air"]["Quality-Air"].Alerts[0]).length > 0
            || Object.keys(climateAlert.response["Velocidad-Viento"]["Velocidad-Viento"].Warnings[0]).length > 0
            || Object.keys(climateAlert.response["Velocidad-Viento"]["Velocidad-Viento"].Alerts[0]).length > 0
            || Object.keys(climateAlert.response.Precipitacion.Precipitacion.Alerts[0]).length > 0
            || Object.keys(climateAlert.response.Precipitacion.Precipitacion.Warnings[0]).length > 0

             setisAlertsOrWarningsB(isNewsB);

    },[climateAlert])


   
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

    const nubosidad = 0//climateAlert.current.cloud;
    const humidity = 0//climateAlert.current.humidity;
    const visibilidad = 0//climateAlert.current.vis_km;
    const mono_carbono = isMobile ? (((climateAlert.response.QualityMetrics.MonoCarbono.data * 24.45) / 28.01) / 1000).toFixed(2) : (((climateAlert.response.QualityMetrics.MonoCarbono.data * 24.45) / 28.01) / 1000).toFixed(5);
    const dio_nitrogeno = isMobile ? (((climateAlert.response.QualityMetrics.DioNitrogeno.data * 24.45) / 46.0055) / 1000).toFixed(2) : (((climateAlert.response.QualityMetrics.DioNitrogeno.data * 24.45) / 46.0055) / 1000).toFixed(5);
    const dio_azufre = isMobile ? (((climateAlert.response.QualityMetrics.DioAzufre.data) * 24.45 / 64.07) / 1000).toFixed(2) : (((climateAlert.response.QualityMetrics.DioAzufre.data) * 24.45 / 64.07) / 1000).toFixed(5);
    const PM2_5 = climateAlert.response.QualityMetrics.PM2_5.data;
    const PM10 = climateAlert.response.QualityMetrics.PM10.data;


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


            (PM2_5 >= 0.0 && PM2_5 <= 12.0)
                ? AQI_func(PM2_5, 0.0, 12.0, 0, 50)
                : (PM2_5 > 12.0 && PM2_5 <= 35.4)
                    ? AQI_func(PM2_5, 12.1, 35.4, 51, 100)
                    : (PM2_5 > 35.4 && PM2_5 <= 55.4)
                        ? AQI_func(PM2_5, 35.5, 55.4, 101, 150)
                        : (PM2_5 > 55.4 && PM2_5 <= 150.4)
                            ? AQI_func(PM2_5, 55.5, 150.4, 151, 200)
                            : (PM2_5 > 150.4 && PM2_5 <= 250.4)
                                ? AQI_func(PM2_5, 150.5, 250.4, 201, 300)
                                : (PM2_5 > 250.4 && PM2_5 <= 350.4)
                                    ? AQI_func(PM2_5, 250.5, 350.4, 301, 400)
                                    : (PM2_5 > 350.4 && PM2_5 <= 500.4)
                                        ? AQI_func(PM2_5, 350.5, 500.4, 401, 500)
                                        : PM2_5,


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


            (Pm10 >= 0 && Pm10 <= 54)
                ? AQI_func(Pm10, 0, 54, 0, 50)
                : (Pm10 > 54 && Pm10 <= 154)
                    ? AQI_func(Pm10, 55, 154, 51, 100)
                    : (Pm10 > 154 && Pm10 <= 254)
                        ? AQI_func(Pm10, 155, 254, 101, 150)
                        : (Pm10 > 254 && Pm10 <= 354)
                            ? AQI_func(Pm10, 255, 354, 151, 200)
                            : (Pm10 > 354 && Pm10 <= 424)
                                ? AQI_func(Pm10, 355, 424, 201, 300)
                                : (Pm10 > 424 && Pm10 <= 504)
                                    ? AQI_func(PM10, 425, 504, 301, 400)
                                    : (PM10 > 504 && PM10 <= 604)
                                        ? AQI_func(PM10, 505, 604, 401, 500)
                                        : PM10
        ];
        //alert(data_2)


        let temp_arr = [
            { Name: "Mono-Carbono", value: data_2[0], Message: climateAlert.response.QualityMetrics.MonoCarbono.MetricsData.Message, color: climateAlert.response.QualityMetrics.MonoCarbono.MetricsData.color, titulo: climateAlert.response.QualityMetrics.MonoCarbono.MetricsData.titulo, alert: climateAlert.response.QualityMetrics.MonoCarbono.MetricsData.alert, medidor: 'ppm' },
            { Name: "Dio-Azufre", value: data_2[1], Message: climateAlert.response.QualityMetrics.DioAzufre.MetricsData.Message, color: climateAlert.response.QualityMetrics.DioAzufre.MetricsData.color, titulo: climateAlert.response.QualityMetrics.DioAzufre.MetricsData.titulo, alert: climateAlert.response.QualityMetrics.DioAzufre.MetricsData.alert, medidor: 'ppm' },
            { Name: "Dio-Nitrogeno", value: data_2[2], Message: climateAlert.response.QualityMetrics.DioNitrogeno.MetricsData.Message, color: climateAlert.response.QualityMetrics.DioNitrogeno.MetricsData.color, titulo: climateAlert.response.QualityMetrics.DioNitrogeno.MetricsData.titulo, alert: climateAlert.response.QualityMetrics.DioNitrogeno.MetricsData.alert, medidor: 'ppm' },
            { Name: "Ozono", value: data_2[4], Message: climateAlert.response.QualityMetrics.Ozono.MetricsData.Message, titulo: climateAlert.response.QualityMetrics.Ozono.MetricsData.titulo, alert: climateAlert.response.QualityMetrics.Ozono.MetricsData.alert, medidor: 'ppm' },
            { Name: "PM2_5", value: PM2_5, Message: climateAlert.response.QualityMetrics.PM2_5.MetricsData.Message, color: climateAlert.response.QualityMetrics.PM2_5.MetricsData.color, titulo: climateAlert.response.QualityMetrics.PM2_5.MetricsData.titulo, alert: climateAlert.response.QualityMetrics.PM2_5.MetricsData.alert, medidor: 'µg/m³' },
            { Name: "PM10", value: PM10, Message: climateAlert.response.QualityMetrics.PM10.MetricsData.Message, color: climateAlert.response.QualityMetrics.PM10.MetricsData.color, titulo: climateAlert.response.QualityMetrics.PM10.MetricsData.titulo, alert: climateAlert.response.QualityMetrics.PM10.MetricsData.alert, medidor: 'µg/m³' }
        ];






        temp_arr = temp_arr.filter((obj, i, arr) => obj.value > 5).sort((a, b) => b.value - a.value).slice(0, 3);
        //alert(JSON.stringify(temp_arr))
        setQualityAir_elements(temp_arr);

        //alert(QualityAir_Elements.length)

        //setQualityAir_elements(temp_arr);
        const level_contamination = climateAlert.response["Quality-Air"]["Quality-Air"].IndicatorGraph.data;
        const precipitation_local = climateAlert.response.Precipitacion.Precipitacion.IndicatorGraph.data;
        const velocidad_viento = climateAlert.response["Velocidad-Viento"]["Velocidad-Viento"].IndicatorGraph.data;


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
        setPronostic(pronostic);
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
        setOzono(Ozono);
        setPm2_5(PM2_5);
        setPm10(PM10);

        setLevelQualityAir(level_contamination);

        //alert(`${is_day}-${pronosticFormat}`)
        const images = JsonImage.wallPapersCategory[`${is_day}-${pronostic}`];
        //alert([`${is_day}-${pronostic}`])


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
                                                        <Chip size="small" sx={{ width: isMobile ? 'auto' : 'auto' }} label={'Nubosidad:'} color={climateAlert.response.PronosticsMetrics.Nubosidad.MetricsData.alert} />
                                                    }

                                                    text={climateAlert.response.PronosticsMetrics.Nubosidad.MetricsData.Message}
                                                    titulo={climateAlert.response.PronosticsMetrics.Nubosidad.MetricsData.titulo}
                                                    alert={climateAlert.response.PronosticsMetrics.Nubosidad.MetricsData.alert}
                                                />
                                                <Chip size="small" sx={{ width: isMobile ? 'auto' : 'auto' }} label={`${climateAlert.response.PronosticsMetrics.Nubosidad.data} %`} color={climateAlert.response.PronosticsMetrics.Nubosidad.MetricsData.alert} />
                                            </Stack>
                                            <Divider component="div" role="presentation" />
                                            <Stack direction={"row"} justifyContent="space-between">
                                                <PopoverComponent
                                                    tipo={
                                                        <Chip size="small" label="Humedad:" sx={{ width: isMobile ? 'auto' : 'auto' }} color={`${climateAlert.response.PronosticsMetrics.Humedad.MetricsData.alert}`} />
                                                    }

                                                    text={climateAlert.response.PronosticsMetrics.Humedad.MetricsData.Message}
                                                    titulo={climateAlert.response.PronosticsMetrics.Humedad.MetricsData.titulo}
                                                    alert={climateAlert.response.PronosticsMetrics.Humedad.MetricsData.alert}
                                                />
                                                <Chip size="small" sx={{ width: isMobile ? 'auto' : 'auto' }} label={`${climateAlert.response.PronosticsMetrics.Humedad.data} %`} color={climateAlert.response.PronosticsMetrics.Humedad.MetricsData.alert} />
                                            </Stack>
                                            <Divider component="div" role="presentation" />
                                            <Stack direction='row' justifyContent="space-between">
                                                <PopoverComponent
                                                    tipo={
                                                        <Chip size="small" sx={{ width: isMobile ? 'auto' : 'auto' }} label="Visibilidad:" color={climateAlert.response.PronosticsMetrics.Visibilidad.MetricsData.alert} />
                                                    }
                                                    text={climateAlert.response.PronosticsMetrics.Visibilidad.MetricsData.Message}
                                                    titulo={climateAlert.response.PronosticsMetrics.Visibilidad.MetricsData.titulo}
                                                    alert={climateAlert.response.PronosticsMetrics.Visibilidad.MetricsData.alert}
                                                />

                                                <Chip size="small" sx={{ width: isMobile ? 'auto' : 'auto' }} label={`${climateAlert.response.PronosticsMetrics.Visibilidad.data} Kilometros`} color={climateAlert.response.PronosticsMetrics.Visibilidad.MetricsData.alert} />
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





                            </Stack>
                            <Stack direction="column" justifyContent="space-between" spacing={1}>
                                <Typography variant="h6" sx={{ color: isDay_global ? 'white' : 'black' }}>Calidad del Aire</Typography>
                                <Stack direction='row' spacing={2}>
                                    <Card sx={{ boxShadow: '0', border: '1px solid #dadadaff', borderRadius: '4px', backgroundColor: 'rgba(255, 255, 255, 0.2)' }}>
                                        <CardContent sx={{ p: 2 }}>
                                            <Image src={AirQualityImage} width={250} height={300} />
                                            <br></br>


                                            {Array.isArray(QualityAir_Elements) && (QualityAir_Elements.length > 0) ? (QualityAir_Elements.map((element, idx) => {

                                                return (<>
                                                    <Stack direction='row' justifyContent="space-between">
                                                        <PopoverComponent
                                                            tipo={
                                                                <Chip size="small" label={element.Name} sx={{
                                                                    width: '100%', backgroundColor: element.alert === 'xtreme' ? element.color : element.alert,
                                                                    color: element.alert === 'xtreme' ? 'white' : 'white'
                                                                }} color={element.alert} />
                                                            }
                                                            color={(element.alert !== 'xtreme' ? element.alert : element.color)}
                                                            text={element.Message}
                                                            titulo={element.titulo}
                                                            alert={element.alert}
                                                        />

                                                        <Chip
                                                            key={idx}
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
                                                                backgroundColor: element.alert === 'xtreme' ? element.color : element.alert,
                                                                color: element.alert === 'xtreme' ? 'white' : 'white'
                                                            }}

                                                            color={(element.alert !== 'xtreme' ? element.alert : element.alert)}
                                                        />
                                                    </Stack>
                                                    <Divider key={idx} component="div" role="presentation" />

                                                </>)
                                            })) : (<><Typography>
                                                <Alert severity="error" variant="filled">Informacion temporalmente no disponible</Alert>
                                            </Typography></>)}






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

                                    <IndicatorGraph
                                        min={0}
                                        max={6}
                                        type="Quality-Air"
                                        indicator="ppm"
                                        split={5}
                                        color={climateAlert.response["Quality-Air"]["Quality-Air"].IndicatorGraph.MetricsData.color}
                                        data={levelQualityAir}
                                        optionalData={3}
                                        recomendedLimit={3}
                                    />
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

                                    {isAlertsOrWarningsB ? (
                                        arrDataDashBoardB.map((element, idx) => {
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
                                                                    height: isMobile ? '38%' : '28%',
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

                    </CardContent>
                </Card>

                <br />
                <GenericModal element={
                    (typeModal === 'GAUGE') ? (<>
                        <IndicatorDetails title2={'Rango Recomendable'} title1={dataType === 'Quality-Air' ? 'Calidad del Aire' : dataType === 'Precipitacion' ? 'Precipitacion' : dataType === 'Velocidad-Viento' ? 'Velocidad' : 'Valor no encontrado'} valor={dataModal} valorOpcional={dataOptional} type={dataType} />
                        <Stack spacing={1}>
                            <Box>
                                <Alert variant='filled' severity="info" sx={{ backgroundColor: '#4fd6ff7a' }}>
                                    <AlertTitle>¡IMPORTANTE!</AlertTitle>
                                    <Typography variant="caption">{climateAlert.response[dataType][dataType].IndicatorGraph.MetricsData.Message}</Typography>
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
                                <Typography color="white">Mas Detalles</Typography>
                                {<Alert variant='filled' severity="info" sx={{ backgroundColor: '#4fd6ff7a' }}>
                                    <AlertTitle>¡IMPORTANTE!</AlertTitle>
                                    <Typography variant="caption">{ClimateDefinition.Definition[PronosticInitial.replaceAll('-'," ")]}</Typography>
                                </Alert>}
                                <TreeGraph data={PronosticDetails} type='Pronostico' />

                            </Stack>}
                            {/*<Typography>En desarrollo</Typography>*/}

                        </>
                    ) : (typeModal === 'Quality-Air') ? (
                        <>

                            {/*<TreeGraphicEchart data={QualityAirDetails} />*/}
                            {/*<TreeGraph data={QualityAirDetails} type='QualityAir' />*/}
                            {/*<Typography>En desarrollo</Typography>*/}
                            {<Stack direction='column' spacing={1}>

                                <Stack direction='row' spacing={1}>
                                    <TreeGraph data={QualityAirDetails} type='QualityAir' />

                                </Stack>

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
