import React from 'react'
import Data from './Data'

export default function Interview({data,setintdata, intTitle}) {
  return (
    <>
       <br></br>
       <h2 className='text-center mt-4 mb-4 int-h2' >Interview Question: {intTitle}</h2>
       <Data data={data} setintdata={setintdata} intTitle={intTitle} ></Data>
    </>
  )
}
