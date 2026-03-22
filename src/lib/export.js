import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export async function exportToPDF({ paciente }) {
  const element = document.getElementById('report-root');
  if (!element) {
    console.warn('No se encontró el contenedor de reporte con id="report-root".');
    return;
  }

  const canvas = await html2canvas(element, {
    scale: 2,
    useCORS: true,
    backgroundColor: '#ffffff',
  });

  const imgData = canvas.toDataURL('image/png');
  const pdf = new jsPDF('p', 'mm', 'a4');

  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();

  const ratio = Math.min(pageWidth / canvas.width, pageHeight / canvas.height);
  const imgWidth = canvas.width * ratio;
  const imgHeight = canvas.height * ratio;

  const x = (pageWidth - imgWidth) / 2;
  const y = 10;
  pdf.addImage(imgData, 'PNG', x, y, imgWidth, imgHeight);

  const safeName = (paciente?.nombre || 'Paciente').trim().replace(/\s+/g, '_');
  const filename = `Estudio_${safeName || 'Paciente'}.pdf`;
  pdf.save(filename);
}

export function exportToJSON(data) {
  const nombre = data?.paciente?.nombre || 'Paciente';
  const safeName = nombre.trim().replace(/\s+/g, '_') || 'Paciente';

  const blob = new Blob([JSON.stringify(data, null, 2)], {
    type: 'application/json',
  });

  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `Estudio_${safeName}.json`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  URL.revokeObjectURL(url);
}
