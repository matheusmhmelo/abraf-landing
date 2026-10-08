/* Comportamentos do site da ABRAF: menu do celular, banner rotativo,
   seção "Conheça o formol" (troca de conteúdo com o scroll) e formulário de contato. */
(function () {
  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Menu do celular ---------- */
  var toggle = document.querySelector('[data-menu-toggle]');
  var panel = document.getElementById('menu-mobile');
  if (toggle && panel) {
    toggle.addEventListener('click', function () {
      var open = toggle.getAttribute('aria-expanded') !== 'true';
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      toggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
      panel.hidden = !open;
    });
    panel.addEventListener('click', function (e) {
      if (e.target.closest('a')) { panel.hidden = true; toggle.setAttribute('aria-expanded', 'false'); }
    });
  }

  /* ---------- Banner rotativo (página inicial) ---------- */
  var slides = document.querySelectorAll('.slide');
  var dots = document.querySelectorAll('.dot');
  if (slides.length) {
    var current = 0, timer = null;
    var show = function (i) {
      current = (i + slides.length) % slides.length;
      slides.forEach(function (s, k) { s.classList.toggle('is-active', k === current); });
      dots.forEach(function (d, k) { d.classList.toggle('is-active', k === current); d.setAttribute('aria-pressed', k === current ? 'true' : 'false'); });
    };
    var start = function () { if (!reduceMotion) timer = setInterval(function () { show(current + 1); }, 6000); };
    dots.forEach(function (d) {
      d.addEventListener('click', function () { clearInterval(timer); show(+d.dataset.slide); start(); });
    });
    show(0); start();
  }

  /* ---------- "Conheça o formol": conteúdo troca conforme a página rola ---------- */
  var story = document.querySelector('[data-story]');
  if (story) {
    var chapters = story.querySelectorAll('.chapter');
    var rails = story.querySelectorAll('.rail');
    var bar = story.querySelector('.story-bar');
    var stage = story.querySelector('.story-stage');
    var active = 0;
    var setActive = function (i) {
      active = i;
      chapters.forEach(function (c, k) { c.classList.toggle('is-active', k === i); c.classList.toggle('is-before', k < i); });
      rails.forEach(function (r, k) { r.classList.toggle('is-active', k === i); if (k === i) r.setAttribute('aria-current', 'step'); else r.removeAttribute('aria-current'); });
      if (bar) bar.style.width = ((i + 1) / chapters.length * 100) + '%';
    };
    var onScroll = function () {
      if (window.matchMedia('(max-width: 860px)').matches) return; // no celular os blocos ficam empilhados
      var r = story.getBoundingClientRect();
      var top = parseInt(getComputedStyle(stage).top, 10) || 0;
      var span = r.height - stage.offsetHeight;
      if (span <= 0) return;
      var p = Math.min(Math.max((top - r.top) / span, 0), 0.9999);
      var i = Math.floor(p * chapters.length);
      if (i !== active) setActive(i);
    };
    rails.forEach(function (r) {
      r.addEventListener('click', function () {
        var i = +r.dataset.goto;
        setActive(i);
        var m = story.querySelector('[data-marker="' + i + '"]');
        if (m) m.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
      });
    });
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    setActive(0); onScroll();
  }

  /* ---------- Formulário de contato (Web3Forms) ---------- */
  var form = document.getElementById('contact-form');
  var success = document.getElementById('contact-success');
  var note = document.getElementById('contact-note');
  if (form && success) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var btn = form.querySelector('button[type="submit"]');
      btn.disabled = true; btn.textContent = 'Enviando…';
      fetch(form.action, { method: 'POST', headers: { 'Accept': 'application/json' }, body: new FormData(form) })
        .then(function (res) { return res.json(); })
        .then(function (data) {
          if (!data.success) throw new Error(data.message || 'Falha no envio');
          form.reset(); form.hidden = true; success.hidden = false;
        })
        .catch(function () {
          if (note) { note.textContent = 'Não foi possível enviar agora. Tente novamente ou escreva para abraf@abraf.org.br.'; note.style.color = '#B42318'; }
        })
        .finally(function () { btn.disabled = false; btn.textContent = 'Enviar mensagem'; });
    });
    var again = success.querySelector('[data-contact-reset]');
    if (again) again.addEventListener('click', function () { success.hidden = true; form.hidden = false; });
  }

  /* ---------- Modal do evento (página inicial) ---------- */
  var modal = document.getElementById('evento-modal');
  if (modal) {
    var chave = modal.dataset.chave || 'abraf-modal';
    var ate = modal.dataset.ate ? new Date(modal.dataset.ate + 'T23:59:59-03:00') : null;
    var visto = false;
    try { visto = localStorage.getItem(chave) === 'visto'; } catch (e) {}
    var anterior = null;
    var fechar = function () {
      modal.hidden = true;
      document.body.style.overflow = '';
      try { localStorage.setItem(chave, 'visto'); } catch (e) {}
      if (anterior && anterior.focus) anterior.focus();
    };
    var abrir = function () {
      anterior = document.activeElement;
      modal.hidden = false;
      document.body.style.overflow = 'hidden';
      var b = modal.querySelector('.modal-fechar'); if (b) b.focus();
    };
    modal.querySelectorAll('[data-modal-fechar]').forEach(function (el) { el.addEventListener('click', fechar); });
    modal.addEventListener('click', function (e) { if (e.target === modal) fechar(); });
    document.addEventListener('keydown', function (e) {
      if (modal.hidden) return;
      if (e.key === 'Escape') { fechar(); return; }
      if (e.key === 'Tab') { // mantém o foco dentro do modal
        var f = modal.querySelectorAll('a[href], button');
        var first = f[0], last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    });
    if (!visto && (!ate || new Date() <= ate)) setTimeout(abrir, 800);
  }
})();
