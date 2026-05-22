// app.jsx — root App, navigation, tweaks wiring
const { useState, useEffect } = React;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "primary": "#0d1f5c",
  "accent": "#12b76a",
  "font": "geist",
  "density": "regular",
  "dark": false,
  "heroLayout": "split",
  "statStyle": "split"
}/*EDITMODE-END*/;

const FONT_STACKS = {
  geist:   { display: '"Geist", ui-sans-serif, system-ui, sans-serif',   sans: '"Geist", ui-sans-serif, system-ui, sans-serif' },
  manrope: { display: '"Manrope", ui-sans-serif, system-ui, sans-serif', sans: '"Manrope", ui-sans-serif, system-ui, sans-serif' },
  sora:    { display: '"Sora", ui-sans-serif, system-ui, sans-serif',    sans: '"Geist", ui-sans-serif, system-ui, sans-serif' },
  system:  { display: 'ui-sans-serif, system-ui, -apple-system, sans-serif', sans: 'ui-sans-serif, system-ui, -apple-system, sans-serif' },
};

// Derive a deeper shade by mixing with black
function deeper(hex, amt = 0.15) {
  return `color-mix(in oklab, ${hex} ${(1-amt)*100}%, black)`;
}

function Nav({ active, onNavigate }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const links = [
    { id: "home",   label: "Home" },
    { id: "how",    label: "How It Works" },
    { id: "verify", label: "Verify Guard" },
    { id: "about",  label: "About Us" },
    { id: "contact",label: "Contact" },
  ];

  const handleNavClick = (id) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="nav-wrap">
      <div className="container nav">
        <div className="brand-lockup">
          <div className="brand">
            <SapsiMark size={42} />
            <div className="brand-text">
              <div className="b1">SAPSI</div>
              <div className="b2">State Association of<br/>Private Security Industry</div>
            </div>
          </div>
          <div className="brand-divider" />
          <div className="brand">
            <VerifymanMark size={28} />
            <div className="brand-text">
              <div className="b1" style={{ fontSize: 16 }}>Verifyman</div>
            </div>
          </div>
        </div>

        <nav className="nav-links" aria-label="Primary">
          {links.map(l => (
            <a key={l.id} href={`#${l.id}`}
              className={"nav-link" + (active === l.id ? " active" : "")}
              onClick={(e) => { e.preventDefault(); onNavigate(l.id); }}>
              {l.label}
            </a>
          ))}
        </nav>

        <button className="btn btn-primary btn-sm btn-login" style={{ height: 42 }}>
          Partner Login
        </button>

        <button className="nav-toggle" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label="Toggle menu">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>
      </div>

      {mobileMenuOpen && (
        <nav className="mobile-menu">
          {links.map(l => (
            <a key={l.id} href={`#${l.id}`}
              className={"mobile-link" + (active === l.id ? " active" : "")}
              onClick={(e) => { e.preventDefault(); handleNavClick(l.id); }}>
              {l.label}
            </a>
          ))}
          <button className="btn btn-primary" style={{ width: '100%' }}>
            Partner Login
          </button>
        </nav>
      )}
    </header>
  );
}

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [active, setActive] = useState("home");

  // Apply tweaks to :root
  useEffect(() => {
    const r = document.documentElement;
    // primary navy variants
    r.style.setProperty('--primary', t.primary);
    r.style.setProperty('--primary-deep', deeper(t.primary, 0.18));
    // accent green variants
    r.style.setProperty('--accent', t.accent);
    r.style.setProperty('--accent-deep', deeper(t.accent, 0.16));
    // font
    const f = FONT_STACKS[t.font] || FONT_STACKS.geist;
    r.style.setProperty('--font-display', f.display);
    r.style.setProperty('--font-sans', f.sans);
    // density
    r.setAttribute('data-density', t.density);
    // dark
    r.setAttribute('data-theme', t.dark ? 'dark' : 'light');
  }, [t.primary, t.accent, t.font, t.density, t.dark]);

  // Smooth-scroll on nav click + scroll-spy
  function navigate(id) {
    setActive(id);
    const target = document.getElementById(id) || document.getElementById('home');
    if (target) {
      window.scrollTo({ top: target.offsetTop - 70, behavior: 'smooth' });
    }
  }

  useEffect(() => {
    const ids = ['home', 'how', 'verify', 'about'];
    const onScroll = () => {
      const y = window.scrollY + 120;
      let cur = 'home';
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= y) cur = id;
      }
      setActive(cur);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <Nav active={active} onNavigate={navigate} />
      <main>
        <Hero layout={t.heroLayout} />
        <Process />
        <Stats variant={t.statStyle} />
        <WhyChoose />
        <WhyThisProject />
        <HowItWorks />
        <VerifyGuardDemo />
        <ChangeCTA />
      </main>
      <Footer />

      <TweaksPanel title="Tweaks">
        <TweakSection label="Brand Color" />
        <TweakColor label="Primary (navy)" value={t.primary}
          options={["#0d1f5c", "#060f2e", "#14296f", "#1d3a91", "#0b1e3f"]}
          onChange={(v) => setTweak('primary', v)} />
        <TweakColor label="Accent (green)" value={t.accent}
          options={["#12b76a", "#039855", "#16a34a", "#10b981", "#22c55e", "#65a30d"]}
          onChange={(v) => setTweak('accent', v)} />

        <TweakSection label="Typography" />
        <TweakSelect label="Font pairing" value={t.font}
          options={[
            { value: "geist",   label: "Geist (default)" },
            { value: "manrope", label: "Manrope" },
            { value: "sora",    label: "Sora (display) + Geist (body)" },
            { value: "system",  label: "System UI" },
          ]}
          onChange={(v) => setTweak('font', v)} />

        <TweakSection label="Layout" />
        <TweakRadio label="Hero layout" value={t.heroLayout}
          options={[
            { value: "split",    label: "Split" },
            { value: "centered", label: "Centered" },
          ]}
          onChange={(v) => setTweak('heroLayout', v)} />
        <TweakRadio label="Stat style" value={t.statStyle}
          options={[
            { value: "split",   label: "Split" },
            { value: "minimal", label: "Minimal" },
            { value: "cards",   label: "Cards" },
          ]}
          onChange={(v) => setTweak('statStyle', v)} />
        <TweakRadio label="Density" value={t.density}
          options={[
            { value: "compact", label: "Compact" },
            { value: "regular", label: "Regular" },
            { value: "comfy",   label: "Comfy" },
          ]}
          onChange={(v) => setTweak('density', v)} />

        <TweakSection label="Theme" />
        <TweakToggle label="Dark mode" value={t.dark} onChange={(v) => setTweak('dark', v)} />
      </TweaksPanel>
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
