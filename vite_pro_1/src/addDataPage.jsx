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
         <div className="h-screen w-screen flex items-center justify-center">
            <div className="h-100 w-200 flex flex-col">

                <div className="m-5">
                  <input className="w-50" type="text" onChange={urlChange} placeholder="enter url here"required/>
                </div>

                <div className="m-5">
                  <input className="w-50" type="text" onChange={titleChange} placeholder="enter title here" required />
                </div>

                <div className="m-5">
                  <input className="w-50" type="text" onChange={pricrChange} placeholder="enter price in doller here" required/>
                </div>

                <div className="m-5">
                  <input className="w-50" type="text" onChange={ratingChange} placeholder="enter rating here" required />
                </div>

                  <button className='m-4 w-15 hover:w-16 hover:h-11  p-2 bg-blue-200 rounded-md border' onClick={urlChangeBtn}>Enter</button>

                  {n && <NonMatching title='plese kindly fell empty box'/>}
            </div>
         </div>
        </>
    )
}

export {AddDataPage, orgobj};
