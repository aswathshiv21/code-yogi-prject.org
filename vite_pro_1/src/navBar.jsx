import React from "react";
import {Link} from "react-router-dom";


function NavBar(){
    return(
        <>
         <div className="w-full mr-4 h-20">
            <div className="w-full flex self-end justify-end">
                <div className="flex w-xs justify-between mr-10">
                  <Link to={'/'}>Home</Link>
                  <Link to={'/products'}>Products</Link>
                  <Link to={'/about'}>About Us</Link>
                  <Link to={'/contact'}>Contact us</Link>
                </div>
                <div className="w-30 flex justify-between">
                  <Link className=" p-2 pl-4 pr-4 bg-blue-500 rounded-xl" to={'/acount'}>Acount</Link>
                  <Link to={'/login'}>Login</Link>
                </div>
            </div>
         </div>
        </>
    )
}

export default NavBar;