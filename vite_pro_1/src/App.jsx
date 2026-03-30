import { useState } from 'react'
import Product from './product'


function App() {
  return (
    <>
     <div className='flex items-center justify-center'>
      <div className='w-6xl flex flex-wrap items-center justify-center'>
         <Product title="plane white mugs" src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVMDJ98IA87OPTWL92g8W4O9Mi98OAzI93bg&s' price="10"> </Product>
         <Product title="two in one mug" src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4evPmVuUqWL2_mioxOuV1VhryHZ6UMJUuQw&s' price="80"> </Product>
         <Product title="plastic + wooden" src='https://pebel.in/cdn/shop/files/Websiteimages4_13.png?v=1764343423' price="20"> </Product>
         <Product title="costom made mugs" src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJlle5hRO-TR81XZCjqJE5KP0ZbVACYe-2eA&s' price="30"> </Product>
         <Product title="photo printed T-shirts" src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRP_wvDK1YsoyHi8ph-ZAU8dyP37JM-ACCLPA&s' price="48.9"> </Product>
         <Product title="spacia designd T-shirt" src='https://bratmacrafts.com/cdn/shop/files/2_caec75e0-66e2-4a50-9263-f4d57bb93336.jpg?v=1727522686' price="51.6"> </Product>
         <Product title="plane blue T-shirt" src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJlyGYSCLw5VhIWvfMaYKxrcf5XaLMnc9qAA&s' price="12.54"> </Product>
         <Product title="plane yellow T-shirt" src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTez4MVGUANZIvM2ae-16lSaLzHzB6rZFtsLQ&s' price="26.34"> </Product>
      </div>
     </div>
    </>
  )
}

export default App
