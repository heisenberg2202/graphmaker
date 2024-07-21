import React, { useState, useRef } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { Line } from 'react-chartjs-2';

import './App.css';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

function App() {
  const [xValues, setXValues] = useState('');
  const [yValues, setYValues] = useState('');
  const chartRef = useRef(null);

  const handlePlot = () => {
    const x = xValues.split(',').map(Number);
    const y = yValues.split(',').map(Number);

    if (chartRef.current) {
      chartRef.current.data.labels = x;
      chartRef.current.data.datasets[0].data = y;
      chartRef.current.update();
    }
  };

  const data = {
    labels: [],
    datasets: [
      {
        label: 'My Graph',
        data: [],
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
    ],
  };

  return (
    <div className="App">
      <h1 className = "Title">Graph Maker</h1>
      <h2 className='subtitle'>Add x and y axis values</h2>
      <div className='container'>
        <input 
          type="text" 
          placeholder="X values (comma-separated)" 
          value={xValues} 
          className='inputbox'
          onChange={(e) => setXValues(e.target.value)} 
        />
        <input 
          type="text" 
          placeholder="Y values (comma-separated)" 
          value={yValues} 
          className='inputbox'
          onChange={(e) => setYValues(e.target.value)} 
        />
        <button className='plot-btn' onClick={handlePlot}>Plot</button>
      </div>
      <div className='chart'>
        <Line ref={chartRef} data={data} />
      </div>
    </div>
  );
}

export default App;