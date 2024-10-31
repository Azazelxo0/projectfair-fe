import React, {  useContext, useEffect } from 'react'
import { useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { addProjectApi } from '../services/allApi';
import { addProjectResponseContext } from '../context/Context';



export default function AddProject() {
  const [show, setShow] = useState(false);
  const [token, setToken] = useState("");

  //useContext() hook is used to access sate created inside contextshare
 const {addProjectResponse,setAddProjectResponse} = useContext(addProjectResponseContext)




  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      setToken(sessionStorage.getItem("token"))
    }
  }, [])

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [projectDetails, setProjectDetails] = useState({
    title: "",
    language: "",
    github: "",
    website: "",
    overview: "",
    projectImage: ""
  });
  // state for showing previewImage
  const [preview, setPreview] = useState("")
  useEffect(() => {
    if (projectDetails.projectImage) {
      //to create image url for preview URL.creationObjectURL("image value")
      setPreview(URL.createObjectURL(projectDetails.projectImage))
    }
  }, [projectDetails.projectImage])

  const handleAddProject = async (e) => {
    e.preventDefault();
    const { title, language, github, website, overview, projectImage } = projectDetails;
    if (!title || !language || !github || !website || !overview || !projectImage) {
      alert("Please fill the form completely")
    }
    else {
      //here we are also uploading a file, so we should send body in the form of form data

      const reqBody = new FormData();
      reqBody.append("title", title)
      reqBody.append("language", language)
      reqBody.append("github", github)
      reqBody.append("website", website)
      reqBody.append("overview", overview)
      reqBody.append("projectImage", projectImage) 

      //here content type we are passing is multipart form data, so specific request header needed
      const reqHeader = {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${token}`
      }
      const result = await addProjectApi(reqBody, reqHeader)
      if (result.status === 200) {
        setAddProjectResponse(result.data)
        alert(`${title} uploaded successfully`)
        setProjectDetails({
          title: "",
          language: "",
          github: "",
          website: "",
          overview: "",
          projectImage: ""
        })
        handleClose()
        setPreview("")
      }
       
      else if (result.status === 409) {
        alert(`${title} already exist`)
      }
      else {
        alert(`${title} upload failed`)

      }


    }
  }

  const handleClose1 = () => {
    handleClose();
    setPreview("")
    setProjectDetails({
      title: "",
      language: "",
      github: "",
      website: "",
      overview: "",
      projectImage: ""
    })
  }



  return (
    <>
      <button className='btn btn-success' onClick={handleShow}>ADD PROJECT</button>
      <Modal show={show} onHide={handleClose} size={'lg'}>
        <Modal.Header closeButton>
          <Modal.Title className='text-success'>ADD PROJECT</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <Row>
              <Col md={6}>
                <label htmlFor="projectImg">
                  <input type="file" name="" id="projectImg" style={{ display: "none" }}
                    onChange={(e) => setProjectDetails({ ...projectDetails, projectImage: e.target.files[0] })} />
                  <img src={preview ? preview : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQhFzzdBy2IJIrZIlgmdqrwfOqDuESRnl0pRA&s"}
                    alt="" className='w-100 ms-4' />
                </label>
              </Col>
              <Col md={6}>
                <div className='ms-5'>
                  <input type="text" name="" id="" placeholder='Title' className='form-control mt-2 mb-5 w-75'
                    value={projectDetails.title}
                    onChange={(e) => setProjectDetails({ ...projectDetails, title: e.target.value })} />
                  <input type="text" name="" id="" placeholder='Languages Used' className='form-control  mb-4 w-75'
                    value={projectDetails.language}
                    onChange={(e) => setProjectDetails({ ...projectDetails, language: e.target.value })} />
                  <input type="text" name="" id="" placeholder='Github URL' className='form-control  mb-4 w-75'
                    value={projectDetails.github}
                    onChange={(e) => setProjectDetails({ ...projectDetails, github: e.target.value })} />
                  <input type="text" name="" id="" placeholder='Website URL' className='form-control  mb-4 w-75'
                    value={projectDetails.website}
                    onChange={(e) => setProjectDetails({ ...projectDetails, website: e.target.value })} />
                  <textarea name="" id="" className='form-control mt-2 mb-5 w-75' placeholder='Overview'
                    value={projectDetails.overview}
                    onChange={(e) => setProjectDetails({ ...projectDetails, overview: e.target.value })}> </textarea>

                </div>

              </Col>
            </Row>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="warning" onClick={handleClose1}>
            CANCEL
          </Button>
          <Button variant="success" onClick={handleAddProject}>
            ADD
          </Button>
        </Modal.Footer>
      </Modal>


    </>
  )
}
