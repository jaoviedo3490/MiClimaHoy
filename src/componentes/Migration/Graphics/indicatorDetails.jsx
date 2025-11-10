import ReactECharts from "echarts-for-react";
import { Box, Stack } from "@mui/material";
import { Button } from "@mui/material";
import { DataContext } from "../../../Context/MetricsContext";
import { useContext } from "react";
import { useMediaQuery, useTheme } from "@mui/material";
const IndicatorDetails = (props) => {
    const { dark_theme_letters, setDarkLetters } = useContext(DataContext);
    const theme = useTheme();

    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const value = (props.type === 'Temperatura') ? 90 : (props.type === 'Radiacion UV') ? 16 : 0;
    const ValuePercentaje = (props.valor < 0) ? (Math.round((props.valor * -1) * 100 / 40)) : (Math.round(props.valor * 100 / value));
    const ValuePercentajeOptional = (props.valorOpcional < 0) ? (Math.round((props.valorOpcional * -1) * 100 / 40)) : (Math.round(props.valorOpcional * 100 / value));
    const graphType = (props.GraphType !== undefined ? 1 : 0);
    const dataColor =
        props.type === 'Visibilidad'
            ? props.valor > 10
                ? '#3fa6c5ff'
                : props.valor > 5
                    ? '#3fc555ff' 
                    : props.valor > 1
                        ? '#F18B00'
                        : props.valor >= 0
                            ? '#c53f3fff' 
                            : '#3fa6c5ff' 
            : props.valor >= 75
                ? '#c53f3fff' 
                : props.valor >= 50
                    ? '#F18B00' 
                    : props.valor > 0
                        ? '#3fc555ff'
                        : 'black'; 

    const dataT = [{
        value: ValuePercentaje,
        name: props.title1,
        title: { offsetCenter: ['0%', '-60%'] },
        detail: { valueAnimation: true, offsetCenter: ['0%', '-40%'] }
    },
    {
        value: ValuePercentajeOptional,
        name: props.title2,
        title: { offsetCenter: ['0%', '-10%'] },
        detail: { valueAnimation: true, offsetCenter: ['0%', '10%'] }
    }, {
        value: (props.valor < 0) ? (Math.round(20 * 100 / 40)) : (Math.round(37 * 100 / value)),
        name: 'Rango Saludable',
        title: { offsetCenter: ['0%', '35%'] },
        detail: { valueAnimation: true, offsetCenter: ['0%', '55%'] }
    }];

    const dataR = [{
        value: (Math.round(props.valor * 100 / value)),
        name: props.title1,
        title: { offsetCenter: ['0%', '-30%'] },
        detail: { valueAnimation: true, offsetCenter: ['0%', '-10%'] }
    },
    {
        value: (Math.round(props.valorOpcional * 100 / value)),
        name: props.title2,
        title: { offsetCenter: ['0%', '10%'] },
        detail: { valueAnimation: true, offsetCenter: ['0%', '30%'] }
    }];

    const dataGeneric = [{
        value: (props.type === 'Visibilidad') ? (Math.round(props.valor * 100 / 15)) : props.valor,
        name: props.title1,
        title: { offsetCenter: ['0%', '0%'] },
        detail: { valueAnimation: true, offsetCenter: ['10%', '0%'] },
        itemStyle: { color: dataColor }
    }];

    const toolBoxOption = (graphType === 1 ? {} : {
        show: true,
        feature: {
            dataView: { show: true, readOnly: true },
            restore: { show: true },
            saveAsImage: { show: true },
        },
    })
    const gaugeData = (props.type === 'Temperatura') ? dataT : (props.type === 'Radiacion UV' ? dataR : dataGeneric);

    const option = {
        tooltip: {
            show: true,
            formatter: (props.type === 'Visibilidad') ? `{b}: ${props.valor} Km` : '{b}: {c}%',
        }, legend: {
            show: true,
            orient: 'vertical',
            right: 10,
            top: 'center',
        },//, toolbox: toolBoxOption
        series: [
            {
                type: 'gauge',
                startAngle: 90,
                endAngle: -270,
                pointer: { show: false },
                progress: {
                    show: true,
                    overlap: false,
                    roundCap: true,
                    clip: false,
                    itemStyle: { borderWidth: 1, borderColor: '#464646' }
                },
                axisLine: { lineStyle: { width: graphType === 1 ? 7 : 20 } },
                splitLine: { show: false, distance: 10, length: 50 },
                axisTick: { show: false },
                axisLabel: { show: false, distance: 10 },
                data: gaugeData,
                title: { fontSize: graphType === 1 ? 0 : 10 },
                detail: {
                    width: 30,
                    height: 10,
                    fontSize: 12,
                    color: 'inherit',
                    borderColor: 'inherit',
                    borderRadius: 20,
                    borderWidth: graphType === 1 ? 0 : 1,
                    formatter: (props.type === 'Visibilidad' ? `${props.valor}KM` : '{value}%')
                }
            }
        ]
    };

    return (
        <Box sx={{ width: graphType === 1 ? 200 : 300, height: graphType === 1 ? 200 : 300 }}>
            <Stack direction='column' spacing={0}>
                <ReactECharts option={option} style={{ width: isMobile ? 350 : graphType === 1 ? 150 : 250, height: graphType === 1 ? 100 : 250 }} />
            </Stack>
        </Box>
    );
}
export default IndicatorDetails;