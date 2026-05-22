// sections.jsx — page sections for SAPSI × Verifyman landing
const { useState, useEffect, useRef, useMemo } = React;

/* ---------- Reveal-on-scroll hook ---------- */
function useReveal() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          el.classList.add('in');
          io.unobserve(el);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return ref;
}

/* ---------- Animated Counter ---------- */
function CountUp({ to, suffix = "", duration = 1400, format = (n) => n.toLocaleString() }) {
  const [val, setVal] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !started.current) {
        started.current = true;
        const start = performance.now();
        const tick = (now) => {
          const t = Math.min(1, (now - start) / duration);
          const eased = 1 - Math.pow(1 - t, 3);
          setVal(Math.round(to * eased));
          if (t < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
        io.disconnect();
      }
    }, { threshold: 0.4 });
    io.observe(el);
    return () => io.disconnect();
  }, [to, duration]);
  return <span ref={ref}>{format(val)}<span className="plus">{suffix}</span></span>;
}

/* ============================================================
   HERO
   ============================================================ */
function Hero({ layout }) {
  const r = useReveal();
  const isCentered = layout === 'centered';
  return (
    <>
    <section id="home" style={{
      minHeight: 'min(calc(100vh - 76px), 980px)',
      display: 'flex', flexDirection: 'column',
      position: 'relative', overflow: 'hidden',
    }}>
      {/* Green glow top-right */}
      <div aria-hidden style={{
        position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none',
        background:
          'radial-gradient(900px 600px at 85% 25%, color-mix(in oklab, var(--accent) 10%, transparent), transparent 60%),' +
          'radial-gradient(800px 600px at 0% 90%, color-mix(in oklab, var(--primary) 8%, transparent), transparent 60%)'
      }} />
      {/* Dot grid — left half only */}
      <div aria-hidden style={{
        position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none',
        backgroundImage: 'radial-gradient(circle, color-mix(in oklab, var(--primary) 12%, transparent) 1px, transparent 1px)',
        backgroundSize: '28px 28px',
        maskImage: 'radial-gradient(ellipse at 30% 50%, black 0%, transparent 70%)',
        WebkitMaskImage: 'radial-gradient(ellipse at 30% 50%, black 0%, transparent 70%)',
        opacity: 0.5,
      }} />

      <div className="container" style={{
        position: 'relative', zIndex: 1, flex: 1,
        display: 'flex', flexDirection: 'column', minHeight: 0,
        paddingTop: 'clamp(16px, 2vh, 32px)', paddingBottom: 0,
      }}>
        <div ref={r} className={`reveal hero-grid`} style={{
          textAlign: isCentered ? 'center' : 'left',
          gridTemplateColumns: isCentered ? '1fr' : undefined,
        }}>
          <div className="hero-copy-cell">
            <HeroCopy layout={layout} />
          </div>
          {!isCentered && <HeroVisual />}
        </div>
        {isCentered && <div style={{ flex: 1, minHeight: 0 }}><HeroVisual /></div>}
      </div>
    </section>

    {/* Trust strip */}
    <div style={{ borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', background: 'var(--bg)' }}>
      <div className="container" style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
        gap: 24, alignItems: 'center', paddingBlock: 22,
      }}>
        <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--text-muted)' }}>
          Trusted across India
        </div>
        {[
          { k: '500+',  v: 'Agencies onboard' },
          { k: '50k+',  v: 'Guards verified' },
          { k: '99%',   v: 'Verification success' },
          { k: '24/7',  v: 'Instant QR check' },
        ].map((s, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'baseline', gap: 10 }}>
            <span style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 600, color: 'var(--text-strong)', letterSpacing: '-0.02em' }}>{s.k}</span>
            <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>{s.v}</span>
          </div>
        ))}
      </div>
    </div>
    </>
  );
}

function HeroCopy({ layout }) {
  const isCentered = layout === 'centered';
  return (
    <div className="stack" style={{ gap: 26 }}>
      {/* Pill badge */}
      <span style={{
        display: 'inline-flex', alignItems: 'center', gap: 10,
        alignSelf: isCentered ? 'center' : 'flex-start',
        padding: '6px 12px 6px 6px', borderRadius: 999,
        background: 'color-mix(in oklab, var(--accent) 8%, var(--bg))',
        border: '1px solid color-mix(in oklab, var(--accent) 22%, transparent)',
        fontSize: 12.5, fontWeight: 500, color: 'var(--text-strong)',
      }}>
        <span style={{
          width: 22, height: 22, borderRadius: '50%',
          background: 'var(--accent)', color: '#fff',
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <Icon name="shieldCheck" size={13} strokeWidth={2.4} />
        </span>
        An initiative by <strong style={{ fontWeight: 600 }}>SAPSI</strong> × <strong style={{ fontWeight: 600 }}>Verifyman</strong>
      </span>

      {/* Headline */}
      <h1 className="display" style={{ textWrap: 'balance' }}>
        Digital Guard{' '}
        <span style={{ position: 'relative', whiteSpace: 'nowrap', display: 'inline-block' }}>
          Onboarding
          <svg aria-hidden viewBox="0 0 240 14" preserveAspectRatio="none" style={{ position: 'absolute', left: 0, right: 0, bottom: '-0.18em', width: '100%', height: '0.32em', color: 'var(--accent)' }}>
            <path d="M2 9 C 60 2, 120 14, 238 6" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
          </svg>
        </span>
        {' & '}
        <span className="accent-text">ID Generation</span>{' '}
        Made Easy
      </h1>

      <p className="lead" style={{ marginInline: isCentered ? 'auto' : 0, fontSize: 'clamp(16px, 1.2vw, 18.5px)' }}>
        End-to-end digital onboarding, background verification, and secure ID generation for private security guards — built for agencies, trusted by clients.
      </p>

      <div className="row" style={{ marginTop: 4, justifyContent: isCentered ? 'center' : 'flex-start', gap: 12 }}>
        <button className="btn btn-primary" onClick={() => document.getElementById('how')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}>
          Onboard Your Guards
          <Icon name="arrowRight" size={18} />
        </button>
        <button className="btn btn-outline" onClick={() => document.getElementById('verify')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}>
          <Icon name="qr" size={18} />
          Verify a Guard
        </button>
      </div>

      <div className="row" style={{ gap: 22, marginTop: 4, justifyContent: isCentered ? 'center' : 'flex-start' }}>
        <TrustItem icon="shieldCheck" label="Secure & Reliable" />
        <TrustItem icon="bolt"        label="Faster Onboarding" />
        <TrustItem icon="checkCircle" label="Verified & Approved" />
      </div>
    </div>
  );
}

function TrustItem({ icon, label }) {
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, color: 'var(--text-strong)', fontSize: 14, fontWeight: 500 }}>
      <span style={{
        display: 'inline-flex', width: 26, height: 26, borderRadius: '50%',
        background: 'color-mix(in oklab, var(--accent) 12%, var(--bg))',
        color: 'var(--accent-deep)', alignItems: 'center', justifyContent: 'center',
      }}>
        <Icon name={icon} size={15} strokeWidth={2.2} />
      </span>
      {label}
    </span>
  );
}

