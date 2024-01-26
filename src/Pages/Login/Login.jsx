import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { BiError } from 'react-icons/bi'
import login from '../../assets/login.png'
import google from '../../assets/google.png'
import {BsEyeFill , BsFillEyeSlashFill} from 'react-icons/bs'
import { GoogleAuthProvider, getAuth, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import { userLoginInfo } from '../../slices/userSlice';
import { useDispatch } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const auth = getAuth();
  const provider = new GoogleAuthProvider();
  let dispatch = useDispatch()

  let navigate = useNavigate()

  let [email, setEmail] = useState('')
  let [emailerr, setEmailerr] = useState('')
  
  let [password, setPassword] = useState('')
  let [passworderr, setPassworderr] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  let [loader, setLoader] = useState(false)
  
  const [error, setError] = useState('')

  const submitGoogle = () => {
    signInWithPopup(auth, provider)
      .then(() => {
        toast.success('login done')

        setTimeout(() => {
          navigate('/home')
        }, 3000)
      }).catch(() => {
        const errorCode = errorCode;
        console.log(errorCode);
      })
  }

  let handleEmail = (e) => {
    setEmail(e.target.value)
    setEmailerr('')
  }

  let handlePassword = (e) => {
    setPassword(e.target.value)
    setPassworderr('')
  }

  let handleSubmit = (e) => {
    e.preventDefault()

    if (!email) {
      setEmailerr('Email Is Required')
    }

    if (!password) {
      setPassworderr('Passowrd Is Required')
    }

    if (email && password && /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email) && /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/.test(password)) {
      signInWithEmailAndPassword(auth, email, password)
        // .then((user) => {
        .then((user) => {
          toast.success('login successfully')
          // sendEmailVerification(auth.currentUser)
          console.log(user.user);
          dispatch(userLoginInfo(user.user)) 
          localStorage.setItem('userLoginInfo', JSON.stringify((user.user)))
          setError('')
          setEmail('')
          setPassword('')
          setTimeout(() => {
            navigate('/home')
          }, 3000)
        })
        .catch((error) => {
          const errorCode = error.code;
          // console.log(errorCode);
          if (errorCode.includes('auth/invalid-login-credentials')) {
            setError('email or password is incorrect')
          }
        });
    }

  }
  return (
    <div class="h-screen md:flex">
      <ToastContainer
        position="top-right"
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
      <div class="flex w-full  md:w-1/2 justify-center items-center bg-white">
        <form class="bg-white">
          <h1 class="text-gray-800 font-bold text-2xl mb-4 font-pop px-[50px]">Login to your account!</h1>

          <div onClick={submitGoogle} className='inline-flex pt-[13px] pr-[110px] pl-[110px] pb-[11px]  border-[2px] border-bg-[#03014C] rounded-lg mb-[22px] cursor-pointer'>
            <img src={google} alt="" />
            <p className='font-semibold font-open text-[#03014C] text-[13px] ml-[10px] inline-block'>Login with Google</p>
          </div>

          <p className='font-semibold font-open text-red-500 text-[13px] ml-[10px] mb-5 '>{error}</p>

          <div className='mb-4'>
            <div class="flex items-center border-2 py-2 px-3 rounded-2xl mb-2">
              <img className='h-5 w-5 text-gray-400' src="images/email.svg" alt="" />
              <input onChange={handleEmail} class="pl-2 outline-none w-full border-none" type="email" id="" placeholder="Email Address" />
              {emailerr &&
                <BiError className='text-red-500 ml-[25px]' />
              }
            </div>

            {emailerr &&
              <p className='font-pop text-sm  text-red-500 '>{emailerr}</p>
            }
          </div>
          <div className='mb-4'>
            <div class="flex items-center border-2 py-2 px-3 rounded-2xl mb-2">
              <img className='w-5 h-5' src="images/password.svg" alt="" />
              <input onChange={handlePassword} class="pl-2 w-full outline-none border-none" type={ showPassword ? 'text' : 'password'} id="" placeholder="Password" />
              {
                showPassword ?
                <BsEyeFill onClick={()=> setShowPassword(!showPassword)} className=''/>
                :
                <BsFillEyeSlashFill onClick={()=> setShowPassword(!showPassword)} className=''/>

              }
              {passworderr &&
                <BiError className='text-red-500' />
              }
            </div>
            {passworderr &&
              <p className='font-pop text-sm text-red-500 '>{passworderr}</p>
            }
          </div>
          <div className='flex justify-center'>

            {loader ?
              <ThreeDots
                height="80"
                width="80"
                radius="9"
                color="#4fa94d"
                ariaLabel="three-dots-loading"
                wrapperStyle={{}}
                wrapperClassName=""
                visible={true}
              />
              :
              <button onClick={handleSubmit} class="block w-full bg-indigo-600 mt-4 py-2 rounded-2xl text-white font-semibold mb-2">Login</button>
            }
          </div>
          <Link to='/ForgotPassword' >
            <span class="text-sm ml-2 hover:text-blue-500 cursor-pointer">Forgot Password ?</span>
          </Link>
        </form>
      </div>
      <div class="flex w-full relative md:w-1/2 bg-black opacity-45 to-purple-700 i justify-around items-center rounded-b-3xl lg:rounded-none ">
        <img className='h-screen w-full object-cover opacity-40 rounded-b-3xl' src={login} alt="" />
        <div className='text-center md:text-left absolute top-50 left-50'>
          <h1 class="text-white font-bold text-2xl md:text-4xl   font-pop">Conversa </h1>
          <p className='text-white font-normal text-sm  font-pop mt-2'>Free login and you can enjoy it</p>
          <p className='text-white font-normal text-sm  font-pop mt-2'>Don't Have Accout ! Please Create a Account </p>
          <Link className='mx-auto inline-block ' to='/Registration'>
            <button type="submit" class="block w-28  font-pop bg-white text-indigo-800 mt-4 py-2 rounded-2xl font-bold mb-2">SingUp</button>
          </Link>
        </div>
      </div>

    </div>
  )
}

export default Login