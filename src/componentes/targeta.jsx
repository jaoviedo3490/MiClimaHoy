import { useContext, useState, useEffect } from "react";
import { DataContext } from "../Context/MetricsContext";
import icon from "./dataJson/icon.json";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootswatch/dist/lux/bootstrap.min.css'; // Asegúrate de importar el tema de Bootswatch
import 'bootstrap/dist/js/bootstrap.min.js'; // Cambia esto a bootstrap.min.js
import PopoverComponent from "./Popover";
import Definition from "../componentes/dataJson/climate-definition.json";

const Target = (props) => {
  const { climateAlert, setClimateAlert } = useContext(DataContext);
  const [typeTarget, setTypeTarget] = useState(props.tipo);
  //const [messge,setMessage] = useState('');
  const text_alert = {
    "nubosidad": [{ "success": [0, 25], "info": [26, 50], "warning": [51, 75], "danger": [76, 100] }],
    "humedad": [{ "success": [0, 25], "success": [26, 50], "warning": [51, 75], "danger": [76, 100] }],
    "visibilidad": [{ "success": [11, 50], "info": [6, 10], "warning": [1, 5], "danger": [0, 1] }]
  };

 
const message = (climateAlert.current.temp_c < -40 || climateAlert.current.temp_c > 40) ?  "Peligro extremo: la temperatura es muy peligrosa. Busca refugio en un ambiente más estable y evita salir al exterior." : 
    (climateAlert.current.temp_c >= -40 && climateAlert.current.temp_c <= 15) ? (
        (climateAlert.current.cloud >= 0 && climateAlert.current.cloud <= 25) ? `Cielos despejados con alta visibilidad. Abrígate bien y usa gafas de sol para reducir el deslumbramiento en áreas de nieve o hielo. Lleva ropa térmica.` : 
        (climateAlert.current.cloud > 25 && climateAlert.current.cloud <= 50) ? `Cielos parcialmente nublados. Aunque algo menos frío, usa ropa de invierno. Lleva gorro, bufanda y guantes para mantener el calor.` :
        (climateAlert.current.cloud > 50 && climateAlert.current.cloud <= 75) ? `Nubosidad moderada. Esto ayuda a retener algo de calor ambiental. Usa varias capas y mantente protegido del viento.` :
        (climateAlert.current.cloud > 75 && climateAlert.current.cloud <= 100) ? `Alta cobertura nubosa. El frío puede ser intenso, y podría llover o nevar. Usa ropa impermeable y protégete bien del frío.` :`Definición no encontrada`
    ) : (climateAlert.current.temp_c > 15 && climateAlert.current.temp_c <= 25) ? (
        (climateAlert.current.cloud >= 0 && climateAlert.current.cloud <= 25) ?  `Ambiente despejado. Usa ropa ligera y protector solar si es de día, y mantente hidratado si el aire está seco.` :
        (climateAlert.current.cloud > 25 && climateAlert.current.cloud <= 50) ? `Nubosidad ligera. Puedes optar por ropa cómoda y ligera, y no olvides protegerte del sol durante el día.` :
        (climateAlert.current.cloud > 50 && climateAlert.current.cloud <= 75) ? `Moderada cobertura nubosa. Viste de manera cómoda, y una chaqueta ligera si la temperatura baja en la noche.` : 
        (climateAlert.current.cloud > 75 && climateAlert.current.cloud <= 100) ? `Nubosidad densa. La temperatura se mantendrá estable. Viste de manera cómoda y lleva una capa ligera si fuera necesario.` : `Definición no encontrada`
    ) : (climateAlert.current.temp_c > 25 && climateAlert.current.temp_c <= 40) ? (
        (climateAlert.current.cloud >= 0 && climateAlert.current.cloud <= 25) ? `Cielos despejados con calor intenso. Usa ropa fresca, gorra y protector solar. Lleva agua para mantenerte hidratado.` :
        (climateAlert.current.cloud > 25 && climateAlert.current.cloud <= 50) ?  `Algunas nubes que proporcionan sombra parcial. Usa ropa fresca y mantente hidratado para evitar el agotamiento.` :
        (climateAlert.current.cloud > 50 && climateAlert.current.cloud <= 75) ?  `Moderada cobertura nubosa. Usa ropa ligera, y lleva agua para mantenerte fresco.` : 
        (climateAlert.current.cloud > 75 && climateAlert.current.cloud <= 100) ? `Alta cobertura nubosa. Puede sentirse bochornoso. Usa ropa ligera y fresca, y mantente hidratado.` :`Definición no encontrada`
    ) : "Definición no encontrada";

    const messageHumidity = ( climateAlert.current.temp_c < -40 ||  climateAlert.current.temp_c > 40) ? "Peligro extremo: la temperatura es muy peligrosa. Busca refugio en un ambiente más estable y evita salir al exterior." : 
    (climateAlert.current.temp_c >= -40 && climateAlert.current.temp_c <= 15) ? (
        (climateAlert.current.humidity >= 0 && climateAlert.current.humidity <= 30) ? `Clima frío y seco. Hidrata tu piel y vías respiratorias, y considera un humidificador portátil si estarás mucho tiempo al aire libre.` : 
        (climateAlert.current.humidity > 30 && climateAlert.current.humidity <= 60) ? `Clima frío y con humedad moderada. Lleva abrigo impermeable y asegúrate de mantenerte caliente, especialmente si la humedad causa sensación de frío.` : 
        (climateAlert.current.humidity > 60 && climateAlert.current.humidity <= 100) ? `Clima frío y húmedo. Abrígate bien y lleva una capa adicional resistente al agua, ya que la alta humedad intensifica la sensación de frío.` : `Definición no encontrada`
    ) : (climateAlert.current.temp_c > 15 && climateAlert.current.temp_c <= 25) ? (
        (climateAlert.current.humidity >= 0 && climateAlert.current.humidity <= 30) ? `Clima templado y seco. Lleva agua y mantente hidratado, ya que el aire seco puede resecar tu piel y garganta.` :
        (climateAlert.current.humidity > 30 && climateAlert.current.humidity <= 60) ? `Clima templado con humedad moderada. Es un ambiente cómodo para salir; solo lleva agua si realizarás actividad física.` :
        (climateAlert.current.humidity > 60 && climateAlert.current.humidity <= 100) ? `Clima templado y húmedo. Lleva ropa ligera y transpirable, ya que la alta humedad puede causar sensación de bochorno.` : `Definición no encontrada`
    ) : (climateAlert.current.temp_c > 25 && climateAlert.current.temp_c <= 40) ? (
        (climateAlert.current.humidity >= 0 && climateAlert.current.humidity <= 30) ? `Clima cálido y seco. Lleva agua, protector solar, y viste ropa ligera para evitar deshidratación.` :
        (climateAlert.current.humidity > 30 && climateAlert.current.humidity <= 60) ? `Clima cálido con humedad moderada. Lleva agua y evita la exposición prolongada al sol directo para evitar el agotamiento.` :
        (climateAlert.current.humidity > 60 && climateAlert.current.humidity <= 100) ? `Clima cálido y húmedo. La sensación de calor puede ser sofocante. Viste ropa transpirable, hidrátate bien, y busca sombra siempre que puedas.` : `Definición no encontrada`
    ) : "Definición no encontrada";


    const messageVisibilty = (climateAlert.current.temp_c < -40 || climateAlert.current.temp_c > 40) ? "Peligro extremo: la temperatura es muy peligrosa. Busca refugio en un ambiente más estable y evita salir al exterior." : 
    (climateAlert.current.vis_km >= 0 && climateAlert.current.vis_km <= 1) ? "Visibilidad extremadamente baja. Evita conducir o salir si no es necesario, y usa luces de emergencia si debes moverte." :
    (climateAlert.current.vis_km > 1 && climateAlert.current.vis_km <= 5) ? "Visibilidad reducida. Si sales, toma precauciones al moverte, especialmente al conducir, y usa luces bajas para mejor visibilidad." :
    (climateAlert.current.vis_km > 5 && climateAlert.current.vis_km <= 10) ? "Visibilidad moderada. Es seguro salir, pero mantente alerta en áreas con poca iluminación o en caminos desconocidos." :
    (climateAlert.current.vis_km > 10 && climateAlert.current.vis_km <= 50) ? "Visibilidad clara. Las condiciones son favorables para cualquier actividad al aire libre." :
     "Definicion no encontrada";
    

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
              text={`${Definition["Definition"][climateAlert.current.condition.text]}`}
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
                text={messageHumidity}
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
                text={messageVisibilty}
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
