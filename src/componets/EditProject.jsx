import React, { useContext, useEffect } from 'react'
import { useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { BASE_URL } from '../services/baseurl';
import { editUserProjectApi } from '../services/allApi';
import { editprojectResponseContext } from '../context/Context';


export default function EditProject({ project }) {
    const [preview, setPreview] = useState('')
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const {editprojectResponse, seteditprojectResponse} = useContext(editprojectResponseContext)

    const [projectDetails, setProjectDetails] = useState({
        id: project._id,
        title: project.title,
        language: project.language,
        github: project.github,
        website: project.website,
        overview: project.overview,
        projectImage: ''
    })

    const handleUpdate = async (e) => {
        e.preventDefault()
        console.log('updated values', projectDetails);
        const { title, language, github, website, overview, projectImage, id } = projectDetails;
        if (!title || !language || !github || !website || !overview || !id) {
            alert("Please fill the form completely")
        }
        else {
            const reqBody = new FormData();
            reqBody.append("title", title);
            reqBody.append("language", language);
            reqBody.append("github", github);
            reqBody.append("website", website);
            reqBody.append("overview", overview);
            preview ? reqBody.append("projectImage", projectImage) :
                reqBody.append('projectImage', project.projectImage)
            const token = sessionStorage.getItem('token');
            if (preview) {
                const reqHeader = {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}`
                }
                const result = await editUserProjectApi(id, reqBody, reqHeader);
                console.log('updated project result', result);
                if(result.status===200){
                    handleClose()
                    seteditprojectResponse(result)
                }

            }
            else {
                const reqHeader = {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
                const result = await editUserProjectApi(id, reqBody, reqHeader);
                console.log('updated project result', result);
                if(result.status===200){
                    handleClose()
                    seteditprojectResponse(result)
                }
            }
        }

    }
    const handleclose1 =()=>{
        handleClose()
        setProjectDetails({
            id: project._id,
            title: project.title,
            language: project.language,
            github: project.github,
            website: project.website,
            overview: project.overview,
            projectImage: ''
        })
        setPreview('')
    }

    useEffect(() => {
        if (projectDetails.projectImage) {
            setPreview(URL.createObjectURL(projectDetails.projectImage))
        }
    }, [projectDetails.projectImage])

    return (
        <>

            <i class="fa-solid fa-pen-to-square text-primary" onClick={handleShow}></i>

            <Modal show={show} onHide={handleClose} size={'lg'}>
                <Modal.Header closeButton>
                    <Modal.Title className='text-success'>EDIT PROJECT</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        <Row>
                            <Col md={6}>
                                <label htmlFor="projectImg">
                                    <input type="file" name="" id="projectImg" style={{ display: "none" }}
                                        onChange={(e) => setProjectDetails({ ...projectDetails, projectImage: e.target.files[0] })} />
                                    <img src={preview ? preview : `${BASE_URL}/uploads/${project?.projectImage}`}
                                        alt="" className='w-100 ms-4' />
                                </label>
                            </Col>
                            <Col md={6}>
                                <div>
                                    <input type="text" name="" id="" placeholder='Title' className='form-control mt-2 mb-5 w-75' value={projectDetails.title}
                                        onChange={(e) => setProjectDetails({ ...projectDetails, title: e.target.value })} />
                                    <input type="text" name="" id="" placeholder='Languages Used' className='form-control  mb-4 w-75' value={projectDetails.language}
                                        onChange={(e) => setProjectDetails({ ...projectDetails, language: e.target.value })} />
                                    <input type="text" name="" id="" placeholder='Github URL' className='form-control  mb-4 w-75' value={projectDetails.github}
                                        onChange={(e) => setProjectDetails({ ...projectDetails, github: e.target.value })} />
                                    <input type="text" name="" id="" placeholder='Website URL' className='form-control  mb-4 w-75' value={projectDetails.website}
                                        onChange={(e) => setProjectDetails({ ...projectDetails, website: e.target.value })} />
                                    <textarea name="" id="" className='form-control mt-2 mb-5 w-75' placeholder='Overview' value={projectDetails.overview}
                                        onChange={(e) => setProjectDetails({ ...projectDetails, overview: e.target.value })}> </textarea>

                                </div>

                            </Col>
                        </Row>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="warning" onClick={handleclose1}>
                        CANCEL
                    </Button>
                    <Button variant="success" onClick={handleUpdate}>
                        UPDATE
                    </Button>
                </Modal.Footer>
            </Modal>

        </>

    )
}
