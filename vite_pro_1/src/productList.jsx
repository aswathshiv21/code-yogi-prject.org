import React from "react";          
import Product from "./product";    
import { memo } from "react";

    
function ProductList({item, handleCard}) {

    return (
    <> 
     <div className='w-full'>
      <div className='grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4'>
         {item.map((i)=> {
            return <Product
              key={i.id}
              src={i.thumbnail}
              title={i.title}
              price={i.price}
              sku={i.id}
              rat={i.rating}
              category={i.category}
              handleCard={handleCard}
            />   
        })}
      </div>
     </div>
    </>
)
}

export default memo(ProductList);