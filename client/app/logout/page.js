import React from 'react'
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Logout from '../components/logout';
import Link from 'next/link';
const page = () => {
  return (
    <div style={{
        display: "flex",
        justifyContent:"center",
        alignItems:'center',
        height: '100vh'
    }}>
        <Link href={'../login'}>
            <Logout/>
       </Link>
    </div>
  )
}

export default page
