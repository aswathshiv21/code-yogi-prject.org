import React, { useState, useMemo, memo } from 'react';
import { useParams, Link } from 'react-router-dom';

const starImg = "https://cms-assets.tutsplus.com/uploads/users/34/posts/30118/preview_image/star-rating.jpg";

const weights = ["500g", "1 kg", "2 kg", "5 kg"];

const tabData = [
  {
    id: "desc",
    label: "Description",
    content: (product) => (
      <p className="text-sm text-gray-600 leading-relaxed">{product?.description}</p>
    ),
  },
  {
    id: "nutrition",
    label: "Nutrition info",
    content: () => (
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {[
          ["Calories", "60 kcal"], ["Carbs", "15g"], 
          ["Sugars", "14g"], ["Fibre", "1.6g"], 
          ["Vitamin C", "36mg"], ["Vitamin A", "54µg"]
        ].map(([k, v]) => (
          <div key={k} className="flex justify-between bg-gray-50 rounded-lg px-4 py-2 text-sm">
            <span className="text-gray-500">{k}</span>
            <span className="text-gray-800 font-medium">{v}</span>
          </div>
        ))}
      </div>
    ),
  },
  {
    id: "storage",
    label: "Storage",
    content: () => (
      <p className="text-sm text-gray-600 leading-relaxed">
        Store at room temperature until ripe (2–5 days). Once ripe, refrigerate and consume
        within 3–4 days. Keep away from direct sunlight.
      </p>
    ),
  },
];

