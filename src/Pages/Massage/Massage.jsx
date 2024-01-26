import React, { useEffect, useState } from 'react'
import SideBar from '../Sidebar/SideBar'
import GroupList from '../GroupList/GroupList'
import MsgFriend from '../MsgFriend/MsgFriend'
import jahid from '../../assets/j.jpg'
import { BiDotsVerticalRounded } from 'react-icons/bi'
import { IoIosSend } from "react-icons/io";
import { MdOutlineEmojiEmotions } from "react-icons/md";
import { IoIosCamera } from "react-icons/io";
import { TbTriangleFilled, TbTriangles } from "react-icons/tb";
import ModalImage from "react-modal-image";
import { useSelector } from 'react-redux';
import { getDatabase, push, set, ref, onValue } from 'firebase/database'
import moment from 'moment/moment';



const Massage = () => {


  const db = getDatabase();
  let data = useSelector((state) => state.userLoginInfo.userInfo)
  const chatData = useSelector((state) => state.activeChatInfo.chatInfo)
  // console.log(chatData);
  
  const [msg, setMsg] = useState('')
  const [singleMsg, setsingleMsg] = useState([])
  let [msgerr, setmsgerr] = useState('')
  



  useEffect(() => {
    const singlemsgRef = ref(db, 'singleMsg/');
    onValue(singlemsgRef, (snapshot) => {
      let arr = []
      snapshot.forEach((item) => {
        if (
          (item.val().whosenderid == data.uid && item.val().whoreciverid == chatData.id)
          || (item.val().whoreciverid == data.uid && item.val().whosenderid == chatData.id)
        ) {
          arr.push(item.val());
        }
      })
      setsingleMsg(arr)
    });
  }, [])
  

  let handleMsg = (e) => {
    setMsg(e.target.value)
    setmsgerr('')
  }

  const handleMsgSend = () => {
    if (!msg) {
      msgerr('msg Is Required')
    }
    if (chatData.status == 'single') {
      set(push(ref(db, "singleMsg/")), {
        msg: msg,
        whosendername: data.displayName,
        whosenderid: data.uid,
        whosenderemail: data.email,
        whosenderimg: data.photoURL,
        whoreciverid: chatData.id,
        whorecivername: chatData.chatname,
        whoreciveremail: chatData.email,
        whoreciverimg: chatData.photo,
        date: `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()} ${new Date().getHours()} ${new Date().getMinutes()}`
      }).then(() => {
        setMsg('')
        console.log('msg send done');
      })
    } else {
      console.log('ami group');
    }
  }



  return (
    <div>
      <>
        <div className='flex justify-between p-[50px] '>
          <SideBar active='massage' />
          <div className=''>
            <GroupList />
            <MsgFriend />
          </div>
          <div className='w-[905px] px-[40px] shadow-box py-[20px] rounded-lg mt-[10px] bg-[#fff]'>
            {/* MASSAGE HEADER START */}
            <div className='flex justify-between items-center pb-[18px] mt-[7px] border-b'>
              <div className='flex items-center'>
                <img className='w-[70px] h-[70px] mr-[30px] rounded-full' src={chatData.photo} alt="" />
                <div>
                  <h3 className='text-[24px] font-poppins font-bold text-[#000]'> {chatData.chatname}</h3>
                  {/* <h3 className='text-[24px] font-poppins font-bold text-[#000]'> Swati</h3> */}
                  <p className='text-[13px] font-poppins font-medium text-[#4D4D4D]'> {chatData.email}</p>
                </div>
              </div>
              <BiDotsVerticalRounded className='text-[25px] text-primary mr-[10px]' />
            </div>
            {/* MASSAGE HEADER END */}


            <div className="overflow-y-scroll h-[490px] w-full border-b ">


            {
              singleMsg.map((item)=>(
                item.whosenderid == data.uid ?
              <div className="text-end mr-[10px] mt-[10px] ml-[110px]">
                <div className="flex text-start justify-end mr-[5px] relative">
                  <div className="bg-primary text-white rounded-lg py-[13px] px-[40px] ">{item.msg}</div>
                  <TbTriangleFilled className='text-primary absolute bottom-[-2px] right-[-6px]' />
                </div>
                  <p className='mr-[10px] text-[#A6ACAF]'>{moment(item.date, "YYYYMMDD hhmm").fromNow()}</p>

                {/* <div className="mt-2 ml-[385px]">
                  <div className="w-[300px] rounded-lg items-center mt-[10px] mb-[10px]">
                    <ModalImage
                      small={jahid}
                      large={jahid}
                      alt="Hello World!"
                      className='p-3 rounded-[20px] bg-primary'
                    />
                  </div>
                </div> */}

              </div>
              :
              <div className="text-start ml-[5px] mt-[10px] mr-[110px]">
                <div className="flex justify-start ml-[5px]  relative">
                  <div className=" bg-[#f1f1f1] rounded-lg py-[13px] px-[40px] ">{item.msg}</div>
                  <TbTriangleFilled className='text-[#f1f1f1] absolute bottom-[-2px] left-[-6px]' />
                </div>
                  <p className='ml-[10px] text-[#A6ACAF]'>{moment(item.date, "YYYYMMDD hhmm").fromNow()}</p>
                
                {/* <div className="mt-2">
                  <div className="w-[300px] rounded-lg items-center mt-[10px]">
                    <ModalImage
                      small={jahid}
                      large={jahid}
                      alt="Hello World!"
                      className='p-3 rounded-[20px] bg-[#f1f1f1]'
                    />
                  </div>
                </div> */}

              </div>
              ))
            }


           

            </div>



            {/* MASSAGE BAR START */}

            <div className="flex relative">
              <input
                onChange={handleMsg}
                className='w-full mt-[25px] p-3 bg-[#f1f1f1] rounded-lg border-none' type="text" />
              <div className="flex text-[25px] absolute top-[40px] mr-[10px] right-[80px] ">
                <MdOutlineEmojiEmotions className='mr-[10px]' />
                <IoIosCamera className='' />
              </div>
              <button
                onClick={handleMsgSend}
                className='p-3 bg-primary rounded-lg text-white ml-[15px]  mt-[25px] text-[20px]'>
                {/* <IoIosSend /> */}
                send
              </button>
            </div>

            {/* MASSAGE BAR END */}

          </div>
        </div>
      </>
    </div>
  )
}

export default Massage