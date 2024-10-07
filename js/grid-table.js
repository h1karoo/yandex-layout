function createGridTable(data) {
    const gridTable = document.getElementById('gridTable');
  
    data.forEach(item => {
      const gridItem = document.createElement('div');
      gridItem.classList.add('grid-item');
      if (item.number === 3) {
        gridItem.classList.add('item-3');
      } else if (item.number === 7) {
        gridItem.classList.add('item-7');
        
        const airplane = document.createElement('img');
        airplane.src = 'img/steps-air.png';
        airplane.alt = 'Самолет';
        airplane.classList.add('airplane-image');
        gridItem.appendChild(airplane);
      }
  
      const number = document.createElement('div');
      number.classList.add('grid-number');
      number.textContent = item.number;
  
      const content = document.createElement('div');
      content.classList.add('grid-content');
      content.textContent = item.content;
  
      gridItem.appendChild(number);
      gridItem.appendChild(content);
      gridTable.appendChild(gridItem);
    });
  }
  fetch('data.json')
  .then(response => response.json())
  .then(data => {
    createGridTable(data);
  })
  .catch(error => console.error('Ошибка загрузки данных:', error));
  