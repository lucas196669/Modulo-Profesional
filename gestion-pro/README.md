# Gestión Pro

Aplicación Ionic + Angular (standalone) para gestión de registros con roles, dashboard, gráficos y exportación.

## Tecnologías
- Ionic 8 + Angular
- RxJS, Chart.js, ng2-charts
- jsPDF + jspdf-autotable
- json-server (API REST simulada)
- Firebase Firestore (abstracción mock configurable)

## Instalación
`ash
cd gestion-pro
npm install
`

## Scripts
- 
pm start - Servidor de desarrollo
- 
pm run api - json-server en puerto 3000 (usa db.json)
- 
pm run build - Build de producción
- 
pm run docs - Compodoc en /documentation

## Credenciales de prueba
- admin@demo.com / Admin123!
- user@demo.com / User123!

## Arquitectura
- core/ - servicios, guards, interceptors, modelos
- shared/ - componentes reutilizables
- eatures/ - auth, dashboard, records, help
