import { createContext, useState } from "react";

const DataContext = createContext({});

const UserProvide = ({ children }) => {
    const [climateAlert, setClimateAlert] = useState('');
    const [langSearch, setSearch] = useState('');
    const [cities, setCities] = useState([]);
    const [migrateVersion, setMigrateVersion] = useState(false);
    const [Alerts, setAlerts] = useState([]);
    const [Alerts_Module_second, setAlert_Module_Second] = useState([]);
    const [Warnings_Module_second, setWarnings_Module_Second] = useState([]);
    const [Warnings, setWarnings] = useState([]);
    const [dark_theme_letters, setDarkLetters] = useState(false);
    const [background_image, setBackground] = useState();
    const [dataNubosidad, setDataNubosidad] = useState([]);
    const [dataHumedad, setDataHumedad] = useState([]);
    const [dataQualityAir, setDataQualityAir] = useState([]);
    const [dataVisibilidad, setDataVisibilidad] = useState([]);
    const [isDay_global, setIsDay_global] = useState([]);
    const [dataMonoCarbono, setMonoCarbono] = useState([]);
    const [dataDioNitrogeno, setDataDioNitrogeno] = useState([]);
    const [dataDioAzufre, setDataDioAzufre] = useState([]);
    const [optionTab, setOptionTab] = useState(1);
    const [isDay, setIsDay] = useState([]);
    const [dataOzono,setDataOzono] = useState([]);
    const [dataPM2_5,setDataPM2_5] = useState([]);
    const [dataPM10,setDataPM10] = useState([]);
    const [OficialAlerts,setOficialAlerts] = useState([]);
    
    const [customCoords,setCustomCoords] = useState([]);

    const apiSearch = async (value, query, setCities) => {
        let data = {
            query: `${query} de ${value}`,
            freshness: "onLimit",
            summary: true,
            count: 1,
        };

        fetch("https://api.langsearch.com/v1/web-search", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${process.env.REACT_APP_LANG_SEARCH_TOKEN}`,
            },
            body: JSON.stringify(data),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`Ocurrio un error en la solicitud: ${response.status}`);
                }
                return response.json();
            })
            .then((data) => {
                let regex = /\d+\.\s*[A-Za-zÀ-ÖØ-öø-ÿ]+/g;
                let ciudades = data.data.webPages.value[0].summary.match(regex);
                let array = ciudades.map((elemento) => elemento.replace(/\d+\.\s*/, ""));
                let no_repeat = [...new Set(array)];
                setCities(no_repeat);
            });
    };

    return (
        <DataContext.Provider
            value={{
                dataPM2_5,setDataPM2_5,
                dataPM10,setDataPM10,
                customCoords,setCustomCoords,
              dataOzono,setDataOzono,
                optionTab,
                setOptionTab,
                Warnings_Module_second,
                setWarnings_Module_Second,
                Alerts_Module_second,
                setAlert_Module_Second,
                dataDioAzufre,
                setDataDioAzufre,
                dataDioNitrogeno,
                setDataDioNitrogeno,
                dataMonoCarbono,
                setMonoCarbono,
                dataQualityAir,
                setDataQualityAir,
                isDay_global,
                setIsDay_global,
                dataVisibilidad,
                setDataVisibilidad,
                dataHumedad,
                setDataHumedad,
                dataNubosidad,
                setDataNubosidad,
                background_image,
                setBackground,
                dark_theme_letters,
                setDarkLetters,
                Warnings,
                setWarnings,
                Alerts,
                setAlerts,
                migrateVersion,
                setMigrateVersion,
                climateAlert,
                setClimateAlert,
                langSearch,
                setSearch,
                apiSearch,
                cities,
                setCities,
                isDay,
                setIsDay,
                OficialAlerts,
                setOficialAlerts
            }}
        >
            {children}
        </DataContext.Provider>
    );
};

export { DataContext, UserProvide };
