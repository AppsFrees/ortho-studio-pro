import React, { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Download, FileJson, X } from 'lucide-react';
import Sidebar from './components/Sidebar.jsx';
import Header from './components/Header.jsx';
import PatientForm from './components/PatientForm.jsx';
import ModelosAnalysis from './components/ModelosAnalysis.jsx';
import FacialAnalysis from './components/FacialAnalysis.jsx';
import Cefalo from './components/Cefalo.jsx';
import Report from './components/Report.jsx';
import { useLocalStorage } from './hooks/useLocalStorage.js';
import { exportToPDF, exportToJSON } from './lib/export.js';

const patientInitialState = {
  nombre: '',
  edad: '',
  sexo: 'Masculino',
  denticion: 'Mixta',
  fechaEvaluacion: '',
};

const modelosInitialState = {
  boltonMaxAnt: '',
  boltonMandAnt: '',
  boltonMaxTot: '',
  boltonMandTot: '',
  dadDispSup: '',
  dadReqSup: '',
  dadDispInf: '',
  dadReqInf: '',
  tanakaIncInf: '',
  korkhausPrem: '',
  korkhausMol: '',
};

const facialInitialState = {
  tercios: '',
  tercioInf: '',
  bicigomatica: '',
  nasolabial: '',
  mentolabial: '',
  lineaE: '',
  corredores: '',
  lineaSonrisa: '',
  exposGing: '',
};

function App() {
  const [activeTab, setActiveTab] = useState('patient');
  const [isExportOpen, setIsExportOpen] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  const [paciente, setPaciente] = useLocalStorage('paciente', patientInitialState);
  const [modelos, setModelos] = useLocalStorage('modelos', modelosInitialState);
  const [facial, setFacial] = useLocalStorage('facial', facialInitialState);

  const waitForReportRender = () =>
    new Promise((resolve) => {
      setTimeout(resolve, 200);
    });

  const handleExportPDF = async () => {
    try {
      setIsExporting(true);
      setActiveTab('report');
      await waitForReportRender();
      await exportToPDF({ paciente, modelos, facial });
    } finally {
      setIsExporting(false);
      setIsExportOpen(false);
    }
  };

  const handleExportJSON = () => {
    setIsExporting(true);
    exportToJSON({ paciente, modelos, facial });
    setIsExporting(false);
    setIsExportOpen(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <div className="flex min-h-screen">
        <Sidebar
          activeTab={activeTab}
          onTabChange={setActiveTab}
          onOpenExport={() => setIsExportOpen(true)}
        />
        <div className="flex min-h-screen flex-1 flex-col">
          <Header activeTab={activeTab} paciente={paciente} />
          <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-6xl space-y-6">
              {activeTab === 'patient' && (
                <PatientForm paciente={paciente} setPaciente={setPaciente} />
              )}
              {activeTab === 'modelos' && (
                <ModelosAnalysis modelos={modelos} setModelos={setModelos} />
              )}
              {activeTab === 'facial' && (
                <FacialAnalysis facial={facial} setFacial={setFacial} />
              )}
              {activeTab === 'cefalo' && <Cefalo />}
              {activeTab === 'report' && (
                <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
                  <Report paciente={paciente} modelos={modelos} facial={facial} />
                </div>
              )}
            </div>
          </main>
        </div>
      </div>

      <Transition show={isExportOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={setIsExportOpen}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-150"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center px-4 py-8">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-150"
                enterFrom="opacity-0 translate-y-4 scale-95"
                enterTo="opacity-100 translate-y-0 scale-100"
                leave="ease-in duration-100"
                leaveFrom="opacity-100 translate-y-0 scale-100"
                leaveTo="opacity-0 translate-y-4 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <div className="mb-4 flex items-start justify-between gap-4">
                    <Dialog.Title className="text-base font-semibold text-slate-900">
                      Exportar estudio ortodóntico
                    </Dialog.Title>
                    <button
                      type="button"
                      onClick={() => setIsExportOpen(false)}
                      className="rounded-full p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>

                  <p className="mb-4 text-xs text-slate-500">
                    El reporte se genera a partir de los datos actuales del paciente, análisis
                    de modelos y análisis facial.
                  </p>

                  <div className="space-y-3">
                    <button
                      type="button"
                      onClick={handleExportPDF}
                      disabled={isExporting}
                      className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-teal-600 px-4 py-2.5 text-sm font-semibold text-teal-50 shadow-sm hover:bg-teal-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-70"
                    >
                      <Download className="h-4 w-4" />
                      {isExporting ? 'Generando PDF…' : 'PDF profesional'}
                    </button>

                    <button
                      type="button"
                      onClick={handleExportJSON}
                      disabled={isExporting}
                      className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-800 shadow-sm hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-70"
                    >
                      <FileJson className="h-4 w-4" />
                      JSON (import/export)
                    </button>
                  </div>

                  <p className="mt-4 text-[11px] leading-relaxed text-slate-400">
                    El PDF está diseñado para adjuntarse a historias clínicas y presentaciones de
                    casos. El JSON permite trasladar la información entre versiones de la
                    aplicación o respaldarla.
                  </p>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
}

export default App;
