import {Routes, Route} from 'react-router-dom'
import Productdata from './productdata';
import ProductListPage from './productListPage';
import {AddDataPage} from './addDataPage';
import axios from 'axios';
import { useState, useEffect } from 'react';

function App() {
  const [prods, setProd] = useState([])  
  
  useEffect(() => {
    axios.get('https://dummyjson.com/products').then((response) => {
      setProd(response.data.products)
    })
  }, [])

  return ( 
    <>
      <div className='flex flex-col items-center justify-center'>
         <Routes>
           <Route index element={<ProductListPage prod={prods}/>}></Route>
           <Route path={'/productData/:xyz'} element={<Productdata prod={prods}/>}></Route>
           <Route path='/addData' element={<AddDataPage/>}></Route>
         </Routes>
      </div>
    </>
  )
}

export default App
