import React, { useEffect, useState } from 'react'
import { BiDotsVerticalRounded } from 'react-icons/bi'
import requestOne from '../../assets/request1.png'
import { getDatabase, push, remove, set } from 'firebase/database'
import { ref, onValue } from "firebase/database";
import { useSelector } from 'react-redux';

const BlockedUser = () => {
    const db = getDatabase();
    const data = useSelector(state => state.userLoginInfo.userInfo);
    const [blocklist, setblocklist] = useState([])

    useEffect(() => {
        const blockRef = ref(db, 'block/');
        onValue(blockRef, (snapshot) => {
            let arr = []
            snapshot.forEach((item) => {
                console.log(item.val());
                if (item.val().blockbyid == data.uid) {
                    arr.push({
                        id: item.key,
                        block: item.val().block,
                        blockid: item.val().blockid,
                        blockemail: item.val().blockemail,
                        blockimg: item.val().blockimg,
                    })
                } else {
                    arr.push({
                        id: item.key,
                        blockby: item.val().blockby,
                        blockbyid: item.val().blockbyid,
                        blockbyemail: item.val().blockbyemail,
                        blockbyimg: item.val().blockbyimg,
                    })
                }

            })
            setblocklist(arr)
        });
    }, [])

    const handleunblock = (item) => {
        console.log('ok cooooool', item);
        set(push(ref(db, 'friend/')), {
            sendername: item.block,
            senderid: item.blockid,
            senderemail: item.blockemail,
            receivername: data.displayName,
            receiverid: data.uid,
            receiveremail: data.email,
        }).then(() => {
            remove(ref(db, 'block/' + item.id))
        })
    }

    return (
        <div className='ml-[13px] w-[430px]'>
            <div className=' shadow-box rounded-[20px]'>
                <div className='flex justify-between pl-[20px] pb-[10px] pt-[13px] mt-[20px]'>
                    <h3 className='text-[20px] font-Poppins font-semibold text-[#000]'>Blocked Users</h3>
                    <BiDotsVerticalRounded className='text-[25px] text-primary mr-[10px]' />
                </div>
                <div className='ml-[25px] overflow-y-scroll h-[290px] relative'>


                    {
                        blocklist.length == 0 ?
                            <p className='absolute top-[40%] left-[10%] font-poppins font-semibold text-red-500 text-center'>There are currently no blocked users</p>
                            :
                            blocklist.map((item) => (
                                <div className='flex justify-between items-center pb-[28px] mt-[17px] border-b'>
                                    <div className='flex items-center'>
                                        
                                        {/* <img className='w-[60px] h-[60px] mr-[10px]' src={item.blockimg} alt="" />
                                        <img className='w-[60px] h-[60px] mr-[10px]' src={item.blockbyimg} alt="" /> */}

                                        <img className='w-[60px] h-[60px] mr-[10px] rounded-full' src=

                                            {item.blockid == data.uid ? item.blockimg :
                                                item.blockbyimg}

                                            alt="" />

                                        <div>
                                            <h3 className='text-[14px] font-poppins font-semibold text-[#000]'>{item.block}</h3>
                                            <h3 className='text-[14px] font-poppins font-semibold text-[#000]'>{item.blockby}</h3>
                                            <p className='text-[10px] font-poppins font-medium text-[#4D4D4D]'>{item.blockemail}</p>
                                            <p className='text-[10px] font-poppins font-medium text-[#4D4D4D]'>{item.blockbyemail}</p>
                                            {/* <p className='text-[10px] font-poppins font-medium text-[#4D4D4D]'>{item.blockemail}</p>
                                        <p className='text-[10px] font-poppins font-medium text-[#4D4D4D]'>{item.blockbyemail}</p> */}
                                        </div>

                                    </div>

                                    {
                                        !item.blockbyid &&
                                        <button onClick={() => handleunblock(item)} className='text-[18px] font-Poppins font-semibold text-[#fff] bg-primary px-[8px] rounded-lg mr-[10px]'>unblock</button>
                                    }
                                    {
                                        !item.blockid &&
                                        <button className='text-[18px] font-Poppins font-semibold text-[#fff] bg-primary px-[8px] rounded-lg mr-[10px]'>block by {item.blockby}</button>

                                    }

                                </div>

                            ))
                    }


                </div>
            </div>
        </div>
    )
}

export default BlockedUser