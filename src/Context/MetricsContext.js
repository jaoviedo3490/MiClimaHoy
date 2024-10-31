import { createContext , useState } from "react";

const DataContext = createContext({});
const UserProvide = ({children})=>{
    const[climateAlert,setClimateAlert] = useState('');

    return(
        <div>
            <DataContext.Provider value={{climateAlert,setClimateAlert}}>
                {children}
            </DataContext.Provider>
        </div>
    )
}
export {DataContext,UserProvide}
