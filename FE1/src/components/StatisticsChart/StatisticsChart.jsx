import ReactECharts from 'echarts-for-react';
import * as echarts from 'echarts';

const StatisticsChart = ({ temperatureData, humidityData, lightData, labels }) => {
    const option = {
        title: {
            text: 'Sensor Data',
            left: 'center',
        },
        color: ['#FF5733', '#33FF57', '#3357FF'], // Màu sắc cho các loại dữ liệu
        toolbox: {
            feature: {
                saveAsImage: {},
            }
        },
        tooltip: {
            trigger: "axis",
            axisPointer: {
                type: "cross"
            },
            backgroundColor: "rgba(0, 0, 0, 0.59)",
            borderWidth: 0,
        },
        grid: {
            left: "3%",
            right: "4%",
            bottom: "3%",
            containLabel: true,
            show: false,
        },
        xAxis: [
            {
                type: "category",
                boundaryGap: false,
                data: labels
            }
        ],
        yAxis: [
            {
                type: "value",
                min: 0,
                max: 1000, // Tăng giá trị tối đa của trục y lên 1000
                splitLine: {
                    show: false,
                }
            }
        ],
        series: [
            {
                name: 'Temperature',
                type: "line",
                smooth: true,
                data: temperatureData,
                lineStyle: {
                    color: '#FF5733'
                },
                areaStyle: {
                    opacity: .5,
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 0.8, [
                        {
                            offset: 0,
                            color: "#FF5733"
                        },
                        {
                            offset: 1,
                            color: "rgba(255,87,51,0.1)"
                        }
                    ])
                },
            },
            {
                name: 'Humidity',
                type: "line",
                smooth: true,
                data: humidityData,
                lineStyle: {
                    color: '#33FF57'
                },
                areaStyle: {
                    opacity: .5,
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 0.8, [
                        {
                            offset: 0,
                            color: "#33FF57"
                        },
                        {
                            offset: 1,
                            color: "rgba(51,255,87,0.1)"
                        }
                    ])
                },
            },
            {
                name: 'Light',
                type: "line",
                smooth: true,
                data: lightData,
                lineStyle: {
                    color: '#3357FF'
                },
                areaStyle: {
                    opacity: .5,
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 0.8, [
                        {
                            offset: 0,
                            color: "#3357FF"
                        },
                        {
                            offset: 1,
                            color: "rgba(51,87,255,0.1)"
                        }
                    ])
                },
            }
        ]
    };

    return (
        <ReactECharts option={option} />
    );
};

export default StatisticsChart;