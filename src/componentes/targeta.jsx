import { useContext, useState } from "react";
import { DataContext } from "../Context/MetricsContext";
import icon from "./dataJson/icon.json";
const Target = (props) => {
  const { climateAlert, setClimateAlert } = useContext(DataContext);
  const [typeTarget, setTypeTarget] = useState(props.tipo);
  const text_alert = {
    "nubosidad": [{ "success": [0, 25], "info": [26, 50], "warning": [51, 75], "danger": [76, 100] }],
    "humedad": [{ "success": [0, 25], "info": [26, 50], "warning": [51, 75], "danger": [76, 100] }],
    "visibilidad": [{ "success": [11, 50], "info": [6, 10], "warning": [1, 5], "danger": [0, 1] }]
  }



  const getAlert = (value, tipo) => {
    let alertType = 0;

    for (const propiedad in text_alert) {

      const valoresPropiedad = text_alert[propiedad][0];
      for (const nivel in valoresPropiedad) {

        const valoresNivel = valoresPropiedad[nivel];
        const a = valoresNivel.find((element) => (parseInt(value) >= valoresNivel[0]) && (parseInt(value) <= valoresNivel[1]));
        if (a !== undefined && propiedad === tipo) {
          alertType = nivel;
          break;
        }
      }
    }
    return alertType;
  }

  switch (typeTarget) {
    case "pronostico":
      let climate = climateAlert.current.condition.text;
      climate = climate.replaceAll(" ", "-");

      const is_day = (climateAlert.current.is_day === 0) ? "nigth" : "day";
      const alertaNubosidad = getAlert(climateAlert.current.cloud, "nubosidad");
      const alertaHumedad = getAlert(climateAlert.current.humidity, "humedad");
      const alertaVisibilidad = getAlert(climateAlert.current.vis_km, "visibilidad");
      let iconjson = icon['icon'][is_day][`${is_day}-${climate}`];
      
      

      return (
        <div className="card" style={{ width: '18rem' }}>
          <img src={iconjson} className="card-img-top" alt="Imagen" />
          <div className="card-body">
            <h5 className="card-title">{`${is_day}: ${climateAlert.current.condition.text}`}</h5>
            <p className={`card-title text-${alertaNubosidad}`}><strong>Nubosidad: {climateAlert.current.cloud}%</strong></p>
            <p className={`card-title text-${alertaHumedad}`}><strong>Humedad: {climateAlert.current.humidity}%</strong></p>
            <p className={`card-title text-${alertaVisibilidad}`}><strong>Visibilidad: {climateAlert.current.vis_km} Kilometros</strong></p>
          </div>
        </div>
      );
      break;

    case "calidad-aire":
      return(
        <div className="card" style={{width: '18rem'}}>
            <img src="..." className="card-img-top" alt="calidad-aire"/>
            <div className="card-title">{`${climateAlert.current.air_quality.co}`}

            </div>
        </div>
      );
       break;
    default: break;
  }


}
export default Target;

//{`${is_day}-${climate} ${is_day} ${climateAlert.condition.text}`}/day-Heavy-snow.png