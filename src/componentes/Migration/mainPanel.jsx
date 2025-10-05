import { Box, Card, CardContent, Button, ButtonGroup, Typography, Toolbar, Stack } from "@mui/material";
import CachedIcon from '@mui/icons-material/Cached';
import CreateIcon from '@mui/icons-material/Create';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import DeleteIcon from '@mui/icons-material/Delete';
import { dataContext } from "../../Context/MetricsContext";
import { useContext, useState, useEffect } from "react";
import AppBarContent from "./appBar";
import IndicatorGraph from "./Graphics/Indicator";

const MainPanel = () => {
    const [mapComponent, setMapComponent] = useState(null);
    const [error, setError] = useState('');
    const [temperatura, setTemperature] = useState('');
    const [radiacionUV, setRadiacionUV] = useState('');

    const localize = () => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;

                const mapUrl = `https://maps.google.com/maps?q=${latitude},${longitude}&z=15&output=embed`

                fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}&zoom=10`)
                    .then(response => {
                        if (!response.ok) {
                            setError(`Ocurrio un error en la solicitud: ${response.status}`);
                        }
                        return response.json();
                    })
                    .then(data => {
                        console.log(data);
                        if (JSON.stringify(data).indexOf('error') != -1) {
                            alert(`La solicitud devolvio el siguente mensaje: ${data.error}`);
                        } else {
                            const ciudad = data.address.city;

                            fetch(`https://api.weatherapi.com/v1/current.json?key=a21411e5a88c4a5291a173440243010&q=${ciudad}&aqi=yes`)
                                .then(response => {
                                    if (!response.ok) {
                                        throw new Error(`Error en la solicitud: ${response.status}`);
                                    }
                                    return response.json();
                                })
                                .then(data => {

                                    //alert(JSON.stringify(data));
                                    setTemperature(data.current.temp_c);
                                    setRadiacionUV(data.current.uv);

                                })
                                .catch(error => {
                                    console.error('Hubo un error:', error);
                                    alert('Ocurrió un error al obtener los datos del clima');
                                    alert(data.current.temp_c);
                                });
                        }
                    }).catch(error => {
                        alert(`Ocurrio un error en la solicitud: ${error}`);
                    })


                const component = (
                    <iframe
                        src={mapUrl}
                        width="60%"
                        height="400"
                        style={{ border: 0, borderRadius: '8px' }}
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    />
                );
                setMapComponent(component);
            },
            (error) => {
                alert(`Ocurrió un error al intentar obtener la ubicación: ${error.message}`);
            }
        );
    }


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
                    <CardContent>
                        <Typography variant="h6" gutterBottom>Clima hoy - Ubicacion Aproximada</Typography>
                        {
                            <>
                                <Stack direction='row' spacing={2} >
                                    {mapComponent}
                                    <IndicatorGraph min='-20' max='70' type='Temperatura' indicator='C°' data={temperatura}/>
                                    <IndicatorGraph min='0' max='12' type='Radiacion UV' indicator='' data={radiacionUV}/>
                                </Stack>
                            </> || <Typography>Cargando mapa...</Typography>
                        }
                    </CardContent>
                </Card>
            </Box>
        </>
    );
}

export default MainPanel;