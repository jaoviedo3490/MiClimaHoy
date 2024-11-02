import { useContext, useState } from "react";
import { DataContext } from "../Context/MetricsContext";
const Target = () => {

  const data = {
    "day": {
      "day-sunny": "/day-sunny.png", "day-Light-rain-shower": "/day-light-rain.png",
      "day-Freezing-fog": "/day-Freezing-fog.png", "day-Overcast": "/day-Overcast.png",
      "day-Heavy-snow":"/day-Heavy-snow.png","day-Partly-cloudy":"/day-Partly-Cloudy.png"
    },
    "nigth": {
      "nigth-Clear": "/nigth-clear.png", "nigth-Patchy-rain-nearby": "/nigth-Patchy-rain-nearby.png",
      "nigth-Light-rain-shower": "Light-rain-shower.png", "nigth-Partly-cloudy": "/nigth-Partly-Cloudy.png",
      "nigth-Overcast": "/nigth-Overcast.png", "nigth-Mist": "/nigth-Mist.png",
      "nigth-Patchy-light-drizzle":"/nigth-Patchy-light-drizzle.png"
    }
  }
  const text_alert = {
    "nubosidad":[{"success":[0,25],"info":[26,50],"warning":[51,75],"danger":[76,100]}],
    "humedad":[{"success":[0,25],"info":[26,50],"warning":[51,75],"danger":[76,100]}],
    "visibilidad":[{"success":[11,50],"info":[6,10],"warning":[1,5],"danger":[0,1]}]
  }

  const getAlert = (value, tipo) => {
    let alertType = 0;

    for (const propiedad in text_alert) {
     
        const valoresPropiedad = text_alert[propiedad][0];
        //alert("este es el nivel: "+valoresPropiedad)
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


  const { climateAlert, setClimateAlert } = useContext(DataContext);
  const is_day = (climateAlert.is_day === 0) ? "nigth" : "day";
  const alertaNubosidad = getAlert(climateAlert.cloud,"nubosidad");
  const alertaHumedad = getAlert(climateAlert.humidity,"humedad");
  const alertaVisibilidad = getAlert(climateAlert.vis_km,"visibilidad")
  let climate = climateAlert.condition.text;
  climate = climate.replaceAll(" ", "-");

  let icon = data[is_day][`${is_day}-${climate}`]
  return (
    <div className="card" style={{ width: '18rem' }}>
      <img src={icon} className="card-img-top" alt="Imagen" />
      <div className="card-body">
        <h5 className="card-title">{`${is_day}: ${climateAlert.condition.text}`}</h5>
        <p className={`card-title text-${alertaNubosidad}`}><strong>Porcentaje de Nubosidad: {climateAlert.cloud}%</strong></p>
        <p className={`card-title text-${alertaHumedad}`}><strong>Porcentaje de humedad: {climateAlert.humidity}%</strong></p>
        <p className={`card-title text-${alertaVisibilidad}`}><strong>Visibilidad: {climateAlert.vis_km} Kilometros</strong></p>
      </div>
    </div>
  );
}
export default Target;

//{`${is_day}-${climate} ${is_day} ${climateAlert.condition.text}`}/day-Heavy-snow.png