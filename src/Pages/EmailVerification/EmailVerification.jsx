import React from 'react'
import { Link } from 'react-router-dom'
import emailVerification from '../../assets/emailVerification1.png'
import {BiSolidLeftArrow} from 'react-icons/bi'
const EmailVerification = () => {
  return (
    <div className='bg-[#EEEAEA] h-screen w-full'>
<div className='h-[400px] w-full bg-[#5F35F5] flex justify-center items-center'>
 <div className='bg-white py-[50px] px-[60px] rounded-lg text-center mt-[300px]'>
   {/* <img className='w-[20%] h-[20%]' src={emailVerification} alt="" /> */}
     <h3 className='font-open font-bold text-[30px] text-[#11175D] mb-[10px]'>Email verification</h3>
     <p className='font-nunito font-regular text-lg w-[400px] text-[#808080] m-auto'>Check your email</p>
    <div className='flex justify-center'> 
    <Link to='https://mail.google.com/'>
    <button className='bg-[#5F35F5] font-nunito font-semibold text-[20px] text-[#fff] block w-[200px] py-[5px] mt-[20px] rounded-lg mr-[10px]'>Start</button></Link>
    <Link to='/login'>
    <button className='bg-[#5F35F5] font-nunito font-semibold text-[20px] text-[#fff] block w-[200px] py-[5px] mt-[20px] rounded-lg mr-[10px]'>Cancle</button></Link>
    </div>
     <Link className='inline w-[140px]' to='/login'><div className='flex justify-center items-center mt-[15px] w-[140px]'>
       <BiSolidLeftArrow/>
       <p className='font-nunito font-regular text-lg text-[#808080] inline-flex'>Back to login</p>
     </div></Link>
 </div>
</div>
<div className='w-full bg-red-500'></div>
</div>
  )
}

export default EmailVerification