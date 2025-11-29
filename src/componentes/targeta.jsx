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


  const temp_c = climateAlert.current.temp_c;

  const message = (climateAlert.current.temp_c < -40 || climateAlert.current.temp_c > 40) ? "Peligro extremo: la Temperatura es muy peligrosa. Busca refugio en un ambiente más estable y evita salir al exterior." :
    (climateAlert.current.temp_c >= -40 && climateAlert.current.temp_c <= 15) ? (
      (climateAlert.current.cloud >= 0 && climateAlert.current.cloud <= 25) ? `Cielos despejados con alta visibilidad. Abrígate bien y usa gafas de sol para reducir el deslumbramiento en áreas de nieve o hielo. Lleva ropa térmica.` :
        (climateAlert.current.cloud > 25 && climateAlert.current.cloud <= 50) ? `Cielos parcialmente nublados. Aunque algo menos frío, usa ropa de invierno. Lleva gorro, bufanda y guantes para mantener el calor.` :
          (climateAlert.current.cloud > 50 && climateAlert.current.cloud <= 75) ? `Nubosidad moderada. Esto ayuda a retener algo de calor ambiental. Usa varias capas y mantente protegido del viento.` :
            (climateAlert.current.cloud > 75 && climateAlert.current.cloud <= 100) ? `Alta cobertura nubosa. El frío puede ser intenso, y podría llover o nevar. Usa ropa impermeable y protégete bien del frío.` : `Definición no encontrada`
    ) : (climateAlert.current.temp_c > 15 && climateAlert.current.temp_c <= 25) ? (
      (climateAlert.current.cloud >= 0 && climateAlert.current.cloud <= 25) ? `Ambiente despejado. Usa ropa ligera y protector solar si es de día, y mantente hidratado si el aire está seco.` :
        (climateAlert.current.cloud > 25 && climateAlert.current.cloud <= 50) ? `Nubosidad ligera. Puedes optar por ropa cómoda y ligera, y no olvides protegerte del sol durante el día.` :
          (climateAlert.current.cloud > 50 && climateAlert.current.cloud <= 75) ? `Moderada cobertura nubosa. Viste de manera cómoda, y una chaqueta ligera si la Temperatura baja en la noche.` :
            (climateAlert.current.cloud > 75 && climateAlert.current.cloud <= 100) ? `Nubosidad densa. La Temperatura se mantendrá estable. Viste de manera cómoda y lleva una capa ligera si fuera necesario.` : `Definición no encontrada`
    ) : (climateAlert.current.temp_c > 25 && climateAlert.current.temp_c <= 40) ? (
      (climateAlert.current.cloud >= 0 && climateAlert.current.cloud <= 25) ? `Cielos despejados con calor intenso. Usa ropa fresca, gorra y protector solar. Lleva agua para mantenerte hidratado.` :
        (climateAlert.current.cloud > 25 && climateAlert.current.cloud <= 50) ? `Algunas nubes que proporcionan sombra parcial. Usa ropa fresca y mantente hidratado para evitar el agotamiento.` :
          (climateAlert.current.cloud > 50 && climateAlert.current.cloud <= 75) ? `Moderada cobertura nubosa. Usa ropa ligera, y lleva agua para mantenerte fresco.` :
            (climateAlert.current.cloud > 75 && climateAlert.current.cloud <= 100) ? `Alta cobertura nubosa. Puede sentirse bochornoso. Usa ropa ligera y fresca, y mantente hidratado.` : `Definición no encontrada`
    ) : "Definición no encontrada";

  const messageHumidity = (climateAlert.current.temp_c < -40 || climateAlert.current.temp_c > 40) ? "Peligro extremo: la Temperatura es muy peligrosa. Busca refugio en un ambiente más estable y evita salir al exterior." :
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


  const messageVisibilty = (climateAlert.current.temp_c < -40 || climateAlert.current.temp_c > 40) ? "Peligro extremo: la Temperatura es muy peligrosa. Busca refugio en un ambiente más estable y evita salir al exterior." :
    (climateAlert.current.vis_km >= 0 && climateAlert.current.vis_km <= 1) ? "Visibilidad extremadamente baja. Evita conducir o salir si no es necesario, y usa luces de emergencia si debes moverte." :
      (climateAlert.current.vis_km > 1 && climateAlert.current.vis_km <= 5) ? "Visibilidad reducida. Si sales, toma precauciones al moverte, especialmente al conducir, y usa luces bajas para mejor visibilidad." :
        (climateAlert.current.vis_km > 5 && climateAlert.current.vis_km <= 10) ? "Visibilidad moderada. Es seguro salir, pero mantente alerta en áreas con poca iluminación o en caminos desconocidos." :
          (climateAlert.current.vis_km > 10 && climateAlert.current.vis_km <= 50) ? "Visibilidad clara. Las condiciones son favorables para cualquier actividad al aire libre." :
            "Definicion no encontrada";

  const qualityAir = (climateAlert.current.air_quality['us-epa-index'] == 1) ? "Bueno" :
    (climateAlert.current.air_quality['us-epa-index'] == 2) ? "Moderado" :
      (climateAlert.current.air_quality['us-epa-index'] == 3) ? "No saludable para grupos sensibles" :
        (climateAlert.current.air_quality['us-epa-index'] == 4) ? "Insalubre" :
          (climateAlert.current.air_quality['us-epa-index'] == 5) ? "Muy Insalubre" :
            (climateAlert.current.air_quality['us-epa-index'] == 6) ? "Peligroso" : "Definicion no encontrada"


  const co = ((climateAlert.current.air_quality.co * 24.45) / 28.01) / 1000;
  const no2 = ((climateAlert.current.air_quality.no2 * 24.45) / 46.0055) / 1000;
  const o3 = ((climateAlert.current.air_quality.o3 * 24.45) / 48) / 1000;
  const so2 = ((climateAlert.current.air_quality.so2) * 24.45 / 64.07) / 1000;

  const messageCo = (co >= 0 && co <= 9) ? "Monoxido de carbono: Nivel seguro (0 - 9 ppm : partes por millon). No se esperan efectos adversos en la salud, No se requieren medidas de precaución." :
    (co > 9 && co <= 50) ? "Monoxido de carbono: Moderado ( Mayor a 10 - 50 ppm : partes por millon). Puede causar leves dolores de cabeza y mareos tras una exposición prolongada. Limita actividades físicas intensas al aire libre si eres sensible al CO. Personas con condiciones respiratorias preexistentes deben tener precaución." :
      (co > 50 && co <= 100) ? "Monoxido de carbono: Nivel Peligroso (mayor a 50 - 100 ppm : partes por millon). Dolores de cabeza más intensos, mareos y náuseas después de 1-2 horas de exposición. Se recomienda evacuar el área afectada, Identificar y corregir fuentes de emisión de CO. Considerar el uso de detectores de CO en áreas propensas a acumulaciones." :
        (co > 100 && co <= 200) ? "Monoxido de carbono: Nivel altamente peligroso (mayor a 100 - 200 ppm : partes por millon). Pérdida de coordinación, confusión y posible desmayo tras exposiciones prolongadas. Evacuar el area afectada evitando al maximo la exposición. Buscar atención médica si se presentan síntomas. Implementar medidas para eliminar fuentes de CO y mejorar la ventilación." :
          (co > 200) ? "Niveles de monoxido extremos se presenta riesgo de daño cerebral, coma y muerte con exposiciones prolongadas. Evacuación inmediata del área, buscar atención médica urgente para los afectados. Identificar y eliminar de inmediato las fuentes de CO." : "Definción no encontrada";

  const messageNO2 =
    (no2 >= 0 && no2 <= 0.053) ?
      "Dióxido de nitrógeno: Nivel bueno (0 - 0.053 ppm). Calidad de aire óptima. No se esperan efectos adversos para la población general." :
      (no2 > 0.053 && no2 <= 0.1) ?
        "Dióxido de nitrógeno: Nivel moderado (0.054 - 0.1 ppm). Puede causar irritación leve en ojos y vías respiratorias en personas sensibles. Se recomienda reducir actividad física intensa si hay molestias." :
        (no2 > 0.1 && no2 <= 0.2) ?
          "Dióxido de nitrógeno: Nivel malo (0.101 - 0.2 ppm). Puede generar tos, irritación respiratoria, afecta especialmente a personas con asma o enfermedades pulmonares. Limitar actividades al aire libre. Grupos vulnerables deben permanecer en interiores." :
          (no2 > 0.2 && no2 <= 0.5) ?
            "Dióxido de nitrógeno: Nivel muy malo (0.201 - 0.5 ppm). Riesgo elevado de inflamación de vías respiratorias, agravamiento de enfermedades pulmonares y síntomas asmáticos severos. Evitar exposición prolongada. Permanecer en interiores y usar filtros de aire." :
            (no2 > 0.5) ?
              "Dióxido de nitrógeno: Nivel peligroso (>0.5 ppm). Exposición muy peligrosa, posible daño pulmonar severo con exposición prolongada. Evitar completamente el área afectada, usar protección respiratoria y buscar atención médica si hay síntomas graves." :
              "Definición no encontrada";


  const messageSO2 =
    (so2 >= 0 && so2 <= 0.017) ?
      "Dióxido de azufre: Nivel bueno (0 - 0.017 ppm). Calidad de aire segura, sin riesgos para la población general. No se requieren precauciones." :
      (so2 > 0.017 && so2 <= 0.075) ?
        "Dióxido de azufre: Nivel moderado (0.017 - 0.075 ppm). Puede causar irritación leve de las vías respiratorias en personas sensibles (niños, ancianos, asmáticos). Evitar esfuerzos físicos intensos al aire libre si hay molestias." :
        (so2 > 0.075 && so2 <= 0.5) ?
          "Dióxido de azufre: Nivel malo (0.076 - 0.5 ppm). Aumenta riesgo de tos, ardor nasal, dificultad para respirar, especialmente en población vulnerable. Reducir actividades al aire libre y permanecer en interiores cuando sea posible." :
          (so2 > 0.5 && so2 <= 5) ?
            "Dióxido de azufre: Nivel muy malo (0.5 - 5 ppm). Exposición potencialmente peligrosa: inflamación de vías respiratorias, broncoespasmo, irritación ocular severa. Evitar completamente la exposición prolongada. Permanecer en interiores con filtros de aire y cerrar ventanas." :
            (so2 > 5) ?
              "Dióxido de azufre: Nivel extremadamente peligroso (>5 ppm). Riesgo severo de daño pulmonar agudo y edema pulmonar. Evacuar la zona inmediatamente, usar protección respiratoria autónoma y activar protocolos de emergencia." :
              "Definición no encontrada";


  const getAlert = (value, tipo) => {
    let alertType = "undefined";

    if (text_alert[tipo]) {
      const valoresPropiedad = text_alert[tipo][0];
      const numValue = parseFloat(value);

      for (const nivel in valoresPropiedad) {
        const valoresNivel = valoresPropiedad[nivel];


        if (Array.isArray(valoresNivel[0])) {
          for (const rango of valoresNivel) {
            if (numValue >= rango[0] && numValue <= rango[1]) {
              alertType = nivel;
              return alertType;
            }
          }
        }

        else {
          if (numValue >= valoresNivel[0] && numValue <= valoresNivel[1]) {
            alertType = nivel;
            return alertType;
          }
        }
      }
    }
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

     // console.log(`${is_day}-${climate}`);


      return (
        <div className="card" style={{ width: '18rem' }}>
          <img src={`${iconjson}`} className="card-img-top" alt="Imagen" />
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
      let iconQAir = icon['icon']['Air-Quality'][climateAlert.current.air_quality['us-epa-index']];
      const alertQAir = getAlert(climateAlert.current.air_quality['us-epa-index'], "Air-Quality");
      const alertCO = getAlert(co, "co");
      const alertNO2 = getAlert(no2, "no2");
      const alertSO2 = getAlert(so2, "so2");
      return (
        <div className="card" style={{ width: '18rem' }}>
          <img src={iconQAir} className="card-img-top" alt="calidad-aire" />
          <div className="card-title">
            <div className="card-body">
              <strong>
                <PopoverComponent
                  alert={alertQAir}
                  header="!IMPORTANTE¡"
                  text={QA_AIR['Definition'][climateAlert.current.air_quality['us-epa-index']]}
                  tipo={
                    <h5 className={`card-title`} style={{ cursor: 'pointer', textDecoration: 'none' }}>
                      Calidad del Aire: {qualityAir}
                    </h5>
                  }
                >
                </PopoverComponent>
              </strong>
              <PopoverComponent
                alert={alertCO}
                header="!IMPORTANTE¡"
                text={messageCo}
                tipo={
                  <p className={`card-title text-${alertCO}`} style={{ cursor: 'pointer', textDecoration: 'none' }}>
                    Mono-Carbono: {`${(parseFloat(co)).toFixed(2)}`} ppm
                  </p>
                }></PopoverComponent>
              <PopoverComponent
                alert={alertNO2}
                header="!IMPORTANTE¡"
                text={messageNO2}
                tipo={
                  <p className={`card-title text-${alertNO2}`} style={{ cursor: 'pointer', textDecoration: 'none' }}>
                    Dio-Nitrógeno: {`${(parseFloat(no2)).toFixed(2)}`} ppm
                  </p>
                }></PopoverComponent>
              <PopoverComponent
                alert={alertSO2}
                header="!IMPORTANTE¡"
                text={messageSO2}
                tipo={
                  <p className={`card-title text-${alertSO2}`} style={{ cursor: 'pointer', textDecoration: 'none' }}>
                    Dio-Azufre: {`${parseFloat(so2).toFixed(4)}`} ppm
                  </p>
                }></PopoverComponent>
            </div>
          </div>
        </div>
      );

    default:
      return null;
  }
};

export default Target;