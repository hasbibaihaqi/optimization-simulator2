import React, { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { 
  Home, Mountain, Flame, Dna, Map, 
  BarChart2, BookOpen, Settings, ChevronLeft, ChevronRight 
} from 'lucide-react';

const Layout = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const menuItems = [
    { path: '/', name: 'Dashboard', icon: Home },
    { path: '/hill-climbing', name: 'Hill Climbing', icon: Mountain },
    { path: '/simulated-annealing', name: 'Simulated Annealing', icon: Flame },
    { path: '/genetic-algorithm', name: 'Genetic Algorithm', icon: Dna },
    { path: '/local-optima', name: 'Local Optima Analysis', icon: BarChart2 },
    { path: '/tsp', name: 'Traveling Salesman', icon: Map },
    { path: '/comparison', name: 'Algorithm Comparison', icon: BarChart2 },
    { path: '/docs', name: 'Documentation', icon: BookOpen },
    { path: '/settings', name: 'Settings', icon: Settings },
  ];

  return (
    <div className="flex h-screen bg-navy text-slate-50 font-sans overflow-hidden">
      
      {/* SIDEBAR */}
      <aside 
        className={`${isCollapsed ? 'w-20' : 'w-72'} transition-all duration-300 ease-in-out bg-slate/80 backdrop-blur-xl border-r border-white/5 flex flex-col relative z-20 shadow-2xl`}
      >
        {/* Header Sidebar */}
        <div className="h-20 flex items-center justify-between px-6 border-b border-white/5">
          {!isCollapsed && (
            <span className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo to-cyan whitespace-nowrap">
              AI Optimizer Pro
            </span>
          )}
          <button 
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-1.5 rounded-lg bg-navy/50 hover:bg-indigo/20 text-cyan transition-colors"
          >
            {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
          </button>
        </div>

        {/* Menu Items */}
        <nav className="flex-1 overflow-y-auto py-6 px-3 space-y-1 scrollbar-hide">
          {menuItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) => `
                flex items-center px-3 py-3 rounded-xl transition-all group relative
                ${isActive ? 'bg-indigo/10 text-indigo border border-indigo/20 shadow-[0_0_15px_rgba(79,70,229,0.15)]' : 'text-slate-400 hover:bg-white/5 hover:text-slate-200'}
              `}
            >
              <item.icon size={22} className={`min-w-[22px] ${isCollapsed ? 'mx-auto' : 'mr-4'}`} />
              {!isCollapsed && <span className="font-medium text-sm tracking-wide">{item.name}</span>}
              
              {/* Tooltip for collapsed state */}
              {isCollapsed && (
                <div className="absolute left-16 bg-slate px-3 py-1.5 rounded-md text-xs font-semibold text-white opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50 border border-white/10 shadow-lg">
                  {item.name}
                </div>
              )}
            </NavLink>
          ))}
        </nav>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 flex flex-col relative overflow-hidden bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-navy via-navy to-slate/20">
        {/* Decorative Grid Background */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay"></div>
        
        <div className="flex-1 overflow-y-auto p-8 relative z-10 scrollbar-smooth">
          <Outlet /> {/* Area ini akan diisi oleh halaman yang aktif */}
        </div>
      </main>

    </div>
  );
};

export default Layout;