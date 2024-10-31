import React from 'react'
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <div className='d-flex justify-content-center align-items-center bg-success p-3 '>
      <div className='footer d-flex align-items-center justify-content-evenly '>
        <div style={{ width: "400px" }}>
          <h4 className='textStyle' >
          <i class="fa-brands fa-stack-overflow"></i> Project Fair
          </h4>
          <p style={{ textAlign: "justify" }} className='textStyle'>Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Reprehenderit repellendus, unde, consectetur est sapiente ut adipisci
            cumque, consequuntur vero laboriosam aut non voluptatem quidem sit cum
            aliquam facere sunt corporis.</p>
        </div>
        <div className='d-flex flex-column ms-5' >
          <h4 className='textStyle'>Links</h4>
          <Link to='/' style={{ textDecoration: "none", color: "black" }}>Home Page</Link>
          <Link to='/dashboard' style={{ textDecoration: "none", color: "black" }}>Dashboard</Link>
          <Link to='/project' style={{ textDecoration: "none", color: "black" }}>Projects</Link>

        </div>
        <div className='d-flex flex-column ms-5'>
          <h4 className='textStyle '>Guides</h4>
          <Link to='https://react.dev' target='_blank' style={{ textDecoration: "none", color: "black" }}>React</Link>
          <Link to='https://react-bootstrap.netlify.app' target='_blank' style={{ textDecoration: "none", color: "black" }}>React Bootstrap </Link>
          <Link to='https://www.npmjs.com/package/json-server' target='_blank' style={{ textDecoration: "none", color: "black" }}>json Server</Link>

        </div>
        <div className='ms-5'>
          <h4 className='textStyle'>Contact Us</h4>
          <div className='d-flex mt-3'>
            <input type="text" placeholder='Enter your email' className='form-control' />
            <button className='btn btn-warning ms-2'>Subscribe</button>
          </div>
          <div className='d-flex justify-content-evenly align-items-center mt-3'>
            <Link  style={{ textDecoration: "none", color: "black" }}><i class="fa-brands fa-instagram fa-2x"></i></Link>
            <Link  style={{ textDecoration: "none", color: "black" }}><i class="fa-brands fa-facebook fa-2x"></i></Link>
            <Link  style={{ textDecoration: "none", color: "black" }}><i class="fa-brands fa-twitter fa-2x"></i></Link>
            <Link  style={{ textDecoration: "none", color: "black" }}><i class="fa-brands fa-reddit fa-2x"></i></Link>
          </div>

        </div>

      </div>
    </div>
  )
}
