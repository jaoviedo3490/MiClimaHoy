import React from "react";

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

  // Determinar unidad

  // Usar rango real (no porcentaje)
  /*const min = props.min ?? 0;
  const max = props.max ?? 100;
  const value = props.data ?? 0;

  // Calcular cuánto se llena el gauge (ApexCharts solo acepta 0–100)
  const fillPercent = ((value - min) / (max - min)) * 100;*/

  /*const options = {
    chart: {
      type: "radialBar",
      sparkline: { enabled: true },
      animations: {
        enabled: true,
        easing: "easeinout",
        speed: 800,
      },
    },
    plotOptions: {
      radialBar: {
        startAngle: 0,
        endAngle: 360,
        hollow: {
          size: "70%",
          background: "#fff",
        },
        track: {
          background: "#f2f2f2",
          strokeWidth: "100%",
        },
        dataLabels: {
          name: {
            show: true,
            color: "#555",
            fontSize: isMobile ? "13px" : "14px",
            offsetY: 20,
            formatter: () => props.type || "",
          },
          value: {
            show: true,
            color: "#333",
            fontSize: isMobile ? "22px" : "24px",
            fontWeight: 700,
            offsetY: -10,
            formatter: () => `${value.toFixed(1)}${unit}`,
          },
        },
      },
    },
    fill: {
      colors: [props.color],
      type: "solid",
    },
    stroke: {
      lineCap: "round",
    },
    labels: [props.type || "Metric"],
  };

  const series = [fillPercent]; // ApexCharts necesita porcentaje, pero mostramos valor real
*/
  const data = [
    {
      type: "indicator",
      mode: "gauge+number+delta",
      value: props.data,
      title: {
        text: props.type,
        font: { size: 20, color: "#2E2E2E", family: "Inter, sans-serif" }
      },
      delta: {
        reference: 0,
        increasing: { color: "#0077B6" }
      },
      gauge: {
        axis: {
          range: [(props.type === "Temperatura") ? -50 : 0, (props.type === "Temperatura") ? 100 : 20],
          tickwidth: 1.5,
          tickcolor: "#A0A0A0",
          tickfont: { color: "#444" }
        },
        bar: { color: props.color },
        paper_bgcolor: 'rgba(255, 255, 255, 0.2)',
        borderwidth: 2,
        bordercolor: "#E0E0E0",
        steps: [
          { range: [props.min, (props.type === "Temperatura") ? -5 : 4], color: "#E3F2FD" },
          { range: [(props.type === "Temperatura") ? -5 : 0, (props.type === "Temperatura") ? 36 : 10], color: "#BBDEFB" }
        ],
        threshold: {
          line: { color: "#D32F2F", width: 4 },
          thickness: 0.75,
          value: (props.type === "Temperatura") ? ((props.data < 0) ? -5 : 41) : 11,

        }
      }
    }
  ];

  const layout = {
    autosize: true,
    margin: { t: 60, r: 20, l: 40, b: 20 },
    font: { color: "#212121", family: "Inter, sans-serif" },
    paper_bgcolor: 'rgba(255, 255, 255, 0.2)',
    plot_bgcolor: 'rgba(255, 255, 255, 0.2)',
    
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
        <Button variant="outlined" color='black' size="small" sx={{ width: '100%' ,color:'black'}} onClick={handleOpenModal}>
          Ver Detalles
        </Button>
      </Stack>
    </Box>
  );
};

export default IndicatorGraph;
