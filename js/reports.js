document.addEventListener("DOMContentLoaded", function () {
  console.log("DOM cargado en reports.js");
  initReports();
});

function initReports() {
  console.log("Inicializando reportes");
  document.getElementById("current-time-report").textContent = formatDateLong();
}

if (
  document.readyState === "complete" ||
  document.readyState === "interactive"
) {
  console.log("Documento ya cargado, inicializando directamente");
  initReports();
}

// Función auxiliar para formatear la fecha actual
function formatDateLong() {
  const date = new Date();
  const options = {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    localeMatcher: "best fit",
  };

  return new Intl.DateTimeFormat("es-ES", options).format(date);
}
