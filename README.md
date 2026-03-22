# OrthoStudio Pro

Aplicación clínica frontend para análisis ortodóntico (modelos, análisis facial y reporte exportable) construida con React 18, Vite y Tailwind CSS.

## Stack

- Vite + React 18
- Tailwind CSS + tailwindcss-animate
- Headless UI (`@headlessui/react`) para diálogos accesibles
- Iconos `lucide-react`
- Exportación PDF con `jspdf` + `html2canvas`
- Persistencia local con `localStorage` vía hook `useLocalStorage`
- `recharts` preparado para extensiones futuras

## Scripts

- `npm install` – instala dependencias
- `npm run dev` – levanta el entorno de desarrollo
- `npm run build` – genera build de producción
- `npm run preview` – previsualiza el build

## Estructura principal

- `src/components/PatientForm.jsx` – datos del paciente
- `src/components/ModelosAnalysis.jsx` – Bolton, DAD, Tanaka y transversal
- `src/components/FacialAnalysis.jsx` – análisis facial y sonrisa
- `src/components/Cefalo.jsx` – placeholder para cefalometría
- `src/components/Report.jsx` – reporte final (usado para PDF)
- `src/lib/norms.js` – normas de Bolton y Tanaka–Johnston
- `src/lib/export.js` – exportación a PDF y JSON
- `src/hooks/useLocalStorage.js` – hook de persistencia

## Uso básico

1. Instala dependencias:

```bash
npm install
```

2. Inicia el servidor de desarrollo:

```bash
npm run dev
```

3. Abre la URL indicada en consola (por defecto `http://localhost:5173`).

4. Completa:
   - Datos del paciente
   - Análisis de modelos
   - Análisis facial y sonrisa

5. Genera el reporte desde el botón de exportación del sidebar:
   - PDF profesional
   - JSON para import/export de datos
