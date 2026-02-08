import { Box, Stack } from "@mui/material";
import { useMediaQuery, useTheme } from "@mui/material";
import Plotly from "react-plotly.js";

const TreeGraph = (props) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  // ------- Pronóstico -------
  const data_label_1 = [
    "Pronostico",
    "Nubosidad",
    "Humedad",
    "Visibilidad",
  ];

  const data_parents_1 = [
    "",              // raíz
    "Pronostico",
    "Pronostico",
    "Pronostico",
  ];

  const data_1 = [
    0,
    props.data.Nubosidad,
    props.data.Humedad,
    props.data.Visibilidad,
  ];

  // ------- Calidad del aire -------
  const data_labels_2 = [
    "Calidad del Aire",
    "Monoxido de Carbono",
    "Dioxido de Azufre",
    "Dioxido de Nitrogeno",
    "Materia Particulada",
    "Ozono",
    "Particulas en susprension",
  ];

  const data_parents_2 = [
    "",
    "Calidad del Aire",
    "Calidad del Aire",
    "Calidad del Aire",
    "Calidad del Aire",
    "Calidad del Aire",
    "Calidad del Aire",
  ];
  const AQI_func = (C, C_low, C_high, I_low, I_high) => {
    return (I_high - I_low) / (C_high - C_low) * (C - C_low) + I_low
  }
  const data_2 = [
    0,
    (props.data.CO >= 0.0 && props.data.CO <= 4.4)
      ? AQI_func(props.data.CO, 0.0, 4.4, 0, 50)
      : (props.data.CO > 4.4 && props.data.CO <= 9.4)
        ? AQI_func(props.data.CO, 4.5, 9.4, 51, 100)
        : (props.data.CO > 9.4 && props.data.CO <= 12.4)
          ? AQI_func(props.data.CO, 9.5, 12.4, 101, 150)
          : (props.data.CO > 12.4 && props.data.CO <= 15.4)
            ? AQI_func(props.data.CO, 12.5, 15.4, 151, 200)
            : (props.data.CO > 15.4 && props.data.CO <= 30.4)
              ? AQI_func(props.data.CO, 15.5, 30.4, 201, 300)
              : (props.data.CO > 30.4 && props.data.CO <= 40.4)
                ? AQI_func(props.data.CO, 30.5, 40.4, 301, 400)
                : (props.data.CO > 40.4 && props.data.CO <= 50.4)
                  ? AQI_func(props.data.CO, 40.5, 50.4, 401, 500)
                  : props.data.CO,

  
    (props.data.SO2 >= 0.000 && props.data.SO2 <= 0.035)
      ? AQI_func(props.data.SO2, 0.000, 0.035, 0, 50)
      : (props.data.SO2 > 0.035 && props.data.SO2 <= 0.075)
        ? AQI_func(props.data.SO2, 0.036, 0.075, 51, 100)
        : (props.data.SO2 > 0.075 && props.data.SO2 <= 0.185)
          ? AQI_func(props.data.SO2, 0.076, 0.185, 101, 150)
          : (props.data.SO2 > 0.185 && props.data.SO2 <= 0.304)
            ? AQI_func(props.data.SO2, 0.186, 0.304, 151, 200)
            : (props.data.SO2 > 0.304 && props.data.SO2 <= 0.604)
              ? AQI_func(props.data.SO2, 0.305, 0.604, 201, 300)
              : (props.data.SO2 > 0.604 && props.data.SO2 <= 0.804)
                ? AQI_func(props.data.SO2, 0.605, 0.804, 301, 400)
                : (props.data.SO2 > 0.804 && props.data.SO2 <= 1.004)
                  ? AQI_func(props.data.SO2, 0.805, 1.004, 401, 500)
                  : props.data.SO2,


    (props.data.NO2 >= 0.000 && props.data.NO2 <= 0.053)
      ? AQI_func(props.data.NO2, 0.000, 0.053, 0, 50)
      : (props.data.NO2 > 0.053 && props.data.NO2 <= 0.100)
        ? AQI_func(props.data.NO2, 0.054, 0.100, 51, 100)
        : (props.data.NO2 > 0.100 && props.data.NO2 <= 0.360)
          ? AQI_func(props.data.NO2, 0.101, 0.360, 101, 150)
          : (props.data.NO2 > 0.360 && props.data.NO2 <= 0.649)
            ? AQI_func(props.data.NO2, 0.361, 0.649, 151, 200)
            : (props.data.NO2 > 0.649 && props.data.NO2 <= 1.249)
              ? AQI_func(props.data.NO2, 0.650, 1.249, 201, 300)
              : (props.data.NO2 > 1.249 && props.data.NO2 <= 1.649)
                ? AQI_func(props.data.NO2, 1.250, 1.649, 301, 400)
                : (props.data.NO2 > 1.649 && props.data.NO2 <= 2.049)
                  ? AQI_func(props.data.NO2, 1.650, 2.049, 401, 500)
                  : props.data.NO2,

 
    (props.data.PM2_5 >= 0.0 && props.data.PM2_5 <= 12.0)
      ? AQI_func(props.data.PM2_5, 0.0, 12.0, 0, 50)
      : (props.data.PM2_5 > 12.0 && props.data.PM2_5 <= 35.4)
        ? AQI_func(props.data.PM2_5, 12.1, 35.4, 51, 100)
        : (props.data.PM2_5 > 35.4 && props.data.PM2_5 <= 55.4)
          ? AQI_func(props.data.PM2_5, 35.5, 55.4, 101, 150)
          : (props.data.PM2_5 > 55.4 && props.data.PM2_5 <= 150.4)
            ? AQI_func(props.data.PM2_5, 55.5, 150.4, 151, 200)
            : (props.data.PM2_5 > 150.4 && props.data.PM2_5 <= 250.4)
              ? AQI_func(props.data.PM2_5, 150.5, 250.4, 201, 300)
              : (props.data.PM2_5 > 250.4 && props.data.PM2_5 <= 350.4)
                ? AQI_func(props.data.PM2_5, 250.5, 350.4, 301, 400)
                : (props.data.PM2_5 > 350.4 && props.data.PM2_5 <= 500.4)
                  ? AQI_func(props.data.PM2_5, 350.5, 500.4, 401, 500)
                  : props.data.PM2_5,

  
    (props.data.O3 >= 0.000 && props.data.O3 <= 0.054)
      ? AQI_func(props.data.O3, 0.000, 0.054, 0, 50)
      : (props.data.O3 > 0.054 && props.data.O3 <= 0.070)
        ? AQI_func(props.data.O3, 0.055, 0.070, 51, 100)
        : (props.data.O3 > 0.070 && props.data.O3 <= 0.085)
          ? AQI_func(props.data.O3, 0.071, 0.085, 101, 150)
          : (props.data.O3 > 0.085 && props.data.O3 <= 0.105)
            ? AQI_func(props.data.O3, 0.086, 0.105, 151, 200)
            : (props.data.O3 > 0.105 && props.data.O3 <= 0.200)
              ? AQI_func(props.data.O3, 0.106, 0.200, 201, 300)
              : (props.data.O3 > 0.200 && props.data.O3 <= 0.604)
                ? AQI_func(props.data.O3, 0.201, 0.604, 301, 500)
                : props.data.O3,


    (props.data.PM10 >= 0 && props.data.PM10 <= 54)
      ? AQI_func(props.data.PM10, 0, 54, 0, 50)
      : (props.data.PM10 > 54 && props.data.PM10 <= 154)
        ? AQI_func(props.data.PM10, 55, 154, 51, 100)
        : (props.data.PM10 > 154 && props.data.PM10 <= 254)
          ? AQI_func(props.data.PM10, 155, 254, 101, 150)
          : (props.data.PM10 > 254 && props.data.PM10 <= 354)
            ? AQI_func(props.data.PM10, 255, 354, 151, 200)
            : (props.data.PM10 > 354 && props.data.PM10 <= 424)
              ? AQI_func(props.data.PM10, 355, 424, 201, 300)
              : (props.data.PM10 > 424 && props.data.PM10 <= 504)
                ? AQI_func(props.data.PM10, 425, 504, 301, 400)
                : (props.data.PM10 > 504 && props.data.PM10 <= 604)
                  ? AQI_func(props.data.PM10, 505, 604, 401, 500)
                  : props.data.PM10
  ];
console.log(data_2)

  const data = [
    {
      type: "treemap",
      labels: props.type === "Pronostico" ? data_label_1 : data_labels_2,
      parents: props.type === "Pronostico" ? data_parents_1 : data_parents_2,
      values: props.type === "Pronostico" ? data_1 : data_2,
      textinfo: "label+value",
      hoverinfo: `label+value+percent parent+percent entry`,
    },
  ];

  const layout = {
    autosize: true,
    margin: { t: 10, r: 10, l: 10, b: 10 },
    font: { color: "white", family: "Inter, sans-serif" },
    paper_bgcolor: "rgba(255, 255, 255, 0)",
    plot_bgcolor: "rgba(255, 255, 255, 0)",
  };

  return (
    <Box
      sx={{
        p: 2,
        width: isMobile ? "99%" : "650px",
        textAlign: "center",
        borderRadius: "10px",
        height: isMobile ? '100%' : '420px'
      }}
    >
      <Stack alignItems="center" spacing={1}>
        <Plotly
          data={data}
          layout={layout}
          style={{ height: isMobile ? '30%' : "400px", width: isMobile ? '380px' : "650px" }}
          config={{ responsive: true }}
        />
      </Stack>
    </Box>
  );
};

export default TreeGraph;
