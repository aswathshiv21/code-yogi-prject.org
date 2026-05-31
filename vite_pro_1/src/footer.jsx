import { useState } from "react";


    const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Fraunces:wght@400;600&family=DM+Sans:wght@400;500&display=swap');
  @import url('https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@latest/tabler-icons.min.css');

  .footer-wrap {
    background: #2D4A2D;
    color: #E8F0E8;
    font-family: 'DM Sans', sans-serif;
    border-radius: 16px;
    overflow: hidden;
  }

  .footer-top {
    background: #3A5C3A;
    padding: 2.5rem;
    display: grid;
    grid-template-columns: 1.4fr 1fr 1fr 1fr;
    gap: 2rem;
  }

  @media (max-width: 768px) {
    .footer-top { grid-template-columns: 1fr 1fr; }
    .brand-col { grid-column: 1 / -1; }
    .newsletter { margin-left: 0 !important; width: 100%; }
    .footer-mid { flex-direction: column; align-items: flex-start !important; }
    .footer-bottom { flex-direction: column; gap: 12px; }
    .legal-links { flex-wrap: wrap; }
  }

  .brand-logo {
    font-family: 'Fraunces', serif;
    font-size: 26px;
    font-weight: 600;
    color: #B8DCAB;
    letter-spacing: -0.5px;
    margin: 0 0 8px;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .brand-tagline {
    font-size: 13px;
    color: #8FBF80;
    line-height: 1.6;
    margin: 0 0 20px;
    max-width: 200px;
  }

  .app-btns { display: flex; flex-direction: column; gap: 8px; }

  .app-btn {
    display: flex;
    align-items: center;
    gap: 8px;
    background: rgba(255,255,255,0.08);
    border: 0.5px solid rgba(255,255,255,0.15);
    border-radius: 8px;
    padding: 8px 12px;
    cursor: pointer;
    color: #E8F0E8;
    font-size: 12px;
    text-decoration: none;
    transition: background 0.15s;
  }
  .app-btn:hover { background: rgba(255,255,255,0.14); }
  .store-label { font-size: 10px; color: #8FBF80; display: block; line-height: 1; }
  .store-name { font-size: 13px; font-weight: 500; display: block; line-height: 1.3; }

  .link-col h4 {
    font-family: 'Fraunces', serif;
    font-size: 14px;
    font-weight: 600;
    color: #B8DCAB;
    margin: 0 0 14px;
  }

  .link-col ul {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 9px;
  }

  .link-col ul li a {
    text-decoration: none;
    color: #A8C9A0;
    font-size: 13px;
    transition: color 0.15s;
    display: flex;
    align-items: center;
    gap: 6px;
  }
  .link-col ul li a:hover { color: #E8F0E8; }

  .badge {
    font-size: 10px;
    background: #6AAB55;
    color: #fff;
    border-radius: 4px;
    padding: 2px 6px;
    font-weight: 500;
  }

  .footer-mid {
    background: #2D4A2D;
    padding: 1.5rem 2.5rem;
    display: flex;
    align-items: center;
    gap: 1rem;
    border-top: 0.5px solid rgba(255,255,255,0.08);
    flex-wrap: wrap;
  }

  .trust-pill {
    display: flex;
    align-items: center;
    gap: 6px;
    background: rgba(184,220,171,0.1);
    border: 0.5px solid rgba(184,220,171,0.2);
    border-radius: 20px;
    padding: 6px 14px;
    font-size: 12px;
    color: #B8DCAB;
  }

  .newsletter {
    margin-left: auto;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .newsletter-input {
    background: rgba(255,255,255,0.07);
    border: 0.5px solid rgba(255,255,255,0.18);
    border-radius: 8px;
    padding: 8px 14px;
    color: #E8F0E8;
    font-size: 13px;
    font-family: 'DM Sans', sans-serif;
    width: 200px;
    outline: none;
  }
  .newsletter-input::placeholder { color: #6A9060; }
  .newsletter-input:focus { border-color: rgba(184,220,171,0.4); }

  .sub-btn {
    background: #6AAB55;
    border: none;
    border-radius: 8px;
    padding: 8px 16px;
    color: #fff;
    font-size: 13px;
    font-weight: 500;
    font-family: 'DM Sans', sans-serif;
    cursor: pointer;
    transition: background 0.15s;
    white-space: nowrap;
  }
  .sub-btn:hover { background: #7DC56A; }

  .footer-bottom {
    background: #243D24;
    padding: 1rem 2.5rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 10px;
  }

  .copy { font-size: 12px; color: #6A9060; }

  .social-links { display: flex; gap: 8px; }

  .social-icon {
    width: 32px;
    height: 32px;
    background: rgba(255,255,255,0.07);
    border: 0.5px solid rgba(255,255,255,0.12);
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #8FBF80;
    text-decoration: none;
    font-size: 15px;
    transition: all 0.15s;
  }
  .social-icon:hover { background: rgba(184,220,171,0.15); color: #B8DCAB; }

  .legal-links { display: flex; gap: 16px; }
  .legal-links a { font-size: 11px; color: #6A9060; text-decoration: none; }
  .legal-links a:hover { color: #A8C9A0; }
`;

const shopLinks = [
  { icon: "ti-plant-2", label: "Fresh produce" },
  { icon: "ti-building-store", label: "Bakery & dairy" },
  { icon: "ti-meat", label: "Meat & seafood" },
  { icon: "ti-bottle", label: "Beverages" },
  { icon: "ti-discount-2", label: "Deals", badge: "Hot" },
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
  { icon: "ti-brand-instagram", label: "Instagram" },
  { icon: "ti-brand-facebook", label: "Facebook" },
  { icon: "ti-brand-x", label: "Twitter / X" },
  { icon: "ti-brand-youtube", label: "YouTube" },
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
      <footer className="footer-wrap w-full">

        {/* Top section */}
        <div className="footer-top">

          {/* Brand column */}
          <div className="brand-col">
            <p className="brand-logo">
              <i className="ti ti-shopping-bag" aria-hidden="true" style={{ fontSize: 22, color: "#7DC56A" }} />
              FreshNow
            </p>
            <p className="brand-tagline">
              Fresh groceries & daily essentials delivered to your door in 30 minutes.
            </p>
            <div className="app-btns">
              <a className="app-btn" href="#">
                <i className="ti ti-brand-apple" style={{ fontSize: 20 }} aria-hidden="true" />
                <span>
                  <span className="store-label">Download on the</span>
                  <span className="store-name">App Store</span>
                </span>
              </a>
              <a className="app-btn" href="#">
                <i className="ti ti-brand-google-play" style={{ fontSize: 20 }} aria-hidden="true" />
                <span>
                  <span className="store-label">Get it on</span>
                  <span className="store-name">Google Play</span>
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
            <div className="link-col" key={title}>
              <h4>{title}</h4>
              <ul>
                {links.map(({ icon, label, badge }) => (
                  <li key={label}>
                    <a href="#">
                      <i className={`ti ${icon}`} aria-hidden="true" style={{ fontSize: 14 }} />
                      {label}
                      {badge && <span className="badge">{badge}</span>}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Mid section — trust pills + newsletter */}
        <div className="footer-mid">
          {trustPills.map(({ icon, label }) => (
            <div className="trust-pill" key={label}>
              <i className={`ti ${icon}`} aria-hidden="true" style={{ fontSize: 15, color: "#7DC56A" }} />
              {label}
            </div>
          ))}

          <div className="newsletter" style={{ marginLeft: "auto" }}>
            {subscribed ? (
              <span style={{ fontSize: 13, color: "#B8DCAB" }}>
                <i className="ti ti-check" aria-hidden="true" /> Thanks for subscribing!
              </span>
            ) : (
              <>
                <input
                  type="email"
                  className="newsletter-input"
                  placeholder="Your email for weekly deals…"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSubscribe()}
                />
                <button className="sub-btn" onClick={handleSubscribe}>
                  Subscribe
                </button>
              </>
            )}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="footer-bottom">
          <span className="copy">© {new Date().getFullYear()} FreshNow. All rights reserved.</span>

          <div className="social-links">
            {socialLinks.map(({ icon, label }) => (
              <a key={label} className="social-icon" href="#" aria-label={label}>
                <i className={`ti ${icon}`} aria-hidden="true" />
              </a>
            ))}
          </div>

          <div className="legal-links">
            <a href="#">Privacy policy</a>
            <a href="#">Terms of service</a>
            <a href="#">Cookie settings</a>
          </div>
        </div>

      </footer>
    </>
  );
}
