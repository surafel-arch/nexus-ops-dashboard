(() => {
  'use strict';
  const CFG = window.BOOTHSTOP_CONFIG || {};
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => Array.from(el.querySelectorAll(s));
  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Image slots: show the photo if it exists, keep the styled placeholder if not ---------- */
  $$('img[data-optional]').forEach(img => {
    const onLoad = () => {
      img.closest('.media')?.classList.add('has-img');
      if (img.classList.contains('hero-img')) img.closest('.hero').classList.add('has-media');
    };
    const onError = () => img.remove();
    if (img.complete) (img.naturalWidth ? onLoad() : onError());
    else { img.addEventListener('load', onLoad); img.addEventListener('error', onError); }
  });
  const heroVideo = $('.hero-video');
  if (heroVideo) {
    const src = heroVideo.querySelector('source');
    const drop = () => heroVideo.remove();
    if (reduceMotion) drop();
    else {
      src.addEventListener('error', drop);
      heroVideo.addEventListener('loadeddata', () => $('.hero').classList.add('has-media'));
    }
  }

  /* ---------- Header + mobile menu ---------- */
  const header = $('.site-header'), nav = $('#nav'), menuBtn = $('#menuBtn');
  const onScroll = () => header.classList.toggle('scrolled', scrollY > 20);
  addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  function setMenu(open) {
    nav.classList.toggle('open', open);
    header.classList.toggle('menu-open', open);
    menuBtn.setAttribute('aria-expanded', open);
    menuBtn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  }
  menuBtn.addEventListener('click', () => setMenu(!nav.classList.contains('open')));
  nav.addEventListener('click', e => { if (e.target.closest('a')) setMenu(false); });
  addEventListener('keydown', e => { if (e.key === 'Escape') setMenu(false); });

  /* ---------- Active nav link ---------- */
  const navLinks = $$('.nav a:not(.nav-cta)');
  const sectionIds = navLinks.map(a => a.getAttribute('href').slice(1));
  const spy = new IntersectionObserver(entries => {
    entries.forEach(en => {
      if (!en.isIntersecting) return;
      navLinks.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + en.target.id));
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  sectionIds.forEach(id => { const s = document.getElementById(id); if (s) spy.observe(s); });

  /* ---------- Reveal on scroll ---------- */
  const revealer = new IntersectionObserver(entries => {
    entries.forEach(en => {
      if (en.isIntersecting) { en.target.classList.add('in'); revealer.unobserve(en.target); }
    });
  }, { rootMargin: '0px 0px -8% 0px' });
  $$('.reveal').forEach((el, i) => {
    el.style.transitionDelay = `${(i % 4) * 70}ms`;
    revealer.observe(el);
  });

  /* ---------- Sticky mobile CTA: hidden on the hero and while the form is on screen ---------- */
  const sticky = $('#stickyCta');
  let heroVisible = true, bookVisible = false;
  const updateSticky = () => sticky.classList.toggle('show', !heroVisible && !bookVisible);
  new IntersectionObserver(([en]) => { heroVisible = en.isIntersecting; updateSticky(); }, { threshold: 0.15 }).observe($('#home'));
  new IntersectionObserver(([en]) => { bookVisible = en.isIntersecting; updateSticky(); }).observe($('#book'));

  /* ---------- Details dialog ---------- */
  const dlg = $('#detailsDialog'), dlgBody = $('#dlgBody');
  function openDialog(node, lightbox = false) {
    dlgBody.replaceChildren(node);
    dlg.classList.toggle('lightbox', lightbox);
    if (typeof dlg.showModal === 'function') dlg.showModal(); else dlg.setAttribute('open', '');
  }
  function closeDialog() { if (dlg.open) dlg.close ? dlg.close() : dlg.removeAttribute('open'); }
  $$('[data-details]').forEach(btn => btn.addEventListener('click', () => {
    const tpl = document.getElementById('tpl-' + btn.dataset.details);
    if (tpl) openDialog(tpl.content.cloneNode(true));
  }));
  $('#dlgClose').addEventListener('click', closeDialog);
  dlg.addEventListener('click', e => {
    if (e.target === dlg) closeDialog();
    if (e.target.closest('[data-close]')) closeDialog();
  });

  /* ---------- Booking form ---------- */
  const form = $('#bookingForm');
  const equipBoxes = $$('input[name="equipment"]', form);
  const coolerCheck = $('#coolerCheck'), coolerWrap = $('#coolerCountWrap'), coolerCount = $('#coolerCount');
  const packageSelect = $('#packageSelect');
  const PREFILL = { '360': '360-booth', digital: 'digital-booth', fog: 'fog-machine', cooler: 'air-cooler' };
  const PACKAGE_EQUIP = { '360-experience': ['360-booth'], 'digital-experience': ['digital-booth'] };

  const units = Math.max(1, parseInt(CFG.airCoolerUnits, 10) || 2);
  for (let i = 1; i <= units; i++) coolerCount.add(new Option(`${i} unit${i > 1 ? 's' : ''}`, String(i)));

  function syncCooler() { coolerWrap.hidden = !coolerCheck.checked; }
  coolerCheck.addEventListener('change', syncCooler);

  function checkEquip(value) {
    const box = equipBoxes.find(b => b.value === value);
    if (box) { box.checked = true; box.dispatchEvent(new Event('change', { bubbles: true })); }
  }

  // "Check Availability" / "Add to a Booth" / "Rent Separately" buttons pre-check the right equipment.
  document.addEventListener('click', e => {
    const pre = e.target.closest('[data-prefill]');
    if (pre) {
      resetThanks();
      checkEquip(PREFILL[pre.dataset.prefill]);
      if (pre.hasAttribute('data-addon') && !equipBoxes.some(b => b.checked && /booth/.test(b.value))) {
        focusLater($('#equipGroup input'));
      }
    }
    const pkg = e.target.closest('[data-package-select]');
    if (pkg) {
      resetThanks();
      packageSelect.value = pkg.dataset.packageSelect;
      (PACKAGE_EQUIP[pkg.dataset.packageSelect] || []).forEach(checkEquip);
    }
  });
  function focusLater(el) { setTimeout(() => el?.focus({ preventScroll: true }), 700); }

  // Events cannot be booked in the past.
  const eventDate = $('#eventDate');
  const today = new Date();
  eventDate.min = new Date(today.getTime() - today.getTimezoneOffset() * 60000).toISOString().slice(0, 10);

  // End time earlier than start time means the party runs past midnight. That is valid.
  const startTime = $('#startTime'), endTime = $('#endTime'), overnight = $('#overnightHint');
  const syncOvernight = () => { overnight.hidden = !(startTime.value && endTime.value && endTime.value <= startTime.value); };
  startTime.addEventListener('change', syncOvernight);
  endTime.addEventListener('change', syncOvernight);

  function setFieldError(input, msg) {
    const field = input.closest('.field');
    if (!field) return;
    field.classList.toggle('invalid', !!msg);
    let err = field.querySelector('.err');
    if (msg) {
      if (!err) { err = document.createElement('span'); err.className = 'err'; field.appendChild(err); }
      err.textContent = msg;
      input.setAttribute('aria-invalid', 'true');
    } else {
      err?.remove();
      input.removeAttribute('aria-invalid');
    }
  }

  function validate() {
    let first = null;
    $$('input[required], select[required]', form).forEach(input => {
      let msg = '';
      const v = input.value.trim();
      if (!v) msg = 'Required';
      else if (input.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)) msg = 'Enter a valid email';
      else if (input.type === 'tel' && v.replace(/\D/g, '').length < 10) msg = 'Enter a valid phone number';
      else if (input.type === 'date' && v < input.min) msg = 'Choose a future date';
      else if (input.type === 'number' && !(+v >= 1)) msg = 'Enter a number';
      setFieldError(input, msg);
      if (msg && !first) first = input;
    });
    const needEquip = !equipBoxes.some(b => b.checked) && !packageSelect.value;
    $('#equipError').hidden = !needEquip;
    if (needEquip && !first) first = equipBoxes[0];
    if (first) first.focus();
    return !first;
  }
  form.addEventListener('input', e => { if (e.target.closest('.field.invalid')) setFieldError(e.target, ''); });
  form.addEventListener('change', e => { if (e.target.name === 'equipment') $('#equipError').hidden = true; });
  packageSelect.addEventListener('change', () => { $('#equipError').hidden = true; });

  function makeRef() {
    const d = new Date(), p = n => String(n).padStart(2, '0');
    const rand = Math.random().toString(36).slice(2, 6).toUpperCase();
    return `BS-${d.getFullYear()}${p(d.getMonth() + 1)}${p(d.getDate())}-${rand}`;
  }

  // Every request carries a status so it can move through the booking pipeline:
  // inquiry → availability_confirmed → quoted → contract_sent → deposit_paid → confirmed → completed → balance_paid
  function buildPayload() {
    const fd = new FormData(form);
    const equipment = fd.getAll('equipment');
    return {
      reference: makeRef(),
      status: 'inquiry',
      submittedAt: new Date().toISOString(),
      source: location.href,
      customer: { name: fd.get('name').trim(), email: fd.get('email').trim(), phone: fd.get('phone').trim() },
      event: {
        date: fd.get('eventDate'),
        startTime: fd.get('startTime'),
        endTime: fd.get('endTime'),
        endsNextDay: fd.get('endTime') <= fd.get('startTime'),
        type: fd.get('eventType'),
        venueName: fd.get('venueName').trim(),
        location: fd.get('location').trim(),
        guestCount: Number(fd.get('guestCount'))
      },
      packageInterest: fd.get('packageInterest') || null,
      equipment,
      airCoolerCount: equipment.includes('air-cooler') ? Number(fd.get('airCoolerCount')) : 0,
      notes: (fd.get('notes') || '').trim()
    };
  }

  const statusEl = $('#formStatus'), submitBtn = $('#submitBtn');
  form.addEventListener('submit', async e => {
    e.preventDefault();
    statusEl.hidden = true;
    if (form.company_website.value) return showThanks(makeRef()); // bot filled the trap; drop it quietly
    if (!validate()) return;

    const payload = buildPayload();
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';
    try {
      if (CFG.formEndpoint) {
        const res = await fetch(CFG.formEndpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify(payload)
        });
        if (!res.ok) throw new Error('HTTP ' + res.status);
      } else if (CFG.demoMode) {
        console.warn('[BoothStop] DEMO MODE: this request was NOT sent anywhere. Set formEndpoint in config.js.', payload);
      } else {
        throw new Error('No formEndpoint configured');
      }
      showThanks(payload.reference);
    } catch (err) {
      console.error('[BoothStop] booking request failed', err);
      const contact = [CFG.phone && `call ${CFG.phone}`, CFG.email && `email ${CFG.email}`].filter(Boolean).join(' or ');
      statusEl.textContent = `We couldn't send your request. Please try again${contact ? `, or ${contact}` : ''}.`;
      statusEl.hidden = false;
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = 'Check Availability';
    }
  });

  function showThanks(ref) {
    $('#refId').textContent = ref;
    form.hidden = true;
    const t = $('#thanks');
    t.hidden = false;
    t.focus({ preventScroll: true });
    $('#book').scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
  }
  function resetThanks() {
    if (form.hidden) { form.reset(); syncCooler(); syncOvernight(); form.hidden = false; $('#thanks').hidden = true; }
  }
  $('#anotherBtn').addEventListener('click', resetThanks);

  /* ---------- Package prices from config ---------- */
  Object.entries(CFG.packagePrices || {}).forEach(([key, price]) => {
    const el = $(`[data-package="${key}"] [data-price]`);
    if (el && price) el.textContent = price;
  });

  /* ---------- Gallery ---------- */
  const CATS = {
    '360': { label: '360 Booth', c1: 'var(--magenta)', c2: 'var(--violet)' },
    'photo-booth': { label: 'Photo Booth', c1: 'var(--cyan)', c2: 'var(--violet)' },
    weddings: { label: 'Weddings', c1: 'var(--amber)', c2: 'var(--magenta)' },
    birthdays: { label: 'Birthdays', c1: 'var(--magenta)', c2: 'var(--amber)' },
    corporate: { label: 'Corporate Events', c1: 'var(--cyan)', c2: 'var(--violet)' },
    special: { label: 'Special Events', c1: 'var(--violet)', c2: 'var(--cyan)' }
  };
  const grid = $('#galleryGrid');
  const photos = (CFG.gallery || []).map(p => ({ ...p, category: [].concat(p.category) }));
  const shapes = ['tall', '', '', 'wide', '', 'tall', '', ''];

  function renderGallery(filter) {
    grid.replaceChildren();
    const list = photos.filter(p => filter === 'all' || p.category.includes(filter));
    if (list.length) {
      list.forEach((p, i) => {
        const b = document.createElement('button');
        b.className = 'g-item ' + (shapes[i % shapes.length] || '');
        b.setAttribute('aria-label', 'View photo: ' + (p.alt || ''));
        const img = new Image();
        img.src = p.src; img.alt = p.alt || ''; img.loading = 'lazy';
        img.onerror = () => b.remove();
        b.appendChild(img);
        b.addEventListener('click', () => {
          const big = new Image();
          big.src = p.src; big.alt = p.alt || ''; big.className = 'lightbox-img';
          openDialog(big, true);
        });
        grid.appendChild(b);
      });
      return;
    }
    // No photos yet for this filter: styled placeholders so the layout still reads well.
    const keys = filter === 'all' ? Object.keys(CATS) : Array(4).fill(filter);
    keys.forEach((k, i) => {
      const d = document.createElement('div');
      d.className = 'g-item placeholder ' + (filter === 'all' ? (['tall', '', '', '', 'wide', ''][i] || '') : '');
      d.style.setProperty('--c1', CATS[k].c1);
      d.style.setProperty('--c2', CATS[k].c2);
      d.innerHTML = `<span>${CATS[k].label}</span>`;
      grid.appendChild(d);
    });
    const note = document.createElement('p');
    note.className = 'gallery-note';
    note.textContent = 'Event photos coming soon.';
    grid.appendChild(note);
  }
  $$('.filters .chip').forEach(chip => chip.addEventListener('click', () => {
    $$('.filters .chip').forEach(c => c.setAttribute('aria-selected', c === chip));
    renderGallery(chip.dataset.filter);
  }));
  renderGallery('all');

  /* ---------- Contact details from config ---------- */
  const contact = $('#contactList');
  const addContact = (href, text) => {
    const li = document.createElement('li'), a = document.createElement('a');
    a.href = href; a.textContent = text; li.appendChild(a); contact.appendChild(li);
  };
  if (CFG.phone) addContact('tel:' + CFG.phone.replace(/[^\d+]/g, ''), CFG.phone);
  if (CFG.email) addContact('mailto:' + CFG.email, CFG.email);
  if (CFG.instagram) addContact('https://instagram.com/' + CFG.instagram.replace(/^@/, ''), '@' + CFG.instagram.replace(/^@/, ''));

  $('#year').textContent = new Date().getFullYear();
})();
