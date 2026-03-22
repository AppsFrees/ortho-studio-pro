import React from 'react';
import { Activity, FileText, Ruler, Smile, UserCircle2, Download } from 'lucide-react';

const tabs = [
  { id: 'patient', label: 'Datos del Paciente', icon: UserCircle2 },
  { id: 'modelos', label: 'Análisis de Modelos', icon: Ruler },
  { id: 'facial', label: 'Análisis Facial', icon: Smile },
  { id: 'cefalo', label: 'Cefalometría', icon: Activity },
  { id: 'report', label: 'Reporte Final', icon: FileText },
];

function Sidebar({ activeTab, onTabChange, onOpenExport }) {
  return (
    <aside className="hidden w-64 flex-none border-r border-slate-200 bg-teal-950 text-teal-50 sm:flex sm:flex-col">
      <div className="flex items-center gap-2 px-4 py-4">
        <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-teal-500/20 text-teal-200">
          <Activity className="h-5 w-5" />
        </div>
        <div className="leading-tight">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-teal-200/80">OrthoStudio</p>
          <p className="text-sm font-semibold text-teal-50">Pro</p>
        </div>
      </div>

      <nav className="mt-2 flex-1 space-y-1 px-3 text-sm">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => onTabChange(tab.id)}
              className={`flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left transition-colors ${
                isActive
                  ? 'bg-teal-800 text-teal-50 font-semibold shadow-sm'
                  : 'text-teal-100/80 hover:bg-teal-800/50'
              }`}
            >
              <Icon className="h-4 w-4 shrink-0" />
              <span className="truncate text-xs">{tab.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="border-t border-teal-800 px-3 py-4">
        <button
          type="button"
          onClick={onOpenExport}
          className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-teal-400 px-3 py-2 text-xs font-semibold text-teal-950 shadow-sm transition hover:bg-teal-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-200 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-950"
        >
          <Download className="h-4 w-4" />
          Exportar estudio
        </button>
        <p className="mt-2 text-[10px] leading-snug text-teal-100/70">
          Genera un PDF profesional o un archivo JSON para respaldo y migración entre sistemas.
        </p>
      </div>
    </aside>
  );
}

export default Sidebar;
