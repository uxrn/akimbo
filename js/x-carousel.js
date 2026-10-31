// X embeds carousel: 3 visible on desktop, 1 on mobile, manual arrows only
(function() {
  document.addEventListener('DOMContentLoaded', function() {
    const carousel = document.getElementById('xCarousel');
    if (!carousel) return;
    const track = carousel.querySelector('.x-carousel-track');
    const slides = Array.from(track.children);
    const total = slides.length;
    const wrap = carousel.closest('.x-carousel-wrap');
    const prevBtn = wrap?.querySelector('.x-prev');
    const nextBtn = wrap?.querySelector('.x-next');
    let index = 0;
    let visible = getVisible();

    function getVisible() {
      return window.innerWidth < 768 ? 1 : 3;
    }

    function updateVisible() {
      visible = getVisible();
      const w = carousel.clientWidth;
      slides.forEach(s => {
        s.style.flex = 'none';
        s.style.width = (w / visible) + 'px';
      });
      if (index > total - visible) index = Math.max(0, total - visible);
      move();
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

    nextBtn?.addEventListener('click', next);
    prevBtn?.addEventListener('click', prev);

    window.addEventListener('resize', updateVisible);
    updateVisible();
  });
})();
