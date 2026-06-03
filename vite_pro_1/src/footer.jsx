import { useState } from "react";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Playfair+Display:wght@600;700&display=swap');
  @import url('https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@latest/tabler-icons.min.css');

  /* ── Keyframes ── */
  @keyframes ft-gradientLine {
    0% { background-position: 0% 50%; }
    100% { background-position: 200% 50%; }
  }

  @keyframes ft-auroraFloat {
    0%, 100% { transform: translate(0, 0) scale(1); }
    33% { transform: translate(30px, -20px) scale(1.1); }
    66% { transform: translate(-20px, 15px) scale(0.95); }
  }

  @keyframes ft-auroraFloat2 {
    0%, 100% { transform: translate(0, 0) scale(1); }
    33% { transform: translate(-25px, 20px) scale(1.05); }
    66% { transform: translate(15px, -30px) scale(1.1); }
  }

  @keyframes ft-pillGlow {
    0%, 100% { box-shadow: 0 0 0 0 rgba(16,185,129,0); }
    50% { box-shadow: 0 0 12px 2px rgba(16,185,129,0.15); }
  }

  @keyframes ft-badgePulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.7; }
  }

  @keyframes ft-borderRotate {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }

  /* ── Footer wrapper ── */
  .ft-footer-wrap {
    font-family: 'Inter', sans-serif;
    color: #E2E8F0;
    overflow: hidden;
    border-radius: 20px 20px 0 0;
  }

  /* ── Animated gradient line at top ── */
  .ft-gradient-line {
    height: 3px;
    background: linear-gradient(90deg, #10B981, #06B6D4, #8B5CF6, #EC4899, #10B981);
    background-size: 200% 100%;
    animation: ft-gradientLine 4s linear infinite;
  }

  /* ── Footer top with aurora mesh ── */
  .ft-footer-top {
    background: #0F1923;
    padding: 3rem 2.5rem 2.5rem;
    display: grid;
    grid-template-columns: 1.3fr 1fr 1fr 1fr;
    gap: 2.5rem;
    position: relative;
    overflow: hidden;
  }
  .ft-footer-top::before {
    content: '';
    position: absolute;
    width: 350px;
    height: 350px;
    background: radial-gradient(circle, rgba(16,185,129,0.12) 0%, transparent 70%);
    top: -80px;
    left: -60px;
    border-radius: 50%;
    animation: ft-auroraFloat 8s ease-in-out infinite;
    pointer-events: none;
  }
  .ft-footer-top::after {
    content: '';
    position: absolute;
    width: 300px;
    height: 300px;
    background: radial-gradient(circle, rgba(6,182,212,0.1) 0%, transparent 70%);
    bottom: -60px;
    right: -40px;
    border-radius: 50%;
    animation: ft-auroraFloat2 10s ease-in-out infinite;
    pointer-events: none;
  }

  /* ── Brand column ── */
  .ft-brand-col {
    position: relative;
    z-index: 1;
  }

  .ft-brand-logo {
    font-family: 'Playfair Display', serif;
    font-size: 28px;
    font-weight: 700;
    background: linear-gradient(135deg, #10B981, #06B6D4);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    margin: 0 0 10px;
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .ft-brand-logo i {
    font-size: 24px;
    background: linear-gradient(135deg, #10B981, #06B6D4);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .ft-brand-tagline {
    font-size: 13px;
    color: rgba(255,255,255,0.4);
    line-height: 1.7;
    margin: 0 0 22px;
    max-width: 220px;
  }

  /* ── App store buttons ── */
  .ft-app-btns { display: flex; flex-direction: column; gap: 10px; }

  .ft-app-btn {
    display: flex;
    align-items: center;
    gap: 10px;
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 12px;
    padding: 10px 14px;
    cursor: pointer;
    color: #E2E8F0;
    font-size: 12px;
    text-decoration: none;
    transition: all 0.3s;
    backdrop-filter: blur(6px);
  }
  .ft-app-btn:hover {
    background: rgba(255,255,255,0.08);
    border-color: rgba(16,185,129,0.3);
    transform: translateY(-3px);
    box-shadow: 0 8px 24px rgba(0,0,0,0.3);
  }
  .ft-store-label {
    font-size: 10px;
    color: rgba(255,255,255,0.4);
    display: block;
    line-height: 1;
  }
  .ft-store-name {
    font-size: 14px;
    font-weight: 600;
    display: block;
    line-height: 1.3;
  }

  /* ── Link columns ── */
  .ft-link-col {
    position: relative;
    z-index: 1;
  }

  .ft-link-col h4 {
    font-family: 'Playfair Display', serif;
    font-size: 15px;
    font-weight: 600;
    background: linear-gradient(135deg, #10B981, #06B6D4);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    margin: 0 0 18px;
    letter-spacing: 0.3px;
  }

  .ft-link-col ul {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .ft-link-col ul li a {
    text-decoration: none;
    color: rgba(255,255,255,0.45);
    font-size: 13px;
    transition: all 0.25s;
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 6px 8px;
    border-radius: 8px;
    position: relative;
  }
  .ft-link-col ul li a::after {
    content: '→';
    opacity: 0;
    transform: translateX(-8px);
    transition: all 0.25s;
    color: #10B981;
    font-size: 12px;
  }
  .ft-link-col ul li a:hover {
    color: #fff;
    background: rgba(255,255,255,0.04);
    padding-left: 14px;
  }
  .ft-link-col ul li a:hover::after {
    opacity: 1;
    transform: translateX(0);
  }
  .ft-link-col ul li a i {
    font-size: 14px;
    color: rgba(255,255,255,0.25);
    transition: color 0.25s;
  }
  .ft-link-col ul li a:hover i { color: #10B981; }

  /* ── Badges ── */
  .ft-badge {
    font-size: 9px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    background: linear-gradient(135deg, #10B981, #06B6D4);
    color: #fff;
    border-radius: 4px;
    padding: 2px 7px;
    box-shadow: 0 0 8px rgba(16,185,129,0.3);
    animation: ft-badgePulse 2s ease-in-out infinite;
  }
  .ft-badge-hot {
    background: linear-gradient(135deg, #EF4444, #F97316);
    box-shadow: 0 0 8px rgba(239,68,68,0.3);
  }

  /* ── Newsletter section ── */
  .ft-footer-mid {
    background: #0D1520;
    padding: 2rem 2.5rem;
    display: flex;
    align-items: center;
    gap: 1.2rem;
    border-top: 1px solid rgba(255,255,255,0.04);
    flex-wrap: wrap;
  }

  /* ── Trust pills ── */
  .ft-trust-pill {
    display: flex;
    align-items: center;
    gap: 7px;
    background: rgba(16,185,129,0.06);
    border: 1px solid rgba(16,185,129,0.12);
    border-radius: 24px;
    padding: 8px 16px;
    font-size: 12px;
    font-weight: 500;
    color: rgba(255,255,255,0.6);
    animation: ft-pillGlow 4s ease-in-out infinite;
    transition: all 0.25s;
  }
  .ft-trust-pill:hover {
    background: rgba(16,185,129,0.1);
    border-color: rgba(16,185,129,0.25);
    color: rgba(255,255,255,0.85);
    transform: translateY(-1px);
  }
  .ft-trust-pill i {
    color: #10B981;
  }

  /* ── Newsletter card ── */
  .ft-newsletter-wrap {
    margin-left: auto;
    position: relative;
    border-radius: 14px;
    padding: 2px;
    background: linear-gradient(135deg, rgba(16,185,129,0.3), rgba(6,182,212,0.3), rgba(139,92,246,0.3));
  }
  .ft-newsletter {
    display: flex;
    align-items: center;
    gap: 8px;
    background: #0D1520;
    border-radius: 12px;
    padding: 6px;
  }

  .ft-newsletter-input {
    background: rgba(255,255,255,0.05);
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 8px;
    padding: 9px 14px;
    color: #E2E8F0;
    font-size: 13px;
    font-family: 'Inter', sans-serif;
    width: 220px;
    outline: none;
    transition: all 0.3s;
  }
  .ft-newsletter-input::placeholder { color: rgba(255,255,255,0.25); }
  .ft-newsletter-input:focus {
    border-color: rgba(16,185,129,0.4);
    background: rgba(255,255,255,0.07);
  }

  .ft-sub-btn {
    background: linear-gradient(135deg, #10B981, #059669);
    border: none;
    border-radius: 8px;
    padding: 9px 20px;
    color: #fff;
    font-size: 13px;
    font-weight: 600;
    font-family: 'Inter', sans-serif;
    cursor: pointer;
    transition: all 0.25s;
    white-space: nowrap;
  }
  .ft-sub-btn:hover {
    filter: brightness(1.15);
    transform: translateY(-1px);
    box-shadow: 0 4px 16px rgba(16,185,129,0.3);
  }

  .ft-sub-success {
    font-size: 13px;
    color: #10B981;
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 8px 14px;
  }

  /* ── Bottom bar with dot pattern ── */
  .ft-footer-bottom {
    background: #0A1018;
    padding: 1.2rem 2.5rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 12px;
    position: relative;
    overflow: hidden;
  }
  .ft-footer-bottom::before {
    content: '';
    position: absolute;
    inset: 0;
    background-image: radial-gradient(rgba(255,255,255,0.03) 1px, transparent 1px);
    background-size: 20px 20px;
    pointer-events: none;
  }

  .ft-copy {
    font-size: 12px;
    color: rgba(255,255,255,0.25);
    position: relative;
    z-index: 1;
  }

  /* ── Social links ── */
  .ft-social-links {
    display: flex;
    gap: 8px;
    position: relative;
    z-index: 1;
  }

  .ft-social-icon {
    width: 36px;
    height: 36px;
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(255,255,255,0.07);
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: rgba(255,255,255,0.4);
    text-decoration: none;
    font-size: 16px;
    transition: all 0.3s;
  }
  .ft-social-icon:hover {
    transform: translateY(-3px) scale(1.05);
    border-color: transparent;
    color: #fff;
  }
  .ft-social-icon.ft-ig:hover {
    background: linear-gradient(135deg, #F58529, #DD2A7B, #8134AF, #515BD4);
    box-shadow: 0 4px 16px rgba(221,42,123,0.3);
  }
  .ft-social-icon.ft-fb:hover {
    background: linear-gradient(135deg, #1877F2, #42A5F5);
    box-shadow: 0 4px 16px rgba(24,119,242,0.3);
  }
  .ft-social-icon.ft-tw:hover {
    background: linear-gradient(135deg, #1A1A2E, #16213E);
    box-shadow: 0 4px 16px rgba(0,0,0,0.4);
  }
  .ft-social-icon.ft-yt:hover {
    background: linear-gradient(135deg, #FF0000, #FF4444);
    box-shadow: 0 4px 16px rgba(255,0,0,0.3);
  }

  /* ── Legal links ── */
  .ft-legal-links {
    display: flex;
    gap: 18px;
    position: relative;
    z-index: 1;
  }
  .ft-legal-links a {
    font-size: 11px;
    color: rgba(255,255,255,0.2);
    text-decoration: none;
    transition: color 0.2s;
    position: relative;
  }
  .ft-legal-links a:hover { color: rgba(255,255,255,0.6); }
  .ft-legal-links a::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 0;
    height: 1px;
    background: #10B981;
    transition: width 0.25s;
  }
  .ft-legal-links a:hover::after { width: 100%; }

  /* ── Responsive ── */
  @media (max-width: 900px) {
    .ft-footer-top { grid-template-columns: 1fr 1fr; gap: 2rem; }
    .ft-brand-col { grid-column: 1 / -1; }
  }
  @media (max-width: 640px) {
    .ft-footer-top { grid-template-columns: 1fr; padding: 2rem 1.5rem; }
    .ft-footer-mid { padding: 1.5rem; flex-direction: column; align-items: flex-start; }
    .ft-newsletter-wrap { margin-left: 0; width: 100%; }
    .ft-newsletter { flex-direction: column; }
    .ft-newsletter-input { width: 100%; }
    .ft-footer-bottom { flex-direction: column; padding: 1.2rem 1.5rem; gap: 14px; }
    .ft-legal-links { flex-wrap: wrap; gap: 12px; }
  }
`;

const shopLinks = [
  { icon: "ti-plant-2", label: "Fresh produce" },
  { icon: "ti-building-store", label: "Bakery & dairy" },
  { icon: "ti-meat", label: "Meat & seafood" },
  { icon: "ti-bottle", label: "Beverages" },
  { icon: "ti-discount-2", label: "Deals", badge: "Hot", badgeType: "hot" },
];

const helpLinks = [
  { icon: "ti-truck-delivery", label: "Track my order" },
  { icon: "ti-clock", label: "Delivery times" },
  { icon: "ti-arrow-back-up", label: "Returns & refunds" },
  { icon: "ti-headset", label: "Contact us" },
  { icon: "ti-help-circle", label: "FAQs" },
];

const companyLinks = [
  { icon: "ti-info-circle", label: "About us" },
  { icon: "ti-users", label: "Careers", badge: "Hiring" },
  { icon: "ti-news", label: "Blog" },
  { icon: "ti-heart", label: "Community" },
  { icon: "ti-leaf", label: "Sustainability" },
];

const trustPills = [
  { icon: "ti-shield-check", label: "Secure payments" },
  { icon: "ti-star", label: "4.9 rated app" },
  { icon: "ti-refresh", label: "Easy returns" },
  { icon: "ti-clock", label: "30-min delivery" },
];

const socialLinks = [
  { icon: "ti-brand-instagram", label: "Instagram", cls: "ft-ig" },
  { icon: "ti-brand-facebook", label: "Facebook", cls: "ft-fb" },
  { icon: "ti-brand-x", label: "Twitter / X", cls: "ft-tw" },
  { icon: "ti-brand-youtube", label: "YouTube", cls: "ft-yt" },
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = () => {
    if (email.includes("@")) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <>
      <style>{styles}</style>
      <footer className="ft-footer-wrap w-full">

        {/* Animated gradient line */}
        <div className="ft-gradient-line" />

        {/* Top section */}
        <div className="ft-footer-top">

          {/* Brand column */}
          <div className="ft-brand-col">
            <p className="ft-brand-logo">
              <i className="ti ti-shopping-bag" aria-hidden="true" />
              FreshNow
            </p>
            <p className="ft-brand-tagline">
              Fresh groceries & daily essentials delivered to your door in 30 minutes.
            </p>
            <div className="ft-app-btns">
              <a className="ft-app-btn" href="#">
                <i className="ti ti-brand-apple" style={{ fontSize: 22 }} aria-hidden="true" />
                <span>
                  <span className="ft-store-label">Download on the</span>
                  <span className="ft-store-name">App Store</span>
                </span>
              </a>
              <a className="ft-app-btn" href="#">
                <i className="ti ti-brand-google-play" style={{ fontSize: 22 }} aria-hidden="true" />
                <span>
                  <span className="ft-store-label">Get it on</span>
                  <span className="ft-store-name">Google Play</span>
                </span>
              </a>
            </div>
          </div>

          {/* Link columns */}
          {[
            { title: "Shop", links: shopLinks },
            { title: "Help", links: helpLinks },
            { title: "Company", links: companyLinks },
          ].map(({ title, links }) => (
            <div className="ft-link-col" key={title}>
              <h4>{title}</h4>
              <ul>
                {links.map(({ icon, label, badge, badgeType }) => (
                  <li key={label}>
                    <a href="#">
                      <i className={`ti ${icon}`} aria-hidden="true" style={{ fontSize: 14 }} />
                      {label}
                      {badge && (
                        <span className={`ft-badge${badgeType === "hot" ? " ft-badge-hot" : ""}`}>
                          {badge}
                        </span>
                      )}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Mid section — trust pills + newsletter */}
        <div className="ft-footer-mid">
          {trustPills.map(({ icon, label }) => (
            <div className="ft-trust-pill" key={label}>
              <i className={`ti ${icon}`} aria-hidden="true" style={{ fontSize: 15 }} />
              {label}
            </div>
          ))}

          <div className="ft-newsletter-wrap">
            <div className="ft-newsletter">
              {subscribed ? (
                <span className="ft-sub-success">
                  <i className="ti ti-check" aria-hidden="true" /> Thanks for subscribing!
                </span>
              ) : (
                <>
                  <input
                    type="email"
                    className="ft-newsletter-input"
                    placeholder="Your email for weekly deals…"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSubscribe()}
                  />
                  <button className="ft-sub-btn" onClick={handleSubscribe}>
                    Subscribe
                  </button>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="ft-footer-bottom">
          <span className="ft-copy">© {new Date().getFullYear()} FreshNow. All rights reserved.</span>

          <div className="ft-social-links">
            {socialLinks.map(({ icon, label, cls }) => (
              <a key={label} className={`ft-social-icon ${cls}`} href="#" aria-label={label}>
                <i className={`ti ${icon}`} aria-hidden="true" />
              </a>
            ))}
          </div>

          <div className="ft-legal-links">
            <a href="#">Privacy policy</a>
            <a href="#">Terms of service</a>
            <a href="#">Cookie settings</a>
          </div>
        </div>

      </footer>
    </>
  );
}
