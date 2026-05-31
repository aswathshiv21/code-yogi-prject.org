import React from "react";          
import Product from "./product";    
import { useState } from "react";
import prod from "./dumyData";
    
function ProductList({item}) {
    return (
    <> 
     <div className='flex items-center justify-center bg-white'>
      <div className='md:grid md:grid-cols-4 gap-2'>
         {item.map((i)=> {
            return <Product
              src={i.thumbnail}
              title={i.title}
              price={i.price}
              sku={i.id}
              rat={i.rating}
            />   
        })}
      </div>
     </div>
    </>
)
}

export default ProductList;
 