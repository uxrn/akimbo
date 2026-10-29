// X embeds carousel: 3 visible (1 on mobile), auto-advance every 3s, fixed height
(function() {
  document.addEventListener('DOMContentLoaded', function() {
    const carousel = document.getElementById('xCarousel');
    if (!carousel) return;
    const track = carousel.querySelector('.x-carousel-track');
    const slides = Array.from(track.children);
    const total = slides.length;
    let index = 0;
    let visible = window.innerWidth < 768 ? 1 : 3;
    let timer;

    function updateVisible() {
      visible = window.innerWidth < 768 ? 1 : 3;
      const w = carousel.clientWidth;
      slides.forEach(s => {
        s.style.flex = 'none';
        s.style.width = (w / visible) + 'px';
      });
      if (index > total - visible) index = Math.max(0, total - visible);
      move();
      lockHeight();
    }

    function move() {
      const slideW = slides[0].offsetWidth;
      track.style.transform = `translateX(-${slideW * index}px)`;
    }

    function next() {
      index = (index + 1) % (total - visible + 1);
      move();
    }
    function prev() {
      index = (index - 1 + (total - visible + 1)) % (total - visible + 1);
      move();
    }

    function lockHeight() {
      const heights = slides.map(s => {
        const iframe = s.querySelector('iframe');
        return Math.max(s.scrollHeight, iframe ? iframe.offsetHeight : 0, s.offsetHeight);
      });
      const h = Math.max(...heights);
      if (h > 100) {
        carousel.style.height = (h + 30) + 'px';
        carousel.style.minHeight = (h + 30) + 'px';
      }
    }

    document.querySelector('.x-next')?.addEventListener('click', () => { next(); resetTimer(); });
    document.querySelector('.x-prev')?.addEventListener('click', () => { prev(); resetTimer(); });

    function startTimer() { timer = setInterval(next, 5000); }
    function resetTimer() { clearInterval(timer); startTimer(); }

    window.addEventListener('resize', updateVisible);
    updateVisible();
    startTimer();

    // Keep checking height as Twitter embeds load
    let checks = 0;
    const check = setInterval(() => {
      lockHeight();
      checks++;
      if (checks > 30) clearInterval(check);
    }, 500);

    // Also listen for Twitter widget render if available
    if (window.twttr && window.twttr.ready) {
      window.twttr.ready(function(twttr) {
        twttr.events.bind('rendered', lockHeight);
      });
    }
  });
})();
