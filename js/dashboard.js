const context = document.getElementById("my-chart").getContext("2d");

const data = {
  labels: ["Factura", "Boleta"],
  datasets: [
    {
      label: "Ventas",
      data: [12, 19],
      backgroundColor: ["rgba(255, 99, 132, 0.2)", "rgba(54, 162, 235, 0.2)"],
      hoverOffset: 4,
    },
  ],
};

const config = {
  type: "pie",
  data: data,
};

const myChart = new Chart(context, config);
