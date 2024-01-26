import React, { useState } from 'react'
import forgotImg from '../../assets/lock.jpg'
import {BiSolidLeftArrow} from 'react-icons/bi'
import { Link } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
const auth = getAuth();
const ForgotPassword = () => {
const [email, setEmail] = useState('')
const [emailerror, setEmailerror] = useState ('')
const submitEmail = (e) =>{
    setEmail(e.target.value);
    setEmailerror('')
  }
  const submitButton = () =>{
    if(!email){
      setEmailerror('Email is requird');
    }else{
      if(!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)){
        setEmailerror('Email is not valid');
      }if( email && /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)){
        sendPasswordResetEmail(auth, email)
        .then(() => {
            toast.success('check your email and reset your password')
            setEmailerror('');
        })
        .catch((error) => {
          const errorCode = error.code;
          console.log(errorCode);
          
        });
      }
    }
}
  return (
    <div className='bg-[#EEEAEA] h-screen w-full'>
         <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
          />
    <div className='h-[400px] w-full bg-[#5F35F5] flex justify-center items-center'>
      <div className='bg-white py-[50px] px-[60px] rounded-lg text-center mt-[300px]'>
        <img className='w-[20%] h-[20%]' src={forgotImg} alt="" />
          <h3 className='font-open font-bold text-[30px] text-[#11175D] mb-[10px]'>Forgot password</h3>
          <p className='font-nunito font-regular text-lg w-[400px] text-[#808080] m-auto'>Enter your email and we'll sent you a link to reset your password</p>
          
          {/* <input onChange={submitEmail} className='py-[15px] px-[10px] border-[2px] border-bg[#EAEAF1] font-nunito font-semibold text-[18px] text-[#11175D] outline-none bg-none mt-[30px] mb-[5px] w-[400px]' type='email' placeholder='' />
          <p className='font-Oswald font-regular text-sm text-red-500 text-start ml-[60px]'>{emailerror}</p>       */}

          <div class="flex items-center border-2 py-2 px-3 rounded-2xl mb-2">
              <img className='h-5 w-5 text-gray-400' src="images/email.svg" alt="" />
              <input onChange={submitEmail} class="w-full pl-2 outline-none border-none" type="email" id="" placeholder="Email Address" />
              {emailerror &&
                <BiError className='text-red-500' />
              }
            </div>

            {emailerror &&
              <p className='font-pop text-sm  text-red-500'>{emailerror}</p>
            }                

         <div className='flex justify-center'>
         <button onClick={submitButton} className='bg-[#5F35F5] font-nunito font-semibold text-[20px] text-[#fff] block w-[200px] py-[5px] mt-[20px] rounded-lg mr-[10px]'>Reset</button>
         
          <button onClick={submitButton} className='bg-red-400 font-nunito font-semibold text-[20px] text-[#fff] block w-[200px] py-[5px] mt-[20px] rounded-lg ml-[10px]'>
          <Link className='inline w-[140px]' to='/login'>Cancel</Link>
          </button>
         </div>
          <Link className='inline w-[140px]' to='/login'><div className='justify-center items-center mt-[15px] w-[140px]  inline-flex'>
            <BiSolidLeftArrow/>
            <p className='font-nunito font-regular text-lg text-[#808080] inline-flex'>Back to login</p>
          </div></Link>

      </div>
    </div>
    {/* <div className='w-ful'></div> */}
    </div>
  )
}

export default ForgotPassword