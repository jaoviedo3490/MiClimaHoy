import {
    Card,
    CardContent,
    Typography,
    Stack,
    Toolbar,
    Box,
    useMediaQuery,
    useTheme,
    Alert,
    AlertTitle
} from "@mui/material";
import { useState, useEffect, useContext, useCallback, useRef } from "react";
import AppBarContent from "./appBar";
import Engine from "./Engine";
import { DataContext } from "../../Context/MetricsContext";
import GenericModal from "./Modal/GenericModal";

const MainPanel = () => {
    document.body.style.backgroundImage = `none`;
    //document.body.style.backgroundColor = "#a4b1c4 !important";
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





    const handleCloseModal = () => {
        setCloseModal(true);
        setOpenModal(false);
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
                        console.log("Datos clima:", data);
                        setTemperature(data.current.temp_c);
                        setRadiacionUV(data.current.uv);
                        setLocation(data.current.last_updated);
                        setdataTempAprox(data.current.feelslike_c);

                        setMapComponent(
                            <iframe
                                src={mapUrl}
                                width={isMobile ? "33%" : "100%"}
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
            <Toolbar>
                <AppBarContent />
            </Toolbar>

            <Box sx={{ mt: 2 }}>
                <Card>
                    <CardContent sx={{ p: 2 }}>
                        <Stack direction={isMobile ? "column" : "row"} justifyContent="space-between" spacing={1}>
                            <Typography variant="h6">Clima hoy - Ubicación aproximada</Typography>
                            <Typography variant="subtitle2">{location}</Typography>
                        </Stack>
                        {mapComponent ? (
                            <>
                                <Stack direction={isMobile ? "column" : "row"}>
                                    <Box sx={{ width: 1100, height: "100%" }}>{mapComponent}</Box>
                                    <Stack direction="column">
                                        <Stack direction={isMobile ? "column" : "row"} spacing={0} sx={{ width: "100%" }}>
                                            <Engine
                                                min={-20}
                                                max={70}
                                                type="Temperatura"
                                                indicator="C°"
                                                split={5}
                                                data={Temperatura}
                                                optionalData={dataTempAprox}
                                            />
                                            <Engine
                                                min={0}
                                                max={16}
                                                type="Radiacion UV"
                                                indicator="UV"
                                                split={4}
                                                data={radiacionUV}
                                                optionalData={10}
                                            />
                                        </Stack>
                                        <Stack direction="column" spacing={0} sx={{ ml: "10px", width: "98%", height: "100%" }}>
                                            <Typography variant="subtitle1">Panel de Alertas</Typography>
                                            <Stack direction="column" spacing={2} sx={{ width: "100%", position: "relative", display: "flex", flexDirection: "column" }}>
                                                {Alerts && Alerts.map((object, inx) => {
                                                    return (
                                                        <Alert variant="standard" severity="error" key={inx}>
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
                                                            <Alert severity="warning" key={inx}>
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

                <Card>
                    <CardContent sx={{ p: 2 }}>
                        <Stack direction={isMobile ? "column" : "row"} justifyContent="space-between" spacing={1}>
                            <Typography variant="h6">Pronostico y Calidad del Aire</Typography>
                            <Typography variant="subtitle2">{location}</Typography>
                        </Stack>
                    </CardContent>
                </Card>

                <GenericModal open={openModal} onClose={handleCloseModal} />
            </Box>
        </>
    );
};

export default MainPanel;