
import { lazy } from "react";
import { Box, Stack, Button } from "@mui/material";
import { DataContext } from "../../../Context/MetricsContext";
import { Ui_Context } from "../../../Context/Ui-Context";
import { Suspense, useContext } from "react";
import { useMediaQuery, useTheme } from "@mui/material";
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { opcionesMedidor } from "./medidorEcharts";
// ECharts ya lo usan los detalles y el árbol; antes estos medidores cargaban Plotly (1,3 MB comprimido)
const ReactECharts = lazy(() => import("echarts-for-react"));

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
        <Suspense fallback={<div>Cargando Grafica...</div>}>
        <ReactECharts style={{ height: '150px', width: '220px' }} option={opcionesMedidor(props, isDay_global)} />
        </Suspense>
        <Button variant="outlined" endIcon={<RemoveRedEyeIcon />} color={isDay_global ? 'white': 'black'} size="small" sx={{ width: '100%' ,color: isDay_global ? "white" :'black'}} onClick={()=>handleOpenModal(true)}>
          Ver Detalles
        </Button>
      </Stack>
    </Box>
  );
};

export default IndicatorGraph;
