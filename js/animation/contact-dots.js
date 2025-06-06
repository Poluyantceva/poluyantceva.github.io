// Этот код должен быть в вашем js/animations/contactDots.js или аналогичном файле,
// и подключен в index.html.

(function() {
    const section = document.querySelector('.contact-section-preserved');
    if (!section) return;

    const dotsContainer = document.createElement('div');
    dotsContainer.className = 'contact-dots-container';
    // Стили для dotsContainer уже в CSS, но если нужно добавить что-то специфичное здесь,
    // например, z-index, который должен быть в CSS, но для абсолютной гарантии можно и тут.
    // section.appendChild(dotsContainer); // Добавляем контейнер в DOM здесь
    
    const colors = [
      'rgba(235, 222, 107, 0.69)',       // Основной золотой
      'rgba(243, 231, 160, 0.84)',        // Светлое золото
      'rgba(240, 223, 139, 0.75)',         // Свечение золота
      'rgba(250, 244, 165, 0.56)',   // Полупрозрачное золото
      'rgba(252, 235, 143, 0.69)',                  // Светло-золотой
      'rgba(207, 192, 51, 0.68)',                    // Насыщенный золотой
    ];
 
    const dotCount = 48; // Умеренное количество точек
 
    for (let i = 0; i < dotCount; i++) {
      const dot = document.createElement('div');
      dot.className = 'contact-dot';
      
      const size = Math.random() * 2 + 4; // Размер от 4px до 12px
      const color = colors[Math.floor(Math.random() * colors.length)];
      // Длительности и задержки для анимаций
      const durationTwinkle = Math.random() * 6 + 6; // Длительность мерцания
      const delayTwinkle = Math.random() * 2; // Задержка начала мерцания
      const durationFloat = Math.random() * 10 + 6; // Длительность укачивающего движения
      const delayFloat = Math.random() * 2; // Задержка начала укачивающего движения

      const x = Math.random() * 100; // Позиция по X в %
      const y = Math.random() * 100; // Позиция по Y в %
      
      dot.style.cssText = `
        width: ${size}px;
        height: ${size}px;
        left: ${x}%;
        top: ${y}%;
        background-color: ${color};
        /* animation-duration и animation-delay теперь используются из JS-переменных */
        animation: contact-dot-twinkle ${durationTwinkle}s infinite alternate ${delayTwinkle}s,
                   contact-dot-float ${durationFloat}s infinite alternate ease-in-out ${delayFloat}s;
      `;
      
      dotsContainer.appendChild(dot);
    }
    section.appendChild(dotsContainer); // ДОБАВЛЕНИЕ КОНТЕЙНЕРА В DOM ПЕРЕНЕСЕНО СЮДА, ПОСЛЕ ДОБАВЛЕНИЯ ТОЧЕК
})();