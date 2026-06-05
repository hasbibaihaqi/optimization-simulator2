import React, { useState } from 'react';
import axios from 'axios';
import Plotly3D from './components/Plotly3D';
import ConvergenceChart from './components/ConvergenceChart';
import { 
  Activity, Play, Settings, Target, Clock, 
  Mountain, Flame, Dna, LayoutDashboard, 
  Users, Folder, ArrowRightCircle, Menu, X, Cpu, Zap
} from 'lucide-react';

// --- Komponen Kartu Statistik ala Modern Glassmorphism ---
const StatCard = ({ bgGradient, borderColor, iconColor, value, title, icon }) => (
  <div className={`relative overflow-hidden rounded-2xl border ${borderColor} ${bgGradient} backdrop-blur-sm p-6 shadow-[0_8px_30px_rgb(0,0,0,0.12)] transition-all duration-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.2)] hover:-translate-y-1 group`}>
    <div className="absolute -right-6 -top-6 opacity-20 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-12">
      <div className={`${iconColor}`}>
        {icon}
      </div>
    </div>
    <div className="relative z-10">
      <h3 className="text-4xl font-black text-white tracking-tight mb-1 drop-shadow-sm">{value}</h3>
      <p className="text-sm font-medium text-slate-300/90 tracking-wide">{title}</p>
    </div>
    <div className="relative z-10 mt-4 flex items-center gap-1 text-xs font-semibold text-white/50 hover:text-white/80 transition-colors cursor-pointer w-fit uppercase tracking-wider">
      View Details <ArrowRightCircle size={14} className="ml-1" />
    </div>
  </div>
);

// --- Komponen Tombol Menu Sidebar ---
const SidebarMenu = ({ id, label, icon: Icon, activeAlgo, setActiveAlgo, setResult }) => {
  const isActive = activeAlgo === id;
  return (
    <button
      onClick={() => { setActiveAlgo(id); setResult(null); }}
      className={`w-full flex items-center gap-3 px-4 py-3.5 my-1 rounded-xl text-sm font-medium transition-all duration-300 ${
        isActive 
          ? 'bg-gradient-to-r from-cyan-500/20 to-blue-500/10 text-cyan-400 border border-cyan-500/30 shadow-[inset_0_0_20px_rgba(6,182,212,0.15)]' 
          : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200 border border-transparent'
      }`}
    >
      <Icon size={20} className={`${isActive ? 'text-cyan-400 drop-shadow-[0_0_8px_rgba(6,182,212,0.8)]' : 'text-slate-500'}`} />
      {label}
    </button>
  );
};

// --- Komponen Input Form Modern ---
const FormGroup = ({ label, children }) => (
  <div className="mb-4">
    <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
      {label}
    </label>
    {children}
  </div>
);

const InputField = ({ type = "number", name, value, onChange, step, className="" }) => (
  <input 
    type={type} 
    name={name} 
    value={value} 
    onChange={onChange} 
    step={step}
    className={`w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/50 transition-all ${className}`} 
  />
);

const SelectField = ({ name, value, onChange, options }) => (
  <select 
    name={name} 
    value={value} 
    onChange={onChange} 
    className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/50 transition-all appearance-none"
  >
    {options.map(opt => (
      <option key={opt.value} value={opt.value} className="bg-slate-800">{opt.label}</option>
    ))}
  </select>
);


