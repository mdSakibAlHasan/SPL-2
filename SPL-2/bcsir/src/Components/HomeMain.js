import React from 'react'
import InfoShowCard from './InfoShowCard'
import pto from './aaa.jpg';

export default function HomeMain() {
  const fun=()=>{
    <p>inside fun</p>
  }
  const el =
  <>
    <p>hi i am el</p>
  </>

    const users=[
      {name:'Fahim', designation: 'Student'},
      {name:'Sakib', designation: 'employee'},
      {name:'Momin', designation: 'Kotipoti'},
      {name:'Momin', designation: 'Kotipoti'},
      {name:'Momin', designation: 'Kotipoti'},
      {name:'Momin', designation: 'Kotipoti'},

    ];
  return (
    <>
  
    <div style={{display:"flex"}}></div>
        {users.map((user)=>(<InfoShowCard name={user.name} designation={user.designation} photo={pto}/>))}
    {/* <Admin/>  
    <Profile photo={pto}/>  
    <Profile_set/> */}
    </>
  );
}
