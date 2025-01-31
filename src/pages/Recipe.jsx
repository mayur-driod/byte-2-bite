import React from 'react'
import { IoIosArrowBack } from "react-icons/io";

function Recipe() {
  return (
    <>
    <button><IoIosArrowBack/></button>
    <div>
        <h1>{/*kimchi or whaterver*/}</h1>
        <div>
            <img src={/*image url*/} alt={/*recipe name*/}/>
            <div>
                <h2>Ingredients</h2>
                <ul>
                    {/*ingredients list*/}
                </ul>
            </div>
            <div>
                <h2>Instructions</h2>
                <ol>
                    {/*instructions list*/}
                </ol>
            </div>
        </div>
    </div>
    </>
  )
}

export default Recipe