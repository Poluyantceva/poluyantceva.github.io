// js/animations/chalkParticles.js

document.addEventListener('DOMContentLoaded', () => {
    const quote = document.querySelector('.origins-quote');
    let particleInterval; // Переменная для хранения ID интервала
    let isHovering = false; // Флаг, чтобы отслеживать состояние наведения

    if (quote) {
        // Убедимся, что родительский элемент цитаты имеет position: relative
        // чтобы абсолютно позиционированные частицы работали корректно.
        // Если quote-wrapper уже имеет position: relative, то это не обязательно.
        // Если же нет, то нужно добавить к .origins-quote или к .origins-quote-wrapper:
        // quote.style.position = 'relative'; // Можно добавить это прямо в JS, если CSS не управляет

        // Убедитесь, что .origins-quote имеет position: relative; в CSS!
        // Это КРАЙНЕ важно для позиционирования частиц.

        quote.addEventListener('mouseenter', () => {
            if (!isHovering) { // Запускаем интервал только если не наводились
                isHovering = true;
                // Запускаем интервал, который будет создавать частицы
                particleInterval = setInterval(() => {
                    createChalkParticle(quote);
                }, 50); // Создавать новую частицу каждые 50 мс
            }
        });

        quote.addEventListener('mouseleave', () => {
            isHovering = false;
            clearInterval(particleInterval); // Останавливаем создание частиц
        });
    }

    function createChalkParticle(container) {
        const particle = document.createElement('div');
        particle.classList.add('chalk-particle');

        // Случайные размеры для частиц (от 2 до 5 пикселей)
        const size = Math.random() * 3 + 2;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;

        // Случайная позиция по X в пределах ширины цитаты
        // Добавляем небольшой случайный сдвиг, чтобы частицы появлялись не строго из одной точки
        const rect = container.getBoundingClientRect(); // Размеры и позиция цитаты
        const x = Math.random() * rect.width; // Появление по ширине цитаты
        particle.style.left = `${x}px`;
        particle.style.top = `${rect.height / 2}px`; // Можно начать от середины цитаты или от верха

        // Случайное смещение по X и Y для анимации падения
        // fall-x: от -20 до 20px (немного влево/вправо)
        // fall-y: от 50 до 100px (падают вниз)
        const fallX = (Math.random() - 0.5) * 40;
        const fallY = Math.random() * 50 + 50; // Падают вниз на 50-100px
        particle.style.setProperty('--fall-x', `${fallX}px`);
        particle.style.setProperty('--fall-y', `${fallY}px`);

        container.appendChild(particle);

        // Удаляем частицу после завершения анимации, чтобы не засорять DOM
        particle.addEventListener('animationend', () => {
            particle.remove();
        });
    }
});