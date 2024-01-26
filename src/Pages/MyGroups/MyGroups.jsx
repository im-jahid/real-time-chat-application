import React, { useEffect } from 'react'
import { BiDotsVerticalRounded } from 'react-icons/bi'
import requestOne from '../../assets/request1.png'
import { useState } from 'react'
import { getDatabase, onValue, ref } from 'firebase/database'
import { useSelector } from 'react-redux'


const MyGroups = () => {

  const db = getDatabase();
  const data = useSelector(state => state.userLoginInfo.userInfo);
  const [mygroup, setmygroup] = useState([])

  useEffect(() => {
    const mygroupRef = ref(db, 'group/');
    onValue(mygroupRef, (snapshot) => {
      let arr = []
      snapshot.forEach((item) => {
        console.log(item.val(), 'hxdfhxdfh')
       if( item.val().adminid == data.uid){
        arr.push(item.val());
       }
      })
      setmygroup(arr)
    });
  }, [])



  return (
    <div className='mt-[5px] ml-[13px] w-[430px]'>
      <div className='shadow-box rounded-[20px]'>
        <div className='flex justify-between pl-[20px] pb-[10px] pt-[13px] mt-[20px]'>
          <h3 className='text-[20px] font-Poppins font-semibold text-[#000]'>My Groups</h3>
          <BiDotsVerticalRounded className='text-[25px] text-primary mr-[10px]' />
        </div>
        <div className='ml-[25px] overflow-y-scroll h-[290px] relative'>


          {
            mygroup.length == 0 ?
            <p className='absolute top-[40%] left-[15%] font-poppins font-semibold text-red-500 text-center'>There are currently no GROUPS</p>
            :
            mygroup.map((item) => (
              <div className='flex justify-between items-center pb-[28px] mt-[17px] border-b'>
                <div className='flex items-center'>
                  <img className='w-[60px] h-[60px] mr-[10px]' src={requestOne} alt="" />
                  <div>
                    <span className="text-sm">Admin by {item.adminname}</span>
                    <h3 className='text-[14px] font-poppins font-semibold text-[#000]'>{item.groupname}</h3>
                    <p className='text-[12px] font-poppins font-medium text-[#4D4D4D]'>{item.grouptagname}</p>
                  </div>
                </div>
                <p className='text-[10px] font-poppins font-medium text-time mr-[10px]'>Today, 8:56pm</p>
              </div>
            ))
          }


        </div>
      </div>
    </div>
  )
}

export default MyGroups