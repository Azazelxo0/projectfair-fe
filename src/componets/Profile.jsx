import React from 'react'
import Button from 'react-bootstrap/Button';
import Collapse from 'react-bootstrap/Collapse';
import { useState } from 'react';


export default function Profile() {
    const [open, setOpen] = useState(false);
  return (
    <>
    <div className='shadow p-4 mb-5'>
        <div className='d-flex'>
            <h5>Profile</h5>
            <button className='ms-auto btn btn-success'  onClick={() => setOpen(!open)}>
                {
                    open?<i class="fa-solid fa-angle-up"></i>:<i class="fa-solid fa-angle-down"></i>
                }
            
            </button>
        </div>
        <Collapse in={open}>
        <div >
            <div className='d-flex justify-content-center align-items-center '>
                <label htmlFor="profileImg">
                    <input type="file" name="" id="profileImg" style={{display:"none"}}/>
                    <img src="https://static.vecteezy.com/system/resources/thumbnails/006/017/592/small_2x/ui-profile-icon-vector.jpg"
                    width='180px' alt="" className='rounded '/>
                </label>

            </div>
            <div className='d-flex justify-content-center align-items-center flex-column'>
                <input type="text" name="" id="" placeholder='Github Link' className='form-control mt-3 mb-3 w-75 ' />
                <input type="text" name="" id="" placeholder='LinkedIn Link ' className='form-control mt-3 mb-3 w-75'/>
                <button className='btn btn-primary w-75 '>Update</button>
            </div>
         
        </div>
      </Collapse>

    </div>
    
    </>
  )
}
