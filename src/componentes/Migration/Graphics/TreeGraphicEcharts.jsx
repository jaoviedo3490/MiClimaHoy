import React from "react";
import ReactECharts from "echarts-for-react";
import { Box, Stack } from "@mui/material";
import { useMediaQuery, useTheme } from "@mui/material";
// import { DataContext } from "../../../Context/MetricsContext"; // si no lo usas, mejor comentarlo o borrarlo

const TreeGraphicEchart = (props) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

    

    // TODO: reemplazar esto con tu data real
    const QualityAir = [
        {
            name: "Calidad del Aire",
            value: 'N/A',
            children: [
                { name: "Monoxido de Carbono", value: props.data.CO },
                { name: "Dioxido de Azufre", value: props.data.SO2 },
                { name: "Dioxido de Nitrogeno", value: props.data.NO2 },
                { name: "Materia Particulada", value: props.data.PM2_5 },
                { name: "Ozono", value: props.data.O3 },
                { name: "Particulas en susprencion", value: props.data.PM10 },
                

            ],
        },
    ];

    // Versión simple de niveles, puedes ajustarla luego
    const getLevelOption = () => [
        {
            itemStyle: {
                borderColor: 'rgba(255, 255, 255, 0)',
                borderWidth: 1,
                gapWidth: 2,
            },
            upperLabel: {
                show: true,
                height: 30,
            },
        },
        {
            itemStyle: {
                gapWidth: 1,
            },
        },
    ];

    const option = {
        title: {
            text: "",
            left: "center",
            textStyle: {
                fontSize: 14,
            },
        },
        tooltip: {
            formatter: function (info) {
                const value = info.value;
                const treePathInfo = info.treePathInfo;
                const treePath = [];
                for (let i = 1; i < treePathInfo.length; i++) {
                    treePath.push(treePathInfo[i].name);
                }
                return `
          <div class="tooltip-title">${treePath.join("/")}</div>
          Valor Porcentaje: ${value} ppm
        `;
            },
        },
        series: [
            {
                name: "",
                type: "treemap",
                visibleMin: 0,
                label: {
                    show: true,
                    formatter: "{b}",
                },
                upperLabel: {
                    show: true,
                    height: 20,
                },
                itemStyle: {
                    borderColor: 'rgba(255, 255, 255, 0)',
                },
                levels: getLevelOption(),
                data: QualityAir,
            },
        ],
    };

    return (
        <Box
            sx={{
                width: isMobile ? "100%" : 300,
                height: 300,
            }}
        >
            <Stack direction="column" spacing={0} sx={{ width: "100%", height: "100%" }}>
                <ReactECharts
                    option={option}
                    style={{ width: "100%", height: "100%" }}
                />
            </Stack>
        </Box>
    );
};

export default TreeGraphicEchart;
