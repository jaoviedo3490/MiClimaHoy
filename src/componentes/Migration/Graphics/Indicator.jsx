import ReactECharts from "echarts-for-react";
import { Box, Stack } from "@mui/material";
import { Button } from "@mui/material";
import { DataContext } from "../../../Context/MetricsContext";
import { useContext } from "react";
import { useMediaQuery, useTheme } from "@mui/material";
const IndicatorGraph = (props) => {

    const { setOpenModal } = useContext(DataContext);
    const { setCloseModal } = useContext(DataContext);
    const { setDataModal } = useContext(DataContext);
    const { setRecomendations } = useContext(DataContext);
    const { dataType, SetdataType } = useContext(DataContext);
    const { dataOptional, setdataOptional } = useContext(DataContext);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const handleOpenModal = () => {
        setOpenModal(true);
        setCloseModal(true);
        setDataModal(props.data);
        setRecomendations(props.recomendaciones);
        SetdataType(props.type);
        setdataOptional(props.optionalData)
    }
    const option = {
        toolbox: {
            show: true,
            feature: {
                restore: { show: true },
                saveAsImage: { show: true },
            },
        },
        series: [
            {
                type: "gauge",
                startAngle: 180,
                endAngle: 0,
                min: props.min,
                max: props.max,
                splitNumber: props.split,
                itemStyle: {
                    color: props.color,//"#58D9F9",
                    shadowColor: "rgba(0,138,255,0.45)",
                    shadowBlur: 10,
                    shadowOffsetX: 2,
                    shadowOffsetY: 2,
                },
                progress: {
                    show: true,
                    roundCap: true,
                    width: isMobile ? 7 : 5,
                },
                pointer: {
                    icon: "path://M2090.36389,615.30999 L2090.36389,615.30999 C2091.48372,615.30999 2092.40383,616.194028 2092.44859,617.312956 L2096.90698,728.755929 C2097.05155,732.369577 2094.2393,735.416212 2090.62566,735.56078 C2090.53845,735.564269 2090.45117,735.566014 2090.36389,735.566014 L2090.36389,735.566014 C2086.74736,735.566014 2083.81557,732.63423 2083.81557,729.017692 C2083.81557,728.930412 2083.81732,728.84314 2083.82081,728.755929 L2088.2792,617.312956 C2088.32396,616.194028 2089.24407,615.30999 2090.36389,615.30999 Z",
                    length: isMobile ? '50%' : "40%",
                    width: 5,
                    offsetCenter: [0, "5%"],
                },
                axisLine: {
                    roundCap: true,
                    lineStyle: { width: isMobile ? 15 : 10 },
                },
                axisTick: {
                    splitNumber: 2,
                    lineStyle: { width: 2, color: "#999" },
                },
                splitLine: {
                    length: 5,
                    lineStyle: { width: 3, color: "#999" },
                },
                axisLabel: {
                    distance: 15,
                    color: "#999",
                    fontSize: 10,
                },
                title: { show: false },
                detail: {
                    backgroundColor: "#fff",
                    borderColor: "#999",
                    borderWidth: 2,
                    width: isMobile ? '100%' : "60%",
                    lineHeight: 10,
                    height: 20,
                    borderRadius: 8,
                    offsetCenter: [0, "35%"],
                    valueAnimation: true,
                    formatter: (value) =>
                        `{value|${value.toFixed(0)}}{unit|${props.indicator}}`,
                    rich: {
                        value: {
                            fontSize: isMobile ? 15 : 10,
                            fontWeight: "bolder",
                            color: "#777",
                        },
                        unit: {
                            fontSize: isMobile ? 25 : 20,
                            color: "#999",
                            padding: [0, 0, -20, 10],
                        },
                    },
                },
                data: [{ value: props.data }],
            },
        ],
    };

    return (
        <Box sx={{ width: isMobile ? 370 : 250, height: isMobile ? 200 : 200 }}>
            <Stack direction='column' spacing={0}>
                <ReactECharts option={option} style={{ width: "100%", height: "200%" }} />
                <Button sx={{ width: '95%', marginTop: -5, marginLeft: 2 }} variant='outlined' onClick={handleOpenModal}>{props.type}</Button>
            </Stack>
        </Box>
    );
};

export default IndicatorGraph;
