let records = [];
let pieChart;

function addRecord() {
  const date = document.getElementById('date').value;
  const category = document.getElementById('category').value;
  const amount = parseFloat(document.getElementById('amount').value);
  const note = document.getElementById('note').value;

  if (!date || !category || isNaN(amount)) {
    alert("請填寫完整資料！");
    return;
  }

  const record = { date, category, amount, note };
  records.push(record);

  updateRecordList();
  updateTotalAmount();
  updatePieChart();
  saveToGoogleSheet(record);

  // 清空輸入欄
  document.getElementById('date').value = "";
  document.getElementById('category').value = "";
  document.getElementById('amount').value = "";
  document.getElementById('note').value = "";
}

function updateRecordList() {
  const recordList = document.getElementById('record-list');
  recordList.innerHTML = '';

  records.forEach((record, index) => {
    const div = document.createElement('div');
    div.className = 'record-item';
    div.innerHTML = `
      <strong>${record.date}</strong> | ${record.category} | ${record.amount}元<br>
      <small>${record.note}</small>
      <button class="delete-button" onclick="deleteRecord(${index})">×</button>
    `;
    recordList.appendChild(div);
  });
}

function updateTotalAmount() {
  const total = records.reduce((sum, record) => sum + record.amount, 0);
  document.getElementById('total-amount').textContent = total;
}

function deleteRecord(index) {
  records.splice(index, 1);
  updateRecordList();
  updateTotalAmount();
  updatePieChart();
}

function updatePieChart() {
  const categories = ['食', '交通', '娛樂', '日用品', '其他'];
  const amounts = [0, 0, 0, 0, 0];

  records.forEach(record => {
    const idx = categories.indexOf(record.category);
    if (idx !== -1) {
      amounts[idx] += record.amount;
    }
  });

  const ctx = document.getElementById('pieChart').getContext('2d');

  if (pieChart) {
    pieChart.destroy();
  }

  pieChart = new Chart(ctx, {
    type: 'pie',
    data: {
      labels: categories,
      datasets: [{
        data: amounts,
        backgroundColor: [
          '#F7C5CC',  // 食
          '#F2D7B6',  // 交通
          '#BFD8B8',  // 娛樂
          '#A7C7E7',  // 日用品
          '#D1CFE2'   // 其他
        ]
      }]
    },
    options: {
      plugins: {
        datalabels: {
          formatter: (value, context) => {
            const sum = context.chart.data.datasets[0].data.reduce((a, b) => a + b, 0);
            const percentage = (value / sum * 100).toFixed(1) + '%';
            return percentage;
          },
          color: '#333',
          font: {
            weight: 'bold',
            size: 14
          }
        }
      }
    },
    plugins: [ChartDataLabels] // 加這行
  });
}

function saveToGoogleSheet(record) {
  fetch('https://docs.google.com/spreadsheets/d/1VdL8b5zNMeRngkzBbf-T7SzWfNUeMZNLqFf3ZliihBQ/edit?usp=sharing', {
    method: 'POST',
    mode: 'no-cors',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(record)
  });
}
