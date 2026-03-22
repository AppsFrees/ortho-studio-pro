import React from 'react';

function getTabTitle(activeTab) {
  switch (activeTab) {
    case 'patient': return 'Datos del Paciente';
    case 'modelos': return 'Análisis de Modelos';
    case 'facial': return 'Análisis Facial y Sonrisa';
    case 'cefalo': return 'Cefalometría';
    case 'report': return 'Reporte Final';
    default: return '';
  }
}

function Header({ activeTab, paciente }) {
  const title = getTabTitle(activeTab);
  const hasPaciente = paciente?.nombre || paciente?.edad || paciente?.denticion;

  return (
    <header className="border-b border-slate-200 bg-white/90 backdrop-blur-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8">
        <div>
          <h1 className="text-sm font-semibold text-slate-900 sm:text-base">{title}</h1>
          <p className="mt-0.5 text-[11px] text-slate-500">
            Herramienta auxiliar para diagnóstico y planificación de casos ortodónticos.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="hidden text-right text-[11px] leading-tight text-slate-400 sm:block">
            <p>OrthoStudio Pro</p>
            <p>Estudio clínico individual</p>
          </div>
          <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-3 py-1 text-[11px] font-medium text-slate-700">
            {hasPaciente ? (
              <>
                <span className="max-w-[180px] truncate">{paciente?.nombre || 'Paciente'}</span>
                <span className="h-1 w-1 rounded-full bg-slate-400" />
                <span>{paciente?.edad ? `${paciente.edad} años` : 'Edad —'}</span>
                <span className="h-1 w-1 rounded-full bg-slate-400" />
                <span>{paciente?.denticion || 'Dentición —'}</span>
              </>
            ) : (
              <span className="text-slate-500">Completa los datos del paciente</span>
            )}
          </span>
        </div>
      </div>
    </header>
  );
}

export default Header;
