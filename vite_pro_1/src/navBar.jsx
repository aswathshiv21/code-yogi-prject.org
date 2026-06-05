import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Playfair+Display:wght@600;700&display=swap');
  @import url('https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@latest/tabler-icons.min.css');

  * { box-sizing: border-box; }

  /* ── Keyframes ── */
  @keyframes nb-shimmer {
    0% { background-position: -200% center; }
    100% { background-position: 200% center; }
  }

  @keyframes nb-gradientLine {
    0% { background-position: 0% 50%; }
    100% { background-position: 200% 50%; }
  }

  @keyframes nb-cartPulse {
    0%, 100% { box-shadow: 0 0 0 0 rgba(16,185,129,0.45); }
    50% { box-shadow: 0 0 16px 4px rgba(16,185,129,0.25); }
  }

  @keyframes nb-searchGlow {
    0% { opacity: 0; }
    100% { opacity: 1; }
  }

  /* ── Header wrapper ── */
  .nb-header-wrap {
    font-family: 'Inter', sans-serif;
    position: sticky;
    top: 0;
    z-index: 1000;
    border-radius: 0 0 18px 18px;
    overflow: hidden;
    box-shadow: 0 8px 32px rgba(0,0,0,0.35);
  }

  /* ── Promo bar ── */
  .nb-promo-bar {
    background: linear-gradient(90deg, #10B981, #06B6D4, #8B5CF6, #10B981);
    background-size: 300% 100%;
    animation: nb-shimmer 6s linear infinite;
    color: #fff;
    text-align: center;
    font-size: 12px;
    font-weight: 500;
    padding: 8px 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    letter-spacing: 0.2px;
  }
  .nb-promo-bar a {
    color: #fff;
    text-decoration: underline;
    text-underline-offset: 2px;
    cursor: pointer;
    font-weight: 600;
  }
  .nb-promo-close {
    margin-left: auto;
    background: rgba(255,255,255,0.15);
    border: none;
    color: #fff;
    cursor: pointer;
    font-size: 14px;
    padding: 2px 6px;
    border-radius: 4px;
    line-height: 1;
    transition: background 0.2s;
  }
  .nb-promo-close:hover { background: rgba(255,255,255,0.3); }

  /* ── Gradient line separator ── */
  .nb-gradient-line {
    height: 2px;
    background: linear-gradient(90deg, #10B981, #06B6D4, #8B5CF6, #EC4899, #10B981);
    background-size: 200% 100%;
    animation: nb-gradientLine 4s linear infinite;
  }

  /* ── Top bar ── */
  .nb-top-bar {
    background: #0F1923;
    padding: 14px 2rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 18px;
    flex-wrap: wrap;
  }

  /* ── Logo ── */
  .nb-logo {
    font-family: 'Playfair Display', serif;
    font-size: 26px;
    font-weight: 700;
    background: linear-gradient(135deg, #10B981, #06B6D4);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    display: flex;
    align-items: center;
    gap: 10px;
    text-decoration: none;
    white-space: nowrap;
    flex-shrink: 0;
    transition: transform 0.2s;
  }
  .nb-logo:hover { transform: scale(1.03); }
  .nb-logo i {
    font-size: 24px;
    background: linear-gradient(135deg, #10B981, #06B6D4);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  /* ── Delivery pill ── */
  .nb-delivery-pill {
    display: flex;
    align-items: center;
    gap: 7px;
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 24px;
    padding: 7px 16px;
    font-size: 12px;
    color: rgba(255,255,255,0.55);
    cursor: pointer;
    white-space: nowrap;
    flex-shrink: 0;
    transition: all 0.25s;
    backdrop-filter: blur(6px);
  }
  .nb-delivery-pill:hover {
    background: rgba(255,255,255,0.08);
    border-color: rgba(16,185,129,0.3);
    color: rgba(255,255,255,0.8);
  }
  .nb-delivery-pill strong {
    color: #E2E8F0;
    font-weight: 600;
  }
  .nb-delivery-pill .nb-pin-icon {
    color: #10B981;
  }

  /* ── Search bar ── */
  .nb-search-wrap {
    flex: 1;
    max-width: 440px;
    position: relative;
    border-radius: 12px;
    padding: 2px;
    background: rgba(255,255,255,0.06);
    transition: all 0.3s;
  }
  .nb-search-wrap:focus-within {
    background: linear-gradient(135deg, #10B981, #06B6D4, #8B5CF6);
    box-shadow: 0 0 20px rgba(16,185,129,0.15);
  }
  .nb-search-bar {
    display: flex;
    align-items: center;
    background: #1A2332;
    border-radius: 10px;
    overflow: hidden;
    width: 100%;
  }
  .nb-search-bar input {
    flex: 1;
    border: none;
    outline: none;
    padding: 10px 14px;
    font-size: 13px;
    font-family: 'Inter', sans-serif;
    color: #E2E8F0;
    background: transparent;
  }
  .nb-search-bar input::placeholder { color: rgba(255,255,255,0.3); }
  .nb-search-btn {
    background: linear-gradient(135deg, #10B981, #06B6D4);
    border: none;
    padding: 10px 16px;
    cursor: pointer;
    color: #fff;
    font-size: 17px;
    display: flex;
    align-items: center;
    transition: all 0.2s;
  }
  .nb-search-btn:hover {
    filter: brightness(1.15);
    transform: scale(1.05);
  }

  /* ── Action buttons ── */
  .nb-header-actions {
    display: flex;
    align-items: center;
    gap: 8px;
    flex-shrink: 0;
  }

  .nb-action-btn {
    display: flex;
    align-items: center;
    gap: 7px;
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(255,255,255,0.07);
    border-radius: 10px;
    padding: 8px 14px;
    color: rgba(255,255,255,0.7);
    font-size: 12px;
    font-weight: 500;
    cursor: pointer;
    text-decoration: none;
    transition: all 0.25s;
    white-space: nowrap;
    backdrop-filter: blur(6px);
  }
  .nb-action-btn:hover {
    background: rgba(255,255,255,0.08);
    border-color: rgba(255,255,255,0.15);
    color: #fff;
    transform: translateY(-1px);
  }
  .nb-action-btn i {
    font-size: 17px;
    color: rgba(255,255,255,0.45);
    transition: color 0.25s;
  }
  .nb-action-btn:hover i { color: #10B981; }

  /* ── Cart button ── */
  .nb-cart-btn {
    display: flex;
    align-items: center;
    gap: 8px;
    background: linear-gradient(135deg, #10B981, #059669);
    border: none;
    border-radius: 10px;
    padding: 8px 16px;
    color: #fff;
    font-size: 13px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.25s;
    text-decoration: none;
    animation: nb-cartPulse 3s ease-in-out infinite;
  }
  .nb-cart-btn:hover {
    transform: translateY(-2px) scale(1.03);
    box-shadow: 0 6px 20px rgba(16,185,129,0.35);
  }
  .nb-cart-badge {
    background: rgba(255,255,255,0.2);
    color: #fff;
    font-size: 11px;
    font-weight: 700;
    border-radius: 10px;
    padding: 2px 7px;
    min-width: 20px;
    text-align: center;
    backdrop-filter: blur(4px);
  }

  /* ── Nav bar (frosted glass) ── */
  .nb-nav-bar {
    background: rgba(26,35,50,0.85);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    padding: 0 2rem;
    display: flex;
    align-items: center;
    border-top: 1px solid rgba(255,255,255,0.05);
    overflow-x: auto;
    scrollbar-width: none;
  }
  .nb-nav-bar::-webkit-scrollbar { display: none; }

  /* ── All categories button ── */
  .nb-all-cats {
    display: flex;
    align-items: center;
    gap: 7px;
    padding: 12px 18px;
    font-size: 13px;
    color: rgba(255,255,255,0.85);
    font-weight: 600;
    cursor: pointer;
    background: rgba(255,255,255,0.04);
    border: none;
    white-space: nowrap;
    transition: all 0.2s;
    border-radius: 0;
  }
  .nb-all-cats:hover { background: rgba(255,255,255,0.08); }

  .nb-nav-divider {
    width: 1px;
    height: 20px;
    background: rgba(255,255,255,0.08);
    margin: 0 4px;
    flex-shrink: 0;
  }

  /* ── Nav links with animated underline ── */
  .nb-nav-link {
    display: flex;
    align-items: center;
    gap: 7px;
    padding: 13px 16px;
    font-size: 13px;
    color: rgba(255,255,255,0.5);
    text-decoration: none;
    white-space: nowrap;
    cursor: pointer;
    background: none;
    border: none;
    position: relative;
    transition: color 0.25s;
    font-family: 'Inter', sans-serif;
    font-weight: 500;
  }
  .nb-nav-link::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    width: 0;
    height: 2px;
    background: linear-gradient(90deg, #10B981, #06B6D4);
    border-radius: 2px;
    transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
    transform: translateX(-50%);
  }
  .nb-nav-link:hover {
    color: rgba(255,255,255,0.9);
  }
  .nb-nav-link:hover::after {
    width: 70%;
  }
  .nb-nav-link.active {
    color: #10B981;
  }
  .nb-nav-link.active::after {
    width: 80%;
    background: linear-gradient(90deg, #10B981, #06B6D4);
    box-shadow: 0 0 8px rgba(16,185,129,0.4);
  }
  .nb-nav-link i { font-size: 16px; transition: transform 0.2s; }
  .nb-nav-link:hover i { transform: scale(1.1); }

  /* ── Nav badge ── */
  .nb-nav-badge {
    font-size: 9px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    background: linear-gradient(135deg, #EF4444, #F97316);
    color: #fff;
    border-radius: 4px;
    padding: 2px 6px;
    box-shadow: 0 0 8px rgba(239,68,68,0.3);
  }

  /* ── Responsive ── */
  @media (max-width: 768px) {
    .nb-top-bar { gap: 10px; padding: 12px 1rem; }
    .nb-delivery-pill { display: none; }
    .nb-search-wrap { max-width: 100%; order: 3; flex-basis: 100%; }
    .nb-action-btn span { display: none; }
    .nb-action-btn { padding: 8px 10px; }
    .nb-nav-bar { padding: 0 1rem; }
    .nb-logo { font-size: 22px; }
  }
`;

const navItems = [
  { icon: "ti-home", label: "Home" },
  { icon: "ti-plant-2", label: "Fruits & veggies" },
  { icon: "ti-building-store", label: "Dairy & bakery" },
  { icon: "ti-meat", label: "Meat & fish" },
  { icon: "ti-bottle", label: "Beverages" },
  { icon: "ti-cookie", label: "Snacks" },
  { icon: "ti-brush", label: "Personal care" },
  { icon: "ti-discount-2", label: "Deals", badge: "Hot" },
  { icon: "ti-clock", label: "Express" },
];

export default function NavBar({ cartCount: initialCartCount = 3, city = "Jabalpur, MP", counts, searchQuery = "", onSearchChange }) {
  const [showPromo, setShowPromo] = useState(true);
  const [activeNav, setActiveNav] = useState("Home");

  return (
    <>
      <style>{styles}</style>
      <header className="nb-header-wrap w-full">

        {/* Promo bar */}
        {showPromo && (
          <div className="nb-promo-bar">
            <i className="ti ti-gift" aria-hidden="true" style={{ fontSize: 14 }} />
            Free delivery on your first 3 orders! Use code <strong style={{ margin: "0 4px" }}>FRESH3</strong> at checkout.
            <a href="#">Shop now</a>
            <button className="nb-promo-close" onClick={() => setShowPromo(false)} aria-label="Dismiss promo">
              <i className="ti ti-x" aria-hidden="true" />
            </button>
          </div>
        )}

        {/* Animated gradient line */}
        <div className="nb-gradient-line" />

        {/* Top bar */}
        <div className="nb-top-bar">
          <Link className="nb-logo" to="/">
            <i className="ti ti-shopping-bag" aria-hidden="true" />
            FreshNow
          </Link>

          <div className="nb-delivery-pill">
            <i className="ti ti-map-pin nb-pin-icon" aria-hidden="true" style={{ fontSize: 14 }} />
            Deliver to <strong style={{ marginLeft: 4 }}>{city}</strong>
            <i className="ti ti-chevron-down" aria-hidden="true" style={{ fontSize: 13, opacity: 0.5 }} />
          </div>

          <div className="nb-search-wrap">
            <div className="nb-search-bar">
              <input
                type="text"
                placeholder="Search for vegetables, fruits, snacks…"
                value={searchQuery}
                onChange={(e) => onSearchChange && onSearchChange(e.target.value)}
              />
              <button className="nb-search-btn" aria-label="Search">
                <i className="ti ti-search" aria-hidden="true" />
              </button>
            </div>
          </div>

          <div className="nb-header-actions">
            <a className="nb-action-btn" href="#">
              <i className="ti ti-user" aria-hidden="true" />
              <span>Account</span>
            </a>
            <a className="nb-action-btn" href="#">
              <i className="ti ti-heart" aria-hidden="true" />
              <span>Saved</span>
            </a>
            <Link to={'/cart'} className="nb-cart-btn">
              <i className="ti ti-shopping-cart" aria-hidden="true" style={{ fontSize: 17 }} />
              Cart
              <span className="nb-cart-badge">{+counts}</span>
            </Link>
          </div>
        </div>

        {/* Nav bar */}
        <nav className="nb-nav-bar" aria-label="Category navigation">
          <div className="nb-all-cats">
            <i className="ti ti-layout-grid" aria-hidden="true" style={{ fontSize: 16 }} />
            All categories
            <i className="ti ti-chevron-down" aria-hidden="true" style={{ fontSize: 13, opacity: 0.5 }} />
          </div>
          <div className="nb-nav-divider" />
          {navItems.map(({ icon, label, badge }) => {
            const isHome = label === "Home";

            const Tag = isHome ? Link : "button";

            const extraProps = isHome
              ? { to: "/" }
              : { onClick: () => setActiveNav(label) };

            return (
              <Tag
                key={label}
                className={`nb-nav-link${activeNav === label ? " active" : ""}`}
                {...extraProps}
              >
                <i className={`ti ${icon}`} aria-hidden="true" />
                {label}
                {badge && <span className="nb-nav-badge">{badge}</span>}
              </Tag>
            );
          })}
        </nav>

      </header>
    </>
  );
}