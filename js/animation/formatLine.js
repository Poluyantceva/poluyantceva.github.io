document.addEventListener('DOMContentLoaded', () => {
  const container = document.querySelector('.algorithm-steps');
  const steps = document.querySelectorAll('.step');
  
  // Создаем SVG для линии
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('width', '100%');
  svg.setAttribute('height', '100%');
  svg.style.position = 'absolute';
  svg.style.top = '0';
  svg.style.left = '0';
  svg.style.zIndex = '0';
  container.prepend(svg);
  
  // Координаты для синусоиды
  const points = [];
  steps.forEach(step => {
    const rect = step.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();
    points.push({
      x: rect.left + rect.width/2 - containerRect.left,
      y: rect.top + rect.height/2 - containerRect.top
    });
  });
  

  // --- ВСТАВЛЯЕМ КОД ДЛЯ КРУЖОЧКОВ ЗДЕСЬ ---
  points.forEach((point, index) => {
    const dot = document.createElement('div');
    dot.classList.add('line-dot'); // Используем класс, который мы стилизовали в CSS
    dot.style.left = `${point.x}px`;
    dot.style.top = `${point.y}px`;
    container.appendChild(dot); // Добавляем кружочек в тот же контейнер, что и SVG
});
// --- КОНЕЦ ВСТАВКИ ДЛЯ КРУЖОЧКОВ ---
  
  // Рисуем кривую линию
  const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  let d = `M${points[0].x},${points[0].y}`;
  
  for (let i = 1; i < points.length; i++) {
    const cp1x = points[i-1].x + (points[i].x - points[i-1].x) / 2;
    const cp1y = points[i-1].y;
    const cp2x = points[i].x - (points[i].x - points[i-1].x) / 2;
    const cp2y = points[i].y;
    
    d += ` C${cp1x},${cp1y} ${cp2x},${cp2y} ${points[i].x},${points[i].y}`;
  }
  
  path.setAttribute('d', d);
  path.setAttribute('fill', 'none');
  path.setAttribute('stroke', 'var(--color-ochre)');
  path.setAttribute('stroke-width', '2');
  path.setAttribute('stroke-dasharray', '5,5');
  path.style.opacity = '0.7';

   path.classList.add('animated-dash-line'); // <-- ЭТО ЗДЕСЬ ОСТАЕТСЯ

   svg.appendChild(path);
  
  
  

});

