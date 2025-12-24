import { createContext, useState } from "react";

const Ui_Context = createContext({});

const UIProvide = ({ children }) => {
  const [openModal, setOpenModal] = useState(false);
  const [closeModal, setCloseModal] = useState(false);
  const [dataModal, setDataModal] = useState([]);
  const [dataRecomendations, setRecomendations] = useState([]);
  const [dataType, setDataType] = useState([]);
  const [dataOptional, setDataOptional] = useState([]);
  const [typeModal, setTypeModal] = useState(null);
  const [optionTab, setOptionTab] = useState("1"); // si quieres controlar tab desde aquí
  const [mapUrlState, setMapUrlState] = useState(null);
  const [customLocation, setCustomLocation] = useState(false);

  return (
    <Ui_Context.Provider
      value={{
        // Modal
        openModal,
        setOpenModal,
        closeModal,
        setCloseModal,
        customLocation, setCustomLocation,

        // Datos que muestra el modal
        dataModal,
        setDataModal,
        dataRecomendations,
        setRecomendations,
        dataType,
        setDataType,
        dataOptional,
        setDataOptional,
        typeModal,
        setTypeModal,
        mapUrlState, setMapUrlState,
        // Tab actual (opcional)
        optionTab,
        setOptionTab,
      }}
    >
      {children}
    </Ui_Context.Provider>
  );
};

export { Ui_Context, UIProvide };
