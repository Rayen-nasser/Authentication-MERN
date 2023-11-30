"use client"

import React from 'react'
import { useCookies } from 'react-cookie'
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";

const logout = () => {
    const [cookies, setCookies] = useCookies("access_token")
    const removeToken = () =>{
        setCookies("access_token","")
        window.localStorage.removeItem('adminID')
    }
  return (
    <>
        <button type="button" className="btn btn-danger" onClick={removeToken}>
            Logout
        </button>
    </>
  )
}

export default logout
