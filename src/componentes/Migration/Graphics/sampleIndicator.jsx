import ReactApexChart from "react-apexcharts";
const SampleIndicator = (props) => {
    const valueColor = (props.data <= 25 ? '#3fc555ff' : (props.data > 25 && props.data < 51) ? "#3fa6c5ff" : (props.data > 50 && props.data < 75 ? "#F18B00" : (props.data > 50 && props.data > 75) ? "#c53f3fff" : 'black'))
    var options = {
        colors: [
            props.title === 'Visibilidad'
                ? (props.data <= 25
                    ? '#c53f3fff'        
                    : props.data <= 50
                        ? '#F18B00'    
                        : props.data <= 75
                            ? '#3fa6c5ff' 
                            : '#3fc555ff'
                )
                : valueColor
        ],
        chart: {
            height: 280,
            type: "radialBar"
        },
        tooltip: {
            enabled: true,

            custom: function ({ series, w }) {
                return w?.config?.labels[0];
            }

        },
        plotOptions: {
            radialBar: {
                hollow: {
                    margin: 15,
                    size: '60%',
                },

                dataLabels: {
                    showOn: "always",
                    name: {
                        offsetY: -10,
                        show: false,
                        color: "#888",
                        fontSize: "20px"
                    },
                    value: {
                        offsetY: 9,
                        color: "#111",
                        fontSize: "15px",
                        show: true,
                        fontFamily: "Inter"
                    }
                }
            }
        },

        stroke: {
            lineCap: "round",
        },
        labels: [props.title],

    };
    const series = props.data

    return (
        <ReactApexChart options={options} series={[series]} type="radialBar"
            height={props.sizeGraph} />
    )
}
export default SampleIndicator;