import React, { useEffect, useState } from 'react'
import { BiDotsVerticalRounded } from 'react-icons/bi'
import { getDatabase, push, remove, set } from 'firebase/database'
import { ref, onValue } from "firebase/database";
import { useDispatch, useSelector } from 'react-redux';
import { activeChatInfo } from '../../slices/chatSlice';

const MsgFriend = () => {
    const db = getDatabase();
    const data = useSelector(state => state.userLoginInfo.userInfo);
    const dispatch = useDispatch()
    const [Friend, setFriend] = useState([])

    useEffect(() => {
        const friendRef = ref(db, 'friend/');
        onValue(friendRef, (snapshot) => {
            let arr = []
            snapshot.forEach((item) => {
                if (item.val().receiverid == data.uid || item.val().senderid == data.uid) {
                    arr.push({...item.val(), key:item.key});
                }
            })
            setFriend(arr)
        });
    }, [])



    const handleMsgData = (item)=>{
        // console.log(item, 'okkkkkkkkkkkk');
        if(data.uid == item.receiverid){
            dispatch(activeChatInfo({
                status: 'single',
                id: item.senderid,
                chatname: item.sendername,
                email: item.senderemail,
                photo: item.senderimg,
            }))
            // localStorage.setItem('activeChatInfo', JSON.stringify((item)))
        }else{
            dispatch(activeChatInfo({
                status: 'single',
                id: item.receiverid,
                chatname: item.receivername,
                email: item.receiveremail,
                photo: item.receiverimg,
            }))
            // localStorage.setItem('activeChatInfo', JSON.stringify((item)))
        }
    }

    


    return (
        <div className='ml-[13px] w-[430px]'>
            <div className=' shadow-box rounded-[20px]'>
                <div className='flex justify-between pl-[20px] pb-[5px] pt-[13px]'>
                    <h3 className='text-[20px] font-Poppins font-semibold text-[#000]'>Friends</h3>
                    <BiDotsVerticalRounded className='text-[25px] text-primary mr-[10px]' />
                </div>
                <div className='ml-[25px] overflow-y-scroll h-[310px] relative'>
                    {
                        Friend.length == 0 ?
                        <p className='absolute top-[40%] left-[15%] font-poppins font-semibold text-red-500 text-center'>There are currently no FRIENDS</p>
                        :
                        Friend.map((item)=> (
                            <div onClick={() => handleMsgData(item)} className='flex justify-between items-center pb-[28px] mt-[17px] border-b'>
                                <div className='flex items-center'>
                                    <img className='w-[60px] h-[60px] mr-[30px] rounded-full' src={item.receiverid == data.uid ? item.senderimg : item.receiverimg} alt="" />

                                    <div>
                                        <h3 className='text-[14px] font-poppins font-semibold text-[#000]'>
                                            {
                                                item.receiverid == data.uid ? item.sendername : item.receivername
                                            }
                                        </h3>
                                        <p className='text-[13px] font-poppins font-medium text-[#4D4D4D]'>
                                            {
                                                item.receiverid == data.uid ? item.senderemail : item.receiveremail
                                            }
                                        </p>
                                    </div>
                                </div>
                            </div>

                        ))
                    }

                </div>
            </div>
        </div>
    )
}

export default MsgFriend