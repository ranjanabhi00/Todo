import { RedirectTo } from "./redirectsTo"
import Link from "next/link"
import { useRouter } from "next/router"
import { useState } from "react"



const Signin = () => {
    const [user,setuser]=useState({user_name:"",password:""})


    let router=useRouter()
    const redirect=()=>{
        router.push("/dashboard")
    }
    const login=async(user)=>{
    
        let res=await fetch('http://localhost:8080/user/login',{
         method:'POST',
         body:JSON.stringify(user),
         headers:{
             'Content-Type':'application/json'
         }
        })
        let res2=await res.json()
        console.log(res2);
      
        if(res2.data){
         localStorage.setItem("USER",JSON.stringify( res2.data))
         redirect();
        }
        else{
         alert(res2);
         return;
        }
  
     }
    
    return (
      <div className='px-3 py-3 mx-20  grid place-content-center'>
      <div className='border-2 w-fit px-5 rounded-md shadow-md'>
      <p className='text-2xl font-light text-black leadimg-9 pb-3'>Welcome!</p>
      <p className='text-3xl font-medium leading-10 text-black'>Sign in to</p>
      <p className='text-base font-normal pb-3'>Todo's App</p>
      
      <label for="username" className='text-base font-normal'>User name</label><br/>
      <input type='text' className='text-sm rounded-md border-inherit px-2 py-3 w-96 place border-2' 
      placeholder='Enter your user name' value={user.user_name} onChange={(e)=>setuser({...user,user_name:e.target.value})}/>
      <br/>
      <br/>
      <label for="password" className='text-base font-normal'>Password</label><br/>
      <input type='password' className='text-sm rounded-md border-inherit px-2 py-3 w-96 border-2'
       placeholder='Enter your password' value={user.password} onChange={(e)=>setuser({...user,password:e.target.value})} />
      <br/>
      <br/>
      
      <button  className='text-base px-2 py-3 rounded-md font-normal bg-black w-96 text-white'
       onClick={()=>login(user)}>Login</button>
      <br/>
      <p className='text-sm rounded-md border-inherit px-2 py-3 w-96 pl-col text-center '>Don't have an account?
      <Link href="/register"> <span  className='font-bold cursor-pointer'>Register</span></Link> </p>
      </div>
      <div>
       
      </div>
      </div>
    )
  }
  
  export default Signin