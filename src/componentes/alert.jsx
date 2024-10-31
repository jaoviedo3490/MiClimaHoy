import { useContext, useState } from "react";
import { DataContext } from "../Context/MetricsContext";
const Alert = (props) => {

    const { climateAlert, setClimateAlert } = useContext(DataContext);
    const [typeAlert, setTypeAlert] = useState(props.tipo);

    const rangos = {
        "temperatura": [{ 'danger-freeze': [-100, -10], 'warning-freeze': [-9, 0], 'success-freeze': [1, 19], 'success': [20, 30], "success-hot": [31, 35], "warning-hot": [36, 39], "danger-hot": [40, 10000], }],
        "rayos uv": [{ 'success': [0, 2], 'info': [3, 5], 'warning': [6, 7] , "danger":[8,10],"extremely high":[11,100]}]
    };

    const alertas = {
        "temperatura": {
            "danger-freeze": { "estilo": "danger", "Message": `La temperatura actual es de ${climateAlert.temp_c} , esta temperatura es altamente peligrosa, por favor use la vestimenta adecuada, evite movimientos innecesarios para evitar la perdida de calor y busque inmediatamente un lugar con calefacción.` },
            'warning-freeze': { "estilo": "warning", "Message": `La temperatura actual es de ${climateAlert.temp_c} , se recomienda el uso de calefacción y ropa adecuada para evitar la perdida de calor.` },
            'success-freeze': { "estilo": "info", "Message": `La temperatura actual es de ${climateAlert.temp_c} , esta temperatura es segura para salir, sin embargo se recomienda el uso de ropa adecuada para evitar la perdida de calor.` },
            'success': { "estilo": "success", "Message": `La temperatura actual es de ${climateAlert.temp_c} , esta temperatura es segura para salir.` },
            'success-hot': { "estilo": "info", "Message": `La temperatura actual es de ${climateAlert.temp_c} , esta temperatura es segura para salir, sin embargo se recomienda usar ropa ligera y consumir líquidos para evitar la deshidratación.` },
            'warning-hot': { "estilo": "warning", "Message": `La temperatura actual es de ${climateAlert.temp_c} , se recomienda el uso de ropa ligera y evitar los abiertos, el uso de aire acondicionado si es posible o acudir a un área de menor temperatura, además del consumo continuo de líquidos para evitar la deshidratación.` },
            'danger-hot': { "estilo": "danger", "Message": `La temperatura actual es de ${climateAlert.temp_c} grados, esta temperatura es altamente peligrosa, se recomienda acudir inmediatamente a un sitio de menor temperatura, mantenerse hidratado y evitar realizar movimientos innecesarios.` }
        },
        "rayos uv": {
            "success": { "estilo": "success", "Message": `El nivel actual de Radiación UV es ${climateAlert.uv}, este nivel de radiación es bajo, es seguro la exposición al sol.` },
            "info": { "estilo": "info", "Message": `El nivel actual de Radiación UV es ${climateAlert.uv}, este nivel de radiación es moderado, es seguro la exposición al sol, sin embargo se recomienda por poco tiempo.` },
            "warning": { "estilo": "warning", "Message": `El nivel actual de Radiación UV es ${climateAlert.uv}, este nivel de radiación es alto, se recomienda el uso de protector solar para evitar quemaduras en la piel y por poco tiempo.` },
            "danger": { "estilo": "danger", "Message": `El nivel actual de Radiación UV es ${climateAlert.uv}, este nivel de radiación es muy alto, se recomienda evitar la exposición a los rayos del sol, aun con el uso de protector solar.` }
        }
    }
    
    const getAlert = (value, tipo) => {
        let alertType = 0;
    
        for (const propiedad in rangos) {
            const valoresPropiedad = rangos[propiedad][0];
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
    
    switch (typeAlert) {
        case "temperatura":
            const nivelAlertaTemp = getAlert(climateAlert.temp_c, typeAlert);
            return (
                <div className={`alert alert-dismissible alert-${alertas["temperatura"][nivelAlertaTemp].estilo}`}>
                    <button type="button" className="btn-close" data-bs-dismiss="alert"></button>
                    <h4 className="alert-heading">¡Importante!</h4>
                    <p className="mb-0">
                        <a href="#" className="alert-link">{alertas["temperatura"][nivelAlertaTemp].Message}</a>.
                    </p>
                </div>
            );
        case "rayos uv":
            const nivelAlertaUV = getAlert(climateAlert.uv, typeAlert);
            return (
                <div className={`alert alert-dismissible alert-${alertas["rayos uv"][nivelAlertaUV].estilo}`}>
                    <button type="button" className="btn-close" data-bs-dismiss="alert"></button>
                    <h4 className="alert-heading">¡Importante!</h4>
                    <p className="mb-0">
                        <a href="#" className="alert-link">{alertas["rayos uv"][nivelAlertaUV].Message}</a>.
                    </p>
                </div>
            );
        default:
            break;
    }
    
    
    
}
export default Alert;


