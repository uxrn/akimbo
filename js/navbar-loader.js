// Load shared navbar and footer components
(function() {
  async function loadPartial(url, targetId) {
    const el = document.getElementById(targetId);
    if (!el) return;
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(res.status);
      el.innerHTML = await res.text();
    } catch (e) {
      console.error('Failed to load partial:', url, e);
    }
  }

  document.addEventListener('DOMContentLoaded', async () => {
    await Promise.all([
      loadPartial('/components/navbar.html', 'navbar-placeholder'),
      loadPartial('/components/footer.html', 'footer-placeholder')
    ]);

    // Set footer year (scripts inside fetched HTML do not run)
    const yearEl = document.getElementById('footer-year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    // Toggle open class on division cards for flush corners
    document.querySelectorAll('.division-card').forEach(card => {
      const target = card.getAttribute('data-bs-target');
      if (!target) return;
      const collapseEl = document.querySelector(target);
      if (!collapseEl) return;
      collapseEl.addEventListener('show.bs.collapse', () => card.classList.add('open'));
      collapseEl.addEventListener('hide.bs.collapse', () => card.classList.remove('open'));
    });
  });
})();
