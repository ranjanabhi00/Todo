import React, { useEffect, useState } from 'react'
import Dashboard from '../components/dashboard'

const dashboard = () => {
const [user,setuser]=useState(null);

const getData=()=>{
let curr=JSON.parse(localStorage.getItem("USER")) 
setuser(curr)


}
useEffect(() => {
  
    getData();
}, [])


  return (
    <>
  <Dashboard  user={user}/>
    </>
  )
}

export default dashboard

