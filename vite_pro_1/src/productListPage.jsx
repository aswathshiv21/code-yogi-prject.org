import React from "react";
import ProductList from "./productList";
import { useState, useEffect } from "react";
import NonMatching from "./nonMatchingr";
import NavBar from "./navBar";
import axios from "axios";

function ProductListPage({prod}) {
  const [quiry, setquiry] = useState('');
  const [sort, setSort] = useState(`default`)

  let data = prod.filter(function (item) {
    const lowercasetitle = item.title.toLocaleLowerCase();
    const lowercasequiry = quiry.toLocaleLowerCase()

    return lowercasetitle.indexOf(lowercasequiry) != -1
  })

  function handleinputchange(event) {
    let newQuire = event.target.value;
    setquiry(newQuire)
  }

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

  console.log(data);
  

    return (
        <div className="flex flex-col">
          <NavBar />
          <div className='flex w-full justify-evenly border-none items-center justify-center '>
            <input 
             id='input'
             type="text" 
             value={quiry} 
             placeholder='search here' 
             onChange={handleinputchange} 
             className='self-center flex items-center justify-center w-2xl m-6 p-4 rounded-full bg-gray-200 border-solid border-gray-800'
          />

          <select id='select' onChange={handlesortchange} value={sort} className='h-10 '>
            <option value="default">Default sort</option>
            <option value="name">Sort by name</option>
            <option value="price">Sort by price</option>
          </select>
         </div>
         {data.length > 0 && <ProductList item={data}/>}
         {data.length == 0 && <NonMatching title='not match found'/>}
        </div>
    )
}

export default ProductListPage;