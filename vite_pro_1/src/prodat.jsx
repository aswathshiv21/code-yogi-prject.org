import React from "react";
import Productdata from "./productdata";

function Prd(params, cardEvent) {

  const products = params?.find(p => p.id == xyz);
  
  return <Productdata product={products} handleCard={cardEvent}/>
}

export default Prd;