import React, { useState, useEffect } from 'react';
import css from './Statistics.module.css';
import StatisticsChart from '../StatisticsChart/StatisticsChart';

const Statistics = () => {
    const [temperatureData, setTemperatureData] = useState([]);
    const [humidityData, setHumidityData] = useState([]);
    const [lightData, setLightData] = useState([]);
    const [timeLabels, setTimeLabels] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:8000/api/datasensor');
                const data = await response.json();

                const temperatureValues = data.map((item) => item.temperature);
                const humidityValues = data.map((item) => item.humidity);
                const lightValues = data.map((item) => item.light);
                const times = data.map((item) => new Date(item.time).toLocaleString());

                setTemperatureData(temperatureValues);
                setHumidityData(humidityValues);
                setLightData(lightValues);
                setTimeLabels(times);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
        const interval = setInterval(fetchData, 5000); // Lấy dữ liệu mới sau mỗi 5 giây

        return () => clearInterval(interval);
    }, []);

    return (
        <div className={`${css.container} theme-container`}>
            <div className={css.head}>
                <span className={css.title}>Chart</span>
            </div>
            <div className={css.chartRow}>
                <StatisticsChart 
                    temperatureData={temperatureData} 
                    humidityData={humidityData} 
                    lightData={lightData} 
                    labels={timeLabels} 
                />
            </div>
        </div>
    );
};

export default Statistics;