function Productdata({ prod, handleCard }) {
  

  const { xyz } = useParams();

  const [qty, setQty] = useState(1);
  const [weight, setWeight] = useState("1 kg");
  const [wished, setWished] = useState(false);
  const [added, setAdded] = useState(false);
  const [activeTab, setActiveTab] = useState("desc");
  const [activeThumb, setActiveThumb] = useState(0);

  // Find the product cleanly
  const product = prod?.find(p => p.id == xyz);

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-5">
        <h2 className="text-2xl font-bold text-gray-700">Product not found</h2>
        <Link to="/" className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
          Go back home
        </Link>
      </div>
    );
  }

  // Generate stars array cleanly
  const renderStars = (rating) => {
    const normalizedRating = Math.max(0, Math.min(5, Math.round(rating || 0)));
    return Array.from({ length: normalizedRating }, (_, index) => (
      <img key={index} className="h-4 md:h-5 w-auto inline-block" src={starImg} alt="star" />
    ));
  };

  const handleAddToCart = () => {
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);

    handleCard(xyz, qty)
    
  };

  const currentTab = tabData.find(t => t.id === activeTab);

  return (
    <div className="w-full bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-10">
        
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs md:text-sm text-gray-500 mb-6 md:mb-10 flex-wrap">
          <Link to="/" className="hover:text-gray-900 transition-colors">Home</Link>
          <span>/</span>
          <Link to="/shop" className="hover:text-gray-900 transition-colors">{product?.category}</Link>
          <span>/</span>
          <span className="text-gray-900 font-medium">{product?.title}</span>
        </nav>

        {/* Main product section */}
        <div className="flex flex-col md:flex-row gap-8 lg:gap-16">

          {/* Left — image + thumbnails */}
          <div className="flex flex-col gap-4 w-full md:w-1/2 lg:w-5/12">
            <div className="relative bg-gray-50 rounded-2xl overflow-hidden flex items-center justify-center aspect-square shadow-sm border border-gray-100 group">
              {/* Uses active thumb if available, else thumbnail */}
              <img
                src={product?.images?.[activeThumb] || product?.thumbnail}
                alt={product?.title}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              
              {product?.discountPercentage && (
                <span className="absolute top-4 left-4 bg-orange-500 text-white text-xs md:text-sm font-bold rounded-lg px-3 py-1 shadow-md">
                  {Math.round(product.discountPercentage)}% off
                </span>
              )}
              
              <button
                onClick={() => setWished(w => !w)}
                className={`absolute bottom-4 right-4 w-10 h-10 md:w-12 md:h-12 bg-white/90 backdrop-blur-sm border rounded-full flex items-center justify-center text-xl transition-all shadow-sm hover:shadow-md hover:scale-105 ${
                  wished ? "text-red-500 border-red-200" : "text-gray-400 border-gray-200 hover:text-red-500"
                }`}
                aria-label={wished ? "Remove from wishlist" : "Add to wishlist"}
              >
                ♥
              </button>
            </div>

            {/* Thumbnail strip */}
            {product?.images && product.images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar">
                {product.images.slice(0, 4).map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveThumb(i)}
                    className={`shrink-0 w-16 h-16 md:w-20 md:h-20 rounded-xl border-2 overflow-hidden transition-all ${
                      activeThumb === i ? "border-blue-500 shadow-md ring-2 ring-blue-100" : "border-transparent opacity-60 hover:opacity-100"
                    }`}
                  >
                    <img src={img} alt={`Thumbnail ${i}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right — product info */}
          <div className="flex flex-col w-full md:w-1/2 lg:w-7/12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primery mb-3 md:mb-4 leading-tight">
              {product?.title}
            </h2>

            <p className="text-gray-600 text-sm md:text-base leading-relaxed">
              {product?.description}
            </p>

            {/* Rating */}
            <div className="flex items-center mt-4 md:mt-6 gap-2 flex-wrap">
              <p className="text-sm text-gray-700 font-medium">Rating</p>
              <p className="text-sm text-gray-700 bg-gray-100 px-2 rounded font-semibold">{product?.rating}</p>
              <div className="flex gap-1 items-center">{renderStars(product?.rating)}</div>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3 mt-4 md:mt-6 flex-wrap">
              <p className="text-3xl md:text-4xl font-extrabold text-gray-900">${product?.price}</p>
              {product?.discountPercentage && (
                <span className="text-sm bg-green-100 text-green-800 font-semibold rounded-md px-2 py-1">
                  Save {Math.round(product.discountPercentage)}%
                </span>
              )}
            </div>

            {/* Weight Selection (Now Implemented) */}
            <div className="flex flex-col gap-2 mt-6">
              <p className="text-sm text-gray-800 font-semibold">Select Weight</p>
              <div className="flex items-center gap-2 flex-wrap">
                {weights.map(w => (
                  <button
                    key={w}
                    onClick={() => setWeight(w)}
                    className={`px-4 py-2 text-sm rounded-lg border-2 font-medium transition-all ${
                      weight === w ? "border-blue-500 bg-blue-50 text-blue-700" : "border-gray-200 text-gray-600 hover:border-gray-300 hover:bg-gray-50"
                    }`}
                  >
                    {w}
                  </button>
                ))}
              </div>
            </div>

            {/* Delivery */}
            <div className="border border-gray-200 rounded-xl p-4 mt-6 flex flex-col gap-3 bg-gray-50 shadow-sm">
              <p className="text-sm text-gray-700 flex items-center gap-2"><span>🚚</span> <strong>Free delivery</strong> by 8:00 PM today</p>
              <p className="text-sm text-gray-700 flex items-center gap-2"><span>⚡</span> Express delivery in <strong>30 mins</strong></p>
              <p className="text-sm text-gray-700 flex items-center gap-2"><span>📍</span> Delivering to <strong>Jabalpur, MP 482001</strong></p>
            </div>

            {/* Quantity */}
            <div className="flex flex-col gap-2 mt-6">
              <p className="text-sm text-gray-800 font-semibold">Quantity</p>
              <div className="flex items-center gap-4">
                <div className="flex items-center border border-gray-300 rounded-lg bg-white p-1 shadow-sm">
                  <button
                    onClick={() => setQty(q => Math.max(1, q - 1))}
                    className="w-8 h-8 flex items-center justify-center rounded-md text-gray-600 hover:bg-gray-100 transition-colors"
                  >
                    −
                  </button>
                  <span className="text-base font-semibold text-gray-800 w-10 text-center">{qty}</span>
                  <button
                    onClick={() => setQty(q => Math.min(product?.stock ?? 12, q + 1))}
                    className="w-8 h-8 flex items-center justify-center rounded-md text-gray-600 hover:bg-gray-100 transition-colors"
                  >
                    +
                  </button>
                </div>
                <span className="text-sm text-gray-500">
                  {product?.stock ?? 12} units left
                </span>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mt-8">
              <button
                onClick={handleAddToCart}
                className={`flex-1 py-3 px-6 text-white text-base font-bold rounded-xl shadow-md transition-all flex justify-center items-center gap-2 ${
                  added ? "bg-green-600 hover:bg-green-700" : "bg-blue-600 hover:bg-blue-700 hover:-translate-y-0.5 active:translate-y-0"
                }`}
              >
                {added ? "✓ Added to Cart" : "Add to Cart"}
              </button>
              <button className="flex-1 py-3 px-6 rounded-xl bg-text text-white font-bold hover:bg-hov focus:ring-4 focus:ring-gray-200 active:bg-text border border-transparent shadow-md transition-all hover:-translate-y-0.5 active:translate-y-0">
                Buy Now
              </button>
            </div>

            <hr className="border-gray-200 mt-8 mb-4" />

            {/* Tabs */}
            <div className="flex overflow-x-auto no-scrollbar border-b border-gray-200 gap-6">
              {tabData.map(t => (
                <button
                  key={t.id}
                  onClick={() => setActiveTab(t.id)}
                  className={`py-3 text-sm whitespace-nowrap border-b-2 font-medium transition-all ${
                    activeTab === t.id ? "border-blue-600 text-blue-700" : "border-transparent text-gray-500 hover:text-gray-800"
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
            <div className="py-5 min-h-[120px]">{currentTab?.content(product)}</div>

          </div>
        </div>

        {/* Reviews */}
        <div className="mt-16 md:mt-24">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Customer Reviews</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { name: "Priya S.", date: "12 May 2026", rat: 5, text: "Absolutely the best product I've had. Arrived perfectly and exactly as described. Will order again!" },
              { name: "Rahul M.", date: "8 May 2026", rat: 4, text: "Great quality, delivered fresh and packed well. Slight variation but overall taste was superb." },
              { name: "Anjali K.", date: "3 May 2026", rat: 5, text: "Ordered for my parents and they loved it. Genuine quality — no compromise. Delivery was on time too." },
              { name: "Dev T.", date: "29 Apr 2026", rat: 4, text: "Very fresh as described. One item had a minor issue but customer care resolved it quickly." },
            ].map(r => (
              <div key={r.name} className="bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow rounded-2xl p-5">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-base font-semibold text-gray-900">{r.name}</span>
                  <span className="text-sm text-gray-500">{r.date}</span>
                </div>
                <div className="flex gap-1 mb-3">{renderStars(r.rat)}</div>
                <p className="text-sm text-gray-600 leading-relaxed">{r.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Related products */}
        <div className="mt-16 md:mt-24">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">You Might Also Like</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {prod?.filter(p => p.id != xyz).slice(0, 4).map(p => (
              <div key={p.id} className="flex flex-col bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 p-4">
                <div className="w-full aspect-square mb-4 bg-gray-50 rounded-xl overflow-hidden">
                  <img src={p.thumbnail} alt={p.title} className="w-full h-full object-cover" />
                </div>
                <div className="flex flex-col flex-grow">
                  <p className="text-xs font-semibold uppercase tracking-wider text-blue-600 mb-1">{p.category}</p>
                  <h5 className="text-base font-bold text-gray-900 mb-2 line-clamp-2">{p.title}</h5>
                  <div className="flex gap-1 mb-3">{renderStars(p.rating)}</div>
                  <div className="mt-auto flex items-center justify-between">
                    <p className="text-lg font-extrabold text-gray-900">${p.price}</p>
                    <Link to={`/productData/${p.id}`} className="text-sm font-semibold text-blue-600 hover:text-blue-800 transition-colors">
                      View details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

export default memo(Productdata);