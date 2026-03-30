import React from "react";

function Product({title, price,src}) {
    return (
        <>
          <div className="border-1 flex flex-col border-gray-200 w-2xs h-96 p-4 m-4">
            <img className="min-h-50 max-h-px 50" src={src}/>
            <p className="text-xs text-gray-700 inline-block ">Mugs</p>
            <h5 >{title}</h5>
            <p className="inline-block ">${price}</p>
          </div>
        </>
    )
}

export default Product;