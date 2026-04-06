import { useState } from 'react'
import ProductList from './productList'


function App() {

  const prod = [{
    src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVMDJ98IA87OPTWL92g8W4O9Mi98OAzI93bg&s',
    title: 'plane white mugs',
    price: "10"
  },{
    src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4evPmVuUqWL2_mioxOuV1VhryHZ6UMJUuQw&s',
    title: 'two in one mug',
    price: "80"
  },{
    src: 'https://pebel.in/cdn/shop/files/Websiteimages4_13.png?v=1764343423',
    title: 'plastic + wooden',
    price: "20"
  },{
    src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJlle5hRO-TR81XZCjqJE5KP0ZbVACYe-2eA&s',
    title: 'costom made mugs',
    price: "30"
  },{
    src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRP_wvDK1YsoyHi8ph-ZAU8dyP37JM-ACCLPA&s',
    title: 'photo printed T-shirts',
    price: "48.9"
  },{
    src: 'https://bratmacrafts.com/cdn/shop/files/2_caec75e0-66e2-4a50-9263-f4d57bb93336.jpg?v=1727522686',
    title: 'spacia designd T-shirt',
    price: "51.6"
  },{
    src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTez4MVGUANZIvM2ae-16lSaLzHzB6rZFtsLQ&s',
    title: 'plane yellow T-shirt',
    price: "26.34"
  },{
    src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0UyV5LOAgApwVyvn9-CKXuoY-l7fV50FFIA&s',
    title: 'navy blue shirt for womens',
    price: '89.25'
  },{
    src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBTOfhomKD4bMaLCvBuws9vqhuTL8MaLTR_g&s',
    title: 'red printed Shirt for boys',
    price: '15.5'
  }]

  const [quiry, setquiry] = useState('');

  let [data, setData] = useState(prod);

  function handleinputchange(event) {
    let newQuire = event.target.value;

    setData(prod.filter(item => 
     item.title.toLowerCase().includes(newQuire.toLowerCase())
     ))

    setquiry(newQuire)
  }

  return ( 
    <>
      <div className='flex flex-col'>
         <input 
           type="text" 
           value={quiry} 
           placeholder='search here' 
           onChange={handleinputchange} 
           className='self-center flex items-center justify-center w-3xl m-6 p-4 rounded-full hover:bg-gray-200'
          />
         < ProductList products={data}/>
      </div>
    </>
  )
}

export default App
