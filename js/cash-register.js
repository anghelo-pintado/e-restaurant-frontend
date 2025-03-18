const registerData = [
  { idCaja: "1", Nombre: "Principal", Estado: "1", idSucursal: "1" },
  { idCaja: "2", Nombre: "Secundaria", Estado: "1", idSucursal: "2" },
  { idCaja: "3", Nombre: "Express", Estado: "1", idSucursal: "3" },
  { idCaja: "4", Nombre: "Vip", Estado: "2", idSucursal: "4" },
  { idCaja: "5", Nombre: "Exclusivo", Estado: "1", idSucursal: "5" },
];

const branchData = [
  {
    idSucursal: "1",
    Nombre: "Centro Comercial",
    Direccion: "Av. Principal 123",
  },
  { idSucursal: "2", Nombre: "Plaza Central", Direccion: "Av. Secundaria 456" },
  { idSucursal: "3", Nombre: "Sucursal Norte", Direccion: "Av. Norte 789" },
  { idSucursal: "4", Nombre: "Sucursal Sur", Direccion: "Av. Sur 012" },
  { idSucursal: "5", Nombre: "Sucursal Oeste", Direccion: "Av. Sur 013" },
];

const dashboardData = [
  {
    idDashboard: "1",
    cajaChica: 1000,
    ingresosTotales: 5000,
    egresosTotales: 2000,
    dineroContado: 3800,
    diferencia: 1000 + 5000 - 2000 - 3800,
    resumenVentas: {
      factura: { totalMonto: 3000, cantidad: 10 },
      boleta: { totalMonto: 1500, cantidad: 8 },
      ventasCanceladas: { cantidad: 2 },
    },
    totalClientes: 50,
    arqueoCaja: {
      billetes: 3500,
      monedas: 300,
      diferencia: 1000 + 5000 - 2000 - (3500 + 300),
    },
  },
  {
    idDashboard: "2",
    cajaChica: 1500,
    ingresosTotales: 6000,
    egresosTotales: 2500,
    dineroContado: 4800,
    diferencia: 1500 + 6000 - 2500 - 4800,
    resumenVentas: {
      factura: { totalMonto: 3500, cantidad: 12 },
      boleta: { totalMonto: 2500, cantidad: 10 },
      ventasCanceladas: { cantidad: 2 },
    },
    totalClientes: 65,
    arqueoCaja: {
      billetes: 4000,
      monedas: 800,
      diferencia: 1500 + 6000 - 2500 - (4000 + 800),
    },
  },
  {
    idDashboard: "3",
    cajaChica: 800,
    ingresosTotales: 4000,
    egresosTotales: 1500,
    dineroContado: 3100,
    diferencia: 800 + 4000 - 1500 - 3100,
    resumenVentas: {
      factura: { totalMonto: 2000, cantidad: 7 },
      boleta: { totalMonto: 1000, cantidad: 5 },
      ventasCanceladas: { cantidad: 1 },
    },
    totalClientes: 40,
    arqueoCaja: {
      billetes: 2500,
      monedas: 600,
      diferencia: 800 + 4000 - 1500 - (2500 + 600),
    },
  },
  {
    idDashboard: "4",
    cajaChica: 1200,
    ingresosTotales: 5500,
    egresosTotales: 2200,
    dineroContado: 4300,
    diferencia: 1200 + 5500 - 2200 - 4300,
    resumenVentas: {
      factura: { totalMonto: 3200, cantidad: 11 },
      boleta: { totalMonto: 1800, cantidad: 9 },
      ventasCanceladas: { cantidad: 2 },
    },
    totalClientes: 55,
    arqueoCaja: {
      billetes: 3600,
      monedas: 700,
      diferencia: 1200 + 5500 - 2200 - (3600 + 700),
    },
  },
  {
    idDashboard: "5",
    cajaChica: 2000,
    ingresosTotales: 7000,
    egresosTotales: 3000,
    dineroContado: 5800,
    diferencia: 2000 + 7000 - 3000 - 5800,
    resumenVentas: {
      factura: { totalMonto: 4000, cantidad: 15 },
      boleta: { totalMonto: 2500, cantidad: 10 },
      ventasCanceladas: { cantidad: 4 },
    },
    totalClientes: 75,
    arqueoCaja: {
      billetes: 4200,
      monedas: 1600,
      diferencia: 2000 + 7000 - 3000 - (4200 + 1600),
    },
  },
];

console.log("Script de cajas cargado");

let currentRegisterId = null;
let currentRegisterTitle = null;

// Función que se ejecuta cuando se carga la página
document.addEventListener("DOMContentLoaded", function () {
  console.log("DOM cargado en cash-register.js");
  initCashRegister();
});

