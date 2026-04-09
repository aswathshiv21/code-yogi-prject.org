import React from "react";          
import Product from "./product";    
import { useState } from "react";
import prod from "./dumyData";
    
function ProductList() {
    return (
    <>
     <div className='flex items-center justify-center'>
      <div className='w-6xl flex flex-wrap items-center justify-center'>
         {prod.map((i)=> {
            return <Product
              src={i.src}
              title={i.title}
              price={i.price}
              sku={i.sku}
            />   
        })}
      </div>
     </div>
    </>
)
}

export default ProductList;
 