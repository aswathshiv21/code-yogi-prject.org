import React from "react";
import { Link } from 'react-router-dom'

function Product({title, price, src, sku, rat}) {
  let satars = [];

  for (let v = 0; v < 2; v++) {
        for (let t = 0; t < rat; t++) {
          if (rat > 5) {
            console.log(Error(`the rating was grater than 5 (mean the rating is ${rat}) in (dumyData.js)`));
            satars.push('rating not fund ')
          
            let c = rat - 5;
            rat = rat - c;
            return;
         }
        satars.push(<img className="h-5 " src="https://cms-assets.tutsplus.com/uploads/users/34/posts/30118/preview_image/star-rating.jpg" alt="" />)
      }
      break
      }

    return (
        <>
          <div className="border-1 flex flex-col border-gray-200 w-2xs h-96 p-4 m-4">
            <img className="min-h-50 max-h-px 50" src={src}/>
            <p className="text-xs text-gray-700 inline-block ">Mugs</p>
            <h5 >{title}</h5>
            <div className="flex">
              {satars}
            </div>
            <p className="inline-block ">${price}</p>
            <Link to={'/productData/' + sku}>view details</Link>
          </div>
        </>
    )
}

export default Product;