import { useContext, useEffect, useState } from "react";
import { DataContext } from "../Context/MetricsContext";
const UpdateDate = () => {
    const { climateAlert, setClimateAlert } = useContext(DataContext);
    const [ciudad , setCiudad] = useState('');
    const [fecha , setFecha] = useState('');
    
    useEffect(()=>{
        setCiudad(climateAlert.location.name);
        setFecha(climateAlert.current.last_updated);
    },[climateAlert])
    return (

        <div className="container">
            <div className="row">
                <div className="col">
                     <h5 className="text-light text-start">Ciudad:{ciudad}</h5>
                </div>
                <div className="col">
                    <h5 className="text-light">Ultima Fecha de Actualización: {fecha}</h5>
                </div>
            </div>
           
        </div>
    );

}
export default UpdateDate;