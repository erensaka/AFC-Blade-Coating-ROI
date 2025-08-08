let chart;

function calculateCosts() {
  const costNewBlade = parseFloat(document.getElementById("costNewBlade").value);
  const epoxyAmountPerBlade = parseFloat(document.getElementById("epoxyAmountPerBlade").value);
  const epoxyUnitPrice = parseFloat(document.getElementById("epoxyUnitPrice").value);
  const serviceCostPerBlade = parseFloat(document.getElementById("serviceCostPerBlade").value);
  const bladeLifespanDays = parseFloat(document.getElementById("bladeLifespanDays").value);
  const operationDurationDays = parseFloat(document.getElementById("operationDurationDays").value);
  const numberOfBlades = parseInt(document.getElementById("numberOfBlades").value);

  const coatedLifespan = bladeLifespanDays * 2;
  const epoxyCostPerBlade = epoxyAmountPerBlade * epoxyUnitPrice;
  const totalCoatedCostPerBlade = epoxyCostPerBlade + serviceCostPerBlade;

  const labels = [];
  const newBladeCosts = [];
  const coatedBladeCosts = [];

  let cumulativeNew = 0;
  let cumulativeCoated = 0;

  for (let day = 0; day <= operationDurationDays; day += 1) {
    if (day % bladeLifespanDays === 0) {
      cumulativeNew += numberOfBlades * costNewBlade;
    }
    if (day % coatedLifespan === 0) {
      cumulativeCoated += numberOfBlades * totalCoatedCostPerBlade;
    }

    if (day % 7 === 0 || day === operationDurationDays) {
      labels.push(`Gün ${day}`);
      newBladeCosts.push(cumulativeNew);
      coatedBladeCosts.push(cumulativeCoated);
    }
  }

  if (chart) chart.destroy();

  const ctx = document.getElementById("costChart").getContext("2d");
  chart = new Chart(ctx, {
    type: "line",
    data: {
      labels,
      datasets: [
        {
          label: "Yeni Bıçak Maliyeti",
          data: newBladeCosts,
          borderColor: "#008b8b",
          backgroundColor: "rgba(0, 139, 139, 0.1)",
          borderWidth: 2,
          tension: 0.2
        },
        {
          label: "Kaplanmış Bıçak Maliyeti",
          data: coatedBladeCosts,
          borderColor: "#222",
          backgroundColor: "rgba(34, 34, 34, 0.1)",
          borderWidth: 2,
          tension: 0.2
        }
      ]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: "top"
        },
        title: {
          display: true,
          text: "Toplam Maliyet Karşılaştırması"
        }
      },
      scales: {
        y: {
          title: {
            display: true,
            text: "Maliyet (₺)"
          }
        },
        x: {
          title: {
            display: true,
            text: "Gün"
          }
        }
      }
    }
  });
}
