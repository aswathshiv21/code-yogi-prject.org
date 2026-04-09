import {Routes, Route} from 'react-router-dom'
import Productdata from './productdata';
import ProductListPage from './productListPage';

function App() {

  return ( 
    <>
      <div className='flex flex-col items-center justify-center'>
         <Routes>
           <Route index element={<ProductListPage/>}></Route>
           <Route path={'/productData/:sku'} element={<Productdata/>}></Route>
         </Routes>
      </div>
    </>
  )
}

export default App
