import React from "react";

function NonMatching({title}){
    return(
        <>
          <div className="flex flex-col items-center justify-center py-12 sm:py-16 px-4 text-center">
            <p className="text-sm sm:text-base text-gray-500">{title}</p>
          </div>
        </>
    )
}

export default NonMatching;