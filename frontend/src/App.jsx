import React, { useState } from 'react';
import axios from 'axios';
import Plotly3D from './components/Plotly3D';
import ConvergenceChart from './components/ConvergenceChart';
import { 
  Activity, Play, Settings, Target, Clock, 
  Mountain, Flame, Dna, LayoutDashboard, 
  Users, Folder, ArrowRightCircle, Menu
} from 'lucide-react';

// --- Komponen Kartu Statistik ala Admin Dashboard ---
const StatCard = ({ bg, value, title, icon }) => (
  <div className={`${bg} rounded-sm shadow-md text-white relative overflow-hidden transition-transform hover:scale-[1.02]`}>
    <div className="p-5">
      <h3 className="text-4xl font-bold mb-2">{value}</h3>
      <p className="text-sm font-medium">{title}</p>
    </div>
    <div className="absolute top-4 right-4 opacity-20 transform scale-150">
      {icon}
    </div>
    <div className="block text-center py-1.5 bg-black/10 hover:bg-black/20 text-sm transition-colors cursor-pointer mt-2">
      More info <ArrowRightCircle size={14} className="inline ml-1" />
    </div>
  </div>
);

// --- Komponen Tombol Menu Sidebar ---
const SidebarMenu = ({ id, label, icon: Icon, activeAlgo, setActiveAlgo, setResult }) => {
  const isActive = activeAlgo === id;
  return (
    <button
      onClick={() => { setActiveAlgo(id); setResult(null); }}
      className={`w-full flex items-center gap-3 px-4 py-3 text-sm transition-colors ${
        isActive 
          ? 'bg-amber-400 text-white font-semibold border-l-4 border-amber-600' // Warna kuning/amber ala gambar target
          : 'text-gray-600 hover:bg-gray-100 border-l-4 border-transparent'
      }`}
    >
      <Icon size={18} className={isActive ? 'text-white' : 'text-gray-500'} />
      {label}
    </button>
  );
};


