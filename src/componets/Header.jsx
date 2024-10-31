import React, { useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { Link, useNavigate } from 'react-router-dom';

export default function Header() {
  const navigate = useNavigate()
  const [isToken, setIsToken] = useState(false)
  const handlelogout = () => {
    if (sessionStorage.getItem('token')) {
      sessionStorage.removeItem('token')
      sessionStorage.removeItem('LoggedUser')
      navigate('/')
    }
  }

  useEffect(()=>{
    if(sessionStorage.getItem('token')){
      setIsToken(true)
    }
  },[])


  return (
    <>
      <Navbar className=" bg-success">
        <Container className='p-1'>
          <Navbar.Brand >
            <Link to={'/'} style={{ textDecoration: "none", color: "white" }} >
              <h4  >
                <i class="fa-brands fa-stack-overflow me-3"></i> Project Fair
              </h4>
            </Link>


          </Navbar.Brand>
          {
            isToken?
            <button className='btn btn-warning' onClick={handlelogout}><i class="fa-solid fa-power-off me-2"></i>Logout</button>
            :
            <p></p>
          }



        </Container>
      </Navbar>

    </>
  )
}
