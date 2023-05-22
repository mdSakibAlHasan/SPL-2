import React, { useState } from "react";
import axios from "axios";
import { getSetCookie } from "../Set_up_profile/CookiesHandle";

export const getUserType = async()  =>{
    console.log("here are in user check function")
    const result = getSetCookie('my_cookies');
    // const [info,setInfo] = useState([]);
    const input = {
        cookieID: result,
    }
    var userInfo;
    if(input.cookieID != null){
        userInfo = await axios.post('http://localhost:3001/app/getPersonalInfo',input)
        console.log(" Here is info ", userInfo.data);   
    }  

    return userInfo.data;
}