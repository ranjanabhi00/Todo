import Link from "next/link"
import { useRouter } from "next/router";
import { useState } from "react"

const Signup = () => {
const [user,setUser]=useState({user_name:"",email:"",password:""})
const [confirmPass,setConfirmPass]=useState("");
let router=useRouter()

const handleChange=(e)=>{
    let {name,value}=e.target
    setUser({...user,[name]:value})
}

    const register=async()=>{
        console.log(confirmPass+"  "+user.password);
        if(confirmPass != user.password){
            alert("Password didn't match")
            return;
        }
        try{
        let res=await fetch('http://localhost:8080/user/register',{
            method:'POST',
            body:JSON.stringify(user),
            headers:{
                'Content-Type':'application/json'
            }

        })
        let res2=await res.json();
        console.log(res2);
    localStorage.setItem("USER",JSON.stringify(res2.data))
    router.push("/dashboard")
    }
    catch(err){
        console.log(err);
        alert("User Exist")
    }

    }
    return (
      <div className='px-3 py-3 mx-20  grid place-content-center'>
      <div className='border-2 w-fit px-5 rounded-md shadow-md'>
      <p className='text-2xl font-light text-black leadimg-9 pb-3'>Welcome!</p>
      <p className='text-3xl font-medium leading-10 text-black'>Sign up to</p>
      <p className='text-base font-normal pb-3'>Todo's App</p>
      <label for="Email" className='text-base font-normal'>Email</label><br/>
      <input type='email' className='text-sm rounded-md border-inherit px-2 py-3 w-96 border-2' placeholder='Enter your email' name='email'
        value={user.email} onChange={handleChange} />
      <br/>
      <br/>
      <label for="username" className='text-base font-normal'>User name</label><br/>
      <input type='text' className='text-sm rounded-md border-inherit px-2 py-3 w-96 place border-2'
       placeholder='Enter your user name' name='user_name' value={user.user_name} onChange={handleChange} />
      <br/>
      <br/>
      <label for="password" className='text-base font-normal'>Password</label><br/>
      <input type='password' className='text-sm rounded-md border-inherit px-2 py-3 w-96 border-2'
       placeholder='Enter your password' name='password' value={user.password} onChange={handleChange} />
      <br/>
      <br/>
      <label for="confirm password" className='text-base font-normal'
       >Confirm Password</label><br/>
      <input type='password' className='text-sm rounded-md border-inherit px-2 py-3 w-96 pl-col border-2'
       placeholder='Confirm password' value={confirmPass} onChange={(e)=>setConfirmPass(e.target.value)}/>
      <br/>
      <br/>
      <button className='text-base px-2 py-3 rounded-md font-normal bg-black w-96 text-white'
       onClick={register}>Register</button>
      <br/>
      <p className='text-sm rounded-md border-inherit px-2 py-3 w-96 pl-col text-center '>Already have an account?
      <Link href="/"> <span  className='font-bold cursor-pointer'>Login</span></Link></p>
      </div>
      <div>
       
      </div>
      </div>
    )
  }
  
  export default Signup