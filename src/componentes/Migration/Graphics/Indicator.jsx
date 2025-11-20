

import { Box, Stack, Button } from "@mui/material";
import { DataContext } from "../../../Context/MetricsContext";
import { useContext } from "react";
import { useMediaQuery, useTheme } from "@mui/material";
import Plotly from "react-plotly.js";

const IndicatorGraph = (props) => {
  const {
    setOpenModal,
    setCloseModal,
    setDataModal,
    setRecomendations,
    SetdataType,
    setdataOptional,
    dark_theme_letters
  } = useContext(DataContext);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleOpenModal = () => {
    setOpenModal(true);
    setCloseModal(true);
    setDataModal(props.data);
    setRecomendations(props.recomendaciones);
    SetdataType(props.type);
    setdataOptional(props.optionalData);
  };


  const data = [
    {
      type: "indicator",
      mode: "gauge+number+delta",
      value: props.data,
      title: {
        text: props.type,
        font: { size: 20, color: dark_theme_letters ? "white" :'black', family: "Inter, sans-serif" }
      },
      delta: {
        reference: 0,
        increasing: { color: "#0077B6" }
      },
      gauge: {
        axis: {
          range: [(props.type === "Temperatura") ? -50 : props.min, (props.type === "Temperatura") ? 100 : props.max],
          tickwidth: 1.5,
          tickcolor: "#A0A0A0",
          tickfont: { color: dark_theme_letters ? "white" :'black' }
        },
        bar: { color: props.color },
        paper_bgcolor: 'rgba(255, 255, 255, 0.2)',
        borderwidth: 2,
        bordercolor: "#E0E0E0",
        steps: [
          { range: [props.min, (props.type === "Temperatura") ? -5 : 4], color: "#E3F2FD" },
          { range: [(props.type === "Temperatura") ? -5 : props.recomendedLimit, (props.type === "Temperatura") ? 36 : 0], color: "#BBDEFB" }
        ],
        threshold: {
          line: { color: "#D32F2F", width: 4 },
          thickness: 0.75,
          value: (props.type === "Temperatura") ? ((props.data < 0) ? -5 : 41) : props.recomendedLimit,

        }
      }
    }
  ];

  const layout = {
    autosize: true,
    margin: { t: 60, r: 20, l: 40, b: 20 },
    font: { color: "#000000ff", family: "Inter, sans-serif" },
    paper_bgcolor: 'rgba(255, 255, 255, 0)',
    plot_bgcolor: 'rgba(255, 255, 255, 0)',
    
    font: { color: dark_theme_letters ? "white" :'black'}
  };
  return (
    <Box
      sx={{
        p: 2,
        width: isMobile ? "100%" : "220px",
        textAlign: "center",
        borderRadius:'10px'  
      }}
    >
      <Stack alignItems="center" spacing={1}>
        <Plotly style={{ height: '150px', width: '220px'}} data={data} layout={layout} />
        {/*<ReactApexChart
          options={options}
          series={series}
          type="radialBar"
          height={220}
        />*/}
        <Button variant="outlined" color={dark_theme_letters ? 'white': 'black'} size="small" sx={{ width: '100%' ,color: dark_theme_letters ? "white" :'black'}} onClick={handleOpenModal}>
          Ver Detalles
        </Button>
      </Stack>
    </Box>
  );
};

export default IndicatorGraph;
