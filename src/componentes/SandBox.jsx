import { useContext, useEffect, useState } from "react";
import { DataContext } from "../Context/MetricsContext";
import Select from "react-select";
import UpdateDate from "./updateDate";
import ViewData from "./viewData";

const SandBox = () => {
    const [Countries, setCountries] = useState([]);
    const [SeleccionadoP, setSelectP] = useState(null);
    const [SeleccionadoC, setSelectC] = useState(null);
    const [cities, setCities] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showDataSandbox,setShowD] = useState(false);
    const {ClimateAlert,setClimateAlert} = useContext(DataContext);
    

    const button = (event) => {
        event.preventDefault();
        setLoading(true);
        fetch(`https://api.weatherapi.com/v1/current.json?key=a21411e5a88c4a5291a173440243010&q=${SeleccionadoP.value}&aqi=yes`)

            .then(response => {
                if (!response.ok) {
                    throw new Error(`Error en la solicitud: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                console.log(data);
                setLoading(false);
                setShowD(true);
                setClimateAlert(data);
              
            })
            .catch(error => {
                alert(`Ocurrió un error al obtener los datos del clima:`);
                
                //alert(`https://api.weatherapi.com/v1/current.json?key=a21411e5a88c4a5291a173440243010&q=${Seleccionado.label}&aqi=yes`);
                setLoading(false);
            });
    }
    const onChangeCity = (opcion) =>{
        setSelectC(opcion);
    }
    useEffect(() => {

        fetch('https://restcountries.com/v3.1/independent?status=true')
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Ocurrió un error en la solicitud: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                const options = data.map(item => ({
                    value: item.name.common,
                    label: item.name.official,
                }));
                setCountries(options);
            })
            .catch(error => console.error(error));
    }, []);

    const handleEvent = (opcion) => {
        setSelectP(opcion);
        setSelectC(null);
        fetch('https://countriesnow.space/api/v0.1/countries/cities', {
            method: "POST",
            headers: { "Content-Type": 'application/json' },
            body: JSON.stringify({ country: opcion.value })
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Ocurrió un error en la solicitud: ${response.status}`);
                }
                return response.json();
            })
            .then(dataT => {
                //console.log(dataT.data);
                const ciudades = dataT.data.map(item => ({ value: item, label: item }));
                setCities(ciudades);

            })
            .catch(error => console.error(error));
    };

    return (
        <div>{loading && (
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
                        <form>
                            <div className="form-group">
                                <Select placeholder="Selecciona un Pais" onChange={handleEvent} options={Countries} /> {cities.length > 0 && (<Select placeholder="Selecciona una Ciudad" value={SeleccionadoC} onChange={onChangeCity} options={cities} />)}
                            </div>
                            <div className="form-group">
                                <button  onClick={button} className="btn btn-secondary mt-2">Informe de Clima</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div> {showDataSandbox && (<div className="text-end"><UpdateDate /></div>)}
                        {showDataSandbox && <ViewData />}
            </div>
        </div>

    );
};

export default SandBox;