function HeroVisual() {
  return (
    <div className="hero-visual-cell">
      {/* Soft accent glow disc behind guard head */}
      <div aria-hidden style={{
        position: 'absolute', left: '50%', top: '38%',
        width: '78%', aspectRatio: '1 / 1',
        transform: 'translate(-50%, -50%)',
        borderRadius: '50%',
        background: 'radial-gradient(circle, color-mix(in oklab, var(--accent) 16%, transparent) 0%, transparent 60%)',
        filter: 'blur(10px)', zIndex: 0,
      }} />

      {/* Concentric decorative rings */}
      <svg aria-hidden viewBox="0 0 400 480" preserveAspectRatio="xMidYMid meet" style={{
        position: 'absolute', inset: 0, width: '100%', height: '100%',
        opacity: 0.14, color: 'var(--primary)', zIndex: 0,
      }}>
        <circle cx="200" cy="220" r="120" fill="none" stroke="currentColor" strokeWidth="1" />
        <circle cx="200" cy="220" r="170" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="2 6" />
        <circle cx="200" cy="220" r="225" fill="none" stroke="currentColor" strokeWidth="1" />
      </svg>

      {/* Ground ellipse shadow */}
      <div aria-hidden style={{
        position: 'absolute', left: '18%', right: '18%', bottom: 0,
        height: 28, borderRadius: '50%',
        background: 'radial-gradient(ellipse at center, rgba(13,31,92,0.30), transparent 65%)',
        filter: 'blur(6px)', zIndex: 0,
      }} />

      {/* Guard cutout — bg-less PNG */}
      <img
        src="image.png"
        alt="Verified security guard with SAPSI ID card"
        style={{
          position: 'absolute', left: '50%', bottom: 0,
          transform: 'translateX(-50%)',
          height: '100%', width: 'auto', maxWidth: '100%',
          objectFit: 'contain', objectPosition: 'bottom center',
          zIndex: 1,
          filter: 'drop-shadow(0 24px 28px rgba(13,31,92,0.18))',
          userSelect: 'none', pointerEvents: 'none', display: 'block',
        }}
        draggable="false"
      />

      {/* Floating "Verified & Approved" chip — right of head */}
      <div className="floating-verified-chip" style={{ position: 'absolute', right: '-4%', top: '18%', zIndex: 2, animation: 'heroFloatB 6s ease-in-out infinite' }}>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 10,
          padding: '10px 14px 10px 10px', borderRadius: 999,
          background: 'var(--card)', color: 'var(--text-strong)',
          boxShadow: '0 22px 40px -16px rgba(13,31,92,0.22), 0 4px 12px -4px rgba(13,31,92,0.12)',
          border: '1px solid var(--border)',
          fontSize: 13, fontWeight: 600,
        }}>
          <span style={{
            width: 28, height: 28, borderRadius: '50%',
            background: 'var(--accent)', color: '#fff',
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <Icon name="check" size={16} strokeWidth={3} />
          </span>
          <span className="verified-bg-label" style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.15 }}>
            <span style={{ fontSize: 10.5, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-muted)' }}>Background</span>
            <span>Verified &amp; Approved</span>
          </span>
        </div>
      </div>

      {/* Floating mini ID card — bottom-left */}
      <div className="floating-mini-id" style={{
        position: 'absolute', left: '-8%', bottom: '4%',
        width: 'min(220px, 56%)',
        transform: 'rotate(-6deg)',
        zIndex: 2,
        animation: 'heroFloatA 6s ease-in-out infinite',
      }}>
        <HeroMiniIdCard />
      </div>

      <style>{`
        @keyframes heroFloatA { 0%,100% { transform: rotate(-6deg) translateY(0); } 50% { transform: rotate(-6deg) translateY(-8px); } }
        @keyframes heroFloatB { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
        @media (max-width: 720px) { [data-hero-mini-id] { display: none; } }
      `}</style>
    </div>
  );
}

