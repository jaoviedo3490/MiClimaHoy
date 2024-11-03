import { useContext, useEffect, useState } from "react";
import ViewData from "./viewData";
import { DataContext } from "../Context/MetricsContext";
import UpdateDate from "./updateDate";

const Home = () => {
    const [showData, setShowData] = useState(false);
    const [loading, setLoading] = useState(false);
    //const [json , setJson] = useState('');
    const { ClimateAlert, setClimateAlert } = useContext(DataContext);
    const [pushButton , setPushButton] = useState(false)

    
    const localize = () => {
        setLoading(true);
        navigator.geolocation.getCurrentPosition(
            (position) => {

                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;
                fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}&zoom=10`)
                    .then(response => response.json())
                    .then(data => {
                        const ciudad = data.address.county;
                        fetch(`http://api.weatherapi.com/v1/current.json?key=a21411e5a88c4a5291a173440243010&q=${ciudad}&aqi=yes`)
                            .then(response => response.json())
                            .then(data => {
                                console.log(data);
                                try {
                                    setLoading(false);
                                    setClimateAlert(data);
                                    alert(JSON.stringify(data));
                                    setShowData(true);
                                    setPushButton(false)
                                } catch (error) {
                                    alert(error);
                                }
                            })
                    });
            }, (error) => {
                alert(`Ocurrio un error al intentar obtener la ubicacion: ${JSON.stringify(error)}`);
            }
        );
    }
    
    return (
        <div>
            {loading && (
                <div className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center bg-dark bg-opacity-75" style={{ zIndex: 1050 }}>
                    <div className="text-center text-light">
                        <div className="spinner-grow text-light" role="status"></div>
                        <div className="mt-2"><span className="visually">Cargando...</span></div>
                    </div>
                </div>
            )}
            
            <div className="container">
                <div className="row">
                    <div className="col mx-auto">
                        <button onClick={localize} className="btn btn-primary m-4 text-center">
                            Obtener Informe de Clima Local
                        </button>{showData ? (<div className="text-end"><UpdateDate/></div>) : (<h4 className="text-light text-end"></h4>)}
                        {showData && <ViewData />}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
