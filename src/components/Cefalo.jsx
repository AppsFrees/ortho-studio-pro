import React from 'react';
import { Activity } from 'lucide-react';

function Cefalo() {
  return (
    <div className="card">
      <div className="flex items-start gap-3 border-b border-slate-200 px-4 py-3 sm:px-6">
        <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-teal-50 text-teal-700">
          <Activity className="h-5 w-5" />
        </div>
        <div>
          <h2 className="section-title">Cefalometría (próximamente)</h2>
          <p className="mt-1 text-xs text-slate-500">
            En futuras versiones podrás subir radiografías cefalométricas, realizar trazados
            digitales y obtener análisis automáticos.
          </p>
        </div>
      </div>

      <div className="space-y-4 px-4 py-6 text-sm sm:px-6">
        <p className="text-slate-600">Este módulo está reservado para:</p>
        <ul className="list-disc space-y-1 pl-5 text-slate-600">
          <li>Subida de radiografías en formato digital (JPG, PNG, DICOM exportado).</li>
          <li>Trazado cefalométrico guiado y mediciones angulares y lineales.</li>
          <li>Integración de los resultados cefalométricos al reporte clínico final.</li>
        </ul>

        <button
          type="button"
          disabled
          className="mt-2 inline-flex items-center justify-center rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-xs font-semibold text-slate-400 shadow-sm opacity-70"
        >
          Subir radiografía (próximamente)
        </button>
      </div>
    </div>
  );
}

export default Cefalo;
