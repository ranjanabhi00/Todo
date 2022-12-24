import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

const Dashboard = ({user}) => {
    const router=useRouter()
    const [currtasks,setcurrTask]=useState(user==undefined?[]:user.tasks)
    const [task,setTask]=useState(""); 
    const [today,setToday]=useState('')
    
    function logout(){
        localStorage.removeItem("USER");
        router.push("/")
    }
  function getCurrDay(){
let months=["January","February","March","April","May","June","July","August",
"September","October","November","December"]
    let date=new Date();
    let month=months[date.getMonth()]
    let day=date.getUTCDate();
    let year=date.getUTCFullYear();
    setToday( `${day} ${month},${year}:`)
    

  }  
  useEffect(
    ()=>{getCurrDay()
},[])
async function addtasks(task){
    let body={
        user:user.email,
        task:task
    }
       let res=await fetch('http://localhost:8080/user/addtask',{
        method:'PUT',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify(body)
       })
}  
   

function addTask(){
     if(currtasks.length==5){
        alert("daily limit exceeded")
        return;
     }
     setcurrTask([...currtasks,task])
     addtasks(task)
     setTask("");
}

  return (
    <div className='grid place-content-center    '>
    <div className='border-2 w-fit px-5 rounded-md shadow-md w-fit mx-50 my-5 '>

        <p className='text-2xl font-light text-black leadimg-9 py-3'>Hello</p>
        <p className='text-3xl font-medium leading-10 text-black'>{user?user.user_name:""}</p>
        <p className='text-base font-normal pb-3'>Good to see you here</p>
        <p className='text-base font-bold pb-3'>Tasks for {today}</p>

        <ul className='px-7 h-80'>
        
        {
            currtasks.map((task,ind)=>
            <li key={ind} className='text-base font-normal  list-disc '>{task}
            </li>
            )
        
            
        }
        </ul>
     
     <input type='text' placeholder='eg. Nedd to finish the assignment..'
     className='text-sm rounded-md border-inherit px-2 py-3 w-96 border-2'
     value={task} onChange={(e)=>setTask(e.target.value)} /><br/><br/>
     <button className='text-base px-2 py-3 rounded-md font-normal bg-black w-96 text-white'
     onClick={addTask}>Add new task</button>
     <p className='font-bold cursor-pointer text-center my-4'
     onClick={logout}>Logout</p>
    
    </div>
    </div>
  )
}

export default Dashboard