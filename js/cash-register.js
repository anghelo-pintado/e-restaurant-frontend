const registerData = [
  { idCaja: "1", Nombre: "Principal", Estado: "1", idSucursal: "1" },
  { idCaja: "2", Nombre: "Secundaria", Estado: "1", idSucursal: "2" },
  { idCaja: "3", Nombre: "Express", Estado: "1", idSucursal: "3" },
  { idCaja: "4", Nombre: "Vip", Estado: "2", idSucursal: "4" },
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
];

console.log("Script de cajas cargado");

let currentRegisterId = null;
let currentRegisterTitle = null;

// Función que se ejecuta cuando se carga la página
document.addEventListener("DOMContentLoaded", function () {
  console.log("DOM cargado en cash-register.js");
  initCashRegister();
});

function initDashboard(id, pettyCash, title) {
  document.getElementById(
    "dashboardTitle"
  ).textContent = `Dashboard de Caja ${title}`;
  document.getElementById("registerName").textContent = title;
  document.getElementById("initialAmount").textContent = pettyCash;

  // Aquí puedes agregar más lógica para inicializar el dashboard
  console.log("Dashboard inicializado para la caja:", title);
}

// Esta función también se puede llamar directamente en caso de que el DOM ya esté cargado
function initCashRegister() {
  console.log("Inicializando registro de caja");

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
      `;

    // Agrega el evento click
    registerCard.addEventListener("click", function () {
      console.log("Caja clickeada:", this.dataset.title);

      const id = this.dataset.idCaja;
      const title = this.dataset.Nombre;
      const isCardOpen = this.classList.contains("open");

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
            initDashboard(id, pettyCash, title);
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
          `.register-card[data-id="${currentRegisterId}"]`
        );
        registerCard.classList.add("open");
        registerCard.querySelector(
          ".register-title"
        ).textContent = `La Caja ${currentRegisterTitle} está Aperturada`;
        registerCard.querySelector(".register-title").style.color = "#FFFFFF";
        registerCard.querySelector(".register-branch").style.color = "#FFFFFF";

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