function HeroMiniIdCard() {
  return (
    <div data-hero-mini-id style={{
      background: '#fff', borderRadius: 14, overflow: 'hidden',
      border: '1px solid var(--border)',
      boxShadow: '0 30px 60px -22px rgba(13,31,92,0.45), 0 10px 20px -8px rgba(13,31,92,0.20)',
      color: '#0d1f5c',
    }}>
      <div style={{ background: 'var(--primary)', color: '#fff', padding: '8px 12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
          <SapsiMark size={18} />
          <strong style={{ fontFamily: 'var(--font-display)', fontSize: 12, letterSpacing: '0.06em' }}>SAPSI</strong>
        </div>
        <span style={{ fontSize: 9, fontWeight: 600, letterSpacing: '0.16em', opacity: 0.9 }}>GUARD ID</span>
      </div>
      <div style={{ padding: 10, display: 'grid', gridTemplateColumns: '46px 1fr', gap: 10 }}>
        <div style={{
          width: 46, height: 58, borderRadius: 5,
          background: 'linear-gradient(160deg, #1d3a91, #060f2e)',
          overflow: 'hidden',
        }}>
          <svg viewBox="0 0 46 58" width="46" height="58">
            <circle cx="23" cy="22" r="9" fill="#94a3b8" />
            <path d="M6 58c0-10 8-16 17-16s17 6 17 16" fill="#94a3b8" />
          </svg>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2, fontSize: 10, lineHeight: 1.3 }}>
          <div style={{ fontSize: 8, fontWeight: 600, letterSpacing: '0.08em', color: '#5a6481', textTransform: 'uppercase' }}>Name</div>
          <div style={{ fontWeight: 600 }}>Ramesh S.</div>
          <div style={{ fontSize: 8, fontWeight: 600, letterSpacing: '0.08em', color: '#5a6481', textTransform: 'uppercase', marginTop: 4 }}>Guard ID</div>
          <div style={{ fontWeight: 600, fontFamily: 'var(--font-mono)' }}>SAP2405150001</div>
        </div>
      </div>
      <div style={{ background: 'var(--accent)', color: '#fff', padding: '6px 12px', display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, fontWeight: 600 }}>
        <Icon name="check" size={12} strokeWidth={3} />
        Verified &amp; Approved
      </div>
    </div>
  );
}

/* ---------- ID Card Component ---------- */
function IdCard({ style = {}, name = "Ramesh S.", id = "SAP2405150001", agency = "ABC Security Services", blood = "O+", valid = "15-05-2026", verified = true }) {
  return (
    <div style={{
      background: '#fff',
      color: '#0d1f5c',
      borderRadius: 14,
      overflow: 'hidden',
      border: '1px solid rgba(13,31,92,0.12)',
      ...style
    }}>
      <div style={{ background: 'var(--navy-800)', color: '#fff', padding: '10px 14px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <SapsiMark size={22} />
          <strong style={{ fontFamily: 'var(--font-display)', fontSize: 14, letterSpacing: '0.04em' }}>SAPSI</strong>
        </div>
        <span style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.12em', opacity: 0.9 }}>GUARD ID CARD</span>
      </div>
      <div style={{ padding: 14, display: 'grid', gridTemplateColumns: '64px 1fr', gap: 12 }}>
        {/* Photo */}
        <div style={{
          width: 64, height: 80, borderRadius: 6,
          background: 'linear-gradient(160deg, #cbd5e1, #94a3b8)',
          position: 'relative', overflow: 'hidden',
          border: '1px solid rgba(13,31,92,0.12)'
        }}>
          <svg viewBox="0 0 64 80" width="64" height="80" style={{ position: 'absolute', inset: 0 }}>
            <circle cx="32" cy="30" r="12" fill="#64748b" />
            <path d="M10 80c0-14 10-22 22-22s22 8 22 22" fill="#64748b" />
          </svg>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4, fontSize: 11, lineHeight: 1.4 }}>
          <IdRow k="Name" v={name} />
          <IdRow k="Guard ID" v={id} mono />
          <IdRow k="Agency" v={agency} />
          <IdRow k="Blood Group" v={blood} />
          <IdRow k="Valid Upto" v={valid} mono />
        </div>
      </div>
      {verified && (
        <div style={{ background: 'var(--green-500)', color: '#fff', padding: '8px 14px', display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, fontWeight: 600 }}>
          <Icon name="check" size={14} strokeWidth={3} />
          Verified & Approved
        </div>
      )}
    </div>
  );
}
function IdRow({ k, v, mono }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '70px 8px 1fr', gap: 0 }}>
      <span style={{ color: '#5a6481', fontWeight: 500 }}>{k}</span>
      <span style={{ color: '#5a6481' }}>:</span>
      <span style={{ fontWeight: 600, fontFamily: mono ? 'var(--font-mono)' : 'inherit' }}>{v}</span>
    </div>
  );
}

/* ============================================================
   END-TO-END PROCESS (navy band)
   ============================================================ */
function Process() {
  const r = useReveal();
  const steps = [
    { icon: "userPlus",  label: "Agency Onboards Guard" },
    { icon: "docUp",     label: "Application Sent to SAPSI" },
    { icon: "userCheck", label: "Background Verification" },
    { icon: "shieldCheck", label: "Verification Completed" },
    { icon: "idCard",    label: "ID Delivered to Agency" },
  ];
  return (
    <section className="section on-navy" style={{ paddingBlock: 72 }}>
      <div className="container">
        <div ref={r} className="reveal" style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 36 }}>
          <div>
            <span className="eyebrow">Our End-to-End Process</span>
            <h2 className="h-section" style={{ marginTop: 12, maxWidth: 700 }}>
              From application to verified ID — five steps, zero friction
            </h2>
          </div>
          <ol style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: 16, padding: 0, margin: 0, listStyle: 'none'
          }}>
            {steps.map((s, i) => (
              <li key={i} style={{ position: 'relative' }}>
                <div style={{
                  display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: 14,
                  padding: '22px 14px',
                  borderRadius: 16,
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.08)',
                }}>
                  <div style={{
                    width: 60, height: 60, borderRadius: '50%',
                    background: 'rgba(255,255,255,0.06)',
                    border: '1px solid rgba(255,255,255,0.12)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: '#fff', position: 'relative'
                  }}>
                    <Icon name={s.icon} size={26} strokeWidth={1.7} />
                    <span style={{
                      position: 'absolute', top: -8, right: -8,
                      width: 28, height: 28, borderRadius: '50%',
                      background: 'var(--green-500)', color: '#fff',
                      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 13, fontWeight: 700, fontFamily: 'var(--font-display)',
                      border: '3px solid var(--navy-900)'
                    }}>{i+1}</span>
                  </div>
                  <div style={{ fontSize: 14, fontWeight: 500, color: '#fff', maxWidth: 140 }}>{s.label}</div>
                </div>
                {i < steps.length - 1 && (
                  <div aria-hidden style={{
                    position: 'absolute', top: '32px', right: -12,
                    width: 24, height: 2,
                    background: 'linear-gradient(to right, var(--green-400), transparent)',
                    display: 'none'
                  }} className="proc-connector" />
                )}
              </li>
            ))}
          </ol>
          <style>{`
            @media (min-width: 900px) {
              .proc-connector { display: block !important; }
            }
          `}</style>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   STATS — Trusted by Leading Agencies
   ============================================================ */
