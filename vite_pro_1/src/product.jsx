import React from "react";
import { Link } from 'react-router-dom';

const starImg = "https://cms-assets.tutsplus.com/uploads/users/34/posts/30118/preview_image/star-rating.jpg";

function Product({ title, price, src, sku, rat, category }) {
  // Ensure the rating is between 0 and 5
  const normalizedRating = Math.max(0, Math.min(5, Math.round(rat)));

  // Render stars dynamically based on the rating
  let pStars = [];
  for (let d = 0; d < normalizedRating; d++) {
    pStars.push(<img key={d} className="h-4" src={starImg} alt="star" />);
  }

  return (
    <div className=" border border-gray-200 w-2xs flex flex-col bg-white rounded-xl overflow-hidden hover:border-blue-400 transition-colors p-4 m-0">
      
      {/* Image Container */}
      <div className="w-full h-fit mb-2">
        <img 
          src={src} 
          alt={title} 
          className="w-full h-full object-cover rounded-lg" 
        />
      </div>

      {/* Content */}
      <p className="text-xs text-gray-500">{category}</p>
      <h5 className="text-sm font-medium text-gray-800 truncate">{title}</h5>
      
      {/* Ratings */}
      <div className="flex mt-1">
        {pStars}
      </div>
      
      {/* Price */}
      <p className="inline-block mt-1 text-sm font-semibold">
        ${Number(price).toFixed(2)}
      </p>

      {/* Action Link */}
      <Link 
        to={`/productData/${sku}`} 
        className="text-xs text-blue-500 hover:underline mt-1"
      >
        view details
      </Link>
      
    </div>
  );
}

export default Product;