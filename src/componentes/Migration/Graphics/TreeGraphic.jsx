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

  const data_2 = [
    0,
    props.data.CO,
    props.data.SO2,
    props.data.NO2,
    props.data.PM2_5,
    props.data.O3,
    props.data.PM10,
  ];

  const data = [
    {
      type: "treemap",
      labels: props.type === "Pronostico" ? data_label_1 : data_labels_2,
      parents: props.type === "Pronostico" ? data_parents_1 : data_parents_2,
      values: props.type === "Pronostico" ? data_1 : data_2,
      textinfo: "label+value",
      hoverinfo: "label+value+percent parent+percent entry",
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
        width: isMobile ? "100%" : "650px",
        textAlign: "center",
        borderRadius: "10px",
        height: isMobile ? '100%' : '420px'
      }}
    >
      <Stack alignItems="center" spacing={1}>
        <Plotly
          data={data}
          layout={layout}
          style={{ height: "400px", width: "650px" }}
          config={{ responsive: true }}
        />
      </Stack>
    </Box>
  );
};

export default TreeGraph;
