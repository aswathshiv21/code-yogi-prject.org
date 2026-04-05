import React from "react";
import TableRow  from "./tablerow.jsx";
import { useState } from "react";

function Table() {

    const [num, setnum] = useState(2)

    function change() {
        setnum(num + 1)
    }
    return (
        <>
          <div className=" size-30 flex flex-col w-3xs ">
            <button onClick={change} className="p-2 rounded-4xl bg-blue-500 w-16">next</button>
            <TableRow Int={num} Nums={'1'}/>
            <TableRow Int={num} Nums={'2'}/>
            <TableRow Int={num} Nums={'3'}/>
            <TableRow Int={num} Nums={'4'}/>
            <TableRow Int={num} Nums={'5'}/>
            <TableRow Int={num} Nums={'6'}/>
            <TableRow Int={num} Nums={'7'}/>
            <TableRow Int={num} Nums={'8'}/>
            <TableRow Int={num} Nums={'9'}/>
            <TableRow Int={num} Nums={'10'}/>
          </div>
        </>
    )
}

export default Table;