"use client";

import { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2'; // Importera Line-typ från Chart.js
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

// Registrera de nödvändiga komponenterna för Chart.js
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const GraphComponent = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    // Hämta datan från backend
    fetch('http://localhost:8080/api/data') // Din Flask-API-url
      .then((response) => response.json())
      .then((jsonData) => {
        setData(jsonData);
      })
      .catch((err) => console.error('Fel vid hämtning av data:', err));
  }, []);

  if (!data) {
    return <p>Laddar data...</p>;
  }

  // Förbered datan för Chart.js
  const chartData = {
    labels: data.x, // x-värden för axeln
    datasets: [
      {
        label: 'Exempelgraf',
        data: data.y, // y-värden för linjen
        borderColor: 'rgb(85, 93, 93)', // Linjefärg
        tension: 2, // Hur mycket linjen ska böjas
      },
    ],
  };

  return (
    <div>
      <h2 className='text-gray-700'>Min graf från backend:</h2>
      <Line data={chartData} />
    </div>
  );
};

export default GraphComponent;