function Stats({ variant = "split" }) {
  const r = useReveal();
  const stats = [
    { num: 500, suffix: "+", label: "Agencies" },
    { num: 50000, suffix: "+", label: "Guards Onboarded" },
    { num: 99, suffix: "%", label: "Verification Success", format: (n) => n.toString() },
  ];
  return (
    <section className="section-tight" style={{ paddingBlock: 80 }}>
      <div className="container">
        <div ref={r} className="reveal" style={{
          display: 'grid',
          gridTemplateColumns: variant === 'split' ? 'minmax(0,1fr) minmax(0,1.4fr)' : '1fr',
          gap: 'clamp(32px, 5vw, 64px)',
          alignItems: 'center'
        }}>
          <div>
            <span className="eyebrow">Trust & Scale</span>
            <h2 className="h-section" style={{ marginTop: 12 }}>
              Trusted by Leading Security Agencies
            </h2>
            <p className="lead" style={{ marginTop: 14 }}>
              SAPSI &amp; Verifyman are committed to building trust and ensuring safety through innovation.
            </p>
          </div>
          <StatGrid stats={stats} variant={variant} />
        </div>
      </div>
    </section>
  );
}
function StatGrid({ stats, variant }) {
  if (variant === "minimal") {
    return (
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 24, borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', padding: '32px 0' }}>
        {stats.map((s, i) => (
          <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <div className="stat-num"><CountUp to={s.num} suffix={s.suffix} format={s.format} /></div>
            <div className="muted small">{s.label}</div>
          </div>
        ))}
      </div>
    );
  }
  if (variant === "cards") {
    return (
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 16 }}>
        {stats.map((s, i) => (
          <div key={i} className="card" style={{ padding: 24, background: 'var(--bg-tint)' }}>
            <div className="stat-num"><CountUp to={s.num} suffix={s.suffix} format={s.format} /></div>
            <div className="muted small" style={{ marginTop: 6 }}>{s.label}</div>
          </div>
        ))}
      </div>
    );
  }
  // split (default)
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(120px, 50%), 1fr))', gap: 28 }}>
      {stats.map((s, i) => (
        <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: 6, position: 'relative', paddingLeft: 18 }}>
          <span aria-hidden style={{ position: 'absolute', left: 0, top: 6, bottom: 6, width: 3, borderRadius: 2, background: 'var(--accent)' }} />
          <div className="stat-num"><CountUp to={s.num} suffix={s.suffix} format={s.format} /></div>
          <div className="muted small">{s.label}</div>
        </div>
      ))}
    </div>
  );
}

/* ============================================================
   WHY CHOOSE — 6 feature cards
   ============================================================ */
function WhyChoose() {
  const r = useReveal();
  const items = [
    { icon: "shieldCheck", title: "Trusted Verification",      body: "Every guard is thoroughly verified through a multi-layered process before approval.", featured: true },
    { icon: "qr",          title: "Instant QR Verification",   body: "Scan QR code to instantly verify guard details, status, and validity." },
    { icon: "lock",        title: "Secure & Reliable",          body: "Your data and guard information are protected with top-level security." },
    { icon: "doc",         title: "Complete Transparency",      body: "Real-time status, verification history, and expiry dates — always accessible." },
    { icon: "users",       title: "For Everyone",               body: "Built for agencies, clients, supervisors, and auditors to work together." },
    { icon: "chart",       title: "Industry Transformation",    body: "Driving the security industry towards a digital, verified, and trustworthy future.", featured: true },
  ];
  return (
    <section id="about" className="section on-navy">
      <div className="container">
        <div ref={r} className="reveal" style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 2fr)',
          gap: 'clamp(40px, 6vw, 80px)',
          alignItems: 'start',
        }}>
          {/* Left: section header */}
          <div style={{ position: 'sticky', top: 100 }}>
            <span className="eyebrow">Why Choose Our Project</span>
            <h2 className="h-section" style={{ marginTop: 16, maxWidth: 340 }}>
              A smart solution for modern security
            </h2>
            <p className="lead" style={{ marginTop: 16, maxWidth: 320 }}>
              Designed for agencies, clients, and the community — backed by SAPSI & Verifyman.
            </p>
            <div style={{ marginTop: 28, display: 'flex', flexDirection: 'column', gap: 12 }}>
              {[
                { num: '500+', label: 'Agencies trust us' },
                { num: '50k+', label: 'Guards verified' },
                { num: '99%',  label: 'Success rate' },
              ].map((s, i) => (
                <div key={i} style={{
                  display: 'flex', alignItems: 'center', gap: 14,
                  padding: '12px 16px', borderRadius: 12,
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.08)',
                }}>
                  <span style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 700, color: 'var(--green-400)', letterSpacing: '-0.03em', lineHeight: 1 }}>{s.num}</span>
                  <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)' }}>{s.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: 2-col feature grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: 14,
          }}>
            {items.map((it, i) => (
              <article key={i} style={{
                padding: '24px 22px',
                borderRadius: 18,
                background: it.featured
                  ? 'rgba(18,183,106,0.08)'
                  : 'rgba(255,255,255,0.03)',
                border: `1px solid ${it.featured ? 'rgba(18,183,106,0.22)' : 'rgba(255,255,255,0.07)'}`,
                display: 'flex', flexDirection: 'column', gap: 14,
                transition: 'transform .22s ease, background .22s ease, border-color .22s ease',
                cursor: 'default',
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.background = it.featured ? 'rgba(18,183,106,0.13)' : 'rgba(255,255,255,0.06)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.background = it.featured ? 'rgba(18,183,106,0.08)' : 'rgba(255,255,255,0.03)'; }}
              >
                <span style={{
                  width: 44, height: 44, borderRadius: 12,
                  background: it.featured ? 'var(--green-500)' : 'rgba(255,255,255,0.07)',
                  border: `1px solid ${it.featured ? 'transparent' : 'rgba(255,255,255,0.12)'}`,
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                  color: it.featured ? '#fff' : 'var(--green-300)',
                  flexShrink: 0,
                }}>
                  <Icon name={it.icon} size={20} strokeWidth={1.8} />
                </span>
                <h3 style={{
                  fontFamily: 'var(--font-display)', fontSize: 16, fontWeight: 600,
                  color: '#fff', margin: 0, letterSpacing: '-0.01em', lineHeight: 1.3,
                }}>{it.title}</h3>
                <p style={{ margin: 0, color: 'rgba(255,255,255,0.55)', fontSize: 13.5, lineHeight: 1.65 }}>{it.body}</p>
              </article>
            ))}
          </div>
        </div>

        <style>{`
          @media (max-width: 760px) {
            #about .reveal { grid-template-columns: 1fr !important; }
            #about .reveal > div:first-child { position: static !important; }
          }
          @media (max-width: 480px) {
            #about .reveal > div:last-child { grid-template-columns: 1fr !important; }
          }
        `}</style>
      </div>
    </section>
  );
}

