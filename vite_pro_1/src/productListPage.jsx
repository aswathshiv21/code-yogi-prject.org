import React from "react";
import ProductList from "./productList";
import { useState } from "react";
import NonMatching from "./nonMatchingr";
import { memo } from "react";

function ProductListPage({prod, handleCard, searchQuery = ''}) {

  const [sort, setSort] = useState(`default`);

  let data = prod.filter(function (item) {
    const lowercasetitle = item.title.toLocaleLowerCase();
    const lowercasequiry = searchQuery.toLocaleLowerCase();

    return lowercasetitle.indexOf(lowercasequiry) != -1;
  })

  if (sort == 'price') {
    data.sort((x,y)=>{
      return x.price - y.price
    })
  }else if (sort == 'name') {
    data.sort((x,y)=>{
      return x.title < y.title ? -1 : 1;
    })
  }

  function handlesortchange(event) {
    let e = event.target.value
    setSort(e)
  }

    return (
        <div className="flex flex-col bg-white w-full p-3 sm:p-5 md:p-7 rounded-xl">
          <div className='flex w-full justify-between sm:justify-end border-none items-center px-1 sm:px-4 mb-3 sm:mb-4'>
            <span className="text-xs sm:text-sm text-gray-500 sm:mr-3">{data.length} products</span>
            <select id='select' onChange={handlesortchange} value={sort} className='h-8 sm:h-10 text-xs sm:text-sm px-2 sm:px-3 rounded-lg border border-gray-300 bg-white'>
              <option value="default">Default sort</option>
              <option value="name">Sort by name</option>
              <option value="price">Sort by price</option>
            </select>
         </div>
         {data.length > 0 && <ProductList item={data} handleCard={handleCard}/>}
         {data.length == 0 && <NonMatching title='not match found'/>}
        </div>
    )
}

export default memo(ProductListPage);