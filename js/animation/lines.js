// Эффект "графитовой пыли"
document.addEventListener('DOMContentLoaded', () => {
  const svg = document.querySelector('.hero-animation svg');
  
  if (svg) {
      const createDustParticles = () => {
          const lines = document.querySelectorAll('.pencil-line');
          lines.forEach(line => {
              const length = line.getTotalLength();
              for (let i = 0; i < length; i += 15) {
                  const point = line.getPointAtLength(i);
                  const dust = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
                  dust.setAttribute('cx', point.x);
                  dust.setAttribute('cy', point.y);
                  dust.setAttribute('r', Math.random() * 0.8);
                  dust.setAttribute('fill', 'var(--color-graphite)');
                  dust.setAttribute('opacity', '0');
                  dust.style.animation = `fadeInOut ${1 + Math.random()}s ${i/100}s forwards`;
                  svg.appendChild(dust);
              }
          });
      };

      setTimeout(createDustParticles, 500);
  }
});