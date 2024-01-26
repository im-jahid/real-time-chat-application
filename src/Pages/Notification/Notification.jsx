import React from 'react'
import SideBar from '../Sidebar/SideBar'
import GroupList from '../GroupList/GroupList'
import Friends from '../Friends/Friends'

const Notification = () => {
  return (
    <div>
        <>
            <div className='flex justify-between p-[50px] '>
              <SideBar active='notification'/>
              <div className=''>
              <GroupList/>
              <Friends/> 
              </div>
              <div className='w-[905px] p-[40px] rounded-lg mt-[10px] bg-red-500'>
                <h1>dhjxfghjcfjcf j </h1>
              </div>
            </div>
            </>
    </div>
  )
}

export default Notification