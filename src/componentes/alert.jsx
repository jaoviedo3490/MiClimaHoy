import { useContext, useState } from "react";
import { DataContext } from "../Context/MetricsContext";
const Alert = (props) => {

    const { climateAlert, setClimateAlert } = useContext(DataContext);
    const [typeAlert, setTypeAlert] = useState(props.tipo);

    const rangos = {
        "Temperatura": [{ 'danger-freeze': [-500, -10], 'warning-freeze': [-9, 0], 'success-freeze': [1, 19], 'success': [20, 29], "success-hot": [30, 34], "warning-hot": [35, 37], "danger-hot": [38, 10000], }],
        "Radiacion UV": [{ 'success': [0, 2], 'info': [3, 5], 'warning': [6, 7] , "danger":[8,100]}],
        "Air-Quality":[{"success":[]}]
    };

    const alertas = {
        "Temperatura": {
            "danger-freeze": { "estilo": "danger", "titulo":"Peligro","Message": `La Temperatura actual es de ${climateAlert.current.temp_c} C°, esta Temperatura es muy peligrosa,  por favor use la vestimenta adecuada ,  NO se exponga al frio exterior , evite movimientos innecesarios para evitar la perdida de calor y busque inmediatamente un lugar con calefacción.` },
            'warning-freeze': { "estilo": "warning", "titulo":"Advertencia" ,"Message": `La Temperatura actual es de ${climateAlert.current.temp_c} C°, se recomienda el uso de calefacción y ropa adecuada para evitar la perdida de calor.` },
            'success-freeze': { "estilo": "info", "titulo":"Importante" ,"Message": `La Temperatura actual es de ${climateAlert.current.temp_c} C°, esta Temperatura es segura para salir, sin embargo se recomienda el uso de ropa adecuada para evitar la perdida de calor.` },
            'success': { "estilo": "success", "titulo":"Importante","Message": `La Temperatura actual es de ${climateAlert.current.temp_c} C°, esta Temperatura es segura para salir.` },
            'success-hot': { "estilo": "info","titulo":"Advertencia", "Message": `La Temperatura actual es de ${climateAlert.current.temp_c} C°, esta Temperatura es segura para salir, sin embargo se recomienda usar ropa ligera y consumir líquidos para evitar la deshidratación.` },
            'warning-hot': { "estilo": "warning","titulo":"Peligro", "Message": `La Temperatura actual es de ${climateAlert.current.temp_c} C°, se recomienda el uso de ropa ligera y evitar los abiertos, el uso de aire acondicionado si es posible o acudir a un área de menor Temperatura, además del consumo continuo de líquidos para evitar la deshidratación.` },
            'danger-hot': { "estilo": "danger","titulo":"Peligro", "Message": `La Temperatura actual es de ${climateAlert.current.temp_c} C°, esta Temperatura es altamente peligrosa, se recomienda acudir inmediatamente a un sitio de menor Temperatura, mantenerse hidratado y evitar realizar movimientos innecesarios.` }
        },
        "Radiacion UV": {
            "success": { "estilo": "success", "titulo":"Importante","Message": `El nivel actual de Radiación UV es ${climateAlert.current.uv}, este nivel de radiación es bajo, es seguro la exposición la misma.` },
            "info": { "estilo": "info", "titulo":"Importante","Message": `El nivel actual de Radiación UV es ${climateAlert.current.uv}, este nivel de radiación es moderado, es seguro la exposición  la misma, sin embargo se recomienda por poco tiempo.` },
            "warning": { "estilo": "warning","titulo":"Advertencia", "Message": `El nivel actual de Radiación UV es ${climateAlert.current.uv}, este nivel de radiación es alto, se recomienda el uso de protector solar para evitar quemaduras en la piel y por poco tiempo.` },
            "danger": { "estilo": "danger","titulo":"Peligro", "Message": `El nivel actual de Radiación UV es ${climateAlert.current.uv}, este nivel de radiación es muy alto, se recomienda evitar la exposición a los rayos del sol, aun con el uso de protector solar.` }
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
        case "Temperatura":
            const nivelAlertaTemp = getAlert(climateAlert.current.temp_c, typeAlert);
            return (
                <div className={`alert alert-dismissible alert-${alertas["Temperatura"][nivelAlertaTemp].estilo}`}>
                    <h4 className="alert-heading">¡{alertas["Temperatura"][nivelAlertaTemp].titulo}!</h4>
                    <p className="mb-0" style={{textAlign:'justify'}}>
                       {alertas["Temperatura"][nivelAlertaTemp].Message}
                    </p>
                </div>
            );
        case "Radiacion UV":
            const nivelAlertaUV = getAlert(climateAlert.current.uv, typeAlert);
            return (
                <div className={`alert alert-dismissible alert-${alertas["Radiacion UV"][nivelAlertaUV].estilo}`}>
                    
                    <h4 className="alert-heading">¡{alertas["Radiacion UV"][nivelAlertaUV].titulo}!</h4>
                    <p className="mb-0" style={{textAlign:'justify'}}>
                       {alertas["Radiacion UV"][nivelAlertaUV].Message}
                    </p>
                </div>
            );
        default:
            break;
    }
    
    
    
}
export default Alert;