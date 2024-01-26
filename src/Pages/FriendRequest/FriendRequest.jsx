import React, { useEffect, useState } from 'react'
import { BiDotsVerticalRounded } from 'react-icons/bi'
import requestOne from '../../assets/request1.png'
import { getDatabase, push, remove, set } from 'firebase/database'
import { ref, onValue } from "firebase/database";
import { useSelector } from 'react-redux';



const FriendRequest = () => {


    const db = getDatabase();
    const data = useSelector(state => state.userLoginInfo.userInfo);

    const [friendrequest, setFriendrequest] = useState([])

    useEffect(() => {
        const friendrequestRef = ref(db, 'friendrequest/');
        onValue(friendrequestRef, (snapshot) => {
            let arr = []
            snapshot.forEach((item) => {
                console.log(item.val(), 'hxdfhxdfh')
                if (item.val().receiverid == data.uid) {
                    arr.push({ ...item.val(), id: item.key });
                }
            })
            setFriendrequest(arr)

        });
    }, [])
    

    console.log(friendrequest, 'frieeeeeeeeee');
    
    const handleAccept = (item) =>{
        console.log('ok cooooool', item);
        set(push(ref(db, 'friend/')), {
            ...item
        }).then(() => {
            remove(ref(db, '/friendrequest'))
        })
    }


    const [Userlists, setUserlists] = useState([])
    useEffect(() => {
      const userRef = ref(db, 'users/');
      onValue(userRef, (snapshot) => {
        let arr = []
        snapshot.forEach(item => {
          if (item.key != data.uid) {
  
            arr.push({ ...item.val(), userid: item.key });
          }
        })
        setUserlists(arr)
      });
  
    }, [])
    console.log(Userlists);


    return (
        <div className='mt-[5px] ml-[13px]'>
            <div className=' shadow-box rounded-[20px]'>
                <div className='flex justify-between pl-[20px] pb-[10px] pt-[13px] mt-[20px]'>
                    <h3 className='text-[20px] font-Poppins font-semibold text-[#000]'>Friend  Request</h3>
                    <BiDotsVerticalRounded className='text-[25px] text-primary mr-[10px]' />
                </div>
                <div className='ml-[25px] h-[290px] overflow-y-scroll relative'>


                    {
                        friendrequest.length == 0 ?
                        <p className='absolute top-[40%] left-[15%] font-poppins font-semibold text-red-500 text-center'>There are currently no friendrequest</p>
                        :
                        friendrequest.map((item) => (
                            <div className='flex justify-between items-center pb-[28px] mt-[17px] border-b'>
                                <div className='flex items-center'>
                                    <img className='w-[60px] h-[60px] mr-[10px] rounded-full' src={item.senderimg} alt="" />
                                    <div>
                                        <h3 className='text-[18px] font-poppins font-semibold text-[#000]'>{item.sendername}</h3>
                                        <p className='text-[10px] font-poppins font-medium text-[#000]'>{item.senderemail}</p>
                                    </div>
                                </div>
                                <button onClick={() => handleAccept(item)} className='text-[20px] font-Poppins font-semibold text-[#fff] bg-primary px-[12px] rounded-lg mr-[10px]'>Accept</button>
                            </div>
                        ))
                    }


                </div>
            </div>
        </div>
    )
}

export default FriendRequest