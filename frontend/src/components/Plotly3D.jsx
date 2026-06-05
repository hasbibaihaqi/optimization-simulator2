import React from 'react';
import Plot from 'react-plotly.js';

const Plotly3D = ({ surfaceData, historyData }) => {
  // 1. PENGAMANAN: Jika data history tidak ada, tampilkan pesan aman (mencegah blank screen)
  if (!historyData || !Array.isArray(historyData)) {
    return (
      <div className="h-[400px] flex items-center justify-center text-gray-400 bg-gray-50 border border-dashed rounded">
        Menunggu data 3D dari backend...
      </div>
    );
  }

  // 2. Ekstrak koordinat X, Y, Z secara aman menggunakan fallback (|| 0)
  const xPath = historyData.map(step => (step.current_state && step.current_state[0]) || 0);
  const yPath = historyData.map(step => (step.current_state && step.current_state[1]) || 0);
  // Backend mengirim 'current_energy' untuk semua algoritma (GA juga akan menyimpannya sbg current_energy di base_optimizer)
  const zPath = historyData.map(step => step.current_energy !== undefined ? step.current_energy : (step.energy !== undefined ? step.energy : (step.fitness || 0)));

  const data = [];

  // 3. Tambahkan lanskap 3D (HANYA jika backend mengirimkan data surface)
  if (surfaceData && surfaceData.x && surfaceData.y && surfaceData.z) {
    data.push({
      z: surfaceData.z,
      x: surfaceData.x,
      y: surfaceData.y,
      type: 'surface',
      colorscale: 'Viridis',
      opacity: 0.8,
      name: 'Landscape'
    });
  }

  // 4. Tambahkan garis jejak pergerakan algoritma
  data.push({
    x: xPath,
    y: yPath,
    z: zPath,
    type: 'scatter3d',
    mode: 'lines+markers',
    marker: { size: 4, color: '#e83e8c' }, // Warna magenta ala AdminLTE
    line: { color: '#e83e8c', width: 3 },
    name: 'Algorithm Path'
  });

  return (
    <div className="w-full min-h-[400px]">
      <Plot
        data={data}
        layout={{
          autosize: true,
          margin: { l: 0, r: 0, b: 0, t: 0 }, // Hilangkan margin berlebih
          scene: {
            xaxis: { title: 'Sumbu X' },
            yaxis: { title: 'Sumbu Y' },
            zaxis: { title: 'Nilai Fitness' }
          },
          paper_bgcolor: 'transparent',
          plot_bgcolor: 'transparent'
        }}
        useResizeHandler={true}
        style={{ width: '100%', height: '400px' }}
      />
    </div>
  );
};

export default Plotly3D;