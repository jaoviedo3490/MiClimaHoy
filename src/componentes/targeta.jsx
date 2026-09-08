import { useContext, useState, useEffect } from "react";
import { DataContext } from "../Context/MetricsContext";
import icon from "./dataJson/icon.json";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootswatch/dist/lux/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import PopoverComponent from "./Popover";
import Definition from "../componentes/dataJson/climate-definition.json";
import QA_AIR from "../componentes/dataJson/Air-Quality-definition.json";

const Target = (props) => {
  const { climateAlert, setClimateAlert } = useContext(DataContext);
  const [typeTarget, setTypeTarget] = useState(props.tipo);

  const text_alert = {
    "nubosidad": [{ "success": [0, 25], "info": [26, 50], "warning": [51, 75], "danger": [76, 100] }],
    "humedad": [{ "success": [0, 25], "info": [26, 50], "warning": [51, 75], "danger": [76, 100] }],
    "visibilidad": [{ "success": [11, 50], "info": [6, 10], "warning": [1, 5], "danger": [0, 1] }],
    "Air-Quality": [{ "success": [[1, 1], [2, 2]], "info": [3, 3], "warning": [4, 4], "danger": [[5, 5], [6, 6]] }],
    "co": [{ "success": [0, 9], "info": [10, 50], "warning": [51, 100], "danger": [101, 200], "primary": [201, 500] }],
    "no2": [{ "success": [[0, 0.053]], "info": [[0.054, 0.1]], "warning": [[0.101, 0.2]], "danger": [[0.2, 500]] }],
    "so2": [{ "success": [[0, 0.017]], "info": [[0.01701, 0.075]], "warning": [[0.076, 0.5]], "danger": [[0.5, 5]] }]
  };

  const temp_c = climateAlert?.current?.temp_c;

  const message =
    (climateAlert?.current?.temp_c < -40 || climateAlert?.current?.temp_c > 40)
      ? "Peligro extremo: la Temperatura es muy peligrosa. Busca refugio en un ambiente más estable y evita salir al exterior."
      : (climateAlert?.current?.temp_c >= -40 && climateAlert?.current?.temp_c <= 15)
        ? (
          (climateAlert?.current?.cloud >= 0 && climateAlert?.current?.cloud <= 25)
            ? `Cielos despejados con alta visibilidad. Abrígate bien y usa gafas de sol para reducir el deslumbramiento en áreas de nieve o hielo. Lleva ropa térmica.`
            : (climateAlert?.current?.cloud > 25 && climateAlert?.current?.cloud <= 50)
              ? `Cielos parcialmente nublados. Aunque algo menos frío, usa ropa de invierno. Lleva gorro, bufanda y guantes para mantener el calor.`
              : (climateAlert?.current?.cloud > 50 && climateAlert?.current?.cloud <= 75)
                ? `Nubosidad moderada. Esto ayuda a retener algo de calor ambiental. Usa varias capas y mantente protegido del viento.`
                : (climateAlert?.current?.cloud > 75 && climateAlert?.current?.cloud <= 100)
                  ? `Alta cobertura nubosa. El frío puede ser intenso, y podría llover o nevar. Usa ropa impermeable y protégete bien del frío.`
                  : `Definición no encontrada`
        )
        : (climateAlert?.current?.temp_c > 15 && climateAlert?.current?.temp_c <= 25)
          ? (
            (climateAlert?.current?.cloud >= 0 && climateAlert?.current?.cloud <= 25)
              ? `Ambiente despejado. Usa ropa ligera y protector solar si es de día, y mantente hidratado si el aire está seco.`
              : (climateAlert?.current?.cloud > 25 && climateAlert?.current?.cloud <= 50)
                ? `Nubosidad ligera. Puedes optar por ropa cómoda y ligera, y no olvides protegerte del sol durante el día.`
                : (climateAlert?.current?.cloud > 50 && climateAlert?.current?.cloud <= 75)
                  ? `Moderada cobertura nubosa. Viste de manera cómoda, y una chaqueta ligera si la Temperatura baja en la noche.`
                  : (climateAlert?.current?.cloud > 75 && climateAlert?.current?.cloud <= 100)
                    ? `Nubosidad densa. La Temperatura se mantendrá estable. Viste de manera cómoda y lleva una capa ligera si fuera necesario.`
                    : `Definición no encontrada`
          )
          : (climateAlert?.current?.temp_c > 25 && climateAlert?.current?.temp_c <= 40)
            ? (
              (climateAlert?.current?.cloud >= 0 && climateAlert?.current?.cloud <= 25)
                ? `Cielos despejados con calor intenso. Usa ropa fresca, gorra y protector solar. Lleva agua para mantenerte hidratado.`
                : (climateAlert?.current?.cloud > 25 && climateAlert?.current?.cloud <= 50)
                  ? `Algunas nubes que proporcionan sombra parcial. Usa ropa fresca y mantente hidratado para evitar el agotamiento.`
                  : (climateAlert?.current?.cloud > 50 && climateAlert?.current?.cloud <= 75)
                    ? `Moderada cobertura nubosa. Usa ropa ligera, y lleva agua para mantenerte fresco.`
                    : (climateAlert?.current?.cloud > 75 && climateAlert?.current?.cloud <= 100)
                      ? `Alta cobertura nubosa. Puede sentirse bochornoso. Usa ropa ligera y fresca, y mantente hidratado.`
                      : `Definición no encontrada`
            )
            : "Definición no encontrada";

  const messageHumidity =
    (climateAlert?.current?.temp_c < -40 || climateAlert?.current?.temp_c > 40)
      ? "Peligro extremo: la Temperatura es muy peligrosa. Busca refugio..."
      : (climateAlert?.current?.temp_c >= -40 && climateAlert?.current?.temp_c <= 15)
        ? (
          (climateAlert?.current?.humidity >= 0 && climateAlert?.current?.humidity <= 30)
            ? `Clima frío y seco. Hidrata tu piel...`
            : (climateAlert?.current?.humidity > 30 && climateAlert?.current?.humidity <= 60)
              ? `Clima frío y con humedad moderada...`
              : (climateAlert?.current?.humidity > 60 && climateAlert?.current?.humidity <= 100)
                ? `Clima frío y húmedo...`
                : `Definición no encontrada`
        )
        : (climateAlert?.current?.temp_c > 15 && climateAlert?.current?.temp_c <= 25)
          ? (
            (climateAlert?.current?.humidity >= 0 && climateAlert?.current?.humidity <= 30)
              ? `Clima templado y seco...`
              : (climateAlert?.current?.humidity > 30 && climateAlert?.current?.humidity <= 60)
                ? `Clima templado...`
                : (climateAlert?.current?.humidity > 60 && climateAlert?.current?.humidity <= 100)
                  ? `Clima templado y húmedo...`
                  : `Definición no encontrada`
          )
          : (climateAlert?.current?.temp_c > 25 && climateAlert?.current?.temp_c <= 40)
            ? (
              (climateAlert?.current?.humidity >= 0 && climateAlert?.current?.humidity <= 30)
                ? `Clima cálido y seco...`
                : (climateAlert?.current?.humidity > 30 && climateAlert?.current?.humidity <= 60)
                  ? `Clima cálido...`
                  : (climateAlert?.current?.humidity > 60 && climateAlert?.current?.humidity <= 100)
                    ? `Clima cálido y húmedo...`
                    : `Definición no encontrada`
            )
            : "Definición no encontrada";

  const messageVisibilty =
    (climateAlert?.current?.temp_c < -40 || climateAlert?.current?.temp_c > 40)
      ? "Peligro extremo..."
      : (climateAlert?.current?.vis_km >= 0 && climateAlert?.current?.vis_km <= 1)
        ? "Visibilidad extremadamente baja."
        : (climateAlert?.current?.vis_km > 1 && climateAlert?.current?.vis_km <= 5)
          ? "Visibilidad reducida."
          : (climateAlert?.current?.vis_km > 5 && climateAlert?.current?.vis_km <= 10)
            ? "Visibilidad moderada."
            : (climateAlert?.current?.vis_km > 10 && climateAlert?.current?.vis_km <= 50)
              ? "Visibilidad clara."
              : "Definición no encontrada";

  const qualityAir =
    (climateAlert?.current?.air_quality?.['us-epa-index'] == 1) ? "Bueno"
      : (climateAlert?.current?.air_quality?.['us-epa-index'] == 2) ? "Moderado"
        : (climateAlert?.current?.air_quality?.['us-epa-index'] == 3) ? "No saludable para grupos sensibles"
          : (climateAlert?.current?.air_quality?.['us-epa-index'] == 4) ? "Insalubre"
            : (climateAlert?.current?.air_quality?.['us-epa-index'] == 5) ? "Muy Insalubre"
              : (climateAlert?.current?.air_quality?.['us-epa-index'] == 6) ? "Peligroso"
                : "Definición no encontrada";

  const co = ((climateAlert?.current?.air_quality?.co * 24.45) / 28.01) / 1000;
  const no2 = ((climateAlert?.current?.air_quality?.no2 * 24.45) / 46.0055) / 1000;
  const o3 = ((climateAlert?.current?.air_quality?.o3 * 24.45) / 48) / 1000;
  const so2 = ((climateAlert?.current?.air_quality?.so2) * 24.45 / 64.07) / 1000;

  const messageCo = "Monoxido de carbono...";
  const messageNO2 = "Dióxido de nitrógeno...";
  const messageSO2 = "Dióxido de azufre...";

  const getAlert = (value, tipo) => {
    let alertType = "undefined";

    if (text_alert?.[tipo]) {
      const valoresPropiedad = text_alert?.[tipo]?.[0];
      const numValue = parseFloat(value);

      for (const nivel in valoresPropiedad) {
        const valoresNivel = valoresPropiedad[nivel];

        if (Array.isArray(valoresNivel?.[0])) {
          for (const rango of valoresNivel) {
            if (numValue >= rango?.[0] && numValue <= rango?.[1]) {
              return nivel;
            }
          }
        } else {
          if (numValue >= valoresNivel?.[0] && numValue <= valoresNivel?.[1]) {
            return nivel;
          }
        }
      }
    }

    return alertType;
  };

  switch (typeTarget) {
    case "pronostico":
      let climate = climateAlert?.current?.condition?.text;
      climate = climate?.replaceAll(" ", "-");

      const is_day = (climateAlert?.current?.is_day === 0) ? "nigth" : "day";
      const alertaNubosidad = getAlert(climateAlert?.current?.cloud, "nubosidad");
      const alertaHumedad = getAlert(climateAlert?.current?.humidity, "humedad");
      const alertaVisibilidad = getAlert(climateAlert?.current?.vis_km, "visibilidad");

      let iconjson = icon?.['icon']?.[is_day]?.[`${is_day}-${climate}`];

      return (
        <div className="card" style={{ width: '18rem' }}>
          <img src={`${iconjson}`} className="card-img-top" alt="Imagen" />
          <div className="card-body">

            <PopoverComponent
              alert="info"
              header="!IMPORTANTE¡"
              text={`${Definition?.Definition?.[climateAlert?.current?.condition?.text]}`}
              tipo={
                <h5 className="card-title">
                  {`${is_day}: ${climateAlert?.current?.condition?.text}`}
                </h5>
              }
            />

            <PopoverComponent
              alert={alertaNubosidad}
              header="!IMPORTANTE¡"
              text={message}
              tipo={
                <p className={`card-title text-${alertaNubosidad}`}>
                  Nubosidad: {climateAlert?.current?.cloud}%
                </p>
              }
            />

            <PopoverComponent
              alert={alertaHumedad}
              header="!IMPORTANTE¡"
              text={messageHumidity}
              tipo={
                <p className={`card-title text-${alertaHumedad}`}>
                  Humedad Relativa: {climateAlert?.current?.humidity}%
                </p>
              }
            />

            <PopoverComponent
              alert={alertaVisibilidad}
              header="!IMPORTANTE¡"
              text={messageVisibilty}
              tipo={
                <p className={`card-title text-${alertaVisibilidad}`}>
                  Visibilidad: {climateAlert?.current?.vis_km} Kilometros
                </p>
              }
            />

          </div>
        </div>
      );

    case "calidad-aire":
      let iconQAir = icon?.['icon']?.['Air-Quality']?.[climateAlert?.current?.air_quality?.['us-epa-index']];
      const alertQAir = getAlert(climateAlert?.current?.air_quality?.['us-epa-index'], "Air-Quality");
      const alertCO = getAlert(co, "co");
      const alertNO2 = getAlert(no2, "no2");
      const alertSO2 = getAlert(so2, "so2");

      return (
        <div className="card" style={{ width: '18rem' }}>
          <img src={iconQAir} className="card-img-top" alt="calidad-aire" />
          <div className="card-title">
            <div className="card-body">

              <PopoverComponent
                alert={alertQAir}
                header="!IMPORTANTE¡"
                text={QA_AIR?.Definition?.[climateAlert?.current?.air_quality?.['us-epa-index']]}
                tipo={
                  <h5>Calidad del Aire: {qualityAir}</h5>
                }
              />

              <PopoverComponent
                alert={alertCO}
                header="!IMPORTANTE¡"
                text={messageCo}
                tipo={
                  <p>Mono-Carbono: {parseFloat(co)?.toFixed(2)} ppm</p>
                }
              />

              <PopoverComponent
                alert={alertNO2}
                header="!IMPORTANTE¡"
                text={messageNO2}
                tipo={
                  <p>Dio-Nitrógeno: {parseFloat(no2)?.toFixed(2)} ppm</p>
                }
              />

              <PopoverComponent
                alert={alertSO2}
                header="!IMPORTANTE¡"
                text={messageSO2}
                tipo={
                  <p>Dio-Azufre: {parseFloat(so2)?.toFixed(4)} ppm</p>
                }
              />

            </div>
          </div>
        </div>
      );

    default:
      return null;
  }
};

export default Target;