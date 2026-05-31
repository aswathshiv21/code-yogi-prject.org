import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";

function CardPage({ params, data, card }) {
  const [cleared, setCleared] = useState(false);

  const Narr = useMemo(() => {
    if (cleared) return [];
    const keys = Object.keys(params);
    return data.filter(item => keys.includes(item.id.toString()));
  }, [params, data]);

  function handleCartClear() {
    setCleared(true);
    card({});
  }


    if (Narr.length === 0){
        return (
              <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-5">
                <h2 className="text-2xl font-bold text-gray-700">There are noting in your cart</h2>
                <Link to="/" className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                  Go back home
                </Link>
              </div>
            );
    }
    
 
    return (
        <>
        <div className="min-h-screen">
            <button onClick={handleCartClear} className="mt-4 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600">clear cart</button>
          {Narr.map((i)=>{
            return (
            <div className=" m-10 border border-gray-200 flex bg-white rounded-xl overflow-hidde hover:border-blue-400 transition-colors p-4">
                <div className=" h-fit mb-2">
                       <img 
                         src={i.thumbnail} 
                         alt={i.title} 
                         className="w-full h-full object-cover rounded-lg" 
                       />
                </div>
                <div className="flex flex-col">

                     <p className="text-2xl text-gray-500">{i.category}</p>
                     <h1 className="text-5xl font-medium text-gray-800 truncate">{i.title}</h1>
      
      
                     <p className="inline-block mt-10 text-2xl mb-10  font-semibold">
                       ${Number(i.price).toFixed(2)}
                     </p>

                     <Link 
                       to={`/productData/${i.sku}`} 
                       className="text-xm text-blue-500 hover:underline mt-1"
                     >
                       view details
                     </Link>
                </div>
            </div>)
          })}
          </div>
        </>
    )
}

export default CardPage;