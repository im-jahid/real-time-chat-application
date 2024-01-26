import React, { useEffect, useState } from 'react'
import { BiDotsVerticalRounded } from 'react-icons/bi'
import requestOne from '../../assets/request1.png'
import { getDatabase, push, remove, set } from 'firebase/database'
import { ref, onValue } from "firebase/database";
import { useDispatch, useSelector } from 'react-redux';
import { activeChatInfo } from '../../slices/chatSlice';

const Friends = () => {
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

    const handleBlock = (item) => {
        if (data.uid == item.senderid) {
            // arr.push({ ...item.val(), id: item.key });
            set(push(ref(db, 'block/')),  {
                block: item.receivername,
                blockemail: item.receiveremail,
                blockid: item.receiverid,
                blockimg: item.receiverimg,
                blockby: item.sendername,
                blockbyemail: item.senderemail,
                blockbyid: item.senderid,
                blockbyimg: item.senderimg,
            }).then(()=> {
                remove(ref(db, 'friend/' + item.key))
            })
        } else {
            set(push(ref(db, 'block/')), {
                block: item.sendername,
                blockemail: item.senderemail,
                blockid: item.senderid,
                blockimg: item.senderimg,
                blockby: item.receivername,
                blockbyemail: item.receiveremail,
                blockbyid: item.receiverid,
                blockbyimg: item.receiverimg,
            }).then(()=> {
                remove(ref(db, 'friend/' + item.key))
            })
        }

    }

    useEffect(() => {
        const blockRef = ref(db, 'block/');
        onValue(blockRef, (snapshot) => {
            let arr = []
            snapshot.forEach((item) => {
                console.log(item.val());
                if (item.val().blockbyid == data.uid) {
                    arr.push({
                        block: item.val().block,
                        blockid: item.val().blockid,
                        blockemail: item.val().blockemail,
                    })
                } else {
                    arr.push({
                        blockby: item.val().blockby,
                        blockbyid: item.val().blockbyid,
                        blockbyemail: item.val().blockbyemail,
                    })
                }

            })
            setblocklist(arr)
        });
    }, [])



    const handleMsgData = (item)=>{
        console.log(item, 'okkkkkkkkkkkk');
        if(data.uid == item.receiverid){
            dispatch(activeChatInfo({
                id: item.senderid,
                chatname: item.sendername,
                email: item.senderemail,
                photo: item.senderimg,
            }))
        }else{
            dispatch(activeChatInfo({
                id: item.receiverid,
                chatname: item.receivername,
                email: item.receiveremail,
                photo: item.receiverimg,
            }))
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
                                    <img className='w-[60px] h-[60px] mr-[10px] rounded-full' src={item.receiverid == data.uid ? item.senderimg : item.receiverimg} alt="" />

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
                                <button onClick={()=> handleBlock(item)} className='text-[20px] font-Poppins font-semibold text-[#fff] bg-primary px-[12px] rounded-lg mr-[10px]'>Block</button>
                            </div>

                        ))
                    }

                </div>
            </div>
        </div>
    )
}

export default Friends