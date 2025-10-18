import IndicatorGraph from "./Graphics/Indicator";
import { useState, useContext, useEffect } from "react";
import { DataContext } from "../../Context/MetricsContext";
const Engine = (props) => {
    const [typeAlert] = useState(props.type); //Recibe el tipo de alerta del componente padre
    const { Alerts, setAlerts } = useContext(DataContext); //Arreglo que guardara las alertas de las distintas metricas
    const { Warnings, setWarnings } = useContext(DataContext); //Arreglo que guardara las advertencias de las distintas metricas
    const [nivelAlertaTemp, setNivelAlertaTemp] = useState([]); //variable que guarda el nivel de alerta , el cual determina que arreglo toma de las las alertas para la temperatura
    const [nivelAlertaUV, setNivelAlertaUV] = useState([]);//variable que guarda el nivel de alerta , el cual determina que arreglo toma de las las alertas para la radiacion
    const [Component, setComponent] = useState(null);//Genera el componente de IndicatorGraph , el cual muestra el valor de la temperatura y radiacion mediante un grafico Gauge

    //Estos son los rangos iniciales de los valores que generaran los alertamientos , se dividen en las distintas metricas evaluadas
    const rangos = {
        "Temperatura": [{ 'danger-freeze': [-500, -10], 'warning-freeze': [-9, 0], 'success-freeze': [1, 19], 'success': [20, 29], "warning-hot": [30, 34], "danger-hot": [35, 37], "xtreme-hot": [38, 10000], }],
        "Radiacion UV": [{ 'success': [0, 2], 'info': [3, 5], 'warning': [6, 7], "danger": [8, 10], 'xtreme': [10, 100] }],
        "Nubosidad": [{ "success": [0, 25], "info": [26, 50], "warning": [51, 75], "danger": [76, 100] }],
        "Humedad": [{ "success": [0, 25], "info": [26, 50], "warning": [51, 75], "danger": [76, 100] }],
        "Visibilidad": [{ "success": [11, 50], "info": [6, 10], "warning": [1, 5], "danger": [0, 1] }],
        "Air-Quality": [{ "success": [[1, 1], [2, 2]], "info": [3, 3], "warning": [4, 4], "danger": [[5, 5], [6, 6]] }],
        "co": [{ "success": [0, 9], "info": [10, 50], "warning": [51, 100], "danger": [101, 200], "primary": [201, 500] }],
        "no2": [{ "success": [[0, 0.053]], "info": [[0.054, 0.1]], "warning": [[0.101, 0.2]], "danger": [[0.2, 500]] }],
        "so2": [{ "success": [[0, 0.017]], "info": [[0.01701, 0.075]], "warning": [[0.076, 0.5]], "danger": [[0.5, 5]] }]
    };

    //Estas son las alertas que se generaran para cada metrica teniendo en cuenta los rangos anteriores
    const alertas = {
        "Temperatura": {
            "danger-freeze": { "color": "#c53f3fff", "titulo": "Peligro", "Message": `La Temperatura actual es de ${props.data} C°, esta Temperatura es muy peligrosa,  por favor use la vestimenta adecuada ,  NO se exponga al frio exterior , evite movimientos innecesarios para evitar la perdida de calor y busque inmediatamente un lugar con calefacción.` },
            'warning-freeze': { "color": "#FF9800", "titulo": "Advertencia", "Message": `La Temperatura actual es de ${props.data} C°, se recomienda el uso de calefacción y ropa adecuada para evitar la perdida de calor.` },
            'success-freeze': { "color": "#4fd6ffff", "titulo": "Importante", "Message": `La Temperatura actual es de ${props.data} C°, esta Temperatura es segura para salir, sin embargo se recomienda el uso de ropa adecuada para evitar la perdida de calor.` },
            'success': { "color": "#3fc555ff", "titulo": "Importante", "Message": `La Temperatura actual es de ${props.data} C°, esta Temperatura es segura para salir.` },
            'warning-hot': { "color": "#3fa6c5ff", "titulo": "Advertencia", "Message": `La Temperatura actual es de ${props.data} C°, esta Temperatura es segura para salir, sin embargo se recomienda usar ropa ligera y consumir líquidos para evitar la deshidratación.` },
            'danger-hot': { "color": "#FF9800", "titulo": "Peligro", "Message": `La Temperatura actual es de ${props.data} C°, se recomienda el uso de ropa ligera y evitar los abiertos, el uso de aire acondicionado si es posible o acudir a un área de menor Temperatura, además del consumo continuo de líquidos para evitar la deshidratación.` },
            'xtreme-hot': { "color": "#c53f3fff", "titulo": "Peligro", "Message": `La Temperatura actual es de ${props.data} C°, esta Temperatura es altamente peligrosa, se recomienda acudir inmediatamente a un sitio de menor Temperatura, mantenerse hidratado y evitar realizar movimientos innecesarios.` }
        },
        "Radiacion UV": {
            "success": { "color": "#3fc555ff", "titulo": "Importante", "Message": `El nivel actual de Radiación UV es ${props.data}, este nivel de radiación es bajo, es seguro la exposición la misma.` },
            "info": { "color": "#3fa6c5ff", "titulo": "Importante", "Message": `El nivel actual de Radiación UV es ${props.data}, este nivel de radiación es moderado, es seguro la exposición  la misma, sin embargo se recomienda por poco tiempo.` },
            "warning": { "color": "#F18B00", "titulo": "Advertencia", "Message": `El nivel actual de Radiación UV es ${props.data}, este nivel de radiación es alto, se recomienda el uso de protector solar para evitar quemaduras en la piel y por poco tiempo.` },
            "danger": { "color": "#c53f3fff", "titulo": "Peligro", "Message": `El nivel actual de Radiación UV es ${props.data}, este nivel de radiación es muy alto, se recomienda evitar la exposición a los rayos del sol, aun con el uso de protector solar.` },
            "xtreme": { "color": "#B567A4", "titulo": "Peligro", "Message": `El nivel actual de Radiación UV es ${props.data}, este nivel de radiación es peligroso, se recomienda evitar la exposición a los rayos del sol, aun con el uso de protector solar.` },
        },
        "Nubosidad": {
            "success": { "color": "#3fc555ff", "titulo": "Importante", "Message": `` },
            "info": { "color": "#3fa6c5ff", "titulo": "Importante", "Message": `` },
            "warning": { "color": "#F18B00", "titulo": "Advertencia", "Message": `` },
            "danger": { "color": "#c53f3fff", "titulo": "Peligro", "Message": `` },
            "xtreme": { "color": "#B567A4", "titulo": "Peligro", "Message": `` }
        },
        "Humedad": {
            "success": { "color": "#3fc555ff", "titulo": "Importante", "Message": `` },
            "info": { "color": "#3fa6c5ff", "titulo": "Importante", "Message": `` },
            "warning": { "color": "#F18B00", "titulo": "Advertencia", "Message": `` },
            "danger": { "color": "#c53f3fff", "titulo": "Peligro", "Message": `` },
            "xtreme": { "color": "#B567A4", "titulo": "Peligro", "Message": `` }
        },
        "Visibilidad": {
            "success": { "color": "#3fc555ff", "titulo": "Importante", "Message": `` },
            "info": { "color": "#3fa6c5ff", "titulo": "Importante", "Message": `` },
            "warning": { "color": "#F18B00", "titulo": "Advertencia", "Message": `` },
            "danger": { "color": "#c53f3fff", "titulo": "Peligro", "Message": `` },
            "xtreme": { "color": "#B567A4", "titulo": "Peligro", "Message": `` }
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
        } return alertType;
    }
    /*La funcion getAlert sirve para determinar el alertamiento de una metrica , toma como 
    parametros el valor de la metrica a evaluar y como segundo parametro el tipo de metrica
    por ejemplo: si se evalua la temperatura seria: getAlert("38",Temperatura) devolviendo 
    una de las claves de los rangos , en el ejemplo la funcion devolveria: "xtreme-hot"*/



    useEffect(() => {

        /*Aqui se generan los alertamientos de "Peligro" o "Advertencia" mediante el tipo de alerta , 
        para que cada vez que cambie el tipo de alerta y el valor de la metrica ,
        ejemplo la temperatura o la radiacion ,se evalue una nueva alerta*/

        if (!nivelAlertaTemp && !nivelAlertaUV || props.data === '' || props.data === undefined) return;

        switch (typeAlert) {
            case "Temperatura":
                const nivelAlert = getAlert(props.data, typeAlert);

                if (alertas["Temperatura"][nivelAlert]?.titulo === 'Peligro') {

                    Notification.requestPermission().then(function (result) {

                        if (result === 'granted') {
                            new Notification("Alerta detectada, por favor revisar en el panel principal")
                        }

                    });

                    /*
                    *Aqui se evalua el objeto que devuelve getAlert , mediante el titulo ,
                    *asi se puede determinar el nivel de alerta, en este caso aqui se genera
                    *las alertas de nivel "Peligro"
                    */

                    const alertObject = {
                        alertBody: alertas["Temperatura"][nivelAlert],
                        value: props.data,
                        type: `${typeAlert} (Valores Peligrosos)`
                    }

                    /*
                    *Si el nivel de alerta es "Peligro" se genera un json que contiene
                    *el cuerpo de la alerta siendo el objeto que devuelve getAlert , el valor de la metrica
                    *y el tipo de alerta, el tipo de alerta se usara para poder diferenciar 
                    *entre las alertas a que metrica almacenada corresponde 
                    */

                    setAlerts((prev) => {

                        /* 
                        *Aqui se realiza un filtrado de las alertas para evitar alertas duplicadas
                        *Mediante el tipo de alerta almacenada en la propiedad type
                        */

                        const updated = [...prev, alertObject];
                        const arrTemp = updated.filter(
                            (obj, i, arr) => i === arr.findIndex(o => o.type === obj.type)
                        );
                        return arrTemp;
                    });


                    setWarnings((prev) => {

                        /*
                        *Cuando un valor de métrica cambia y genera una nueva alerta o advertencia,
                        * se debe eliminar cualquier registro previo de la misma métrica en el arreglo contrario.
                        * Ejemplo: Si una temperatura que estaba en "Advertencia" ahora genera una "Alerta" de peligro,
                        * se remueve del arreglo de Warnings y se agrega al arreglo de Alerts.
                        * Esto evita que una misma métrica aparezca simultáneamente como alerta y advertencia.
                        */

                        const arrTemp = prev.filter(
                            (obj, i, arr) => i === arr.findIndex(o => o.type !== `${typeAlert} (Valores de riesgo moderado)`)
                        );
                        return arrTemp;
                    });


                }
                if (alertas["Temperatura"][nivelAlert]?.titulo === 'Advertencia') {

                    Notification.requestPermission().then(function (result) {

                        if (result === 'granted') {
                            new Notification("Alerta detectada, por favor revisar en el panel principal")
                        }

                    });
                    /*
                    *Aqui se evalua el objeto que devuelve getAlert , mediante el titulo ,
                    *asi se puede determinar el nivel de alerta, en este caso aqui se genera
                    *las alertas de nivel "Advertencia"
                    */

                    const warningObject = {
                        alertBody: alertas["Temperatura"][nivelAlert],
                        value: props.data,
                        type: `${typeAlert} (Valores de riesgo moderado)`
                    }


                    /*
                    *Si el nivel de alerta es "Advertencia" se genera un json que contiene
                    *el cuerpo de la alerta siendo el objeto que devuelve getAlert , el valor de la metrica
                    *y el tipo de alerta, el tipo de alerta se usara para poder diferenciar 
                    *entre las alertas a que metrica almacenada corresponde 
                    */

                    setWarnings((prev) => {

                        /* 
                       *Aqui se realiza un filtrado de las alertas para evitar alertas duplicadas
                       *Mediante el tipo de alerta almacenada en la propiedad type
                       */

                        const updated = [...prev, warningObject];
                        const arrTemp = updated.filter(
                            (obj, i, arr) => i === arr.findIndex(o => o.type === obj.type)
                        );
                        return arrTemp;
                    });
                    setAlerts((prev) => {

                        /*
                        *Cuando un valor de métrica cambia y genera una nueva alerta o advertencia,
                        * se debe eliminar cualquier registro previo de la misma métrica en el arreglo contrario.
                        * Ejemplo: Si una temperatura que estaba en "Advertencia" ahora genera una "Alerta" de peligro,
                        * se remueve del arreglo de Warnings y se agrega al arreglo de Alerts.
                        * Esto evita que una misma métrica aparezca simultáneamente como alerta y advertencia.
                        */

                        const arrTemp = prev.filter(
                            (obj, i, arr) => i === arr.findIndex(o => o.type !== `${typeAlert} (Valores Peligrosos)`)
                        );
                        return arrTemp;
                    });
                }
                if (alertas["Temperatura"][nivelAlert]?.titulo !== 'Advertencia' && alertas["Temperatura"][nivelAlert]?.titulo !== 'Peligro') {

                    /*
                    *Si el nivel de alerta no es ni "Peligro" ni "Advertencia", 
                    *se limpian ambos arreglos de cualquier registro previo de esta metrica
                    *para evitar que se muestren alertas o advertencias que ya no aplican
                    */

                    setAlerts((prev) => {
                        const arrTemp = prev.filter(
                            (obj, i, arr) => i === arr.findIndex(o => o.type !== `${typeAlert} (Valores Peligrosos)`)
                        );
                        return arrTemp;
                    });

                    setWarnings((prev) => {
                        const arrTemp = prev.filter(
                            (obj, i, arr) => i === arr.findIndex(o => o.type !== `${typeAlert} (Valores de riesgo moderado)`)
                        );
                        return arrTemp;
                    });
                }
                setComponent(
                    /*
                    *Este componente es aislado de la logica de creacion de alertas ,
                    *el componente <IndicatorGraph, renderiza mediante Gauges los valores
                    *de la radiacion y la temperatura , sin embargo hace uso de la funcion getAlert para determinar
                    *el color con el que se renderizara el grafico
                    */
                    <IndicatorGraph
                        min={props.min}
                        max={props.max}
                        type={props.type}
                        indicator={props.indicator}
                        split={props.split}
                        data={props.data}
                        color={alertas["Temperatura"][nivelAlert]?.color || '#4fd6ffff'}
                        recomendaciones={alertas["Temperatura"][nivelAlert]?.Message || 'No disponible'}
                        optionalData={props.optionalData}
                    />)
                break;

            case "Radiacion UV":
                const nivelAlertUv = getAlert(props.data, typeAlert);
                setNivelAlertaUV(nivelAlertUv);

                if (alertas["Radiacion UV"][nivelAlertUv]?.titulo === 'Peligro') {
                    Notification.requestPermission().then(function (result) {

                        if (result === 'granted') {
                            new Notification("Alerta detectada, por favor revisar en el panel principal")
                        }

                    });

                    /*
                    *Aqui se evalua el objeto que devuelve getAlert , mediante el titulo ,
                    *asi se puede determinar el nivel de alerta, en este caso aqui se genera
                    *las alertas de nivel "Peligro" para Radiacion UV
                    */

                    const alertObject = {
                        alertBody: alertas["Radiacion UV"][nivelAlertUv],
                        value: props.data,
                        type: `${typeAlert} (Valores Peligrosos)`
                    }

                    /*
                    *Si el nivel de alerta es "Peligro" se genera un json que contiene
                    *el cuerpo de la alerta siendo el objeto que devuelve getAlert , el valor de la metrica
                    *y el tipo de alerta, el tipo de alerta se usara para poder diferenciar 
                    *entre las alertas a que metrica almacenada corresponde 
                    */

                    setAlerts((prev) => {

                        /* 
                        *Aqui se realiza un filtrado de las alertas para evitar alertas duplicadas
                        *Mediante el tipo de alerta almacenada en la propiedad type
                        */

                        const updated = [...prev, alertObject];
                        const arrTemp = updated.filter(
                            (obj, i, arr) => i === arr.findIndex(o => o.type === obj.type)
                        );
                        return arrTemp;
                    });

                    setWarnings((prev) => {

                        /*
                        *Cuando un valor de métrica cambia y genera una nueva alerta o advertencia,
                        * se debe eliminar cualquier registro previo de la misma métrica en el arreglo contrario.
                        * Ejemplo: Si una radiacion UV que estaba en "Advertencia" ahora genera una "Alerta" de peligro,
                        * se remueve del arreglo de Warnings y se agrega al arreglo de Alerts.
                        * Esto evita que una misma métrica aparezca simultáneamente como alerta y advertencia.
                        */

                        const arrTemp = prev.filter(
                            (obj, i, arr) => i === arr.findIndex(o => o.type !== `${typeAlert} (Valores de riesgo moderado)`)
                        );
                        return arrTemp;
                    });
                }

                if (alertas["Radiacion UV"][nivelAlertUv]?.titulo === 'Advertencia') {

                    Notification.requestPermission().then(function (result) {

                        if (result === 'granted') {
                            new Notification("Alerta detectada, por favor revisar en el panel principal")
                        }

                    });
                    /*
                    *Aqui se evalua el objeto que devuelve getAlert , mediante el titulo ,
                    *asi se puede determinar el nivel de alerta, en este caso aqui se genera
                    *las alertas de nivel "Advertencia" para Radiacion UV
                    */

                    const warningObject = {
                        alertBody: alertas["Radiacion UV"][nivelAlertUv],
                        value: props.data,
                        type: `${typeAlert} (Valores de riesgo moderado)`
                    }

                    setWarnings((prev) => {

                        /* 
                       *Aqui se realiza un filtrado de las alertas para evitar alertas duplicadas
                       *Mediante el tipo de alerta almacenada en la propiedad type
                       */

                        const updated = [...prev, warningObject];
                        const arrTemp = updated.filter(
                            (obj, i, arr) => i === arr.findIndex(o => o.type === obj.type)
                        );
                        return arrTemp;
                    });

                    setAlerts((prev) => {

                        /*
                        *Cuando un valor de métrica cambia y genera una nueva alerta o advertencia,
                        * se debe eliminar cualquier registro previo de la misma métrica en el arreglo contrario.
                        * Ejemplo: Si una radiacion UV que estaba en "Advertencia" ahora genera una "Alerta" de peligro,
                        * se remueve del arreglo de Warnings y se agrega al arreglo de Alerts.
                        * Esto evita que una misma métrica aparezca simultáneamente como alerta y advertencia.
                        */

                        const arrTemp = prev.filter(
                            (obj, i, arr) => i === arr.findIndex(o => o.type !== `${typeAlert} (Valores Peligrosos)`)
                        );
                        return arrTemp;
                    });
                }

                if (alertas["Radiacion UV"][nivelAlertUv]?.titulo !== 'Advertencia' && alertas["Radiacion UV"][nivelAlertUv]?.titulo !== 'Peligro') {

                    /*
                    *Si el nivel de alerta no es ni "Peligro" ni "Advertencia", 
                    *se limpian ambos arreglos de cualquier registro previo de esta metrica
                    *para evitar que se muestren alertas o advertencias que ya no aplican
                    */

                    setAlerts((prev) => {
                        const arrTemp = prev.filter(
                            (obj, i, arr) => i === arr.findIndex(o => o.type !== `${typeAlert} (Valores Peligrosos)`)
                        );
                        return arrTemp;
                    });

                    setWarnings((prev) => {
                        const arrTemp = prev.filter(
                            (obj, i, arr) => i === arr.findIndex(o => o.type !== `${typeAlert} (Valores de riesgo moderado)`)
                        );
                        return arrTemp;
                    });
                }

                setComponent(
                    /*
                    *Este componente es aislado de la logica de creacion de alertas ,
                    *el componente <IndicatorGraph>, renderiza mediante Gauges los valores
                    *de la radiacion y la temperatura , sin embargo hace uso de la funcion getAlert para determinar
                    *el color con el que se renderizara el grafico
                    */
                    <IndicatorGraph
                        min={props.min}
                        max={props.max}
                        type={props.type}
                        indicator={props.indicator}
                        split={props.split}
                        data={props.data}
                        color={alertas["Radiacion UV"][nivelAlertUv]?.color || '#4fd6ffff'}
                        recomendaciones={alertas["Radiacion UV"][nivelAlertUv]?.Message || 'No disponible'}
                        optionalData={props.optionalData}
                    />)
                break;
            case 'Nubosidad':
                const nivelAlertNubosidad = getAlert(props.data, typeAlert);

                setComponent(
                    /*
                    *Este componente es aislado de la logica de creacion de alertas ,
                    *el componente <IndicatorGraph>, renderiza mediante Gauges los valores
                    *de la radiacion y la temperatura , sin embargo hace uso de la funcion getAlert para determinar
                    *el color con el que se renderizara el grafico
                    */
                    <IndicatorGraph
                        min={props.min}
                        max={props.max}
                        type={props.type}
                        indicator={props.indicator}
                        split={props.split}
                        data={props.data}
                        color={alertas["Nubosidad"][nivelAlertNubosidad]?.color || '#4fd6ffff'}
                        recomendaciones={alertas["Nubosidad"][nivelAlertNubosidad]?.Message || 'No disponible'}
                        optionalData={props.optionalData}
                    />)
                break;
            default:

                break;
        }
    }, [props.data, typeAlert]);

    return (
        <>
            {Component}
        </>
    )

}
export default Engine;