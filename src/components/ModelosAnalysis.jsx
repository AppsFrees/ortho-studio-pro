import React from 'react';
import { norms } from '../lib/norms.js';
import { AlertTriangle } from 'lucide-react';
import { LineChart, Line, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';

const toNumberOrNull = (value) => {
  if (value === '' || value === null || value === undefined) return null;
  const n = Number(value);
  return Number.isNaN(n) ? null : n;
};

const getStatusClasses = (isAlert) =>
  isAlert
    ? 'border-red-200 bg-red-50 text-red-900'
    : 'border-teal-200 bg-teal-50 text-teal-900';

function ModelosAnalysis({ modelos, setModelos }) {
  const updateField = (field, value) => {
    setModelos((prev) => ({ ...prev, [field]: value }));
  };

  const boltonMaxAnt = toNumberOrNull(modelos.boltonMaxAnt);
  const boltonMandAnt = toNumberOrNull(modelos.boltonMandAnt);
  const boltonMaxTot = toNumberOrNull(modelos.boltonMaxTot);
  const boltonMandTot = toNumberOrNull(modelos.boltonMandTot);

  const dadDispSup = toNumberOrNull(modelos.dadDispSup);
  const dadReqSup = toNumberOrNull(modelos.dadReqSup);
  const dadDispInf = toNumberOrNull(modelos.dadDispInf);
  const dadReqInf = toNumberOrNull(modelos.dadReqInf);

  const tanakaIncInf = toNumberOrNull(modelos.tanakaIncInf);
  const korkhausPrem = toNumberOrNull(modelos.korkhausPrem);
  const korkhausMol = toNumberOrNull(modelos.korkhausMol);

  const boltonAnteriorRatio =
    boltonMaxAnt && boltonMandAnt ? (boltonMandAnt / boltonMaxAnt) * 100 : null;
  const boltonTotalRatio =
    boltonMaxTot && boltonMandTot ? (boltonMandTot / boltonMaxTot) * 100 : null;

  const boltonAnteriorDeviation =
    boltonAnteriorRatio != null ? boltonAnteriorRatio - norms.boltonAnterior : null;
  const boltonTotalDeviation =
    boltonTotalRatio != null ? boltonTotalRatio - norms.boltonTotal : null;

  const boltonAnteriorAlert =
    boltonAnteriorDeviation != null && Math.abs(boltonAnteriorDeviation) > 2;
  const boltonTotalAlert =
    boltonTotalDeviation != null && Math.abs(boltonTotalDeviation) > 2;

  const dadSup =
    modelos.dadDispSup !== '' && modelos.dadReqSup !== ''
      ? dadDispSup - dadReqSup
      : null;
  const dadInf =
    modelos.dadDispInf !== '' && modelos.dadReqInf !== ''
      ? dadDispInf - dadReqInf
      : null;

  const dadSupAlert = dadSup != null && dadSup < 0;
  const dadInfAlert = dadInf != null && dadInf < 0;

  const tanakaSupQuadrant =
    tanakaIncInf != null ? tanakaIncInf / 2 + norms.tanakaSupOffset : null;
  const tanakaInfQuadrant =
    tanakaIncInf != null ? tanakaIncInf / 2 + norms.tanakaInfOffset : null;

  const sampleChartData = [
    { name: 'Bolton A', valor: boltonAnteriorRatio ?? norms.boltonAnterior },
    { name: 'Bolton T', valor: boltonTotalRatio ?? norms.boltonTotal },
  ];

  return (
    <div className="space-y-4">
      <div className="card">
        <div className="border-b border-slate-200 px-4 py-3 sm:px-6">
          <p className="section-title">Análisis de modelos</p>
          <p className="mt-1 text-xs text-slate-500">
            Introduce las mediciones en milímetros (mm). Los resultados se interpretan según las
            normas de Bolton, Tanaka–Johnston y discrepancia arco-diente.
          </p>
        </div>

        <div className="space-y-6 px-4 py-4 sm:px-6 sm:py-5">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-3">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Bolton anterior</p>
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <label className="label-base" htmlFor="boltonMaxAnt">Suma 6 ant. maxilares (mm)</label>
                  <input id="boltonMaxAnt" type="number" step="0.1" className="input-base"
                    value={modelos.boltonMaxAnt ?? ''}
                    onChange={(e) => updateField('boltonMaxAnt', e.target.value)} />
                </div>
                <div className="space-y-1.5">
                  <label className="label-base" htmlFor="boltonMandAnt">Suma 6 ant. mandibulares (mm)</label>
                  <input id="boltonMandAnt" type="number" step="0.1" className="input-base"
                    value={modelos.boltonMandAnt ?? ''}
                    onChange={(e) => updateField('boltonMandAnt', e.target.value)} />
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Bolton total</p>
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <label className="label-base" htmlFor="boltonMaxTot">Suma 12 maxilares (mm)</label>
                  <input id="boltonMaxTot" type="number" step="0.1" className="input-base"
                    value={modelos.boltonMaxTot ?? ''}
                    onChange={(e) => updateField('boltonMaxTot', e.target.value)} />
                </div>
                <div className="space-y-1.5">
                  <label className="label-base" htmlFor="boltonMandTot">Suma 12 mandibulares (mm)</label>
                  <input id="boltonMandTot" type="number" step="0.1" className="input-base"
                    value={modelos.boltonMandTot ?? ''}
                    onChange={(e) => updateField('boltonMandTot', e.target.value)} />
                </div>
              </div>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className={`rounded-2xl border px-4 py-3 text-xs shadow-sm ${getStatusClasses(boltonAnteriorAlert)}`}>
              <div className="flex items-center justify-between gap-2">
                <p className="font-semibold">Proporción Bolton anterior</p>
                {boltonAnteriorAlert && <AlertTriangle className="h-4 w-4" />}
              </div>
              <p className="mt-1 text-[11px]">Norma: {norms.boltonAnterior.toFixed(1)}%</p>
              <p className="mt-2 text-sm font-semibold">
                {boltonAnteriorRatio != null ? `${boltonAnteriorRatio.toFixed(1)}%` : '—'}
              </p>
              {boltonAnteriorDeviation != null && (
                <p className="mt-1 text-[11px]">
                  Desviación: {boltonAnteriorDeviation >= 0 ? '+' : ''}{boltonAnteriorDeviation.toFixed(1)}%
                </p>
              )}
            </div>

            <div className={`rounded-2xl border px-4 py-3 text-xs shadow-sm ${getStatusClasses(boltonTotalAlert)}`}>
              <div className="flex items-center justify-between gap-2">
                <p className="font-semibold">Proporción Bolton total</p>
                {boltonTotalAlert && <AlertTriangle className="h-4 w-4" />}
              </div>
              <p className="mt-1 text-[11px]">Norma: {norms.boltonTotal.toFixed(1)}%</p>
              <p className="mt-2 text-sm font-semibold">
                {boltonTotalRatio != null ? `${boltonTotalRatio.toFixed(1)}%` : '—'}
              </p>
              {boltonTotalDeviation != null && (
                <p className="mt-1 text-[11px]">
                  Desviación: {boltonTotalDeviation >= 0 ? '+' : ''}{boltonTotalDeviation.toFixed(1)}%
                </p>
              )}
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className={`rounded-2xl border px-4 py-3 text-xs shadow-sm ${getStatusClasses(dadSupAlert || dadInfAlert)}`}>
              <p className="font-semibold">Discrepancia arco-diente (DAD)</p>
              <p className="mt-1 text-[11px]">DAD &lt; 0 indica apiñamiento (exceso dentario), DAD &gt; 0 diastemas.</p>
              <div className="mt-2 grid gap-2 sm:grid-cols-2">
                <div>
                  <p className="text-[11px] font-medium uppercase text-slate-600">Arcada superior</p>
                  <div className="mt-1 grid grid-cols-2 gap-2">
                    <div className="space-y-1">
                      <label className="label-base" htmlFor="dadDispSup">Espacio disponible</label>
                      <input id="dadDispSup" type="number" step="0.1" className="input-base"
                        value={modelos.dadDispSup ?? ''}
                        onChange={(e) => updateField('dadDispSup', e.target.value)} />
                    </div>
                    <div className="space-y-1">
                      <label className="label-base" htmlFor="dadReqSup">Espacio requerido</label>
                      <input id="dadReqSup" type="number" step="0.1" className="input-base"
                        value={modelos.dadReqSup ?? ''}
                        onChange={(e) => updateField('dadReqSup', e.target.value)} />
                    </div>
                  </div>
                  <p className="mt-1 text-sm font-semibold">
                    DAD sup: {dadSup != null ? `${dadSup.toFixed(1)}mm` : '—'}
                  </p>
                </div>
                <div>
                  <p className="text-[11px] font-medium uppercase text-slate-600">Arcada inferior</p>
                  <div className="mt-1 grid grid-cols-2 gap-2">
                    <div className="space-y-1">
                      <label className="label-base" htmlFor="dadDispInf">Espacio disponible</label>
                      <input id="dadDispInf" type="number" step="0.1" className="input-base"
                        value={modelos.dadDispInf ?? ''}
                        onChange={(e) => updateField('dadDispInf', e.target.value)} />
                    </div>
                    <div className="space-y-1">
                      <label className="label-base" htmlFor="dadReqInf">Espacio requerido</label>
                      <input id="dadReqInf" type="number" step="0.1" className="input-base"
                        value={modelos.dadReqInf ?? ''}
                        onChange={(e) => updateField('dadReqInf', e.target.value)} />
                    </div>
                  </div>
                  <p className="mt-1 text-sm font-semibold">
                    DAD inf: {dadInf != null ? `${dadInf.toFixed(1)}mm` : '—'}
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-xs shadow-sm">
              <p className="font-semibold">Tanaka–Johnston</p>
              <p className="mt-1 text-[11px] text-slate-600">
                Estimación del tamaño de canino-premolares a partir de la suma de incisivos inferiores.
              </p>
              <div className="mt-2 grid gap-2 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <label className="label-base" htmlFor="tanakaIncInf">Suma 4 incisivos inferiores (mm)</label>
                  <input id="tanakaIncInf" type="number" step="0.1" className="input-base"
                    value={modelos.tanakaIncInf ?? ''}
                    onChange={(e) => updateField('tanakaIncInf', e.target.value)} />
                </div>
                <div className="space-y-1.5">
                  <label className="label-base">Resultados por cuadrante</label>
                  <p className="mt-2 text-sm font-semibold">
                    Sup: {tanakaSupQuadrant != null ? `${tanakaSupQuadrant.toFixed(1)}mm` : '—'}
                  </p>
                  <p className="text-sm font-semibold">
                    Inf: {tanakaInfQuadrant != null ? `${tanakaInfQuadrant.toFixed(1)}mm` : '—'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-xs shadow-sm">
              <p className="font-semibold">Transversal (Korkhaus básico)</p>
              <p className="mt-1 text-[11px] text-slate-600">Distancias inter-premolar e inter-molar superiores.</p>
              <div className="mt-2 grid gap-3 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <label className="label-base" htmlFor="korkhausPrem">Distancia inter-premolar (mm)</label>
                  <input id="korkhausPrem" type="number" step="0.1" className="input-base"
                    value={modelos.korkhausPrem ?? ''}
                    onChange={(e) => updateField('korkhausPrem', e.target.value)} />
                </div>
                <div className="space-y-1.5">
                  <label className="label-base" htmlFor="korkhausMol">Distancia inter-molar (mm)</label>
                  <input id="korkhausMol" type="number" step="0.1" className="input-base"
                    value={modelos.korkhausMol ?? ''}
                    onChange={(e) => updateField('korkhausMol', e.target.value)} />
                </div>
              </div>
              <p className="mt-2 text-[11px] text-slate-500">
                Útil para valorar constricciones o expansiones transversales.
              </p>
            </div>

            <div className="hidden rounded-2xl border border-dashed border-slate-200 bg-white px-4 py-3 text-xs text-slate-500 shadow-sm md:block">
              <p className="font-semibold text-slate-700">Gráficos (próximamente)</p>
              <p className="mt-1 text-[11px]">
                Se reservará este espacio para representaciones gráficas de las discrepancias de Bolton y DAD mediante Recharts.
              </p>
              <div className="mt-3 h-24 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={sampleChartData}>
                    <XAxis dataKey="name" hide />
                    <YAxis hide />
                    <Tooltip contentStyle={{ fontSize: '10px' }} />
                    <Line type="monotone" dataKey="valor" stroke="#0f766e" strokeWidth={1.5} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModelosAnalysis;
