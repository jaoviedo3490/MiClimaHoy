import { createContext, useState } from "react";

const Test_context = createContext({});

const Test_context_Provider = ({ children }) => {
  const [Trigger, setTrigger] = useState(false);
  const [OficialAlerts, setOficialAlerts] = useState([]);


  return (
    <Test_context.Provider
      value={{
        Trigger, setTrigger, OficialAlerts, setOficialAlerts
      }}
    >
      {children}
    </Test_context.Provider>
  );
};

export { Test_context, Test_context_Provider };