function initDashboard(id, pettyCash, title, data) {
  document.getElementById("dashboard-title").textContent = `Caja ${title}`;
  document.getElementById("current-time-dashboard").textContent =
    formatDateLong();
  document.getElementById("initial-amount").textContent = formatCurrency(
    data.cajaChica
  );
  document.getElementById("total-income").textContent = formatCurrency(
    data.ingresosTotales
  );
  document.getElementById("total-expenses").textContent = formatCurrency(
    data.egresosTotales
  );
  document.getElementById("cash").textContent = formatCurrency(
    data.dineroContado
  );
  document.getElementById("cash").textContent = formatCurrency(
    data.dineroContado
  );
  document.getElementById("difference").textContent = formatCurrency(
    data.diferencia
  );
  document.getElementById("sales-summary").textContent = formatCurrency(
    data.resumenVentas.factura.totalMonto + data.resumenVentas.boleta.totalMonto
  );
  document.getElementById(
    "total-customer"
  ).textContent = `${data.totalClientes} clientes`;
  // Datos para el grafico pastel
  const ctx = document.getElementById("my-pie-chart").getContext("2d");
  new Chart(ctx, {
    type: "pie",
    data: {
      labels: ["Factura", "Boleta"],
      datasets: [
        {
          label: "Ventas",
          data: [
            data.resumenVentas.factura.totalMonto,
            data.resumenVentas.boleta.totalMonto,
          ],
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
          ],
          borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)"],
          borderWidth: 1,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
    },
  });

  // Datos para el grafico de barras
  const context = document.getElementById("my-bar-chart");
  new Chart(context, {
    type: "bar",
    data: {
      labels: ["Lun", "Mar", "Mie", "Jue", "Vie", "Sab", "Dom"],
      datasets: [
        {
          label: "# de clientes",
          data: [12, 19, 3, 5, 2, 3, 8],
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });

  console.log("Dashboard inicializado para la caja:", title);
}

// Genera las cajas dinamicamente
function initCashRegister() {
  console.log("Inicializando registro de caja");

  document.getElementById("current-time-cash").textContent = formatDateLong();

  const registersGrid = document.querySelector(".registers-grid");
  if (!registersGrid) {
    console.error("No se encontró el elemento .registers-grid");
    return;
  }

  const modalOverlay = document.getElementById("modalOverlay");
  const cancelButton = document.getElementById("cancelButton");
  const saveButton = document.getElementById("saveButton");
  const pettyCashInput = document.getElementById("pettyCash");
  const commentInput = document.getElementById("comment");
  const openDateInput = document.getElementById("openDate");

  console.log(`Hola ${openDateInput}`);

  if (openDateInput) {
    const today = new Date();
    const formattedDate = formatDate(today);

    const minDate = new Date();
    minDate.setDate(minDate.getDate() - 3);
    const formattedMinDate = formatDate(minDate);

    openDateInput.max = formattedDate;
    openDateInput.min = formattedMinDate;
    openDateInput.value = formattedDate;
  }

  console.log("Elementos encontrados:", {
    registersGrid: !!registersGrid,
    modalOverlay: !!modalOverlay,
    cancelButton: !!cancelButton,
    saveButton: !!saveButton,
  });

  // Limpia el contenedor de cajas
  registersGrid.innerHTML = "";

  // Genera las cajas dinámicamente
  registerData.forEach((register) => {
    console.log("Generando caja:", register);

    // Verifica si la caja ya está aperturada
    const isOpen = register.Estado == "1" ? true : false;

    // Crea el elemento de la caja
    const registerCard = document.createElement("div");
    registerCard.className = `register-card ${isOpen ? "open" : ""}`;
    registerCard.dataset.idCaja = register.idCaja;
    registerCard.dataset.Nombre = register.Nombre;
    registerCard.dataset.Estado = register.Estado;
    registerCard.dataset.Sucursal = branchData.find(
      (branch) => branch.idSucursal === register.idSucursal
    ).Nombre;

    registerCard.innerHTML = `
        <div class="register-title">Caja ${register.Nombre}</div>
        <div class="register-branch">Sucursal: ${
          branchData.find((branch) => branch.idSucursal === register.idSucursal)
            .Nombre
        }</div>
        <div class="register-divider"></div>
        <div class="register-sales">Suma de venta: S/ 3,200.00</div>
        <div class="info-tooltip" style="display: none;">
          <div class="info-title">Revisión Rápida</div>
          <div class="info-divider"></div>
          <div class="info-text">Caja Chica: ${formatCurrency(
            dashboardData.find(
              (dashboard) => dashboard.idDashboard === register.idCaja
            ).cajaChica
          )}</div>
          <div class="info-text">${
            isOpen ? `Abierto por: ` : `Fue abierto por: `
          } Juan Perez</div>
          <div class="info-text">${
            isOpen ? `Hora de apertura: ` : `Se aperturó: `
          } 10:30 am</div>
        </div>
      `;

    registerCard.addEventListener("mouseenter", function () {
      const tooltip = this.querySelector(".info-tooltip");
      if (tooltip) {
        tooltip.style.display = "block";
      }
    });

    registerCard.addEventListener("mouseleave", function () {
      const tooltip = this.querySelector(".info-tooltip");
      if (tooltip) {
        tooltip.style.display = "none";
      }
    });

    registerCard.addEventListener("click", function () {
      console.log("Caja clickeada:", this.dataset.Nombre);

      const id = this.dataset.idCaja;
      const title = this.dataset.Nombre;
      const isCardOpen = this.classList.contains("open");

      console.log(id, title, isCardOpen);

      if (!isCardOpen) {
        // Si la caja está cerrada, mostramos el modal para aperturarla
        currentRegisterId = id;
        currentRegisterTitle = title;
        modalOverlay.style.display = "flex";
        console.log("Mostrando modal para aperturar caja:", title);
      } else {
        // Si ya está aperturada, redirigimos al dashboard
        const pettyCash = localStorage.getItem(`pettyCash_${id}`);
        console.log("Redirigiendo al dashboard de caja:", title);
        $("#main").load("dashboard.html", function (response, status, xhr) {
          if (status == "success") {
            const data = dashboardData.find((e) => e.idDashboard === `${id}`);
            initDashboard(id, pettyCash, title, data);
          } else {
            $("#main").html(
              "<p>Lo sentimos, ocurrió un error al cargar el dashboard.</p>"
            );
          }
        });
      }
    });

    registersGrid.appendChild(registerCard);
  });

  // Eventos para el modal
  if (cancelButton) {
    cancelButton.addEventListener("click", function () {
      console.log("Modal cancelado");
      modalOverlay.style.display = "none";
    });
  }

  if (modalOverlay) {
    modalOverlay.addEventListener("click", function (e) {
      if (e.target === modalOverlay) {
        console.log("Click fuera del modal - cerrando");
        modalOverlay.style.display = "none";
      }
    });
  }

  if (saveButton) {
    saveButton.addEventListener("click", function () {
      console.log("Guardando apertura de caja");

      const pettyCash = pettyCashInput.value;
      const comment = commentInput.value;

      console.log("Datos de apertura:", { pettyCash, comment });

      if (pettyCash) {
        // Guardar en localStorage
        console.log("Datos de apertura:", { currentRegisterId });
        localStorage.setItem(`pettyCash_${currentRegisterId}`, pettyCash);
        localStorage.setItem(`comment_${currentRegisterId}`, comment);
        localStorage.setItem(
          `openDate_${currentRegisterId}`,
          openDateInput.value
        );
        localStorage.setItem(
          `title_${currentRegisterId}`,
          currentRegisterTitle
        );

        // Cerrar modal
        modalOverlay.style.display = "none";

        // Actualizar la interfaz
        const registerCard = document.querySelector(
          `.register-card[data-id-caja="${currentRegisterId}"]`
        );
        registerCard.classList.add("open");

        showNotification(
          `Caja ${currentRegisterTitle} aperturó con la fecha: ${formatDateLong(
            new Date(openDateInput.value)
          )}`,
          5000
        );

        console.log("Caja aperturada exitosamente:", currentRegisterTitle);
      } else {
        alert("Por favor ingresa un monto para la caja chica");
      }
    });
  }
}

// Si la página ya se ha cargado cuando se ejecuta el script, inicializar directamente
if (
  document.readyState === "complete" ||
  document.readyState === "interactive"
) {
  console.log("Documento ya cargado, inicializando directamente");
  initCashRegister();
}

// Función auxiliar para formatear fechas como YYYY-MM-DD
function formatDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

// Función auxiliar para formatear los montos a moneda peruana
function formatCurrency(value) {
  return value.toLocaleString("es-PE", {
    style: "currency",
    currency: "PEN",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

// Función auxiliar para formatear la fecha actual
function formatDateLong(date) {
  if (!date) date = new Date();
  const options = {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    localeMatcher: "best fit",
  };

  return new Intl.DateTimeFormat("es-ES", options).format(date);
}

// Función auxiliar para mostrar notificaciones
function showNotification(message, duration) {
  const notification = document.getElementById("notification");
  const notificationMessage = document.getElementById("notification-message");

  notificationMessage.textContent = message;
  notification.classList.remove("hidden");

  setTimeout(() => {
    notification.classList.add("show");
  }, 10);

  setTimeout(() => {
    notification.classList.remove("show");
    setTimeout(() => {
      notification.classList.add("hidden");
    }, 500);
  }, duration || 3000);
}
