import React, { createRef, useState } from 'react'
import profileIcon from '../../assets/profile-icon.png'
import { useNavigate } from 'react-router-dom'
import {RxCross1} from 'react-icons/rx'
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import {getDownloadURL, getStorage, ref, uploadString } from "firebase/storage";
const UploadProfile = () => {
const navigate = useNavigate()
const [cancel, setCancel] = useState(false)
  // React crropper
  const [image, setImage] = useState('');
  const [cropData, setCropData] = useState('');
  const cropperRef = createRef();
  // React crropper
//   const [newImg, setNewImg] = useState('')
  const storage = getStorage();
const storageRef = ref(storage, 'some-child');

const cancelProfile = ()=>{
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
    uploadString(storageRef, message4, 'data_url').then(() => {
        getDownloadURL(storageRef).then((downloadURL) => {
            console.log('File available at', downloadURL);
          });
});
    }
  };
  return (
    <>
     {
        cancel ?
        navigate('/home')
        :
        <div className='bg-[#EEEAEA] h-screen w-full overflow-hidden'>  
    <div className='h-[400px] w-full bg-[#5F35F5] flex justify-center items-center'>
      <div className='bg-white py-[40px] pl-[90px] pr-[100px] rounded-lg text-center mt-[400px] relative'>
        <RxCross1 onClick={cancelProfile}  className='text-red-600 text-[40px] font-bold absolute top-[30px] right-[30px] cursor-pointer'/>
        <img className='w-[15%] h-[15%]' src={profileIcon} alt="" />
          <h3 className='font-open font-bold text-[30px] text-[#11175D] mb-[10px]'>Upload Your Profile</h3>
         <div className='flex justify-between'>
         <input onChange={newProfile}  className='py-[15px] px-[10px] border-[2px] border-bg[#EAEAF1] font-nunito font-semibold text-[18px] text-[#362d8d] outline-none bg-none mt-[30px] mb-[60px] w-[300px] m-start' type='file' placeholder='' />
         <div className='w-[150px] h-[150px] overflow-hidden rounded-full'>
         <div
            className="img-preview"
            style={{ width: "100%", float: "left", height: "300px" }}>
        </div>
         </div>
         </div>
          <div className='overflow-hidden'>
          <Cropper
          ref={cropperRef}
          style={{ height: 300, width: "70%" }}
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
          checkOrientation={false} // https://github.com/fengyuanchen/cropperjs/issues/671
          guides={true}
        />
          </div>
          <button onClick={getCropData} className='bg-[#32b42d] font-nunito font-semibold text-[20px] text-[#fff] block w-[300px] py-[5px] mt-[20px] ml-[100px] rounded-lg'>Upload</button>
      </div>
    </div>
    </div>
     }
    
    </>
  )
}

export default UploadProfile