import React from "react";
import NonMatching from "./nonMatchingr";
import { useState } from "react";

let u ;
let p ;
let t ;
let r ;
let obj = {};
let orgobj= {}
function AddDataPage() {    
    orgobj ={}
    obj ={}
    let [n, setn] = useState(false)
    let [f, setf] = useState(false)

    function urlChange(event) {
      let e = event.target.value
      u = e;
    }
 
    function titleChange(event) {
      let e = event.target.value
      t = e;
    }
 
    function pricrChange(event) {
      let e = event.target.value
      p = e;
    }
 
    function ratingChange(event) {
      let e = event.target.value
      r = e;
    }
 
    function urlChangeBtn() {
      obj.src = u;
      obj.title = t;
      obj.price = p;
      obj.rating = r;

      if (u === undefined || t === undefined || p === undefined || r === undefined ) {  
        setn(true)
        console.log(obj);
        return;
      }

      setf(true);
      console.log(obj);
      orgobj = obj

      console.log('org object ',orgobj);
      
    }

    return(
        <>
         <div className="min-h-[60vh] w-full flex items-center justify-center px-4">
            <div className="w-full max-w-lg flex flex-col bg-white rounded-xl p-6 sm:p-8 shadow-sm">
                <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-4 sm:mb-6">Add New Product</h2>

                <div className="mb-3 sm:mb-4">
                  <input className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg border border-gray-300 text-sm focus:outline-none focus:border-blue-400 transition-colors" type="text" onChange={urlChange} placeholder="Enter image URL" required/>
                </div>

                <div className="mb-3 sm:mb-4">
                  <input className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg border border-gray-300 text-sm focus:outline-none focus:border-blue-400 transition-colors" type="text" onChange={titleChange} placeholder="Enter product title" required />
                </div>

                <div className="mb-3 sm:mb-4">
                  <input className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg border border-gray-300 text-sm focus:outline-none focus:border-blue-400 transition-colors" type="text" onChange={pricrChange} placeholder="Enter price in dollars" required/>
                </div>

                <div className="mb-4 sm:mb-5">
                  <input className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg border border-gray-300 text-sm focus:outline-none focus:border-blue-400 transition-colors" type="text" onChange={ratingChange} placeholder="Enter rating (1-5)" required />
                </div>

                  <button className='w-full sm:w-auto sm:self-start px-6 py-2.5 bg-blue-500 text-white rounded-lg text-sm font-semibold hover:bg-blue-600 transition-colors' onClick={urlChangeBtn}>Submit</button>

                  {n && <div className="mt-3"><NonMatching title='Please fill all fields'/></div>}
            </div>
         </div>
        </>
    )
}

export {AddDataPage, orgobj};
