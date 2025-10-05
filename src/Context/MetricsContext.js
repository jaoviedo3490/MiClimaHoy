import { createContext, useState } from "react";

const DataContext = createContext({});
const UserProvide = ({ children }) => {
    const [climateAlert, setClimateAlert] = useState('');
    const [langSearch, setSearch] = useState('');
    const [cities,setCities] = useState([]);
    

    const apiSearch = async (value,query,setCities) => {
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
            <DataContext.Provider value={{ climateAlert, setClimateAlert, langSearch, setSearch, apiSearch ,cities,setCities}}>
                {children}
            </DataContext.Provider>
        </div>
    )


}
export { DataContext, UserProvide }