import React, { useEffect, useState } from 'react'
import { BiDotsVerticalRounded } from 'react-icons/bi'
import requestOne from '../../assets/request1.png'
import { getDatabase, ref, onValue, set, push } from "firebase/database";
import { useSelector } from 'react-redux'


const UserList = () => {

  const data = useSelector(state => state.userLoginInfo.userInfo);
  console.log(data, 'dattttttttttttta');

  const [Friendlist, setFriendlist] = useState([])

  const [blocklists, setblocklists] = useState([])

  const [friendrequestList, setFriendrequestList] = useState([])

  const db = getDatabase();
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


  const handleFriendRequest = (item) => {
    console.log('ok', item);
    set(push(ref(db, 'friendrequest/')), {
      sendername: data.displayName,
      senderemail: data.email,
      senderid: data.uid,
      senderimg: data.photoURL,
      // senderimg: data.img,
      receivername: item.username,
      receiveremail: item.email,
      receiverid: item.userid,
      receiverimg: item.img,
      // receiverphoto: item.photoURL
    });
  }

  useEffect(() => {
    const friendrequestRef = ref(db, 'friendrequest/');
    onValue(friendrequestRef, (snapshot) => {
      let arr = []
      snapshot.forEach((item) => {
        if (item.key != data.uid) {
          console.log(item.val());
          arr.push(item.val().receiverid + item.val().senderid);
        }
      })
      setFriendrequestList(arr)

    });
  }, [])
  console.log(friendrequestList);

  useEffect(() => {
    const friendRef = ref(db, 'friend/');
    onValue(friendRef, (snapshot) => {
      let arr = []
      snapshot.forEach((item) => {
        arr.push(item.val().receiverid + item.val().senderid);
      })
      setFriendlist(arr)
    });
  }, [])


  useEffect(() => {
    const blocklistsRef = ref(db, 'block/');
    onValue(blocklistsRef, (snapshot) => {
      let arr = []
      snapshot.forEach((item) => {
        console.log(item.val());
        arr.push(item.val().blockid + item.val().blockbyid);
      })
      setblocklists(arr)
    });
  }, [])





  return (
    <div className='ml-[13px] w-[430px]'>
      <div className='shadow-box rounded-[20px]'>
        <div className='flex justify-between pl-[20px] pb-[10px] pt-[7px]'>
          <h3 className='text-[20px] font-Poppins font-semibold text-[#000]'>User List</h3>
          <BiDotsVerticalRounded className='text-[25px] text-primary mr-[10px]' />
        </div>
        <div className='ml-[25px] overflow-y-scroll h-[310px]'>

          {
            Userlists.map((item) => (
              <div className='flex justify-between items-center pb-[28px] mt-[17px] border-b'>
                <div className='flex items-center'>
                  <img className='w-[60px] h-[60px] mr-[10px] rounded-full' src={item.img} alt="" />
                  <div>
                    <h3 className='text-[14px] font-poppins font-semibold text-[#000]'>{item.username}</h3>
                    <p className='text-[10px] font-poppins font-medium text-[#4D4D4D]'>{item.email}</p>
                  </div>
                </div>


                {
                  blocklists.includes(data.uid + item.userid) ||
                    blocklists.includes(item.userid + data.uid)
                    ?
                    <button className='text-[20px] font-Poppins font-black text-[#fff] bg-primary px-[8px] rounded-lg mr-[10px]'>blocked</button>
                    :
                    Friendlist.includes(data.uid + item.userid) ||
                      Friendlist.includes(item.userid + data.uid)
                      ?
                      <button  className='text-[20px] font-Poppins font-black text-[#fff] bg-primary px-[8px] rounded-lg mr-[10px]'>Fridend</button>
                      :
                      friendrequestList.includes(data.uid + item.userid) ||
                        friendrequestList.includes(item.userid + data.uid)
                        ?
                        <button className='text-[20px] font-Poppins font-black text-[#fff] bg-primary px-[8px] rounded-lg mr-[10px]'>Requested</button>
                        :
                        <button onClick={() => handleFriendRequest(item)} className='text-[20px] font-Poppins font-black text-[#fff] bg-primary px-[8px] rounded-lg mr-[10px]'>Add Friend</button>
                }

              </div>
            ))
          }


        </div>
      </div>
    </div>
  )
}

export default UserList