function App() {
  const [activeAlgo, setActiveAlgo] = useState('hc'); 
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const [params, setParams] = useState({
    hc_variant: 'simple',
    hc_max_iter: 500,
    hc_step_size: 0.1,
    sa_t0: 100,
    sa_cooling_rate: 0.95,
    ga_pop_size: 50,
    ga_generations: 100,
    ga_mutation_rate: 0.1,
    ga_crossover_rate: 0.8
  });

  const handleParamChange = (e) => {
    const { name, value } = e.target;
    setParams(prev => ({ ...prev, [name]: value }));
  };

  const runSimulation = async () => {
    setLoading(true);
    setResult(null); 
    
    let endpoint = '';
    let payload = {};

    if (activeAlgo === 'hc') {
      endpoint = '/api/optimize/hill-climbing';
      payload = { variant: params.hc_variant, max_iter: params.hc_max_iter, step_size: params.hc_step_size };
    } else if (activeAlgo === 'sa') {
      endpoint = '/api/optimize/simulated-annealing';
      payload = { t0: params.sa_t0, cooling_rate: params.sa_cooling_rate };
    } else if (activeAlgo === 'ga') {
      endpoint = '/api/optimize/genetic-algorithm';
      payload = { pop_size: params.ga_pop_size, generations: params.ga_generations, mutation_rate: params.ga_mutation_rate, crossover_rate: params.ga_crossover_rate };
    }

    try {
      const response = await axios.post(endpoint, payload);
      setResult(response.data);
    } catch (error) {
      console.error("Simulation failed:", error);
      alert("Gagal terhubung ke backend. Pastikan server Flask di port 5000 berjalan.");
    }
    setLoading(false);
  };

  return (
    <div className="flex h-screen bg-[#f4f6f9] font-sans text-gray-800 overflow-hidden">
      
      {/* SIDEBAR */}
      <aside className={`bg-white border-r border-gray-200 flex flex-col transition-all duration-300 z-20 ${sidebarOpen ? 'w-64' : 'w-0 -ml-64'} md:ml-0 md:w-64 shadow-lg`}>
        
        {/* User Profile Section */}
        <div className="flex items-center p-4 border-b border-gray-100 bg-gray-50">
          <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-xl shadow-sm">
            H
          </div>
          <div className="ml-3">
            <p className="text-sm font-bold text-gray-800">Hasbi Baihaqi</p>
            <p className="text-xs text-green-500 flex items-center gap-1 mt-0.5">
              <span className="w-2 h-2 rounded-full bg-green-500"></span> Guru
            </p>
          </div>
        </div>

        {/* Sidebar Navigation */}
        <nav className="flex-1 overflow-y-auto py-2">
          <div className="px-4 py-2 text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">
            Menu Utama
          </div>
          <SidebarMenu id="hc" label="Hill Climbing" icon={Mountain} activeAlgo={activeAlgo} setActiveAlgo={setActiveAlgo} setResult={setResult} />
          <SidebarMenu id="sa" label="Simulated Annealing" icon={Flame} activeAlgo={activeAlgo} setActiveAlgo={setActiveAlgo} setResult={setResult} />
          <SidebarMenu id="ga" label="Genetic Algorithm" icon={Dna} activeAlgo={activeAlgo} setActiveAlgo={setActiveAlgo} setResult={setResult} />
          
          <div className="px-4 py-2 text-xs font-bold text-gray-400 uppercase tracking-wider mb-1 mt-4">
            Pengaturan
          </div>
          <button className="w-full flex items-center gap-3 px-4 py-3 text-sm text-gray-600 hover:bg-gray-100 transition-colors">
            <Settings size={18} className="text-gray-500" /> Konfigurasi Sistem
          </button>
        </nav>
      </aside>

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        
        {/* TOP NAVBAR */}
        <header className="bg-white h-14 flex items-center justify-between px-4 border-b border-gray-200 shadow-sm z-10">
          <div className="flex items-center gap-4">
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-gray-500 hover:text-gray-700 focus:outline-none md:hidden">
              <Menu size={24} />
            </button>
            <h1 className="text-lg font-semibold text-gray-700 hidden sm:block">AI Optimization Simulator</h1>
          </div>
          
          {/* Breadcrumbs ala AdminLTE */}
          <div className="text-sm text-gray-500 flex items-center gap-2">
            <LayoutDashboard size={14} />
            <span>Home</span>
            <span>/</span>
            <span>Guru</span>
            <span>/</span>
            <span className="text-gray-800 font-medium">
              {activeAlgo === 'hc' ? 'Hill Climbing' : activeAlgo === 'sa' ? 'Simulated Annealing' : 'Genetic Algorithm'}
            </span>
          </div>
        </header>

        {/* PAGE CONTENT */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          
          {/* KARTU STATISTIK (Colorful Blocks) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
            <StatCard 
              bg="bg-[#e83e8c]" // Warna Pink/Magenta
              value={result ? result.history.length : "0"} 
              title="Total Iterasi / Generasi" 
              icon={<Activity size={60} />} 
            />
            <StatCard 
              bg="bg-[#17a2b8]" // Warna Tosca
              value={result ? result.best_energy.toFixed(4) : "0.00"} 
              title="Best Fitness (Cost)" 
              icon={<Target size={60} />} 
            />
            <StatCard 
              bg="bg-[#28a745]" // Warna Hijau
              value={result ? `${(result.execution_time * 1000).toFixed(0)} ms` : "0 ms"} 
              title="Waktu Eksekusi" 
              icon={<Clock size={60} />} 
            />
            <StatCard 
              bg="bg-[#fd7e14]" // Warna Oranye
              value={activeAlgo.toUpperCase()} 
              title="Algoritma Aktif" 
              icon={<Settings size={60} />} 
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* PANEL KIRI: FORM PARAMETER */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-sm shadow-sm border-t-[3px] border-[#007bff]">
                <div className="p-4 border-b border-gray-100 flex items-center gap-2">
                  <Settings size={18} className="text-gray-600" />
                  <h3 className="font-semibold text-gray-800">Parameter Algoritma</h3>
                </div>
                
                <div className="p-5 space-y-4">
                  {/* === INPUT HILL CLIMBING === */}
                  {activeAlgo === 'hc' && (
                    <>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Varian Pencarian</label>
                        <select name="hc_variant" value={params.hc_variant} onChange={handleParamChange} className="w-full border border-gray-300 rounded p-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none">
                          <option value="simple">Simple Ascent</option>
                          <option value="steepest">Steepest-Ascent</option>
                          <option value="stochastic">Stochastic</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Maksimal Iterasi</label>
                        <input type="number" name="hc_max_iter" value={params.hc_max_iter} onChange={handleParamChange} className="w-full border border-gray-300 rounded p-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Ukuran Langkah (Step Size)</label>
                        <input type="number" step="0.1" name="hc_step_size" value={params.hc_step_size} onChange={handleParamChange} className="w-full border border-gray-300 rounded p-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none" />
                      </div>
                    </>
                  )}

                  {/* === INPUT SIMULATED ANNEALING === */}
                  {activeAlgo === 'sa' && (
                    <>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Suhu Awal (T0)</label>
                        <input type="number" name="sa_t0" value={params.sa_t0} onChange={handleParamChange} className="w-full border border-gray-300 rounded p-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Tingkat Pendinginan (Cooling Rate)</label>
                        <input type="number" step="0.01" name="sa_cooling_rate" value={params.sa_cooling_rate} onChange={handleParamChange} className="w-full border border-gray-300 rounded p-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none" />
                      </div>
                    </>
                  )}

                  {/* === INPUT GENETIC ALGORITHM === */}
                  {activeAlgo === 'ga' && (
                    <>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Ukuran Populasi</label>
                        <input type="number" name="ga_pop_size" value={params.ga_pop_size} onChange={handleParamChange} className="w-full border border-gray-300 rounded p-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Jumlah Generasi</label>
                        <input type="number" name="ga_generations" value={params.ga_generations} onChange={handleParamChange} className="w-full border border-gray-300 rounded p-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none" />
                      </div>
                      <div className="flex gap-3">
                        <div className="w-1/2">
                          <label className="block text-sm font-medium text-gray-700 mb-1">Mutasi (%)</label>
                          <input type="number" step="0.01" name="ga_mutation_rate" value={params.ga_mutation_rate} onChange={handleParamChange} className="w-full border border-gray-300 rounded p-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none" />
                        </div>
                        <div className="w-1/2">
                          <label className="block text-sm font-medium text-gray-700 mb-1">Crossover (%)</label>
                          <input type="number" step="0.01" name="ga_crossover_rate" value={params.ga_crossover_rate} onChange={handleParamChange} className="w-full border border-gray-300 rounded p-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none" />
                        </div>
                      </div>
                    </>
                  )}

                  <hr className="my-4 border-gray-200" />

                  {/* Tombol Eksekusi Biru ala Bootstrap */}
                  <button 
                    onClick={runSimulation}
                    disabled={loading}
                    className="w-full bg-[#007bff] hover:bg-[#0069d9] text-white font-medium py-2 px-4 rounded transition-colors flex items-center justify-center gap-2 disabled:opacity-60"
                  >
                    {loading ? 'Memproses...' : <><Play size={16} /> Jalankan Simulasi</>}
                  </button>
                </div>
              </div>
            </div>

            {/* PANEL KANAN: AREA VISUALISASI */}
            <div className="lg:col-span-2 flex flex-col gap-6">
              
              {/* Grafik Konvergensi */}
              <div className="bg-white rounded-sm shadow-sm border-t-[3px] border-[#28a745]">
                <div className="p-4 border-b border-gray-100 flex items-center justify-between">
                  <h3 className="font-semibold text-gray-800">Grafik Laju Konvergensi</h3>
                </div>
                <div className="p-4">
                  {result ? (
                    <ConvergenceChart historyData={result.history} algorithmName={result.algorithm} />
                  ) : (
                    <div className="h-[300px] flex items-center justify-center bg-gray-50 border border-dashed border-gray-300 text-gray-500">
                      Silakan jalankan simulasi untuk melihat grafik.
                    </div>
                  )}
                </div>
              </div>

              {/* Grafik 3D Lanskap */}
              <div className="bg-white rounded-sm shadow-sm border-t-[3px] border-[#6f42c1]">
                <div className="p-4 border-b border-gray-100">
                  <h3 className="font-semibold text-gray-800">Peta Lanskap Fungsi 3D (Rastrigin)</h3>
                </div>
                <div className="p-4">
                  {result ? (
                    <div className="rounded border border-gray-200 overflow-hidden">
                      <Plotly3D surfaceData={result.surface} historyData={result.history} />
                    </div>
                  ) : (
                    <div className="h-[400px] flex flex-col items-center justify-center bg-gray-50 border border-dashed border-gray-300 text-gray-500">
                      <Mountain size={48} className="text-gray-300 mb-3" />
                      <p>Peta 3D belum tersedia.</p>
                    </div>
                  )}
                </div>
              </div>

            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;