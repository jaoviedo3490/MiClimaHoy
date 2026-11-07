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
  
    
    const [customCoords,setCustomCoords] = useState([]);

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
                cities,
                setCities,
                isDay,
                setIsDay,
              
            }}
        >
            {children}
        </DataContext.Provider>
    );
};

export { DataContext, UserProvide };
