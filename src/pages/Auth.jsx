import React, { useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { loginApi, registerApi } from '../services/allApi';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Auth({ register }) {
  const registerForm = register ? true : false;
  const navigate = useNavigate();
  const [userData, setuserData] = useState({
    username: "",
    email: "",
    password: ""
  })
  const handleRegister = async (e) => {
    e.preventDefault();
    const { username, email, password } = userData;
    if (!username || !email || !password) {
      toast.warning('please fill the form completely')
    }
    else {
      const result = await registerApi(userData)
      console.log(result);

      if (result.status === 201) {
        setuserData({
          username: "",
          email: "",
          password: ""
        })
        toast.success("User registeration successfull")
        navigate("/login")
      }
      else if (result.status == 400) {
        toast.error(result.response.data)
      }
      else {
        toast.error('Something happend')
      }

    }
  }
  const handleLogin = async (e) => {
    e.preventDefault();
    const { email, password } = userData;
    if (!email || !password) {
      toast.warning("please fill the form completely")
    }
    else {
      const result = await loginApi(userData)
      console.log("login result", result);
      if (result.status === 200) {
        sessionStorage.setItem("LoggedUser", JSON.stringify(result.data.data))
        sessionStorage.setItem("token", result.data.token)
        setuserData({
          username: "",
          email: "",
          password: ""
        })
        toast.success('User Login successfull')
        navigate("/")
      }
      else if (result.status === 401) {
        toast.error('Invalid Email or Password')
      }
      else {
        toast.error('Somthing went wrong')
      }


    }
  }
  return (
    <div style={{ width: "100%", height: "80vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <div className='container w-75'>
        <h6 >
          <Link style={{ textDecoration: "none" }} to={'/'}>
            <i class="fa-solid fa-arrow-left me-2"></i> Back To Home
          </Link>
        </h6>
        <div className='bg-success rounded shadow'>
          <Row>
            <Col md={6} className=' p-5 d-flex  align-item-center'>
              <img src="https://img.freepik.com/free-vector/login-concept-illustration_114360-739.jpg" alt="" className=' rounded w-75 ms-5' />

            </Col>
            <Col md={6} className='p-5 d-flex justify-content-center'>
              <form className='w-100'>
                <h4 className='text-center'> <i class="fa-brands fa-stack-overflow me-2"></i>Project Fair</h4>
                {
                  registerForm ?
                    <>
                      <h6 className='ms-2 mb-3 mt-3'>Sign Up To Your Account</h6>
                      <input type="text" name="" id="" placeholder='Name' className='form-control w-75'
                        value={userData.username}
                        onChange={(e) => setuserData({ ...userData, username: e.target.value })} />
                    </>
                    :
                    <h6 className='ms-2 mb-3 mt-3'>Sign In To Your Account</h6>

                }
                <div className='mb-3 mt-3'>
                  <input type="text" name="" id="" placeholder='Email Id' className='form-control w-75'
                    value={userData.email}
                    onChange={(e) => setuserData({ ...userData, email: e.target.value })} />
                </div>
                <div className='mb-3 '>
                  <input type="password" name="" id="" placeholder='Password' className='form-control w-75'
                    value={userData.password}
                    onChange={(e) => setuserData({ ...userData, password: e.target.value })} />
                </div>
                {
                  registerForm ?
                    <div>
                      <button className='btn btn-warning w-75 ' onClick={handleRegister}>
                        REGISTER
                      </button>
                      <p className='mt-2'>Already A User? Click Here To <Link className='ms-2' to={'/login'}>LOGIN</Link></p>
                    </div> :
                    <div >
                      <button className='btn btn-warning w-75' onClick={handleLogin}>
                        LOGIN
                      </button>
                      <p className='mt-2'>Not Registered yet? Click Here To <Link className='ms-2' to={'/register'}>REGISTER</Link></p>
                    </div>
                }
              </form>
            </Col>
          </Row>
        </div>
      </div>
      {/* <ToastContainer /> */}
    </div>
  )
}
