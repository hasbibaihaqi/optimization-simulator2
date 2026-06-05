import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const ConvergenceChart = ({ historyData, algorithmName }) => {
  // 1. PENGAMANAN: Mencegah blank screen jika data kosong
  if (!historyData || !Array.isArray(historyData) || historyData.length === 0) {
    return (
      <div className="h-[300px] flex items-center justify-center text-gray-400 bg-gray-50 border border-dashed border-gray-300 rounded">
        Menunggu data konvergensi dari backend...
      </div>
    );
  }

  // 2. Ekstraksi Data Secara Aman
  const labels = historyData.map((_, index) => `Iter ${index + 1}`);
  const dataPoints = historyData.map(step => step.current_energy !== undefined ? step.current_energy : (step.energy !== undefined ? step.energy : (step.fitness || 0)));
  
  const datasets = [
    {
      label: `Best Cost (${algorithmName || 'Algoritma'})`,
      data: dataPoints,
      borderColor: '#34d399', // Emerald 400
      backgroundColor: 'rgba(52, 211, 153, 0.1)',
      borderWidth: 2,
      pointRadius: 0,
      tension: 0.1,
      fill: true,
      yAxisID: 'y',
    }
  ];

  // Tambahkan Average Fitness jika ada (untuk GA)
  if (historyData[0] && historyData[0].average_fitness !== undefined) {
    datasets.push({
      label: 'Average Population Cost',
      data: historyData.map(step => step.average_fitness),
      borderColor: '#facc15', // Yellow 400
      backgroundColor: 'transparent',
      borderWidth: 2,
      borderDash: [5, 5], // Dashed line
      pointRadius: 0,
      tension: 0.1,
      fill: false,
      yAxisID: 'y',
    });
  }

  // Tambahkan Temperature jika ada (untuk SA)
  let hasTemperature = false;
  if (historyData[0] && historyData[0].temperature !== undefined) {
    hasTemperature = true;
    datasets.push({
      label: 'Temperature',
      data: historyData.map(step => step.temperature),
      borderColor: '#fb923c', // Orange 400
      backgroundColor: 'transparent',
      borderWidth: 2,
      pointRadius: 0,
      tension: 0.1,
      fill: false,
      yAxisID: 'y1',
    });
    
    // Titik dimana SA menerima solusi yang lebih buruk (Boltzmann)
    const acceptedWorseData = historyData.map(step => 
      step.accepted_worse ? step.current_energy : null
    );
    
    // Pastikan ada setidaknya satu true
    if (acceptedWorseData.some(val => val !== null)) {
      datasets.push({
        label: 'Accepted Worse (Boltzmann)',
        data: acceptedWorseData,
        backgroundColor: '#ef4444', // Red 500
        borderColor: '#ef4444',
        borderWidth: 0,
        pointRadius: 4,
        pointStyle: 'circle',
        showLine: false,
        yAxisID: 'y',
      });
    }
  }

  const data = {
    labels,
    datasets,
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { 
        position: 'top',
        labels: {
          color: '#cbd5e1' // slate-300
        }
      },
      title: { display: false },
      tooltip: {
        mode: 'index',
        intersect: false,
        backgroundColor: 'rgba(15, 23, 42, 0.9)',
        titleColor: '#f8fafc',
        bodyColor: '#cbd5e1',
        borderColor: 'rgba(255,255,255,0.1)',
        borderWidth: 1
      }
    },
    scales: {
      y: { 
        type: 'linear',
        display: true,
        position: 'left',
        title: { display: true, text: 'Nilai Fitness (Cost)', color: '#cbd5e1' },
        grid: { color: 'rgba(255, 255, 255, 0.05)' },
        ticks: { color: '#94a3b8' }
      },
      y1: {
        type: 'linear',
        display: hasTemperature, // Only display if temperature exists
        position: 'right',
        title: { display: true, text: 'Temperature', color: '#fb923c' },
        grid: { drawOnChartArea: false }, // Don't draw grid lines over main y axis
        ticks: { color: '#fb923c' }
      },
      x: { 
        title: { display: true, text: 'Iterasi / Generasi', color: '#cbd5e1' }, 
        grid: { color: 'rgba(255, 255, 255, 0.05)' },
        ticks: { maxTicksLimit: 10, color: '#94a3b8' } 
      }
    },
  };

  return (
    <div className="w-full h-[300px]">
      <Line data={data} options={options} />
    </div>
  );
};

export default ConvergenceChart;