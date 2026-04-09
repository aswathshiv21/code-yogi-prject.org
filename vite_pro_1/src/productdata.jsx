import React from 'react'
import prod from './dumyData';
import Product from './product';
import { useParams, Link } from 'react-router-dom'
import { Routes, Route } from 'react-router-dom';


function Productdata(){
  const {sku} = useParams();

  let product;

  for (let i = 0; i < prod.length; i++) {
    const p = prod[i];
    if (sku == p.sku) {
      product = p;
      break;
    }
    
  }

    return (
        <>
          <div className='w-full flex flex-wrap justify-center h-screen justify-evenly' >
            <Link to={'/'}>home page</Link>
            <div className='p-5 w-full flex h-100 '>
              <img src={product.src} alt="" className='h-full'/>
              <div className='ml-10 flex flex-col '>
                <h2 className='text-5xl text-yellow-500 p-4'>{product.title}</h2>
                <p className='p-4'>${product.price}</p>
                <div className='p-4 flex h-full justify-evenly items-end w-full'> 
                  <button className='p-2 bg-blue-500 text-white rounded-lg h-10 flex justify-center'>Add to cart</button>
                  <button className='h-10 p-2 border-1 border-black-500 border-solid rounded-lg'>Buy now</button>
                </div>
              </div>
            </div>
          </div>        
        </>
    )
}

export default Productdata;