import { useState } from 'react'
import ProductList from './productList'
import {Routes, Route} from 'react-router-dom'
import Productdata from './productdata';

function App() {

  return ( 
    <>
      <div className='flex flex-col items-center justify-center'>
         <Routes>
           <Route index element={<ProductList/>}></Route>
           <Route path={'/productData/:sku'} element={<Productdata/>}></Route>
           <Route path={'/productList'} element={<ProductList/>}></Route>
         </Routes>
      </div>
    </>
  )
}

export default App
