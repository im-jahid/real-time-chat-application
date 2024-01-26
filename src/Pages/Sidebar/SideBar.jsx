import React, { createRef, useState } from 'react'
import profileIcon from '../../assets/profile-icon.png'
import { AiOutlineHome } from 'react-icons/ai'
import { AiFillMessage } from 'react-icons/ai'
import { BsBell, BsCloudUpload } from 'react-icons/bs'
import { RxCross1 } from 'react-icons/rx'
import { FiSettings, FiLogOut } from 'react-icons/fi'
import { getAuth, updateProfile } from "firebase/auth";
import { Link, useNavigate } from 'react-router-dom'
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import { getDownloadURL, getStorage, ref, uploadString } from "firebase/storage";
import { useSelector } from 'react-redux'
import { update, ref as reff, getDatabase } from 'firebase/database'


const SideBar = ({ active }) => {
  const auth = getAuth();
  const db = getDatabase();
  const navigate = useNavigate()
  const data = useSelector(state => state.userLoginInfo.userInfo);
  // console.log(data, 'okk');
  const [profile, setProfile] = useState(false)
  const [cancel, setCancel] = useState(false)
  // React crropper
  const [image, setImage] = useState('');
  const [cropData, setCropData] = useState('');
  const cropperRef = createRef();
  // React crropper

  const [newImg, setNewImg] = useState('')

  // const handelLogOut = ()=>{
  //   signOut(auth).then(() => {
  //     setTimeout(()=>{
  //       navigate('/login')
  //     },2000)
  //   }).catch((error) => {
  //     console.log(error.code);
  //   });
  // }
  const handelProfile = () => {
    setProfile(true)
  }

  const cancelProfile = () => {
    setCancel(true)
  }

  const newProfile = (e) => {
    e.preventDefault();
    console.log(e.target.files);
    let files;
    if (e.dataTransfer) {
      files = e.dataTransfer.files;
    } else if (e.target) {
      files = e.target.files;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(files[0]);
  };
  const getCropData = () => {
    // console.log('done');
    if (typeof cropperRef.current?.cropper !== "undefined") {
      setCropData(cropperRef.current?.cropper.getCroppedCanvas().toDataURL());
      const message4 = cropperRef.current?.cropper.getCroppedCanvas().toDataURL();
      const storage = getStorage();
      const storageRef = ref(storage, auth.currentUser.uid);
      uploadString(storageRef, message4, 'data_url').then(() => {
        getDownloadURL(storageRef).then((downloadURL) => {
          setNewImg('File available at', downloadURL);
          updateProfile(auth.currentUser, {
            // displayName: name,
            photoURL: downloadURL
          }).then(() => {
            update(reff(db, 'users/' + data.uid), {
              img: downloadURL
            });

            setProfile(false)
          })
          console.log('File available at', downloadURL);
        })
      });
    }
  };



  // const [show, setshow] = useState(false)
  // const handllogout = () => {
  //   setshow(!show)
  // }



  return (
    <>
      {
        profile ?
          <>
            {
              cancel ?
                <SideBar />
                :
                <div className='bg-[#EEEAEA] h-screen w-full fixed top-0 left-0 z-[1] overflow-hidden'>
                  <div className='h-[400px] w-full bg-[#5F35F5] flex justify-center items-center'>
                    <div className='bg-white py-[40px] pl-[90px] pr-[100px] rounded-lg text-center mt-[400px] relative'>
                      <RxCross1 onClick={cancelProfile} className='text-red-600 text-[40px] font-bold absolute top-[30px] right-[30px] cursor-pointer' />
                      <img className='w-[15%] h-[15%]' src={profileIcon} alt="" />
                      <h3 className='font-open font-bold text-[30px] text-[#11175D] mb-[10px]'>Upload Your Profile</h3>
                      <div className='flex justify-between'>
                        <input onChange={newProfile} className='py-[15px] px-[10px] border-[2px] border-bg[#EAEAF1] font-nunito font-semibold text-[18px] text-[#362d8d] outline-none bg-none mt-[30px] mb-[60px] w-[300px] m-start mr-[30px]' type='file' placeholder='' />
                        {
                          image ?
                            <div className='w-[100px] h-[100px] overflow-hidden rounded-full'>
                              <div
                                className="img-preview"
                                style={{ width: "100%", float: "left", height: "300px" }}>
                              </div>
                            </div>
                            :
                            <div>
                              <img className='w-[100px] h-[100px] overflow-hidden rounded-full' src={data.photoURL} alt="" />
                            </div>
                        }
                      </div>
                      {
                        image &&
                        <Cropper
                          ref={cropperRef}
                          style={{ height: 300, width: "50%" }}
                          zoomTo={0.5}
                          initialAspectRatio={1}
                          preview=".img-preview"
                          src={image}
                          viewMode={1}
                          minCropBoxHeight={10}
                          minCropBoxWidth={10}
                          background={false}
                          responsive={true}
                          autoCropArea={1}
                          checkOrientation={false}
                          guides={true}
                        />


                      }
                      <button onClick={getCropData} className='bg-[#32b42d] font-nunito font-semibold text-[20px] text-[#fff] block w-[300px] py-[5px] mt-[20px] ml-[100px] rounded-lg'>Upload</button>
                    </div>
                  </div>
                </div>
            }

          </>
          :
          <div className='w-[186px] bg-primary rounded-[10px]'>
            <div className='flex justify-center mt-[38px] w-[100px] h-[100px] m-auto rounded-full relative group'>
              <img className='w-full h-full rounded-full' src={data?.photoURL} alt="" />
              <div className='flex justify-between'></div>
              <div className='w-0 h-full bg-[rgba(0,0,0,0.40)] absolute top-0 left-0 rounded-full group-hover:w-full flex justify-center items-center'>
                <BsCloudUpload onClick={handelProfile} className='text-[25px] text-white cursor-pointer' />
              </div>
            </div>
            <h3 className='font-open font-bold text-[24px] text-[#fff] text-center pt-[20px] block'>{data.displayName}</h3>
            <p className='font-open font-bold text-[8px] text-[#fff] text-center pt-[px] px-[30px] block'>{data.email}</p>

            <div className='flex justify-end mt-[30px]' >
              <div className={`flex justify-center ${active == 'home' ? 'bg-white' : 'bg-primary'} w-[140px] py-[20px] rounded-tl-2xl rounded-bl-2xl after:absolute after:content-[""] after:top-[0] after:right-[0] after:w-[10px] after:h-full ${active == 'home' ? 'after:bg-primary' : 'after:bg-white'}  after:rounded-tl-lg after:rounded-bl-lg relative ${active == 'home' ? 'text-primary' : 'text-white'}`}>


                <Link to='/home'>
                  <AiOutlineHome className='text-[35px] mr-[20px] ' />
                </Link>


              </div>
            </div>
            <div className='flex justify-end mt-[20px]' >
              <div className={`flex justify-center ${active == 'massage' ? 'bg-white' : 'bg-primary'} w-[140px] py-[20px] rounded-tl-2xl rounded-bl-2xl after:absolute after:content-[""] after:top-[0] after:right-[0] after:w-[10px] after:h-full ${active == 'massage' ? 'after:bg-primary' : 'after:bg-white'}  after:rounded-tl-lg after:rounded-bl-lg relative ${active == 'massage' ? 'text-primary' : 'text-white'}`}>


                <Link to='/massage'>
                  <AiFillMessage className='text-[35px] mr-[20px]' />
                </Link>


              </div>
            </div>
            <div className='flex justify-end mt-[20px]' >
              <div className={`flex justify-center ${active == 'notification' ? 'bg-white' : 'bg-primary'} w-[140px] py-[20px] rounded-tl-2xl rounded-bl-2xl after:absolute after:content-[""] after:top-[0] after:right-[0] after:w-[10px] after:h-full ${active == 'notification' ? 'after:bg-primary' : 'after:bg-white'}  after:rounded-tl-lg after:rounded-bl-lg relative ${active == 'notification' ? 'text-primary' : 'text-white'}`}>

                <Link to='/notification'>
                  <BsBell className='text-[35px] mr-[20px] ' />
                </Link>

              </div>
            </div>
            <div className='flex justify-end mt-[20px]' >
              <div className={`flex justify-center ${active == 'settings' ? 'bg-white' : 'bg-primary'} w-[140px] py-[20px] rounded-tl-2xl rounded-bl-2xl after:absolute after:content-[""] after:top-[0] after:right-[0] after:w-[10px] after:h-full ${active == 'settings' ? 'after:bg-primary' : 'after:bg-white'}  after:rounded-tl-lg after:rounded-bl-lg relative ${active == 'settings' ? 'text-primary' : 'text-white'}`}>

                <Link to='/settings'>
                  <FiSettings className='text-[35px] mr-[20px]' />
                </Link>

              </div>
            </div>
            <div>
              <div className='flex justify-center mt-[50px]'>

                <Link to='/pop'><FiLogOut className='text-[35px] text-white cursor-pointer' /></Link>


                {/* {
                  show ? 
                  <Pop></Pop>
                    :
                    <FiLogOut onClick={handllogout} className='text-[35px] text-white cursor-pointer' />
                } */}

                {/* <FiLogOut onClick={handelLogOut} className='text-[35px] text-white cursor-pointer'/> */}

              </div>
            </div>
          </div>
      }

    </>
  )
}

export default SideBar