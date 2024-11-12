import React, { useEffect, useState } from 'react';
import Orders from '../../components/Orders/Orders';
import Statistics from '../../components/Statistics/Statistics';
import { groupNumber } from '../../data';
import css from './Dashboard.module.css';

const Dashboard = () => {
  const [sensorData, setSensorData] = useState({
    temperature: 0,
    humidity: 0,
    light: 0,
  });

  useEffect(() => {
    // Function to fetch data from API
    const fetchSensorData = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/datasensor');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        
        // Assuming the response is an array of data rows, get the latest entry
        if (data.length > 0) {
          const latestData = data[data.length - 1];
          setSensorData({
            temperature: latestData.temperature,
            humidity: latestData.humidity,
            light: latestData.light,
          });
        }
      } catch (error) {
        console.error("Error fetching sensor data:", error);
      }
    };

    // Initial fetch
    fetchSensorData();

    // Polling every 5 seconds
    const interval = setInterval(fetchSensorData, 5000);
    return () => clearInterval(interval);
  }, []);

  // Cards data updated dynamically
  const cardsData = [
    {
      title: "Temperature",
      amount: sensorData.temperature,
      unit: "°C",
      color: "#FF5733", // Màu sắc cho Temperature
    },
    {
      title: "Humidity",
      amount: sensorData.humidity,
      unit: "%",
      color: "#33FF57", // Màu sắc cho Humidity
    },
    {
      title: "Light",
      amount: sensorData.light,
      unit: "lx",
      color: "#3357FF", // Màu sắc cho Light
    },
  ];

  return (
    <div className={css.container}>
      {/* left side */}
      <div className={css.dashboard}>
        <div className={`${css.dashboardHead} theme-container`}>
          <div className={css.head}>
            <span>Room Condition</span>
          </div>
          <div className={css.cards}>
            {cardsData.map((card, index) => (
              <div key={index} className={css.card} style={{ borderColor: card.color }}>
                <div className={css.cardHead}>
                  <span>{card.title}</span>
                  <span>{card.unit}</span>
                </div>
                <div className={css.cardAmount}>
                  <span>{groupNumber(card.amount)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        <Statistics />
      </div>
      <Orders />
    </div>
  );
};

export default Dashboard;