import React, {useEffect, useState} from 'react'
import InfoShowCard from './InfoShowCard'
import pto from './aaa.jpg';
import axios from 'axios';

export default function HomeMain() {
  const fun=()=>{
    <p>inside fun</p>
  }
  var result,namesArray;
  const [inputs, setInputs] = useState({
    dept: "",
    ID: "",
  });
  const [departmentArr, setdepartmentsArr]=useState([]);
  inputs.dept = 'Institute Of Fuel Research Development';
  useEffect(() => {
    const handleDepartment = async () => {
      try {
        console.log("here");
        result = await axios.post("http://localhost:3001/app/getResearcher",inputs);
        console.log("ekhane print hobe ");
        namesArray = result.data;
        console.log(namesArray," this is a @D array");
        setdepartmentsArr(result.data);
        //setdepartmentsArr(namesArray.data);
        //console.log(departmentArr+" is department array");
        console.log("ekhane print ses ");
      } catch (err) {
        console.log("error occur");
      }
    };
    handleDepartment();
  }, []); 

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
    handleDepartment();
    <div style={{display:"flex"}}></div>
        {departmentArr.map((user)=>(<InfoShowCard name={user.name} designation={user.designation} photo={pto} ID={user.ID}/>))}
    {/* <Admin/>  
    <Profile photo={pto}/>  
    <Profile_set/> */}
    </>
  );
}