/* ============================================================
   WHY THIS PROJECT (About Us strip)
   ============================================================ */
function WhyThisProject() {
  const r = useReveal();
  const pillars = [
    "Ensure every guard is verified and trustworthy",
    "Eliminate fake IDs and unverified personnel",
    "Bring transparency and accountability",
    "Build a digital, secure & future-ready system",
  ];
  return (
    <section className="section-tight" style={{ paddingBlock: 80 }}>
      <div className="container">
        <div ref={r} className="reveal on-navy" style={{ borderRadius: 24, padding: 'clamp(28px, 4vw, 48px)', position: 'relative', overflow: 'hidden' }}>
          {/* decorative shield */}
          <svg aria-hidden viewBox="0 0 200 200" style={{ position: 'absolute', right: -40, bottom: -40, width: 280, height: 280, opacity: 0.07, color: '#fff' }}>
            <path d="M100 10 20 36v62c0 46 35 80 80 92 45-12 80-46 80-92V36L100 10Z" fill="none" stroke="currentColor" strokeWidth="3" />
            <path d="M70 100 92 122 138 80" fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <div style={{ position: 'relative', display: 'grid', gridTemplateColumns: '1fr', gap: 28 }}>
            <div>
              <span className="eyebrow">Why This Project?</span>
              <h2 className="h-section" style={{ marginTop: 12, maxWidth: 760 }}>
                A standardized verification system the industry has been missing
              </h2>
              <p className="lead" style={{ marginTop: 14, maxWidth: 760 }}>
                The security industry plays a vital role in ensuring the safety of our homes, workplaces, and communities. However, the lack of a standardized verification system has been a major concern. This project is initiated to:
              </p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(140px, 50%), 1fr))', gap: 14 }}>
              {pillars.map((p, i) => (
                <div key={i} style={{
                  display: 'flex', alignItems: 'flex-start', gap: 12,
                  padding: '14px 16px',
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.10)',
                  borderRadius: 12
                }}>
                  <span style={{
                    flexShrink: 0,
                    width: 26, height: 26, borderRadius: '50%',
                    background: 'var(--green-500)',
                    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                    color: '#fff'
                  }}>
                    <Icon name="check" size={15} strokeWidth={3} />
                  </span>
                  <span style={{ fontSize: 14.5, color: '#e9edfb', lineHeight: 1.45 }}>{p}</span>
                </div>
              ))}
            </div>
            <div style={{
              marginTop: 8,
              padding: '20px 22px',
              background: 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(255,255,255,0.14)',
              borderRadius: 14,
              display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap'
            }}>
              <span style={{
                width: 44, height: 44, borderRadius: 12,
                background: 'var(--green-500)',
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                color: '#fff'
              }}>
                <Icon name="shieldCheck" size={22} strokeWidth={2} />
              </span>
              <div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 600, color: '#fff', letterSpacing: '-0.02em' }}>
                  Building Trust. Ensuring Safety.
                </div>
                <div style={{ color: 'var(--green-300)', fontSize: 15, fontWeight: 500, marginTop: 2 }}>
                  Digital Verification for a Secure Tomorrow.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   HOW IT WORKS — 5 numbered steps with details
   ============================================================ */
