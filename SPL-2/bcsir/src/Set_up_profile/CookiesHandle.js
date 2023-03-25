import React from 'react'


export const  getCookie = async(name) =>{
  return new Promise((resolve, reject) => {
    const cookieString = document.cookie;
    const cookies = cookieString.split('; ');
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].split('=');
      if (cookie[1] === name) {
        resolve(cookie[0]);
        return;
      }
    }
    resolve(null);
  });
}


export const getSetCookie = (name) => {
  const cookieString = document.cookie;
  const cookies = cookieString.split('; ');
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].split('=');
    if (cookie[1] === name) {
      return cookie[0];
    }
  }
  return null;
}