import { useContext, useEffect, useState } from "react";
import ViewData from "./viewData";
import { DataContext } from "../Context/MetricsContext";
import UpdateDate from "./updateDate";
import SandBox from "./SandBox"
import CallBckApi from "../callBack-API/callBackApi";
import MainPanel from "./Migration/mainPanel";
import Image from "../../src/clima.jpg";
import {
    
    useMediaQuery,
    useTheme,
   
} from "@mui/material";

const Home = () => {
    document.body.style.backgroundImage = `url(${Image})`;
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundRepeat = "no-repeat";

    document.body.style.backgroundAttachment = "fixed";
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
    const [showData, setShowData] = useState(false);
    const [showSandBox, setSandBox] = useState(false);
    const [loading, setLoading] = useState(false);
    //const [json , setJson] = useState('');
    const { ClimateAlert, setClimateAlert } = useContext(DataContext);
    const { langSearch, apiSearch } = useContext(DataContext);
    const { cities, setCities } = useContext(DataContext);
    const [pushButton, setPushButton] = useState(false);
    const [CitiesHottest, setCitiesHottest] = useState([]);
    const [CittiesFresh, setCitiesFresh] = useState([]);
    const { migrateVersion, setMigrateVersion } = useContext(DataContext);
    const fetchCities = async () => {
        await apiSearch('Colombia', 'Dame 5 ciudades mas frias', setCitiesFresh);
        await apiSearch('Colombia', 'Dame 5 ciudades mas calidas', setCitiesHottest);
    }
    const handleMigrateVersion = () => {
        setMigrateVersion(true);
    }

    const localize = () => {
        setLoading(true);
        navigator.geolocation.getCurrentPosition(
            (position) => {

                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;

                fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}&zoom=10`)
                    .then(response => {
                        if (!response.ok) {
                            throw new Error(`Ocurrio un error en la solicitud: ${response.status}`);
                        }
                        return response.json();
                    })
                    .then(data => {
                        //console.log(data);
                        if (JSON.stringify(data).indexOf('error') != -1) {
                            alert(`La solicitud devolvio el siguente mensaje: ${data.error}`);
                        } else {
                            const ciudad = data.address.city;

                            fetch(`https://api.weatherapi.com/v1/current.json?key=${process.env.REACT_APP_APIKEY}&q=${ciudad}&aqi=yes`)
                                .then(response => {
                                    if (!response.ok) {
                                        throw new Error(`Error en la solicitud: ${response.status}`);
                                    }
                                    return response.json();
                                })
                                .then(data => {

                                    setLoading(false);
                                    setClimateAlert(data);
                                    setShowData(true);
                                    setPushButton(false);
                                })
                                .catch(error => {
                                    console.error('Hubo un error:', error);
                                    alert('Ocurrió un error al obtener los datos del clima');
                                    setLoading(false);
                                });
                        }
                    }).catch(error => {
                        alert(`Ocurrio un error en la solicitud: ${error}`);
                    })
            }, (error) => {
                alert(`Ocurrio un error al intentar obtener la ubicacion: ${JSON.stringify(error)}`);
            }
        );
    }
    useEffect(() => {
        if (pushButton) localize();
    }, [pushButton]);



    return (
        <>
            <main>
                {loading && (
                    <div className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center bg-dark bg-opacity-75 loading-overlay">
                        <div className="text-center text-light">
                            <div className="spinner-grow text-light" role="status"></div>
                            <div className="mt-2">
                                <span className="visually-hidden">Cargando...</span>
                            </div>
                        </div>
                    </div>
                )}

                <section className="container">
                    <div className="row">
                        <div className="col-12 col-md-6 mx-auto text-center">
                            <div className="d-flex flex-column flex-md-row justify-content-center">
                                {!migrateVersion && (<button
                                    type="button"
                                    onClick={() => {
                                        setPushButton(true);
                                        setSandBox(false);
                                    }}
                                    className="btn btn-primary m-4">
                                    Obtener Informe de Clima Local
                                </button>)}
                                {!migrateVersion && (<button
                                    type="button"
                                    onClick={() => {
                                        setSandBox(true);
                                        setShowData(false);
                                        setPushButton(false);
                                    }}
                                    className="btn btn-primary m-4">
                                    Aplicación SandBox
                                </button>)}
                                {!migrateVersion && (<button
                                    type="button"
                                    onClick={handleMigrateVersion}
                                    className="btn btn-primary m-4">
                                    Version en Migración
                                </button>)}
                            </div>
                        </div>
                    </div>
                </section>

                {!migrateVersion && (<section className="container">
                    <div className="row">
                        <div className="col mx-auto">
                            {showData && (
                                <>
                                    <div className="text-end">
                                        <UpdateDate />
                                    </div>
                                    <ViewData />
                                </>
                            )}
                            {showSandBox && <SandBox />}
                        </div>
                    </div>
                </section>)}
            </main>
            {migrateVersion && (
                <div style={{ marginLeft: isMobile ? 'auto' : -100, padding: 0, width: isMobile ? '100%' : "97vw" }}>
                    <MainPanel />
                </div>
            )}
        </>


    );

};

export default Home;
