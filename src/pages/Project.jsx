import React, { useEffect, useState } from 'react'
import Header from '../componets/Header'
import ProjectCard from '../componets/ProjectCard'
import { getAllProject } from '../services/allApi'
import { Link } from 'react-router-dom'

export default function Project() {
  const [allProject, setallProject] = useState([])
  const [searchKey, setsearchKey] = useState('')
  const [isToken, setIsToken] = useState(false)

  const getallProjectItems = async () => {
    console.log('serach key', searchKey);

    if (sessionStorage.getItem("token")) {
      const token = sessionStorage.getItem("token")
      const reqHeader = {
        "Content-Type": 'application/json',
        'Authorization': `Bearer ${token}`
      }
      const res = await getAllProject(reqHeader, searchKey);
      console.log("all projects:", res);
      setallProject(res.data)
      console.log(allProject);


    }
  }
  useEffect(() => {
    getallProjectItems();
  }, [searchKey])


  useEffect(() => {
    if (sessionStorage.getItem('token')) {
      setIsToken(true)
    }
  }, [])

  return (
    <>
   

      <Header />
      <div className='container-fluid'>
        <h3 className='text-center mt-5'>All Projects</h3>
      </div>
      {
        isToken?
        <div>
        <div className='row my-4'>
          <div className='col-md-4'></div>
          <div className='col-md-4 d-flex'>
            <input type="text" placeholder='Search By Technology' className='form-control' onChange={(e) => setsearchKey(e.target.value)} />
            <i class="fa-solid fa-magnifying-glass " style={{ marginTop: "12px", marginLeft: "-28px", color: "lightgray" }}></i>
          </div>
          <div className='col-md-4'></div>
        </div>
        <div className='container row ms-5 my-5'>

          {
            allProject?.length > 0 ?
              allProject.map((item) => (
                <div className='col-md-3'>
                  <ProjectCard project={item} />
                </div>
              )) :
              <p>No projects found</p>
          }
        </div>
      </div>:
     <div className='d-flex justify-content-center align-items-center flex-column'>
      <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFcQHQx3DL31kzgdsI8s37JG8wUWw_IMym1A&s" alt="" style={{height:"300px",width:"400px",marginBottom:"50px"}} />
      <p>Please <Link to={'/login'} style={{textDecoration:"none",color:"blue"}}> Login </Link> to see all projects</p>
     </div>
        
     

      }
      


    </>
  )
}
