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
import Divider from '@mui/material/Divider';
import { useState, useContext, useEffect } from "react";
import { DataContext } from "../../../Context/MetricsContext.js"
import Engine from "../Engine.jsx";
import GenericModal from "../Modal/GenericModal.jsx";
import Snackbar from '@mui/material/Snackbar';
import JsonImage from '../../dataJson/wallpaper.json';


const MainMenu = () => {

    const [mapComponent, setMapComponent] = useState(null);
    const [Temperatura, setTemperature] = useState("");
    const [dataTempAprox, setdataTempAprox] = useState("");
    const [radiacionUV, setRadiacionUV] = useState("");
    const [location, setLocation] = useState("");
    const [messageSnackBar, setMessageSnackBar] = useState();
    const [isSnackBarActive, setIsSnackBarActive] = useState(false);

    const { openModal, setOpenModal, Alerts, Warnings, setClimateAlert, dark_theme_letters, setDarkLetters, setBackground } = useContext(DataContext);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

    const handleCloseModal = () => {
        if (typeof setOpenModal === "function") setOpenModal(false);
    };
    const localize = () => {

        navigator.geolocation.getCurrentPosition(
            (position) => {
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;
                const mapUrl = `https://maps.google.com/maps?q=${latitude},${longitude}&t=k&z=15&output=embed`;

                fetch(
                    `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}&zoom=10`
                )
                    .then((res) => res.json())
                    .then((data) => {
                        const ciudad = data?.address?.city || data?.address?.town || data?.address?.village || `${latitude},${longitude}`;
                        return fetch(
                            `https://api.weatherapi.com/v1/current.json?key=a21411e5a88c4a5291a173440243010&q=${ciudad}&aqi=yes`
                        );
                    })
                    .then((res) => res.json())
                    .then((data) => {
                        setClimateAlert(data);
                        console.log("Datos clima:", data);
                        setTemperature(data.current.temp_c);
                        setRadiacionUV(data.current.uv);
                        setLocation(data.current.last_updated);
                        setdataTempAprox(data.current.feelslike_c);



                        setMapComponent(
                            <iframe
                                src={mapUrl}
                                width={isMobile ? "100%" : "100%"}
                                height={isMobile ? "400px" : "460px"}
                                style={{ border: 0, borderRadius: "8px" }}
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                key={Date.now()}
                            />
                        );
                    })
                    .catch((error) => {
                        setIsSnackBarActive(true);
                        setMessageSnackBar(String(error));

                    });
            },
            (error) => {
                setIsSnackBarActive(true);
                setMessageSnackBar(`Error al obtener ubicación: ${String(error)}`);
                console.error(`Error al obtener ubicación: ${String(error)}`);
            }
        );
    };

    useEffect(() => {
        localize();
    }, []);

    useEffect(() => {
        if (Temperatura <= -5) {
            const images = JsonImage.wallPapersCategory.low_temp_fatal[Math.floor(Math.random() * JsonImage.wallPapersCategory.low_temp_fatal.length)];
            setBackground(images);
            const themeD = /_dark/.test(images);

            setDarkLetters(themeD);
        }else if(Temperatura <0 && Temperatura >=-5){
            const images = JsonImage.wallPapersCategory.low_temp_non_fatal[Math.floor(Math.random() * JsonImage.wallPapersCategory.low_temp_non_fatal.length)];
            setBackground(images);
            const themeD = /_dark/.test(images);

            setDarkLetters(themeD);
        }else if(Temperatura >=0 && Temperatura <=20){
            const images = JsonImage.wallPapersCategory.low_temp[Math.floor(Math.random() * JsonImage.wallPapersCategory.low_temp.length)];
            setBackground(images);
            const themeD = /_dark/.test(images);

            setDarkLetters(themeD);
        }else if(Temperatura >=20 && Temperatura <=30){
            const images = JsonImage.wallPapersCategory.normal_temp[Math.floor(Math.random() * JsonImage.wallPapersCategory.normal_temp.length)];
            setBackground(images);
            const themeD = /_dark/.test(images);

            setDarkLetters(themeD);
        }else if(Temperatura >=30 && Temperatura <=36){
            const images = JsonImage.wallPapersCategory.hight_temp_non_fatal[Math.floor(Math.random() * JsonImage.wallPapersCategory.hight_temp_non_fatal.length)];
            setBackground(images);
            const themeD = /_dark/.test(images);

            setDarkLetters(themeD);
        }else if(Temperatura >=36){
            const images = JsonImage.wallPapersCategory.hight_temp_fatal[Math.floor(Math.random() * JsonImage.wallPapersCategory.hight_temp_fatal.length)];
            setBackground(images);
            const themeD = /_dark/.test(images);

            setDarkLetters(themeD);
        }



    })
    return (
        <>
            <Box sx={{ mt: '10px', width: '100%', left: '100px' }}>
                <Card sx={{
                    boxShadow: '0', border: '1px solid #dadadaff', borderRadius: '4px',
                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                    backdropFilter: 'blur(5px)'

                }}>
                    <CardContent sx={{ p: 2 }}>
                        <Stack direction={isMobile ? "column" : "row"} justifyContent="space-between" spacing={1}>
                            <Typography sx={{ color: dark_theme_letters ? 'white' : 'black' }} variant="h6">Clima hoy - Ubicación aproximada</Typography>

                            <Typography variant="subtitle2" sx={{ color: dark_theme_letters ? 'white' : 'black' }}>{location}</Typography>
                        </Stack>
                        {mapComponent ? (
                            <>
                                <Stack direction={isMobile ? "column" : "row"}>

                                    <Box sx={{ width: '100%', height: "100%" }}>{mapComponent}</Box>
                                    <Stack direction="column">
                                        <Stack direction={isMobile ? "column" : "row"} spacing={2} sx={{ width: "100%" }}>

                                            <Engine
                                                min={-20}
                                                max={70}
                                                type="Temperatura"
                                                indicator="C°"
                                                split={5}
                                                data={Temperatura}
                                                optionalData={dataTempAprox}
                                                recomendedLimit={(Temperatura < 0) ? -10 : 37}
                                            />
                                            {<Engine
                                                min={0}
                                                max={16}
                                                type="Radiacion UV"
                                                indicator="UV"
                                                split={4}
                                                data={radiacionUV}
                                                optionalData={10}

                                            />}
                                        </Stack>

                                        <Stack direction="column" spacing={0} sx={{ ml: "10px", width: "98%", height: "100%" }}>
                                            <Divider component="div" role="presentation">
                                                <Typography>Panel de Alertas</Typography>
                                            </Divider>
                                            <Stack direction="column" spacing={2} sx={{ width: "100%", position: "relative", display: "flex", flexDirection: "column" }}>
                                                <Box
                                                    sx={{
                                                        width: '100%',
                                                        height: isMobile ? '300px' : '215px',
                                                        borderRadius: '10px',
                                                        backgroundColor: 'rgba(255, 255, 255, 0.2)',
                                                    }}
                                                >
                                                    {Array.isArray(Alerts) && Alerts.length > 0 ? (
                                                        Alerts.map((object, inx) => (
                                                            <Alert
                                                                sx={{ width: '95%', height: '38%', marginTop: '15px', marginLeft: '10px', backgroundColor: 'rgba(255, 0, 0, 0.47)' }}
                                                                variant="filled"
                                                                severity="error"
                                                                key={inx}
                                                            >
                                                                <AlertTitle>{`¡${object.alertBody?.titulo || "No disponible"}!`}</AlertTitle>
                                                                <Typography variant="caption">{object?.type || "No disponible"}</Typography>
                                                            </Alert>
                                                        ))
                                                    ) : Array.isArray(Warnings) && Warnings.length > 0 ? (
                                                        Warnings.map((object, inx) => (
                                                            <Alert
                                                                sx={{ width: '95%', height: isMobile ? '40%' : '38%', marginTop: '15px', marginLeft: '10px',backgroundColor: 'rgba(255, 136, 0, 0.47)'  }}
                                                                variant="filled"
                                                                severity="warning"
                                                                key={inx}
                                                            >
                                                                <AlertTitle>{`¡${object.alertBody?.titulo || "No disponible"}!`}</AlertTitle>
                                                                <Typography variant="caption">{object?.type || "No disponible"}</Typography>
                                                            </Alert>
                                                        ))
                                                    ) : (
                                                        <Box sx={{ marginTop: isMobile ? '40%' : '20%', marginLeft: isMobile ? '35%' : '40%' }}>
                                                            <Typography variant="caption">Sin novedades</Typography>
                                                        </Box>
                                                    )}
                                                </Box>

                                            </Stack>
                                        </Stack>
                                    </Stack>
                                </Stack>
                            </>
                        ) : (
                            <Typography>Cargando mapa...</Typography>
                        )}
                    </CardContent>
                </Card>
                <Snackbar
                    open={isSnackBarActive}
                    autoHideDuration={6000}
                    //onClose={handleClose}
                    message={messageSnackBar}

                />

                <br />



                <GenericModal open={openModal} onClose={handleCloseModal} />
            </Box>
        </>
    );
};

export default MainMenu;
