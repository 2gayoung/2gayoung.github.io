async function loadData() {
  const res = await fetch('data/positions.json');
  const data = await res.json();
  renderCards(data);
  renderTechChart(data);
}

function renderCards(data) {
  const container = document.getElementById('cards');
  container.innerHTML = '';
  data.forEach(item => {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <h2>${item.position}</h2>
      <h3>${item.company}</h3>
      <p><strong>형태:</strong> ${item.job_type} / <strong>경력:</strong> ${item.experience}</p>
      <p><strong>기술:</strong> ${item.tech_stack.join(', ')}</p>
      <p>${item.summary}</p>
    `;
    container.appendChild(card);
  });
}

function renderTechChart(data) {
  const ctx = document.getElementById('techChart').getContext('2d');
  const allTech = data.flatMap(d => d.tech_stack);
  const count = {};
  allTech.forEach(t => count[t] = (count[t] || 0) + 1);
  const labels = Object.keys(count);
  const values = Object.values(count);

  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [{
        label: '기술 키워드 분포',
        data: values,
        backgroundColor: 'rgba(54, 162, 235, 0.6)'
      }]
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}

window.onload = loadData;