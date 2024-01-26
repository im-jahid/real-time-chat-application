import React from 'react'
import { Link } from 'react-router-dom'
import { BiSolidLeftArrow } from 'react-icons/bi'
import { useNavigate } from 'react-router-dom'
import { getAuth, signOut } from "firebase/auth";
import { useDispatch } from 'react-redux'
import { userLoginInfo } from '../../slices/userSlice';

const pop = () => {


  const auth = getAuth();
  const navigate = useNavigate()
  let dispatch = useDispatch()


  const handelLogOut = () => {
    signOut(auth).then(() => {
      dispatch(userLoginInfo(null))
      // localStorage.removeItem('userLoginInfo')
      localStorage.removeItem('userLoginInfo')
      setTimeout(() => {
        navigate('/login')
      }, 2000)
      console.clear()
    }).catch((error) => {
      console.log(error.code);
    });
  }

  return (
    <div className='bg-[#EEEAEA] h-screen w-full'>
      <div className='h-[400px] w-full bg-[#5F35F5] flex justify-center items-center'>
        <div className='bg-white py-[50px] px-[60px] rounded-lg text-center mt-[300px]'>
          <div className='flex justify-center'>
            <Link to='/login'>
              <button onClick={handelLogOut} className='bg-[#5F35F5] font-nunito font-semibold text-[20px] text-[#fff] block w-[200px] py-[5px] mt-[20px] rounded-lg mr-[10px]'>Logout</button></Link>
            <Link to='/home'>
              <button className='bg-[#5F35F5] font-nunito font-semibold text-[20px] text-[#fff] block w-[200px] py-[5px] mt-[20px] rounded-lg mr-[10px]'>Cancle</button></Link>
          </div>
          <Link className='inline w-[140px]' to='/home'><div className='flex justify-center items-center mt-[15px] w-[140px]'>
            <BiSolidLeftArrow />
            <p className='font-nunito font-regular text-lg text-[#808080] inline-flex'>Back to home</p>
          </div></Link>
        </div>
      </div>
      <div className='w-full bg-red-500'></div>
    </div>
  )
}

export default pop