import { useContext, useEffect, useState } from "react";
import ViewData from "./viewData";
import { DataContext } from "../Context/MetricsContext";
import UpdateDate from "./updateDate";
import SandBox from "./SandBox"

const Home = () => {
    const [showData, setShowData] = useState(false);
    const [showSandBox, setSandBox] = useState(false);
    const [loading, setLoading] = useState(false);
    //const [json , setJson] = useState('');
    const { ClimateAlert, setClimateAlert } = useContext(DataContext);
    const [pushButton, setPushButton] = useState(false);



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
                            <button
                                type="button"
                                onClick={() => {
                                    setPushButton(true);
                                    setSandBox(false);
                                }}
                                className="btn btn-primary m-4">
                                Obtener Informe de Clima Local
                            </button>
                            <button
                                type="button"
                                onClick={() => {
                                    setSandBox(true);
                                    setShowData(false);
                                    setPushButton(false);
                                }}
                                className="btn btn-primary m-4">
                                Aplicación SandBox
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            <section className="container">
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
            </section>
        </main>

    );
};

export default Home;