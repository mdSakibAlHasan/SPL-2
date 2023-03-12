import React from 'react'

export default function HomeMain() {
  const fun=()=>{
    <p>inside fun</p>
  }
  const el =
  <>
    <p>hi i am el</p>
  </>
  return (
   <div>
    {el}
    BCSIR
    {/* {this.fun} */}
   </div>
  )
}
