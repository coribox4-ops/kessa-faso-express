/* Kessa Faso Express — interactions */
(function () {
  'use strict';

  var WA_NUMBER = '22676229759';
  var MSG_DEVIS = 'Bonjour Kessa Faso Express, je souhaite obtenir un devis pour une prestation de nettoyage. Pouvez-vous me renseigner ?';

  function waUrl(text) {
    return 'https://wa.me/' + WA_NUMBER + '?text=' + encodeURIComponent(text);
  }

  document.documentElement.classList.add('js');

  /* ---------- Liens WhatsApp préremplis ---------- */
  document.querySelectorAll('[data-wa]').forEach(function (link) {
    var text = MSG_DEVIS;
    if (link.dataset.wa === 'service' && link.dataset.service) {
      text = 'Bonjour Kessa Faso Express, je souhaite obtenir un devis pour la prestation « ' +
        link.dataset.service + ' ». Pouvez-vous me renseigner ?';
    }
    link.href = waUrl(text);
  });

  /* ---------- En-tête compact au défilement ---------- */
  var header = document.querySelector('.header');
  var ticking = false;
  function onScroll() {
    header.classList.toggle('is-compact', window.scrollY > 24);
    ticking = false;
  }
  window.addEventListener('scroll', function () {
    if (!ticking) { window.requestAnimationFrame(onScroll); ticking = true; }
  }, { passive: true });
  onScroll();

  /* ---------- Menu mobile ---------- */
  var burger = document.querySelector('.burger');
  var menu = document.getElementById('menu-mobile');

  function openMenu() {
    menu.hidden = false;
    document.body.classList.add('menu-open');
    burger.setAttribute('aria-expanded', 'true');
    burger.setAttribute('aria-label', 'Fermer le menu');
    window.requestAnimationFrame(function () {
      menu.classList.add('is-open');
      var first = menu.querySelector('a');
      if (first) first.focus({ preventScroll: true });
    });
  }
  function closeMenu(restoreFocus) {
    menu.classList.remove('is-open');
    document.body.classList.remove('menu-open');
    burger.setAttribute('aria-expanded', 'false');
    burger.setAttribute('aria-label', 'Ouvrir le menu');
    window.setTimeout(function () { if (!menu.classList.contains('is-open')) menu.hidden = true; }, 300);
    if (restoreFocus) burger.focus();
  }
  burger.addEventListener('click', function () {
    if (burger.getAttribute('aria-expanded') === 'true') closeMenu(true); else openMenu();
  });
  menu.addEventListener('click', function (e) {
    if (e.target.closest('a')) closeMenu(false);
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && burger.getAttribute('aria-expanded') === 'true') closeMenu(true);
  });
  window.matchMedia('(min-width: 960px)').addEventListener('change', function (mq) {
    if (mq.matches && burger.getAttribute('aria-expanded') === 'true') closeMenu(false);
  });

  /* ---------- Apparition des sections & lien actif ---------- */
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !reduce) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) { entry.target.classList.add('is-visible'); io.unobserve(entry.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('is-visible'); });
  }

  var navLinks = document.querySelectorAll('.nav__list a');
  if ('IntersectionObserver' in window) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        navLinks.forEach(function (a) {
          var on = a.getAttribute('href') === '#' + entry.target.id;
          a.classList.toggle('is-active', on);
          if (on) a.setAttribute('aria-current', 'true'); else a.removeAttribute('aria-current');
        });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    ['accueil', 'services', 'a-propos', 'realisations', 'contact'].forEach(function (id) {
      var s = document.getElementById(id);
      if (s) spy.observe(s);
    });
  }

  /* ---------- Visionneuse de la galerie ---------- */
  var lb = document.getElementById('lightbox');
  var lbImg = lb.querySelector('img');
  var items = Array.prototype.slice.call(document.querySelectorAll('.gallery [data-full]'));
  var current = 0;

  function show(i) {
    current = (i + items.length) % items.length;
    var btn = items[current];
    lbImg.src = btn.dataset.full;
    lbImg.alt = btn.querySelector('img').alt;
  }
  items.forEach(function (btn, i) {
    btn.addEventListener('click', function () {
      show(i);
      if (typeof lb.showModal === 'function') lb.showModal(); else lb.setAttribute('open', '');
      document.body.style.overflow = 'hidden';
    });
  });
  function closeLb() { if (lb.open) lb.close(); }
  lb.addEventListener('close', function () { document.body.style.overflow = ''; });
  lb.querySelector('.lightbox__close').addEventListener('click', closeLb);
  lb.querySelector('.lightbox__prev').addEventListener('click', function () { show(current - 1); });
  lb.querySelector('.lightbox__next').addEventListener('click', function () { show(current + 1); });
  lb.addEventListener('click', function (e) { if (e.target === lb) closeLb(); });
  lb.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft') show(current - 1);
    if (e.key === 'ArrowRight') show(current + 1);
  });
  var touchX = null;
  lb.addEventListener('touchstart', function (e) { touchX = e.changedTouches[0].clientX; }, { passive: true });
  lb.addEventListener('touchend', function (e) {
    if (touchX === null) return;
    var dx = e.changedTouches[0].clientX - touchX;
    if (Math.abs(dx) > 45) show(current + (dx < 0 ? 1 : -1));
    touchX = null;
  }, { passive: true });

  /* ---------- Formulaire de devis → WhatsApp ---------- */
  var form = document.getElementById('devis-form');
  var rules = {
    nom: function (v) { return v.length >= 2 ? '' : 'Indiquez votre nom (2 caractères minimum).'; },
    telephone: function (v) {
      var digits = v.replace(/\D/g, '');
      return (/^[+\d\s().-]+$/.test(v) && digits.length >= 8 && digits.length <= 15) ? '' : 'Indiquez un numéro de téléphone valide (8 chiffres minimum).';
    },
    prestation: function (v) { return v ? '' : 'Choisissez un type de prestation.'; },
    description: function (v) { return v.length >= 10 ? '' : 'Décrivez votre besoin en quelques mots (10 caractères minimum).'; }
  };

  function validateField(el) {
    var msg = rules[el.name](el.value.trim());
    var field = el.closest('.field');
    field.classList.toggle('has-error', !!msg);
    el.setAttribute('aria-invalid', msg ? 'true' : 'false');
    field.querySelector('.field__err').textContent = msg;
    return !msg;
  }

  Object.keys(rules).forEach(function (name) {
    var el = form.elements[name];
    el.addEventListener('blur', function () { if (el.value.trim()) validateField(el); });
    el.addEventListener('input', function () { if (el.closest('.field').classList.contains('has-error')) validateField(el); });
  });

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var firstBad = null;
    Object.keys(rules).forEach(function (name) {
      var el = form.elements[name];
      if (!validateField(el) && !firstBad) firstBad = el;
    });
    if (firstBad) { firstBad.focus(); return; }

    var v = function (n) { return form.elements[n].value.trim(); };
    var text =
      'Bonjour Kessa Faso Express, je souhaite obtenir un devis.\n\n' +
      '• Nom : ' + v('nom') + '\n' +
      '• Téléphone : ' + v('telephone') + '\n' +
      '• Prestation : ' + v('prestation') + '\n' +
      '• Besoin : ' + v('description') + '\n\n' +
      'Merci de me recontacter.';
    var url = waUrl(text);
    var win = window.open(url, '_blank');
    if (win) win.opener = null; else window.location.href = url;
  });

  /* ---------- Carte Google Maps (chargée à la demande) ---------- */
  var mapBtn = document.getElementById('map-load');
  if (mapBtn) {
    mapBtn.addEventListener('click', function () {
      var frame = document.createElement('iframe');
      frame.src = 'https://maps.google.com/maps?q=' + encodeURIComponent('Cité Azimmo, Ouaga 2000, Ouagadougou, Burkina Faso') + '&z=15&output=embed';
      frame.title = 'Carte : Kessa Faso Express, Cité Azimmo, Ouaga 2000, Ouagadougou';
      frame.loading = 'lazy';
      frame.referrerPolicy = 'no-referrer-when-downgrade';
      frame.setAttribute('allowfullscreen', '');
      var box = document.getElementById('carte');
      box.innerHTML = '';
      box.appendChild(frame);
    });
  }

  /* ---------- Année ---------- */
  var y = document.getElementById('annee');
  if (y) y.textContent = new Date().getFullYear();
})();
