import React from "react";

function TableRow({Int, Nums}) {
    let val =(Int) * (+Nums)
    return(
        <>
          <p className="inline-block">{Int}x{Nums} = {(Int)*(+Nums)}</p>
        </>
    )
}

export default TableRow;