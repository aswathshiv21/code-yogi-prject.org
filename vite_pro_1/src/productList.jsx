import React from "react";          
import Product from "./product";    
    
function ProductList({products}) {
    return (
    <>
     <div className='flex items-center justify-center'>
      <div className='w-6xl flex flex-wrap items-center justify-center'>
         {products.map((i)=> {
            return <Product
              src={i.src}
              title={i.title}
              price={i.price}
            />   
        })}
      </div>
     </div>
    </>
)
}

export default ProductList;
 