function HowItWorks() {
  const r = useReveal();
  const steps = [
    { icon: "userPlus",    title: "Agency Onboards Guard",     body: "Security agency adds guard details in SAPSI platform and submits the application." },
    { icon: "docUp",       title: "Application Sent to SAPSI", body: "Application & documents are securely sent to Verifyman platform via API integration." },
    { icon: "userCheck",   title: "Background Verification",   body: "Verifyman performs complete background verification and record checks." },
    { icon: "shieldCheck", title: "Verification Completed",    body: "All verifications are completed successfully and the profile is approved." },
    { icon: "idCard",      title: "ID Delivered to Agency",    body: "Digital ID card is generated and delivered to the agency." },
  ];
  const props = [
    { icon: "shieldCheck", label: "End-to-End Digital Process" },
    { icon: "checkCircle", label: "Accurate & Reliable Verification" },
    { icon: "lock",        label: "Secure Data Protection" },
    { icon: "bolt",        label: "Faster Onboarding" },
    { icon: "handshake",   label: "Stronger Partnership" },
  ];
  return (
    <section id="how" className="section">
      <div className="container">
        <div className="sect-head" ref={r}>
          <span className="eyebrow">How It Works</span>
          <h2 className="h-section" style={{ marginTop: 14 }}>A simple, secure process</h2>
          <p className="lead">Our simple and secure process ensures quick onboarding and verification of security guards.</p>
        </div>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(130px, 50%), 1fr))',
          gap: 16,
          marginBottom: 32
        }}>
          {steps.map((s, i) => (
            <article key={i} className="card card-hover" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 14, position: 'relative' }}>
              <span style={{
                position: 'absolute', top: 16, right: 16,
                width: 30, height: 30, borderRadius: '50%',
                background: 'var(--accent)', color: '#fff',
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 13, fontWeight: 700, fontFamily: 'var(--font-display)'
              }}>{i+1}</span>
              <span style={{
                width: 52, height: 52, borderRadius: 14,
                background: 'color-mix(in oklab, var(--primary) 8%, var(--bg))',
                color: 'var(--primary)',
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center'
              }}>
                <Icon name={s.icon} size={24} strokeWidth={1.7} />
              </span>
              <h3 className="h-card">{s.title}</h3>
              <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: 14, lineHeight: 1.55 }}>{s.body}</p>
            </article>
          ))}
        </div>
        {/* value props strip */}
        <div className="on-navy" style={{ borderRadius: 18, padding: '22px clamp(20px, 3vw, 36px)' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))', gap: 16, alignItems: 'center' }}>
            {props.map((p, i) => (
              <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: 10, color: '#fff' }}>
                <span style={{
                  width: 36, height: 36, borderRadius: '50%',
                  background: 'rgba(255,255,255,0.06)',
                  border: '1px solid rgba(255,255,255,0.16)',
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: 'var(--green-300)'
                }}>
                  <Icon name={p.icon} size={18} strokeWidth={1.8} />
                </span>
                <span style={{ fontSize: 13, fontWeight: 500, lineHeight: 1.3, maxWidth: 140 }}>{p.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   VERIFY GUARD — live demo
   ============================================================ */
const SAMPLE_GUARDS = {
  "SAP2405150001": { name: "Ramesh S.",   agency: "ABC Security Services",     blood: "O+",   valid: "15-05-2026", verifiedOn: "15-05-2024", status: "verified" },
  "SAP2310220034": { name: "Anita Verma", agency: "Sentinel Guard Co.",        blood: "B+",   valid: "22-10-2025", verifiedOn: "22-10-2023", status: "verified" },
  "SAP2401080112": { name: "Karthik R.",  agency: "Vanguard Protective Svcs",  blood: "A+",   valid: "08-01-2026", verifiedOn: "08-01-2024", status: "verified" },
};

function VerifyGuardDemo() {
  const r = useReveal();
  const [input, setInput] = useState("SAP2405150001");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function lookup(e) {
    e?.preventDefault();
    setError("");
    setResult(null);
    const key = input.trim().toUpperCase();
    if (!key) { setError("Enter a Guard ID to verify"); return; }
    setLoading(true);
    setTimeout(() => {
      const found = SAMPLE_GUARDS[key];
      if (found) {
        setResult({ id: key, ...found });
      } else {
        setError("No record found. Try SAP2405150001, SAP2310220034, or SAP2401080112.");
      }
      setLoading(false);
    }, 850);
  }

  return (
    <section id="verify" className="section" style={{ background: 'var(--bg-subtle)' }}>
      <div className="container">
        <div className="sect-head" ref={r}>
          <span className="eyebrow">Verify Guard</span>
          <h2 className="h-section" style={{ marginTop: 14 }}>Scan, type, verify — in seconds</h2>
          <p className="lead">Scan the QR code on the Guard ID card or enter the Guard ID to instantly verify details and status.</p>
        </div>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: 24,
          alignItems: 'stretch'
        }}>
          <PhoneScanner />
          <div className="card" style={{ padding: 28, display: 'flex', flexDirection: 'column', gap: 18 }}>
            <div>
              <h3 className="h-card" style={{ fontSize: 22 }}>Verify a Guard</h3>
              <p className="muted small" style={{ marginTop: 6 }}>Enter the Guard ID printed on the card.</p>
            </div>
            <form onSubmit={lookup} style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <label style={{ fontSize: 12, fontWeight: 600, letterSpacing: '0.04em', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Guard ID</label>
              <div style={{ display: 'flex', gap: 8 }}>
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="SAP2405150001"
                  style={{
                    flex: 1, height: 48,
                    padding: '0 14px',
                    border: '1px solid var(--border-strong)',
                    borderRadius: 10,
                    fontFamily: 'var(--font-mono)',
                    fontSize: 14,
                    background: 'var(--card)',
                    color: 'var(--text-strong)',
                    outline: 'none'
                  }}
                />
                <button type="submit" className="btn btn-primary" disabled={loading}>
                  {loading ? "Verifying…" : <>Verify <Icon name="arrowRight" size={16} /></>}
                </button>
              </div>
              <div className="muted small" style={{ fontSize: 12 }}>
                Try: <code style={{ fontFamily: 'var(--font-mono)' }}>SAP2405150001</code>, <code style={{ fontFamily: 'var(--font-mono)' }}>SAP2310220034</code>, <code style={{ fontFamily: 'var(--font-mono)' }}>SAP2401080112</code>
              </div>
            </form>

            {error && (
              <div style={{
                display: 'flex', alignItems: 'flex-start', gap: 10,
                padding: '12px 14px',
                background: 'color-mix(in oklab, #ef4444 10%, var(--bg))',
                color: '#b91c1c',
                border: '1px solid color-mix(in oklab, #ef4444 24%, transparent)',
                borderRadius: 10, fontSize: 13.5
              }}>
                <Icon name="alert" size={18} />
                <span>{error}</span>
              </div>
            )}

            {result && (
              <ResultPanel result={result} />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function ResultPanel({ result }) {
  return (
    <div style={{
      display: 'flex', flexDirection: 'column', gap: 14,
      padding: 18,
      background: 'color-mix(in oklab, var(--green-500) 6%, var(--bg))',
      border: '1px solid color-mix(in oklab, var(--green-500) 24%, transparent)',
      borderRadius: 12,
      animation: 'fadeUp .4s ease'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, color: 'var(--green-700)', fontWeight: 600, fontSize: 14 }}>
        <span style={{
          width: 26, height: 26, borderRadius: '50%',
          background: 'var(--green-500)', color: '#fff',
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center'
        }}>
          <Icon name="check" size={14} strokeWidth={3} />
        </span>
        Verified & Approved
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, fontSize: 13.5 }}>
        <ResField k="Name"        v={result.name} />
        <ResField k="Guard ID"    v={result.id} mono />
        <ResField k="Agency"      v={result.agency} />
        <ResField k="Blood Group" v={result.blood} />
        <ResField k="Valid Upto"  v={result.valid} mono />
        <ResField k="Verified On" v={result.verifiedOn} mono />
      </div>
      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
        <button className="btn btn-outline btn-sm">
          <Icon name="download" size={15} />
          Download ID
        </button>
        <button className="btn btn-outline btn-sm" style={{ color: '#b91c1c', borderColor: 'color-mix(in oklab, #ef4444 30%, transparent)' }}>
          <Icon name="alert" size={15} />
          Report Issue
        </button>
      </div>
      <style>{`@keyframes fadeUp { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: none; } }`}</style>
    </div>
  );
}
function ResField({ k, v, mono }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.04em', color: 'var(--text-muted)', textTransform: 'uppercase' }}>{k}</span>
      <span style={{ fontWeight: 600, color: 'var(--text-strong)', fontFamily: mono ? 'var(--font-mono)' : 'inherit' }}>{v}</span>
    </div>
  );
}

function PhoneScanner() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{
        position: 'relative',
        width: 'clamp(160px, 50vw, 280px)',
        aspectRatio: '1/2',
        background: '#0a1845',
        borderRadius: 44,
        padding: 12,
        boxShadow: '0 30px 80px -30px rgba(13,31,92,0.5), inset 0 0 0 2px rgba(255,255,255,0.06)'
      }}>
        <div style={{
          width: '100%', height: '100%',
          borderRadius: 32, overflow: 'hidden',
          background: 'linear-gradient(180deg, #0d1f5c, #060f2e)',
          color: '#fff',
          display: 'flex', flexDirection: 'column',
          padding: '32px 20px 20px',
          position: 'relative'
        }}>
          {/* notch */}
          <span style={{ position: 'absolute', top: 10, left: '50%', transform: 'translateX(-50%)', width: 100, height: 22, borderRadius: 14, background: '#000' }} />
          <div style={{ textAlign: 'center', fontSize: 13, fontWeight: 500, color: 'rgba(255,255,255,0.7)', marginTop: 18 }}>Scan QR Code</div>
          <div style={{
            margin: '24px auto 18px',
            width: 'min(70%, 200px)',
            aspectRatio: '1',
            background: '#fff',
            borderRadius: 16,
            padding: 12,
            position: 'relative'
          }}>
            <QrPattern />
            <ScannerLine />
            <span style={{ position: 'absolute', inset: 4, borderRadius: 14, pointerEvents: 'none', boxShadow: '0 0 0 0 transparent' }} />
            {/* corner brackets */}
            {[[0,0],[0,1],[1,0],[1,1]].map(([x,y], i) => (
              <span key={i} aria-hidden style={{
                position: 'absolute',
                top: y ? 'auto' : -6, bottom: y ? -6 : 'auto',
                left: x ? 'auto' : -6, right: x ? -6 : 'auto',
                width: 20, height: 20,
                borderTop: !y ? '3px solid var(--green-400)' : 'none',
                borderBottom: y ? '3px solid var(--green-400)' : 'none',
                borderLeft: !x ? '3px solid var(--green-400)' : 'none',
                borderRight: x ? '3px solid var(--green-400)' : 'none',
                borderTopLeftRadius: !x && !y ? 6 : 0,
                borderTopRightRadius: x && !y ? 6 : 0,
                borderBottomLeftRadius: !x && y ? 6 : 0,
                borderBottomRightRadius: x && y ? 6 : 0,
              }} />
            ))}
          </div>
          <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
            <div style={{
              width: 64, height: 64, borderRadius: '50%',
              background: 'var(--green-500)',
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 0 0 8px color-mix(in oklab, var(--green-500) 25%, transparent)',
              animation: 'verifPulse 2s infinite'
            }}>
              <Icon name="check" size={32} strokeWidth={3} color="#fff" />
            </div>
            <div style={{ fontSize: 18, fontWeight: 600, fontFamily: 'var(--font-display)' }}>Verified</div>
            <style>{`@keyframes verifPulse { 0%,100% { box-shadow: 0 0 0 6px color-mix(in oklab, var(--green-500) 25%, transparent); } 50% { box-shadow: 0 0 0 14px color-mix(in oklab, var(--green-500) 0%, transparent); } }`}</style>
          </div>
        </div>
      </div>
    </div>
  );
}
function QrPattern() {
  // generate a stable pseudo-random QR-ish pattern
  const size = 21;
  const cells = useMemo(() => {
    const arr = [];
    let seed = 9301;
    for (let y = 0; y < size; y++) {
      for (let x = 0; x < size; x++) {
        seed = (seed * 9301 + 49297) % 233280;
        const v = seed / 233280;
        arr.push(v > 0.55);
      }
    }
    return arr;
  }, []);
  const corner = (cx, cy) => (
    <g key={cx+'-'+cy}>
      <rect x={cx} y={cy} width="7" height="7" fill="#0d1f5c" />
      <rect x={cx+1} y={cy+1} width="5" height="5" fill="#fff" />
      <rect x={cx+2} y={cy+2} width="3" height="3" fill="#0d1f5c" />
    </g>
  );
  return (
    <svg viewBox={`0 0 ${size} ${size}`} width="100%" height="100%" shapeRendering="crispEdges">
      {cells.map((on, i) => {
        const x = i % size, y = Math.floor(i / size);
        // skip cells inside corner markers
        if ((x < 8 && y < 8) || (x > 12 && y < 8) || (x < 8 && y > 12)) return null;
        if (!on) return null;
        return <rect key={i} x={x} y={y} width="1" height="1" fill="#0d1f5c" />;
      })}
      {corner(0,0)}
      {corner(size-7,0)}
      {corner(0,size-7)}
    </svg>
  );
}
function ScannerLine() {
  return (
    <>
      <span aria-hidden style={{
        position: 'absolute',
        left: 12, right: 12, top: 12, height: 2,
        background: 'linear-gradient(to right, transparent, var(--green-400), transparent)',
        boxShadow: '0 0 16px var(--green-400)',
        borderRadius: 2,
        animation: 'scan 2.2s ease-in-out infinite'
      }} />
      <style>{`@keyframes scan { 0%,100% { transform: translateY(0); } 50% { transform: translateY(170px); } }`}</style>
    </>
  );
}

