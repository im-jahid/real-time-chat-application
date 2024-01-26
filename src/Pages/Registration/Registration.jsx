import React, { useState } from 'react'
import { json, Link } from 'react-router-dom';
import { BiError } from 'react-icons/bi'
import { BsEyeFill, BsFillEyeSlashFill } from 'react-icons/bs'
import { getAuth, createUserWithEmailAndPassword, updateProfile, sendEmailVerification } from "firebase/auth";
import { useDispatch } from 'react-redux';
import { getDatabase, ref, set } from "firebase/database";
import registImg from '../../assets/registration.png'
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Registration = () => {
  const auth = getAuth();
  const db = getDatabase();

  let navigate = useNavigate()
  let dispatch = useDispatch()

  let [email, setEmail] = useState('')
  let [emailerr, setEmailerr] = useState('')

  let [name, setName] = useState('')
  let [nameerr, setNameerr] = useState('')

  let [password, setPassword] = useState('')
  let [passworderr, setPassworderr] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [registration, setRegistration] = useState('')

  let [loader, setLoader] = useState(false)

  let handleName = (e) => {
    setName(e.target.value)
    setNameerr('')
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
      setEmailerr('Email is requird');
    } else {
      if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
        setEmailerr('Email is not valid');
      }
    }
    if (!name) {
      setNameerr('Name is requird ');
    } if (!password) {
      setPassworderr('Password is requird')
    } else {
      if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/.test(password)) {
        setPassworderr('password must contain at least 8 characters including upper/lowercase, numbers and one scecial characters ')
      }
    }
    if (password && name && email && /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email) && /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/.test(password)) {

      createUserWithEmailAndPassword(auth, email, password)

        .then((user) => {
          updateProfile(auth.currentUser, {
            displayName: name,
            photoURL: './src/assets/border-img.png'
          }).then(() => {
            sendEmailVerification(auth.currentUser)
            console.log(user.user, 'ok done');
            toast.success('registration done & verify your email');
            setEmail('')
            setName('')
            setPassword('')
            setTimeout(() => {
              navigate('/login')
            }, 3000)
          }).then(() => {
            console.log(user.user.photoURL);
            set(ref(db, 'users/' + user.user.uid), {
              username: user.user.displayName,
              email: user.user.email,
              photoURL: user.user.photoURL,
            });
          })

        })
        .catch((error) => {
          setRegistration('')
          const errorCode = error.code;
          // console.log(errorCode);
          if (errorCode.includes('auth/email-already-in-use')) {
            setEmailerr('Email is already in use');
          }
        });
    }
  }
  return (
    <div class="h-screen md:flex">


      <div class="flex w-full md:w-1/2 justify-center items-center bg-white">
        <form class="bg-white">
          <h1 class="text-gray-800 font-bold text-2xl mb-[30px]  mb-2 font-pop">Get started with easily register</h1>
          <ToastContainer
            position="top-center"
            autoClose={2000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
          />
          <div className='mb-4 '>

            <div class="flex items-center border-2 py-2 px-3 rounded-2xl mb-2">
              <img className='h-5 w-5 text-gray-400' src="images/person.svg" alt="" />
              <input onChange={handleName} class="pl-2 w-full outline-none border-none" type="text" name="" id="" placeholder="User Name" />
              {nameerr &&
                <BiError className='text-red-500 ml-[25px]' />
              }

            </div>
            {nameerr &&
              <p className='font-pop text-sm text-red-500'>{nameerr}</p>
            }
          </div>
          <div className='mb-4'>
            <div class="flex items-center border-2 py-2 px-3 rounded-2xl mb-2">
              <img className='h-5 w-5 text-gray-400' src="images/email.svg" alt="" />
              <input onChange={handleEmail} class="w-full pl-2 outline-none border-none" type="email" id="" placeholder="Email Address" />
              {emailerr &&
                <BiError className='text-red-500' />
              }
            </div>
            {emailerr &&
              <p className='font-pop text-sm  text-red-500'>{emailerr}</p>
            }
            <p className='font-pop text-sm  text-red-500'>{registration}</p>
          </div>
          <div className='mb-4'>
            <div class="flex items-center border-2 py-2 px-3 rounded-2xl mb-2">
              <img className='w-5 h-5' src="images/password.svg" alt="" />
              <input onChange={handlePassword} class="pl-2 w-full outline-none border-none" type={showPassword ? 'text' : 'password'} id="" placeholder="Password" />
              {
                showPassword ?
                  <BsEyeFill onClick={() => setShowPassword(!showPassword)} className='' />
                  :
                  <BsFillEyeSlashFill onClick={() => setShowPassword(!showPassword)} className='' />

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
              <button onClick={handleSubmit} class="block w-full bg-indigo-600 mt-4 py-2 rounded-2xl text-white font-semibold mb-2">Sign up</button>
            }
          </div>
        </form>
      </div>

      <div class="flex w-full relative md:w-1/2 bg-black opacity-45 to-purple-700 i justify-around items-center rounded-b-3xl lg:rounded-none">

        <img className='h-screen w-full object-cover opacity-40 rounded-b-3xl' src={registImg} alt="" />
        <div className='text-center md:text-left absolute top-50 left-50 p-[40px]'>
          <h1 class="text-white font-bold text-2xl md:text-4xl text-[30px] font-pop">Conversa</h1>
          <p class="text-white mt-2 hidden  md:block">Free register and you can enjoy it</p>
          <p className='text-white font-normal text-sm  font-pop mt-2'>Already Have an Acount!</p>
          <Link className='mx-auto inline-block ' to='/login'>
            <button type="submit" class="block w-28  font-pop bg-white text-indigo-800 mt-4 py-2 rounded-2xl font-bold mb-2 text-center">Login</button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Registration