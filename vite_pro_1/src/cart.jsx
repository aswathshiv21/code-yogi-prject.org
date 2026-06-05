import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";

const cartStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Fraunces:wght@400;600&family=DM+Sans:wght@400;500;600;700&display=swap');
  @import url('https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@latest/tabler-icons.min.css');

  .cart-page {
    font-family: 'DM Sans', sans-serif;
    min-height: 80vh;
    padding: 2rem 1rem;
    max-width: 1200px;
    margin: 0 auto;
    width: 100%;
  }

  /* ── Header ── */
  .cart-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 2rem;
    flex-wrap: wrap;
    gap: 1rem;
  }
  .cart-header-left {
    display: flex;
    align-items: center;
    gap: 12px;
  }
  .cart-header-left i {
    font-size: 28px;
    color: #6AAB55;
  }
  .cart-header-left h1 {
    font-family: 'Fraunces', serif;
    font-size: 28px;
    font-weight: 600;
    color: #2D4A2D;
    margin: 0;
  }
  .cart-header-left .item-count {
    background: #E8F5E4;
    color: #3A5C3A;
    font-size: 13px;
    font-weight: 600;
    padding: 3px 10px;
    border-radius: 20px;
  }
  .cart-clear-btn {
    display: flex;
    align-items: center;
    gap: 6px;
    background: none;
    border: 1.5px solid #E05C3A;
    color: #E05C3A;
    font-family: 'DM Sans', sans-serif;
    font-size: 13px;
    font-weight: 600;
    padding: 8px 18px;
    border-radius: 10px;
    cursor: pointer;
    transition: all 0.2s ease;
  }
  .cart-clear-btn:hover {
    background: #E05C3A;
    color: #fff;
  }
  .cart-clear-btn i { font-size: 16px; }

  /* ── Layout ── */
  .cart-layout {
    display: grid;
    grid-template-columns: 1fr 360px;
    gap: 2rem;
    align-items: start;
  }

  /* ── Cart Items ── */
  .cart-items-list {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  .cart-item {
    display: flex;
    align-items: center;
    gap: 1.25rem;
    background: #fff;
    border: 1px solid #E8EDE6;
    border-radius: 16px;
    padding: 1rem 1.25rem;
    transition: all 0.25s ease;
    position: relative;
    overflow: hidden;
  }
  .cart-item::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 4px;
    background: #6AAB55;
    border-radius: 4px 0 0 4px;
    opacity: 0;
    transition: opacity 0.2s ease;
  }
  .cart-item:hover {
    border-color: #B8DCAB;
    box-shadow: 0 4px 20px rgba(45, 74, 45, 0.08);
    transform: translateY(-2px);
  }
  .cart-item:hover::before { opacity: 1; }

  .cart-item-img {
    width: 100px;
    height: 100px;
    border-radius: 12px;
    object-fit: cover;
    background: #F5F7F4;
    flex-shrink: 0;
  }

  .cart-item-info {
    flex: 1;
    min-width: 0;
  }
  .cart-item-category {
    font-size: 11px;
    text-transform: uppercase;
    letter-spacing: 0.6px;
    color: #6AAB55;
    font-weight: 600;
    margin-bottom: 4px;
  }
  .cart-item-title {
    font-size: 16px;
    font-weight: 600;
    color: #2D4A2D;
    margin: 0 0 6px 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .cart-item-meta {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 12px;
    color: #7A8F76;
  }
  .cart-item-meta i { font-size: 14px; }

  .cart-item-qty {
    display: flex;
    align-items: center;
    gap: 4px;
    background: #F0F5EE;
    border-radius: 10px;
    padding: 4px;
    flex-shrink: 0;
  }
  .qty-label {
    font-size: 13px;
    font-weight: 600;
    color: #2D4A2D;
    min-width: 28px;
    text-align: center;
    padding: 0 6px;
  }

  .cart-item-price {
    text-align: right;
    flex-shrink: 0;
    min-width: 80px;
  }
  .cart-item-price .unit-price {
    font-size: 12px;
    color: #9DB89A;
    margin-bottom: 2px;
  }
  .cart-item-price .total-price {
    font-size: 18px;
    font-weight: 700;
    color: #2D4A2D;
  }

  .cart-item-remove {
    background: none;
    border: none;
    color: #C4C9C2;
    cursor: pointer;
    padding: 6px;
    border-radius: 8px;
    transition: all 0.15s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }
  .cart-item-remove:hover {
    background: #FEF0ED;
    color: #E05C3A;
  }
  .cart-item-remove i { font-size: 18px; }

  .cart-item-link {
    font-size: 12px;
    color: #6AAB55;
    text-decoration: none;
    font-weight: 500;
    display: inline-flex;
    align-items: center;
    gap: 3px;
    margin-top: 4px;
    transition: color 0.15s;
  }
  .cart-item-link:hover { color: #3A5C3A; text-decoration: underline; }
  .cart-item-link i { font-size: 13px; }

  /* ── Order Summary ── */
  .order-summary {
    background: #fff;
    border: 1px solid #E8EDE6;
    border-radius: 20px;
    padding: 1.75rem;
    position: sticky;
    top: 2rem;
  }
  .order-summary h2 {
    font-family: 'Fraunces', serif;
    font-size: 20px;
    font-weight: 600;
    color: #2D4A2D;
    margin: 0 0 1.25rem 0;
    display: flex;
    align-items: center;
    gap: 8px;
  }
  .order-summary h2 i {
    font-size: 20px;
    color: #6AAB55;
  }

  .summary-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 0;
    font-size: 14px;
    color: #5A6F56;
  }
  .summary-row .label { display: flex; align-items: center; gap: 6px; }
  .summary-row .label i { font-size: 16px; color: #9DB89A; }
  .summary-row .value { font-weight: 600; color: #2D4A2D; }

  .summary-divider {
    border: none;
    border-top: 1.5px dashed #E0E8DD;
    margin: 6px 0;
  }

  .summary-savings {
    display: flex;
    align-items: center;
    gap: 8px;
    background: #E8F5E4;
    border-radius: 10px;
    padding: 10px 14px;
    margin: 12px 0;
    font-size: 13px;
    font-weight: 600;
    color: #3A5C3A;
  }
  .summary-savings i { font-size: 18px; color: #6AAB55; }

  .summary-total {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 14px 0 4px;
    font-size: 18px;
    font-weight: 700;
    color: #2D4A2D;
  }
  .summary-total .grand-total {
    font-size: 24px;
    color: #6AAB55;
  }

  .checkout-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    width: 100%;
    margin-top: 1.25rem;
    padding: 14px;
    background: linear-gradient(135deg, #6AAB55 0%, #4E8A3C 100%);
    color: #fff;
    border: none;
    border-radius: 12px;
    font-family: 'DM Sans', sans-serif;
    font-size: 15px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.25s ease;
    box-shadow: 0 4px 14px rgba(106, 171, 85, 0.35);
  }
  .checkout-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(106, 171, 85, 0.45);
  }
  .checkout-btn:active { transform: translateY(0); }
  .checkout-btn i { font-size: 18px; }

  .continue-link {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    margin-top: 1rem;
    font-size: 13px;
    color: #6AAB55;
    text-decoration: none;
    font-weight: 500;
    transition: color 0.15s;
  }
  .continue-link:hover { color: #3A5C3A; }
  .continue-link i { font-size: 16px; }

  /* ── Empty Cart ── */
  .empty-cart {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 60vh;
    text-align: center;
    padding: 3rem 1rem;
  }
  .empty-cart-icon {
    width: 120px;
    height: 120px;
    border-radius: 50%;
    background: linear-gradient(135deg, #E8F5E4 0%, #D4ECCC 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 1.5rem;
    animation: emptyBounce 2s ease-in-out infinite;
  }
  .empty-cart-icon i {
    font-size: 48px;
    color: #6AAB55;
  }
  @keyframes emptyBounce {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-10px); }
  }
  .empty-cart h2 {
    font-family: 'Fraunces', serif;
    font-size: 26px;
    font-weight: 600;
    color: #2D4A2D;
    margin: 0 0 8px 0;
  }
  .empty-cart p {
    color: #7A8F76;
    font-size: 15px;
    margin: 0 0 1.5rem 0;
    max-width: 340px;
  }
  .empty-cart-btn {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 12px 28px;
    background: linear-gradient(135deg, #6AAB55 0%, #4E8A3C 100%);
    color: #fff;
    text-decoration: none;
    border-radius: 12px;
    font-size: 15px;
    font-weight: 600;
    transition: all 0.25s ease;
    box-shadow: 0 4px 14px rgba(106, 171, 85, 0.35);
  }
  .empty-cart-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(106, 171, 85, 0.45);
  }
  .empty-cart-btn i { font-size: 18px; }

  /* ── Animations ── */
  .cart-item {
    animation: slideIn 0.35s ease forwards;
    opacity: 0;
  }
  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateX(-16px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  /* Stagger the animation for each item */
  .cart-item:nth-child(1) { animation-delay: 0.05s; }
  .cart-item:nth-child(2) { animation-delay: 0.1s; }
  .cart-item:nth-child(3) { animation-delay: 0.15s; }
  .cart-item:nth-child(4) { animation-delay: 0.2s; }
  .cart-item:nth-child(5) { animation-delay: 0.25s; }
  .cart-item:nth-child(6) { animation-delay: 0.3s; }
  .cart-item:nth-child(7) { animation-delay: 0.35s; }
  .cart-item:nth-child(8) { animation-delay: 0.4s; }

  /* ── Responsive ── */
  @media (max-width: 860px) {
    .cart-layout {
      grid-template-columns: 1fr;
    }
    .order-summary {
      position: static;
    }
  }
  @media (max-width: 600px) {
    .cart-page {
      padding: 1rem 0.5rem;
    }
    .cart-item {
      flex-wrap: wrap;
      gap: 0.75rem;
      padding: 0.75rem;
    }
    .cart-item-img {
      width: 64px;
      height: 64px;
      border-radius: 10px;
    }
    .cart-item-info {
      min-width: 0;
      flex: 1;
    }
    .cart-item-title {
      font-size: 14px;
    }
    .cart-item-price {
      text-align: left;
      min-width: auto;
    }
    .cart-item-price .total-price {
      font-size: 16px;
    }
    .cart-header-left h1 {
      font-size: 20px;
    }
    .cart-header-left i {
      font-size: 22px;
    }
    .cart-clear-btn {
      padding: 6px 12px;
      font-size: 12px;
    }
    .order-summary {
      padding: 1.25rem;
      border-radius: 16px;
    }
    .summary-total .grand-total {
      font-size: 20px;
    }
    .checkout-btn {
      padding: 12px;
      font-size: 14px;
    }
  }
`;

function CardPage({ params, data, card }) {
  const [cleared, setCleared] = useState(false);
  const [removedIds, setRemovedIds] = useState([]);

  const Narr = useMemo(() => {
    if (cleared) return [];
    const keys = Object.keys(params);
    return data
      .filter(item => keys.includes(item.id.toString()))
      .filter(item => !removedIds.includes(item.id))
      .map(item => ({
        ...item,
        qty: params[item.id] || 1,
      }));
  }, [params, data, cleared, removedIds]);

  const subtotal = useMemo(() => {
    return Narr.reduce((sum, item) => sum + item.price * item.qty, 0);
  }, [Narr]);

  const totalItems = useMemo(() => {
    return Narr.reduce((sum, item) => sum + item.qty, 0);
  }, [Narr]);

  const discount = subtotal * 0.05;
  const deliveryFee = subtotal > 50 ? 0 : 4.99;
  const grandTotal = subtotal - discount + deliveryFee;

  function handleCartClear() {
    setCleared(true);
    card({});
  }

  function handleRemoveItem(id) {
    setRemovedIds(prev => [...prev, id]);
    const newParams = { ...params };
    delete newParams[id];
    card(newParams);
  }

  // ── Empty Cart ──
  if (Narr.length === 0) {
    return (
      <>
        <style>{cartStyles}</style>
        <div className="cart-page">
          <div className="empty-cart">
            <div className="empty-cart-icon">
              <i className="ti ti-shopping-cart" aria-hidden="true" />
            </div>
            <h2>Your cart is empty</h2>
            <p>
              Looks like you haven't added anything yet. Explore our fresh
              products and find something you love!
            </p>
            <Link to="/" className="empty-cart-btn">
              <i className="ti ti-arrow-left" aria-hidden="true" />
              Start Shopping
            </Link>
          </div>
        </div>
      </>
    );
  }

  // ── Cart with Items ──
  return (
    <>
      <style>{cartStyles}</style>
      <div className="cart-page">
        {/* Header */}
        <div className="cart-header">
          <div className="cart-header-left">
            <i className="ti ti-shopping-cart" aria-hidden="true" />
            <h1>Your Cart</h1>
            <span className="item-count">
              {totalItems} {totalItems === 1 ? "item" : "items"}
            </span>
          </div>
          <button onClick={handleCartClear} className="cart-clear-btn">
            <i className="ti ti-trash" aria-hidden="true" />
            Clear All
          </button>
        </div>

        {/* Layout */}
        <div className="cart-layout">
          {/* Items List */}
          <div className="cart-items-list">
            {Narr.map((item) => (
              <div className="cart-item" key={item.id}>
                <img
                  className="cart-item-img"
                  src={item.thumbnail}
                  alt={item.title}
                />
                <div className="cart-item-info">
                  <div className="cart-item-category">{item.category}</div>
                  <h3 className="cart-item-title">{item.title}</h3>
                  <div className="cart-item-meta">
                    <i className="ti ti-star-filled" aria-hidden="true" />
                    {item.rating} rating
                  </div>
                  <Link
                    to={`/productData/${item.id}`}
                    className="cart-item-link"
                  >
                    View details
                    <i className="ti ti-chevron-right" aria-hidden="true" />
                  </Link>
                </div>

                <div className="cart-item-qty">
                  <span className="qty-label">×{item.qty}</span>
                </div>

                <div className="cart-item-price">
                  <div className="unit-price">
                    ${Number(item.price).toFixed(2)} each
                  </div>
                  <div className="total-price">
                    ${(item.price * item.qty).toFixed(2)}
                  </div>
                </div>

                <button
                  className="cart-item-remove"
                  onClick={() => handleRemoveItem(item.id)}
                  aria-label={`Remove ${item.title}`}
                >
                  <i className="ti ti-x" aria-hidden="true" />
                </button>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="order-summary">
            <h2>
              <i className="ti ti-receipt" aria-hidden="true" />
              Order Summary
            </h2>

            <div className="summary-row">
              <span className="label">
                <i className="ti ti-package" aria-hidden="true" />
                Subtotal ({totalItems} items)
              </span>
              <span className="value">${subtotal.toFixed(2)}</span>
            </div>

            <div className="summary-row">
              <span className="label">
                <i className="ti ti-truck-delivery" aria-hidden="true" />
                Delivery
              </span>
              <span
                className="value"
                style={{ color: deliveryFee === 0 ? "#6AAB55" : undefined }}
              >
                {deliveryFee === 0 ? "Free" : `$${deliveryFee.toFixed(2)}`}
              </span>
            </div>

            <div className="summary-row">
              <span className="label">
                <i className="ti ti-discount-2" aria-hidden="true" />
                Member Discount (5%)
              </span>
              <span className="value" style={{ color: "#6AAB55" }}>
                −${discount.toFixed(2)}
              </span>
            </div>

            <hr className="summary-divider" />

            {deliveryFee === 0 && (
              <div className="summary-savings">
                <i className="ti ti-confetti" aria-hidden="true" />
                You're saving ${(discount + 4.99).toFixed(2)} on this order!
              </div>
            )}

            <div className="summary-total">
              <span>Total</span>
              <span className="grand-total">${grandTotal.toFixed(2)}</span>
            </div>

            <button className="checkout-btn">
              <i className="ti ti-lock" aria-hidden="true" />
              Proceed to Checkout
            </button>

            <Link to="/" className="continue-link">
              <i className="ti ti-arrow-left" aria-hidden="true" />
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default CardPage;