import { useContext } from "react";
import { DataContext } from "../Context/MetricsContext";
const UpdateDate = () =>{
const{climateAlert,setClimateAlert} = useContext(DataContext);

return (

<div>
    <h4 className="text-light">Ultima Fecha de Actualización: {climateAlert.last_updated}</h4>
</div>
);

}
export default UpdateDate;