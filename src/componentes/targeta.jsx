import { useContext, useState, useEffect } from "react";
import { DataContext } from "../Context/MetricsContext";
import icon from "./dataJson/icon.json";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootswatch/dist/lux/bootstrap.min.css'; // Asegúrate de importar el tema de Bootswatch
import 'bootstrap/dist/js/bootstrap.min.js'; // Cambia esto a bootstrap.min.js
import PopoverComponent from "./Popover";

const Target = (props) => {
  const { climateAlert, setClimateAlert } = useContext(DataContext);
  const [typeTarget, setTypeTarget] = useState(props.tipo);
  const [messge,setMessage] = useState('');
  const text_alert = {
    "nubosidad": [{ "success": [0, 25], "info": [26, 50], "warning": [51, 75], "danger": [76, 100] }],
    "humedad": [{ "success": [0, 25], "success": [26, 50], "warning": [51, 75], "danger": [76, 100] }],
    "visibilidad": [{ "success": [11, 50], "info": [6, 10], "warning": [1, 5], "danger": [0, 1] }]
  };

 
  const message = ( climateAlert.current.temp_c < -40 ||  climateAlert.current.temp_c > 40) ? "Peligro extremo: la temperatura es muy peligrosa. Busca refugio en un ambiente más estable." : (
    climateAlert.current.temp_c >= -40 && climateAlert.current.temp_c <=15) ? (
    (climateAlert.current.cloud >= 0 && climateAlert.current.cloud <= 25) ? `Cielos despejados con alta visibilidad. La exposición a las condiciones frías es intensa, y puede haber deslumbramiento en áreas de nieve o hielo.` : 
    (climateAlert.current.cloud > 25 && climateAlert.current.cloud <= 50) ? `Cielos parcialmente nublados, reduciendo un poco la exposición directa al frío intenso. Esto puede hacer el ambiente algo más llevadero.` :
    (climateAlert.current.cloud > 50 && climateAlert.current.cloud <= 75) ? `Nubosidad moderada, lo que contribuye a retener algo de calor ambiental, especialmente durante la noche.` :
    (climateAlert.current.cloud > 75 && climateAlert.current.cloud <= 100) ? `Alta cobertura nubosa. Las condiciones pueden ser aún más frías debido a la falta de radiación solar, con posibles precipitaciones de nieve o lluvia.` :`Definición no encontrada`
) : (climateAlert.current.temp_c > 15 && climateAlert.current.temp_c <= 25) ? (
    (climateAlert.current.cloud >= 0 && climateAlert.current.cloud <= 25) ? `Ambiente despejado con luz intensa en el día o visibilidad clara en la noche. En condiciones de baja humedad, es posible que se sienta el aire seco.` :
    (climateAlert.current.cloud > 25 && climateAlert.current.cloud <= 50) ? `Nubosidad ligera, proporcionando algo de sombra durante el día y una atmósfera moderada durante la noche.` :
    (climateAlert.current.cloud > 50 && climateAlert.current.cloud <= 75) ? `Moderada cobertura nubosa, suavizando la luz y el calor en el día, mientras mantiene una temperatura estable en la noche.` : 
    (climateAlert.current.cloud > 75 && climateAlert.current.cloud <= 100) ? `Nubosidad densa, proporcionando una temperatura más estable y reduciendo las fluctuaciones tanto en el día como en la noche.` : `Definición no encontrada`
) : (climateAlert.current.temp_c > 25 && climateAlert.current.temp_c <= 40) ? (
    (climateAlert.current.cloud >= 0 && climateAlert.current.cloud <= 25) ? `Cielos despejados con calor intenso. La exposición directa puede ser agotadora; la baja humedad intensifica la sequedad del ambiente.` :
    (climateAlert.current.cloud > 25 && climateAlert.current.cloud <= 50) ? `Algunas nubes que proporcionan sombra parcial, disminuyendo ligeramente la exposición directa al calor.` :
    (climateAlert.current.cloud > 50 && climateAlert.current.cloud <= 75) ? `Moderada cobertura nubosa, lo que reduce la exposición al calor y puede hacer el ambiente más llevadero.` : 
    (climateAlert.current.cloud > 75 && climateAlert.current.cloud <= 100) ? `Alta cobertura nubosa, lo que puede resultar en una sensación bochornosa si la humedad es alta, o moderar el calor si es baja.` :`Definición no encontrada`
) : "Definición no encontrada";

    

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
  };



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
            <PopoverComponent
              alert="info"
              header="!IMPORTANTE¡"
              text={`${is_day}: ${climateAlert.current.condition.text}`}
              tipo={<h5 className="card-title" style={{ cursor: 'pointer', textDecoration: 'none' }}>
                {`${is_day}: ${climateAlert.current.condition.text}`}
              </h5>}
            />
            <strong>
              <PopoverComponent
                alert={alertaNubosidad}
                header="!IMPORTANTE¡"
                text={message}
                tipo={
                  <p className={`card-title text-${alertaNubosidad}`} style={{ cursor: 'pointer', textDecoration: 'none' }}>
                    Nubosidad: {climateAlert.current.cloud}%
                  </p>
                }
              />
            </strong>
            <strong>
              <PopoverComponent
                alert={alertaHumedad}
                header="!IMPORTANTE¡"
                text={"message"}
                tipo={
                  <p className={`card-title text-${alertaHumedad}`} style={{ cursor: 'pointer', textDecoration: 'none' }}>
                    Humedad Relativa: {climateAlert.current.humidity}%
                  </p>
                }
              />
            </strong>
            <strong>
              <PopoverComponent
                alert={alertaVisibilidad}
                header="!IMPORTANTE¡"
                text={"message"}
                tipo={
                  <p className={`card-title text-${alertaVisibilidad}`} style={{ cursor: 'pointer', textDecoration: 'none' }}>
                    Visibilidad: {climateAlert.current.vis_km} Kilometros
                  </p>
                }
              />
            </strong>

          </div>
        </div>
      );

    case "calidad-aire":
      return (
        <div className="card" style={{ width: '18rem' }}>
          <img src="..." className="card-img-top" alt="calidad-aire" />
          <div className="card-title">
            <p>Monóxido de Carbono: {`${climateAlert.current.air_quality.co}`} µg/m³</p>
            <p>Dióxido de Nitrógeno: {`${climateAlert.current.air_quality.no2}`} ppm</p>
          </div>
        </div>
      );

    default:
      return null; 
  }
};

export default Target;
