import { useState } from 'react'
import ProductList from './productList'


function App() {
  
  const [quiry, setquiry] = useState('');

  const [sort, setSort] = useState(`default`)

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
    console.log(e);
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

          <select onChange={handlesortchange} value={sort}>
            <option value="default">Default sort</option>
            <option value="name">Sort by name</option>
            <option value="price">Sort by price</option>
          </select>
         < ProductList products={data}/>
      </div>
    </>
  )
}

export default App
