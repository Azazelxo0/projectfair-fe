import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import AddProject from './AddProject'
import EditProject from './EditProject'
import { deleteProjectApi, getUserProject } from '../services/allApi'
import { addProjectResponseContext, editprojectResponseContext } from '../context/Context'


export default function MyProject() {
    const [project, setproject] = useState([])
    const { addProjectResponse, setAddProjectResponse } = useContext(addProjectResponseContext)
    const { editprojectResponse, seteditprojectResponse } = useContext(editprojectResponseContext)

    const UserProject = async () => {
        const token = sessionStorage.getItem("token")
        const reqHeader = {
            "Content-Type": 'application/json',
            'Authorization': `Bearer ${token}`
        }
        const result = await getUserProject(reqHeader)
        console.log('user projects', result);
        setproject(result.data)
        console.log('projects', project);


    }

    useEffect(() => {
        UserProject()
    }, [addProjectResponse, editprojectResponse])



    const handleDelete = async (id) => {
        const token = sessionStorage.getItem("token");
        const reqHeader = {
            "Content-Type": 'application/json',
            'Authorization': `Bearer ${token}`
        }
        const result = await deleteProjectApi(id, reqHeader)
        console.log('delete response', result);
        if (result.status === 200) {
            alert("Project deleted successfully")
            UserProject()
        }
        else {
            alert('Somthing went wrong')
        }

    }

    return (
        <>
            <div className='shadow p-5 mb-5'>
                <div className='d-flex mt-4'>
                    <h5 className='text-succes me-auto'>My Projects</h5>
                    <AddProject />

                </div>
                {
                    project?.length > 0 ?
                        project.map((item) => (
                            <div className='p-3 mt-4 rounded-2 d-flex bg-light'>
                                <h5>{item.title}</h5>

                                <div className='d-flex ms-auto align-items-center'>
                                    <EditProject project={item} />

                                    <a href={item.website} target='_blank'
                                        className='btn'><i class="fa-solid fa-link  "></i></a>
                                        
                                    <a href={item.github} target='_blank'
                                        className='btn'> <i class="fa-brands fa-github"></i></a>

                                    <button className='btn ' onClick={() => handleDelete(item._id)}>
                                        <i class="fa-solid fa-trash text-danger"></i>
                                    </button>


                                </div>
                            </div>
                        ))
                        :
                        <p>No projects found</p>
                }

            </div>

        </>
    )
}
