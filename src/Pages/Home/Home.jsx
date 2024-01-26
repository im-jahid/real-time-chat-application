import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getAuth, onAuthStateChanged } from "firebase/auth";
import GroupList from '../GroupList/GroupList';
import FriendRequest from '../FriendRequest/FriendRequest';
import Friends from '../Friends/Friends';
import MyGroups from '../MyGroups/MyGroups';
import UserList from '../UserList/UserList';
import BlockedUser from '../BlockedUser/BlockedUser';
import EmailVerification from '../EmailVerification/EmailVerification';
import SideBar from '../Sidebar/SideBar';
import { getDatabase } from 'firebase/database';

const Home = () => {
  const auth = getAuth();
  const db = getDatabase();
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const data = useSelector(state => state.userLoginInfo.userInfo)
  const [verify, setVerify] = useState(false)
  
  useEffect(() => {
    if (!data) {
      navigate('/login')
    }
  }, [])

  onAuthStateChanged(auth, (user) => {
    console.log(user, 'userrrr');
    if(user.emailVerified){
      setVerify(true)
      dispatch(userLoginInfo(user.user))
      localStorage.setItem('userLoginInfo', JSON.stringify((user.user)))
    }
  });

  return (
    <div>

      
      {
            verify ?
            <>
            <div className='flex justify-between m-[45px]'>
              <SideBar active='home'/>
              <div>
              <GroupList/>
              <FriendRequest/> 
              </div>
              <div>
                <Friends/>
                <MyGroups/>
              </div>
              <div>
                <UserList/>
                <BlockedUser/>
              </div>
            </div>
            </>
            :
            <EmailVerification></EmailVerification>
          }

    </div>
  )
}

export default Home