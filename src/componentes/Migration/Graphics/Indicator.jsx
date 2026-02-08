

import { Box, Stack, Button } from "@mui/material";
import { DataContext } from "../../../Context/MetricsContext";
import { Ui_Context } from "../../../Context/Ui-Context";
import { useContext } from "react";
import { useMediaQuery, useTheme } from "@mui/material";
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import Plotly from "react-plotly.js";

const IndicatorGraph = (props) => {
const { isDay_global} = useContext(DataContext);
const {setOpenModal,setCloseModal,setDataModal,setRecomendations, setDataType,setDataOptional, setTypeModal} = useContext(Ui_Context);



  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleOpenModal = (param) => {
    setTypeModal(param ? 'GAUGE' : 'GENERAL');
    setOpenModal(true);
    setCloseModal(true);
    setDataModal(props.data);
    setRecomendations(props.recomendaciones);
    setDataType(props.type);
    setDataOptional(props.optionalData);
  };


  const data = [
    {
      type: "indicator",
      mode: "gauge+number+delta",
      value: props.data,
      title: {
        text: props.type,
        font: { size: 20, color: isDay_global ? "white" :'black', family: "Inter, sans-serif" }
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
          tickfont: { color: isDay_global ? "white" :'black' }
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
          value: (props.type === "Temperatura") ? ((props.data < 0) ? -5 : 37) : props.recomendedLimit,

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
    
    font: { color: isDay_global ? "white" :'black'}
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
        <Button variant="outlined" endIcon={<RemoveRedEyeIcon />} color={isDay_global ? 'white': 'black'} size="small" sx={{ width: '100%' ,color: isDay_global ? "white" :'black'}} onClick={()=>handleOpenModal(true)}>
          Ver Detalles
        </Button>
      </Stack>
    </Box>
  );
};

export default IndicatorGraph;
