import React, { useEffect, useState } from 'react'
import { BsSearch } from 'react-icons/bs'
import { BiDotsVerticalRounded, BiError } from 'react-icons/bi'
import groupImgOne from '../../assets/group-img1.png'
import { getDatabase, onValue, push, ref, remove, set } from 'firebase/database'
import { useSelector } from 'react-redux'
import requestOne from '../../assets/request1.png'


const GroupList = () => {

    const db = getDatabase();
    const data = useSelector(state => state.userLoginInfo.userInfo);
    const [show, setShow] = useState(false)
    const [groupname, setGroupname] = useState('')
    let [groupnameerr, setgroupnameerr] = useState('')
    const [grouptagname, setGrouptagname] = useState('')
    let [grouptagnameerr, setgrouptagnameerr] = useState('')

    const [searchlist, setsearchlist] = useState([])

    const handlesearch = (e) => {
        // console.log(e.target.value);
        let arr = []
        if (e.target.value.length == 0) {
            setsearchlist([])
        } else {
            Userlists.map((item) => {
                if ((item.username.toLowerCase().includes(e.target.value.toLowerCase()))) {
                    arr.push(item);
                    setsearchlist(arr)
                }
            })
        }

    }

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
    // console.log(friendrequest);

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
    // console.log(Userlists);


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
                    })
                } else {
                    arr.push({
                        id: item.key,
                        blockby: item.val().blockby,
                        blockbyid: item.val().blockbyid,
                        blockbyemail: item.val().blockbyemail,
                    })
                }

            })
            setblocklist(arr)
        });
    }, [])
    // console.log(blocklist);


    const [Friend, setFriend] = useState([])

    useEffect(() => {
        const friendRef = ref(db, 'friend/');
        onValue(friendRef, (snapshot) => {
            let arr = []
            snapshot.forEach((item) => {
                if (item.val().receiverid == data.uid || item.val().senderid == data.uid) {
                    arr.push({ ...item.val(), key: item.key });
                }
            })
            setFriend(arr)
        });
    }, [])
    // console.log(Friend);

    const [grouplist, setgrouplist] = useState([])
    useEffect(() => {
        const mygroupRef = ref(db, 'group/');
        onValue(mygroupRef, (snapshot) => {
            let arr = []
            snapshot.forEach((item) => {
                console.log(item.val(), 'hxdfhxdfh')
                if (item.val().adminid !== data.uid) {
                    arr.push(item.val());
                }
            })
            setgrouplist(arr)
        });
    }, [])

    const handleCreateGroupModal = () => {
        setShow(!show)
    }
    const handleCreateGroup = () => {
        console.log('tjxdth');
        set(push(ref(db, 'group/')), {
            adminid: data.uid,
            adminname: data.displayName,
            groupname: groupname,
            grouptagname: grouptagname
        }).then(() => {
            handleCreateGroupModal
        })
    }

    const handleGroupname = (e) => {
        setGroupname(e.target.value)
        setgroupnameerr('')
    }
    const handleGrouptagname = (e) => {
        setGrouptagname(e.target.value)
        setgrouptagnameerr('')
    }

    const handleFriendRequest = (item) => {
        // console.log('ok', item);
        set(push(ref(db, 'friendrequest/')), {
            sendername: data.displayName,
            senderemail: data.email,
            senderid: data.uid,
            senderimg: data.img,
            // senderphoto: data.photoURL,
            receivername: item.username,
            receiveremail: item.email,
            receiverid: item.userid,
            receiverimg: item.img,
            // receiverphoto: item.photoURL
        });
    }


    const [searchshow, setsearchshow] = useState(false)
    const handleuser = () => {
        setsearchshow(!searchshow)
    }


    return (
        <>
            <div className='mt-[5px] ml-[13px] '>

                {
                    searchshow ?
                        <div onClick={handleuser} className='relative w-[430px] shadow-box rounded-lg'>
                            <BsSearch className='absolute top-[15px] left-[30px] text-[25px] ' />
                            <input
                                type="search"
                                placeholder='Search user'
                                onChange={handlesearch}
                                className='text-[16px] font-medium w-full text-[#3D3D3D] font-poppins pt-[17px] pb-[15px] pl-[70px] pr-[40px] outline-none  rounded-[20px]' />
                            <BiDotsVerticalRounded className='absolute  top-[15px] right-[10px] text-[25px] text-primary' />
                            <div className="absolute top-[50px] left-[0px] bg-white z-10 w-full shadow-box rounded-b-lg h-[670px] overflow-y-scroll">
                                {
                                    searchlist.length > 0 ?
                                        searchlist.map((item) => (
                                            <div className='flex justify-between items-center pb-[28px] p-5 mt-[17px] border-b'>
                                                <div className='flex items-center'>
                                                    <img className='w-[60px] h-[60px] mr-[10px]' src={item.img} alt="" />
                                                    <div>
                                                        <h3 className='text-[14px] font-poppins font-semibold text-[#000]'>{item.username}</h3>
                                                        <p className='text-[10px] font-poppins font-medium text-[#4D4D4D]'>{item.email}</p>
                                                    </div>
                                                </div>

                                                {
                                                    blocklist.includes(data.uid + item.userid) ||
                                                        blocklist.includes(item.userid + data.uid)
                                                        ?
                                                        <button className='text-[20px] font-Poppins font-black text-[#fff] bg-primary px-[8px] rounded-lg mr-[10px]'>blocked</button>
                                                        :
                                                        Friend.includes(data.uid + item.userid) ||
                                                            Friend.includes(item.userid + data.uid)
                                                            ?
                                                            <button onClick={() => handleFriendRequest(item)} className='text-[20px] font-Poppins font-black text-[#fff] bg-primary px-[8px] rounded-lg mr-[10px]'>Fridend</button>
                                                            :
                                                            friendrequest.includes(data.uid + item.userid) ||
                                                                friendrequest.includes(item.userid + data.uid)
                                                                ?
                                                                <button className='text-[20px] font-Poppins font-black text-[#fff] bg-primary px-[8px] rounded-lg mr-[10px]'>Requested</button>
                                                                :
                                                                <button onClick={() => handleFriendRequest(item)} className='text-[20px] font-Poppins font-black text-[#fff] bg-primary px-[8px] rounded-lg mr-[10px]'>Add Friend</button>
                                                }
                                            </div>
                                        ))
                                        :
                                        Userlists.map((item) => (
                                            <div className='flex justify-between items-center pb-[28px] p-5 mt-[17px] border-b'>
                                                <div className='flex items-center'>
                                                    <img className='w-[60px] h-[60px] mr-[10px]' src={requestOne} alt="" />
                                                    <div>
                                                        <h3 className='text-[14px] font-poppins font-semibold text-[#000]'>{item.username}</h3>
                                                        <p className='text-[10px] font-poppins font-medium text-[#4D4D4D]'>{item.email}</p>
                                                    </div>
                                                </div>
                                                {
                                                    blocklist.includes(data.uid + item.userid) ||
                                                        blocklist.includes(item.userid + data.uid)
                                                        ?
                                                        <button className='text-[20px] font-Poppins font-black text-[#fff] bg-primary px-[8px] rounded-lg mr-[10px]'>blocked</button>
                                                        :
                                                        Friend.includes(data.uid + item.userid) ||
                                                            Friend.includes(item.userid + data.uid)
                                                            ?
                                                            <button onClick={() => handleFriendRequest(item)} className='text-[20px] font-Poppins font-black text-[#fff] bg-primary px-[8px] rounded-lg mr-[10px]'>Fridend</button>
                                                            :
                                                            friendrequest.includes(data.uid + item.userid) ||
                                                                friendrequest.includes(item.userid + data.uid)
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
                        :
                        <div onClick={handleuser} className='relative w-[430px]'>
                            <BsSearch className='absolute top-[15px] left-[30px] text-[25px] ' />
                            <input
                                type="search"
                                placeholder='Search user'
                                // value={input}
                                onChange={handlesearch}
                                className='text-[16px] font-medium w-full text-[#3D3D3D] font-poppins pt-[17px] pb-[15px] pl-[70px] pr-[40px] outline-none shadow-box rounded-[20px]' />
                            <BiDotsVerticalRounded className='absolute top-[15px] right-[10px] text-[25px] text-primary' />
                        </div>
                }


                <div className='shadow-box rounded-[20px] w-[430px]'>
                    <div className='flex justify-between pl-[20px] pb-[10px] pt-[13px] mt-[30px]'>
                        <h3 className='text-[20px] font-Poppins font-semibold text-[#000]'>Groups List</h3>
                        {/* <BiDotsVerticalRounded className='text-[25px] text-primary mr-[10px]' /> */}
                        {
                            show ? <button onClick={handleCreateGroupModal} className='text-[18px] font-Poppins font-bold p-1 text-[#fff] bg-red-400 px-[8px] rounded-lg mr-[20px]'>Cancel</button>
                                :
                                <button onClick={handleCreateGroupModal} className='text-[18px] font-Poppins font-bold p-1 text-[#fff] bg-primary px-[8px] rounded-lg mr-[20px]'>Create Group</button>
                        }
                    </div>


                    {
                        show ?

                            <div className="h-[210px] p-5 ">
                                <input onChange={handleGroupname} class="pl-2 outline-none w-full rounded-lg border-none bg-[#f1f1f1] mb-3 p-2" type="text" id="" placeholder="Group Name" />

                                {groupnameerr &&
                                    <BiError className='text-red-500 ml-[25px]' />
                                }

                                <input onChange={handleGrouptagname} class="pl-2 outline-none w-full rounded-lg border-none bg-[#f1f1f1] p-2 mb-4" type="text" id="" placeholder="Group Tag name" />
                                <button onClick={handleCreateGroup} className='bg-primary w-full rounded-lg text-center p-2 text-white font-Poppins'>Create Group</button>
                            </div>


                            :
                            <div className=' ml-[25px] h-[210px] overflow-y-scroll relative'>
                                <>
                                    {
                                        grouplist.map((item) => (
                                            <div className='flex justify-between items-center pb-[28px] mt-[13px] border-b'>
                                                <div className='flex items-center'>
                                                    <img className='w-[60px] h-[60px] mr-[10px]' src={groupImgOne} alt="" />
                                                    <div>
                                                        <span className="text-sm">Admin by {item.adminname}</span>
                                                        <h3 className='text-[14px] font-poppins font-semibold text-[#000]'>{item.groupname}</h3>
                                                        <p className='text-[10px] font-poppins font-medium text-[#4D4D4D]'>{item.grouptagname}</p>
                                                    </div>
                                                </div>
                                                <button className='text-[20px] font-Poppins font-semibold text-[#fff] bg-primary px-[25px] rounded-lg mr-[10px]'>Join</button>
                                            </div>
                                        ))


                                        // grouplist.length == 0 ?
                                        //     <p className='absolute top-[40%] left-[15%] font-poppins font-semibold text-red-500 text-center'>There are currently no GROUPS</p>
                                        //     :
                                        //     grouplist.map((item) => (
                                        //         <div className='flex justify-between items-center pb-[28px] mt-[13px] border-b'>
                                        //             <div className='flex items-center'>
                                        //                 <img className='w-[60px] h-[60px] mr-[10px]' src={groupImgOne} alt="" />
                                        //                 <div>
                                        //                     <span className="text-sm">Admin by {item.adminname}</span>
                                        //                     <h3 className='text-[14px] font-poppins font-semibold text-[#000]'>{item.groupname}</h3>
                                        //                     <p className='text-[10px] font-poppins font-medium text-[#4D4D4D]'>{item.grouptagname}</p>
                                        //                 </div>
                                        //             </div>
                                        //             <button className='text-[20px] font-Poppins font-semibold text-[#fff] bg-primary px-[25px] rounded-lg mr-[10px]'>Join</button>
                                        //         </div>
                                        //     ))
                                    }
                                </>
                            </div>
                    }



                </div>
            </div>
        </>
    )
}

export default GroupList


