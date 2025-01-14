const cargoList = [
    {
      id: "CARGO001",
      name: "Строительные материалы",
      status: "В пути",
      origin: "Москва",
      destination: "Казань",
      departureDate: "2024-11-24"
    },
    {
      id: "CARGO002",
      name: "Хрупкий груз",
      status: "Ожидает отправки",
      origin: "Санкт-Петербург",
      destination: "Екатеринбург",
      departureDate: "2024-11-26"
    }
  ];
  
  function renderTable() {
    const tableBody = document.getElementById('cargoTableBody');
    tableBody.innerHTML = cargoList.map(cargo => `
      <tr>
        <td>${cargo.id}</td>
        <td>${cargo.name}</td>
        <td>
          <select class="status-select form-select" data-id="${cargo.id}">
            <option value="Ожидает отправки" ${cargo.status === 'Ожидает отправки' ? 'selected' : ''}>Ожидает отправки</option>
            <option value="В пути" ${cargo.status === 'В пути' ? 'selected' : ''}>В пути</option>
            <option value="Доставлен" ${cargo.status === 'Доставлен' ? 'selected' : ''}>Доставлен</option>
          </select>
        </td>
        <td>${cargo.origin}</td>
        <td>${cargo.destination}</td>
        <td>${cargo.departureDate}</td>
      </tr>
    `).join('');
  }
  
  document.getElementById('addCargoForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const newCargo = {
      id: `CARGO${String(cargoList.length + 1).padStart(3, '0')}`,
      name: document.getElementById('cargoName').value,
      status: "Ожидает отправки",
      origin: document.getElementById('origin').value,
      destination: document.getElementById('destination').value,
      departureDate: document.getElementById('departureDate').value
    };
    cargoList.push(newCargo);
    renderTable();
    e.target.reset(); // Очистка формы
  });
  
  document.addEventListener('change', (e) => {
    if (e.target.classList.contains('status-select')) {
      const cargoId = e.target.dataset.id;
      const newStatus = e.target.value;
      const cargo = cargoList.find(c => c.id === cargoId);
      if (newStatus === 'Доставлен' && new Date(cargo.departureDate) > new Date()) {
        alert('Ошибка: груз не может быть доставлен, если дата отправления в будущем.');
        e.target.value = cargo.status;
        return;
      }
      cargo.status = newStatus;
      renderTable();
    }
  });
  
  renderTable();