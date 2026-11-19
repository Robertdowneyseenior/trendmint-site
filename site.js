(function () {
  document.getElementById('yr').textContent = new Date().getFullYear();
  const nav = document.getElementById('nav');
  addEventListener('scroll', () => nav.classList.toggle('solid', scrollY > 20), { passive: true });
  nav.querySelectorAll('ul a').forEach(a => a.addEventListener('click', () => nav.classList.remove('open')));

  const QS = new URLSearchParams(location.search);
  if (QS.get('sec')) addEventListener('load', () => { const el = document.getElementById(QS.get('sec')); scrollTo(0, el.getBoundingClientRect().top + scrollY + (+QS.get('off') || 0)); });
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches || /[?&]static/.test(location.search);
  const g = window.gsap, ST = window.ScrollTrigger;

  // split story paragraph into words
  const say = document.getElementById('say');
  if (say) {
    const walk = (node, hl) => {
      [...node.childNodes].forEach(n => {
        if (n.nodeType === 3) {
          const f = document.createDocumentFragment();
          n.textContent.split(/(\s+)/).forEach(w => {
            if (!w.trim()) { f.appendChild(document.createTextNode(w)); return; }
            const s = document.createElement('span'); s.className = 'wd' + (hl ? ' hl' : ''); s.textContent = w; f.appendChild(s);
          });
          n.replaceWith(f);
        } else if (n.nodeType === 1) { const h = n.classList.contains('hl'); walk(n, h); if (h) n.replaceWith(...n.childNodes); }
      });
    };
    walk(say, false);
  }

  // ChatWaba scrolly features
  const items = [...document.querySelectorAll('#flist li')], panes = [...document.querySelectorAll('#mock .mp')], murl = document.getElementById('murl'), fprog = document.getElementById('fprog');
  let cur = 0;
  const setF = i => {
    if (i === cur) return; cur = i;
    items.forEach((li, k) => li.classList.toggle('act', k === i));
    panes.forEach((p, k) => p.classList.toggle('on', k === i));
    murl.textContent = 'app.chatwaba.com/' + panes[i].dataset.u;
  };
  items.forEach((li, i) => li.addEventListener('click', () => {
    const sc = document.getElementById('scrolly'), r = sc.getBoundingClientRect(), span = sc.offsetHeight - innerHeight;
    scrollTo({ top: scrollY + r.top + span * (i + 0.5) / items.length, behavior: 'smooth' });
  }));

  if (!g || !ST || reduce) {
    document.documentElement.classList.remove('js');
    document.querySelectorAll('.say .wd').forEach(e => e.style.opacity = 1);
    if (!reduce) return;
  }
  if (reduce) {
    // still allow the feature list to follow scroll without animation
    addEventListener('scroll', () => { const sc = document.getElementById('scrolly'), r = sc.getBoundingClientRect(), p = Math.min(1, Math.max(0, -r.top / (sc.offsetHeight - innerHeight))); setF(Math.min(items.length - 1, Math.floor(p * items.length))); }, { passive: true });
    return;
  }
  g.registerPlugin(ST);

  // hero entrance: headline words rise
  const h1 = document.getElementById('h1');
  const wrapWords = el => {
    [...el.childNodes].forEach(n => {
      if (n.nodeType === 3) {
        const f = document.createDocumentFragment();
        n.textContent.split(/(\s+)/).forEach(w => { if (!w.trim()) { f.appendChild(document.createTextNode(w)); return; } const s = document.createElement('span'); s.className = 'w'; s.textContent = w; f.appendChild(s); });
        n.replaceWith(f);
      }
    });
  };
  wrapWords(h1);
  const mark = h1.querySelector('.mark');
  g.set(mark, { '--m': '0%' });
  g.timeline({ defaults: { ease: 'power3.out' } })
    .from('#h1 .w, #h1 .mark', { y: 60, opacity: 0, rotate: 3, duration: .9, stagger: .07 })
    .to(mark, { '--m': '100%', duration: .7, ease: 'power2.inOut' }, '-=.3')
    .from('.hi', { y: 30, opacity: 0, duration: .8, stagger: .1 }, .25);

  // generic reveal
  g.utils.toArray('.rv').forEach(el => {
    g.to(el, { opacity: 1, y: 0, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 88%' } });
  });
  g.utils.toArray('.steps .step, .inds .ind, .quotes .q').forEach((el, i) => { el.style.transitionDelay = '0s'; });

  // story: words light up as you scroll
  g.to('.say .wd', { opacity: 1, stagger: .5, ease: 'none', scrollTrigger: { trigger: '#story', start: 'top 70%', end: 'center 40%', scrub: .6 } });
  g.from('.turn', { y: 50, opacity: 0, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: '.turn', start: 'top 85%' } });

  // ChatWaba features follow scroll
  ST.create({ trigger: '#scrolly', start: 'top top', end: 'bottom bottom', onUpdate: s => {
    setF(Math.min(items.length - 1, Math.floor(s.progress * items.length)));
    fprog.style.height = (s.progress * 100) + '%';
  } });
  g.from('#mock', { y: 60, opacity: 0, rotateX: 8, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: '#scrolly', start: 'top 80%' } });

  // process line draws
  g.to('#tlf', { scaleX: 1, ease: 'none', scrollTrigger: { trigger: '#tl', start: 'top 80%', end: 'bottom 55%', scrub: .5 } });

  // footer big line
  g.from('#bigline span', { yPercent: 60, opacity: 0, stagger: .15, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: '#bigline', start: 'top 90%' } });

  // subtle parallax on hero demo
  g.to('.hvid', { y: -40, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } });

  // form
})();

(function () {
  const f = document.getElementById('lead'), msg = document.getElementById('msg');
  f.addEventListener('submit', async e => {
    e.preventDefault(); msg.className = 'msg'; msg.textContent = '';
    const d = Object.fromEntries(new FormData(f));
    const digits = (d.phone || '').replace(/\D/g, '').replace(/^91(?=\d{10}$)/, '').replace(/^0(?=\d{10}$)/, '');
    let err = '';
    if ((d.name || '').trim().length < 2) err = 'Enter your full name.';
    else if (!/^[6-9]\d{9}$/.test(digits)) err = 'Enter a valid 10-digit Indian mobile number.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test((d.email || '').trim())) err = 'Enter a valid email address.';
    else if ((d.address || '').trim().length < 3) err = 'Enter your city or address.';
    if (err) { msg.className = 'msg err'; msg.textContent = err; return; }
    const b = f.querySelector('button[type=submit]'); b.disabled = true; b.textContent = 'Sending…';
    try {
      const r = await fetch('/api/lead', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(d) });
      const j = await r.json().catch(() => ({}));
      if (!r.ok) throw new Error(j.error || 'Something went wrong.');
      document.getElementById('fields').style.display = 'none'; document.getElementById('ok').style.display = 'block';
    } catch (x) { msg.className = 'msg err'; msg.textContent = x.message + ' You can also WhatsApp us at +91 80093 67690.'; b.disabled = false; b.textContent = 'Get my free growth plan →'; }
  });
})();
