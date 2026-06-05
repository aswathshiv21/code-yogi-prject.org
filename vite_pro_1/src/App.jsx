import React from 'react';
import {Routes, Route} from 'react-router-dom'
import Productdata from './productdata';
import ProductListPage from './productListPage';
import {AddDataPage} from './addDataPage';
import axios from 'axios';
import { useState, useEffect, useCallback } from 'react';
import About from './login';
import NavBar from './navBar';
import Footer from './footer';
import CardPage from './cart';
import { memo } from 'react';


function App() {
  const [prods, setProd] = useState([])  
  const [card, setCard] = useState({})
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    if (prods.length > 0) return;
    axios.get('https://dummyjson.com/products').then((response) => {
      setProd(response.data.products)
    })
  }, [])

  
 const cart = useCallback((productId, count) => {
    const oldCount = Number(card[productId]) || 0;
    const newcount = oldCount + (+count);
    
    const newCard = {...card, [productId]: newcount}
    setCard(newCard)
  },[card]) 

  // console.clear()
  return ( 
    <>
      <div className='flex flex-col w-full items-center justify-center bg-gray-200 min-h-screen'>
        <NavBar counts={ Object.keys(card).reduce((Opt, cru)=>{
          return Opt + card[cru];
        },0)} searchQuery={searchQuery} onSearchChange={setSearchQuery}/>
         <div className='w-full  mx-auto sm:px-6 lg:px-8 py-6 sm:py-10 md:py-16'>
            <Routes>
             <Route index element={<ProductListPage prod={prods} handleCard={cart} searchQuery={searchQuery}/>}></Route>
             <Route path={'/productData/:xyz'} element={<Productdata prod={prods} handleCard={cart}/>}></Route>
             <Route path='/addData' element={<AddDataPage/>}></Route>
             <Route path='/about' element={<About/>}></Route>
             <Route path='/cart' element={<CardPage params={card} data={prods} card={setCard} />}></Route>
           </Routes>
         </div>
         <Footer/>
      </div>
    </>
  )
}

export default memo(App)