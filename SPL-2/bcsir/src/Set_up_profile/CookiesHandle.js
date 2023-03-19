import React from 'react'


export function getCookie(name) {
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