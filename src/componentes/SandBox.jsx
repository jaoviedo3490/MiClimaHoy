import { useContext, useEffect, useState } from "react";
import { DataContext } from "../Context/MetricsContext";
import Select from "react-select";
import UpdateDate from "./updateDate";
import ViewData from "./viewData";
import Countries_Cities from './dataJson/countries_cities.json'
import { InferenceClient } from "@huggingface/inference";

const client = new InferenceClient(process.env.REACT_APP_HF_TOKEN);

const SandBox = () => {
    const [response, setResponse] = useState(null);
    const [langSearch, setSearch] = useState('');
    const [model, setModel] = useState(null);
    const [Countries, setCountries] = useState([]);
    const [button_disable, setDissable] = useState(true);
    //const [SeleccionadoP, setSelectP] = useState(null);
    const [SeleccionadoC, setSelectC] = useState(null);
    const [cities, setCities] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showDataSandbox, setShowD] = useState(false);
    const { ClimateAlert, setClimateAlert } = useContext(DataContext);
    const [cities_state, setCityS] = useState([]);
    const [country, setCountry] = useState('');

    const models = [
        "unsloth/Meta-Llama-3.1-8B-Instruct",
        "meta-llama/Llama-3.1-8B-Instruct",
        "meta-llama/Llama-3.1-70B-Instruct",
        "meta-llama/Llama-3.1-405B-Instruct"
    ];
    let model_Temp = models[Math.floor(Math.random() * 4)];
    useEffect(() => {
        if (country !== '') {
            const chatEvent = async () => {
                try {
                    const out = await client.chatCompletion({
                        model: model_Temp,
                        messages: [{ role: "user", content: `Dame el top 5 ciudades mas frias y calidas de ${country} en formato json , pero solo dame los nombres y solo el json , no me digas "aqui te dejo" y estas claves: Frias, Calidas` }],
                        max_tokens: 256,
                    });

                    setResponse(out.choices[0].message.content);
                } catch (error) {
                    console.error(error);
                    setResponse("Error al llamar la API");
                }
            }
            chatEvent();
        }

    }, [country]);

    useEffect(() => {
        //console.log(`Respuesta del modelo: ${response}`);


    }, [response]);

    const button = (event) => {
        event.preventDefault();
        setLoading(true);
        fetch(`https://api.weatherapi.com/v1/current.json?key=${process.env.REACT_APP_APIKEY}&q=${SeleccionadoC.value}&aqi=yes`)

            .then(response => {
                if (!response.ok) {
                    throw new Error(`Error en la solicitud: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                //console.log(data);
                setLoading(false);
                setShowD(true);
                setClimateAlert(data);

            })
            .catch(error => {
                alert(`Ocurrió un error al obtener los datos del clima:`);
                setLoading(false);
            });
    }
    const onChangeCity = (opcion) => {
        setSelectC(opcion);
        //console.log(`Ciudad seleccionada: ${opcion.value}`);
        //chatEvent();
        //console.log(`Respuesta del modelo: ${response}`);
        setDissable(false);

    }
    
    useEffect(() => {

        fetch('https://restcountries.com/v3.1/independent?status=true')
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Ocurrió un error en la solicitud: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                const options = data.map(item => ({
                    value: item.name.common,
                    label: item.name.official,
                }));
                setCountries(options);
            })
            .catch(error => console.error(error));
    }, []);


    useEffect(() => {
        //console.log(cities);

    }, [cities])

    const handleEvent = (opcion) => {
        setCountry(opcion.value);
        setSelectC(null);
        const cities_select = Countries_Cities.find((city_element) => city_element.name === opcion.value)
        //console.log(`JSON: ${cities_select} , pais: ${cities_select.name} : opcion: ${opcion.value}`);
        //console.log(cities_select.cities);

        let json = cities_select.cities.map((name) => ({ value: name.name, label: name.name }));
        setCities(json);

        /* fetch('https://countriesnow.space/api/v0.1/countries/cities', {
             method: "POST",
             headers: { "Content-Type": 'application/json' },
             body: JSON.stringify({ country: opcion.value })
         })
             .then(response => {
                 if (!response.ok) {
                     throw new Error(`Ocurrió un error en la solicitud: ${response.status}`);
                 }
                 return response.json();
             })
             .then(dataT => {
                 setDissable(true);
                
 
                 //console.log(dataT);
 
             })
             .catch(error => {
                 console.error("Error al obtener ciudades:", error);
             });*/
     };


        return (
            <div>
                {loading && (
                    <div className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center bg-dark bg-opacity-75 loading-overlay">
                        <div className="text-center text-light">
                            <div className="spinner-grow text-light" role="status"></div>
                            <div className="mt-2">
                                <span className="visually-hidden">Cargando...</span>
                            </div>
                        </div>
                    </div>
                )}

                <section className="container">
                    <div className="row">
                        <div className="col-12 mx-auto">
                            <form>
                                <div className="mb-3">
                                    <Select
                                        placeholder="Selecciona un País"
                                        onChange={handleEvent}
                                        options={Countries}
                                        className="w-100"
                                        classNamePrefix="select"
                                    />
                                </div>

                                {cities.length > 0 && (
                                    <div className="mb-3">
                                        <Select
                                            placeholder="Selecciona una Ciudad"
                                            value={SeleccionadoC}
                                            onChange={onChangeCity}
                                            options={cities}
                                            className="w-100"
                                            classNamePrefix="select"
                                        />
                                    </div>
                                )}

                                <button
                                    disabled={button_disable}
                                    type="button"
                                    onClick={button}
                                    className="btn btn-secondary w-100"
                                >
                                    Informe de Clima
                                </button>
                            </form>
                        </div>
                    </div>
                </section>

                {showDataSandbox && (
                    <section className="container mt-4">
                        <div className="text-end">
                            <UpdateDate />
                        </div>
                        <ViewData />
                    </section>
                )}
            </div>




        );
    };

    export default SandBox;
