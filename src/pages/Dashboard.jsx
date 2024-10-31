import React from 'react'
import Header from '../componets/Header'
import MyProject from '../componets/MyProject'
import Profile from '../componets/Profile'


export default function Dashboard() {
  const userData = JSON.parse(sessionStorage.getItem("LoggedUser"));
  
  return (
    <>
    <Header/>
    <div className='container-fluid '>
      <h4 className='ms-4 my-4'>
        Welcome <span className='text-warning'>{userData?.username}</span>
      </h4>
      <div className='row'>
        <div className='col-md-8'>
          <MyProject/>
        </div>
        <div className='col-md-4'>
        <Profile/>
        </div>

      </div>

    </div>
    </>
  )
}
