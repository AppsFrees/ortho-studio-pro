import React from 'react';
import { norms } from '../lib/norms.js';

const toNumberOrNull = (value) => {
  if (value === '' || value === null || value === undefined) return null;
  const n = Number(value);
  return Number.isNaN(n) ? null : n;
};

function Row({ label, value, compact = false }) {
  return (
    <div className={`flex items-center justify-between gap-3 px-3 ${compact ? 'py-1' : 'py-1.5'}`}>
      <span className="text-[11px] font-medium text-slate-500">{label}</span>
      <span className="text-[11px] font-semibold text-slate-800">{value}</span>
    </div>
  );
}

function Report({ paciente, modelos, facial }) {
  const boltonMaxAnt = toNumberOrNull(modelos.boltonMaxAnt);
  const boltonMandAnt = toNumberOrNull(modelos.boltonMandAnt);
  const boltonMaxTot = toNumberOrNull(modelos.boltonMaxTot);
  const boltonMandTot = toNumberOrNull(modelos.boltonMandTot);

  const boltonAnteriorRatio =
    boltonMaxAnt && boltonMandAnt ? (boltonMandAnt / boltonMaxAnt) * 100 : null;
  const boltonTotalRatio =
    boltonMaxTot && boltonMandTot ? (boltonMandTot / boltonMaxTot) * 100 : null;

  const dadDispSup = toNumberOrNull(modelos.dadDispSup);
  const dadReqSup = toNumberOrNull(modelos.dadReqSup);
  const dadDispInf = toNumberOrNull(modelos.dadDispInf);
  const dadReqInf = toNumberOrNull(modelos.dadReqInf);

  const dadSup =
    modelos.dadDispSup !== '' && modelos.dadReqSup !== ''
      ? dadDispSup - dadReqSup
      : null;
  const dadInf =
    modelos.dadDispInf !== '' && modelos.dadReqInf !== ''
      ? dadDispInf - dadReqInf
      : null;

  const tanakaIncInf = toNumberOrNull(modelos.tanakaIncInf);
  const tanakaSupQuadrant =
    tanakaIncInf != null ? tanakaIncInf / 2 + norms.tanakaSupOffset : null;
  const tanakaInfQuadrant =
    tanakaIncInf != null ? tanakaIncInf / 2 + norms.tanakaInfOffset : null;

  const korkhausPrem = toNumberOrNull(modelos.korkhausPrem);
  const korkhausMol = toNumberOrNull(modelos.korkhausMol);

  return (
    <div id="report-root" className="mx-auto max-w-3xl bg-white p-6 text-sm text-slate-900 sm:p-8">
      <div className="border-b border-slate-200 pb-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-teal-700">OrthoStudio Pro</p>
            <p className="mt-1 text-base font-semibold text-slate-900">Estudio ortodóntico clínico</p>
            <p className="mt-0.5 text-[11px] text-slate-500">
              Documento auxiliar para diagnóstico y planificación de tratamiento.
            </p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-[11px] leading-tight text-slate-600">
            <p className="font-semibold">Fecha evaluación</p>
            <p>{paciente?.fechaEvaluacion || '—'}</p>
          </div>
        </div>
      </div>

      <div className="mt-5 space-y-2">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">I. Datos del paciente</p>
        <div className="divide-y divide-slate-100 rounded-xl border border-slate-200 bg-slate-50">
          <Row label="Nombre completo" value={paciente?.nombre || '—'} />
          <Row label="Edad" value={paciente?.edad ? `${paciente.edad} años` : '—'} />
          <Row label="Sexo" value={paciente?.sexo || '—'} />
          <Row label="Tipo de dentición" value={paciente?.denticion || '—'} />
          <Row label="Fecha de evaluación" value={paciente?.fechaEvaluacion || '—'} />
        </div>
      </div>

      <div className="mt-6 space-y-2">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">II. Análisis de modelos</p>

        <div className="space-y-3 rounded-xl border border-slate-200 bg-slate-50 p-3">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-600">Bolton</p>
          <div className="grid gap-2 sm:grid-cols-2">
            <Row compact label="Suma 6 ant. maxilares"
              value={modelos.boltonMaxAnt !== '' ? `${Number(modelos.boltonMaxAnt).toFixed(1)}mm` : '—'} />
            <Row compact label="Suma 6 ant. mandibulares"
              value={modelos.boltonMandAnt !== '' ? `${Number(modelos.boltonMandAnt).toFixed(1)}mm` : '—'} />
            <Row compact label="Suma 12 maxilares"
              value={modelos.boltonMaxTot !== '' ? `${Number(modelos.boltonMaxTot).toFixed(1)}mm` : '—'} />
            <Row compact label="Suma 12 mandibulares"
              value={modelos.boltonMandTot !== '' ? `${Number(modelos.boltonMandTot).toFixed(1)}mm` : '—'} />
          </div>
          <div className="mt-2 grid gap-2 sm:grid-cols-2">
            <Row compact label={`Proporción Bolton anterior (norma ${norms.boltonAnterior.toFixed(1)}%)`}
              value={boltonAnteriorRatio != null ? `${boltonAnteriorRatio.toFixed(1)}%` : '—'} />
            <Row compact label={`Proporción Bolton total (norma ${norms.boltonTotal.toFixed(1)}%)`}
              value={boltonTotalRatio != null ? `${boltonTotalRatio.toFixed(1)}%` : '—'} />
          </div>
        </div>

        <div className="space-y-3 rounded-xl border border-slate-200 bg-slate-50 p-3">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-600">Discrepancia arco-diente (DAD)</p>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="space-y-1">
              <Row compact label="Disp. superior"
                value={modelos.dadDispSup !== '' ? `${Number(modelos.dadDispSup).toFixed(1)}mm` : '—'} />
              <Row compact label="Req. superior"
                value={modelos.dadReqSup !== '' ? `${Number(modelos.dadReqSup).toFixed(1)}mm` : '—'} />
              <Row compact label="DAD superior"
                value={dadSup != null ? `${dadSup.toFixed(1)}mm` : '—'} />
            </div>
            <div className="space-y-1">
              <Row compact label="Disp. inferior"
                value={modelos.dadDispInf !== '' ? `${Number(modelos.dadDispInf).toFixed(1)}mm` : '—'} />
              <Row compact label="Req. inferior"
                value={modelos.dadReqInf !== '' ? `${Number(modelos.dadReqInf).toFixed(1)}mm` : '—'} />
              <Row compact label="DAD inferior"
                value={dadInf != null ? `${dadInf.toFixed(1)}mm` : '—'} />
            </div>
          </div>
        </div>

        <div className="space-y-3 rounded-xl border border-slate-200 bg-slate-50 p-3">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-600">Tanaka–Johnston</p>
          <div className="grid gap-2 sm:grid-cols-3">
            <Row compact label="Suma 4 incisivos inferiores"
              value={modelos.tanakaIncInf !== '' ? `${Number(modelos.tanakaIncInf).toFixed(1)}mm` : '—'} />
            <Row compact label="Por cuadrante superior"
              value={tanakaSupQuadrant != null ? `${tanakaSupQuadrant.toFixed(1)}mm` : '—'} />
            <Row compact label="Por cuadrante inferior"
              value={tanakaInfQuadrant != null ? `${tanakaInfQuadrant.toFixed(1)}mm` : '—'} />
          </div>
        </div>

        <div className="space-y-3 rounded-xl border border-slate-200 bg-slate-50 p-3">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-600">Transversal (Korkhaus básico)</p>
          <div className="grid gap-2 sm:grid-cols-2">
            <Row compact label="Distancia inter-premolar"
              value={korkhausPrem != null ? `${korkhausPrem.toFixed(1)}mm` : '—'} />
            <Row compact label="Distancia inter-molar"
              value={korkhausMol != null ? `${korkhausMol.toFixed(1)}mm` : '—'} />
          </div>
        </div>
      </div>

      <div className="mt-6 space-y-2">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">III. Análisis facial y fotográfico</p>

        <div className="space-y-3 rounded-xl border border-slate-200 bg-slate-50 p-3">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-600">Frontal</p>
          <div className="grid gap-2 sm:grid-cols-2">
            <Row compact label="Tercios faciales" value={facial.tercios || '—'} />
            <Row compact label="Tercio inferior" value={facial.tercioInf || '—'} />
            <Row compact label="Anchura bicigomática"
              value={facial.bicigomatica ? `${Number(facial.bicigomatica).toFixed(1)}mm` : '—'} />
          </div>
        </div>

        <div className="space-y-3 rounded-xl border border-slate-200 bg-slate-50 p-3">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-600">Perfil</p>
          <div className="grid gap-2 sm:grid-cols-3">
            <Row compact label="Ángulo nasolabial"
              value={facial.nasolabial ? `${Number(facial.nasolabial).toFixed(1)}°` : '—'} />
            <Row compact label="Ángulo mentolabial"
              value={facial.mentolabial ? `${Number(facial.mentolabial).toFixed(1)}°` : '—'} />
            <Row compact label="Relación con línea E" value={facial.lineaE || '—'} />
          </div>
        </div>

        <div className="space-y-3 rounded-xl border border-slate-200 bg-slate-50 p-3">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-600">Sonrisa</p>
          <div className="grid gap-2 sm:grid-cols-3">
            <Row compact label="Corredores bucales" value={facial.corredores || '—'} />
            <Row compact label="Línea de sonrisa" value={facial.lineaSonrisa || '—'} />
            <Row compact label="Exposición gingival"
              value={facial.exposGing ? `${Number(facial.exposGing).toFixed(1)}mm` : '—'} />
          </div>
        </div>
      </div>

      <div className="mt-6 border-t border-slate-200 pt-3">
        <p className="text-[11px] leading-relaxed text-slate-500">
          Documento auxiliar para diagnóstico ortodóntico. No reemplaza el juicio clínico ni la
          evaluación integral del especialista.
        </p>
      </div>
    </div>
  );
}

export default Report;
