import { createContext, useState } from "react";
import {
    Drawer, List, ListItemIcon, ListItemText,
    Toolbar, Box, ListItemButton,
    useMediaQuery, useTheme, ListSubheader
} from "@mui/material";
const DataContext = createContext({});
const UserProvide = ({ children }) => {
    const [climateAlert, setClimateAlert] = useState('');
    const [langSearch, setSearch] = useState('');
    const [cities, setCities] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [closeModal, setCloseModal] = useState(false);
    const [dataModal, setDataModal] = useState([]);
    const [dataRecomendations, setRecomendations] = useState([]);
    const [dataType, SetdataType] = useState([]);
    const [dataOptional, setdataOptional] = useState([]);
    const [migrateVersion, setMigrateVersion] = useState(false);
    const [Alerts,setAlerts] = useState([]);
    const [Warnings,setWarnings] = useState([]);


    const apiSearch = async (value, query, setCities) => {
        let data = {
            "query": `${query} de ${value}`,
            "freshness": "onLimit",
            "summary": true,
            "count": 1
        }
        fetch('https://api.langsearch.com/v1/web-search', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer sk-84759bb625084863be09fc07ec42e53c`
            },
            body: JSON.stringify(data)
        }).then(response => {
            if (!response.ok) {
                throw new Error(`Ocurrio un error en la solicitud: ${response.status}`);
            } return response.json();
        })
            .then(data => {
                //console.log(data.data.webPages.value[0].summary);

                let regex = /\d+\.\s*[A-Za-zÀ-ÖØ-öø-ÿ]+/g;
                let ciudades = data.data.webPages.value[0].summary.match(regex);
                let array = ciudades.map((elemento) => elemento.replace(/\d+\.\s*/, ""));
                let no_repeat = [... new Set(array)];
                setCities(no_repeat);
            })

    }
    //apiSearch();
    return (
        <div>
            <DataContext.Provider value={{ Warnings,setWarnings,Alerts,setAlerts, migrateVersion, setMigrateVersion, dataOptional, setdataOptional, dataType, SetdataType, dataRecomendations, setRecomendations, dataModal, setDataModal, closeModal, setCloseModal, climateAlert, openModal, setOpenModal, setClimateAlert, langSearch, setSearch, apiSearch, cities, setCities }}>
                {children}
            </DataContext.Provider>
        </div>
    )


}
export { DataContext, UserProvide }