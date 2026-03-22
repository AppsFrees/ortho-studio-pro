import React from 'react';

function FacialAnalysis({ facial, setFacial }) {
  const updateField = (field, value) => {
    setFacial((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="card">
      <div className="border-b border-slate-200 px-4 py-3 sm:px-6">
        <p className="section-title">Análisis facial y sonrisa</p>
        <p className="mt-1 text-xs text-slate-500">
          Registra una síntesis clínica del análisis fotográfico frontal, de perfil y de sonrisa.
        </p>
      </div>

      <div className="space-y-6 px-4 py-4 sm:px-6 sm:py-5">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Frontal</p>
            <div className="space-y-3">
              <div className="space-y-1.5">
                <label className="label-base" htmlFor="tercios">Tercios faciales</label>
                <select id="tercios" className="input-base"
                  value={facial.tercios || ''}
                  onChange={(e) => updateField('tercios', e.target.value)}>
                  <option value="">Seleccionar…</option>
                  <option>Simétricos</option>
                  <option>Asimétricos</option>
                  <option>Tercio inf. aumentado</option>
                  <option>Tercio inf. disminuido</option>
                </select>
              </div>
              <div className="space-y-1.5">
                <label className="label-base" htmlFor="tercioInf">Tercio inferior</label>
                <select id="tercioInf" className="input-base"
                  value={facial.tercioInf || ''}
                  onChange={(e) => updateField('tercioInf', e.target.value)}>
                  <option value="">Seleccionar…</option>
                  <option>Proporcional</option>
                  <option>Aumentado</option>
                  <option>Disminuido</option>
                </select>
              </div>
              <div className="space-y-1.5">
                <label className="label-base" htmlFor="bicigomatica">Anchura bicigomática (mm)</label>
                <input id="bicigomatica" type="number" step="0.1" className="input-base"
                  value={facial.bicigomatica ?? ''}
                  onChange={(e) => updateField('bicigomatica', e.target.value)} />
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Perfil</p>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="space-y-1.5">
                <label className="label-base" htmlFor="nasolabial">Ángulo nasolabial (°)</label>
                <input id="nasolabial" type="number" step="0.1" className="input-base"
                  value={facial.nasolabial ?? ''}
                  onChange={(e) => updateField('nasolabial', e.target.value)} />
              </div>
              <div className="space-y-1.5">
                <label className="label-base" htmlFor="mentolabial">Ángulo mentolabial (°)</label>
                <input id="mentolabial" type="number" step="0.1" className="input-base"
                  value={facial.mentolabial ?? ''}
                  onChange={(e) => updateField('mentolabial', e.target.value)} />
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="label-base" htmlFor="lineaE">Relación labios / línea E</label>
              <input id="lineaE" type="text" className="input-base"
                value={facial.lineaE ?? ''}
                onChange={(e) => updateField('lineaE', e.target.value)}
                placeholder="Ej. -2 mm labio inferior, -1 mm labio superior" />
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Sonrisa</p>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-1.5">
              <label className="label-base" htmlFor="corredores">Corredores bucales</label>
              <select id="corredores" className="input-base"
                value={facial.corredores || ''}
                onChange={(e) => updateField('corredores', e.target.value)}>
                <option value="">Seleccionar…</option>
                <option>Adecuados</option>
                <option>Estrechos</option>
                <option>Amplios</option>
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="label-base" htmlFor="lineaSonrisa">Línea de sonrisa</label>
              <select id="lineaSonrisa" className="input-base"
                value={facial.lineaSonrisa || ''}
                onChange={(e) => updateField('lineaSonrisa', e.target.value)}>
                <option value="">Seleccionar…</option>
                <option>Consonante</option>
                <option>Plana</option>
                <option>Invertida</option>
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="label-base" htmlFor="exposGing">Exposición gingival (mm)</label>
              <input id="exposGing" type="number" step="0.1" className="input-base"
                value={facial.exposGing ?? ''}
                onChange={(e) => updateField('exposGing', e.target.value)} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FacialAnalysis;
