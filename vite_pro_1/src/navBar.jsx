import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import Product from "./product";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Fraunces:wght@400;600&family=DM+Sans:wght@400;500&display=swap');
  @import url('https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@latest/tabler-icons.min.css');

  * { box-sizing: border-box; }

  .header-wrap {
    font-family: 'DM Sans', sans-serif;
    border-radius: 0 0 16px 16px;
    overflow: hidden;
  }

  .promo-bar {
    background: #6AAB55;
    color: #fff;
    text-align: center;
    font-size: 12px;
    font-weight: 500;
    padding: 7px 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
  }
  .promo-bar a { color: #fff; text-decoration: underline; cursor: pointer; }
  .promo-close {
    margin-left: auto;
    background: none;
    border: none;
    color: rgba(255,255,255,0.8);
    cursor: pointer;
    font-size: 16px;
    padding: 0 4px;
    line-height: 1;
  }

  .top-bar {
    background: #2D4A2D;
    padding: 10px 2rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    flex-wrap: wrap;
  }

  .logo {
    font-family: 'Fraunces', serif;
    font-size: 24px;
    font-weight: 600;
    color: #B8DCAB;
    display: flex;
    align-items: center;
    gap: 8px;
    text-decoration: none;
    white-space: nowrap;
    flex-shrink: 0;
  }

  .delivery-pill {
    display: flex;
    align-items: center;
    gap: 6px;
    background: rgba(255,255,255,0.08);
    border: 0.5px solid rgba(255,255,255,0.15);
    border-radius: 20px;
    padding: 6px 14px;
    font-size: 12px;
    color: #A8C9A0;
    cursor: pointer;
    white-space: nowrap;
    flex-shrink: 0;
    transition: background 0.15s;
  }
  .delivery-pill:hover { background: rgba(255,255,255,0.14); }
  .delivery-pill strong { color: #E8F0E8; font-weight: 500; }

  .search-bar {
    flex: 1;
    max-width: 420px;
    display: flex;
    align-items: center;
    background: #fff;
    border-radius: 10px;
    overflow: hidden;
    border: 1.5px solid transparent;
    transition: border-color 0.15s;
  }
  .search-bar:focus-within { border-color: #7DC56A; }
  .search-bar input {
    flex: 1;
    border: none;
    outline: none;
    padding: 9px 12px;
    font-size: 13px;
    font-family: 'DM Sans', sans-serif;
    color: #2D4A2D;
    background: transparent;
  }
  .search-bar input::placeholder { color: #9DB89A; }
  .search-btn {
    background: #6AAB55;
    border: none;
    padding: 9px 14px;
    cursor: pointer;
    color: #fff;
    font-size: 17px;
    display: flex;
    align-items: center;
    transition: background 0.15s;
  }
  .search-btn:hover { background: #7DC56A; }

  .header-actions {
    display: flex;
    align-items: center;
    gap: 6px;
    flex-shrink: 0;
  }

  .action-btn {
    display: flex;
    align-items: center;
    gap: 6px;
    background: rgba(255,255,255,0.08);
    border: 0.5px solid rgba(255,255,255,0.15);
    border-radius: 8px;
    padding: 7px 12px;
    color: #E8F0E8;
    font-size: 12px;
    font-weight: 500;
    cursor: pointer;
    text-decoration: none;
    transition: background 0.15s;
    white-space: nowrap;
  }
  .action-btn:hover { background: rgba(255,255,255,0.14); }
  .action-btn i { font-size: 17px; color: #8FBF80; }

  .cart-btn {
    display: flex;
    align-items: center;
    gap: 7px;
    background: #6AAB55;
    border: none;
    border-radius: 8px;
    padding: 7px 14px;
    color: #fff;
    font-size: 13px;
    font-weight: 500;
    cursor: pointer;
    transition: background 0.15s;
  }
  .cart-btn:hover { background: #7DC56A; }
  .cart-badge {
    background: #fff;
    color: #3A5C3A;
    font-size: 11px;
    font-weight: 600;
    border-radius: 10px;
    padding: 1px 6px;
    min-width: 18px;
    text-align: center;
  }

  .nav-bar {
    background: #3A5C3A;
    padding: 0 2rem;
    display: flex;
    align-items: center;
    border-top: 0.5px solid rgba(255,255,255,0.08);
    overflow-x: auto;
    scrollbar-width: none;
  }
  .nav-bar::-webkit-scrollbar { display: none; }

  .all-cats {
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 11px 16px;
    font-size: 13px;
    color: #E8F0E8;
    font-weight: 500;
    cursor: pointer;
    background: rgba(255,255,255,0.06);
    border-bottom: 2px solid transparent;
    white-space: nowrap;
  }

  .nav-divider {
    width: 0.5px;
    height: 18px;
    background: rgba(255,255,255,0.12);
    margin: 0 4px;
    flex-shrink: 0;
  }

  .nav-link {
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 11px 16px;
    font-size: 13px;
    color: #A8C9A0;
    text-decoration: none;
    white-space: nowrap;
    border-bottom: 2px solid transparent;
    transition: color 0.15s, border-color 0.15s;
    cursor: pointer;
    background: none;
    border-left: none;
    border-right: none;
    border-top: none;
  }
  .nav-link:hover { color: #E8F0E8; }
  .nav-link.active { color: #B8DCAB; border-bottom-color: #7DC56A; }
  .nav-link i { font-size: 16px; }

  .nav-badge {
    font-size: 10px;
    background: #E05C3A;
    color: #fff;
    border-radius: 4px;
    padding: 1px 5px;
    font-weight: 500;
  }

  @media (max-width: 768px) {
    .top-bar { gap: 10px; }
    .delivery-pill { display: none; }
    .search-bar { max-width: 100%; order: 3; flex-basis: 100%; }
    .action-btn span { display: none; }
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

export default function NavBar({ cartCount: initialCartCount = 3, city = "Jabalpur, MP" , counts}) {
  const [showPromo, setShowPromo] = useState(true);
  const [activeNav, setActiveNav] = useState("Home");
  const [searchQuery, setSearchQuery] = useState("");


<<<<<<< HEAD
function NavBar(){
    return(
        <>
         <div className="w-full mr-4 h-20">
            <div className="w-full flex self-end justify-end">
                <div className="flex w-xs justify-between mr-10">
                  <Link to={'/'}>Home</Link>
                  <Link to={'/products'}>Products</Link>
                  <Link to={'/about'}>About Us</Link>
                  <Link to={'/contact'}>Contact us</Link>
                </div>
                <div className="w-30 flex justify-between">
                  <Link className=" p-2 pl-4 pr-4 bg-blue-500 rounded-xl" to={'/acount'}>Acount</Link>
                  <Link to={'/login'}>Login</Link>
                </div>
            </div>
         </div>
        </>
    )
}
=======
>>>>>>> dublicate

  return (
    <>
      <style>{styles}</style>
      <header className="header-wrap w-full">

        {/* Promo bar */}
        {showPromo && (
          <div className="promo-bar">
            <i className="ti ti-gift" aria-hidden="true" style={{ fontSize: 14 }} />
            Free delivery on your first 3 orders! Use code <strong style={{ margin: "0 3px" }}>FRESH3</strong> at checkout.
            <a href="#">Shop now</a>
            <button className="promo-close" onClick={() => setShowPromo(false)} aria-label="Dismiss promo">
              <i className="ti ti-x" aria-hidden="true" />
            </button>
          </div>
        )}

        {/* Top bar */}
        <div className="top-bar">
          {/* Changed <a> to <Link> for the logo */}
          <Link className="logo" to="/">
            <i className="ti ti-shopping-bag" aria-hidden="true" style={{ fontSize: 22, color: "#7DC56A" }} />
            FreshNow
          </Link>

          <div className="delivery-pill">
            <i className="ti ti-map-pin" aria-hidden="true" style={{ fontSize: 14, color: "#7DC56A" }} />
            Deliver to <strong style={{ marginLeft: 4 }}>{city}</strong>
            <i className="ti ti-chevron-down" aria-hidden="true" style={{ fontSize: 13 }} />
          </div>

          <div className="search-bar">
            <input
              type="text"
              placeholder="Search for vegetables, fruits, snacks…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button className="search-btn" aria-label="Search">
              <i className="ti ti-search" aria-hidden="true" />
            </button>
          </div>

          <div className="header-actions">
            <a className="action-btn" href="#">
              <i className="ti ti-user" aria-hidden="true" />
              <span>Account</span>
            </a>
            <a className="action-btn" href="#">
              <i className="ti ti-heart" aria-hidden="true" />
              <span>Saved</span>
            </a>
            <Link to={'/cart'} className="cart-btn">
              <i className="ti ti-shopping-cart" aria-hidden="true" style={{ fontSize: 17 }} />
              Cart
              <span className="cart-badge">{+counts}</span>
            </Link>
          </div>
        </div>

        {/* Nav bar */}
        <nav className="nav-bar" aria-label="Category navigation">
          <div className="all-cats">
            <i className="ti ti-layout-grid" aria-hidden="true" style={{ fontSize: 16 }} />
            All categories
            <i className="ti ti-chevron-down" aria-hidden="true" style={{ fontSize: 13 }} />
          </div>
          <div className="nav-divider" />
          {navItems.map(({ icon, label, badge }) => {
            const isHome = label === "Home";
            
            // Changed "a" tag logic to use <Link> component when isHome is true
            const Tag = isHome ? Link : "button";
            
            // Updated extraProps to provide "to" instead of "href"
            const extraProps = isHome
              ? { to: "/" }
              : { onClick: () => setActiveNav(label) };
              
            return (
              <Tag
                key={label}
                className={`nav-link${activeNav === label ? " active" : ""}`}
                {...extraProps}
              >
                <i className={`ti ${icon}`} aria-hidden="true" />
                {label}
                {badge && <span className="nav-badge">{badge}</span>}
              </Tag>
            );
          })}
        </nav>

      </header>
    </>
  );
}