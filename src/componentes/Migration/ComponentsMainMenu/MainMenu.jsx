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
import { useState, useContext,useEffect } from "react";
import { DataContext } from "../../../Context/MetricsContext.js"
import Engine from "../Engine.jsx";
import GenericModal from "../Modal/GenericModal.jsx";

const MainMenu = () => {
    const [mapComponent, setMapComponent] = useState(null);
    const [Temperatura, setTemperature] = useState("");
    const [dataTempAprox, setdataTempAprox] = useState("");
    const [radiacionUV, setRadiacionUV] = useState("");
    const [location, setLocation] = useState("");
    

    const { openModal, setOpenModal, Alerts,  Warnings,climateAlert,setClimateAlert } = useContext(DataContext);
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
                const mapUrl = `https://maps.google.com/maps?q=${latitude},${longitude}&z=15&output=embed`;

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
                                height={isMobile ? "400px" : "415px"}
                                style={{ border: 0, borderRadius: "8px" }}
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                key={Date.now()}
                            />
                        );
                    })
                    .catch((error) => console.error("Error obteniendo datos del clima:", error));
            },
            (error) => {
                console.error(`Error al obtener ubicación: ${error.message}`);
            }
        );
    };

    useEffect(() => {
        localize();
    }, []);
    return (
        <>
            <Box sx={{ mt: '10px', width: '100%', left: '100px' }}>
                <Card sx={{ boxShadow: '0', border: '1px solid #dadadaff', borderRadius: '4px' }}>
                    <CardContent sx={{ p: 2 }}>
                        <Stack direction={isMobile ? "column" : "row"} justifyContent="space-between" spacing={1}>
                            <Typography variant="h6">Clima hoy - Ubicación aproximada</Typography>
                            <Typography variant="subtitle2">{location}</Typography>
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
                                            <Typography variant="subtitle1">Panel de Alertas</Typography>
                                            <Stack direction="column" spacing={2} sx={{ width: "100%", position: "relative", display: "flex", flexDirection: "column" }}>
                                                {Alerts && Alerts.map((object, inx) => {
                                                    return (
                                                        <Alert variant='outlined' severity="error" key={inx}>
                                                            <AlertTitle>{`¡${object.alertBody?.titulo}!` || "No disponible"}</AlertTitle>
                                                            <Typography variant="caption">{object?.type || "No disponible"}</Typography>
                                                        </Alert>
                                                    );
                                                })}
                                            </Stack>

                                            <Box>
                                                <Stack direction="column" spacing={1} sx={{ width: "100%" }}>
                                                    {Warnings && Warnings.map((object, inx) => {
                                                        return (
                                                            <Alert variant='outlined' severity="warning" key={inx}>
                                                                <AlertTitle>{`¡${object.alertBody?.titulo}!` || "No disponible"}</AlertTitle>
                                                                <Typography variant="caption">{object?.type || "No disponible"}</Typography>
                                                            </Alert>
                                                        );
                                                    })}
                                                </Stack>
                                            </Box>
                                        </Stack>
                                    </Stack>
                                </Stack>
                            </>
                        ) : (
                            <Typography>Cargando mapa...</Typography>
                        )}
                    </CardContent>
                </Card>

                <br />

                {/*<Card sx={{ boxShadow: '0', border: '1px solid #dadadaff', borderRadius: '4px' }}>
                    <CardContent sx={{ p: 2 }}>
                        <Stack direction={isMobile ? "column" : "row"} justifyContent="space-between" spacing={1}>
                            <Typography variant="h6">Pronostico y Calidad del Aire</Typography>
                            <Typography variant="subtitle2">{location}</Typography>
                        </Stack>
                        <Stack direction='row' spacing={1} sx={{ justifyContent: 'space-between' }}>
                            <Card sx={{ boxShadow: '0', border: '1px solid #dadadaff', borderRadius: '4px' }}>
                                <CardContent sx={{ p: 2 }}>
                                    <Stack direction={isMobile ? "column" : "row"} justifyContent="space-between" spacing={1}>
                                        <Typography variant="h6">data</Typography>

                                    </Stack>
                                </CardContent>
                            </Card>
                            <Card sx={{ boxShadow: '0', border: '1px solid #dadadaff', borderRadius: '4px' }}>
                                <CardContent sx={{ p: 2 }}>
                                    <Stack direction={isMobile ? "column" : "row"} justifyContent="space-between" spacing={1}>
                                        <Typography variant="h6">data</Typography>
                                    </Stack>
                                </CardContent>
                            </Card>
                        </Stack>
                    </CardContent>
                </Card>*/}

                <GenericModal open={openModal} onClose={handleCloseModal} />
            </Box>
        </>
    );
};

export default MainMenu;
