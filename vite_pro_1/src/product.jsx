import React, { useState } from "react";
import { Link } from 'react-router-dom';

const starImg = "https://cms-assets.tutsplus.com/uploads/users/34/posts/30118/preview_image/star-rating.jpg";

function Product({ title, price, src, sku, rat, category, handleCard }) {
  const [added, setAdded] = useState(false);

  // Ensure the rating is between 0 and 5
  const normalizedRating = Math.max(0, Math.min(5, Math.round(rat)));

  // Render stars dynamically based on the rating
  let pStars = [];
  for (let d = 0; d < normalizedRating; d++) {
    pStars.push(<img key={d} className="h-4" src={starImg} alt="star" />);
  }

  const handleAddToCart = () => {
    if (handleCard) {
      handleCard(sku, 1);
      setAdded(true);
      setTimeout(() => setAdded(false), 1500);
    }
  };

  return (
    <div className="border border-gray-200 w-2xs flex flex-col bg-white rounded-xl overflow-hidden hover:border-blue-400 transition-all duration-300 hover:shadow-lg p-4 m-0 group">
      
      {/* Image Container */}
      <div className="w-full h-fit mb-2 relative overflow-hidden rounded-lg">
        <img 
          src={src} 
          alt={title} 
          className="w-full h-full object-cover rounded-lg transition-transform duration-500 group-hover:scale-105" 
        />
      </div>

      {/* Content */}
      <p className="text-xs text-gray-500">{category}</p>
      <h5 className="text-sm font-medium text-gray-800 truncate">{title}</h5>
      
      {/* Ratings */}
      <div className="flex mt-1">
        {pStars}
      </div>
      
      {/* Price + Add to Cart row */}
      <div className="flex items-center justify-between mt-2 gap-2">
        <p className="text-sm font-semibold text-gray-900">
          ${Number(price).toFixed(2)}
        </p>
        <button
          onClick={handleAddToCart}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-300 cursor-pointer ${
            added
              ? "bg-green-500 text-white shadow-md shadow-green-200"
              : "bg-gradient-to-r from-emerald-500 to-teal-500 text-white hover:from-emerald-600 hover:to-teal-600 hover:shadow-md hover:shadow-emerald-200 hover:-translate-y-0.5 active:translate-y-0"
          }`}
          style={
            !added
              ? { background: "linear-gradient(135deg, #10B981, #06B6D4)" }
              : { background: "#22c55e" }
          }
        >
          {added ? (
            <>
              <span>✓</span> Added
            </>
          ) : (
            <>
              <span style={{ fontSize: 14, lineHeight: 1 }}>🛒</span> Add to Cart
            </>
          )}
        </button>
      </div>

      {/* Action Link */}
      <Link 
        to={`/productData/${sku}`} 
        className="text-xs text-blue-500 hover:underline mt-2 inline-block"
      >
        view details
      </Link>
      
    </div>
  );
}

export default Product;