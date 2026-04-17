import React from 'react'
import prod from './dumyData';
import Product from './product';
import { useParams, Link } from 'react-router-dom'
import { Routes, Route } from 'react-router-dom';


function Productdata(){
  const {sku} = useParams();

  let product;
  let satars = [];

  for (let i = 0; i < prod.length; i++) {
    const p = prod[i];
    if (sku == p.sku) {
      product = p;

      for (let v = 0; v < 2; v++) {
        for (let t = 0; t < p.rating; t++) {
          if (product.rating > 5) {
            console.log(Error(`the rating was grater than 5 (mean the rating is ${product.rating}) in (dumyData.js index ${i})`));
            satars.push('rating not fund ')
          
            let c = product.rating - 5;
            product.rating = product.rating - c;
            return;
         }
        satars.push(<img className="h-5 " src="https://cms-assets.tutsplus.com/uploads/users/34/posts/30118/preview_image/star-rating.jpg" alt="" />)
      }
        break;
      }

      break;
    }
    
  }


    return (
        <>
          <div className='w-full flex flex-wrap justify-center h-screen justify-evenly' >
            <Link to={'/'}>home page</Link>
            <div className='p-5 w-full flex h-100 border m-5'>
              <img src={product.src} alt="" className='h-full'/>
              <div className='ml-12 flex flex-col '>
                <h2 className='text-5xl text-yellow-500 p-4'>{product.title}</h2>
                <div className="flex m-5">
                  {satars}
                </div>
                <p className='p-4 ml-4'>${product.price}</p>
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