(function() {
  const starsContainer = document.querySelector('.cta-stars-container');
  const figuresContainer = document.querySelector('.cta-figures-container');
  const section = document.querySelector('.cta-section');
  
  if (!section) return;

  createStars();
  createFigures();
  createDottedLines(); // Добавляем вызов функции создания линий
  
  function createStars() {
    const starCount = 50;
    const sectionRect = section.getBoundingClientRect();
    
    for (let i = 0; i < starCount; i++) {
      const star = document.createElement('div');
      star.classList.add('cta-star');
      
      const size = Math.random() * 3 + 1;
      const x = Math.random() * sectionRect.width;
      const y = Math.random() * sectionRect.height;
      const duration = Math.random() * 3 + 2;
      const delay = Math.random() * 5;
      
      star.style.cssText = `
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        animation-duration: ${duration}s;
        animation-delay: ${delay}s;
        background-color: var(--color-star-glow);
        border-radius: 50%;
        position: absolute;
        pointer-events: none;
        animation: twinkle ${duration}s infinite alternate;
      `;
      
      starsContainer.appendChild(star);
    }
  }
  
  function createFigures() {
    const figureCount = 5;
    const sectionRect = section.getBoundingClientRect();
    const figureTypes = ['triangle', 'circle', 'rectangle', 'line'];
    
    // Фигуры для левой стороны
    for (let i = 0; i < figureCount; i++) {
      createFigure(figureTypes, 'left');
    }
    
    // Фигуры для правой стороны
    for (let i = 0; i < figureCount; i++) {
      createFigure(figureTypes, 'right');
    }
  }
  
  function createFigure(figureTypes, side) {
    const sectionRect = section.getBoundingClientRect();
    const figure = document.createElement('div');
    figure.classList.add('cta-figure');
    
    const type = figureTypes[Math.floor(Math.random() * figureTypes.length)];
    const size = Math.random() * 100 + 50;
    const y = Math.random() * (sectionRect.height - size);
    const duration = Math.random() * 40 + 20;
    const fadeDuration = Math.random() * 1 + 10;
    
    // Позиционирование в зависимости от стороны
    const positionStyle = side === 'left' 
      ? `left: ${Math.random() * 150}px;`
      : `right: ${Math.random() * 150}px;`;
    
    figure.innerHTML = createFigureSVG(type);
    figure.style.cssText = `
      width: ${size}px;
      height: ${size}px;
      top: ${y}px;
      ${positionStyle}
      position: absolute;
      pointer-events: none;
      z-index: 1;
      animation: 
        cta-float ${duration}s infinite alternate ease-in-out, 
        cta-fade ${fadeDuration}s infinite alternate ease-in-out;
    `;
    
    figuresContainer.appendChild(figure);
  }
  
  // Функция для создания пунктирных линий
  function createDottedLines() {
    const sectionRect = section.getBoundingClientRect();
    
    // Левая сторона - синусоида
    createLine('left', 'wave', sectionRect.height * 0.3);
    createLine('left', 'straight', sectionRect.height * 0.7);
    
    // Правая сторона - горизонтальные линии
    createLine('right', 'straight', sectionRect.height * 0.4);
    createLine('right', 'wave', sectionRect.height * 0.8);
  }
  
  function createLine(side, type, top) {
    const line = document.createElement('div');
    line.classList.add('cta-dotted-line', `cta-dotted-line--${side}`);
    
    const width = 300;
    const height = type === 'wave' ? 30 : 2;
    const delay = Math.random() * 3;
    
    line.style.cssText = `
      width: ${width}px;
      height: ${height}px;
      top: ${top}px;
      ${side === 'left' ? 'left' : 'right'}: ${Math.random() * 30}px;
      animation-delay: ${delay}s;
    `;
    
    // Генерация SVG в зависимости от типа линии
    line.innerHTML = type === 'wave' 
      ? `<svg viewBox="0 0 300 30" xmlns="http://www.w3.org/2000/svg">
           <path d="M0,15 C60,0 120,30 180,15 S300,5 300,15" 
                 fill="none" 
                 stroke="rgba(165, 200, 210, 0.37)" 
                 stroke-width="1" 
                 stroke-dasharray="5,3"/>
         </svg>`
      : `<svg viewBox="0 0 150 2" xmlns="http://www.w3.org/2000/svg">
           <line x1="0" y1="1" x2="150" y2="1" 
                 stroke="rgba(165, 200, 210, 0.37)" 
                 stroke-width="1" 
                 stroke-dasharray="5,3"/>
         </svg>`;
    
    figuresContainer.appendChild(line);
  }
  
  function createFigureSVG(type) {
    const strokeColor = 'rgba(173, 216, 230, 0.50)';
    switch(type) {
      case 'triangle':
        return `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><path d="M50 10 L90 90 L10 90 Z" fill="none" stroke="${strokeColor}" stroke-width="1"/></svg>`;
      case 'circle':
        return `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><circle cx="50" cy="50" r="45" fill="none" stroke="${strokeColor}" stroke-width="1"/></svg>`;
      case 'rectangle':
        return `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><rect x="10" y="10" width="80" height="80" fill="none" stroke="${strokeColor}" stroke-width="1"/></svg>`;
      case 'line':
        return `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><path d="M10 50 Q50 10 90 50 T170 50" fill="none" stroke="${strokeColor}" stroke-width="1" stroke-dasharray="5,3"/></svg>`;
    }
  }
})();