/* ============================================================
   CTA — Be a Part of the Change
   ============================================================ */
function ChangeCTA() {
  const r = useReveal();
  const audiences = [
    { icon: "building", label: "For Agencies",     desc: "Onboard & Verify Your Guards" },
    { icon: "shield",   label: "For Clients",      desc: "Verify Guards Deployed at Your Sites" },
    { icon: "users",    label: "For Supervisors",  desc: "Scan & Verify in Real Time" },
  ];
  return (
    <section className="section">
      <div className="container">
        <div className="sect-head" ref={r}>
          <span className="eyebrow">Be a Part of the Change</span>
          <h2 className="h-section" style={{ marginTop: 14 }}>Join hands with SAPSI & Verifyman</h2>
          <p className="lead">Be a part of a movement towards a safer and more secure society.</p>
        </div>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(140px, 50%), 1fr))',
          gap: 20, alignItems: 'stretch'
        }}>
          {audiences.map((a, i) => (
            <article key={i} className="card card-hover" style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', gap: 14, alignItems: 'center', justifyContent: 'center' }}>
              <span className="icon-chip" style={{ width: 56, height: 56 }}>
                <Icon name={a.icon} size={26} strokeWidth={1.7} />
              </span>
              <h3 className="h-card">{a.label}</h3>
              <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: 14.5, lineHeight: 1.5 }}>{a.desc}</p>
            </article>
          ))}
          <article className="card" style={{
            background: 'var(--primary)',
            color: '#fff',
            textAlign: 'center',
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 14,
            border: 'none'
          }}>
            <div style={{
              width: 120, height: 120, borderRadius: 12,
              background: '#fff', padding: 10
            }}>
              <QrPattern />
            </div>
            <div style={{ fontWeight: 600, fontFamily: 'var(--font-display)', fontSize: 16 }}>Scan to Verify<br/>a Guard Now!</div>
          </article>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   FOOTER
   ============================================================ */
