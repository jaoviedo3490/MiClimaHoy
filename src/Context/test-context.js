import { createContext, useState } from "react";

const test_context = createContext({});

const Test_context_Provider = ({ children }) => {
  const [Trigger, setTrigger] = useState(false);


  return (
    <test_context.Provider
      value={{
       Trigger,setTrigger
      }}
    >
      {children}
    </test_context.Provider>
  );
};

export { test_context, Test_context_Provider };
