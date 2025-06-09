document.addEventListener('DOMContentLoaded', () => {
  const spheres = [
    { element: document.querySelector('.sphere-large'), gif: 'https://i.gifer.com/iEV.gif' },
    { element: document.querySelector('.sphere-medium'), gif:'https://i.gifer.com/14pE.gif' },
    { element: document.querySelector('.sphere-small'), gif: 'https://i.gifer.com/TMgI.gif' }
  ];

  spheres.forEach(sphere => {
    sphere.element.innerHTML = `<img src="${sphere.gif}" loading="lazy" alt="">`;
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const spheres = [
      { element: document.querySelector('.sphere-large'), gif: 'https://i.gifer.com/iEV.gif' },
      { element: document.querySelector('.sphere-medium'), gif:'https://i.gifer.com/14pE.gif' },
      { element: document.querySelector('.sphere-small'), gif: 'https://i.gifer.com/TMgI.gif' }
  ];

  spheres.forEach(sphere => {
      sphere.element.innerHTML = `<img src="${sphere.gif}" loading="lazy" alt="">`;
  });
});

// --- НОВЫЙ КОД ДЛЯ ПЫЛЬЦЫ (ДОБАВЛЯЕМ НИЖЕ СУЩЕСТВУЮЩЕГО БЛОКА) ---
// --- КОД ДЛЯ ПЫЛЬЦЫ ---
document.addEventListener('DOMContentLoaded', () => {
  const magicEffectsContainer = document.querySelector('.adaptation-spheres .magic-effects-container');
  
  if (!magicEffectsContainer) {
      console.warn('magicSpheres.js: .magic-effects-container not found within .adaptation-spheres. Dust particles will not be generated.');
      return; 
  }

  const generateDustParticles = (count = 350) => { // 200 частиц, можно регулировать
      const colors = [
          'var(--gold-light)',        
          'var(--color-paper)',      
          '' 
      ];
      const style = getComputedStyle(document.documentElement);
      colors[2] = style.getPropertyValue('--color-terracotta'); 

      const containerWidth = magicEffectsContainer.offsetWidth;
      const containerHeight = magicEffectsContainer.offsetHeight; // Высота ИМЕННО контейнера пыльцы

      // Учитываем, что частица стартует выше контейнера
      const startOffsetTop = 50; // На сколько пикселей выше верхнего края контейнера может стартовать пыльца

      // Дополнительный запас, на сколько пикселей ниже контейнера частица "улетает"
      const extraFallDistanceBelowContainer = 50; // Например, 100px за нижний край


      for (let i = 0; i < count; i++) {
          const particle = document.createElement('div');
          particle.classList.add('dust-particle');

          const randomColor = colors[Math.floor(Math.random() * colors.length)];
          particle.style.backgroundColor = randomColor;

          // Размер частиц (от 0.5px до 1.5px)
          const size = Math.random() * 1.5 + 2.5 + 'px'; 
          particle.style.width = size;
          particle.style.height = size;

          const startX = Math.random() * containerWidth + 'px';
          particle.style.left = startX;

          // ИЗМЕНЕНИЕ: Начальная позиция Y
          // Будет генерироваться от -startOffsetTop до 0. 
          // Например, от -100px до 0px, что означает старт выше верхнего края контейнера.
          const startY = Math.random() * startOffsetTop - startOffsetTop + 'px'; 
          particle.style.top = startY;

          
          const fallDistance = containerHeight + startOffsetTop + Math.random() * extraFallDistanceBelowContainer + 'px'; 
          particle.style.setProperty('--fall-distance', fallDistance);

          // Длительность анимации: от 10 до 20 секунд (чем дольше, тем медленнее)
          const duration = Math.random() * 4 + 10 + 's'; 
          // Задержка появления: от 0 до 15 секунд (можно уменьшить для более плотного потока)
          const delay = Math.random() * 5 + 's'; 

          particle.style.animation = `
              dustFallAndFade ${duration} linear infinite ${delay},
              dustSparkle ${Math.random() * 3 + 1}s ease-in-out infinite alternate ${delay}
          `;
          
          magicEffectsContainer.appendChild(particle);
      }
  };

  generateDustParticles(); 
});