function App() {
  const [activeAlgo, setActiveAlgo] = useState('hc'); 
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showConfigModal, setShowConfigModal] = useState(false);
  const [sysConfig, setSysConfig] = useState({
    render3D: true,
    autoRefresh: false
  });

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
    if (sysConfig.autoRefresh) {
      setResult(null);
    }
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
      alert("Gagal terhubung ke backend. Pastikan API berjalan dengan baik.");
    }
    setLoading(false);
  };

  return (
    <div className="flex h-screen bg-slate-950 font-sans text-slate-200 overflow-hidden selection:bg-cyan-500/30">
      
      {/* Animated Background Blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[20%] -left-[10%] w-[60%] h-[60%] rounded-full bg-cyan-900/10 blur-[120px]"></div>
        <div className="absolute top-[60%] -right-[10%] w-[50%] h-[60%] rounded-full bg-indigo-900/10 blur-[120px]"></div>
        <div className="absolute top-[30%] left-[40%] w-[30%] h-[30%] rounded-full bg-purple-900/10 blur-[100px]"></div>
      </div>

      {/* Mobile Overlay */}
      {!sidebarOpen && (
        <div 
          className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-20 lg:hidden"
          onClick={() => setSidebarOpen(true)}
        />
      )}

      {/* SIDEBAR */}
      <aside className={`fixed lg:static inset-y-0 left-0 z-30 bg-slate-900/60 backdrop-blur-xl border-r border-slate-700/50 flex flex-col transition-transform duration-300 w-72 ${sidebarOpen ? 'translate-x-0 lg:translate-x-0' : '-translate-x-full lg:translate-x-0 lg:w-72'}`}>
        
        {/* Logo & Brand */}
        <div className="h-20 flex items-center px-6 border-b border-slate-700/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center shadow-[0_0_15px_rgba(6,182,212,0.5)]">
              <Cpu size={24} className="text-white" />
            </div>
            <div>
              <h1 className="text-lg font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 tracking-tight leading-tight">
                AI Optimizer
              </h1>
              <p className="text-[10px] uppercase tracking-widest text-slate-400 font-semibold">Simulator Platform</p>
            </div>
          </div>
          {/* Mobile close button */}
          <button onClick={() => setSidebarOpen(true)} className="ml-auto lg:hidden text-slate-400 hover:text-white">
            <X size={20} />
          </button>
        </div>



        {/* Sidebar Navigation */}
        <nav className="flex-1 overflow-y-auto px-4 py-2 custom-scrollbar">
          <div className="px-2 text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-3">
            Algorithms
          </div>
          <SidebarMenu id="hc" label="Hill Climbing" icon={Mountain} activeAlgo={activeAlgo} setActiveAlgo={setActiveAlgo} setResult={setResult} />
          <SidebarMenu id="sa" label="Simulated Annealing" icon={Flame} activeAlgo={activeAlgo} setActiveAlgo={setActiveAlgo} setResult={setResult} />
          <SidebarMenu id="ga" label="Genetic Algorithm" icon={Dna} activeAlgo={activeAlgo} setActiveAlgo={setActiveAlgo} setResult={setResult} />
          
          <div className="px-2 text-[11px] font-bold text-slate-500 uppercase tracking-widest mt-8 mb-3">
            System
          </div>
          <button 
            onClick={() => setShowConfigModal(true)}
            className="w-full flex items-center gap-3 px-4 py-3.5 my-1 rounded-xl text-sm font-medium text-slate-400 hover:bg-slate-800/50 hover:text-slate-200 transition-all duration-300 border border-transparent"
          >
            <Settings size={20} className="text-slate-500" /> System Config
          </button>
        </nav>
      </aside>

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden relative z-10 w-full">
        
        {/* TOP NAVBAR */}
        <header className="bg-slate-900/40 backdrop-blur-md border-b border-slate-700/50 h-20 flex items-center justify-between px-6 z-10 shrink-0">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setSidebarOpen(!sidebarOpen)} 
              className="lg:hidden p-2 rounded-lg bg-slate-800/80 text-slate-300 hover:text-white border border-slate-700 focus:outline-none"
            >
              <Menu size={20} />
            </button>
            <div className="hidden sm:flex items-center gap-2 text-sm font-medium text-slate-400 bg-slate-800/50 px-4 py-2 rounded-full border border-slate-700/50">
              <LayoutDashboard size={14} className="text-cyan-500" />
              <span>Workspace</span>
              <span className="text-slate-600">/</span>
              <span>Algorithms</span>
              <span className="text-slate-600">/</span>
              <span className="text-cyan-400 font-semibold drop-shadow-[0_0_8px_rgba(6,182,212,0.4)]">
                {activeAlgo === 'hc' ? 'Hill Climbing' : activeAlgo === 'sa' ? 'Simulated Annealing' : 'Genetic Algorithm'}
              </span>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="text-xs font-medium text-slate-400 bg-slate-800/50 px-3 py-1.5 rounded-full border border-slate-700/50 flex items-center gap-2">
               <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
               System Online
            </div>
          </div>
        </header>

        {/* PAGE CONTENT */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8 custom-scrollbar">
          
          <div className="max-w-7xl mx-auto">
            {/* Header Area */}
            <div className="mb-8">
              <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight mb-2">
                {activeAlgo === 'hc' ? 'Hill Climbing' : activeAlgo === 'sa' ? 'Simulated Annealing' : 'Genetic Algorithm'}
              </h2>
              <p className="text-slate-400 text-sm md:text-base">Configure parameters and visualize the optimization convergence process in real-time.</p>
            </div>

            {/* KARTU STATISTIK (Glassmorphism Blocks) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <StatCard 
                bgGradient="bg-gradient-to-br from-pink-500/10 to-rose-600/10"
                borderColor="border-pink-500/20"
                iconColor="text-pink-500/30"
                value={result ? result.history.length : "0"} 
                title="Iterations / Generations" 
                icon={<Activity size={100} />} 
              />
              <StatCard 
                bgGradient="bg-gradient-to-br from-cyan-500/10 to-blue-600/10"
                borderColor="border-cyan-500/20"
                iconColor="text-cyan-500/30"
                value={result ? result.best_energy.toFixed(4) : "0.00"} 
                title="Best Fitness (Cost)" 
                icon={<Target size={100} />} 
              />
              <StatCard 
                bgGradient="bg-gradient-to-br from-emerald-500/10 to-teal-600/10"
                borderColor="border-emerald-500/20"
                iconColor="text-emerald-500/30"
                value={result ? `${(result.execution_time * 1000).toFixed(0)} ms` : "0 ms"} 
                title="Execution Time" 
                icon={<Clock size={100} />} 
              />
              <StatCard 
                bgGradient="bg-gradient-to-br from-amber-500/10 to-orange-600/10"
                borderColor="border-amber-500/20"
                iconColor="text-amber-500/30"
                value={activeAlgo.toUpperCase()} 
                title="Active Algorithm" 
                icon={<Zap size={100} />} 
              />
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
              
              {/* PANEL KIRI: FORM PARAMETER */}
              <div className="xl:col-span-1">
                <div className="bg-slate-900/40 backdrop-blur-xl rounded-2xl border border-slate-700/50 shadow-xl overflow-hidden relative">
                  {/* Decorative glow */}
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 to-blue-500"></div>
                  
                  <div className="p-6 border-b border-slate-700/50 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center border border-slate-700">
                        <Settings size={16} className="text-cyan-400" />
                      </div>
                      <h3 className="font-bold text-white tracking-wide">Hyperparameters</h3>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    {/* === INPUT HILL CLIMBING === */}
                    {activeAlgo === 'hc' && (
                      <div className="space-y-2">
                        <FormGroup label="Search Variant">
                          <SelectField 
                            name="hc_variant" 
                            value={params.hc_variant} 
                            onChange={handleParamChange}
                            options={[
                              { value: "simple", label: "Simple Ascent" },
                              { value: "steepest", label: "Steepest-Ascent" },
                              { value: "stochastic", label: "Stochastic" }
                            ]}
                          />
                        </FormGroup>
                        <FormGroup label="Max Iterations">
                          <InputField name="hc_max_iter" value={params.hc_max_iter} onChange={handleParamChange} />
                        </FormGroup>
                        <FormGroup label="Step Size">
                          <InputField type="number" step="0.1" name="hc_step_size" value={params.hc_step_size} onChange={handleParamChange} />
                        </FormGroup>
                      </div>
                    )}

                    {/* === INPUT SIMULATED ANNEALING === */}
                    {activeAlgo === 'sa' && (
                      <div className="space-y-2">
                        <FormGroup label="Initial Temp (T0)">
                          <InputField name="sa_t0" value={params.sa_t0} onChange={handleParamChange} />
                        </FormGroup>
                        <FormGroup label="Cooling Rate">
                          <InputField type="number" step="0.01" name="sa_cooling_rate" value={params.sa_cooling_rate} onChange={handleParamChange} />
                        </FormGroup>
                      </div>
                    )}

                    {/* === INPUT GENETIC ALGORITHM === */}
                    {activeAlgo === 'ga' && (
                      <div className="space-y-2">
                        <FormGroup label="Population Size">
                          <InputField name="ga_pop_size" value={params.ga_pop_size} onChange={handleParamChange} />
                        </FormGroup>
                        <FormGroup label="Generations">
                          <InputField name="ga_generations" value={params.ga_generations} onChange={handleParamChange} />
                        </FormGroup>
                        <div className="grid grid-cols-2 gap-4">
                          <FormGroup label="Mutation (%)">
                            <InputField type="number" step="0.01" name="ga_mutation_rate" value={params.ga_mutation_rate} onChange={handleParamChange} />
                          </FormGroup>
                          <FormGroup label="Crossover (%)">
                            <InputField type="number" step="0.01" name="ga_crossover_rate" value={params.ga_crossover_rate} onChange={handleParamChange} />
                          </FormGroup>
                        </div>
                      </div>
                    )}

                    <div className="mt-8">
                      <button 
                        onClick={runSimulation}
                        disabled={loading}
                        className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold py-3.5 px-4 rounded-xl transition-all shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:shadow-[0_0_25px_rgba(6,182,212,0.5)] flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed group"
                      >
                        {loading ? (
                          <span className="flex items-center gap-2">
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                            Processing Data...
                          </span>
                        ) : (
                          <>
                            <Play size={18} className="transition-transform group-hover:scale-110" /> 
                            Run Simulation
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* PANEL KANAN: AREA VISUALISASI */}
              <div className="xl:col-span-2 flex flex-col gap-8">
                
                {/* Grafik Konvergensi */}
                <div className="bg-slate-900/40 backdrop-blur-xl rounded-2xl border border-slate-700/50 shadow-xl overflow-hidden relative">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-400 to-teal-500"></div>
                  <div className="p-6 border-b border-slate-700/50">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center border border-slate-700">
                        <Activity size={16} className="text-emerald-400" />
                      </div>
                      <h3 className="font-bold text-white tracking-wide">Convergence Trajectory</h3>
                    </div>
                  </div>
                  <div className="p-6">
                    {result ? (
                      <ConvergenceChart historyData={result.history} algorithmName={result.algorithm} />
                    ) : (
                      <div className="h-[300px] flex flex-col items-center justify-center bg-slate-800/30 border border-dashed border-slate-700 rounded-xl text-slate-500">
                        <Activity size={40} className="text-slate-600 mb-3" />
                        <p>Awaiting simulation data to plot convergence graph.</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Grafik 3D Lanskap */}
                {sysConfig.render3D && (
                  <div className="bg-slate-900/40 backdrop-blur-xl rounded-2xl border border-slate-700/50 shadow-xl overflow-hidden relative">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-indigo-500"></div>
                    <div className="p-6 border-b border-slate-700/50">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center border border-slate-700">
                          <Mountain size={16} className="text-purple-400" />
                        </div>
                        <h3 className="font-bold text-white tracking-wide">3D Landscape Topology (Rastrigin)</h3>
                      </div>
                    </div>
                    <div className="p-6">
                      {result ? (
                        <div className="rounded-xl border border-slate-700/50 overflow-hidden bg-slate-950/50">
                          <Plotly3D surfaceData={result.surface} historyData={result.history} />
                        </div>
                      ) : (
                        <div className="h-[400px] flex flex-col items-center justify-center bg-slate-800/30 border border-dashed border-slate-700 rounded-xl text-slate-500">
                          <Mountain size={48} className="text-slate-600 mb-4" />
                          <p>3D visualization map is not available yet.</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}

              </div>
            </div>
          </div>
        </main>
      </div>
    {/* System Config Modal */}
      {showConfigModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700/50 rounded-2xl w-full max-w-md shadow-2xl overflow-hidden relative">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 to-blue-500"></div>
            <div className="p-6 border-b border-slate-700/50 flex justify-between items-center bg-slate-900/50">
              <h3 className="font-bold text-white flex items-center gap-2">
                <Settings size={18} className="text-cyan-400" />
                System Configuration
              </h3>
              <button onClick={() => setShowConfigModal(false)} className="text-slate-400 hover:text-white transition-colors">
                <X size={20} />
              </button>
            </div>
            <div className="p-6 space-y-6">
              
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-semibold text-slate-200">Render 3D Landscape</h4>
                  <p className="text-xs text-slate-400 mt-1">Enable Plotly 3D rendering (heavy performance)</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" checked={sysConfig.render3D} onChange={(e) => setSysConfig({...sysConfig, render3D: e.target.checked})} />
                  <div className="w-11 h-6 bg-slate-700 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan-500"></div>
                </label>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-semibold text-slate-200">Auto Refresh Chart</h4>
                  <p className="text-xs text-slate-400 mt-1">Automatically clear chart on parameter change</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" checked={sysConfig.autoRefresh} onChange={(e) => setSysConfig({...sysConfig, autoRefresh: e.target.checked})} />
                  <div className="w-11 h-6 bg-slate-700 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan-500"></div>
                </label>
              </div>

            </div>
            <div className="p-5 bg-slate-800/50 border-t border-slate-700/50 flex justify-end">
              <button 
                onClick={() => setShowConfigModal(false)}
                className="px-6 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white text-sm font-semibold rounded-xl shadow-lg transition-all"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default App;