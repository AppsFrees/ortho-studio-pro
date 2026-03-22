import React from 'react';

function PatientForm({ paciente, setPaciente }) {
  const updateField = (field, value) => {
    setPaciente((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="card">
      <div className="border-b border-slate-200 px-4 py-3 sm:px-6">
        <h2 className="section-title">Identificación del paciente</h2>
        <p className="mt-1 text-xs text-slate-500">
          Estos datos se utilizarán en todos los análisis y en el encabezado del reporte final.
        </p>
      </div>

      <div className="space-y-4 px-4 py-4 sm:px-6 sm:py-5">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-1.5">
            <label className="label-base" htmlFor="nombre">Nombre completo</label>
            <input
              id="nombre"
              type="text"
              className="input-base"
              value={paciente?.nombre || ''}
              onChange={(e) => updateField('nombre', e.target.value)}
              placeholder="Ej. Juan Pérez"
            />
          </div>
          <div className="space-y-1.5">
            <label className="label-base" htmlFor="edad">Edad</label>
            <input
              id="edad"
              type="number"
              min="0"
              className="input-base"
              value={paciente?.edad ?? ''}
              onChange={(e) => updateField('edad', e.target.value === '' ? '' : Number(e.target.value))}
              placeholder="Ej. 14"
            />
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <div className="space-y-1.5">
            <label className="label-base" htmlFor="sexo">Sexo</label>
            <select
              id="sexo"
              className="input-base"
              value={paciente?.sexo || 'Masculino'}
              onChange={(e) => updateField('sexo', e.target.value)}
            >
              <option>Masculino</option>
              <option>Femenino</option>
              <option>Otro</option>
            </select>
          </div>
          <div className="space-y-1.5">
            <label className="label-base" htmlFor="denticion">Tipo de dentición</label>
            <select
              id="denticion"
              className="input-base"
              value={paciente?.denticion || 'Mixta'}
              onChange={(e) => updateField('denticion', e.target.value)}
            >
              <option>Decidua</option>
              <option>Mixta</option>
              <option>Permanente</option>
            </select>
          </div>
          <div className="space-y-1.5">
            <label className="label-base" htmlFor="fechaEvaluacion">Fecha de evaluación</label>
            <input
              id="fechaEvaluacion"
              type="date"
              className="input-base"
              value={paciente?.fechaEvaluacion || ''}
              onChange={(e) => updateField('fechaEvaluacion', e.target.value)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default PatientForm;
