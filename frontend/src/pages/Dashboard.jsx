import React from 'react';
import { Activity, Target, Zap, Cpu, Play, Mountain, Flame, Dna } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const StatCard = ({ title, value, icon: Icon, color, trend }) => (
  <div className="bg-slate/40 backdrop-blur-md border border-white/5 p-6 rounded-2xl shadow-xl hover:border-white/10 transition-colors group">
    <div className="flex justify-between items-start">
      <div>
        <p className="text-slate-400 text-sm font-medium mb-1">{title}</p>
        <h3 className="text-3xl font-bold text-white tracking-tight">{value}</h3>
        {trend && <p className="text-emerald text-xs font-semibold mt-2 flex items-center gap-1">↑ {trend} from last run</p>}
      </div>
      <div className={`p-3 rounded-xl bg-${color}/10 text-${color} group-hover:scale-110 transition-transform`}>
        <Icon size={24} />
      </div>
    </div>
  </div>
);

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="animate-fade-in-up max-w-7xl mx-auto space-y-8">
      
      {/* Header */}
      <header>
        <h1 className="text-4xl font-extrabold tracking-tight text-white mb-2 flex items-center gap-3">
          Research Overview <span className="flex h-3 w-3 relative"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald opacity-75"></span><span className="relative inline-flex rounded-full h-3 w-3 bg-emerald"></span></span>
        </h1>
        <p className="text-slate-400">Heuristic Search & Metaheuristics Analysis Dashboard</p>
      </header>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Simulations" value="1,284" icon={Activity} color="indigo" trend="12%" />
        <StatCard title="Best Fitness Found" value="0.00012" icon={Target} color="emerald" />
        <StatCard title="Fastest Convergence" value="45 ms" icon={Zap} color="cyan" />
        <StatCard title="Top Algorithm" value="SA (Variant 2)" icon={Cpu} color="indigo" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Main Chart Placeholder (Will integrate Chart.js here later) */}
        <div className="lg:col-span-2 bg-slate/40 backdrop-blur-md border border-white/5 p-6 rounded-2xl shadow-xl min-h-[400px] flex flex-col">
          <h2 className="text-lg font-bold text-white mb-6">Performance Trajectory Comparison</h2>
          <div className="flex-1 border border-dashed border-slate-600/50 rounded-xl flex items-center justify-center">
            <span className="text-slate-500">Interactive Line Chart will render here</span>
          </div>
        </div>

        {/* Quick Launch Panel */}
        <div className="bg-slate/40 backdrop-blur-md border border-white/5 p-6 rounded-2xl shadow-xl">
          <h2 className="text-lg font-bold text-white mb-6 border-b border-white/5 pb-4">Quick Launch</h2>
          <div className="space-y-4">
            <button onClick={() => navigate('/hill-climbing')} className="w-full group flex items-center justify-between p-4 bg-navy/50 border border-white/5 rounded-xl hover:bg-indigo/20 hover:border-indigo/50 transition-all">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-indigo/20 rounded-lg text-indigo"><Mountain size={18} /></div>
                <span className="font-medium text-slate-200">Hill Climbing</span>
              </div>
              <Play size={16} className="text-slate-500 group-hover:text-indigo transition-colors" />
            </button>

            <button onClick={() => navigate('/simulated-annealing')} className="w-full group flex items-center justify-between p-4 bg-navy/50 border border-white/5 rounded-xl hover:bg-orange-500/20 hover:border-orange-500/50 transition-all">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-orange-500/20 rounded-lg text-orange-500"><Flame size={18} /></div>
                <span className="font-medium text-slate-200">Simulated Annealing</span>
              </div>
              <Play size={16} className="text-slate-500 group-hover:text-orange-500 transition-colors" />
            </button>

            <button onClick={() => navigate('/genetic-algorithm')} className="w-full group flex items-center justify-between p-4 bg-navy/50 border border-white/5 rounded-xl hover:bg-cyan/20 hover:border-cyan/50 transition-all">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-cyan/20 rounded-lg text-cyan"><Dna size={18} /></div>
                <span className="font-medium text-slate-200">Genetic Algorithm</span>
              </div>
              <Play size={16} className="text-slate-500 group-hover:text-cyan transition-colors" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;