function Footer() {
  return (
    <footer className="on-navy" style={{ paddingTop: 56, paddingBottom: 28 }}>
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1.4fr) repeat(auto-fit, minmax(min(100px, 50%), 1fr))',
          gap: 36
        }}>
          <div style={{ maxWidth: 360 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
              <SapsiMark size={40} />
              <div style={{ lineHeight: 1.1 }}>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 18, color: '#fff', letterSpacing: '-0.02em' }}>SAPSI</div>
                <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.6)' }}>State Association of Private Security Industry</div>
              </div>
            </div>
            <p style={{ margin: 0, color: 'rgba(255,255,255,0.7)', fontSize: 14, lineHeight: 1.6 }}>
              Building Trust. Ensuring Safety. Digital verification for a secure tomorrow.
            </p>
          </div>
          <FooterCol title="Platform" items={["Home", "How It Works", "Verify Guard", "About Us"]} />
          <FooterCol title="For" items={["Agencies", "Clients", "Supervisors", "Auditors"]} />
          <FooterCol title="Resources" items={["Documentation", "API Reference", "Support", "Contact"]} />
        </div>
        <div style={{
          marginTop: 40, paddingTop: 20,
          borderTop: '1px solid rgba(255,255,255,0.12)',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          flexWrap: 'wrap', gap: 12,
          fontSize: 13, color: 'rgba(255,255,255,0.6)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Icon name="shieldCheck" size={16} />
            SAPSI &amp; Verifyman — Building Trust. Ensuring Safety.
          </div>
          <div>© 2026 SAPSI. All rights reserved.</div>
        </div>
      </div>
    </footer>
  );
}
function FooterCol({ title, items }) {
  return (
    <div>
      <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: '0.1em', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', marginBottom: 14 }}>{title}</div>
      <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
        {items.map((it, i) => (
          <li key={i}><a href="#" style={{ color: 'rgba(255,255,255,0.8)', fontSize: 14 }}>{it}</a></li>
        ))}
      </ul>
    </div>
  );
}

Object.assign(window, {
  Hero, Process, Stats, WhyChoose, WhyThisProject, HowItWorks, VerifyGuardDemo, ChangeCTA, Footer, IdCard, QrPattern
});
