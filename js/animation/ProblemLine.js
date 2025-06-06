// js/animations/ProblemLines.js

// Этот скрипт будет напрямую подключаться в HTML и самодостаточен.
// Он инициализирует линии сразу после загрузки DOM и запускает их зацикленные анимации.

document.addEventListener('DOMContentLoaded', () => {
    const problemsContent = document.querySelector('.problems-content');

    if (!problemsContent) {
        console.warn('ProblemLines: .problems-content element not found. Lines cannot be initialized.');
        return;
    }

    // --- 1. Создаем SVG-контейнер ---
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.classList.add('problems-background-lines');
    svg.setAttribute('width', '100%');
    svg.setAttribute('height', '100%');
    svg.setAttribute('viewBox', '0 0 800 600'); // Адаптируйте под пропорции вашего problems-content
    svg.setAttribute('preserveAspectRatio', 'xMidYMid slice');

    // Базовые стили для SVG-контейнера установлены в _animations.css, здесь не дублируем

    problemsContent.prepend(svg); // Добавляем SVG в начало problems-content

    // --- 2. Определяем данные для линий ---
    const pathsData = [
        'M 50 100 L 750 105',
        'M 30 200 L 680 195',
        'M 80 300 L 780 305',
        'M 20 400 L 720 395',
        'M 60 500 L 760 505',
        'M 100 50 L 700 550',
        'M 700 50 L 100 550'
    ];

    // --- 3. Создаем SVG-линии (paths) и добавляем их в SVG-контейнер ---
    pathsData.forEach((d, index) => {
        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        path.classList.add('problem-line', `line-${index + 1}`);
        path.setAttribute('d', d);

        // Получаем фактическую длину SVG-пути для анимации dashoffset
        const length = path.getTotalLength();
        path.style.setProperty('--problem-line-dash-length', length + 'px');
        path.style.setProperty('--problem-line-animation-delay', `${index * 0.08}s`); // Небольшая задержка между линиями

        svg.appendChild(path);

        // Сразу после создания и установки переменных, добавляем класс для запуска анимации
        // Анимация запустится благодаря тому, что стили для .problem-line.is-active уже есть в CSS
        path.classList.add('is-active'); 
    });

    // Нет Intersection Observer и логики скролла. Анимация запускается сразу.
});