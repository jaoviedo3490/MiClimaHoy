import { Box, Card, CardContent, Button, ButtonGroup, Typography, Toolbar, Stack } from "@mui/material";
import ReactECharts from "echarts-for-react";
const IndicatorGraph = (props) => {
    const option = {
        series: [{
                type: 'gauge',
                center: ['50%', '100%'],
                startAngle: 200,
                endAngle: -20,
                min: props.min,
                max: props.max,
                interval: (props.max - props.min) / 10,
                itemStyle: { color: '#FFAB91' },
                progress: {
                    show: true,
                    width: 7
                }, pointer: { show: false },
                axisLine: {
                    lineStyle: { width: 10 }
                }, axisTick: {
                    distance: -45,
                    splitNumber: 10,
                    lineStyle: {
                        width: 2,
                        color: '#999'
                    }
                }, splitLine: {
                    distance: -52,
                    length: 14,
                    lineStyle: {
                        width: 3,
                        color: '#999'
                    }
                }, axisLabel: {
                    distance: -20,
                    color: '#999',
                    fontSize: 8
                }, anchor: { show: false },
                title: { show: false },
                detail: {
                    valueAnimation: true,
                    width: '60%',
                    lineHeight: 40,
                    borderRadius: 8,
                    offsetCenter: [0, '-15%'],
                    fontSize: 10,
                    fontWeight: 'bolder',
                    formatter: `{value} ${props.indicator}`,
                    color: 'inherit'
                }, data: [{ value: props.data }]
            }, {
                type: 'gauge',
                center: ['50%', '100%'],
                startAngle: 200,
                endAngle: -20,
                min: 0,
                max: 60,
                itemStyle: {
                    color: '#FD7347'
                }, progress: {
                    show: true,
                    width: 3
                }, pointer: { show: false },
                axisLine: { show: false },
                axisTick: { show: false },
                splitLine: { show: false },
                axisLabel: { show: false },
                detail: { show: false },
                data: [{ value: 100 }]
            }
        ]
    };
    return (
        <Box sx={{ width: '30%',height:'50%',}}>
            <ReactECharts style={{width:'100%', height:'100%'}} option={option} />
            <Button>Ver Detalles {props.type}</Button>
        </Box>
    )
}
export default IndicatorGraph;