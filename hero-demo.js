/* TrendMint hero: live animated product UI, synced to /media/hero-audio.m4a when sound is on */
(function () {
  const root = document.getElementById('demo');
  if (!root || !window.gsap) return;
  const D = 31.8;
  const QT = (q => q === null ? null : parseFloat(q))(new URLSearchParams(location.search).get('t'));
  const I = {
    play: '<path d="M8 5v14l11-7z" fill="currentColor" stroke="none"/>',
    ad: '<path d="M3 11v2a1 1 0 0 0 1 1h2l5 4V6L6 10H4a1 1 0 0 0-1 1z"/><path d="M15 9a4 4 0 0 1 0 6"/><path d="M18 6a8 8 0 0 1 0 12"/>',
    user: '<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>',
    check: '<path d="M20 6 9 17l-5-5"/>',
    star: '<path d="m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9z"/>',
    video: '<rect x="3" y="6" width="13" height="12" rx="2"/><path d="m16 10 5-3v10l-5-3z"/>',
    chart: '<path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/>',
    chat: '<path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12z"/>',
    zap: '<path d="M13 2 4 14h7l-1 8 9-12h-7z"/>'
  };
  const ic = (n, s = 18) => `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${I[n]}</svg>`;

  root.innerHTML = `
  <div class="dm-stage" id="dmStage">
    <div class="dm-win">
      <div class="dm-bar"><i></i><i></i><i></i><div class="dm-url"><span class="dm-live"></span><b id="dmTitle">Ads Manager</b><span class="dm-path">app.trendmint.co.in</span></div></div>
      <div class="dm-body">

        <div class="dm-pane" id="p1">
          <div class="dm-h">Campaign · Clinic consultations <span class="dm-pill dm-grey">Last 7 days</span></div>
          <div class="dm-kpis">
            <div class="dm-kpi"><small>Ad spend</small><b>₹48,200</b><em class="dm-up">On budget</em></div>
            <div class="dm-kpi"><small>Leads</small><b>126</b><em class="dm-up">▲ 34%</em></div>
            <div class="dm-kpi" id="k3"><small>Customers</small><b>9</b><em class="dm-down" id="k3e">only 7%</em></div>
          </div>
          <div class="dm-h2">Recent leads</div>
          <div class="dm-row" id="r1"><span class="dm-av">RK</span><div><b>Rahul Kumar</b><small>Meta ad · just now</small></div><span class="dm-pill dm-new" id="r1s">New</span></div>
          <div class="dm-row dm-dim"><span class="dm-av dm-av2">SA</span><div><b>Sana Ali</b><small>Meta ad · 5h ago</small></div><span class="dm-pill dm-bad">No reply</span></div>
          <div class="dm-row dm-dim"><span class="dm-av dm-av3">VM</span><div><b>Vikas Mehra</b><small>Google · 1d ago</small></div><span class="dm-pill dm-bad">Not called</span></div>
        </div>

        <div class="dm-pane" id="p2">
          <div class="dm-h">Where your leads go</div>
          <div class="dm-flow">
            <div class="dm-node" id="n1"><span class="dm-ni">${ic('ad', 22)}</span><b>Ad</b><small>₹48,200</small></div>
            <div class="dm-link" id="l1"><div class="dm-dash"></div><div class="dm-fill"></div><span class="dm-tag" id="t1">3h reply delay</span></div>
            <div class="dm-node" id="n2"><span class="dm-ni">${ic('user', 22)}</span><b>Lead</b><small>126</small></div>
            <div class="dm-link" id="l2"><div class="dm-dash"></div><div class="dm-fill"></div><span class="dm-tag" id="t2">No owner</span></div>
            <div class="dm-node" id="n3"><span class="dm-ni">${ic('star', 22)}</span><b>Customer</b><small id="n3s">9</small></div>
          </div>
          <div class="dm-sys" id="sys"><span>${ic('zap', 16)}</span>TrendMint system connected</div>
        </div>

        <div class="dm-pane" id="p4">
          <div class="dm-h">Creative studio · Reel #12</div>
          <div class="dm-reelwrap">
            <div class="dm-reel"><div class="dm-hook">“If you run a clinic in Lucknow, watch this.”</div><div class="dm-playb">${ic('play', 26)}</div><div class="dm-prog"><i id="prog"></i></div></div>
            <div class="dm-stats">
              <div class="dm-stat"><small>Views</small><b id="views">0</b></div>
              <div class="dm-stat"><small>Watched past 3s</small><b>41%</b><div class="dm-bar2"><i id="b1"></i></div></div>
              <div class="dm-stat"><small>Cost per lead</small><b>₹42</b><div class="dm-bar2"><i id="b2"></i></div></div>
            </div>
          </div>
        </div>

        <div class="dm-pane" id="p5">
          <div class="dm-two">
            <div class="dm-form" id="form"><div class="dm-h">Book a consultation</div>
              <div class="dm-fld"><small>Name</small><span><i id="ty1">Rahul Kumar</i></span></div>
              <div class="dm-fld"><small>Mobile</small><span><i id="ty2">+91 98390 •••••</i></span></div>
              <div class="dm-btn" id="sub">Submit</div></div>
            <div class="dm-wa" id="wa">
              <div class="dm-wah"><span class="dm-av" style="background:#0b6b5c">RK</span><div><b>Rahul Kumar</b><small>WhatsApp · via ChatWaba</small></div></div>
              <div class="dm-wab">
                <div class="dm-bub" id="bub">Hi Rahul! Thanks for reaching out. Here’s our consultation fee and open slots for tomorrow. Want me to book one?<span>10:42 ✓✓</span></div>
                <div class="dm-chip" id="chip">${ic('zap', 14)} Replied in 4 seconds</div>
              </div>
            </div>
          </div>
        </div>

        <div class="dm-pane" id="p6">
          <div class="dm-h">CRM pipeline</div>
          <div class="dm-kan">
            <div class="dm-col"><h6>New <span>12</span></h6><div class="dm-gh"></div><div class="dm-gh"></div></div>
            <div class="dm-col"><h6>Assigned <span>8</span></h6><div class="dm-gh"></div><div class="dm-gh"></div></div>
            <div class="dm-col"><h6>Won <span id="wonc">5</span></h6><div class="dm-gh"></div><div class="dm-gh"></div></div>
            <div class="dm-card" id="kc"><span class="dm-pill dm-new" id="kcs">New</span><b>Rahul Kumar</b><small id="kco">Unassigned</small></div>
          </div>
        </div>

        <div class="dm-pane" id="p7">
          <div class="dm-h">Growth engine</div>
          <div class="dm-eng">
            <div class="dm-layers">
              <div class="dm-lay" id="y1"><span class="dm-li" style="background:#efeaff;color:#6E4DFF">${ic('video')}</span><b>Video</b><div class="dm-bar2"><i></i></div></div>
              <div class="dm-lay" id="y2"><span class="dm-li" style="background:#e6eeff;color:#0C49A3">${ic('chart')}</span><b>Ads</b><div class="dm-bar2"><i></i></div></div>
              <div class="dm-lay" id="y3"><span class="dm-li" style="background:#e6f9ee;color:#15a04a">${ic('chat')}</span><b>Follow-up</b><div class="dm-bar2"><i></i></div></div>
            </div>
            <div class="dm-chart"><small>Customers</small>
              <svg viewBox="0 0 220 150" preserveAspectRatio="none"><defs><linearGradient id="dmg" x1="0" x2="1"><stop offset="0" stop-color="#6E4DFF"/><stop offset="1" stop-color="#0C49A3"/></linearGradient><linearGradient id="dmf" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="rgba(110,77,255,.25)"/><stop offset="1" stop-color="rgba(110,77,255,0)"/></linearGradient></defs>
              <path id="area" d="M0 140 L0 128 C40 124 60 112 90 100 S150 60 220 18 L220 140 Z" fill="url(#dmf)"/>
              <path id="line" d="M0 128 C40 124 60 112 90 100 S150 60 220 18" fill="none" stroke="url(#dmg)" stroke-width="4" stroke-linecap="round"/></svg>
            </div>
          </div>
        </div>

      </div>
    </div>
    <div class="dm-end" id="p8"><img src="/logo.svg" alt="TrendMint"><div class="dm-cta">Book your free growth plan →</div><small>trendmint.co.in</small></div>
    <div class="dm-cap"><span id="cap"></span></div>
  </div>`;

  // fit fixed 600x600 stage to container
  const stage = document.getElementById('dmStage');
  const fit = () => { stage.style.transform = `scale(${root.clientWidth / 600})`; };
  new ResizeObserver(fit).observe(root); fit();

  const caps = [[0.15,'You paid for that lead.'],[1.6,'So why did it never become a customer?'],[4.3,'It wasn’t the ad.'],[5.55,'It was everything after it.'],[7.85,'At TrendMint, we build the whole system.'],[10.6,'A scroll-stopping reel brings the right people in…'],[13.85,'…they fill the form, and get a WhatsApp reply in seconds…'],[18.0,'…and every lead lands in your team’s inbox, assigned and tracked.'],[22.4,'Ads, video and follow-up, built as one.'],[24.3,'That’s how leads become customers.'],[28.2,'Book your free growth plan.']];
  const capEl = document.getElementById('cap'), titleEl = document.getElementById('dmTitle');

  const g = gsap, tl = g.timeline({ paused: true }), E = 'power3.out';
  const show = (id, t, out) => { tl.fromTo(id, { autoAlpha: 0, y: 16, scale: .98 }, { autoAlpha: 1, y: 0, scale: 1, duration: .5, ease: E }, t); if (out) tl.to(id, { autoAlpha: 0, y: -12, duration: .35, ease: 'power2.in' }, out); };
  const title = (txt, t) => tl.call(() => { titleEl.textContent = txt; }, null, t);
  g.set('.dm-pane,#p8', { autoAlpha: 0 });

  // S1 dashboard
  show('#p1', 0, 4.25); title('Ads Manager', 0.01);
  tl.from('#p1 .dm-kpi', { y: 14, autoAlpha: 0, stagger: .1, duration: .45, ease: E }, .2)
    .from('#r1', { x: -30, autoAlpha: 0, duration: .5, ease: 'back.out(1.6)' }, 1.6)
    .to('#r1', { opacity: .45, duration: .5 }, 3.0)
    .call(() => { const s = document.getElementById('r1s'); s.textContent = 'No reply · 3h'; s.className = 'dm-pill dm-bad'; }, null, 3.0)
    .to('#k3', { boxShadow: '0 0 0 2px #e5484d inset', duration: .3, yoyo: true, repeat: 3 }, 3.1);
  tl.call(() => { const s = document.getElementById('r1s'); s.textContent = 'New'; s.className = 'dm-pill dm-new'; }, null, 0.02);

  // S2/S3 flow
  show('#p2', 4.4, 10.45); title('Lead flow', 4.41);
  tl.from('#p2 .dm-node', { y: 20, autoAlpha: 0, stagger: .15, duration: .5, ease: 'back.out(1.6)' }, 4.6)
    .fromTo('#p2 .dm-tag', { autoAlpha: 0, y: 6 }, { autoAlpha: 1, y: 0, stagger: .3, duration: .35 }, 5.6)
    .fromTo('#p2 .dm-dash', { opacity: .35 }, { opacity: 1, duration: .4, yoyo: true, repeat: 3 }, 5.7)
    .fromTo('#p2 .dm-fill', { scaleX: 0 }, { scaleX: 1, stagger: .25, duration: .5, ease: 'power2.out' }, 7.9)
    .call(() => { setTag('t1', '4s reply', 1); setTag('t2', 'Auto-assigned', 1); document.getElementById('n3s').textContent = 'More every week'; document.getElementById('n3').classList.add('dm-good'); }, null, 8.3)
    .fromTo('#sys', { autoAlpha: 0, y: 14 }, { autoAlpha: 1, y: 0, duration: .5, ease: 'back.out(1.6)' }, 8.6);
  tl.call(() => { setTag('t1', '3h reply delay', 0); setTag('t2', 'No owner', 0); document.getElementById('n3s').textContent = '9'; document.getElementById('n3').classList.remove('dm-good'); }, null, 4.42);
  function setTag(id, txt, good) { const e = document.getElementById(id); e.textContent = txt; e.classList.toggle('dm-tg', !!good); }

  // S4 reel
  show('#p4', 10.6, 13.75); title('Creative studio', 10.61);
  tl.from('#p4 .dm-reel', { x: -20, rotationY: 12, autoAlpha: 0, duration: .6, ease: E }, 10.7)
    .fromTo('#prog', { width: '0%' }, { width: '100%', duration: 3, ease: 'none' }, 10.8)
    .from('#p4 .dm-stat', { x: 20, autoAlpha: 0, stagger: .15, duration: .45, ease: E }, 11.0)
    .fromTo('#b1', { width: '0%' }, { width: '41%', duration: .9, ease: E }, 11.6)
    .fromTo('#b2', { width: '0%' }, { width: '78%', duration: .9, ease: E }, 11.9);
  const vc = { v: 0 };
  tl.fromTo(vc, { v: 0 }, { v: 12480, duration: 2.4, ease: 'power2.out', onUpdate: () => { document.getElementById('views').textContent = Math.round(vc.v).toLocaleString('en-IN'); } }, 11.1);

  // S5 form -> WhatsApp
  show('#p5', 13.85, 17.95); title('Lead form → WhatsApp', 13.86);
  tl.fromTo('#ty1', { width: 0 }, { width: '100%', duration: .7, ease: 'steps(11)' }, 14.4)
    .fromTo('#ty2', { width: 0 }, { width: '100%', duration: .7, ease: 'steps(14)' }, 15.2)
    .fromTo('#sub', { scale: 1 }, { scale: .94, duration: .1, yoyo: true, repeat: 1 }, 16.0)
    .fromTo('#wa', { autoAlpha: 0, x: 24 }, { autoAlpha: 1, x: 0, duration: .5, ease: E }, 16.1)
    .fromTo('#bub', { autoAlpha: 0, y: 12, scale: .95 }, { autoAlpha: 1, y: 0, scale: 1, duration: .45, ease: 'back.out(1.7)' }, 16.4)
    .fromTo('#chip', { autoAlpha: 0, scale: .8 }, { autoAlpha: 1, scale: 1, duration: .35, ease: 'back.out(2)' }, 16.9);

  // S6 kanban
  show('#p6', 18.05, 22.3); title('CRM pipeline', 18.06);
  tl.fromTo('#kc', { x: 0, autoAlpha: 0, scale: .9 }, { autoAlpha: 1, scale: 1, duration: .4, ease: 'back.out(1.7)' }, 18.5)
    .to('#kc', { x: 168, duration: .7, ease: 'power3.inOut' }, 19.4)
    .to('#kc', { x: 336, duration: .7, ease: 'power3.inOut' }, 20.7)
    .call(() => kc('New', 'dm-new', 'Unassigned', '5'), null, 18.4)
    .call(() => kc('Assigned', 'dm-blue', 'Priya · Sales team', '5'), null, 19.8)
    .call(() => kc('Won', 'dm-ok', 'Consultation booked', '6'), null, 21.2);
  function kc(s, c, o, w) { const e = document.getElementById('kcs'); e.textContent = s; e.className = 'dm-pill ' + c; document.getElementById('kco').textContent = o; document.getElementById('wonc').textContent = w; }

  // S7 engine
  show('#p7', 22.35, 28.1); title('Growth engine', 22.36);
  tl.from('#p7 .dm-lay', { x: -24, autoAlpha: 0, stagger: .25, duration: .5, ease: E }, 22.5)
    .fromTo('#p7 .dm-lay .dm-bar2 i', { width: '0%' }, { width: '100%', stagger: .25, duration: .8, ease: E }, 23.0)
    .fromTo('#line', { strokeDasharray: 300, strokeDashoffset: 300 }, { strokeDashoffset: 0, duration: 2.2, ease: 'power2.inOut' }, 24.4)
    .fromTo('#area', { opacity: 0 }, { opacity: 1, duration: 1.2 }, 25.4);

  // S8 end card
  tl.to('.dm-win', { autoAlpha: 0, scale: .96, duration: .4, ease: 'power2.in' }, 28.1)
    .fromTo('#p8', { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0, duration: .6, ease: E }, 28.4)
    .fromTo('#p8 .dm-cta', { scale: .9 }, { scale: 1, duration: .5, ease: 'back.out(1.8)' }, 29.0)
    .to('#p8 .dm-cta', { scale: 1.04, duration: .35, yoyo: true, repeat: 3, ease: 'sine.inOut' }, 29.7)
    .set('.dm-win', { autoAlpha: 1, scale: 1 }, D - 0.01);
  tl.set({}, {}, D);

  // clock: audio drives time when sound is on, otherwise wall clock
  const audio = new Audio('/media/hero-audio.m4a'); audio.preload = 'none'; audio.loop = true;
  let t0 = performance.now(), soundOn = false, lastCap = -1, visible = true;
  new IntersectionObserver(es => { visible = es[0].isIntersecting; if (!visible && soundOn) audio.pause(); else if (visible && soundOn) audio.play().catch(() => {}); }).observe(root);
  function frame(now) {
    let t = soundOn && !audio.paused ? audio.currentTime : ((now - t0) / 1000) % D;
    if (QT !== null) t = QT;
    if (visible) {
      tl.seek(Math.min(t, D - 0.001), false);
      let k = -1; for (let i = 0; i < caps.length; i++) if (t >= caps[i][0]) k = i;
      if (k !== lastCap) { lastCap = k; capEl.textContent = k >= 0 ? caps[k][1] : ''; capEl.parentElement.classList.toggle('on', k >= 0); }
    }
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);

  const btn = document.getElementById('snd'), lbl = btn.querySelector('span');
  btn.addEventListener('click', () => {
    soundOn = !soundOn;
    if (soundOn) { audio.currentTime = 0; audio.play().catch(() => { soundOn = false; }); }
    else { audio.pause(); t0 = performance.now() - audio.currentTime * 1000; }
    btn.classList.toggle('unmuted', soundOn);
    btn.setAttribute('aria-pressed', String(soundOn));
    btn.setAttribute('aria-label', soundOn ? 'Mute' : 'Unmute');
    lbl.textContent = soundOn ? 'Sound on' : 'Tap for sound';
  });
})();
