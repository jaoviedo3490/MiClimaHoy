import { useContext, useState } from "react";
import ViewData from "./viewData";
import { DataContext } from "../Context/MetricsContext";

const Home = () =>{
    const [showData,setShowData] = useState(false);
    const [loading,setLoading] = useState(false);
    //const [json , setJson] = useState('');
    const {ClimateAlert , setClimateAlert } = useContext(DataContext);

    const localize = () =>{
       navigator.geolocation.getCurrentPosition(
        (position)=>{
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}&zoom=10`)
            .then(response=>response.json())
            .then(data=>{
                const ciudad = data.address.county;
                fetch(`http://api.weatherapi.com/v1/current.json?key=a21411e5a88c4a5291a173440243010&q=${ciudad}&aqi=yes`)
                .then(response=>response.json())
                .then(data=>{
                    setClimateAlert(data.current);
                    setShowData(true);
                })
            });
        },(error)=>{
            alert(`Ocurrio un error al intentar obtener la ubicacion: ${JSON.stringify(error)}:`);
        }
       );
    }
    return(
        <div className="row"> 
            <div className="col">
                <button onClick={localize} className="btn btn-primary">Obtener Informe de Clima Local</button>{showData && <ViewData/>}
            </div>
        </div>
    );
}
export default Home;